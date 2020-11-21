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
      required: false,
    }],
    databases: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    backendFrameworks: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    frontendFrameworks: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    operationsAndInfrastructure: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    integrationAndDeployment: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    testing: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    thirdParty: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    agile: [{
      type: Mongoose.Schema.Types.String,
      required: false,
    }],
    other: [{
      type: Mongoose.Schema.Types.String,
      required: false,
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
        required: false,
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
      required: false,
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
      required: false,
    }],
    period: {
      startDate: {
        type: Mongoose.Schema.Types.Date,
        required: true,
      },
      endDate: {
        type: Mongoose.Schema.Types.Date,
        required: false,
      },
    },
  }],
  profileImage: {
    type: Mongoose.Schema.Types.Buffer,
  }
});

export default Mongoose.model(dbTables.CVS, schema);
