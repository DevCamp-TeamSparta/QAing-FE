/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['static.qaing.co', 'lh3.googleusercontent.com'],
  },
  webpack: config => {
    config.externals = [...config.externals, { canvas: 'canvas' }] // required to make Konva & react-konva work
    return config
  },
}

module.exports = nextConfig
