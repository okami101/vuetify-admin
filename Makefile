.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	@yarn

install-laravel: ## install laravel demo dependencies
	@cd ./examples/laravel && composer install

run-demo: ## run the demo example
	@cd ./examples/demo && yarn serve --open

build-demo: ## compile the demo example to static js
	@cd ./examples/demo && yarn -s build
	@cd ./examples/laravel && docker-compose restart

migrate-laravel-db: ## migrate database laravel demo
	@cd ./examples/laravel && docker-compose exec laravel php artisan migrate --force

run-laravel: ## run laravel demo
	@cd ./examples/laravel && cp -n .env.example .env && docker-compose up

init-laravel: ## initialize laravel
	@cd ./examples/laravel && docker-compose exec laravel init

seed-laravel: ## seed laravel with dummy data
	@cd ./examples/laravel && docker-compose exec laravel seed

prepare-laravel: ## initialize laravel with dummy data
	@make init-laravel
	@make seed-laravel

reset-laravel: ## reset laravel with dummy data
	@cd ./examples/laravel && docker-compose exec laravel php artisan migrate:fresh --seed

tinker-laravel: ## access laravel console
	@cd ./examples/laravel && docker-compose exec laravel php artisan tinker

build-lib: ## compile the admin library to static js
	@cd ./packages/admin && yarn -s build

run-docs: ## run the docs
	@cd ./packages/docs && yarn dev

build-docs: ## compile the docs into to static js
	@cd ./packages/docs && yarn -s build
