SHELL=		/bin/sh
ZETA_JSH?=	node
ZETA_NODE?=	node
ZETA_COFFEE?=	coffee -bco obj

ZETA_RST2HTML=	${SHELL} tools/rst2html

ZETA_JS_SOURCES=	obj/base.js \
			obj/operator.js \
			obj/function.js \
			obj/algorithm.js

ZETA_TESTS_JS_SOURCES=	zeta.js \
			tests/intro.js \
			tests/runner.js \
			tests/runner-tests.js \
			tests/algorithm.js \
			tests/function.js \
			tests/operator.js \
			tests/reference.js \
			tests/tests.js

ZETA_TIME_JS_SOURCES=   zeta.js \
			tests/time.js \
			.times.js \
			tests/time.console.js

all: docs zeta.js .check.js .times.js

check: .check.js
	$(ZETA_JSH) .check.js

time: .time.js
	$(ZETA_JSH) .time.js ${TIME}

docs: README.html docs/examples.html docs/examples-ref-minmax.html \
	docs/examples-ref-composex.html docs/examples-ref-unique.html \
	docs/reference.html

README.html: README.rest
	${ZETA_RST2HTML} README

docs/examples.html: docs/examples.rest
	${ZETA_RST2HTML} docs/examples

docs/examples-ref-unique.html: docs/examples-ref-unique.rest
	${ZETA_RST2HTML} docs/examples-ref-unique

docs/examples-ref-minmax.html: docs/examples-ref-minmax.rest
	${ZETA_RST2HTML} docs/examples-ref-minmax

docs/examples-ref-composex.html: docs/examples-ref-composex.rest
	${ZETA_RST2HTML} docs/examples-ref-composex

docs/reference.html: docs/reference.rest
	${ZETA_RST2HTML} docs/reference

symtab: tools/symtab.js ${ZETA_JS_SOURCES}
	${ZETA_NODE} tools/symtab.js ${ZETA_JS_SOURCES} > symtab

.times.js: tools/times.js symtab
	${ZETA_NODE} \
	  tools/times.js \
	  symtab \
	  .times.js

.check.js: ${ZETA_TESTS_JS_SOURCES}
	cat ${ZETA_TESTS_JS_SOURCES} > .check.js

.time.js: ${ZETA_TIME_JS_SOURCES}
	cat ${ZETA_TIME_JS_SOURCES} > .time.js

zeta.js: tools/zeta.js symtab ${ZETA_JS_SOURCES}
	SYMBOLS=symtab \
	IMPORTER=IMPORT_ZETA_INTO \
	${ZETA_NODE} \
	    tools/zeta.js \
	    ${ZETA_JS_SOURCES} > zeta.js

obj/algorithm.js: src/algorithm.coffee
	${ZETA_COFFEE} src/algorithm.coffee

obj/base.js: src/base.coffee
	${ZETA_COFFEE} src/base.coffee

obj/function.js: src/function.coffee
	${ZETA_COFFEE} src/function.coffee

obj/operator.js: src/operator.coffee
	${ZETA_COFFEE} src/operator.coffee

clean:
	rm -f zeta.js ${ZETA_JS_SOURCES} symtab .check.js .time.js .times.js
	rm -r obj
	rm -f *.html docs/*.html

.DEFAULT: all
.PHONY: all check clean docs time
