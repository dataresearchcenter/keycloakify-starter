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
	cd dist_keycloak && mv keycloak-theme-for-kc-all-other-versions.jar darc.jar
	cd dist_keycloak && rm -f keycloak-theme-for-kc-22-to-25.jar

storybook:
	npm run storybook