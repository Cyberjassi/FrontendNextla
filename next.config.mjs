
import withImages from 'next-images';

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },  env: {
    BASE_URL: process.env.BASE_URL,
  },

};

export default withImages(nextConfig);

