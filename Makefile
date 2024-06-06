
clean:
	@rm -rf build

lint:
	@yarn lint
	@yarn type-check

lint_fix:
	@yarn lint:fix

test:
	@vitest --run

pid:
	lsof -i|grep 3000

build:
	@yarn build_server
	@yarn build

docker:
	docker build -t lynx . && docker run --env-file ./scripts/env_docker.sh -it -p 9899:9899 lynx

start:
	yarn dev

server:
	yarn server

server_auth:
	BASIC_AUTH_ENABLED=true yarn server

.PHONY: lint clean
