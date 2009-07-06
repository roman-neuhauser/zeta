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

var to_bool = bind1st(compose, Boolean);

var to_num = bind1st(compose, Number);

var new_ = function (cls) // {{{
{
    var constructors = [ // {{{
        function ()
        {
            return new cls();
        }
      , function ($0)
        {
            return new cls($0);
        }
      , function ($0, $1)
        {
            return new cls($0, $1);
        }
      , function ($0, $1, $2)
        {
            return new cls($0, $1, $2);
        }
      , function ($0, $1, $2, $3)
        {
            return new cls($0, $1, $2, $3);
        }
      , function ($0, $1, $2, $3, $4)
        {
            return new cls($0, $1, $2, $3, $4);
        }
      , function ($0, $1, $2, $3, $4, $5)
        {
            return new cls($0, $1, $2, $3, $4, $5);
        }
      , function ($0, $1, $2, $3, $4, $5, $6)
        {
            return new cls($0, $1, $2, $3, $4, $5, $6);
        }
      , function ($0, $1, $2, $3, $4, $5, $6, $7)
        {
            return new cls($0, $1, $2, $3, $4, $5, $6, $7);
        }
      , function ($0, $1, $2, $3, $4, $5, $6, $7, $8)
        {
            return new cls($0, $1, $2, $3, $4, $5, $6, $7, $8);
        }
      , function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9)
        {
            return new cls($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
        }
    ]; // }}}
    return function () // {{{
    {
        return apply(
            constructors[arguments.length]
          , arguments
        );
    } // }}}
} // }}}

var plus = function (lhs, rhs) // {{{
{
    return lhs + rhs;
} // }}}

var minus = function (lhs, rhs) // {{{
{
    return lhs - rhs;
} // }}}

var mul = function (lhs, rhs) // {{{
{
    return lhs * rhs;
} // }}}

var div = function (lhs, rhs) // {{{
{
    return lhs / rhs;
} // }}}

var intdiv = compose(Math.floor, div);

var mod = function (lhs, rhs) // {{{
{
    return lhs % rhs;
} // }}}

var pow = method(Math, Math.pow);

var neg = bind1st(minus, 0);

var eq = function (lhs, rhs) // {{{
{
    return lhs == rhs;
} // }}}

var lt = function (lhs, rhs) // {{{
{
    return lhs < rhs;
} // }}}

var gt = function (lhs, rhs) // {{{
{
    return lhs > rhs;
} // }}}

var le = function (lhs, rhs) // {{{
{
    return lhs <= rhs;
} // }}}

var ge = function (lhs, rhs) // {{{
{
    return lhs >= rhs;
} // }}}

var inc = function (init) // {{{
{
    return function ()
    {
        return ++init;
    }
} // }}}

var dec = function (init) // {{{
{
    return function ()
    {
        return --init;
    }
} // }}}

var odd = compose(Boolean, bind2nd(mod, 2));

var even = negate(odd);

var __minmax = function (p) // {{{
{
    return bind(member, [argv, to_num(to_bool(p))]);
} // }}}

var min = __minmax(gt);

var max = __minmax(lt);

var compare = function (lhs, rhs) // {{{
{
    if (lhs < rhs) {
        return -1;
    }
    if (lhs > rhs) {
        return 1;
    }
    return 0;
} // }}}

var is_a = function (val, cls) // {{{
{
    return val instanceof cls;
} // }}}

var is_null = bind1st(eq, null);

var type_of = function (v)
{
    return typeof(v);
}

var empty = bind(eq, [value(0), size]);

var in_ = function (ind, arr) // {{{
{
    return (ind in arr);
} // }}}

var contains = function (v, a) // {{{
{
    return some(bind1st(eq, v), a);
} // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
