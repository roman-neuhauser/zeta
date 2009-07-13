BEGIN {
    printf("var times_js = function (times, fs)\n{\n");
    printf("    if (fs.length) {\n");
    printf("        for (var i = 0; i < fs.length; ++i) {\n");
    printf("            times.call(this, fs[i]);\n");
    printf("        }\n");
    printf("        return;\n");
    printf("    }\n");
}
("function" == $1) {
    printf("    times.call(this, '%s');\n", $2);
}
END {
    printf("}\n");
}
