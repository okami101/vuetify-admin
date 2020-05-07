# Data Providers

As soon as Vtec Admin has to communicate with your backend API, it calls the adapted method on your provider that will be responsible for fetching or updating resource data.

<code-heading type="js"></code-heading>
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

In order to give to Vtec Admin the ability of fetching remote resource data, you must inject a specific data provider into his constructor as explained in [next chapiter](admin).
