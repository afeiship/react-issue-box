import React from 'react';
import nx from '@jswork/next';
import { HashRouter as Router } from 'react-router-dom';
import nxHashlize from '@jswork/next-hashlize';

export interface IOptions {
  context: React.Ref<Router>;
  type?: 'hash' | 'browser';
  module?: string;
  onRoute?: () => void;
}

const DEFAULT_OPTIONS: IOptions = {
  context: null,
  module: 'modules',
  type: 'hash'
};

export default class ServiceReactRoute {
  private options;
  private current;

  public static getInstance(inOptions: IOptions) {
    return new this(inOptions);
  }

  get history() {
    const { history } = this.options.context;
    return history;
  }

  get component() {
    return nx.get(this.current, 'route.component');
  }

  get pathname() {
    return nx.get(this.current, 'location.pathname');
  }

  get url() {
    return nx.get(this.current, 'match.url');
  }

  get path() {
    return nx.get(this.current, 'match.path');
  }

  get params() {
    return nx.get(this.current, 'match.params');
  }

  get qs() {
    return nxHashlize(location.hash);
  }

  constructor(inOptions: IOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
    this.current = this.options.context.current;
  }

  public inject(inProps) {
    setTimeout(() => {
      this.current = inProps;
    }, 0);
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
    this.history.forward();
  }
}
