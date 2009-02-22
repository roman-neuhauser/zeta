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

defTest('testRunTestSuccess' // {{{
, tests
, function ()
{
    var log = [];
    var logger = function (v)
    {
        log.push(v);
    }
    this.test = function (f)
    {
        return runTest(logger, f);
    }
    var rv = this.test(function () {});
    assertEquals(0, rv);
    assertEquals(0, log.length);
}); // }}}

var failingAssertion = testDef( // {{{
'failingAssertion',
function ()
{
    assertEquals(0, 1);
}); // }}}

defTest('testRunTestFailure' // {{{
, tests
, function ()
{
    var log = [];
    var logger = function (v)
    {
        log.push(v);
    }
    var rv = runTest(logger, failingAssertion);
    assertEquals(1, rv);
    assertEquals(1, log.length);
    assertEquals(
        "failure in failingAssertion: expected: 0, actual: 1"
      , log[0]
    );
}); // }}}

defTest('testAssertion' // {{{
, tests
, function ()
{
    var ass = new EqualityFailure(42, 'hello');
    assertEquals(42, ass.exp);
    assertEquals('hello', ass.act);
}); // }}}

defTest('testAssertEqualsFailureThrowsAssertion' // {{{
, tests
, function ()
{
    try {
        assertEquals(1, 0);
    } catch (e) {
        if (e instanceof Assertion) {
            return;
        }
        throw e;
    }
    fail("did not throw");
}); // }}}

defTest('testTestDef' // {{{
, tests
, function()
{
    var f = function () {}
    var d = testDef('fubar', f);
    assertEquals(f, d.test);
    assertEquals('fubar', d.name);
}); // }}}

defTest('testDefTest' // {{{
, tests
, function ()
{
    var suite = [];
    var f = function () {}
    assertEquals(1, defTest('fubar', suite, f));

    var d = suite[0];
    assertEquals(f, d.test);
    assertEquals('fubar', d.name);
}); // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
