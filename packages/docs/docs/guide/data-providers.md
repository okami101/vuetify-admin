# Data Providers

As soon as Vtec Admin has to communicate with your backend API, it calls the adapted method on your provider that will be responsible for fetching or updating resource data.

```js
// Fetching books
let { data, meta } = await provider.getList("books", { page: 1, perPage: 10 });
console.log(data)

// Create new book
await provider.create("books", { data: { title: "My title" } });

// Fetching one book
let book = await provider.getOne("books", { id: 1 });
console.log(book)

// Update title book
await provider.update("books", { id: book.id, data: { title: "New title" } });

// Delete book
await provider.delete("books", { id: book.id });
```

All fetching methods of a data provider is standardized in order to ensure compatibility between Vtec Admin with any API server. This is the adapter pattern which allows all kind of different provider for each type of backend of any exchange protocol, whether it be REST, GraphQL, or even SOAP...

![Data Provider](/diagrams/data-provider.svg)

In order to give to Vtec Admin the ability of fetching remote resource data, you must inject a specific data provider into his constructor as explained in [next chapiter](admin).

## API Contract

As always for any adapter pattern approach, all data providers must respect a given contract in order to allow communication with Vtec Admin. Next object represents the minimal contract that must be implemented :

```js
const dataProvider = {
  getList:    (resource, params) => Promise,
  getOne:     (resource, params) => Promise,
  getMany:    (resource, params) => Promise,
  create:     (resource, params) => Promise,
  update:     (resource, params) => Promise,
  updateMany: (resource, params) => Promise,
  delete:     (resource, params) => Promise,
  deleteMany: (resource, params) => Promise,
}
```

> You will find [here](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/utils/dataActions.js) all fetching methods that will be used by Vtec Admin.  

### Supported API operation methods

* getList : Used for all resources browsing context, as
  * [Data iterator component](components/list) for showing list of resources inside datagrid or any custom list layout component.
  * [Export button](components/list#export) for filtred CSV resources exporting.
  * Entity referable choices component as [Autocomplete](components/inputs#autocomplete), [Select](components/inputs#select), or [RadioGroup](components/inputs#radio-group).
* getOne : For showing detail of resource, mainly for [Show page](components/crud#show) or datagrid show actions.
* getMany : Only used for [Autocomplete](components/inputs#autocomplete) in order to fetch all current choices by ids at first load, whether it be on [editing page context](components/crud#edit) or [query context filtering](components/list#filter). As opposed to React Admin, Vtec Admin does'nt actually have a [Reference field](https://marmelab.com/react-admin/Fields.html#referencefield) which the main purpose of getMany operation.

### Laravel Data Provider

[Laravel Data Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/laravelDataProvider.js) is actually the only available data provider that implements previous contract. Use it as a base example for implementing your's. If you use standard REST API protocol, only few lines has to be changed, mainly for GET_LIST part.

This provider is intended to be use by official [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package as [explained on Laravel guide](laravel).

:::tip Existing Laravel Project
You even can use it easily without official package if you use [Laravel Query Builder](https://github.com/spatie/laravel-query-builder) which is the perfect package for implementing api resource browsing, mainly for list pages and data iterator component. All rest of crud operations are standard Laravel implementations.
:::
