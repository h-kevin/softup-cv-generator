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
    operationsAndInfrastructure: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    integrationAndDeployment: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    testing: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    thirdParty: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    agile: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    other: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
  },
  spokenLanguages: [{
    language: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },
    level: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },
  }],
  projects: [{
    period: {
      startDate: {
        type: Mongoose.Schema.Types.Date,
        required: true,
      },
      endDate: {
        type: Mongoose.Schema.Types.Date,
        required: true,
      },
    },
    client: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },
    position: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },
    technologies: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    responsibilities: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },
  }],
  education: [{
    institution: {
      type: Mongoose.Schema.Types.String,
      required: true,
    },
    qualifications: [{
      type: Mongoose.Schema.Types.String,
      required: true,
    }],
    period: {
      startDate: {
        type: Mongoose.Schema.Types.Date,
        required: true,
      },
      endDate: {
        type: Mongoose.Schema.Types.Date,
        required: true,
      },
    },
  }],
  profileImage: {
    type: Mongoose.Schema.Types.Buffer,
  }
});

export default Mongoose.model(dbTables.CVS, schema);
