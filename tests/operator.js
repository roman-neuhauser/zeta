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

defTest('testNew_'
, tests
, function (z) // {{{
{
    var a = z.new_(Array)(1, 2, 3);
    assertEquals(3, a.length);
    assertEquals(1, a[0]);
    assertEquals(2, a[1]);
    assertEquals(3, a[2]);

    assertEquals(42, z.new_(Number)(42).valueOf());
    assertEquals('hello', z.new_(String)('hello').toString());
    assertEquals('hello', new(String)('hello').toString());
}); // }}}

defTest('testPlus'
, tests
, function (z) // {{{
{
    assertEquals('abc', z.plus('ab', 'c'));
    assertEquals(42, z.plus(40, 2));
}); // }}}

defTest('testMinus'
, tests
, function (z) // {{{
{
    assertEquals(38, z.minus(40, 2));
}); // }}}

defTest('testMul'
, tests
, function (z) // {{{
{
    assertEquals(24, z.mul(3, 8));
}); // }}}

defTest('testDiv'
, tests
, function (z) // {{{
{
    assertEquals(3, z.div(24, 8));
    assertEquals(3.14, z.div(9.42, 3));
}); // }}}

defTest('testIntdiv'
, tests
, function (z) // {{{
{
    assertEquals(6, z.intdiv(24, 4));
    assertEquals(4, z.intdiv(9.99, 2));
    assertEquals(1, z.intdiv(4, 2.3));
}); // }}}

defTest('testMod'
, tests
, function (z) // {{{
{
    assertEquals(0, z.mod(2, 2));
    assertEquals(1, z.mod(3, 2));
    assertEquals(2, z.mod(8, 3));
    assertEquals(3, z.mod(9, 6));
}); // }}}

defTest('testPow'
, tests
, function (z) // {{{
{
    assertEquals(0, z.pow(0, 2));
    assertEquals(0, z.pow(0, 1));
    assertEquals(1, z.pow(0, 0));
    assertEquals(1, z.pow(2, 0));
    assertEquals(2, z.pow(2, 1));
    assertEquals(4, z.pow(2, 2));
    assertEquals(8, z.pow(2, 3));
    assertEquals(9, z.pow(3, 2));
}); // }}}

defTest('testNot'
, tests
, function (z) // {{{
{
    assertEquals(false, z.not(true));
    assertEquals(true, z.not(false));
    assertEquals(false, z.not(1));
    assertEquals(false, z.not(-1));
    assertEquals(false, z.not(3));
    assertEquals(true, z.not(0));
    assertEquals(true, z.not(null));
}); // }}}

defTest('testTrue_'
, tests
, function (z) // {{{
{
    assertEquals(true, z.true_());
}); // }}}

defTest('testFalse_'
, tests
, function (z) // {{{
{
    assertEquals(false, z.false_());
}); // }}}

defTest('testNeg'
, tests
, function (z) // {{{
{
    assertEquals(0, z.neg(0));
    assertEquals(1, z.neg(-1));
    assertEquals(-3, z.neg(3));
}); // }}}

defTest('testEq'
, tests
, function (z) // {{{
{
    assertEquals(true, z.eq(0, 0));
    assertEquals(true, z.eq(1, 1));
    assertEquals(false, z.eq(1, -1));
    assertEquals(false, z.eq(1, 0));
}); // }}}

defTest('testLt'
, tests
, function (z) // {{{
{
    assertEquals(true, z.lt(-1, 0));
    assertEquals(true, z.lt(0, 1));
    assertEquals(false, z.lt(0, -1));
    assertEquals(false, z.lt(1, 1));
    assertEquals(false, z.lt(1, 0));
}); // }}}

defTest('testGt'
, tests
, function (z) // {{{
{
    assertEquals(false, z.gt(-1, 0));
    assertEquals(false, z.gt(0, 1));
    assertEquals(false, z.gt(1, 1));
    assertEquals(true, z.gt(1, 0));
}); // }}}

defTest('testLe'
, tests
, function (z) // {{{
{
    assertEquals(true, z.le(-1, 0));
    assertEquals(true, z.le(0, 1));
    assertEquals(true, z.le(1, 1));
    assertEquals(false, z.le(1, 0));
}); // }}}

defTest('testGe'
, tests
, function (z) // {{{
{
    assertEquals(false, z.ge(-1, 0));
    assertEquals(false, z.ge(0, 1));
    assertEquals(true, z.ge(1, 1));
    assertEquals(true, z.ge(1, 0));
}); // }}}

defTest('testDec'
, tests
, function (z) // {{{
{
    var i = z.dec(2);
    var j = z.dec(20);
    assertEquals(1, i());
    assertEquals(19, j());
    assertEquals(0, i());
    assertEquals(18, j());
    assertEquals(-1, i());
    assertEquals(17, j());
}); // }}}

defTest('testInc'
, tests
, function (z) // {{{
{
    var i = z.inc(2);
    var j = z.inc(9);
    assertEquals(3, i());
    assertEquals(10, j());
    assertEquals(4, i());
    assertEquals(11, j());
}); // }}}

defTest('testOdd'
, tests
, function (z) // {{{
{
    assertEquals(false, z.odd(0));
    assertEquals(false, z.odd(2));
    assertEquals(true, z.odd(1));
    assertEquals(true, z.odd(3));
}); // }}}

