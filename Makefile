SHELL=		/bin/sh
ZETA_AWK?=	awk
ZETA_JSH?=	js

ZETA_RST2HTML=	${SHELL} tools/rst2html

ZETA_JS_SOURCES=	src/base.js \
			src/operator.js \
			src/function.js \
			src/algorithm.js

ZETA_SYMTAB_JS_SOURCES= ${ZETA_JS_SOURCES} \
			tools/symbols.js

ZETA_TESTS_JS_INCLUDES=	zeta.js \
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

.builtins: tools/symbols.js
	$(ZETA_JSH) tools/symbols.js \
	| sort \
	> .builtins

symtab: .builtins .symtab.js
	$(ZETA_JSH) .symtab.js \
	| sort \
	| comm -13 .builtins - \
	> symtab

.times.js: tools/times.awk symtab
	${ZETA_AWK} \
	    -f tools/times.awk \
	    < symtab \
	    > .times.js

.symtab.js: ${ZETA_SYMTAB_JS_SOURCES}
	cat ${ZETA_SYMTAB_JS_SOURCES} > .symtab.js

.check.js: ${ZETA_TESTS_JS_INCLUDES}
	cat ${ZETA_TESTS_JS_INCLUDES} > .check.js

.time.js: ${ZETA_TIME_JS_SOURCES}
	cat ${ZETA_TIME_JS_SOURCES} > .time.js

zeta.js: tools/zeta.awk symtab ${ZETA_JS_SOURCES}
	${ZETA_AWK} \
	    -v SYMBOLS=symtab \
	    -v IMPORTER=IMPORT_ZETA_INTO \
	    -f tools/zeta.awk \
	    ${ZETA_JS_SOURCES} > zeta.js

clean:
	rm -f zeta.js symtab .symtab.js .check.js .time.js .times.js

maint-clean: clean
	rm -f *.html .builtins docs/*.html

.DEFAULT: all
.PHONY: all check clean docs maint-clean time
