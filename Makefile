.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

laravel: ## Initialize laravel base skeleton for quick clean backend start
	@echo "Prepare laravel skeleton...";
	@rm -rf laravel-skeleton
	@mkdir laravel-skeleton
	@cp -r examples/laravel/{bootstrap,config,resources,routes,tests,.dockerignore,.editorconfig,.env.example,.gitattributes,.gitignore,.php_cs.dist,.styleci.yml,artisan,composer.json,docker-compose.yml,Dockerfile,phpunit.xml,README.md,server.php} laravel-skeleton
	@cd laravel-skeleton && rm bootstrap/cache/packages.php bootstrap/cache/services.php
	@mkdir -p laravel-skeleton/app/Http/Controllers
	@mkdir -p laravel-skeleton/app/Http/Requests
	@mkdir -p laravel-skeleton/app/Http/Resources
	@cp -r examples/laravel/app/{Console,Exceptions,Faker,ModelTraits,Providers,User.php} laravel-skeleton/app
	@cp -r examples/laravel/app/Http/{Filters,Middleware,Kernel.php} laravel-skeleton/app/Http
	@cp -r examples/laravel/app/Http/Controllers/{Auth,Controller.php,AccountController.php,UserController.php} laravel-skeleton/app/Http/Controllers
	@cp -r examples/laravel/app/Http/Requests/{StoreUser.php,UpdateUser.php} laravel-skeleton/app/Http/Requests
	@cp -r examples/laravel/app/Http/Resources/User.php laravel-skeleton/app/Http/Resources
	@mkdir -p laravel-skeleton/database/factories
	@mkdir -p laravel-skeleton/database/migrations
	@mkdir -p laravel-skeleton/database/seeds
	@cp -r examples/laravel/database/.gitignore laravel-skeleton/database
	@cp -r examples/laravel/database/factories/UserFactory.php laravel-skeleton/database/factories
	@cp -r examples/laravel/database/migrations/{2014_10_12_000000_create_users_table.php,2014_10_12_100000_create_password_resets_table.php,2019_08_19_000000_create_failed_jobs_table.php} laravel-skeleton/database/migrations
	@cp -r examples/laravel/database/seeds/{DatabaseSeeder.php,UserSeeder.php} laravel-skeleton/database/seeds
	@mkdir -p laravel-skeleton/docker/mysql
	@mkdir -p laravel-skeleton/docker/nginx
	@cp -r examples/laravel/docker/{laravel,phpmyadmin,redis} laravel-skeleton/docker
	@cp -r examples/laravel/docker/nginx/{conf.d,Dockerfile} laravel-skeleton/docker/nginx
	@cp -r examples/laravel/docker/mysql/{my.cnf,Dockerfile} laravel-skeleton/docker/mysql
	@mkdir -p laravel-skeleton/public
	@cp -r examples/laravel/public/{.htaccess,favicon.ico,index.php,robots.txt} laravel-skeleton/public
	@mkdir -p laravel-skeleton/storage/app/public/files
	@mkdir -p laravel-skeleton/storage/app/public/media
	@mkdir -p laravel-skeleton/storage/clockwork
	@mkdir -p laravel-skeleton/storage/framework/cache/data
	@mkdir -p laravel-skeleton/storage/framework/sessions
	@mkdir -p laravel-skeleton/storage/framework/testing
	@mkdir -p laravel-skeleton/storage/framework/views
	@mkdir -p laravel-skeleton/storage/logs
	@cp -r examples/laravel/storage/app/.gitignore laravel-skeleton/storage/app
	@cp -r examples/laravel/storage/app/public/media/.gitignore laravel-skeleton/storage/app/public/media
	@cp -r examples/laravel/storage/app/public/files/.gitignore laravel-skeleton/storage/app/public/files
	@cp -r examples/laravel/storage/app/public/.gitignore laravel-skeleton/storage/app/public
	@cp -r examples/laravel/storage/clockwork/.gitignore laravel-skeleton/storage/clockwork
	@cp -r examples/laravel/storage/framework/cache/.gitignore laravel-skeleton/storage/framework/cache
	@cp -r examples/laravel/storage/framework/cache/data/.gitignore laravel-skeleton/storage/framework/cache/data
	@cp -r examples/laravel/storage/framework/sessions/.gitignore laravel-skeleton/storage/framework/sessions
	@cp -r examples/laravel/storage/framework/testing/.gitignore laravel-skeleton/storage/framework/testing
	@cp -r examples/laravel/storage/framework/views/.gitignore laravel-skeleton/storage/framework/views
	@cp -r examples/laravel/storage/logs/.gitignore laravel-skeleton/storage/logs
