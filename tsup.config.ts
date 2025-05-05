import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src'],
    format: ["esm"],
    outDir: "build",
    splitting: false,
    sourcemap: true,
    clean: true
})