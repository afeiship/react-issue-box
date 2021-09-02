import React from 'react';
import nx from '@jswork/next';
import { HashRouter as Router } from 'react-router-dom';
import * as H from 'history';
import nxHashlize from '@jswork/next-hashlize';
import nxParam from '@jswork/next-param';
import noop from '@jswork/noop';
import { ROUTER_ACTION, Options, RouteAction } from './type';

const DEFAULT_OPTIONS: Options = {
  context: null,
  module: 'modules',
  type: 'hash',
  onRoute: noop
};

export default class ServiceReactRoute {
  private readonly options;
  private latestUrl;

  /**
   * 代替 new 方法，返回一个新的实例
   * @param inOptions
   * @returns
   */
  public static getInstance(inOptions: Options) {
    return new this(inOptions);
  }

  /**
   * 取得当前页面的 pathname, 对应 history 里的 pathname
   */
  get pathname() {
    return nx.get(this.history, 'location.pathname');
  }

  /**
   * 得到 react-router 的 history 对象
   */
  get history(): H.History<H.LocationState> {
    return nx.get(this.options, 'context.current.history');
  }

  /**
   * 得到当前URL的参数 querystring
   */
  get qs() {
    return nxHashlize(location.hash);
  }

  /**
   * 内部方法，有关跳转最终都会走到这个方法里来
   * @param inAction
   * @param inUrl
   * @param inData
   * @returns
   */
  private route(inAction: RouteAction, inUrl: string, inData: any) {
    const hasSearch = inUrl.includes('?');
    const [pathname, search] = inUrl.split('?');
    const args = { pathname, search: '', state: null };
    hasSearch ? (args.search = search) : (args.state = inData);
    this.options.onRoute(inAction, args);
    return this.history[inAction](args);
  }

  /**
   * 向 eventBus 对象上 emit 一个名为 app.url-change 的事件
   */
  private handleEventBus() {
    const eventBus = this.options.eventBus;
    const eventName = 'app.url-change';
    this.latestUrl = null;
    const target = () => {
      return { old: this.latestUrl, current: location.href };
    };

    if (eventBus) {
      eventBus.emit(eventName, target);
      this.history.listen(() => {
        eventBus.emit(eventName, target);
        this.latestUrl = location.href;
      });
    }
  }

  /**
   * 构造方法
   * @param inOptions
   */
  constructor(inOptions: Options) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
    this.handleEventBus();
  }

  /**
   * 监听路由的变化，对应原生的 listen 方法
   * @param listener
   * @returns
   */
  listen(listener: H.LocationListener<H.LocationState>): H.UnregisterCallback {
    return this.history.listen(listener);
  }

  /**
   * react-router 的 原生 push 方法，跳转到指定的路由，并在历史记录中添加新的路由
   * @param inUrl
   * @param inData
   * @returns
   */
  public push(inUrl: string, inData) {
    return this.route(ROUTER_ACTION.push, inUrl, inData);
  }

  /**
   * react-router 的 原生 replace 方法, 跳转到指定的路由，并替换当前的路由
   * @param inUrl
   * @param inData
   * @returns
   */
  public replace(inUrl: string, inData) {
    return this.route(ROUTER_ACTION.replace, inUrl, inData);
  }

  /**
   * react-router 的 goBack 方法，返回上一个路由
   */
  public back() {
    this.history.goBack();
  }

  /**
   * react-router 的 goForward 方法，前进到下一个路由
   */
  public forward() {
    this.history.goForward();
  }

  /**
   * 短 push/replace 跳转，不用带 module 参数
   * @param inKey 要跳转到的路由
   * @param inQs  要添加的参数
   * @param inData  要添加的 state
   * @param inAction  跳转的方式，默认为 push
   */
  public to(inKey: string, inQs: any, inData: any, inAction: RouteAction) {
    const action = inAction || ROUTER_ACTION.push;
    const url = nxParam(inQs, `/${this.options.module}/${inKey}`);
    this[action](url, inData);
  }
}
