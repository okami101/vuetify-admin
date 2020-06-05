# API Platform

In order to demonstrate how we can easily change server API while keeping same Admin UI, let's try another more advanced API backend with stateless JWT authentication.

:::tip SOURCE CODE
You will find complete source code of this sample [in the main repo](https://github.com/okami101/vtec-admin/tree/master/examples/api-platform).
:::

## Run backend

First clone the official [API Platform demo project](https://github.com/api-platform/demo) and follow readme instructions for running it on docker :

```bash
docker-compose up
docker-compose exec php bin/console hautelook:fixtures:load
```

In the end, API Platform you should to access on API Swagger UI at [http://localhost:8080](http://localhost:8080).  
You can also have a React Admin example running at [https://localhost:444](https://localhost:444), perfect for compare.  
This API demo serves mainly 2 entities `Book` and `Review`.

## Prepare admin UI

First install a new Vue CLI project, as same way as previous tutorial. On Vtec wizard :

* Select `Hydra` as **data provider** and `JWT` for stateless **authentication**.
* Sets appropriate **API endpoint** to `http://localhost:8080`.
* Let **users** and **material** theme disabled.
* We don't need of any **profile** or **impersonation** feature either.

Then launch app by `yarn serve --open --port 8000` you should arrive to this login page :

![login](/assets/api-platform/login.jpg)

## Authentication

Before go further we need to configure axios and plug JWT auth provider to symfony token authentication route :

**`src/plugins/admin.js`**

```js {6-8,17-22}
//...
const baseURL = process.env.VUE_APP_API_URL || "http://localhost:8080";

const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/ld+json",
  },
});

/**
 * Init admin
 */
export default new VtecAdmin({
  //...
  dataProvider: hydraDataProvider(http),
  authProvider: jwtAuthProvider(http, {
    routes: {
      login: "/authentication_token",
    },
    getToken: (r) => r.token,
  }),
  //...
});
```

To resume we add a specific accept header `application/ld+json` and add proper login route for fetch JWT token from valid credentials. `getToken` is mainly a response formatter that give the final token from the HTTP response. It's enough to have a functional login process.

Try now to login as `admin@example.com` / `admin` and you should be redirected at an empty dashboard page.

:::warning
API Platform Demo doesn't provide user information routes, explicit logout, users or profile management, it's up to you to add this features.
:::

## Disable unsupported features

API Platform demo doesn't support by default global search or any configurable items per page for pagination which is forced to 30 items on server side. So let's disable this globally for all `VaList` components by default. For that use the `options.list` parameter on Vtec Admin constructor :

```js {6-11}
//...
export default new VtecAdmin({
  //...
  options: {
    dateFormat: "long",
    list: {
      disableGlobalSearch: true,
      disableItemsPerPage: true,
      itemsPerPage: 30,
      itemsPerPageOptions: [30],
    },
  },
});
```

## Add books and reviews

First register new resources :

**`src/resources/index.js`**

```js
export default [
  {
    name: "books",
    icon: "mdi-book",
    label: "title",
  },
  {
    name: "reviews",
    icon: "mdi-comment",
    label: "author",
  },
];
```

Next add new resource links :

```js {8,9}
export default (i18n, admin) => [
  {
    icon: "mdi-view-dashboard",
    text: i18n.t("menu.dashboard"),
    link: "/",
  },
  { divider: true },
  admin.getResourceLink("books"),
  admin.getResourceLink("reviews"),
];
```

Then create all crud pages for both resources by copy paste template code from console browser log as shown on previous tutorial.

## Add supported API features

### Books list

API Platform demo support sorting on all fields for books. We can also filter on both title and author. API Platform use annotation for adding all this features :

**`api/src/Entity/Book.php`**

```php {6,7,16,22,29,35}
/**
 * A book.
 *
 * //...
 *
 * @ApiFilter(PropertyFilter::class)
 * @ApiFilter(OrderFilter::class, properties={"id", "title", "author", "isbn", "publicationDate"})
 */
class Book
{
    //...

    /**
     * @var string|null The title of the book
     *
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     * @Assert\NotBlank
     * @ORM\Column
     * @Groups({"book:read", "review:read"})
     * @ApiProperty(iri="http://schema.org/name")
     */
    public $title;

    //...

    /**
     * @var string|null The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably
     *
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     * @Assert\NotBlank
     * @ORM\Column
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/author")
     */
    public $author;

    //...
}
```

So let's add them to our books list UI :

```vue {21-27}
<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list :filters="filters">
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      filters: ["title", "author"],
      fields: [
        { source: "isbn", sortable: true },
        { source: "title", sortable: true },
        { source: "author", sortable: true },
        { source: "publicationDate", type: "date", sortable: true },
      ],
    };
  },
};
</script>
```

As the demo give us all reviews associated to books, we can retrieve them on separate columns and format them as material linkable chip group thanks to [reference array](crud/fields.md#reference-array).

```vue {9-13}
<script>
export default {
  props: ["title"],
  data() {
    return {
      filters: ["title", "author"],
      fields: [
        //...
        {
          source: "reviews",
          type: "reference-array",
          attributes: { reference: "reviews", itemText: "id", column: true },
        },
      ],
    };
  },
};
</script>
```

It's enough to render this final page :

![books](/assets/api-platform/books.png)

Title and author filter will appear under `Add filter` dropdown. You can use `alwaysOn` if you prefer to keep them always visible on left side.

All review chip will link to the full default review show page.

### Book form

Symfony constraints can be defined on any entity property via the specific `Assert` annotation. For book entity :

**`api/src/Entity/Book.php`**

```php {8,19,29,40,50,51}
class Book
{
    //...

    /**
     * @var string|null The ISBN of the book
     *
     * @Assert\Isbn
     * @ORM\Column(nullable=true)
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/isbn")
     */
    public $isbn;

    /**
     * @var string|null The title of the book
     *
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     * @Assert\NotBlank
     * @ORM\Column
     * @Groups({"book:read", "review:read"})
     * @ApiProperty(iri="http://schema.org/name")
     */
    public $title;

    /**
     * @var string|null A description of the item
     *
     * @Assert\NotBlank
     * @ORM\Column(type="text")
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/description")
     */
    public $description;

    /**
     * @var string|null The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably
     *
     * @ApiFilter(SearchFilter::class, strategy="ipartial")
     * @Assert\NotBlank
     * @ORM\Column
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/author")
     */
    public $author;

    /**
     * @var \DateTimeInterface|null The date on which the CreativeWork was created or the item was added to a DataFeed
     *
     * @Assert\Type(\DateTimeInterface::class)
     * @Assert\NotNull
     * @ORM\Column(type="date")
     * @Groups("book:read")
     * @ApiProperty(iri="http://schema.org/dateCreated")
     */
    public $publicationDate;

    //...
}

```

On admin UI side, here is the final code for a functional book form :

**`src/resource/books/Form.vue`**

```vue
<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="4">
        <v-card>
          <v-card-text>
            <va-text-input source="isbn"></va-text-input>
            <va-text-input source="title"></va-text-input>
            <va-text-input source="description" multiline></va-text-input>
            <va-text-input source="author"></va-text-input>
            <va-date-input source="publicationDate"></va-date-input>
            <va-save-button></va-save-button>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
};
</script>
```

Hydra provider will automatically send data form model to API Platform and return formatted Symfony constraint validations that Vtec Admin can process :

![validation](/assets/api-platform/validation.png)

Server ISBN validation will return error as well if invalid.

Go to [hydra provider source code](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/data/hydra.js) in order to get deeper on how it works. See [errors section](data-provider.md#errors-handling).

### Reviews list

For reviews, demo allows sort by publication date and filtering by book.

**`api/src/Entity/Review.php`**

```php {3,11}
/**
 * //...
 * @ApiFilter(OrderFilter::class, properties={"id", "publicationDate"})
 */
class Review
{
    //...
    /**
     * @var Book The item that is being reviewed/rated
     *
     * @ApiFilter(SearchFilter::class)
     * @Assert\NotNull
     * @ORM\ManyToOne(targetEntity=Book::class, inversedBy="reviews")
     * @Groups("review:read")
     * @ApiProperty(iri="http://schema.org/itemReviewed")
     */
    private $book;

    //...
}
```

The optimized reviews list page will be :

```vue {21-38}
<template>
  <v-card>
    <v-card-title>
      <h1 class="display-1">
        {{ title }}
      </h1>
    </v-card-title>
    <v-card-text>
      <va-list :filters="filters">
        <va-data-table :fields="fields"></va-data-table>
      </va-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      filters: [
        {
          source: "book",
          type: "autocomplete",
          attributes: { reference: "books", searchQuery: "title" },
        },
      ],
      fields: [
        {
          source: "book",
          type: "reference",
          attributes: { reference: "books" },
        },
        "body",
        { source: "rating", type: "rating" },
        "author",
        { source: "publicationDate", type: "date", sortable: true },
      ],
    };
  },
};
</script>
```

We'll use the reference field in order to have a direct link to a given book. The book filter is just a autocomplete input that reference `books` resource and use `title` as searchQuery.

The result will be :

![reviews](/assets/api-platform/reviews.png)

### Reviews form

Here is the full code :

**`src/resource/reviews/Form.vue`**

```vue
<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col sm="4">
        <v-card>
          <v-card-text>
            <va-autocomplete-input
              source="book"
              reference="books"
              item-value="@id"
              search-query="title"
            ></va-autocomplete-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-rating-input source="rating"></va-rating-input>
            <va-text-input source="author"></va-text-input>
            <va-date-input source="publicationDate"></va-date-input>
            <va-save-button></va-save-button>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "item"],
};
</script>
```

The main particularity is the autocomplete for setting the book to be attached to the review. We need to precise `@id` in `item-value` prop because API Platform needs a full IRI for get the internal entity reference.

The final result :

![form](/assets/api-platform/form.png)

## Conclusion

You now have all a basic concepts for integration of Vtec Admin with real API backend. Go to the next [Laravel section](laravel.md) which is the most ready to go backend for Vtec Admin thanks to a powerful composer package that provides all minimal stuff for a real admin with file manager, user and profile management, impersonation and so on. It will also demonstrate the power of included code generators from top to bottom.
