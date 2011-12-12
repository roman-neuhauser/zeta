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
  body = fs.readFileSync file, 'utf8'
  reline = /[^\n]*\n/g
  resym1 = /^var +([\w$]+) = /
  resym2 = /^var +([\w$]+,.*);\s*$/
  recomma = /,\s*/g
  while (mline = reline.exec body)
    if (msym = resym1.exec mline[0])
      printf "%s\n", msym[1]
    else if (msym = resym2.exec mline[0])
      printf "%s\n", (msym[1].replace recomma, "\n")

for i in [2...process.argv.length]
  f = process.argv[i]
  try
    output f
  catch e
    process.stderr.write ("symtab.coffee: error in " + f)
    process.stderr.write e
    process.exit 1
