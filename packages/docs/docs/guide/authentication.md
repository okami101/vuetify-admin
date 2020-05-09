# Authentication

Vtec Admin is first of all an admin app, so it obviously offers few batteries helpers in order to integrate well with all different kind of authentication system, aka basic HTTP auth, JWT, OAUTH, full state cookies, etc. Similar as [data providers](data-providers), an adapter approach pattern is also used, which allows VA to communicate with you own API server authentication by writing your own auth provider.

![login](/assets/login.jpg)

As explained on next chapiter, VA provides 3 auth providers :

* Basic HTTP authentication.
* JWT for stateless authentication.
* Full state cookie authentication which is the recommended way.

:::tip GUEST MODE
Note that the auth provider is of course totally optional !  
If your API don't need auth at all, simply don't set the `authProvider` option in `VtecAdmin` constructor and VA will directly use a `guest` mode auth that will let you manage your resources as if we were connected.
:::

## Included auth providers

All of this providers need an instance of axios in order to work. I prefer it to standard [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) because it allows less code and easy by-instance authentication headers across data providers.

The best way is to create a global admin axios instance and passthrough it into both auth and data providers :

```js
import VtecAdmin from "vtec-admin";

import { laravelDataProvider, sanctumAuthProvider } from "vtec-admin";
import axios from "axios";

/**
 * Axios instance
 */
const baseURL = process.env.VUE_APP_API_URL || "http://localhost:8000";

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

Vue.prototype.$axios = http;

export default new VtecAdmin({
  //...
  authProvider: sanctumAuthProvider(http),
  dataProvider: laravelDataProvider(http),
  //...
});
```

:::tip GLOBAL AXIOS
Pass axios instance into global Vue prototype in order to access it everywhere on your custom Vue components by `this.$axios...`. You just have to write `Vue.prototype.$axios = http;` for that.  
Don't forget that only providers are aware of this axios instance, Vtec Admin doesn't know about it and exclusivly use providers for API communication.
:::

All providers accept a second params argument for various optional parameters as authentication routes, credentials format, etc.

| Option           | Description                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `routes`         | Object containing all auth routes baseURL, aka login, logout, refresh (JWT), user infos  |
| `getCredentials` | Function mapper for credentials that return a compatible credentials format for your API |
| `getName`        | Function which return name of a given user (taken from user infos API endpoint)          |
| `getEmail`       | Function which return email of a given user                                              |
| `getPermissions` | Function which return roles or permissions of a given user                               |

### Full state cookies authentication

The [Laravel Sanctum Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/sanctum.js) offers full integration with [Laravel Sanctum](https://github.com/laravel/sanctum), the ideal official package for full state SPA authentication support.  
This is actually the recommended provider for Laravel if your app is on the same main domain (which is 99% use cases), because it's more secure (no sensible to XSS attacks with HTTP only cookies) and it works seamlessly with impersonation feature as well as the elFinder File manager.

:::warning CSRF
As always with all based-cookies authentication system, you'll need a specific csrf route in order to get the XSRF token. Default is setted to `/sanctum/csrf-cookie` so you have not to do anything if you use Laravel Sanctum with default config.  
This token will be setted on local cookies and used on every axios header request via `XSRF-COOKIE`.
:::

### JWT for stateless authentication

The [JWT Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/jwt.js) is fully tested on Laravel with [Laravel JWT](https://github.com/tymondesigns/jwt-auth) package. It should work with official [Laravel Passwort](https://github.com/laravel/passport) as well.

:::danger LESS FEATURES
If you prefer to use JWT (or even basic...) authentication mode instead of Sanctum, you'll lose elFinder integration as well as impersonation feature.
:::

### Basic HTTP authentication

The [Basic HTTP Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/basic.js) is to use only on basic cases.

## Profile management

![profile](/assets/profile.png)
