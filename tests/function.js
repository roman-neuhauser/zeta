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

defTest('testItself'
, tests
, function (z) // {{{
{
    assertEquals(42, z.itself(42));
}); // }}}

defTest('testValue'
, tests
, function (z) // {{{
{
    assertEquals(42, z.value(42)());
}); // }}}

defTest('testCompose'
, tests
, function (z) // {{{
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
    assertEquals("omg wtf", z.compose(f, g)("omg"));
}); // }}}

defTest('compose method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.compose(z.itself, f);
    assertEquals(o, o.m());
}); // }}}

defTest('negate'
, tests
, function (z) // {{{
{
    var f = z.negate(function (v)
    {
        return v;
    });
    assertEquals(true, f(false));
    assertEquals(false, f(true));
}); // }}}

defTest('negate method'
, tests
, function (z) // {{{
{
    var o = { i : 0 };
    var f = function (v) { ++this.i; return v; }
    o.m = z.negate(f);
    assertEquals(0, o.i);
    assertEquals(false, o.m(true));
    assertEquals(1, o.i);
    assertEquals(true, o.m(false));
    assertEquals(2, o.i);
}); // }}}

defTest('testApply'
, tests
, function (z) // {{{
{
    assertEquals(7, z.apply(z.plus, [2, 5]));
}); // }}}

defTest('apply method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.bind1st(z.apply, f);
    assertEquals(o, o.m([]));
}); // }}}

defTest('testSpread'
, tests
, function (z) // {{{
{
    assertEquals(7, z.spread(z.plus)([2, 5]));
}); // }}}

defTest('spread method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function (a, b)
    {
        this.a = a;
        this.b = b;
        return this;
    }
    o.m = z.spread(f);
    assertEquals(o, o.m(['hello', 'world']));
    assertEquals('hello', o.a);
    assertEquals('world', o.b);
}); // }}}

