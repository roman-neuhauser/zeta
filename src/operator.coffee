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

to_bool = bind1st(compose, Boolean)

to_num = bind1st(compose, Number)

new_ = (cls) -> # {{{
  constructors = [ # {{{
    () ->
      new cls()
  , ($0) ->
      new cls($0)
  , ($0, $1) ->
      new cls($0, $1)
  , ($0, $1, $2) ->
      new cls($0, $1, $2)
  , ($0, $1, $2, $3) ->
      new cls($0, $1, $2, $3)
  , ($0, $1, $2, $3, $4) ->
      new cls($0, $1, $2, $3, $4)
  , ($0, $1, $2, $3, $4, $5) ->
      new cls($0, $1, $2, $3, $4, $5)
  , ($0, $1, $2, $3, $4, $5, $6) ->
      new cls($0, $1, $2, $3, $4, $5, $6)
  , ($0, $1, $2, $3, $4, $5, $6, $7) ->
      new cls($0, $1, $2, $3, $4, $5, $6, $7)
  , ($0, $1, $2, $3, $4, $5, $6, $7, $8) ->
      new cls($0, $1, $2, $3, $4, $5, $6, $7, $8)
  , ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) ->
      new cls($0, $1, $2, $3, $4, $5, $6, $7, $8, $9)
  ]; # }}}
  () ->
    apply \
      constructors[arguments.length]
    , arguments
# }}}

plus = (lhs, rhs) -> lhs + rhs

minus = (lhs, rhs) -> lhs - rhs

mul = (lhs, rhs) -> lhs * rhs

div = (lhs, rhs) -> lhs / rhs

intdiv = compose Math.floor, div

mod = (lhs, rhs) -> lhs % rhs

pow = method Math, Math.pow

neg = bind1st minus, 0

eq = (lhs, rhs) -> `lhs == rhs`

lt = (lhs, rhs) -> lhs < rhs

gt = (lhs, rhs) -> lhs > rhs

le = (lhs, rhs) -> lhs <= rhs

ge = (lhs, rhs) -> lhs >= rhs

inc = (init) -> () -> ++init

dec = (init) -> () -> --init

odd = compose(Boolean, (bind2nd mod, 2))

even = negate(odd)

__minmax = (p) ->
  bind member, [argv, to_num to_bool p]

min = __minmax(gt)

max = __minmax(lt)

compare = (lhs, rhs) -> # {{{
  if (lhs < rhs)
    -1
  else if (lhs > rhs)
    1
  else
    0
# }}}

is_a = (val, cls) -> val instanceof cls

is_null = bind1st eq, null

type_of = (v) -> typeof v

empty = (o) -> 0 == o.length

in_ = (ind, arr) -> ind of arr

contains = (v, a) -> -1 < (find v, a)

# vim: et sts=2 sw=2 fdm=marker cms=\ #\ %s
