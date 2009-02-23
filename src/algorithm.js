// Copyright (c) 2007-2009 Roman Neuhauser
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

var filter = function (p, arr) // {{{
{
    var rv = [];
    for_.call(
        this
      , arr
      , conjoin([p, compose(push(rv), $1)])
    );
    return rv;
} // }}}

var every = function (p, arr) // {{{
{
    return conjoin(map(binder(p), arr))();
} // }}}

var some = function (p, arr) // {{{
{
    return disjoin(map(binder(p), arr))();
} // }}}

var find_if = function (p, arr) // {{{
{
    var len = arr.length;
    for (var i = 0; i < len; ++i) {
        if (i in arr && p.call(this, arr[i])) {
            return i;
        }
    }
    return -1;
} // }}}

var find = function (v, arr) // {{{
{
    return find_if(bind1st(eq, v), arr);
} // }}}

var coalesce = function (vs, dflt) // {{{
{
    var i = find_if(negate(bind1st(eq, null)), vs);
    if (-1 == i) {
        return 1 < arguments.length ? dflt : null;
    }
    return vs[i];
} // }}}

var copy = bind1st(map, itself);

var keys = bind1st(map, $2);

var reverse = function (arr) // {{{
{
    var rv = copy(arr);
    rv.reverse();
    return rv;
} // }}}

var sorted = function (arr, cmp) // {{{
{
    var rv = copy(arr);
    rv.sort.apply(rv, slice(copy(arguments), 1));
    return rv;
} // }}}

var unique = function (eqfun, arr) // {{{
{
    return filter(
        bind(
            disjoin(map(negate, [inc(-1), eqfun]))
          , [itself, previous(undefined)]
        )
      , arr
    );
} // }}}

var reduce = function (f, arr, init) // {{{
{
    var rv = init;
    for_.call(
        this
      , arr
      , function (v)
        {
            rv = f.call(this, rv, v);
        }
    );
    return rv;
} // }}}

var inner_product = function (lhs, rhs) // {{{
{
    return reduce(
        plus
      , map(spread(mul), zip([lhs, rhs]))
      , 0
    );
}
 // }}}

var slice = function (arr, start, end) // {{{
{
    return apply(
        method(arr, arr.slice)
      , copy(arguments).slice(1)
    );
} // }}}

var iota = function (cnt) // {{{
{
    var rv = [];
    while_(
        dec(1 + cnt)
      , compose(push(rv), inc(-1))
    );
    return rv;
} // }}}

var range = function (start, cnt, step) // {{{
{
    return map(
        compose(
            bind1st(plus, start)
          , bind1st(mul, coalesce([step, 1]))
        )
      , iota(cnt)
    );
} // }}}

var insert = function (arr) // {{{
{
    return function (v, i)
    {
        return arr[i] = v;
    }
} // }}}

var chain2 = function (l, r) // {{{
{
    return l.concat(r);
} // }}}

var cons = bind(chain2, [use1st(argv), $2]);

var chain = bind(
    reduce
  , [value(chain2), argv, list]
);

var product = function (arr) // {{{
{
    return reduce(mul, arr, 1);
} // }}}

var sum = function (arr) // {{{
{
    return reduce(plus, arr, 0);
} // }}}

var zip = function (arrs) // {{{
{
    return map(
        bind(map, [compose(select, $2), value(arrs)])
      , range(
            0
          , !arrs.length
            ? 0
            : reduce(
                min
              , map(select('length'), arrs)
              , Number.POSITIVE_INFINITY
            )
        )
    );
} // }}}

var group_by = function (f, arr) // {{{
{
    var rv = [];
    var store = function (key, v)
    {
        (rv[key] || (rv[key] = [])).push(v);
    }
    for_(arr, bind(store, [to_num(f), $1]));
    return rv;
} // }}}

var take_while = function (p, arr) // {{{
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

var join = function (a, sep) // {{{
{
    return a.join(sep);
} // }}}

var split = function (s, sep) // {{{
{
    return s.split(sep);
} // }}}

var joiner = bind1st(bind2nd, join);

var splitter = bind1st(bind2nd, split);

var chunk = function (arr, sz)
{
    return group_by(
        use2nd(bind2nd(intdiv, sz))
      , arr
    );
}

var fill = bind(map, [use2nd(value), iota]);

var items = function (obj) // {{{
{
    var rv = [];
    for (var i in obj) {
        rv.push([obj[i], i]);
    }
    return rv;
} // }}}

var properties = bind(map, [value(select(1)), items]);


// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
