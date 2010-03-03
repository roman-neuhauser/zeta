var TIMES = 500;

var time_js = function ()
{
    var z = {}; $$IMPORT_ZETA_INTO$$(z);

    var ats = {
        single_array : z.compose(Array, z.iota)
      , val_array : function (V) // {{{
        {
            return function (v)
            {
                return [V, z.iota(v)];
            }
        } // }}}
      , array_val : function (V) // {{{
        {
            return function (v)
            {
                return [z.iota(v), V];
            }
        } // }}}
    };
    var Args = // {{{
    {
        default_ : z.iota
      , __chain2 : function () { return [z.iota(10), z.iota(10)]; }
      , apply : ats.val_array(z.true_)
      , chunk : function (v, i) { return [v, i]; }
      , __minmax : 'skip'
      , __shortcircuit : 'skip'
      , coalesce : ats.single_array
      , composex : function () { return [z.true_, z.true_]; }
      , contains : ats.val_array(4)
      , copy : ats.single_array
      , empty : ats.single_array
      , every : ats.val_array(z.odd)
      , filter : ats.val_array(z.odd)
      , find : ats.val_array(4)
      , find_if : ats.val_array(z.even)
      , for_ : ats.array_val(z.true_)
      , group_by : ats.val_array(z.$2)
      , in_ : function (v, i) { return [i, z.iota(v)]; }
      , inner_product : function (v) { return [z.iota(v), z.iota(v)]; }
      , is_a : function (v)
        {
            var vals = [0, undefined, null, 'x', 42, /^$/, Boolean(1), {}, 9.0, []];
            return [vals[v], Number];
        }
      , join : ats.array_val(', ')
      , keys : ats.single_array
      , map : ats.val_array(String)
      , member : function (v) { return [new Array(v), 'length']; }
      , product : ats.single_array
      , push : ats.single_array
      , reduce : function (v) { return [z.plus, z.iota(v), '']; }
      , reverse : ats.single_array
      , size : ats.single_array
      , slice : function (v) { return [z.iota(v), 0, Math.ceil(v / 2)]; }
      , some : ats.val_array(z.odd)
      , sorted : ats.single_array
      , split : function () { return ["abc,def,ghi,jkl"]; }
      , sum : ats.single_array
      , take_while : ats.val_array(z.odd)
      , unique : ats.val_array(z.itself)
      , while_ : function (v) { return [z.dec(5), z.false_]; }
      , zip : function (v) { return [[z.iota(v), z.iota(v)]]; }
    }; // }}}

    var avg = function (arr) // {{{
    {
        return z.sum(arr) / arr.length;
    } // }}}
    var time = function (f, args) // {{{
    {
        var rv;
        var start = new Date();
        rv = f.apply(this, args);
        return new Date() - start;
    } // }}}
    var __timex = function (cnt, fname, args) // {{{
    {
        var f = this[fname];
        var durs = [];
        for (var i = 0; i < cnt; ++i) {
            durs.push(time.call(this, f, args(i % 10)));
        }
        return {
            fun: fname
          , tot: z.sum(durs)
          , avg: avg(durs)
          , max: z.reduce(z.max, durs, 0)
          , min: z.reduce(z.min, durs, 0)
        };
    } // }}}
    var aggregate = function (durs) // {{{
    {
        return {
            fun: 'TOTAL'
          , tot: z.sum(z.map(z.select('tot'), durs))
          , avg: avg(z.map(z.select('avg'), durs))
          , max: z.reduce(z.max, z.map(z.select('max'), durs), 0)
          , min: z.reduce(z.min, z.map(z.select('min'), durs), 0)
        };
    } // }}}
    var str_repeat = function (str, cnt) // {{{
    {
        var rv = '';
        for (var i = 0; i < cnt; ++i) {
            rv += str;
        }
        return rv;
    } // }}}
    var msfmt = function (ms) // {{{
    {
        return ms.toFixed(3) + "ms";
    } // }}}
    var field = function (v, len) // {{{
    {
        return str_repeat(' ', len - v.length) + v;
    } // }}}
    var output = function (dur, wall) // {{{
    {
        var fun = dur.fun;
        var tot = msfmt(dur.tot);
        var avg = msfmt(dur.avg);
        var max = msfmt(dur.max);
        var min = msfmt(dur.min);
        var ovh = msfmt(wall - dur.tot);
        print(
            fun + ":" + str_repeat(' ', 20 - fun.length)
          + field(tot, 12)
          + field(avg, 10)
          + field(max, 10)
          + field(min, 10)
          + field(ovh, 11)
        );
    } // }}}
    var __times = function (cnt, args, sex, durs, q) // {{{
    {
        if ('skip' == args[sex]) {
            return;
        }
        var start = new Date();
        var dur = __timex.call(
            this
          , cnt
          , sex
          , args[sex] || args.default_
        );
        if (!q) {
            output(dur, new Date - start);
        }
        durs.push(dur);
    } // }}}

    var times = z.curry(z.curry(__times, TIMES), Args);

    $$IMPORT_ZETA_INTO$$(this, { import_internals: true });

    times.call(this, 'argv', [], 1);
    var start = new Date();
    var durs = times_js.call(this, times, arguments);
    output(aggregate(durs), new Date - start);
}

// vim: et sts=4 sw=4 fdm=marker cms=\ //\ %s
