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

function testNew_() // {{{
{
    var a = new_(Array)(1, 2, 3);
    assertEquals(3, a.length);
    assertEquals(1, a[0]);
    assertEquals(2, a[1]);
    assertEquals(3, a[2]);

    assertEquals(42, new_(Number)(42).valueOf());
    assertEquals('hello', new_(String)('hello').toString());
    assertEquals('hello', new(String)('hello').toString());
} // }}}

function testPlus() // {{{
{
    assertEquals(42, plus(40, 2));
} // }}}

function testMinus() // {{{
{
    assertEquals(38, minus(40, 2));
} // }}}

function testMul() // {{{
{
    assertEquals(24, mul(3, 8));
} // }}}

function testDiv() // {{{
{
    assertEquals(3, div(24, 8));
    assertEquals(3.14, div(9.42, 3));
} // }}}

function testIntdiv() // {{{
{
    assertEquals(6, intdiv(24, 4));
    assertEquals(4, intdiv(9.99, 2));
    assertEquals(1, intdiv(4, 2.3));
} // }}}

function testMod() // {{{
{
    assertEquals(0, mod(2, 2));
    assertEquals(1, mod(3, 2));
} // }}}

function testPow() // {{{
{
    assertEquals(8, pow(2, 3));
    assertEquals(9, pow(3, 2));
} // }}}

function testNot() // {{{
{
    assertEquals(false, not(true));
    assertEquals(true, not(false));
    assertEquals(false, not(1));
    assertEquals(false, not(-1));
    assertEquals(false, not(3));
    assertEquals(true, not(0));
    assertEquals(true, not(null));
} // }}}

function testTrue_() // {{{
{
    assertEquals(true, true_());
} // }}}

function testFalse_() // {{{
{
    assertEquals(false, false_());
} // }}}

function testNeg() // {{{
{
    assertEquals(0, neg(0));
    assertEquals(1, neg(-1));
    assertEquals(-3, neg(3));
} // }}}

function testEq() // {{{
{
    assertEquals(true, eq(0, 0));
    assertEquals(true, eq(1, 1));
    assertEquals(false, eq(1, 0));
} // }}}

function testLt() // {{{
{
    assertEquals(true, lt(-1, 0));
    assertEquals(true, lt(0, 1));
    assertEquals(false, lt(1, 1));
    assertEquals(false, lt(1, 0));
} // }}}

function testGt() // {{{
{
    assertEquals(false, gt(-1, 0));
    assertEquals(false, gt(0, 1));
    assertEquals(false, gt(1, 1));
    assertEquals(true, gt(1, 0));
} // }}}

function testLe() // {{{
{
    assertEquals(true, le(-1, 0));
    assertEquals(true, le(0, 1));
    assertEquals(true, le(1, 1));
    assertEquals(false, le(1, 0));
} // }}}

function testGe() // {{{
{
    assertEquals(false, ge(-1, 0));
    assertEquals(false, ge(0, 1));
    assertEquals(true, ge(1, 1));
    assertEquals(true, ge(1, 0));
} // }}}

function testDec() // {{{
{
    var i = dec(2);
    var j = dec(20);
    assertEquals(1, i());
    assertEquals(19, j());
    assertEquals(0, i());
    assertEquals(18, j());
    assertEquals(-1, i());
    assertEquals(17, j());
} // }}}

function testInc() // {{{
{
    var i = inc(2);
    var j = inc(9);
    assertEquals(3, i());
    assertEquals(10, j());
    assertEquals(4, i());
    assertEquals(11, j());
} // }}}

function testOdd() // {{{
{
    assertEquals(false, odd(0));
    assertEquals(false, odd(2));
    assertEquals(true, odd(1));
    assertEquals(true, odd(3));
} // }}}

function testEven() // {{{
{
    assertEquals(true, even(0));
    assertEquals(true, even(2));
    assertEquals(false, even(1));
    assertEquals(false, even(3));
} // }}}

function testMinMax() // {{{
{
    var a = ['a'];
    var b = ['b'];
    assertEquals(b, minmax(true_)(a, b));
    assertEquals(a, minmax(false_)(a, b));
} // }}}

function testMin() // {{{
{
    assertEquals(3, min(3, 5));
    assertEquals(5, min(7, 5));
    assertEquals(1, min(1, 1));
} // }}}

function testMax() // {{{
{
    assertEquals(5, max(3, 5));
    assertEquals(7, max(7, 5));
    assertEquals(1, max(1, 1));
} // }}}

function testCompare() // {{{
{
    assertEquals(true, 0 > compare(-1, 0));
    assertEquals(true, 0 < compare(1, 0));
    assertEquals(true, 0 == compare(1, 1));
} // }}}

function testMember() // {{{
{
    var a = range(0, 5);
    assertEquals(a[3], member(a, 3));
    assertEquals(undefined, member(a, 5));

    var o = { foo : 'bar' };
    assertEquals(o.foo, member(o, 'foo'));
    assertEquals(undefined, member(o, 'qux'));
} // }}}

function testTo_bool() // {{{
{
    assertEquals(true, to_bool(itself)(-1));
    assertEquals(true, to_bool(itself)(1));
    assertEquals(false, to_bool(itself)(0));
} // }}}

function testTo_num() // {{{
{
    assertEquals(1, to_num(itself)(true));
    assertEquals(1, to_num(itself)('1'));
    assertEquals(0, to_num(itself)(false));
    assertEquals(0, to_num(itself)('0'));
    assertEquals(0.1, to_num(itself)('0.1'));
} // }}}

function testIs_a() // {{{
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
} // }}}

function testIs_null() // {{{
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
} // }}}

function testType_of() // {{{
{
    assertEquals('string', type_of('hello'));
    assertEquals('object', type_of([]));
    assertEquals('object', type_of({}));
    assertEquals('object', type_of(null));
    assertEquals('undefined', type_of(undefined));
} // }}}

function testLength() // {{{
{
    assertEquals(0, length([]));
    assertEquals(1, length([0]));
    assertEquals(2, length([0, 0]));
    assertEquals(3, length([0, 0, 0]));
} // }}}

function testEmpty() // {{{
{
    assertEquals(true, empty([]));
} // }}}

function testIn() // {{{
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
} // }}}

tests.push(
    testPlus
  , testMinus
  , testMul
  , testDiv
  , testIntdiv
  , testMod
  , testPow
  , testNot
  , testTrue_
  , testFalse_
  , testNeg
  , testEq
  , testLt
  , testGt
  , testLe
  , testGe
  , testDec
  , testInc
  , testOdd
  , testEven
  , testMinMax
  , testMin
  , testMax
  , testCompare
  , testNew_
  , testMember
  , testTo_bool
  , testTo_num
  , testIs_a
  , testIs_null
  , testType_of
  , testLength
  , testEmpty
  , testIn
);

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
