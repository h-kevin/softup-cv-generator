import Mongoose from 'mongoose';

import config from '../var';

Mongoose.set('useNewUrlParser', true);
Mongoose.set('useFindAndModify', false);
Mongoose.set('useUnifiedTopology', true);
Mongoose.set('useCreateIndex', true);

const init = () => {
  return new Promise((resolve, reject) => {
    Mongoose
      .connect(config.databaseUrl, {
        useNewUrlParser: true,
        poolSize: 20,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

export default init;