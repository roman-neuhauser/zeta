# vim: sw=2 sts=2 et
#
# Copyright (c) 2008-2011 Roman Neuhauser
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

fs = require 'fs'
printf = (require './ztools').printf

output = (file) ->
  printf "// FILE: %s\n", file
  printf (fs.readFileSync file, 'utf8')

fillScope = (symtab) ->
  body = fs.readFileSync symtab, 'utf8'
  re = /(\S+)\n/g
  while (m = re.exec body)
    defn = m[1]
    if ("__" == defn.substr 0, 2)
      printf "    if ($$IMPORT_INTERNALS$$)"
    printf "    $$IMPORT_SCOPE$$.%s = %s\n", defn, defn

printf "// === GENERATED FILE, DO NOT EDIT ===\n\n"

printf "function $$%s$$($$IMPORT_SCOPE$$, $$CONFIG$$)\n{\n", process.env.IMPORTER
printf "    var $$IMPORT_INTERNALS$$ = $$CONFIG$$ && $$CONFIG$$.import_internals\n"
for i in [2...process.argv.length]
  output process.argv[i]
fillScope process.env.SYMBOLS
printf "}\n"
