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

apply = (f, args) -> f.apply this, args

argv = () -> Array.prototype.slice.call arguments, 0, arguments.length

bind1st = (f, lhs) -> (rhs) -> f.call this, lhs, rhs
bind2nd = (f, rhs) -> (lhs) -> f.call this, lhs, rhs

compose = (f, g) -> () ->
  f.call this, (g.apply this, arguments)

itself = (v) -> v

member = (o, i) -> o[i]

method = (that, f) -> () ->
  f.apply that, arguments

size = bind2nd member, 'length'

for_ = (arr, f) ->
  # arr.forEach(f) not in SpiderMonkey 1.5

  rv = []
  for i in [0..arr.length]
    if i of arr
      rv.push f.call this, arr[i], i, arr
  rv

map = (f, arr) ->
  rv = []
  for i in [0..arr.length]
    if i of arr
      rv[rv.length] = (f.call this, arr[i], i, arr)
  rv

not_ = (v) -> !v

# push = bind(method, [$1, select('push')]);
push = (arr) -> method arr, arr.push

bind = (f, binders) -> () ->
  f.apply \
    this
  , map.call \
      this
    , (bind2nd apply, arguments)
    , binders

collect = bind2nd compose, argv

spread = bind1st bind1st, apply

value = (v) -> () -> v

true_ = () -> true
false_ = () -> false

negate = bind1st compose, not_

select = (i) -> (a) -> a[i]

project = (i) -> () -> arguments[i]

$1 = () -> arguments[0]
$2 = () -> arguments[1]
$3 = () -> arguments[2]
$N = () -> arguments[arguments.length - 1]

while_ = (cond, f) ->
    while cond.call this
        f.call this

list = () -> []

# vim: et sts=2 sw=2 fdm=marker cms=\ //\ %s
