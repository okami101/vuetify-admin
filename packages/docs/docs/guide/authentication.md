# Authentication

Vtec Admin is first of all an admin app, so it obviously offers few batteries helpers in order to integrate well with all different kind of authentication system, aka basic HTTP auth, JWT, OAUTH, full state cookies, etc. Similar as [data providers](data-providers), an adapter approach pattern is also used, which allows VA to communicate with you own API server authentication by writing your own auth provider.

As explained on next chapiter, VA provides 3 configurable auth providers :

* `basicAuthProvider` : Basic HTTP authentication.
* `jwtAuthProvider` : JWT for stateless authentication.
* `sanctumAuthProvider` : Full state cookie authentication which is the recommended way.

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

All included providers can be used the same way, if you want to use JWT provider instead, just replace `sanctumAuthProvider` by `jwtAuthProvider`.

:::tip GLOBAL AXIOS
Pass axios instance into global Vue prototype in order to access it everywhere on your custom Vue components by `this.$axios...`. You just have to write `Vue.prototype.$axios = http;` for that.  
Don't forget that only providers are aware of this axios instance, Vtec Admin doesn't know about it and exclusivly use providers for API communication.
:::

In addition to axios, a second `params` optional argument can be used for various parameters as authentication routes, credentials format, etc.

| Option           | Description                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `routes`         | Object containing all auth routes baseURL, aka login, logout, refresh (JWT), user infos               |
| `storageKey`     | JWT only, key name of local storage which will store the token, default to `jwt_token`                |
| `getToken`       | JWT only, function which return token from a successful login API response, default to `access_token` |
| `getCredentials` | Function mapper for credentials that return a compatible credentials format for your API              |
| `getName`        | Function which return name of a given user (taken from user infos API endpoint), default to `name`    |
| `getEmail`       | Function which return email of a given user, , default to `email`                                     |
| `getPermissions` | Function which return roles or permissions of a given user, default to `roles`                        |

### Full state cookies authentication

The [Laravel Sanctum Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/sanctum.js) offers full integration with [Laravel Sanctum](https://github.com/laravel/sanctum), the ideal official package for full state SPA authentication support.  
This is actually the recommended provider for Laravel if your app is on the same main domain (which is 99% use cases), because it's more secure (insensitive to XSS attacks thanks to HttpOnly cookies) and it works seamlessly with impersonation feature as well as the elFinder File manager.

:::warning CSRF
As always with all based-cookies authentication system, you'll need a specific `csrf` route in order to get the XSRF token. Default is setted to `/sanctum/csrf-cookie` so you have not to do anything if you use Laravel Sanctum with default config.  
By calling this URL, a local `XSRF-TOKEN` cookies will be stored with HttpOnly setted to `false`. This allows axios to fetch it and set it as header request via `X-XSRF-TOKEN` for every next requests.  
Don't forget to set `withCredentials` axios config to `true` order to include session cookies on ever XHR request.
:::

In order to work on fresh Laravel project, simply run `composer require laravel/sanctum` and be sure to add the middleware for `api` routes :

```php{3}
// app/Http/Kernel.php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:300,1',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### JWT for stateless authentication

Use the [JWT Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/jwt.js) for HTTP stateless authentication. It was fully tested on Laravel with [Laravel JWT](https://github.com/tymondesigns/jwt-auth) package. It should work with official [Laravel Passwort](https://github.com/laravel/passport) as well.

With this provider, a simple bearer token will be injected on `Authorization` header for every next XHR requests. The JWT will be stored inside user localStorage under a configurable key. A specific `refresh` routes can be used if you want auto refresh token on every page change.

:::danger LESS FEATURES
If you prefer to use JWT (or even basic...) authentication mode instead of Sanctum, you'll lose elFinder integration as well as impersonation feature.
:::

### Basic HTTP authentication

The [Basic HTTP Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/basic.js) can be used for basic cases. The full basic auth credentials will be simply sent to every XHR requests.

By default, basic auth will just return the username used for credentials. If you prefer use a specific API endpoint in order to give to VA more user informations, which is recommended if you need functional profile editing, you must set the user route as follow :

```js{7-9}
// src/plugins/admin.js
import { laravelDataProvider, basicAuthProvider } from "vtec-admin";
//...
export default new VtecAdmin({
  //...
  authProvider: basicAuthProvider(http, {
    routes: {
      user: "/api/user",
    }
  }),
  //...
});
```

## Auth Pages

> All unauthenticated pages as `Login`, `Register`, or any custom public pages should be registered as classic pages inside your base router file in `src/router/index.js`. It allows you to use any custom public layout.  
> Custom authenticated pages should use dedicated `src/router/admin.js`. This file is generated by Vue CLI Plugin, it's a simple admin route object which made use of all admin layout with app bar header and sidebar. Look at basic example [here](https://github.com/okami101/vtec-admin/blob/master/packages/cli/generator/template/src/router/admin.js). This routes are not registred into main router from the start because of [Vue Router children registration limitation](https://github.com/vuejs/vue-router/issues/1156) and must be injected manually into VtecAdmin constructor.

### Login page

![login](/assets/login.jpg)

:::tip VUE CLI PLUGIN
[Vue CLI VA Plugin](#getting-started) will generate for you all fully functionnal login page !  
If not using it, you can start with [login boilerplate page](https://github.com/okami101/vtec-admin/blob/master/packages/cli/generator/template/src/views/Login.vue) for your own.
:::

In order to work, login page must have a classic login form

### Profile page

![profile](/assets/profile.png)

:::tip VUE CLI PLUGIN
[Vue CLI VA Plugin](#getting-started) will generate for you all fully functionnal profile page !
If not using it, you can start with [profile boilerplate page](https://github.com/okami101/vtec-admin/blob/master/packages/cli/generator/template/src/views/Profile.vue) for your own.
:::
