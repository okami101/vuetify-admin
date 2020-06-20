# API Platform Tutorial

Purpose of this project is to test Vtec Admin within [API Platform](https://api-platform.com/) based on Symfony. Use provided hydra data provider and JWT authentication. Serve as demonstration with real API backend for main tutorial. See [dedicated part of documentation](https://vtec.okami101.io/guide/api-platform.html).

## How to run

### Backend API

Clone the [demo project](https://github.com/api-platform/demo) of API Platform and follow readme instructions for running it on docker :

```bash
docker-compose up
docker-compose exec php bin/console hautelook:fixtures:load
```

API Platform should be running at [http://localhost:8080](http://localhost:8080).

### Admin UI

```bash
yarn
yarn serve --port 8000
```

This should run at [http://localhost:8000](http://localhost:8000).
You can login as admin@example.com / admin.

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
