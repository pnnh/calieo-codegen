import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
let nextConfig = {
    basePath: process.env.BASE_PATH || '',
    output: 'standalone',
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    experimental: {
        esmExternals: true,
    },
    compress: process.env.ENV === 'production',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        silenceDeprecations: ['legacy-js-api'],
    }
}

export default nextConfig