defTest('testCollect'
, tests
, function (z) // {{{
{
    var args = [3, 4, 5];
    var f = z.collect(z.itself);
    var rv = f.apply(f, args);
    assertEquals(true, rv instanceof Array);
    z.for_(
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
, function (z) // {{{
{
    var o = {};
    var f = function (a)
    {
        this.a = a;
        return this;
    }
    o.m = z.collect(f);
    assertEquals(o, o.m('hello', 'world'));
    assertEquals('hello', o.a[0]);
    assertEquals('world', o.a[1]);
}); // }}}

defTest('testMethod'
, tests
, function (z) // {{{
{
    var s = 'omg wtf';
    var a = [];
    var f = z.method(a, a.push);
    var g = z.method(s, s.indexOf);

    f(s);
    assertEquals(1, a.length);
    assertEquals(s, a[0]);

    assertEquals(3, g(' '));
}); // }}}

defTest('testOperatorAndReturnValue'
, tests
, function (z) // {{{
{
    assertEquals(false, (false && null));
    assertEquals(4, (true && 4));
    assertEquals(true, (4 && true));
}); // }}}

defTest('testConjoinShortCircuit'
, tests
, function (z) // {{{
{
    var rv = [];
    var f = z.push(rv);
    z.conjoin([z.true_, z.false_, f])(1, 2, 3);
    assertEquals(0, rv.length);
    z.conjoin([z.true_, z.true_, f])(1);
    assertEquals(1, rv.length);
    z.conjoin([z.true_, z.true_, f])(1, 2, 3);
    assertEquals(4, rv.length);
}); // }}}

defTest('testConjoinOfNoPredicatesIsTrue'
, tests
, function (z)
{
    assertEquals(true, z.conjoin([])());
});

defTest('testDisjoinOfNoPredicatesIsFalse'
, tests
, function (z)
{
    assertEquals(false, z.disjoin([])());
});

defTest('testConjoinReturnValue'
, tests
, function (z) // {{{
{
    assertEquals(true, z.conjoin([z.true_, z.true_])());
    assertEquals(false, z.conjoin([z.true_, z.$1])(null));
    assertEquals(true, z.conjoin([z.$1, z.true_])(4));
    assertEquals(8, z.conjoin([z.true_, z.$1])(8));
}); // }}}

defTest('conjoin method'
, tests
, function (z) // {{{
{
    var o = { a : [], b : [] };
    var f = function (a, b)
    {
        this.a.push(a);
        this.b.push(b);
        return true;
    }
    var g = function (a, b)
    {
        this.a.push(a);
        this.b.push(b);
        return this;
    }
    o.m = z.conjoin([f, g]);
    assertEquals(o, o.m('hello', 'world'));
    assertEquals('hello', o.a[0]);
    assertEquals('hello', o.a[1]);
    assertEquals('world', o.b[0]);
    assertEquals('world', o.b[1]);
}); // }}}

defTest('testOperatorOrReturnValue'
, tests
, function (z) // {{{
{
    assertEquals(false, (null || false));
    assertEquals(null, (false || null));
}); // }}}

defTest('testDisjoinShortCircuit'
, tests
, function (z) // {{{
{
    var rv = [];
    var f = z.push(rv);
    z.disjoin([z.false_, z.true_, f])(1);
    assertEquals(0, rv.length);
    z.disjoin([z.false_, z.false_, f])(1, 2);
    assertEquals(2, rv.length);
}); // }}}

defTest('testDisjoinReturnValue'
, tests
, function (z) // {{{
{
    assertEquals(true, z.disjoin([z.false_, z.true_])());
    assertEquals(false, z.disjoin([z.false_, z.$1])(null));
    assertEquals(4, z.disjoin([z.$1, z.false_])(4));
    assertEquals(8, z.disjoin([z.false_, z.$1])(8));
    assertEquals('0', z.disjoin([z.false_, z.$1])('0'));
}); // }}}

defTest('disjoin method'
, tests
, function (z) // {{{
{
    var o = { a : [], b : [] };
    var f = function (a, b)
    {
        this.a.push(a);
        this.b.push(b);
        return false;
    }
    var g = function (a, b)
    {
        this.a.push(a);
        this.b.push(b);
        return this;
    }
    o.m = z.disjoin([f, g]);
    assertEquals(o, o.m('hello', 'world'));
    assertEquals('hello', o.a[0]);
    assertEquals('hello', o.a[1]);
    assertEquals('world', o.b[0]);
    assertEquals('world', o.b[1]);
}); // }}}

defTest('testBinder'
, tests
, function (z) // {{{
{
    var rv = [];
    var f = z.binder(z.push(rv));
    z.apply(f, z.range(0, 4))();
    assertEquals(4, rv.length);
}); // }}}

defTest('binder method'
, tests
, function (z) // {{{
{
    var o = { a : [] };
    var f = function (a)
    {
        this.a.push(a);
        return this;
    }
    o.m = z.binder(f)(42);
    var rv = o.m();
    assertEquals(o, rv);
    assertEquals(42, o.a[0]);
}); // }}}

defTest('testCurry'
, tests
, function (z) // {{{
{
    var f = z.curry(z.curry(z.argv, 7), 8);
    var rv = f(9);
    assertEquals(3, rv.length)
    assertEquals(7, rv[0])
    assertEquals(8, rv[1])
    assertEquals(9, rv[2])
}); // }}}

defTest('testSelect'
, tests
, function (z) // {{{
{
    var data = ['foo', 'bar', 'baz'];
    z.for_(
        data,
        function (v, i, a)
        {
            assertEquals(v, z.select(i)(a));
        }
    );
}); // }}}

defTest('testProject'
, tests
, function (z) // {{{
{
    var data = ['foo', 'bar', 'baz'];
    z.for_(
        data,
        function (v, i, a)
        {
            assertEquals(v, z.apply(z.project(i), a));
        }
    );
}); // }}}

defTest('test$1'
, tests
, function (z) // {{{
{
    var args = ['foo', 'bar', 'baz'];
    assertEquals('foo', z.$1('foo', 'bar', 'baz'));
}); // }}}

defTest('testBind1st'
, tests
, function (z) // {{{
{
    var f = z.bind1st(z.minus, 10);
    assertEquals(5, f(5));
    assertEquals(3, f(7));
    assertEquals(-10, f(20));
}); // }}}

defTest('bind1st method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.bind1st(f, 42);
    assertEquals(o, o.m());
}); // }}}

defTest('testBind2nd'
, tests
, function (z) // {{{
{
    var f = z.bind2nd(z.minus, 10);
    assertEquals(-5, f(5));
    assertEquals(-3, f(7));
    assertEquals(10, f(20));
}); // }}}

defTest('bind2nd method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.bind2nd(f, 42);
    assertEquals(o, o.m());
}); // }}}

