install:
	npm install

lint:
	npm run eslint .

publish:
	npm publish

test:
	npm t

watch:
	npm t -- --watch