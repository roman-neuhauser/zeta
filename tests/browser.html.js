$(document).ready(function ()
{
    var display = $('#display');
    var print = function ()
    {
        var s = '';
        for (var i = 0; i < arguments.length; ++i) {
            s += arguments[i];
        }
        display.append(s + "\n");
    }
    $$IMPORT_ZETA_INTO$$(window, { import_internals : true });
    runTests(print, tests);
});
