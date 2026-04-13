.PHONY: install clean fclean build storybook

install:
	npm install

clean:
	rm -rf dist dist_keycloak storybook-static
	find . -name ".DS_Store" -delete

fclean: clean
	rm -rf node_modules node_modules/.cache

build:
	npm run build-keycloak-theme

storybook:
	npm run storybook