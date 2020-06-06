.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install-laravel: ## install laravel tutorial dependencies
	@cd ./examples/generators && composer install

install-laravel-demo: ## install laravel demo dependencies
	@cd ./examples/laravel && composer install

run-tutorial: ## run the tutorial example
	@cd ./examples/tutorial && yarn serve --open

run-api-platform: ## run the api-platform example
	@cd ./examples/api-platform && yarn serve --open --port 8000

run-laravel: ## serve laravel generators
	@cd ./examples/generators && php artisan serve

run-laravel-admin: ## run the admin UI of generators example
	@cd ./examples/generators/admin && yarn serve --open

run-laravel-demo: ## serve laravel demo
	@cd ./examples/laravel && php artisan serve

migrate-laravel-demo: ## migrate database laravel demo
	@cd ./examples/laravel && docker-compose exec laravel php artisan migrate --force

up-laravel-demo: ## run laravel demo through Docker
	@cd ./examples/laravel && cp -n .env.example .env && docker-compose up -d

stop-laravel-demo: ## stop laravel demo
	@cd ./examples/laravel && docker-compose stop

restart-laravel-demo: ## restart laravel demo
	@cd ./examples/laravel && docker-compose restart

init-laravel-demo: ## initialize laravel demo
	@cd ./examples/laravel && docker-compose exec laravel init

seed-laravel-demo: ## seed laravel demo with dummy data
	@cd ./examples/laravel && docker-compose exec laravel seed

prepare-laravel-demo: ## initialize laravel with dummy data
	@make init-laravel
	@make seed-laravel

reset-laravel-demo: ## reset laravel with dummy data
	@cd ./examples/laravel && docker-compose exec laravel php artisan migrate:fresh --seed

tinker-laravel-demo: ## access laravel console
	@cd ./examples/laravel && docker-compose exec laravel php artisan tinker

run-demo: ## run the demo example
	@cd ./examples/demo && yarn serve --open

build-demo: ## compile the demo example to static js
	@cd ./examples/demo && yarn -s build
	@make restart-laravel-demo

build-admin: ## compile the admin library to static js
	@cd ./packages/admin && yarn -s build

docgen-api: ## generate api docs
	@cd ./packages/admin && node docgen

run-docs: ## run the docs
	@make docgen-api
	@cd ./packages/docs && yarn dev --port 9000

build-docs: ## compile the docs into to static js
	@make docgen-api
	@cd ./packages/docs && yarn -s build

build-all: ## build all admin lib, demo and docs
	@make build-admin
	@make build-docs
	@make build-demo
