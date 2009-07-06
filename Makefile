# $HeadURL$
# $Id$

SHELL=		/bin/sh
ZETA_AWK?=	awk

ZETA_FIND_RST2HTML=	${SHELL} tools/find-rst2html || exit 1
ZETA_RST2HTML=	${SHELL} tools/rst2html $$(pwd)/rst2html

ZETA_JS_INCLUDES=	-f src/base.js \
			-f src/operator.js \
			-f src/function.js \
			-f src/algorithm.js

ZETA_JS_SOURCES=	src/base.js \
			src/operator.js \
			src/function.js \
			src/algorithm.js

all: docs zeta.js

check: zeta.js
	js -f zeta.js -f tests/tests.js

time: zeta.js tests/times.js
	js -f zeta.js -f tests/time.js -f tests/times.js -f tests/time.console.js

docs: README.html docs/examples.html docs/examples-ref-minmax.html \
	docs/examples-ref-composex.html docs/examples-ref-unique.html \
	docs/reference.html

rst2html:
	ln -s $$(${ZETA_FIND_RST2HTML}) rst2html

README.html: rst2html README.rest
	${ZETA_RST2HTML} README

docs/examples.html: rst2html docs/examples.rest
	${ZETA_RST2HTML} docs/examples

docs/examples-ref-unique.html: rst2html docs/examples-ref-unique.rest
	${ZETA_RST2HTML} docs/examples-ref-unique

docs/examples-ref-minmax.html: rst2html docs/examples-ref-minmax.rest
	${ZETA_RST2HTML} docs/examples-ref-minmax

docs/examples-ref-composex.html: rst2html docs/examples-ref-composex.rest
	${ZETA_RST2HTML} docs/examples-ref-composex

docs/reference.html: rst2html docs/reference.rest
	${ZETA_RST2HTML} docs/reference

symtab: tools/symbols.js ${ZETA_JS_SOURCES}
	js ${ZETA_JS_INCLUDES} -f tools/symbols.js | sort > symtab

tests/times.js: tools/times.awk symtab
	${ZETA_AWK} \
	    -f tools/times.awk \
	    < symtab \
	    > tests/times.js

zeta.js: tools/zeta.awk symtab ${ZETA_JS_SOURCES}
	${ZETA_AWK} \
	    -v SYMBOLS=symtab \
	    -v IMPORTER=IMPORT_ZETA_INTO \
	    -f tools/zeta.awk \
	    ${ZETA_JS_SOURCES} > zeta.js

clean:
	rm -f zeta.js

maint-clean: clean
	rm -f *.html docs/*.html symtab rst2html tests/times.js

.DEFAULT: all
.PHONY: all check clean docs maint-clean time
