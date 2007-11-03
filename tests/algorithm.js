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

function testFor_() // {{{
{
    var data = [];
    data[1] = 'foo';
    data[3] = 'bar';
    data[5] = 'qux';
    var log = [];
    var logger = function (v)
    {
        log.push(v);
    }
    for_(data, logger);
    assertEquals(3, log.length);
    assertEquals('foo', log[0]);
    assertEquals('bar', log[1]);
    assertEquals('qux', log[2]);
} // }}}

function testPush() // {{{
{
    var a = [];
    var p = push(a);
    p(0);
    assertEquals(1, a.length);
    p(0, 0);
    assertEquals(3, a.length);
    assertEquals(5, p(0, 0));
} // }}}

function testWhile_() // {{{
{
    var p = inc(0);
    while_(dec(10), p)
    assertEquals(10, p());
} // }}}

function testMap() // {{{
{
    assertEquals(3, map(value(3), [0, 1, 2])[0]);
} // }}}

function testEvery() // {{{
{
    assertEquals(true, every(true_, range(0, 5)));
    //assertEquals(true, every(bind1st(gt, 5), range(0, 5)));
} // }}}

function testSome() // {{{
{
    assertEquals(false, some(bind1st(le, 5), range(0, 5)));
    assertEquals(true, some(odd, range(0, 5)));
} // }}}

