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

defTest('testItself'
, tests
, function() // {{{
{
    assertEquals(42, itself(42));
}); // }}}

defTest('testValue'
, tests
, function() // {{{
{
    assertEquals(42, value(42)());
}); // }}}

defTest('testCompose'
, tests
, function() // {{{
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
}); // }}}

defTest('compose method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = compose(itself, f);
    assertEquals(o, o.m());
}); // }}}

defTest('negate'
, tests
, function() // {{{
{
    var f = negate(function (v)
    {
        return v;
    });
    assertEquals(true, f(false));
    assertEquals(false, f(true));
}); // }}}

defTest('negate method'
, tests
, function() // {{{
{
    var o = { i : 0 };
    var f = function (v) { ++this.i; return v; }
    o.m = negate(f);
    assertEquals(0, o.i);
    assertEquals(false, o.m(true));
    assertEquals(1, o.i);
    assertEquals(true, o.m(false));
    assertEquals(2, o.i);
}); // }}}

defTest('testApply'
, tests
, function() // {{{
{
    assertEquals(7, apply(plus, [2, 5]));
}); // }}}

defTest('apply method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = bind1st(apply, f);
    assertEquals(o, o.m([]));
}); // }}}

defTest('testSpread'
, tests
, function() // {{{
{
    assertEquals(7, spread(plus)([2, 5]));
}); // }}}

defTest('spread method'
, tests
, function() // {{{
{
    var o = {};
    var f = function (a, b)
    {
        this.a = a;
        this.b = b;
        return this;
    }
    o.m = spread(f);
    assertEquals(o, o.m(['hello', 'world']));
    assertEquals('hello', o.a);
    assertEquals('world', o.b);
}); // }}}

defTest('testCollect'
, tests
, function() // {{{
{
    var args = [3, 4, 5];
    var f = collect(itself);
    var rv = f.apply(f, args);
    assertEquals(true, rv instanceof Array);
    for_(
        args
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );

    assertEquals(0, f().length);
}); // }}}

defTest('collect method'
, tests
, function() // {{{
{
    var o = {};
    var f = function (a)
    {
        this.a = a;
        return this;
    }
    o.m = collect(f);
    assertEquals(o, o.m('hello', 'world'));
    assertEquals('hello', o.a[0]);
    assertEquals('world', o.a[1]);
}); // }}}

defTest('testMethod'
, tests
, function() // {{{
{
    var s = 'omg wtf';
    var a = [];
    var f = method(a, a.push);
    var g = method(s, s.indexOf);

    f(s);
    assertEquals(1, a.length);
    assertEquals(s, a[0]);

    assertEquals(3, g(' '));
}); // }}}

defTest('testOperatorAndReturnValue'
, tests
, function() // {{{
{
    assertEquals(false, (false && null));
    assertEquals(4, (true && 4));
    assertEquals(true, (4 && true));
}); // }}}

defTest('testConjoinShortCircuit'
, tests
, function() // {{{
{
    var rv = [];
    var f = push(rv);
    conjoin([true_, false_, f])(1, 2, 3);
    assertEquals(0, rv.length);
    conjoin([true_, true_, f])(1);
    assertEquals(1, rv.length);
    conjoin([true_, true_, f])(1, 2, 3);
    assertEquals(4, rv.length);
}); // }}}

defTest('testConjoinOfNoPredicatesIsTrue'
, tests
, function()
{
    assertEquals(true, conjoin([])());
});

defTest('testDisjoinOfNoPredicatesIsFalse'
, tests
, function()
{
    assertEquals(false, disjoin([])());
});

defTest('testConjoinReturnValue'
, tests
, function() // {{{
{
    assertEquals(true, conjoin([true_, true_])());
    assertEquals(false, conjoin([true_, $1])(null));
    assertEquals(true, conjoin([$1, true_])(4));
    assertEquals(8, conjoin([true_, $1])(8));
}); // }}}

defTest('conjoin method'
, tests
, function() // {{{
{
    var o = {};
    var f = function (a)
    {
        this.a = a;
        return true;
    }
    var g = function (a, b)
    {
        this.b = b;
        return this;
    }
    o.m = conjoin([f, g]);
    assertEquals(o, o.m('hello', 'world'));
    assertEquals('hello', o.a);
    assertEquals('world', o.b);
}); // }}}

defTest('testOperatorOrReturnValue'
, tests
, function() // {{{
{
    assertEquals(false, (null || false));
    assertEquals(null, (false || null));
}); // }}}

defTest('testDisjoinShortCircuit'
, tests
, function() // {{{
{
    var rv = [];
    var f = push(rv);
    disjoin([false_, true_, f])(1);
    assertEquals(0, rv.length);
    disjoin([false_, false_, f])(1, 2);
    assertEquals(2, rv.length);
}); // }}}

defTest('testDisjoinReturnValue'
, tests
, function() // {{{
{
    assertEquals(true, disjoin([false_, true_])());
    assertEquals(false, disjoin([false_, $1])(null));
    assertEquals(4, disjoin([$1, false_])(4));
    assertEquals(8, disjoin([false_, $1])(8));
    assertEquals('0', disjoin([false_, $1])('0'));
}); // }}}

defTest('disjoin method'
, tests
, function() // {{{
{
    var o = {};
    var f = function (a)
    {
        this.a = a;
        return false;
    }
    var g = function (a, b)
    {
        this.b = b;
        return this;
    }
    o.m = disjoin([f, g]);
    assertEquals(o, o.m('hello', 'world'));
    assertEquals('hello', o.a);
    assertEquals('world', o.b);
}); // }}}

