import prodConfig from './production';
import devConfig from './development';

const config = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    default:
      return devConfig;
  }
};

export default config();
