import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    babel({
      extensions: ['tsx', 'ts', 'js']
    }),
    typescript({
      abortOnError: false
    })
  ],
  external: ['react']
}
