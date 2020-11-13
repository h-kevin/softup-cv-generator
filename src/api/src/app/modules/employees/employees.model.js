import Mongoose from 'mongoose';

import dbTables from '../../constants/db_tables';

const schema = new Mongoose.Schema({
  firstName: {
    type: Mongoose.Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Mongoose.Schema.Types.String,
    required: true,
  },
  role: {
    type: Mongoose.Schema.Types.String,
    required: true,
  },
  summary: {
    type: Mongoose.Schema.Types.String,
    required: true,
  },
  skills: {
    languages: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    databases: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    backendFrameworks: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    frontendFrameworks: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
  },
});

export default Mongoose.model(dbTables.EMPLOYEES, schema);