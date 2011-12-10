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

filter = (p, arr) -> # {{{
  rv = []
  for_.call \
    this
  , arr
  , conjoin [p, compose (push rv), $1]
  rv
# }}}

__some_every = (isok, dflt) -> (p, arr) -> # {{{
  for i in [0..arr.length]
    if i of arr && isok(v = p.call this, arr[i])
      return v
  dflt
# }}}

every = __some_every not_, true
some = __some_every itself, false

find_if = (p, arr) -> # {{{
  for i in [0..arr.length]
    if i of arr && p.call this, arr[i]
      return i
  -1
# }}}

find = (v, arr) -> find_if (bind1st eq, v), arr

coalesce = (vs, dflt) -> # {{{
  i = (find_if (negate is_null), vs)
  if -1 == i
    if 1 < arguments.length
    then dflt
    else null
  else
    vs[i]
# }}}

copy = bind1st map, itself

keys = bind1st map, $2

reverse = (arr) -> (copy arr).reverse()

sorted = (arr, cmp) -> # {{{
  Array.prototype.sort.apply \
    (copy arr)
  , (slice (copy arguments), 1)
# }}}

unique = (eqfun, arr) -> # {{{
  filter \
    (bind \
      (disjoin (map negate, [(inc -1), eqfun]))
    , [itself, previous undefined])
  , arr
# }}}

reduce = (f, arr, init) -> # {{{
  rv = init
  for_.call this, arr, (v) ->
    rv = f.call this, rv, v
  rv
# }}}

inner_product = (lhs, rhs) ->
  reduce \
    plus
  , (map (spread mul), zip [lhs, rhs])
  , 0

slice = (arr, start, end) -> # {{{
  apply \
    (method arr, arr.slice)
  , (copy arguments).slice(1)
# }}}

iota = (cnt) -> # {{{
  rv = []
  while_ (dec 1 + cnt), (compose (push rv), (inc -1))
  rv
# }}}

range = (start, cnt, step) -> # {{{
  map \
    (compose \
      (bind1st plus, start)
    , (bind1st mul, coalesce [step, 1]))
  , iota cnt
# }}}

insert = (arr) -> (v, i) -> arr[i] = v

__chain2 = (l, r) -> l.concat(r)

cons = bind __chain2, [(use1st argv), $2]

chain = bind reduce, [(value __chain2), argv, list]

product = (arr) -> reduce mul, arr, 1

sum = (arr) -> reduce plus, arr, 0

zip = (arrs) -> # {{{
  if !arrs.length
    []
  else
    map \
      (bind map, [(compose select, $2), (value arrs)])
    , (range \
        0
      , (reduce \
          min
        , (map (select 'length'), arrs)
        , Number.POSITIVE_INFINITY))
# }}}

group_by = (f, arr) -> # {{{
  rv = []
  store = (key, v) ->
    (rv[key] || (rv[key] = [])).push(v)
  for_.call \
    this
  , arr
  , (bind store, [(to_num f), $1])
  rv
# }}}

take_while = (p, arr) -> # {{{
  rv = []
  for i in [0..arr.length]
    if !(i of arr)
      continue
    if !(p.call this, arr[i])
      break
    rv.push arr[i]
  rv
# }}}

join = (a, sep) -> a.join sep

split = (s, sep) -> s.split sep

joiner = bind1st bind2nd, join

splitter = bind1st bind2nd, split

chunk = (arr, sz) ->
  group_by \
    (use2nd (bind2nd intdiv, sz))
  , arr

fill = (bind map, [(use2nd value), iota])

items = (obj) -> # {{{
  rv = []
  for i of obj
    rv.push [obj[i], i]
  rv
# }}}

properties = bind map, [(value (select 1)), items]


# vim: et sts=2 sw=2 fdm=marker cms=\ #\ %s
