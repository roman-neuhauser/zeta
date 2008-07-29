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

defTest('testFor_'
, tests
, function() // {{{
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
}); // }}}

defTest('testPush'
, tests
, function() // {{{
{
    var a = [];
    var p = push(a);
    p(0);
    assertEquals(1, a.length);
    p(0, 0);
    assertEquals(3, a.length);
    assertEquals(5, p(0, 0));
}); // }}}

defTest('testWhile_'
, tests
, function() // {{{
{
    var p = inc(0);
    while_(dec(10), p)
    assertEquals(10, p());
}); // }}}

defTest('testMap'
, tests
, function() // {{{
{
    assertEquals(3, map(value(3), [0, 1, 2])[0]);
}); // }}}

defTest('testEvery'
, tests
, function() // {{{
{
    assertEquals(true, every(true_, range(0, 5)));
    assertEquals(true, every(true_, []));
    assertEquals(true, every(false_, []));
    //assertEquals(true, every(bind1st(gt, 5), range(0, 5)));
}); // }}}

defTest('testEveryShortCircuit'
, tests
, function() // {{{
{
    var f = inc(0);
    var s = function (v)
    {
        f();
        return 3 == v;
    };
    var rv = some(s, range(1, 5))
    assertEquals(4, f());
}); // }}}

defTest('testSome'
, tests
, function() // {{{
{
    assertEquals(false, some(bind1st(le, 5), range(0, 5)));
    assertEquals(false, some(true_, []));
    assertEquals(false, some(false_, []));
    assertEquals(true, some(odd, range(0, 5)));
}); // }}}

defTest('testSomeShortCircuit'
, tests
, function() // {{{
{
    var f = inc(0);
    var s = function (v)
    {
        f();
        return 3 == v ? 69 : false;
    };
    var rv = some(s, range(1, 5))
    assertEquals(4, f());
    assertEquals(69, rv);
}); // }}}

defTest('testFilter'
, tests
, function() // {{{
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
}); // }}}

defTest('testCoalesce'
, tests
, function() // {{{
{
    assertEquals('hello', coalesce([null, undefined, 'hello']));
    assertEquals(null, coalesce([null, undefined]));
    assertEquals(0, coalesce([null, undefined, 0, 1]));
    assertEquals('fubar', coalesce([null, undefined], 'fubar'));
}); // }}}

defTest('testIota'
, tests
, function() // {{{
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
}); // }}}

function fib (n) // {{{
{
    if (0 == n || 1 == n) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
} // }}}

defTest('testFibonacci'
, tests
, function() // {{{
{
    assertEquals(1, fib(0));
    assertEquals(1, fib(1));
    assertEquals(2, fib(2));
    assertEquals(3, fib(3));
    assertEquals(5, fib(4));
    assertEquals(8, fib(5));
    assertEquals(13, fib(6));
}); // }}}

defTest('testFind_if'
, tests
, function() // {{{
{
    assertEquals(1, find_if(even, range(1, 4)));
}); // }}}

defTest('testFind'
, tests
, function() // {{{
{
    assertEquals(3, find(4, range(1, 4)));
}); // }}}

defTest('testCopy'
, tests
, function() // {{{
{
    var data = [{foo: 'bar'}, 1, 2, 3];
    var rv = copy(data);
    assertEquals(data.length, rv.length);
    assertEquals(data[0], rv[0]);
    assertEquals(data[1], rv[1]);
    assertEquals(data[2], rv[2]);
    assertEquals(data[3], rv[3]);
}); // }}}

defTest('testKeys'
, tests
, function() // {{{
{
    var data = range(1, 10);
    for_(
        data
      , function (v, i)
        {
            if (even(i)) {
                delete data[i];
            }
        }
    );
    var rv = keys(data);
    assertEquals(data.length / 2, rv.length);
    for_(
        range(1, 5, 2)
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('testReverse'
, tests
, function() // {{{
{
    var data = range(0, 3);
    var rv = reverse(data);
    assertEquals(data.length, rv.length);
    assertEquals(data[0], rv[2]);
    assertEquals(data[1], rv[1]);
    assertEquals(data[2], rv[0]);
}); // }}}

defTest('testPrevious'
, tests
, function() // {{{
{
    var prev = previous(42);
    assertEquals(42, prev(69));
    assertEquals(69, prev(78));
    assertEquals(78, prev(13));
}); // }}}

defTest('testUnique'
, tests
, function() // {{{
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
}); // }}}

defTest('testSorted'
, tests
, function() // {{{
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
}); // }}}

defTest('testSortedCmp'
, tests
, function() // {{{
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
}); // }}}

defTest('testSlice'
, tests
, function() // {{{
{
    var rv = range(0, 10);
    rv = slice(rv, 2, 5);
    assertEquals(3, rv.length);
}); // }}}

defTest('testInsert'
, tests
, function() // {{{
{
    var rv = [];
    var ins = insert(rv);
    ins('omg', 2);
    assertEquals('omg', rv[2]);
    assertEquals('wtf', ins('wtf', 0));
}); // }}}

function _testChainData(c, l) // {{{
{
    var d = [];
    for (var i = 0; i < c; ++i) {
        d[i] = range(i * l, l);
    }
    return d;
} // }}}

defTest('test_testChainData'
, tests
, function() // {{{
{
    var rv = _testChainData(3, 2);
    assertEquals(3, rv.length);
    for_(rv, bind(assertEquals, [value(2), size]));
    for_(rv, function (a, i)
    {
        for_(a, function (v, j, a)
        {
            assertEquals(i * size(a) + j, v);
        })
    });
}); // }}}

