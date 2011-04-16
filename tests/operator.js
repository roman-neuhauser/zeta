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
, function() // {{{
{
    var a = new_(Array)(1, 2, 3);
    assertEquals(3, a.length);
    assertEquals(1, a[0]);
    assertEquals(2, a[1]);
    assertEquals(3, a[2]);

    assertEquals(42, new_(Number)(42).valueOf());
    assertEquals('hello', new_(String)('hello').toString());
    assertEquals('hello', new(String)('hello').toString());
}); // }}}

defTest('testPlus'
, tests
, function() // {{{
{
    assertEquals('abc', plus('ab', 'c'));
    assertEquals(42, plus(40, 2));
}); // }}}

defTest('testMinus'
, tests
, function() // {{{
{
    assertEquals(38, minus(40, 2));
}); // }}}

defTest('testMul'
, tests
, function() // {{{
{
    assertEquals(24, mul(3, 8));
}); // }}}

defTest('testDiv'
, tests
, function() // {{{
{
    assertEquals(3, div(24, 8));
    assertEquals(3.14, div(9.42, 3));
}); // }}}

defTest('testIntdiv'
, tests
, function() // {{{
{
    assertEquals(6, intdiv(24, 4));
    assertEquals(4, intdiv(9.99, 2));
    assertEquals(1, intdiv(4, 2.3));
}); // }}}

defTest('testMod'
, tests
, function() // {{{
{
    assertEquals(0, mod(2, 2));
    assertEquals(1, mod(3, 2));
    assertEquals(2, mod(8, 3));
    assertEquals(3, mod(9, 6));
}); // }}}

defTest('testPow'
, tests
, function() // {{{
{
    assertEquals(0, pow(0, 2));
    assertEquals(0, pow(0, 1));
    assertEquals(1, pow(0, 0));
    assertEquals(1, pow(2, 0));
    assertEquals(2, pow(2, 1));
    assertEquals(4, pow(2, 2));
    assertEquals(8, pow(2, 3));
    assertEquals(9, pow(3, 2));
}); // }}}

defTest('testNot'
, tests
, function() // {{{
{
    assertEquals(false, not(true));
    assertEquals(true, not(false));
    assertEquals(false, not(1));
    assertEquals(false, not(-1));
    assertEquals(false, not(3));
    assertEquals(true, not(0));
    assertEquals(true, not(null));
}); // }}}

defTest('testTrue_'
, tests
, function() // {{{
{
    assertEquals(true, true_());
}); // }}}

defTest('testFalse_'
, tests
, function() // {{{
{
    assertEquals(false, false_());
}); // }}}

defTest('testNeg'
, tests
, function() // {{{
{
    assertEquals(0, neg(0));
    assertEquals(1, neg(-1));
    assertEquals(-3, neg(3));
}); // }}}

defTest('testEq'
, tests
, function() // {{{
{
    assertEquals(true, eq(0, 0));
    assertEquals(true, eq(1, 1));
    assertEquals(false, eq(1, -1));
    assertEquals(false, eq(1, 0));
}); // }}}

defTest('testLt'
, tests
, function() // {{{
{
    assertEquals(true, lt(-1, 0));
    assertEquals(true, lt(0, 1));
    assertEquals(false, lt(0, -1));
    assertEquals(false, lt(1, 1));
    assertEquals(false, lt(1, 0));
}); // }}}

defTest('testGt'
, tests
, function() // {{{
{
    assertEquals(false, gt(-1, 0));
    assertEquals(false, gt(0, 1));
    assertEquals(false, gt(1, 1));
    assertEquals(true, gt(1, 0));
}); // }}}

defTest('testLe'
, tests
, function() // {{{
{
    assertEquals(true, le(-1, 0));
    assertEquals(true, le(0, 1));
    assertEquals(true, le(1, 1));
    assertEquals(false, le(1, 0));
}); // }}}

defTest('testGe'
, tests
, function() // {{{
{
    assertEquals(false, ge(-1, 0));
    assertEquals(false, ge(0, 1));
    assertEquals(true, ge(1, 1));
    assertEquals(true, ge(1, 0));
}); // }}}

defTest('testDec'
, tests
, function() // {{{
{
    var i = dec(2);
    var j = dec(20);
    assertEquals(1, i());
    assertEquals(19, j());
    assertEquals(0, i());
    assertEquals(18, j());
    assertEquals(-1, i());
    assertEquals(17, j());
}); // }}}

defTest('testInc'
, tests
, function() // {{{
{
    var i = inc(2);
    var j = inc(9);
    assertEquals(3, i());
    assertEquals(10, j());
    assertEquals(4, i());
    assertEquals(11, j());
}); // }}}

defTest('testOdd'
, tests
, function() // {{{
{
    assertEquals(false, odd(0));
    assertEquals(false, odd(2));
    assertEquals(true, odd(1));
    assertEquals(true, odd(3));
}); // }}}

