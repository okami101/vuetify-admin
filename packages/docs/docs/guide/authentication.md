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

### Full state cookies authentication

The [Laravel Sanctum Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/sanctum.js) offers full integration with [Laravel Sanctum](https://github.com/laravel/sanctum), the ideal official package for full state SPA authentication support.  
This is actually the recommended provider if your app is on the same main domain (which is 99% use cases), because it's more secure (no sensible to XSS attacks with HTTP only cookies) and it works seamlessly with impersonation feature as well as the elFinder File manager.

### JWT for stateless authentication

Fully tested on Laravel with [Laravel JWT](https://github.com/tymondesigns/jwt-auth) package. Should work with official [Laravel Passwort](https://github.com/laravel/passport) as well.

:::danger JWT
If you prefer to use JWT (or even basic...) authentication mode instead of Sanctum, you'll lose elFinder integration as well as impersonation feature.
:::

### Basic HTTP authentication

To use only for basic cases.

## Profile management

![profile](/assets/profile.png)