function testFilter() // {{{
{
    var rv = filter(odd, [1, 2, 3, 4, 5]);
    var exp = [1, 3, 5];
    assertEquals(3, rv.length);
    for_(
        exp,
        function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
} // }}}

function testCoalesce() // {{{
{
    assertEquals('hello', coalesce([null, undefined, 'hello']));
    assertEquals(null, coalesce([null, undefined]));
    assertEquals(0, coalesce([null, undefined, 0, 1]));
} // }}}

function testIota() // {{{
{
    var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    assertEquals(10, range(0, 10).length);
    for_(
        data,
        function (v, i)
        {
            assertEquals(v, range(0, 10)[i]);
        }
    );
} // }}}

function fib(n) // {{{
{
    if (0 == n || 1 == n) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
} // }}}

function testFibonacci() // {{{
{
    assertEquals(1, fib(0));
    assertEquals(1, fib(1));
    assertEquals(2, fib(2));
    assertEquals(3, fib(3));
    assertEquals(5, fib(4));
    assertEquals(8, fib(5));
    assertEquals(13, fib(6));
} // }}}

function testFind_if() // {{{
{
    assertEquals(1, find_if(even, range(1, 4)));
} // }}}

function testFind() // {{{
{
    assertEquals(3, find(4, range(1, 4)));
} // }}}

function testCopy() // {{{
{
    var data = [{foo: 'bar'}, 1, 2, 3];
    var rv = copy(data);
    assertEquals(data.length, rv.length);
    assertEquals(data[0], rv[0]);
    assertEquals(data[1], rv[1]);
    assertEquals(data[2], rv[2]);
    assertEquals(data[3], rv[3]);
} // }}}

function testReverse() // {{{
{
    var data = range(0, 3);
    var rv = reverse(data);
    assertEquals(data.length, rv.length);
    assertEquals(data[0], rv[2]);
    assertEquals(data[1], rv[1]);
    assertEquals(data[2], rv[0]);
} // }}}

function testPrevious() // {{{
{
    var prev = previous(42);
    assertEquals(42, prev(69));
    assertEquals(69, prev(78));
    assertEquals(78, prev(13));
} // }}}

function testUnique() // {{{
{
    var data = [2, 2, 3, 2, 2, 2, 3, 3, 2, 1, 1, 0, 1, 1, 3];
    var exp =  [2,    3, 2,       3,    2, 1,    0, 1,    3];
    var rv = unique(eq, data);
    assertEquals(exp.length, rv.length);
    for_(
        exp
      , function (v, i, a)
        {
            assertEquals(v, rv[i]);
        }
    );
} // }}}

function testSorted() // {{{
{
    var data = [3, 0, 2, -1, 1];
    var exp = [-1, 0, 1, 2, 3];
    var rv = sorted(data);
    assertEquals(data.length, rv.length);
    assertEquals(exp[0], rv[0]);
    assertEquals(exp[1], rv[1]);
    assertEquals(exp[2], rv[2]);
    assertEquals(exp[3], rv[3]);
    assertEquals(exp[4], rv[4]);
} // }}}

function testSortedCmp() // {{{
{
    var data = [3, 0, 2, -1, 1];
    var exp = [3, 2, 1, 0, -1];
    var rv = sorted(data, compose(neg, compare));
    assertEquals(data.length, rv.length);
    assertEquals(exp[0], rv[0]);
    assertEquals(exp[1], rv[1]);
    assertEquals(exp[2], rv[2]);
    assertEquals(exp[3], rv[3]);
    assertEquals(exp[4], rv[4]);
} // }}}

function testSlice() // {{{
{
    var rv = range(0, 10);
    rv = slice(rv, 2, 5);
    assertEquals(3, rv.length);
} // }}}

function testInsert() // {{{
{
    var rv = [];
    var ins = insert(rv);
    ins('omg', 2);
    assertEquals('omg', rv[2]);
    assertEquals('wtf', ins('wtf', 0));
} // }}}

function testChain() // {{{
{
    var data = [
        range(0, 5),
        range(5, 5),
    ];
    var rv = chain(data);
    assertEquals(10, rv.length);
    for_(rv, bind(assertEquals, [$2, $1]));
} // }}}

function testZip() // {{{
{
    var data = [
        [0, 2, 4, 6],
        [1, 3, 5, 7],
    ];
    var exp = [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
    ];
    var rv = zip(data);
    assertEquals(4, rv.length);
    assertEquals(0, rv[0][0]);
    assertEquals(1, rv[0][1]);
    assertEquals(2, rv[1][0]);
    assertEquals(3, rv[1][1]);
    assertEquals(4, rv[2][0]);
    assertEquals(5, rv[2][1]);
    assertEquals(6, rv[3][0]);
    assertEquals(7, rv[3][1]);
} // }}}

function testZipEmptyArgument() // {{{
{
    assertEquals(8, reduce(min, [], 8));
    assertEquals(0, zip([]).length);
} // }}}

function testZipDifferentLengths1() // {{{
{
    var data = [
        [0, 2, 4],
        [1, 3, 5, 7],
    ];
    var exp = [
        [0, 1],
        [2, 3],
        [4, 5],
    ];
    var rv = zip(data);
    assertEquals(3, rv.length);
    assertEquals(0, rv[0][0]);
    assertEquals(1, rv[0][1]);
    assertEquals(2, rv[1][0]);
    assertEquals(3, rv[1][1]);
    assertEquals(4, rv[2][0]);
    assertEquals(5, rv[2][1]);
} // }}}

function testZipDifferentLengths2() // {{{
{
    var data = [
        [0, 2, 4, 6],
        [1, 3, 5],
    ];
    var exp = [
        [0, 1],
        [2, 3],
        [4, 5],
    ];
    var rv = zip(data);
    assertEquals(3, rv.length);
    assertEquals(0, rv[0][0]);
    assertEquals(1, rv[0][1]);
    assertEquals(2, rv[1][0]);
    assertEquals(3, rv[1][1]);
    assertEquals(4, rv[2][0]);
    assertEquals(5, rv[2][1]);
} // }}}

function testGroup_by() // {{{
{
    var data = range(1, 4);
    var rv = group_by(even, data);
    assertEquals(2, rv.length);
    assertEquals(1, rv[0][0]);
    assertEquals(3, rv[0][1]);
    assertEquals(2, rv[1][0]);
    assertEquals(4, rv[1][1]);
} // }}}

function testReduce() // {{{
{
    var data = range(1, 3);
    assertEquals(6, reduce(plus, data, 0));
} // }}}

function testTakeWhile() // {{{
{
    var data = range(0, 8);
    var rv = take_while(bind1st(gt, 5), data);
    assertEquals(5, rv.length);
    for_(
        rv
      , function (v, i)
        {
            assertEquals(data[i], v);
        }
    );
} // }}}

function testTakeWhileSparseInput() // {{{
{
    var data = range(0, 5);
    delete data[1];
    delete data[3];
    var rv = take_while(bind1st(gt, 5), data);
    assertEquals(3, rv.length);
    for_(
        range(0, 3, 2)
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
} // }}}

tests.push(
    testFor_
  , testWhile_
  , testMap
  , testEvery
  , testSome
  , testFilter
  , testPush
  , testCoalesce
  , testIota
  , testFibonacci
  , testFind_if
  , testFind
  , testCopy
  , testReverse
  , testPrevious
  , testUnique
  , testSorted
  , testSortedCmp
  , testSlice
  , testInsert
  , testChain
  , testZip
  , testZipEmptyArgument
  , testZipDifferentLengths1
  , testZipDifferentLengths2
  , testGroup_by
  , testReduce
  , testTakeWhile
  , testTakeWhileSparseInput
);

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
