# Resources

A "resource" means a given server entity which can be managed by Vtec Admin, aka created/read/updated/deleted.

## Resource object structure

A resource object must follow this structure :

* A mandatory slug name which will be used for api url calls.
* An icon for identify it in sidebar or list page.
* Indicator if this resource can be translated, in this case, a new query string with locale will be added on each api calls, it's up to you to handle it on backend.
* List of available actions for this resource. By default all 5 operations are active (list / show / create / edit / delete). You can use `except` or `only` properties for blacklist or whitelist few actions. All removed actions will reflected on all crud pages and Vue Router will be adapted accordingly.
* Permissions for user resource operations filtering.
