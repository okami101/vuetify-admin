# Vtec Admin Tutorial

Tutorial project which uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/). This should be the final state after following the [dedicated docs](https://vtec.okami101.io/guide/tutorial.html).

Also a good way to quickly test Vtec Admin with a fake backend.

## How to run

### Backend API

It's really advised to run placeholder backend on local instead of current online version for no saturate it. Don't worry it's done in less than 5 minutes.

Download this [Json file DB](https://github.com/typicode/jsonplaceholder/raw/master/data.json), Then start the terminal from where you put the file and do next steps :

```bash
npm install -g json-server
json-server --watch data.json
```

And voilà ! You should have a working API. Example of endpoint : [http://localhost:3000/posts?_start=0&_end=15](http://localhost:3000/posts?_start=0&_end=15).

### Admin UI

```bash
yarn
yarn serve
```

This should run at [http://localhost:8080](http://localhost:8080).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
