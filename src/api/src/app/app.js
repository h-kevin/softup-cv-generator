import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';

import routes from './routes';
import errorHandler from './utils/error_middleware';

const app = Express();

// Express app config
app.use(BodyParser.json({ limit: '10mb' }));
app.use(BodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(Cors());
app.use("/api/v1", routes);
app.use(errorHandler);

// Catch all unhandled errors and log them
process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  errorHandler(error);
});

export default app;