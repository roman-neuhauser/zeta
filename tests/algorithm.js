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

defTest('testFor_'
, tests
, function (z) // {{{
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
    z.for_(data, logger);
    assertEquals(3, log.length);
    assertEquals('foo', log[0]);
    assertEquals('bar', log[1]);
    assertEquals('qux', log[2]);
}); // }}}

defTest('for_ method'
, tests
, function (z) // {{{
{
    var o = { a : [] };
    var f = function (v)
    {
        this.a.push(v);
    }
    o.m = z.bind2nd(z.for_, f);
    o.m([42, 69]);
    assertEquals(2, o.a.length);
    assertEquals(42, o.a[0]);
    assertEquals(69, o.a[1]);
}); // }}}

defTest('testPush'
, tests
, function (z) // {{{
{
    var a = [];
    var p = z.push(a);
    p(0);
    assertEquals(1, a.length);
    p(0, 0);
    assertEquals(3, a.length);
    assertEquals(5, p(0, 0));
}); // }}}

defTest('testWhile_'
, tests
, function (z) // {{{
{
    var p = z.inc(0);
    z.while_(z.dec(10), p)
    assertEquals(10, p());
}); // }}}

defTest('while_ method'
, tests
, function (z) // {{{
{
    var o = {
        i : 0
      , j : 3
      , m : z.while_
    };
    var c = function ()
    {
        return --this.j;
    }
    var f = function ()
    {
        ++this.i;
    }
    o.m(c, f);
    assertEquals(2, o.i);
    assertEquals(0, o.j);
}); // }}}

defTest('testMap'
, tests
, function (z) // {{{
{
    assertEquals(3, z.map(z.value(3), [0, 1, 2])[0]);
}); // }}}

defTest('map method'
, tests
, function (z) // {{{
{
    var o = { a : [] };
    var f = function (v)
    {
        this.a.push(v);
        return 2 * v;
    }
    o.m = z.bind1st(z.map, f);
    var a = o.m([42, 69]);
    assertEquals(2, o.a.length);
    assertEquals(42, o.a[0]);
    assertEquals(69, o.a[1]);
}); // }}}

defTest('testEvery'
, tests
, function (z) // {{{
{
    assertEquals(true, z.every(z.true_, z.range(0, 5)));
    assertEquals(true, z.every(z.true_, []));
    assertEquals(true, z.every(z.false_, []));
}); // }}}

defTest('testEveryShortCircuit'
, tests
, function (z) // {{{
{
    var f = z.inc(0);
    var s = function (v)
    {
        f();
        return 3 == v;
    };
    var rv = z.some(s, z.range(1, 5))
    assertEquals(4, f());
}); // }}}

defTest('testSome'
, tests
, function (z) // {{{
{
    assertEquals(false, z.some(z.bind1st(z.le, 5), z.range(0, 5)));
    assertEquals(false, z.some(z.true_, []));
    assertEquals(false, z.some(z.false_, []));
    assertEquals(true, z.some(z.odd, z.range(0, 5)));
}); // }}}

defTest('testSomeShortCircuit'
, tests
, function (z) // {{{
{
    var f = z.inc(0);
    var s = function (v)
    {
        f();
        return 3 == v ? 69 : false;
    };
    var rv = z.some(s, z.range(1, 5))
    assertEquals(4, f());
    assertEquals(69, rv);
}); // }}}

