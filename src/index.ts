import nx from '@jswork/next';

interface IOptions {
  context?: any;
  module: string;
  type: 'hash' | 'browser';
}

const DEFAULT_OPTIONS: IOptions = {
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

  constructor(inOptions: IOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
    this.current = null; //
  }

  public inject(inProps) {
    setTimeout(() => {
      this.current = inProps;
    }, 0);
  }

  public push(inUrl, inData) {
    this.history.push({
      pathname: inUrl,
      state: inData
    });
  }

  public replace(inUrl, inData) {
    this.history.replace({
      pathname: inUrl,
      state: inData
    });
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
