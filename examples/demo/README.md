# Bookstore Admin

This demo project is the best showcase of [Vuetify Admin](https://www.npmjs.com/package/vuetify-admin), an admin library written in Vue.js and based on Vuetify.
The backend side API is served by other included [Laravel API demo](../laravel) project.
This project is also a perfect way for developing main [Vuetify Admin](../../packages/admin) lib of this repo.

[Access to online demo](https://va-demo.okami101.io)

[![demo](https://www.okami101.io/vuetify-admin/assets/screenshot.png)](https://va-demo.okami101.io)

> The separated [vuetify-admin](../../packages/admin) NPM package is directly symlinked via yarn workspaces.  
> By this way, HMR from this demo to the library is fully functional which is ideal for lib development with quick visual feedback !

## Features

* Usage of sanctum auth provider and laravel data providers
* Can be easily switched to JWT stateless or basic HTTP authentication
* Profile edition
* User management with simple roles and impersonation support
* Common list/create/show/edit bookstore resources views with :
  * Publishers
  * Authors (custom list layout)
  * Books (custom tabbed layout and wysiwyg)
  * Reviews
* Almost all supported fields used from main admin library, with Wysiwyg (TinyMCE 5) and file media uploading
* Publisher, authors and books entities are translatable
* Advanced filters
* Bulk actions

## How to run

Install all repo dependencies by `yarn`

Before following steps you must prepare the API demo by following [this steps](../laravel#how-to-run).  
If API different than default localhost:8000 then adapt your environment variables after `cp .env .env.local`

Then just `yarn serve --open` and it should be autostart !

### JWT authentication

For JWT provider testing purpose, the [Laravel JWT](https://github.com/tymondesigns/jwt-auth) package is already pre configured in Laravel demo project. In order to switch auth mode, simply follow following steps.

#### Laravel demo

First, change default guard to `api` :

```php
// app/auth.php
'defaults' => [
    'guard' => 'api',
    'passwords' => 'users',
],
```

Next, comment `EnsureFrontendRequestsAreStateful` middleware :

```php
// src/Http/Kernel.php
'api' => [
    //\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:300,1',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    \Okami101\LaravelAdmin\Http\Middleware\ReadOnly::class,
],
```

#### Vue CLI demo

Replace `sanctumAuthProvider` by `jwtAuthProvider` :

**`src/plugins/admin.js`**

```js
import { laravelDataProvider, jwtAuthProvider } from "vuetify-admin/providers";
//...
export default new VuetifyAdmin({
  //...
  authProvider: jwtAuthProvider(http),
  //...
});
```

As it's stateless now, you should retire `withCredentials: true` from axios config.

It should be now already fully working as a real stateless app ! JWT will be saved inside localStorage.

> Note that in this mode, you lose few features which needs stateful session in order to work, as impersonation and elFinder for file management.

### HTTP Basic authentication

On server-side, replace `EnsureFrontendRequestsAreStateful` middleware by `auth.basic`  :

```php
// src/Http/Kernel.php
'api' => [
    'auth.basic',
    'throttle:300,1',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
    \Okami101\LaravelAdmin\Http\Middleware\ReadOnly::class,
],
```

Finally, replace `sanctumAuthProvider` by `basicAuthProvider` as following :

**`src/plugins/admin.js`**

```js
import { laravelDataProvider, basicAuthProvider } from "vuetify-admin/providers";
//...
export default new VuetifyAdmin({
  //...
  authProvider: basicAuthProvider(http, {
    routes: {
      user: "/api/user",
    }
  }),
  //...
});
```

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