defTest('testFilter'
, tests
, function (z) // {{{
{
    var rv = z.filter(z.odd, [1, 2, 3, 4, 5]);
    var exp = [1, 3, 5];
    assertEquals(3, rv.length);
    z.for_(
        exp,
        function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('filter method'
, tests
, function (z) // {{{
{
    var o = { a : [] };
    var f = function (v, i)
    {
        this.a.push(v);
        return i % 2;
    }
    o.m = z.bind1st(z.filter, f);
    var a = o.m([42, 69]);
    assertEquals(2, o.a.length);
    assertEquals(42, o.a[0]);
    assertEquals(69, o.a[1]);
}); // }}}

defTest('testCoalesce'
, tests
, function (z) // {{{
{
    assertEquals('hello', z.coalesce([null, undefined, 'hello']));
    assertEquals(null, z.coalesce([null, undefined]));
    assertEquals(0, z.coalesce([null, undefined, 0, 1]));
    assertEquals('fubar', z.coalesce([null, undefined], 'fubar'));
}); // }}}

defTest('testIota'
, tests
, function (z) // {{{
{
    var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    assertEquals(10, z.range(0, 10).length);
    z.for_(
        data,
        function (v, i)
        {
            assertEquals(v, z.range(0, 10)[i]);
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
, function (z) // {{{
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
, function (z) // {{{
{
    assertEquals(1, z.find_if(z.even, z.range(1, 4)));
}); // }}}

defTest('find_if method'
, tests
, function (z) // {{{
{
    var o = { a : [] };
    var f = function (v)
    {
        this.a.push(v);
        return v % 2;
    }
    o.m = z.bind1st(z.find_if, f);
    var a = o.m([42, 69]);
    assertEquals(2, o.a.length);
    assertEquals(42, o.a[0]);
    assertEquals(69, o.a[1]);
}); // }}}

defTest('testFind'
, tests
, function (z) // {{{
{
    assertEquals(3, z.find(4, z.range(1, 4)));
}); // }}}

defTest('testCopy'
, tests
, function (z) // {{{
{
    var data = [{foo: 'bar'}, 1, 2, 3];
    var rv = z.copy(data);
    assertEquals(data.length, rv.length);
    assertEquals(data[0], rv[0]);
    assertEquals(data[1], rv[1]);
    assertEquals(data[2], rv[2]);
    assertEquals(data[3], rv[3]);
}); // }}}

defTest('testKeys'
, tests
, function (z) // {{{
{
    var data = z.range(1, 10);
    z.for_(
        data
      , function (v, i)
        {
            if (z.even(i)) {
                delete data[i];
            }
        }
    );
    var rv = z.keys(data);
    assertEquals(data.length / 2, rv.length);
    z.for_(
        z.range(1, 5, 2)
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('testReverse'
, tests
, function (z) // {{{
{
    var data = z.range(0, 3);
    var rv = z.reverse(data);
    assertEquals(data.length, rv.length);
    assertEquals(data[0], rv[2]);
    assertEquals(data[1], rv[1]);
    assertEquals(data[2], rv[0]);
}); // }}}

defTest('testPrevious'
, tests
, function (z) // {{{
{
    var prev = z.previous(42);
    assertEquals(42, prev(69));
    assertEquals(69, prev(78));
    assertEquals(78, prev(13));
}); // }}}

defTest('testUnique'
, tests
, function (z) // {{{
{
    var data = [2, 2, 3, 2, 2, 2, 3, 3, 2, 1, 1, 0, 1, 1, 3];
    var exp =  [2,    3, 2,       3,    2, 1,    0, 1,    3];
    var rv = z.unique(z.eq, data);
    assertEquals(exp.length, rv.length);
    z.for_(
        exp
      , function (v, i, a)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('testSorted'
, tests
, function (z) // {{{
{
    var data = [3, 0, 2, -1, 1];
    var exp = [-1, 0, 1, 2, 3];
    var rv = z.sorted(data);
    assertEquals(data.length, rv.length);
    assertEquals(exp[0], rv[0]);
    assertEquals(exp[1], rv[1]);
    assertEquals(exp[2], rv[2]);
    assertEquals(exp[3], rv[3]);
    assertEquals(exp[4], rv[4]);
}); // }}}

defTest('testSortedCmp'
, tests
, function (z) // {{{
{
    var data = [3, 0, 2, -1, 1];
    var exp = [3, 2, 1, 0, -1];
    var rv = z.sorted(data, z.compose(z.neg, z.compare));
    assertEquals(data.length, rv.length);
    assertEquals(exp[0], rv[0]);
    assertEquals(exp[1], rv[1]);
    assertEquals(exp[2], rv[2]);
    assertEquals(exp[3], rv[3]);
    assertEquals(exp[4], rv[4]);
}); // }}}

defTest('testSlice'
, tests
, function (z) // {{{
{
    var rv = z.range(0, 10);
    rv = z.slice(rv, 2, 5);
    assertEquals(3, rv.length);
}); // }}}

defTest('testInsert'
, tests
, function (z) // {{{
{
    var rv = [];
    var ins = z.insert(rv);
    ins('omg', 2);
    assertEquals('omg', rv[2]);
    assertEquals('wtf', ins('wtf', 0));
}); // }}}

function _testChainData(z, c, l) // {{{
{
    var d = [];
    for (var i = 0; i < c; ++i) {
        d[i] = z.range(i * l, l);
    }
    return d;
} // }}}

defTest('test_testChainData'
, tests
, function (z) // {{{
{
    var rv = _testChainData(z, 3, 2);
    assertEquals(3, rv.length);
    z.for_(rv, z.bind(assertEquals, [z.value(2), z.size]));
    z.for_(rv, function (a, i)
    {
        z.for_(a, function (v, j, a)
        {
            assertEquals(i * z.size(a) + j, v);
        })
    });
}); // }}}

function _testChain(z, f, c, l) // {{{
{
    var rv = f(_testChainData(z, c, l));
    assertEquals(c * l, rv.length);
    z.for_(rv, z.bind(assertEquals, [z.$2, z.$1]));
} // }}}

defTest('testChain2'
, tests
, function (z) // {{{
{
    _testChain(z, z.bind1st(z.apply, z.__chain2), 2, 6);
}); // }}}

defTest('testChain'
, tests
, function (z) // {{{
{
    _testChain(z, z.bind1st(z.apply, z.chain), 4, 4);
}); // }}}

defTest('testZip'
, tests
, function (z) // {{{
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
    var rv = z.zip(data);
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
, function (z) // {{{
{
    assertEquals(8, z.reduce(z.min, [], 8));
    assertEquals(0, z.zip([]).length);
}); // }}}

defTest('testZipDifferentLengths1'
, tests
, function (z) // {{{
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
    var rv = z.zip(data);
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
, function (z) // {{{
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
    var rv = z.zip(data);
    assertEquals(3, rv.length);
    assertEquals(0, rv[0][0]);
    assertEquals(1, rv[0][1]);
    assertEquals(2, rv[1][0]);
    assertEquals(3, rv[1][1]);
    assertEquals(4, rv[2][0]);
    assertEquals(5, rv[2][1]);
}); // }}}

defTest('testGroup_byInts'
, tests
, function (z) // {{{
{
    var data = z.range(11, 7);
    var rv = z.group_by(z.even, data);
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

defTest('group_by method'
, tests
, function (z) // {{{
{
    var o = { i : 0 };
    o.m = z.group_by;
    var f = function (i)
    {
        ++this.i;
        return i;
    }
    o.m(f, [42, 69]);
    assertEquals(2, o.i);
}); // }}}

defTest('testGroup_byChars'
, tests
, function (z) // {{{
{
    var data = ['h', 'E', 'L', 'l', 'O'];
    var rv = z.group_by(
        function (c)
        {
            return c.toUpperCase() == c;
        }
      , data
    );
    assertEquals(2, rv.length);
    assertEquals(2, rv[0].length);
    assertEquals(3, rv[1].length);
    assertEquals('h', rv[0][0]);
    assertEquals('l', rv[0][1]);
    assertEquals('E', rv[1][0]);
    assertEquals('L', rv[1][1]);
    assertEquals('O', rv[1][2]);
}); // }}}

defTest('testReduce'
, tests
, function (z) // {{{
{
    var data = z.range(1, 3);
    assertEquals(6, z.reduce(z.plus, data, 0));
}); // }}}

defTest('reduce method'
, tests
, function (z) // {{{
{
    var o = { a : [] };
    var f = function (rv, v)
    {
        this.a.push(v);
        return rv + v;
    }
    o.m = z.reduce;
    var a = o.m(f, [42, 69], 0);
    assertEquals(2, o.a.length);
    assertEquals(42, o.a[0]);
    assertEquals(69, o.a[1]);
}); // }}}

defTest('testTakeWhile'
, tests
, function (z) // {{{
{
    var data = z.range(0, 8);
    var rv = z.take_while(z.bind1st(z.gt, 5), data);
    assertEquals(5, rv.length);
    z.for_(
        rv
      , function (v, i)
        {
            assertEquals(data[i], v);
        }
    );
}); // }}}

defTest('take_while method'
, tests
, function (z) // {{{
{
    var o = { i : 0 };
    var f = function (v)
    {
        ++this.i;
        return v < 4;
    };
    o.m = z.bind2nd(z.take_while, z.range(0, 8));
    var rv = o.m(f);
    assertEquals(5, o.i);
}); // }}}

defTest('testTakeWhileSparseInput'
, tests
, function (z) // {{{
{
    var data = z.range(0, 5);
    delete data[1];
    delete data[3];
    var rv = z.take_while(z.bind1st(z.gt, 5), data);
    assertEquals(3, rv.length);
    z.for_(
        z.range(0, 3, 2)
      , function (v, i)
        {
            assertEquals(v, rv[i]);
        }
    );
}); // }}}

defTest('testJoin'
, tests
, function (z) // {{{
{
    assertEquals('', z.join([], ''));
    assertEquals('', z.join([]));
    assertEquals('', z.join(['']));
    assertEquals('x', z.join(['', ''], 'x'));
}); // }}}

defTest('testJoinDefaultSep'
, tests
, function (z) // {{{
{
    assertEquals('', z.join([]));
    assertEquals('', z.join(['']));
    assertEquals('a,b,c', z.join(['a', 'b', 'c']));
}); // }}}

defTest('testSplit'
, tests
, function (z) // {{{
{
    var empty = z.split('', '');
    assertEquals(true, empty instanceof Array);
    assertEquals(0, empty.length);

    var s = 'abcd';
    var a = z.split(s, '');
    assertEquals(s.length, a.length);
    assertEquals('a', a[0]);
    assertEquals('b', a[1]);
    assertEquals('c', a[2]);
    assertEquals('d', a[3]);
}); // }}}

defTest('testSplitDefaultSep'
, tests
, function (z) // {{{
{
    var empty = z.split('');
    assertEquals(true, empty instanceof Array);
    assertEquals(1, empty.length);
    assertEquals('', empty[0]);

    var s = 'abcd';
    var a = z.split(s);
    assertEquals(1, a.length);
    assertEquals(s, a[0]);
}); // }}}

defTest('testProduct'
, tests
, function (z) // {{{
{
    assertEquals(3 * 20 * 100, z.product([3, 20, 100]));
    assertEquals(1, z.product([]));
}); // }}}

defTest('testSum'
, tests
, function (z) // {{{
{
    assertEquals(123, z.sum([3, 20, 100]));
}); // }}}

defTest('testChunkInts'
, tests
, function (z) // {{{
{
    var rv = z.chunk(z.range(100, 10), 3);
    assertEquals(3, rv[0].length);
    assertEquals(3, rv[1].length);
    assertEquals(3, rv[2].length);
    assertEquals(1, rv[3].length);
    assertEquals(100, rv[0][0]);
    assertEquals(101, rv[0][1]);
    assertEquals(102, rv[0][2]);
    // ...
    assertEquals(108, rv[2][2]);
    assertEquals(109, rv[3][0]);
}); // }}}

defTest('testChunkChars'
, tests
, function (z) // {{{
{
    var rv = z.chunk(['a', 'b', 'c', 'd', 'e'], 3);
    assertEquals(3, rv[0].length);
    assertEquals(2, rv[1].length);
    assertEquals('a', rv[0][0]);
    assertEquals('b', rv[0][1]);
    assertEquals('c', rv[0][2]);
    assertEquals('d', rv[1][0]);
    assertEquals('e', rv[1][1]);
}); // }}}

defTest('testFill'
, tests
, function (z) // {{{
{
    var rv = z.fill(10, 'omg');
    assertEquals(10, rv.length);
    z.for_(
        z.iota(10)
      , function (i)
        {
            assertEquals('omg', rv[i]);
        }
    );
}); // }}}

defTest('testInner_product'
, tests
, function (z) // {{{
{
    assertEquals(2 * 3 + 4 * 5, z.inner_product([2, 4], [3, 5]));
}); // }}}

defTest('testItems'
, tests
, function (z) // {{{
{
    var rv = z.items({
        foo: 20
      , bar: 30
      , baz: 40
    });
    var exp = [
        [20, 'foo']
      , [30, 'bar']
      , [40, 'baz']
    ];
    assertEquals(exp.length, rv.length);
    z.for_(
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
, function (z) // {{{
{
    var o = {
        foo: 'omg'
      , bar: 'wtf'
      , baz: 'qux'
    };
    var exp = ['foo', 'bar', 'baz'];
    var rv = z.properties(o);
    assertEquals(exp.length, rv.length);
    z.for_(
        exp
      , function (name, i)
        {
            assertEquals(name, rv[i]);
        }
    );
}); // }}}

defTest('testCons'
, tests
, function (z) // {{{
{
    var rv = z.cons(2, [4, 6]);
    assertEquals(3, rv.length);
    assertEquals(2, rv[0]);
    assertEquals(4, rv[1]);
    assertEquals(6, rv[2]);
}); // }}}


// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
