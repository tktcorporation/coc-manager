default: test build

install:
	npm install

test: install
	npm run test

testci: install
	npm run testci

integration-test:
	# jest src/integrationTests

build:
	npm run build

clean:
	rm -rf ./dist
	rm -f ./../handler.zip
	rm -f ./../packaged.yaml
	rm -rf ./node_modules

bundle:
	echo "package src and modules into zipped handler..."
	rm -rf node_modules
	npm install --production
	cp -R node_modules dist && cd dist && rm -rf test && zip -r -q ../../handler.zip .

package: clean install build bundle
