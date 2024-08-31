// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const mochaPlugin = require("eslint-plugin-mocha");

module.exports = tseslint.config({
    files: ["**/*.ts"],
    extends: [
        eslint.configs.recommended,
        mochaPlugin.configs.flat.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
            },
        ],
        "mocha/no-exclusive-tests": "error",
        "mocha/no-mocha-arrows": "off",
        //#region  disabled because these seem incompatible with cypress
        "@typescript-eslint/no-require-imports": ["off"],
        "@typescript-eslint/no-namespace": ["off"],
        //#endregion
    },
});
