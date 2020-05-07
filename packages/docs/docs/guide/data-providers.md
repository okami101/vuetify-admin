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

[dataActions contract](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/utils/dataActions.js)
[Laravel Data Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/laravelDataProvider.js)
