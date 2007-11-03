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

function __ZETA__shortcircuit(test, short_, full) // {{{
{
    return function (fs)
    {
        return function ()
        {
            var rv = false;
            for (var i = 0; i < fs.length; ++i) {
                if (!(i in fs)) {
                    continue;
                }
                var f = spread(fs[i]);
                if (test(rv = f(arguments))) {
                    return short_(rv);
                }
            }
            return full(rv);
        }
    }
} // }}}

var conjoin = __ZETA__shortcircuit(not, false_, itself);

var disjoin = __ZETA__shortcircuit(itself, itself, false_);

var use1st = bind2nd(compose, $1);

var use2nd = bind2nd(compose, $2);

function binder(f) // {{{
{
    return function ()
    {
        return bind(f, map(value, arguments));
    }
} // }}}

function previous(v) // {{{
{
    var values = [v];
    return function (v)
    {
        values.push(v)
        return values.shift();
    }
} // }}}

var nth = bind1st(bind1st, member);

var composex = bind(reduce, [value(compose), $1, value(itself)]);

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
