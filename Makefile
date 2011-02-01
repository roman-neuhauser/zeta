SHELL=		/bin/sh
ZETA_AWK?=	awk
ZETA_JSH?=	js

ZETA_RST2HTML=	${SHELL} tools/rst2html

ZETA_JS_INCLUDES=	-f src/base.js \
			-f src/operator.js \
			-f src/function.js \
			-f src/algorithm.js

ZETA_JS_SOURCES=	src/base.js \
			src/operator.js \
			src/function.js \
			src/algorithm.js

all: docs zeta.js tests/times.js

check: zeta.js
	$(ZETA_JSH) -f zeta.js -f tests/tests.js

time: zeta.js tests/times.js
	$(ZETA_JSH) -f zeta.js -f tests/time.js -f tests/times.js tests/time.console.js ${TIME}

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

builtins: tools/symbols.js
	$(ZETA_JSH) -f tools/symbols.js \
	| sort \
	> builtins

symtab: tools/symbols.js builtins ${ZETA_JS_SOURCES}
	$(ZETA_JSH) ${ZETA_JS_INCLUDES} -f tools/symbols.js \
	| sort \
	| comm -13 builtins - \
	> symtab

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
	rm -f *.html builtins docs/*.html symtab tests/times.js

.DEFAULT: all
.PHONY: all check clean docs maint-clean time
