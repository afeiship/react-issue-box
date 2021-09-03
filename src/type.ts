import { HashRouter as Router } from 'react-router-dom';

export interface EventBus {
  emit: (name: string, data: any) => any;
}

export enum ROUTER_ACTION {
  push = 'push',
  replace = 'replace'
}

export enum ROUTER_TYPE {
  hash = 'hash',
  browser = 'browser'
}

export interface Options {
  context: React.Ref<Router>;
  eventBus?: EventBus;
  eventName?: string;
  type?: keyof typeof ROUTER_TYPE;
  module?: string;
  onRoute?: (action: string, args: any[]) => void;
}

export type RouteAction = keyof typeof ROUTER_ACTION;
