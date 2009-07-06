# Copyright (c) 2008 Roman Neuhauser
# 
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# "Software"), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
# 
# The above copyright notice and this permission notice shall be included
# in all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
# IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
# CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
# TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
# SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#
# $HeadURL$
# $Id$

function output(file)
{
    printf("// FILE: %s\n", file);
    while ((getline < file) > 0) {
        printf("    %s\n", $0);
    }
    close(file);
}

function fillScope(symtab,	guard, i)
{
    for (i = 0; (getline < symtab) > 0; ++i) {
        if ("__" == substr($2, 0, 2)) {
            printf("    if ($$IMPORT_INTERNALS$$)");
        }
        printf("    $$IMPORT_SCOPE$$.%s = %s;\n", $2, $2);
    }
    close(symtab);
}

BEGIN {
    printf("// === GENERATED FILE, DO NOT EDIT ===\n\n");

    printf("function $$%s$$($$IMPORT_SCOPE$$, $$CONFIG$$)\n{\n", IMPORTER);
    printf("    var $$IMPORT_INTERNALS$$ = $$CONFIG$$ && $$CONFIG$$.import_internals;\n");
    for (i = 1; i < ARGC; ++i) {
        output(ARGV[i]);
    }
    fillScope(SYMBOLS);
    printf("};\n");
}
