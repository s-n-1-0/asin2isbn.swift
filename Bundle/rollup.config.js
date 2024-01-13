import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.ts', // entry point
  output: {
    file: 'dist/asin2isbn.js',
    format: 'es',
  },
  plugins: [nodeResolve(),commonjs(),typescript()]
};
