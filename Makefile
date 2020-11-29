# This is authority from @guicheffer | guicheffer.me

PKG:=yarn

help:
	@echo
	@echo "✍🏽  Please use 'make <target>' where <target> is one of the commands below:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e "s/\\$$//" | sed -e "s/##//"
	@echo

# ------------------------------------------------------------------------------------ #

i: install
install: ## install stuff
	$(PKG) install

dev: ## start development
	make install
	$(PKG) start

start: ## build environment based
	make install
	$(PKG) build
	$(PKG) serve

deploy: start
build: start
serve: start
prod: start
production: prod

test: test-stuff
test-stuff: ## test stuff
	$(PKG) test

test-coverage: ## test stuff and it generates coverage afterwards
	$(PKG) test:coverage
