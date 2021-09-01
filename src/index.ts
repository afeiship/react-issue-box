import React from 'react';
import nx from '@jswork/next';
import { HashRouter as Router } from 'react-router-dom';
import * as H from 'history';
import nxHashlize from '@jswork/next-hashlize';

export interface IOptions {
  context: React.Ref<Router>;
  type?: 'hash' | 'browser';
  module?: string;
}

const DEFAULT_OPTIONS: IOptions = {
  context: null,
  module: 'modules',
  type: 'hash'
};

export default class ServiceReactRoute {
  private readonly options;

  private get router(): Router {
    return nx.get(this.options, 'context.current');
  }

  public static getInstance(inOptions: IOptions) {
    return new this(inOptions);
  }

  get history(): H.History<H.LocationState> {
    return nx.get(this.router, 'history');
  }

  get component() {
    return nx.get(this.history, 'route.component');
  }

  get pathname() {
    return nx.get(this.history, 'location.pathname');
  }

  get url() {
    return nx.get(this.history, 'match.url');
  }

  get path() {
    return nx.get(this.history, 'match.path');
  }

  get params() {
    return nx.get(this.history, 'match.params');
  }

  get qs() {
    return nxHashlize(location.hash);
  }

  constructor(inOptions: IOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
  }

  public route(inAction, inUrl, inData) {
    const hasSearch = inUrl.includes('?');
    const [pathname, search] = inUrl.split('?');
    const args = { pathname, search: null, state: null };
    hasSearch ? (args.search = search) : (args.state = inData);
    return this.history[inAction](args);
  }

  public push(inUrl, inData) {
    return this.route('push', inUrl, inData);
  }

  public replace(inUrl, inData) {
    return this.route('replace', inUrl, inData);
  }

  public to(inKey, inData) {
    this.push(`/${this.options.module}/${inKey}`, inData);
  }

  public back() {
    this.history.goBack();
  }

  public forward() {
    this.history.goForward();
  }
}
