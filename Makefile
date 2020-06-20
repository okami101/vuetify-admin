.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install-laravel: ## install laravel tutorial dependencies
	@cd ./examples/laravel && composer install

install-demo-laravel: ## install laravel demo dependencies
	@cd ./examples/demo-laravel && composer install

run-tutorial: ## run the tutorial example
	@cd ./examples/tutorial && yarn serve --open

run-api-platform: ## run the api-platform example
	@cd ./examples/api-platform && yarn serve --open --port 8000

run-laravel: ## serve laravel tutorial
	@cd ./examples/laravel && php artisan serve

run-laravel-admin: ## run the admin UI of laravel tutorial example
	@cd ./examples/laravel/admin && yarn serve --open

run-demo-laravel: ## serve laravel demo
	@cd ./examples/demo-laravel && php artisan serve

migrate-demo-laravel: ## migrate database laravel demo
	@cd ./examples/demo-laravel && docker-compose exec laravel php artisan migrate --force

up-demo-laravel: ## run laravel demo through Docker
	@make install-demo-laravel
	@cd ./examples/demo-laravel && cp -n .env.example .env && docker-compose up -d

stop-demo-laravel: ## stop laravel demo
	@cd ./examples/demo-laravel && docker-compose stop

restart-demo-laravel: ## restart laravel demo
	@cd ./examples/demo-laravel && docker-compose restart

init-demo-laravel: ## initialize laravel demo
	@cd ./examples/demo-laravel && docker-compose exec laravel init

seed-demo-laravel: ## seed laravel demo with dummy data
	@cd ./examples/demo-laravel && docker-compose exec laravel seed

prepare-demo-laravel: ## initialize laravel with dummy data
	@make init-laravel
	@make seed-laravel

reset-demo-laravel: ## reset laravel with dummy data
	@cd ./examples/demo-laravel && docker-compose exec laravel php artisan migrate:fresh --seed

tinker-demo-laravel: ## access laravel console
	@cd ./examples/demo-laravel && docker-compose exec laravel php artisan tinker

run-demo: ## run the demo example
	@cd ./examples/demo && yarn serve --open

build-demo: ## compile the demo example to static js
	@cd ./examples/demo && yarn -s build
	@make restart-demo-laravel

build-admin: ## compile the admin library to static js
	@cd ./packages/admin && yarn -s build

run-docs: ## run the docs
	@cd ./docs && yarn docs:dev --port 9000

build-docs: ## compile the docs into to static js
	@cd ./docs && yarn -s docs:build

build-all: ## build all admin lib, demo and docs
	@make build-admin
	@make build-docs
	@make build-demo
