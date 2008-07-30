function output(file)
{
    printf("// FILE: %s\n", file);
    while ((getline < file) > 0) {
        printf("    %s\n", $0);
    }
    close(file);
}

function fillScope(symtab,	i)
{
    for (i = 0; (getline < symtab) > 0; ++i) {
        printf("    $$IMPORT_SCOPE$$.%s = %s;\n", $2, $2);
    }
    close(symtab);
}

BEGIN {
    printf("// === GENERATED FILE, DO NOT EDIT ===\n\n");

    printf("function $$%s$$($$IMPORT_SCOPE$$)\n{\n", IMPORTER);
    for (i = 1; i < ARGC; ++i) {
        output(ARGV[i]);
    }
    fillScope(SYMBOLS);
    printf("};\n");
}
