/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "picsum.photos",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "upload.wikimedia.org",
      "via.placeholder.com",
    ],
  },
};

module.exports = nextConfig;
