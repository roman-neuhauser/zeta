// Copyright (c) 2007 Roman Neuhauser
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
//
// $HeadURL$
// $Id$

function filter(p, arr) // {{{
{
    var rv = [];
    for_(arr, conjoin([p, compose(push(rv), $1)]));
    return rv;
} // }}}

function every(p, arr) // {{{
{
    return conjoin(map(binder(p), arr))();
} // }}}

function some(p, arr) // {{{
{
    return disjoin(map(binder(p), arr))();
} // }}}

function find_if(p, arr) // {{{
{
    var len = arr.length;
    for (var i = 0; i < len; ++i) {
        if (i in arr && p(arr[i])) {
            return i;
        }
    }
    return -1;
} // }}}

function find(v, arr) // {{{
{
    return find_if(bind1st(eq, v), arr);
} // }}}

function coalesce(vs) // {{{
{
    var i = find_if(compose(not, bind1st(eq, null)), vs);
    if (-1 == i) {
        return null;
    }
    return vs[i];
} // }}}

var copy = bind1st(map, itself);

function reverse(arr) // {{{
{
    var rv = copy(arr);
    rv.reverse();
    return rv;
} // }}}

function sorted(arr, cmp) // {{{
{
    var rv = copy(arr);
    rv.sort.apply(rv, slice(copy(arguments), 1));
    return rv;
} // }}}

function unique(eqfun, arr) // {{{
{
    return filter(
        bind(
            disjoin(map(negate, [inc(-1), eqfun]))
          , [itself, previous(undefined)]
        )
      , arr
    );
} // }}}

function reduce(f, arr, init) // {{{
{
    var rv = init;
    for_(
        arr
      , function (v)
        {
            rv = f(rv, v);
        }
    );
    return rv;
} // }}}

function slice(arr, start, end) // {{{
{
    return apply(
        method(arr, arr.slice)
      , copy(arguments).slice(1)
    );
} // }}}

function iota(cnt) // {{{
{
    var rv = [];
    while_(
        dec(1 + cnt)
      , compose(push(rv), inc(-1))
    );
    return rv;
} // }}}

function range(start, cnt, step) // {{{
{
    return map(
        compose(
            bind1st(plus, start)
          , bind1st(mul, coalesce([step, 1]))
        )
      , iota(cnt)
    );
} // }}}

function insert(arr) // {{{
{
    return function (v, i)
    {
        return arr[i] = v;
    }
} // }}}

function chain(arrs) // {{{
{
    var tmp = [];
    return reduce(method(tmp, tmp.concat), arrs, []);
} // }}}

function zip(arrs) // {{{
{
    if (!arrs.length) {
        return [];
    }
    return map(
        bind(map, [compose(select, $2), value(arrs)])
      , range(
            0
          , reduce(
                min, map(select('length'), arrs)
              , Number.POSITIVE_INFINITY
            )
        )
    );
} // }}}

function group_by(f, arr) // {{{
{
    var rv = [];
    for_(
        arr
      , function (v, i, a)
        {
            var key = Number(f(v, i, a));
            if (!(key in rv)) {
                rv[key] = [];
            }
            rv[key].push(v);
        }
    );
    return rv;
} // }}}

function take_while(p, arr) // {{{
{
    var rv = [];
    var len = arr.length;
    for (var i = 0; i < len; ++i) {
        if (!(i in arr)) {
            continue;
        }
        if (!p(arr[i])) {
            break;
        }
        rv.push(arr[i]);
    }
    return rv;
} // }}}


// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
