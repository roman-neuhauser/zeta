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

function testItself() // {{{
{
    assertEquals(42, itself(42));
} // }}}

function testValue() // {{{
{
    assertEquals(42, value(42)());
} // }}}

function testCompose() // {{{
{
    var generator = function (rhs)
    {
        return function (lhs)
        {
            return lhs + rhs;
        }
    }
    var f = generator("wtf");
    var g = generator(" ");
    assertEquals("omg wtf", compose(f, g)("omg"));
} // }}}

function testApply() // {{{
{
    assertEquals(7, apply(plus, [2, 5]));
} // }}}

function testSpread() // {{{
{
    assertEquals(7, spread(plus)([2, 5]));
} // }}}

function testMethod() // {{{
{
    var s = 'omg wtf';
    var a = [];
    var f = method(a, a.push);
    var g = method(s, s.indexOf);

    f(s);
    assertEquals(1, a.length);
    assertEquals(s, a[0]);

    assertEquals(3, g(' '));
} // }}}

function testOperatorAndReturnValue() // {{{
{
    assertEquals(false, (false && null));
    assertEquals(4, (true && 4));
    assertEquals(true, (4 && true));
} // }}}

function testConjoinShortCircuit() // {{{
{
    var rv = [];
    var f = push(rv);
    conjoin([true_, false_, f])(1, 2, 3);
    assertEquals(0, rv.length);
    conjoin([true_, true_, f])(1);
    assertEquals(1, rv.length);
    conjoin([true_, true_, f])(1, 2, 3);
    assertEquals(4, rv.length);
} // }}}

function testConjoinReturnValue() // {{{
{
    assertEquals(true, conjoin([true_, true_])());
    assertEquals(false, conjoin([true_, $1])(null));
    assertEquals(true, conjoin([$1, true_])(4));
    assertEquals(8, conjoin([true_, $1])(8));
} // }}}

function testOperatorOrReturnValue() // {{{
{
    assertEquals(false, (null || false));
    assertEquals(null, (false || null));
} // }}}

function testDisjoinShortCircuit() // {{{
{
    var rv = [];
    var f = push(rv);
    disjoin([false_, true_, f])(1);
    assertEquals(0, rv.length);
    disjoin([false_, false_, f])(1, 2);
    assertEquals(2, rv.length);
} // }}}

function testDisjoinReturnValue() // {{{
{
    assertEquals(true, disjoin([false_, true_])());
    assertEquals(false, disjoin([false_, $1])(null));
    assertEquals(4, disjoin([$1, false_])(4));
    assertEquals(8, disjoin([false_, $1])(8));
} // }}}

function testBinder() // {{{
{
    var rv = [];
    var f = binder(push(rv));
    apply(f, range(0, 4))();
    assertEquals(4, rv.length);
} // }}}

function testSelect() // {{{
{
    var data = ['foo', 'bar', 'baz'];
    for_(
        data,
        function (v, i, a)
        {
            assertEquals(v, select(i)(a));
        }
    );
} // }}}

function testProject() // {{{
{
    var data = ['foo', 'bar', 'baz'];
    for_(
        data,
        function (v, i, a)
        {
            assertEquals(v, apply(project(i), a));
        }
    );
} // }}}

function test$1() // {{{
{
    var args = ['foo', 'bar', 'baz'];
    assertEquals('foo', $1('foo', 'bar', 'baz'));
} // }}}

function testBind1st() // {{{
{
    var f = bind1st(minus, 10);
    assertEquals(5, f(5));
    assertEquals(3, f(7));
    assertEquals(-10, f(20));
} // }}}

function testBind2nd() // {{{
{
    var f = bind2nd(minus, 10);
    assertEquals(-5, f(5));
    assertEquals(-3, f(7));
    assertEquals(10, f(20));
} // }}}

function testBind() // {{{
{
    assertEquals(11, bind(value(11), [])(3, 5));
    assertEquals(2, bind(minus, [$2, $1])(3, 5));
} // }}}

function testUse1st() // {{{
{
    var rv = use1st(argv)(3, 4, 5);
    assertEquals(1, rv.length);
    assertEquals(3, rv[0]);
    assertEquals(1, use1st(itself)(1, 2, 3));
} // }}}

function testUse2nd() // {{{
{
    var rv = use2nd(argv)(3, 4, 5);
    assertEquals(1, rv.length);
    assertEquals(4, rv[0]);
    assertEquals(2, use2nd(itself)(1, 2, 3));
} // }}}

function testNth() // {{{
{
    var a = range(0, 5);
    assertEquals(a[3], nth(a)(3));
    assertEquals(undefined, nth(a)(5));

    var o = { foo : 'bar' };
    assertEquals(o.foo, nth(o)('foo'));
    assertEquals(undefined, nth(o)('qux'));
} // }}}

function testComposex() // {{{
{
    var f = bind1st(mul, 10000);
    var g = bind1st(plus, 1000)
    var h = bind1st(plus, 3)
    assertEquals(f(5), composex([itself, f])(5));
    assertEquals(g(f(5)), composex([g, f])(5));
    assertEquals(h(g(f(5))), composex([h, g, f])(5));

    assertEquals(33, composex([])(11, 22, 33));
    assertEquals(undefined, composex([])());
} // }}}

tests.push(
    testItself
  , testValue
  , testCompose
  , testApply
  , testSpread
  , testMethod
  , testOperatorAndReturnValue
  , testConjoinShortCircuit
  , testConjoinReturnValue
  , testOperatorOrReturnValue
  , testDisjoinShortCircuit
  , testDisjoinReturnValue
  , testSelect
  , testProject
  , test$1
  , testBind1st
  , testBind2nd
  , testBind
  , testBinder
  , testUse1st
  , testUse2nd
  , testNth
  , testComposex
);

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
