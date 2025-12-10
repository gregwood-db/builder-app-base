/** @type {import('next').NextConfig} */
const packageJsonVersion = (() => {
  try {
    // Import at build time only; not bundled to client
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require('./package.json')
    return pkg.version || ''
  } catch {
    return ''
  }
})()

const nextConfig = {
  output: 'export',
  distDir: 'backend/static',
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  // When running in FastAPI, we'll serve from root path
  basePath: '',
  // Disable server-side features since we're exporting static files
  trailingSlash: true,
  typescript: {
    // Enforce type checking during build
    ignoreBuildErrors: false,
  },
  experimental: {
    // Skip static optimization to avoid React hook issues
    optimizeCss: false,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || packageJsonVersion,
  },
};

export default nextConfig;
