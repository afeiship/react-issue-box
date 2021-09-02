import React from 'react';
import nx from '@jswork/next';
import { HashRouter as Router } from 'react-router-dom';
import * as H from 'history';
import nxHashlize from '@jswork/next-hashlize';
import nxParam from '@jswork/next-param';
import noop from '@jswork/noop';

export interface IOptions {
  context: React.Ref<Router>;
  type?: 'hash' | 'browser';
  module?: string;
  onRoute?: (action: string, args: any[]) => void;
}

const DEFAULT_OPTIONS: IOptions = {
  context: null,
  module: 'modules',
  type: 'hash',
  onRoute: noop
};

export default class ServiceReactRoute {
  private readonly options;

  /**
   * 代替 new 方法，返回一个新的实例
   * @param inOptions
   * @returns
   */
  public static getInstance(inOptions: IOptions) {
    return new this(inOptions);
  }

  /**
   * 得到当前的路由的组件的 router 实例 (routerRef.current)
   */
  get router(): Router {
    return nx.get(this.options, 'context.current');
  }
  /**
   * 得到 react-router 的 history 对象
   */
  get history(): H.History<H.LocationState> {
    return nx.get(this.router, 'history');
  }

  /**
   * 得到当前的路由
   */
  get component() {
    return nx.get(this.history, 'route.component');
  }

  /**
   * 得到当前的路由的组件的 match.pathname
   */
  get pathname() {
    return nx.get(this.history, 'location.pathname');
  }

  /**
   * 得到当前的路由的组件的 match.url
   */
  get url() {
    return nx.get(this.history, 'match.url');
  }

  /**
   * 得到当前的路由的组件的 match.path
   */
  get path() {
    return nx.get(this.history, 'match.path');
  }

  /**
   *
   */
  get params() {
    return nx.get(this.history, 'match.params');
  }

  /**
   * 得到当前URL的参数 querystring
   */
  get qs() {
    return nxHashlize(location.hash);
  }

  constructor(inOptions: IOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
  }

  private route(inAction: string, inUrl: string, inData: any) {
    const hasSearch = inUrl.includes('?');
    const [pathname, search] = inUrl.split('?');
    const args = { pathname, search: '', state: null };
    hasSearch ? (args.search = search) : (args.state = inData);
    this.options.onRoute(inAction, args);
    return this.history[inAction](args);
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
  public push(inUrl, inData) {
    return this.route('push', inUrl, inData);
  }

  /**
   * react-router 的 原生 replace 方法, 跳转到指定的路由，并替换当前的路由
   * @param inUrl
   * @param inData
   * @returns
   */
  public replace(inUrl, inData) {
    return this.route('replace', inUrl, inData);
  }

  /**
   * react-router 的 原生 push 方法增强，前面自动加 module 的配置 string
   * @param inKey
   * @param inData
   */
  public goto(inKey, inData) {
    this.push(`/${this.options.module}/${inKey}`, inData);
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
   * 类似于 goto，不过，第2个参数是 queryString，偏向于有 querystring 的情况
   * @param inKey
   * @param inQs
   * @param inData
   */
  public to(inKey, inQs, inData) {
    const url = nxParam(inQs, `/${this.options.module}/${inKey}`);
    this.goto(url, inData);
  }
}
