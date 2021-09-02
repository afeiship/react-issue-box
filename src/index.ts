import React from 'react';
import nx from '@jswork/next';
import { HashRouter as Router } from 'react-router-dom';
import * as H from 'history';
import nxHashlize from '@jswork/next-hashlize';
import nxParam from '@jswork/next-param';
import noop from '@jswork/noop';

export enum ROUTER_ACTION {
  push = 'push',
  replace = 'replace'
}

export enum ROUTER_TYPE {
  hash = 'hash',
  browser = 'browser'
}

export interface IOptions {
  context: React.Ref<Router>;
  type?:  keyof typeof ROUTER_TYPE;
  module?: string;
  onRoute?: (action: string, args: any[]) => void;
}

export type RouteAction = keyof typeof ROUTER_ACTION;

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

  constructor(inOptions: IOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
  }

  private route(inAction: RouteAction, inUrl: string, inData: any) {
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
    return this.route(ROUTER_ACTION.push, inUrl, inData);
  }

  /**
   * react-router 的 原生 replace 方法, 跳转到指定的路由，并替换当前的路由
   * @param inUrl
   * @param inData
   * @returns
   */
  public replace(inUrl, inData) {
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
