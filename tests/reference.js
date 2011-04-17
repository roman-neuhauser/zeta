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

defTest('testRefApply'
, tests
, function (z) // {{{
{
    var args = [
        [],
        [1193227920000],
        [2007, 9, 24],
        [2007, 9, 24, 22, 45]
    ];
    var dates = z.map(z.bind1st(z.apply, z.new_(Date)), args);
    z.for_(
        dates
      , z.true_ //compose(print, $1)
    );
}); // }}}

defTest('testRefBind2nd'
, tests
, function (z) // {{{
{
    var rv = z.map(z.bind2nd(z.pow, 2), z.range(0, 4));
    assertEquals(4, rv.length);
    assertEquals(0, rv[0]);
    assertEquals(1, rv[1]);
    assertEquals(4, rv[2]);
    assertEquals(9, rv[3]);
}); // }}}

defTest('testRefMap'
, tests
, function (z) // {{{
{
    var data = [0, 2, 4, 6, 8];
    var exp = [1, 2, 5, 13, 34];
    z.for_(
        z.map(fib, data)
      , function (v, i)
        {
            assertEquals(exp[i], v);
        }
    );
}); // }}}

defTest('testRefCompose'
, tests
, function (z) // {{{
{
    var arr = [2, 'f', 0, 1, -3];
    assertEquals(2, z.find_if(z.compose(z.not, Boolean), arr));
}); // }}}

defTest('testRefEvery'
, tests
, function (z) // {{{
{
    var is_pos = z.bind1st(z.lt, 0);
    assertEquals(true, z.every(is_pos, [1, 2, 3]));
    assertEquals(false, z.every(is_pos, [1, -2, 3]));
}); // }}}

defTest('testRefSome'
, tests
, function (z) // {{{
{
    var is_0 = z.bind1st(z.eq, 0);
    assertEquals(true, z.some(is_0, [0, 1, 2, 3]));
    assertEquals(false, z.some(is_0, [1, 2, 3]));
}); // }}}

defTest('testRefEq'
, tests
, function (z) // {{{
{
    var arr = z.range(16, 9, -4);
    assertEquals(4, z.find_if(z.bind2nd(z.eq, 0), arr));
}); // }}}

defTest('testRefGe'
, tests
, function (z) // {{{
{
    var arr = z.range(-3, 7);
    assertEquals(3, z.find_if(z.bind2nd(z.ge, 0), arr));
}); // }}}

defTest('testRefGt'
, tests
, function (z) // {{{
{
    var arr = z.range(-3, 7);
    assertEquals(4, z.find_if(z.bind2nd(z.gt, 0), arr));
}); // }}}

defTest('testRefLe'
, tests
, function (z) // {{{
{
    var arr = z.range(7, 7, -2);
    assertEquals(4, z.find_if(z.bind2nd(z.le, 0), arr));
}); // }}}

defTest('testRefLt'
, tests
, function (z) // {{{
{
    var arr = z.range(3, 7, -1);
    assertEquals(4, z.find_if(z.bind2nd(z.lt, 0), arr));
}); // }}}

defTest('testRefMax'
, tests
, function (z) // {{{
{
    assertEquals(7, z.reduce(z.max, [0, 7, -3, 5], 0));
}); // }}}

defTest('testRefMin'
, tests
, function (z) // {{{
{
    assertEquals(-3, z.reduce(z.min, [0, 7, -3, 5], 0));
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
