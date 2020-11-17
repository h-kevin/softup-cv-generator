import { connect } from 'react-redux';

import Presentational from './Presentational';

import { clearState } from '../../../../utils/actions';

const mapStateToProps = () => ({
  // cvs: state.cvs._data 
  //   ? state.cvs._data.cvs 
  //   : null,
  // isReadingCvs: state.cvs.isReading,
  // error: state.cvs.error,
});

const mapDispatchToProps = (dispatch) => ({
  clearState: () => clearState(dispatch, 'users'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
