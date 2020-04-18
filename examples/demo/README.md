# Bookstore Admin

This demo project is the admin UI part of [this online demo](https://vtec-bookstore-demo.okami101.io/admin), written in Vue.js and based on Vuetify.
The backend side API is served by other included [separate Laravel API demo](../laravel) project.
This project is also a perfect way for developing main [Vtec Admin](../../packages/admin) lib of this repo.

## Note on Vtec Admin library

The seprated [vtec-admin](../../packages/admin) NPM package is directly symlinked via yarn workspaces.\
By this way, HMR from this demo to the library is fully functional for quick visual development !

## Features

* Usage of sanctum auth provider and laravel data providers
* Profile edition
* User management with simple roles and impersonation support
* Common list/create/show/edit bookstore resources views with :
  * Publishers
  * Authors (custom paginable data iterator)
  * Books (custom tabbed layout and wysiwyg)
  * Reviews
* Almoste all supported fields used from main admin library, with Wysiwyg (TinyMCE 5) and file media uploading
* Publisher, authors and books entities are translatable
* Advanced filters
* Bulk actions

## How to run

Install all repo dependencies by `yarn`

Before following steps you must launch the [API demo](../laravel).\
If API different than default localhost:8000 then adapt your environment variables after `cp .env .env.local`

Then just `yarn serve --open` and it should be autostart !

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