defTest('testEven'
, tests
, function (z) // {{{
{
    assertEquals(true, z.even(0));
    assertEquals(true, z.even(2));
    assertEquals(false, z.even(1));
    assertEquals(false, z.even(3));
}); // }}}

defTest('testMinMax'
, tests
, function (z) // {{{
{
    var a = ['a'];
    var b = ['b'];
    assertEquals(b, z.__minmax(z.true_)(a, b));
    assertEquals(a, z.__minmax(z.false_)(a, b));
}); // }}}

defTest('testMin'
, tests
, function (z) // {{{
{
    assertEquals(3, z.min(3, 5));
    assertEquals(5, z.min(7, 5));
    assertEquals(1, z.min(1, 1));
}); // }}}

defTest('testMax'
, tests
, function (z) // {{{
{
    assertEquals(5, z.max(3, 5));
    assertEquals(7, z.max(7, 5));
    assertEquals(1, z.max(1, 1));
}); // }}}

defTest('testCompare'
, tests
, function (z) // {{{
{
    assertEquals(true, 0 > z.compare(-1, 0));
    assertEquals(true, 0 < z.compare(1, 0));
    assertEquals(true, 0 == z.compare(1, 1));
}); // }}}

defTest('testMember'
, tests
, function (z) // {{{
{
    var a = z.range(0, 5);
    assertEquals(a[3], z.member(a, 3));
    assertEquals(undefined, z.member(a, 5));

    var o = { foo : 'bar' };
    assertEquals(o.foo, z.member(o, 'foo'));
    assertEquals(undefined, z.member(o, 'qux'));
}); // }}}

defTest('testTo_bool'
, tests
, function (z) // {{{
{
    assertEquals(true, z.to_bool(z.itself)(-1));
    assertEquals(true, z.to_bool(z.itself)(1));
    assertEquals(false, z.to_bool(z.itself)(0));
}); // }}}

defTest('to_bool method'
, tests
, function (z) // {{{
{
    var o = { b : true };
    var f = function ()
    {
        return this.b;
    }
    o.m = z.to_bool(f);
    assertEquals(o.b, o.m());
}); // }}}

defTest('testTo_num'
, tests
, function (z) // {{{
{
    assertEquals(1, z.to_num(z.itself)(true));
    assertEquals(1, z.to_num(z.itself)('1'));
    assertEquals(0, z.to_num(z.itself)(false));
    assertEquals(0, z.to_num(z.itself)('0'));
    assertEquals(0.1, z.to_num(z.itself)('0.1'));
}); // }}}

defTest('to_num method'
, tests
, function (z) // {{{
{
    var o = { i : 42 };
    var f = function ()
    {
        return this.i;
    }
    o.m = z.to_num(f);
    assertEquals(o.i, o.m());
}); // }}}

defTest('testIs_a'
, tests
, function (z) // {{{
{
    var data = [
        [false, new Number(1), String],
        [false, new Number(1), RegExp],
        [true, new Number(1), Number],
        [true, new String('abc'), String],
    ];
    z.for_(
        data
      , z.spread(function (exp, val, cls)
        {
            assertEquals(exp, z.is_a(val, cls));
        })
    );
}); // }}}

defTest('testIs_null'
, tests
, function (z) // {{{
{
    var data = [
        [false, 1],
        [false, 0],
        [true, null],
        [true, undefined],
    ];
    z.for_(
        data
      , z.spread(function (exp, val, cls)
        {
            assertEquals(exp, null == val);
            assertEquals(null == val, z.is_null(val, cls));
        })
    );
}); // }}}

defTest('testType_of'
, tests
, function (z) // {{{
{
    assertEquals('string', z.type_of('hello'));
    assertEquals('object', z.type_of([]));
    assertEquals('object', z.type_of({}));
    assertEquals('object', z.type_of(null));
    assertEquals('undefined', z.type_of(undefined));
}); // }}}

defTest('testSize'
, tests
, function (z) // {{{
{
    assertEquals(0, z.size([]));
    assertEquals(1, z.size([0]));
    assertEquals(2, z.size([0, 0]));
    assertEquals(3, z.size([0, 0, 0]));
}); // }}}

defTest('testEmpty'
, tests
, function (z) // {{{
{
    assertEquals(true, z.empty([]));
}); // }}}

defTest('testIn'
, tests
, function (z) // {{{
{
    var o = { foo : 'bar' };
    var data = [
        [true, 'foo'],
        [false, 'bar'],
        [false, 'qux'],
    ];
    z.for_(
        data
      , z.spread(z.bind(
            assertEquals
          , [z.$1, z.use2nd(z.bind2nd(z.in_, o))]
        ))
    );
}); // }}}

defTest('contains'
, tests
, function (z) // {{{
{
    var a = [40, 50, 60];
    assertEquals(true, z.contains(40, a));
    assertEquals(true, z.contains(50, a));
    assertEquals(true, z.contains(60, a));

    assertEquals(false, z.contains(39, a));
    assertEquals(false, z.contains(41, a));
    assertEquals(false, z.contains(59, a));
    assertEquals(false, z.contains(61, a));
}); // }}}

defTest('testList'
, tests
, function (z) // {{{
{
    var l = z.list();
    l.push(2);

    assertEquals(1, l.length);
    assertEquals(2, l[0]);

    var m = z.list();

    assertEquals(0, m.length);

    var n = z.list(2, 'x', {});

    assertEquals(0, n.length);
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
