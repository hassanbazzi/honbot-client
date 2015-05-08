autod: install
	@node_modules/.bin/autod -w --prefix=~ \
    -D mocha,should,istanbul-harmony
	@$(MAKE) install

install:
	@npm install --registry=http://registry.npm.taobao.org