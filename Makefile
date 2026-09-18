COMPOSE = podman compose
RUN = $(COMPOSE) run --rm --no-deps app

.PHONY: install start build build-docs test lint fmt sh stop

install:
	$(RUN) install

start:
	@echo ""
	@echo "  Portfolio: http://portfolio.localhost:8088"
	@echo "  Storybook: http://storybook.localhost:8088"
	@echo "  Admin:     http://admin.localhost:8088"
	@echo ""
	$(COMPOSE) up proxy devsite storybook admin

build:
	$(RUN) build

build-docs:
	$(RUN) build-docs

test:
	$(RUN) test

lint:
	$(RUN) lint

fmt:
	$(RUN) fmt

sh:
	$(RUN) sh

stop:
	$(COMPOSE) down
