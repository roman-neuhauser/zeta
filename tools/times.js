// vim: sw=2 sts=2 et
//
// Copyright (c) 2009-2011 Roman Neuhauser
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var fs = require('fs')
var ztools = require('./ztools')
var printf = ztools.printf
var fprintf = ztools.fprintf

var body = fs.readFileSync(process.argv[2], 'utf8')
var outf = fs.createWriteStream(process.argv[3])
var re = /(\S+)\n/g
var m

fprintf(outf, "var times_js = function (times, fs)\n{\n")
fprintf(outf, "    var durs = []\n")
fprintf(outf, "    if (fs.length) {\n")
fprintf(outf, "        for (var i = 0; i < fs.length; ++i) {\n")
fprintf(outf, "            times.call(this, fs[i], durs)\n")
fprintf(outf, "        }\n")
fprintf(outf, "        return durs\n")
fprintf(outf, "    }\n")

while (m = re.exec(body))
  fprintf(outf, "    times.call(this, '%s', durs)\n", m[1])

fprintf(outf, "    return durs\n")
fprintf(outf, "}\n")
