.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	@yarn

run-demo: ## run the demo example
	@cd ./examples/demo && yarn serve

build-demo: ## compile the demo example to static js
	@cd ./examples/demo && yarn -s build
	@cd ./examples/laravel && docker-compose restart

install-laravel: ## install laravel demo
	@cd ./examples/laravel && composer install && docker-compose exec laravel php artisan migrate --force

run-laravel: ## run laravel demo
	@cd ./examples/laravel && docker-compose up

build-lib: ## compile the admin library to static js
	@cd ./packages/admin && yarn -s build

run-docs: ## run the docs
	@cd ./packages/docs && yarn dev

build-docs: ## compile the docs into to static js
	@cd ./packages/docs && yarn -s build
