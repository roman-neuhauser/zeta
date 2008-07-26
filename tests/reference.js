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

defTest('testRefApply'
, tests
, function() // {{{
{
    var args = [
        [],
        [1193227920000],
        [2007, 9, 24],
        [2007, 9, 24, 22, 45]
    ];
    var dates = map(bind1st(apply, new_(Date)), args);
    for_(
        dates
      , true_ //compose(print, $1)
    );
}); // }}}

defTest('testRefBind2nd'
, tests
, function() // {{{
{
    var rv = map(bind2nd(pow, 2), range(0, 4));
    assertEquals(4, rv.length);
    assertEquals(0, rv[0]);
    assertEquals(1, rv[1]);
    assertEquals(4, rv[2]);
    assertEquals(9, rv[3]);
}); // }}}

defTest('testRefMap'
, tests
, function() // {{{
{
    var data = [0, 2, 4, 6, 8];
    var exp = [1, 2, 5, 13, 34];
    for_(
        map(fib, data)
      , function (v, i)
        {
            assertEquals(exp[i], v);
        }
    );
}); // }}}

defTest('testRefCompose'
, tests
, function() // {{{
{
    var arr = [2, 'f', 0, 1, -3];
    assertEquals(2, find_if(compose(not, Boolean), arr));
}); // }}}

defTest('testRefEvery'
, tests
, function() // {{{
{
    var is_pos = bind1st(lt, 0);
    assertEquals(true, every(is_pos, [1, 2, 3]));
    assertEquals(false, every(is_pos, [1, -2, 3]));
}); // }}}

defTest('testRefSome'
, tests
, function() // {{{
{
    var is_0 = bind1st(eq, 0);
    assertEquals(true, some(is_0, [0, 1, 2, 3]));
    assertEquals(false, some(is_0, [1, 2, 3]));
}); // }}}

defTest('testRefEq'
, tests
, function() // {{{
{
    var arr = range(16, 9, -4);
    assertEquals(4, find_if(bind2nd(eq, 0), arr));
}); // }}}

defTest('testRefGe'
, tests
, function() // {{{
{
    var arr = range(-3, 7);
    assertEquals(3, find_if(bind2nd(ge, 0), arr));
}); // }}}

defTest('testRefGt'
, tests
, function() // {{{
{
    var arr = range(-3, 7);
    assertEquals(4, find_if(bind2nd(gt, 0), arr));
}); // }}}

defTest('testRefLe'
, tests
, function() // {{{
{
    var arr = range(7, 7, -2);
    assertEquals(4, find_if(bind2nd(le, 0), arr));
}); // }}}

defTest('testRefLt'
, tests
, function() // {{{
{
    var arr = range(3, 7, -1);
    assertEquals(4, find_if(bind2nd(lt, 0), arr));
}); // }}}

defTest('testRefMax'
, tests
, function() // {{{
{
    assertEquals(7, reduce(max, [0, 7, -3, 5], 0));
}); // }}}

defTest('testRefMin'
, tests
, function() // {{{
{
    assertEquals(-3, reduce(min, [0, 7, -3, 5], 0));
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
