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

var to_bool = bind1st(compose, Boolean);

var to_num = bind1st(compose, Number);

function new_(cls) // {{{
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

function plus(lhs, rhs) // {{{
{
    return lhs + rhs;
} // }}}

function minus(lhs, rhs) // {{{
{
    return lhs - rhs;
} // }}}

function mul(lhs, rhs) // {{{
{
    return lhs * rhs;
} // }}}

function div(lhs, rhs) // {{{
{
    return lhs / rhs;
} // }}}

var intdiv = compose(Math.floor, div);

function mod(lhs, rhs) // {{{
{
    return lhs % rhs;
} // }}}

var pow = method(Math, Math.pow);

var neg = bind1st(minus, 0);

function eq(lhs, rhs) // {{{
{
    return lhs == rhs;
} // }}}

function lt(lhs, rhs) // {{{
{
    return lhs < rhs;
} // }}}

function gt(lhs, rhs) // {{{
{
    return lhs > rhs;
} // }}}

function le(lhs, rhs) // {{{
{
    return lhs <= rhs;
} // }}}

function ge(lhs, rhs) // {{{
{
    return lhs >= rhs;
} // }}}

function inc(init) // {{{
{
    return function ()
    {
        return ++init;
    }
} // }}}

function dec(init) // {{{
{
    return function ()
    {
        return --init;
    }
} // }}}

var odd = compose(Boolean, bind2nd(mod, 2));

var even = negate(odd);

function minmax(p) // {{{
{
    return bind(member, [argv, to_num(to_bool(p))]);
} // }}}

var min = minmax(gt);

var max = minmax(lt);

function compare(lhs, rhs) // {{{
{
    if (lhs < rhs) {
        return -1;
    }
    if (lhs > rhs) {
        return 1;
    }
    return 0;
} // }}}


// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
