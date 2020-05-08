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

Note : for getList operation, VA expects this response format :

```json
{
  "data": [...],
  "meta": {
    "total": 1234
  }
}
```

:::warning Paging count
As showed here, in order to make [data iterator](components/list) aware of pager count you'll need to return the total of filtred dataset on server-side on separated meta JSON object.
:::

### Supported API operation methods

#### getList

Used for all resources browsing context, as

* [Data iterator component](components/list) for showing list of resources inside datagrid or any custom list layout component. Should support specific field selection, as well as filtering, sorting and relation fetching.
* [Export button](components/list#export) for filtred CSV resources exporting.
* Entity referable choices component as [Autocomplete](components/inputs#autocomplete), [Select](components/inputs#select), or [RadioGroup](components/inputs#radio-group).

#### getOne

For showing detail of resource, mainly for [Show page](components/crud#show) or datagrid show actions.

#### getMany

Only used for [Autocomplete](components/inputs#autocomplete) in order to fetch all current choices by ids at first load, whether it be on [editing page context](components/crud#edit) or [query context filtering](components/list#filter). As opposed to [RA Reference field](https://marmelab.com/react-admin/Fields.html#referencefield), the [VA Reference Field](components/fields#reference) doesn't actually have a the ability of fetching data via getMany by privileging more efficient full server-side eager-loading.

#### create, update

Used by [VA Form](components/crud#form) for creating new or updating existing resource.

#### delete

Simple delete action called when interacting with [VA Delete Button](components/crud#delete).

#### updateMany, deleteMany

Bulk actions on [list page](components/list). If your backend doesn't support a bulk action API, the simplest way is to push a Promise.all towards all unique simple operation method (update or delete) as you will find on Laravel Data Provider source code.

### [Translatable resources](#translatable)

In case of a [translatable resource](i18n#translatable), Vtec Admin will add an additional `locale` property into `params` object. It's up to you to push this locale context to your API server inside your provider. For instance you can just add a new `locale` parameter in API query string as next : `/books/1?locale=fr`. Then it's the server job to do the remaining job, aka fetching the targetted field locale in case of resource reading, or save the text field on targetted locale in case of resource creating/editing.

## Laravel Data Provider

[Laravel Data Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/laravelDataProvider.js) is actually the only available data provider that implements previous contract. Use it as a base example for implementing your's. If you use standard REST API protocol, only few lines has to be changed, mainly for GET_LIST part.

This provider is intended to be use by official [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package as [explained on Laravel guide](laravel).

:::tip Existing Laravel Project
You even can use it easily without official package if you use [Laravel Query Builder](https://github.com/spatie/laravel-query-builder) which is the perfect package for implementing api resource browsing, mainly for list pages and data iterator component. All rest of crud operations are standard Laravel CRUD operations.
:::

### Methods to API call

| Operation  | API Call Format                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| getList    | GET /books?fields[books]=id,isbn,title&include=media&page=1&perPage=15&sort=-name&filter={"q":"douglas"} |
| getOne     | GET /books/1                                                                                             |
| getMany    | GET /books?filter={"id":[1,2,3]}                                                                         |
| create     | POST /books                                                                                              |
| update     | PUT /books/1                                                                                             |
| updateMany | Multiple calls to PUT /books/{id}                                                                        |
| delete     | DELETE /books/1                                                                                          |
| deleteMany | Multiple calls to DELETE /books/{id}                                                                     |

> For `DESC` sorting, we use a simple dash before the sortable field. Multiple sort is supported by simply adding more sortable fields separated by comma.
> The `include` parameter is used for eager loading relation.

### Usage

In order to work, this provider needs an specific `axios` instance :

```js
import { laravelDataProvider } from "vtec-admin";
import axios from "axios";

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

let dataProvider = laravelDataProvider(http)
```

It allows you to have full control of request, by taking cookies credentials, set baseURL, adding any custom HTTP headers as JWT token, using axios request interceptors, etc. You can even add specific provider baseURL if needed via second function arguments `laravelDataProvider(http, '/api')` in case you want to use existing global axios instance.

:::warning FormData
Laravel Data Provider use classic FormData for all api calls instead of simple JSON. It providers better Laravel integration for file uploads with ready-to-go file validation as well as UploadedFile auto conversion object.  
For better reusability, a dedicated converter is available [here](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/utils/objectToFormData.js). To use it for your own provider, simply import it by `import { objectToFormData } from "vtec-admin";`
:::

### Writing your own provider

// TODO
