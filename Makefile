# $HeadURL$
# $Id$

ZETA_RST2HTML= rst2html=$$(for n in rst2html.py rst2html; do \
	   which $$n && break; \
	done || true 2>/dev/null); \
	if [ -z "$$rst2html" ]; then \
	   printf "\nrst2html is required to build HTML documentation.\n" >&2; \
	   printf "Install Docutils from http://docutils.sf.net/.\n\n" >&2; \
	   exit 1; \
	fi; \
	$$rst2html

ZETA_HTMLIZE_RESTTARGETS=sed \
	-e '/^\.\. /s/\.rest/.html/'

ZETA_JS_INCLUDES=	-f src/base.js \
			-f src/algorithm.js \
			-f src/function.js \
			-f src/operator.js

all: docs

check:
	js ${ZETA_JS_INCLUDES} -f tests/tests.js

docs: README.html docs/examples.html docs/examples-ref-minmax.html \
	docs/examples-ref-unique.html docs/reference.html

README.html: README.rest Makefile
	${ZETA_HTMLIZE_RESTTARGETS} < README.rest > README.prehtml
	${ZETA_RST2HTML} -stg --source-url README.rest README.prehtml README.html

docs/examples.html: docs/examples.rest Makefile
	${ZETA_HTMLIZE_RESTTARGETS} < docs/examples.rest > docs/examples.prehtml
	${ZETA_RST2HTML} -stg --source-url examples.rest docs/examples.prehtml docs/examples.html

docs/examples-ref-unique.html: docs/examples-ref-unique.rest Makefile
	${ZETA_HTMLIZE_RESTTARGETS} < docs/examples-ref-unique.rest > docs/examples-ref-unique.prehtml
	${ZETA_RST2HTML} -stg --source-url examples-ref-unique.rest docs/examples-ref-unique.prehtml docs/examples-ref-unique.html

docs/examples-ref-minmax.html: docs/examples-ref-minmax.rest Makefile
	${ZETA_HTMLIZE_RESTTARGETS} < docs/examples-ref-minmax.rest > docs/examples-ref-minmax.prehtml
	${ZETA_RST2HTML} -stg --source-url examples-ref-minmax.rest docs/examples-ref-minmax.prehtml docs/examples-ref-minmax.html

docs/reference.html: docs/reference.rest Makefile
	${ZETA_HTMLIZE_RESTTARGETS} < docs/reference.rest > docs/reference.prehtml
	${ZETA_RST2HTML} -stg --source-url reference.rest docs/reference.prehtml docs/reference.html

symtab: symbols.js algorithm.js function.js operator.js
	js ${ZETA_JS_INCLUDES} -f symbols.js | sort > symtab

clean:
	rm -f *.prehtml docs/*.prehtml

maint-clean: clean
	rm -f *.html docs/*.html symtab

.DEFAULT: all
.PHONY: all check clean docs maint-clean
