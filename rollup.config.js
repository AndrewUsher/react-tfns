import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const packageName = pkg.name.replace('@drewster', '')

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${packageName}.esm.js`,
      format: 'esm'
    },
    {
      file: `dist/${packageName}.cjs.js`,
      format: 'cjs'
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
