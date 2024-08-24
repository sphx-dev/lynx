
clean:
	@rm -rf build

lint:
	@yarn lint --max-warnings=0
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


helm:
	helm package --app-version=latest helm/lynxweb
	helm upgrade --install lynxweb -f helm/lynxweb/values.dev.yaml ./lynxweb-0.1.0.tgz --set lynxweb.tag=latest --namespace dev

helm-d:
	helm uninstall lynxweb --namespace dev
