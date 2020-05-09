# Authentication

Vtec Admin as a admin app first of all offers few batteries helpers in order to integrate with all different kind of authentication system, aka basic HTTP auth, JWT, OAUTH. Similar as [data providers](data-providers), an adapter approach pattern is also used, which allows VA to communicate with you own API server authentication by writing your own auth provider.

![login](/assets/login.jpg)

:::danger JWT
If you prefer to use [Laravel JWT](https://github.com/tymondesigns/jwt-auth) instead of Sanctum, you'll lose elFinder integration as well as impersonation feature.
:::

![profile](/assets/profile.png)
