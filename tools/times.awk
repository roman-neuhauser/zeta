BEGIN {
    printf("var times_js = function (times, fs)\n{\n");
    printf("    var durs = [];\n");
    printf("    if (fs.length) {\n");
    printf("        for (var i = 0; i < fs.length; ++i) {\n");
    printf("            times.call(this, fs[i], durs);\n");
    printf("        }\n");
    printf("        return durs;\n");
    printf("    }\n");
}
("function" == $1) {
    printf("    times.call(this, '%s', durs);\n", $2);
}
END {
    printf("    return durs;\n");
    printf("}\n");
}
