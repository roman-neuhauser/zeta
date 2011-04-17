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

var args;
if (typeof(process) != 'undefined' && 'argv' in process) {
  args = Array.prototype.slice.call(process.argv, 2);
} else if (typeof(arguments) != 'undefined') {
  args = arguments;
} else {
  throw "unsupported js shell.  please submit a patch.";
}

time_js.apply(this, args);
