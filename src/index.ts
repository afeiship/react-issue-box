interface IOptions {
  context: any;
  module: string;
}

const DEFAULT_OPTIONS = {
  module: 'modules'
};

export default class {
  private options;

  public static getInstance(inOptions: IOptions) {
    return new this(inOptions);
  }

  get history() {
    const { history } = this.options.context;
    return history;
  }

  constructor(inOptions: IOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...inOptions };
  }

  push(inUrl, inData) {
    this.history.push({
      pathname: inUrl,
      state: inData
    });
  }

  replace(inUrl, inData) {
    this.history.replace({
      pathname: inUrl,
      state: inData
    });
  }

  to(inKey, inData) {
    this.push(`/${this.options.module}/${inKey}`, inData);
  }

  back() {
    this.history.goBack();
  }
}
