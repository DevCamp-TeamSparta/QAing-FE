/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's3-qaing-test.s3.ap-northeast-2.amazonaws.com',
      'static.qaing.co',
    ],
  },
}

module.exports = nextConfig