function _testChain(f, c, l) // {{{
{
    var rv = f(_testChainData(c, l));
    assertEquals(c * l, rv.length);
    for_(rv, bind(assertEquals, [$2, $1]));
} // }}}

defTest('testChain2'
, tests
, function() // {{{
{
    _testChain(bind1st(apply, chain2), 2, 6);
}); // }}}

defTest('testChain'
, tests
, function() // {{{
{
    _testChain(bind1st(apply, chain), 4, 4);
}); // }}}

defTest('testZip'
, tests
, function() // {{{
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
}); // }}}

defTest('testZipEmptyArgument'
, tests
, function() // {{{
{
    assertEquals(8, reduce(min, [], 8));
    assertEquals(0, zip([]).length);
}); // }}}

defTest('testZipDifferentLengths1'
, tests
, function() // {{{
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
}); // }}}

defTest('testZipDifferentLengths2'
, tests
, function() // {{{
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
}); // }}}

defTest('testGroup_by'
, tests
, function() // {{{
{
    var data = range(11, 7);
    var rv = group_by(even, data);
    assertEquals(2, rv.length);
    assertEquals(4, rv[0].length);
    assertEquals(3, rv[1].length);
    assertEquals(11, rv[0][0]);
    assertEquals(13, rv[0][1]);
    assertEquals(15, rv[0][2]);
    assertEquals(17, rv[0][3]);
    assertEquals(12, rv[1][0]);
    assertEquals(14, rv[1][1]);
    assertEquals(16, rv[1][2]);
}); // }}}

defTest('testReduce'
, tests
, function() // {{{
{
    var data = range(1, 3);
    assertEquals(6, reduce(plus, data, 0));
}); // }}}

defTest('testTakeWhile'
, tests
, function() // {{{
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
}); // }}}

defTest('testTakeWhileSparseInput'
, tests
, function() // {{{
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
}); // }}}

defTest('testJoin'
, tests
, function() // {{{
{
    assertEquals('', join([], ''));
    assertEquals('', join([]));
    assertEquals('', join(['']));
    assertEquals('x', join(['', ''], 'x'));
}); // }}}

defTest('testJoinDefaultSep'
, tests
, function() // {{{
{
    assertEquals('', join([]));
    assertEquals('', join(['']));
    assertEquals('a,b,c', join(['a', 'b', 'c']));
}); // }}}

defTest('testSplit'
, tests
, function() // {{{
{
    var empty = split('', '');
    assertEquals(true, empty instanceof Array);
    assertEquals(0, empty.length);

    var s = 'abcd';
    var a = split(s, '');
    assertEquals(s.length, a.length);
    assertEquals('a', a[0]);
    assertEquals('b', a[1]);
    assertEquals('c', a[2]);
    assertEquals('d', a[3]);
}); // }}}

defTest('testSplitDefaultSep'
, tests
, function() // {{{
{
    var empty = split('');
    assertEquals(true, empty instanceof Array);
    assertEquals(1, empty.length);
    assertEquals('', empty[0]);

    var s = 'abcd';
    var a = split(s);
    assertEquals(1, a.length);
    assertEquals(s, a[0]);
}); // }}}

defTest('testProduct'
, tests
, function() // {{{
{
    assertEquals(3 * 20 * 100, product([3, 20, 100]));
    assertEquals(1, product([]));
}); // }}}

defTest('testSum'
, tests
, function() // {{{
{
    assertEquals(123, sum([3, 20, 100]));
}); // }}}

defTest('testChunk'
, tests
, function() // {{{
{
    var rv = chunk(range(0, 10), 3);
    assertEquals(3, rv[0].length);
    assertEquals(3, rv[1].length);
    assertEquals(3, rv[2].length);
    assertEquals(1, rv[3].length);
    assertEquals(0, rv[0][0]);
    assertEquals(1, rv[0][1]);
    // ...
    assertEquals(8, rv[2][2]);
    assertEquals(9, rv[3][0]);
}); // }}}

defTest('testFill'
, tests
, function() // {{{
{
    var rv = fill(10, 'omg');
    assertEquals(10, rv.length);
    for_(
        iota(10)
      , function (i)
        {
            assertEquals('omg', rv[i]);
        }
    );
}); // }}}

defTest('testInner_product'
, tests
, function() // {{{
{
    assertEquals(2 * 3 + 4 * 5, inner_product([2, 4], [3, 5]));
}); // }}}

defTest('testItems'
, tests
, function() // {{{
{
    var rv = items({
        foo: 20
      , bar: 30
      , baz: 40
    });
    var exp = [
        ['foo', 20]
      , ['bar', 30]
      , ['baz', 40]
    ];
    assertEquals(exp.length, rv.length);
    for_(
        exp
      , function (v, i)
        {
            assertEquals(v[0], rv[i][0]);
            assertEquals(v[1], rv[i][1]);
        }
    );
}); // }}}

defTest('testProperties'
, tests
, function() // {{{
{
    var o = {
        foo: 'omg'
      , bar: 'wtf'
      , baz: 'qux'
    };
    var exp = ['foo', 'bar', 'baz'];
    var rv = properties(o);
    assertEquals(exp.length, rv.length);
    for_(
        exp
      , function (name, i)
        {
            assertEquals(name, rv[i]);
        }
    );
}); // }}}

defTest('testCons'
, tests
, function() // {{{
{
    var rv = cons(2, [4, 6]);
    assertEquals(3, rv.length);
    assertEquals(2, rv[0]);
    assertEquals(4, rv[1]);
    assertEquals(6, rv[2]);
}); // }}}


// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
