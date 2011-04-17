// vim: et sts=2 sw=2 fdm=marker cms=\ //\ %s

$$IMPORT_ZETA_INTO$$(this, { import_internals : true });

var tests = [];
var output;
if (typeof(print) != 'undefined') {
  output = print;
} else if (typeof(console) != 'undefined' && 'log' in console) {
  output = function ()
  {
    return console.log.apply(console, arguments);
  }
} else {
  throw "unsupported js shell.  please submit a patch.";
};

