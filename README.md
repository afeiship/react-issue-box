# service-react-route

> React router route service..

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation

```shell
npm install @jswork/service-react-route
```

## usage
```tsx
import React from 'react';
import ServiceReactRoute from '@jswork/service-react-route';
import { routes } from '@/shared/routes';

@reduxRender('root', { prefix: 'react-spa' })
export default class extends ReduxAppBase {
  static initialState(inStore) {
    return {
      memory: {
        orders: {},
        users: {},
        login: { username: 'afei', password: '123123' },
      },
    };
  }

  private routerRef: React.Ref<Router> = React.createRef();

  componentDidMount() {
    nx.$route = ServiceReactRoute.getInstance({ context: this.routerRef });
  }

  render() {
    const {
      login: { username },
    } = nx.$memory;
    return <Router ref={this.routerRef}>{renderRoutes(routes)}</Router>
  }
}
```

## license

Code released under [the MIT license](https://github.com/afeiship/service-react-route/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/service-react-route
[version-url]: https://npmjs.org/package/@jswork/service-react-route
[license-image]: https://img.shields.io/npm/l/@jswork/service-react-route
[license-url]: https://github.com/afeiship/service-react-route/blob/master/LICENSE.txt
[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/service-react-route
[size-url]: https://github.com/afeiship/service-react-route/blob/master/dist/service-react-route.min.js
[download-image]: https://img.shields.io/npm/dm/@jswork/service-react-route
[download-url]: https://www.npmjs.com/package/@jswork/service-react-route
