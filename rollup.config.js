import nodeResolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json" with { type: "json" };
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const banner = `
/*!
 * Lite UI ${pkg.version} (${pkg.homepage})
 * Copyright 2025 ${pkg.author}
 * Licensed under ${pkg.license}
 */
`.trim();

export default {
    input: "src/main.ts",
    output: [
        {
            banner,
            file: "dist/liteui.min.js",
            format: "umd",
            name: "liteui",
        },
        {
            banner,
            file: "dist/liteui.min.mjs",
            format: "es",
        },
    ],
    plugins: [
        nodeResolve(),
        typescript({
            declaration: true,
            declarationDir: "dist/types",
            tsconfig: "./tsconfig.json",
        }),
        terser({
            format: {
                comments: /yuanzui-cf/,
            },
        }),
    ],
};
