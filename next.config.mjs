// import { withImages } from 'next-images';

// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };

// export default withImages(nextConfig);
import withImages from 'next-images';

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default withImages(nextConfig);

