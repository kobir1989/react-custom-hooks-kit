import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

// eslint-disable-next-line no-undef
const devMode = process.env.NODE_ENV === 'development'

export default {
  input: 'src/index.ts', // TypeScript entry file
  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: devMode ? 'inline' : false
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(), // TypeScript plugin
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Transpile TypeScript and JavaScript
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: ['@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    terser({
      ecma: 2020,
      module: true,
      compress: {
        toplevel: true,
        unsafe_arrows: true,
        drop_console: !devMode,
        drop_debugger: !devMode
      },
      output: { quote_style: 1 }
    })
  ],
  external: ['react']
}
