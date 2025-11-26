import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// 库模式构建配置
export default defineConfig({
    plugins: [
        react(),
        dts({
            entryRoot: 'src',
            outDir: 'dist',
            exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx', 'src/App.tsx', 'src/main.tsx', 'src/Router.tsx', 'src/pages/**/*', 'src/docs/**/*'],
            tsconfigPath: './tsconfig.app.json'
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'MatherUI',
            fileName: (format) => `matherui.${format === 'es' ? 'js' : 'cjs'}`
        },
        // 复制样式文件
        copyPublicDir: false,
        rollupOptions: {
            // 外部化依赖，不打包进库
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'lucide-react',
                '@radix-ui/react-accordion',
                '@radix-ui/react-avatar',
                '@radix-ui/react-checkbox',
                '@radix-ui/react-dialog',
                '@radix-ui/react-dropdown-menu',
                '@radix-ui/react-popover',
                '@radix-ui/react-progress',
                '@radix-ui/react-radio-group',
                '@radix-ui/react-select',
                '@radix-ui/react-slider',
                '@radix-ui/react-switch',
                '@radix-ui/react-tabs',
                '@radix-ui/react-tooltip'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'react/jsx-runtime'
                },
                // 确保 CSS 文件名为 style.css
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'style.css'
                    return assetInfo.name || 'assets/[name]-[hash][extname]'
                }
            }
        },
        cssCodeSplit: false,
        sourcemap: true,
        // 清空输出目录
        emptyOutDir: true
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
