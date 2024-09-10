import {nodeResolve} from '@rollup/plugin-node-resolve'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import replace from '@rollup/plugin-replace';
import copy from "rollup-plugin-copy";
import commonjs from '@rollup/plugin-commonjs'
import path from 'path'
import {fileURLToPath} from 'url';
import alias from "@rollup/plugin-alias";
import preserveDirectives from 'rollup-preserve-directives'
import cleaner from 'rollup-plugin-cleaner';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export default {
    input: 'src/index.tsx',
    output: {
        file: 'dist/index.js',
        format: 'iife',
        sourcemap: true,
        assetFileNames: '[name][extname]'
    },
    external: [],
    plugins: [
        commonjs(),
        typescript({
            tsconfig: 'tsconfig.json',
            sourceMap: true,
            outputToFilesystem: true,
        }),
        nodeResolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            moduleDirectories: ['node_modules', 'src'],
            preferBuiltins: false
        }),
        alias({
            entries: [
                {find: '@', replacement: path.resolve(__dirname, 'src')},
            ]
        }),
        json(),
        copy({
            targets: [
                {src: 'public/*', dest: 'dist'},
            ]
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
            __buildDate__: () => JSON.stringify(new Date()),
            __buildVersion: 15
        }),
        cleaner({
            targets: [
                'dist'
            ]
        }),
        preserveDirectives(),
        strip({
            include: ['**/*.(js|mjs|ts|tsx)'],
            debugger: true,
            functions: ['console.log', 'console.debug'],
            sourceMap: true
        }),
        terser()
    ]
}

