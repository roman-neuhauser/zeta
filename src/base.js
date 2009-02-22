// Copyright (c) 2007-2008 Roman Neuhauser
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

var apply = function (f, args) // {{{
{
    return f.apply(this, args);
} // }}}

var argv = function () // {{{
{
    return map(itself, arguments);
} // }}}

var bind1st = function (f, lhs) // {{{
{
    return function (rhs)
    {
        return f.call(this, lhs, rhs);
    }
} // }}}

var bind2nd = function (f, rhs) // {{{
{
    return function (lhs)
    {
        return f.call(this, lhs, rhs);
    }
} // }}}

var compose = function (f, g) // {{{
{
    return function()
    {
        return f.call(
            this
          , g.apply(this, arguments)
        );
    }
} // }}}

var itself = function (v) // {{{
{
    return v;
} // }}}

var member = function (o, i) // {{{
{
    return o[i];
} // }}}

var method = function (that, f) // {{{
{
    return function ()
    {
        return f.apply(that, arguments);
    }
} // }}}

var size = bind2nd(member, 'length');

var for_ = function (arr, f) // {{{
{
    // arr.forEach(f) not in SpiderMonkey 1.5

    var len = arr.length;
    for (var i = 0; i < len; ++i) {
        if (i in arr) {
            f(arr[i], i, arr);
        }
    }
} // }}}

var map = function (f, arr) // {{{
{
    var rv = [];
    for_(arr, compose(push(rv), f));
    return rv;
} // }}}

var not = function (v) // {{{
{
    return !v;
} // }}}

//var push = bind(method, [$1, select('push')]);
var push = function (arr) // {{{
{
    return method(arr, arr.push);
} // }}}

var bind = function (f, binders) // {{{
{
    return function ()
    {
        return f.apply(
            this
          , map(
                bind2nd(apply, arguments)
              , binders
            )
        );
    }
} // }}}

var collect = bind2nd(compose, argv);

var spread = bind1st(bind1st, apply);

var value = function (v) // {{{
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

var $N = function ()
{
    return arguments[arguments.length - 1];
}

var while_ = function (cond, f) // {{{
{
    while (cond()) {
        f();
    }
} // }}}

var list = function ()
{
    return [];
}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