defTest('testBinder'
, tests
, function() // {{{
{
    var rv = [];
    var f = binder(push(rv));
    apply(f, range(0, 4))();
    assertEquals(4, rv.length);
}); // }}}

defTest('binder method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = binder(f)();
    assertEquals(o, o.m());
}); // }}}

defTest('testCurry'
, tests
, function() // {{{
{
    var f = curry(curry(argv, 7), 8);
    var rv = f(9);
    assertEquals(3, rv.length)
    assertEquals(7, rv[0])
    assertEquals(8, rv[1])
    assertEquals(9, rv[2])
}); // }}}

defTest('testSelect'
, tests
, function() // {{{
{
    var data = ['foo', 'bar', 'baz'];
    for_(
        data,
        function (v, i, a)
        {
            assertEquals(v, select(i)(a));
        }
    );
}); // }}}

defTest('testProject'
, tests
, function() // {{{
{
    var data = ['foo', 'bar', 'baz'];
    for_(
        data,
        function (v, i, a)
        {
            assertEquals(v, apply(project(i), a));
        }
    );
}); // }}}

defTest('test$1'
, tests
, function() // {{{
{
    var args = ['foo', 'bar', 'baz'];
    assertEquals('foo', $1('foo', 'bar', 'baz'));
}); // }}}

defTest('testBind1st'
, tests
, function() // {{{
{
    var f = bind1st(minus, 10);
    assertEquals(5, f(5));
    assertEquals(3, f(7));
    assertEquals(-10, f(20));
}); // }}}

defTest('bind1st method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = bind1st(f, 42);
    assertEquals(o, o.m());
}); // }}}

defTest('testBind2nd'
, tests
, function() // {{{
{
    var f = bind2nd(minus, 10);
    assertEquals(-5, f(5));
    assertEquals(-3, f(7));
    assertEquals(10, f(20));
}); // }}}

defTest('bind2nd method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = bind2nd(f, 42);
    assertEquals(o, o.m());
}); // }}}

defTest('testBind'
, tests
, function() // {{{
{
    assertEquals(11, bind(value(11), [])(3, 5));
    assertEquals(2, bind(minus, [$2, $1])(3, 5));
}); // }}}

defTest('bind method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    var b = function () { this.x = 'whatever'; return 0; }
    o.m = bind(f, [b]);
    var rv = o.m();
    assertEquals(o, rv);
    assertEquals('whatever', o.x);
}); // }}}

defTest('testUse1st'
, tests
, function() // {{{
{
    var rv = use1st(argv)(3, 4, 5);
    assertEquals(1, rv.length);
    assertEquals(3, rv[0]);
    assertEquals(1, use1st(itself)(1, 2, 3));
}); // }}}

defTest('use1st method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = use1st(f);
    assertEquals(o, o.m());
}); // }}}

defTest('testUse2nd'
, tests
, function() // {{{
{
    var rv = use2nd(argv)(3, 4, 5);
    assertEquals(1, rv.length);
    assertEquals(4, rv[0]);
    assertEquals(2, use2nd(itself)(1, 2, 3));
}); // }}}

defTest('use2nd method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = use2nd(f);
    assertEquals(o, o.m());
}); // }}}

defTest('testNth'
, tests
, function() // {{{
{
    var a = range(0, 5);
    assertEquals(a[3], nth(a)(3));
    assertEquals(undefined, nth(a)(5));

    var o = { foo : 'bar' };
    assertEquals(o.foo, nth(o)('foo'));
    assertEquals(undefined, nth(o)('qux'));
}); // }}}

defTest('testComposex'
, tests
, function() // {{{
{
    var f = bind1st(mul, 10000);
    var g = bind1st(plus, 1000)
    var h = bind1st(plus, 3)
    assertEquals(f(5), composex([itself, f])(5));
    assertEquals(g(f(5)), composex([g, f])(5));
    assertEquals(h(g(f(5))), composex([h, g, f])(5));

    assertEquals(33, composex([])(11, 22, 33));
    assertEquals(undefined, composex([])());
}); // }}}

defTest('composex method'
, tests
, function() // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = composex([itself, f]);
    assertEquals(o, o.m());
}); // }}}

defTest('testJoiner'
, tests
, function() // {{{
{
    assertEquals('a-b-c', joiner('-')(['a', 'b', 'c']));
}); // }}}

defTest('testSplitter'
, tests
, function() // {{{
{
    var exp = ['a', 'b', 'c'];
    var rv = splitter('-')('a-b-c');
    for_(
        exp
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('testIfte'
, tests
, function() // {{{
{
    var f = ifte(Boolean, itself, bind2nd(minus, 3));
    for_(
        [[2, 2], [-7, -7], [-3, 0]]
      , spread(bind(assertEquals, [$1, use2nd(f)]))
    );
}); // }}}

defTest('ifte method'
, tests
, function() // {{{
{
    var p = function (cond) { return this.cond = cond; }
    var t = function () { this.result = 'true'; }
    var f = function () { this.result = 'false'; }
    var o = {}; o.m = ifte(p, t, f);
    o.m(1);
    assertEquals(1, o.cond);
    assertEquals('true', o.result);
    o.m(0);
    assertEquals(0, o.cond);
    assertEquals('false', o.result);
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
