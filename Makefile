PORT=8000

# default target is to show help
help:
	@echo "make build         - create virtual environment and download packages"
	@echo "make clean         - remove virtual environment"
	@echo "make run           - run webserver on port $(PORT)"
	@echo "                     (make run PORT=8080 for custom port)"
	@echo "make shell         - django shell"
	@echo "make db            - syncdb and migrate"
	@echo "make test          - test"

build: virtualenv pip packages

virtualenv:
	@echo ----- Creating virtual environment -----
	virtualenv .env

pip:
	@echo ----- Install PIP inside virtual environment -----
	.env/bin/easy_install pip

packages:
	@echo ----- Installing dependencies to virtual environment -----
	.env/bin/pip install -r ./requirements.txt

clean:
	@echo ----- Removing virtual environment -----
	rm -rf .env

static: collectstatic

collectstatic:
	./manage.py collectstatic --noinput

compilestatic:
	./manage.py compilestatic

run:
	./manage.py runserver_plus 0.0.0.0:$(PORT)

shell:
	./manage.py shell_plus

sync:
	./manage.py syncdb

migrate:
	./manage.py migrate

db: sync migrate

init_db: db

test:
	./manage.py test --settings=settings_test

.PHONY: help build virtualenv pip packages clean static run shell db test
