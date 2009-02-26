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

function Assertion(msg) // {{{
{
    this.toString = function ()
    {
        return msg;
    }
} // }}}

function UnconditionalFailure(msg) // {{{
{
    Assertion.call(this, msg);
}
UnconditionalFailure.prototype = new Assertion;
// }}}

function EqualityFailure(exp, act, msg) // {{{
{
    Assertion.call(
        this
      , (msg ? msg + '\n' : '')
            + "expected: " + exp
            + ", actual: " + act
    );
}
EqualityFailure.prototype = new Assertion;
// }}}

function assertEquals(exp, act, msg) // {{{
{
    if (exp !== act) {
        throw new EqualityFailure(exp, act, msg);
    }
} // }}}

function fail(msg) // {{{
{
    throw new UnconditionalFailure(msg);
} // }}}

function runTest(output, test) // {{{
{
    var fail = function (test, e) // {{{
    {
        output("failure in " + test.name + ": " + e);
    } // }}}
    var err = function (test, e) // {{{
    {
        output("error in " + test.name + ": " + e);
    } // }}}
    try {
        (test.test ? test.test : test)();
        return 0;
    } catch (e) {
        if (e instanceof Assertion) {
            fail(test, e);
            return 1;
        }
        err(test, e);
        return 2;
    }
} // }}}

function runTests(output, tests) // {{{
{
    var rv = 0;
    for (var i = 0; i < tests.length; ++i) {
        rv |= runTest(output, tests[i]);
    }
    output(i + " tests run");
    return rv;
} // }}}

function testDef(name, f) // {{{
{
    return {
        name : name,
        test : f
    };
} // }}}

var defTest = function (name, suite, test) // {{{
{
    return suite.push(testDef(name, test));
} // }}}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
