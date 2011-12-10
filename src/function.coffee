# Copyright (c) 2007-2011 Roman Neuhauser
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

__shortcircuit = (ifempty, test, short_, full) -> (fs) -> () -> # {{{
  rv = ifempty
  for i in [0..fs.length]
    if (!(i of fs))
      continue
    rv = fs[i].apply this, arguments
    if (test rv)
      return short_(rv)
  full(rv)
# }}}

conjoin = __shortcircuit true, not_, false_, itself

disjoin = __shortcircuit false, itself, itself, false_

use1st = bind2nd compose, $1

use2nd = bind2nd compose, $2

binder = (f) -> () -> bind f, (map value, arguments)

curry = (f, v) -> # {{{
  compose \
    spread(f)
  , collect(bind1st(cons, v))
# }}}

previous = (v) -> # {{{
  values = [v]
  (v) ->
    values.push(v)
    values.shift()
# }}}

nth = bind1st(bind1st, member)

composex = (fs) -> reduce(compose, fs, $N)

ifte = (p, t, f) -> () -> # {{{
  c = bind2nd apply, arguments
  c.call this, (if c.call this, p then t else f)
# }}}

# vim: et sts=2 sw=2 fdm=marker cms=\ #\ %s