defTest('testBind'
, tests
, function (z) // {{{
{
    assertEquals(11, z.bind(z.value(11), [])(3, 5));
    assertEquals(2, z.bind(z.minus, [z.$2, z.$1])(3, 5));
}); // }}}

defTest('bind method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    var b = function () { this.x = 'whatever'; return 0; }
    o.m = z.bind(f, [b]);
    var rv = o.m();
    assertEquals(o, rv);
    assertEquals('whatever', o.x);
}); // }}}

defTest('testUse1st'
, tests
, function (z) // {{{
{
    var rv = z.use1st(z.argv)(3, 4, 5);
    assertEquals(1, rv.length);
    assertEquals(3, rv[0]);
    assertEquals(1, z.use1st(z.itself)(1, 2, 3));
}); // }}}

defTest('use1st method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.use1st(f);
    assertEquals(o, o.m());
}); // }}}

defTest('testUse2nd'
, tests
, function (z) // {{{
{
    var rv = z.use2nd(z.argv)(3, 4, 5);
    assertEquals(1, rv.length);
    assertEquals(4, rv[0]);
    assertEquals(2, z.use2nd(z.itself)(1, 2, 3));
}); // }}}

defTest('use2nd method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.use2nd(f);
    assertEquals(o, o.m());
}); // }}}

defTest('testNth'
, tests
, function (z) // {{{
{
    var a = z.range(0, 5);
    assertEquals(a[3], z.nth(a)(3));
    assertEquals(undefined, z.nth(a)(5));

    var o = { foo : 'bar' };
    assertEquals(o.foo, z.nth(o)('foo'));
    assertEquals(undefined, z.nth(o)('qux'));
}); // }}}

defTest('testComposex'
, tests
, function (z) // {{{
{
    var f = z.bind1st(z.mul, 10000);
    var g = z.bind1st(z.plus, 1000)
    var h = z.bind1st(z.plus, 3)
    assertEquals(f(5), z.composex([z.itself, f])(5));
    assertEquals(g(f(5)), z.composex([g, f])(5));
    assertEquals(h(g(f(5))), z.composex([h, g, f])(5));

    assertEquals(33, z.composex([])(11, 22, 33));
    assertEquals(undefined, z.composex([])());
}); // }}}

defTest('composex method'
, tests
, function (z) // {{{
{
    var o = {};
    var f = function () { return this; }
    o.m = z.composex([z.itself, f]);
    assertEquals(o, o.m());
}); // }}}

defTest('testJoiner'
, tests
, function (z) // {{{
{
    assertEquals('a-b-c', z.joiner('-')(['a', 'b', 'c']));
}); // }}}

defTest('testSplitter'
, tests
, function (z) // {{{
{
    var exp = ['a', 'b', 'c'];
    var rv = z.splitter('-')('a-b-c');
    z.for_(
        exp
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('testIfte'
, tests
, function (z) // {{{
{
    var f = z.ifte(Boolean, z.itself, z.bind2nd(z.minus, 3));
    z.for_(
        [[2, 2], [-7, -7], [-3, 0]]
      , z.spread(z.bind(assertEquals, [z.$1, z.use2nd(f)]))
    );
}); // }}}

defTest('ifte method'
, tests
, function (z) // {{{
{
    var p = function (cond) { return this.cond = cond; }
    var t = function () { this.result = 'true'; }
    var f = function () { this.result = 'false'; }
    var o = {}; o.m = z.ifte(p, t, f);
    o.m(1);
    assertEquals(1, o.cond);
    assertEquals('true', o.result);
    o.m(0);
    assertEquals(0, o.cond);
    assertEquals('false', o.result);
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
