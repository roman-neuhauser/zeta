$(document).ready(function ()
{
    var display = $('#display');
    output = function ()
    {
        var s = '';
        for (var i = 0; i < arguments.length; ++i) {
            s += arguments[i];
        }
        display.append(s + "\n");
    }
    time_js.apply(this, []);
});
