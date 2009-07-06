BEGIN {
    printf("var times_js = function (times)\n{\n");
}
("function" == $1) {
    printf("    times.call(this, '%s');\n", $2);
}
END {
    printf("}\n");
}
