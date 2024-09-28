// vitest.config.ts or vitest.config.js
import { defineConfig } from 'vitest/config'
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Resolve @ to the src directory
        },
    },
    test: {
        globals: true, // Enables globals like `describe` and `it`
        environment: 'jsdom',  // Use jsdom to mock browser APIs
        setupFiles: ['./vitest.setup.ts'], // Load the setup file globally
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html', 'lcov'],  // Report formats to generate
            reportsDirectory: 'sonar',  // Directory to save coverage reports
            include: ['src/**/*.ts,src/**/*.tsx'],  // Files to include in coverage reports
            exclude: ['node_modules', 'dist'],  // Files/directories to exclude
        },
    },
})