defTest('testEven'
, tests
, function() // {{{
{
    assertEquals(true, even(0));
    assertEquals(true, even(2));
    assertEquals(false, even(1));
    assertEquals(false, even(3));
}); // }}}

defTest('testMinMax'
, tests
, function() // {{{
{
    var a = ['a'];
    var b = ['b'];
    assertEquals(b, __minmax(true_)(a, b));
    assertEquals(a, __minmax(false_)(a, b));
}); // }}}

defTest('testMin'
, tests
, function() // {{{
{
    assertEquals(3, min(3, 5));
    assertEquals(5, min(7, 5));
    assertEquals(1, min(1, 1));
}); // }}}

defTest('testMax'
, tests
, function() // {{{
{
    assertEquals(5, max(3, 5));
    assertEquals(7, max(7, 5));
    assertEquals(1, max(1, 1));
}); // }}}

defTest('testCompare'
, tests
, function() // {{{
{
    assertEquals(true, 0 > compare(-1, 0));
    assertEquals(true, 0 < compare(1, 0));
    assertEquals(true, 0 == compare(1, 1));
}); // }}}

defTest('testMember'
, tests
, function() // {{{
{
    var a = range(0, 5);
    assertEquals(a[3], member(a, 3));
    assertEquals(undefined, member(a, 5));

    var o = { foo : 'bar' };
    assertEquals(o.foo, member(o, 'foo'));
    assertEquals(undefined, member(o, 'qux'));
}); // }}}

defTest('testTo_bool'
, tests
, function() // {{{
{
    assertEquals(true, to_bool(itself)(-1));
    assertEquals(true, to_bool(itself)(1));
    assertEquals(false, to_bool(itself)(0));
}); // }}}

defTest('to_bool method'
, tests
, function() // {{{
{
    var o = { b : true };
    var f = function ()
    {
        return this.b;
    }
    o.m = to_bool(f);
    assertEquals(o.b, o.m());
}); // }}}

defTest('testTo_num'
, tests
, function() // {{{
{
    assertEquals(1, to_num(itself)(true));
    assertEquals(1, to_num(itself)('1'));
    assertEquals(0, to_num(itself)(false));
    assertEquals(0, to_num(itself)('0'));
    assertEquals(0.1, to_num(itself)('0.1'));
}); // }}}

defTest('to_num method'
, tests
, function() // {{{
{
    var o = { i : 42 };
    var f = function ()
    {
        return this.i;
    }
    o.m = to_num(f);
    assertEquals(o.i, o.m());
}); // }}}

defTest('testIs_a'
, tests
, function() // {{{
{
    var data = [
        [false, new Number(1), String],
        [false, new Number(1), RegExp],
        [true, new Number(1), Number],
        [true, new String('abc'), String],
    ];
    for_(
        data
      , spread(function (exp, val, cls)
        {
            assertEquals(exp, is_a(val, cls));
        })
    );
}); // }}}

defTest('testIs_null'
, tests
, function() // {{{
{
    var data = [
        [false, 1],
        [false, 0],
        [true, null],
        [true, undefined],
    ];
    for_(
        data
      , spread(function (exp, val, cls)
        {
            assertEquals(exp, null == val);
            assertEquals(null == val, is_null(val, cls));
        })
    );
}); // }}}

defTest('testType_of'
, tests
, function() // {{{
{
    assertEquals('string', type_of('hello'));
    assertEquals('object', type_of([]));
    assertEquals('object', type_of({}));
    assertEquals('object', type_of(null));
    assertEquals('undefined', type_of(undefined));
}); // }}}

defTest('testSize'
, tests
, function() // {{{
{
    assertEquals(0, size([]));
    assertEquals(1, size([0]));
    assertEquals(2, size([0, 0]));
    assertEquals(3, size([0, 0, 0]));
}); // }}}

defTest('testEmpty'
, tests
, function() // {{{
{
    assertEquals(true, empty([]));
}); // }}}

defTest('testIn'
, tests
, function() // {{{
{
    var o = { foo : 'bar' };
    var data = [
        [true, 'foo'],
        [false, 'bar'],
        [false, 'qux'],
    ];
    for_(
        data
      , spread(bind(
            assertEquals
          , [$1, use2nd(bind2nd(in_, o))]
        ))
    );
}); // }}}

defTest('contains'
, tests
, function() // {{{
{
    var a = [40, 50, 60];
    assertEquals(true, contains(40, a));
    assertEquals(true, contains(50, a));
    assertEquals(true, contains(60, a));

    assertEquals(false, contains(39, a));
    assertEquals(false, contains(41, a));
    assertEquals(false, contains(59, a));
    assertEquals(false, contains(61, a));
}); // }}}

defTest('testList'
, tests
, function() // {{{
{
    var x = list();
    x.push(2);

    assertEquals(1, x.length);
    assertEquals(2, x[0]);

    var y = list();

    assertEquals(0, y.length);

    var z = list(2, 'x', {});

    assertEquals(0, z.length);
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
