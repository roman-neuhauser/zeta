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

function apply(f, args) // {{{
{
    return f.apply(f, args);
} // }}}

function argv() // {{{
{
    return map(itself, arguments);
} // }}}

function bind1st(f, lhs) // {{{
{
    return function (rhs)
    {
        return f(lhs, rhs);
    }
} // }}}

function bind2nd(f, rhs) // {{{
{
    return function (lhs)
    {
        return f(lhs, rhs);
    }
} // }}}

function compose(f, g) // {{{
{
    return function()
    {
        return f(apply(g, arguments))
    }
} // }}}

function itself(v) // {{{
{
    return v;
} // }}}

function member(o, i) // {{{
{
    return o[i];
} // }}}

function method(that, f) // {{{
{
    return function ()
    {
        return f.apply(that, arguments);
    }
} // }}}

function map(f, arr) // {{{
{
    var rv = [];
    for_(arr, compose(push(rv), f));
    return rv;
} // }}}

function not(v) // {{{
{
    return !v;
} // }}}

//var push = bind(method, [$1, select('push')]);
function push(arr) // {{{
{
    return method(arr, arr.push);
} // }}}

function bind(f, binders) // {{{
{
    return function ()
    {
        return apply(
            f
          , map(
                bind2nd(apply, arguments)
              , binders
            )
        );
    }
} // }}}

var spread = bind1st(bind1st, apply);

function value(v) // {{{
{
    return function ()
    {
        return v;
    }
} // }}}

var true_ = value(true);

var negate = bind1st(compose, not);

var false_ = negate(true_);

var select = bind1st(bind2nd, member);

var project = bind(compose, [select, value(argv)]);

var $1 = project(0);

var $2 = project(1);

var $3 = project(2);

function $N()
{
    return arguments[arguments.length - 1];
}

function for_(arr, f) // {{{
{
    // arr.forEach(f) not in SpiderMonkey 1.5

    var len = arr.length;
    for (var i = 0; i < len; ++i) {
        if (i in arr) {
            f(arr[i], i, arr);
        }
    }
} // }}}

function while_(cond, f) // {{{
{
    while (cond()) {
        f();
    }
} // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
