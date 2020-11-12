import prodConfig from './production';
import devConfig from './development';

let config = devConfig;

switch (process.env.NODE_ENV) {
  case 'development':
    config = devConfig;
    break;
  case 'production':
    config = prodConfig;
    break;
  default:
    config = devConfig;
}

export default config;