import { connect } from 'react-redux';

import Presentational from './Presentational';
import { getCv } from '../../../../redux/modules/cvs/actions/read';
import { createCv } from '../../../../redux/modules/cvs/actions/create';
import { updateCv, updateProfileImage } from '../../../../redux/modules/cvs/actions/update';
import { clearState } from '../../../../utils/actions';

const mapStateToProps = (state) => ({
  cvs: state.cvs._data 
    ? state.cvs._data.cvs 
    : undefined,
  isReadingCv: state.cvs.isReading,
  error: state.cvs.error,
});

const mapDispatchToProps = (dispatch) => ({
  getCv: (params) => dispatch(getCv(params)),
  createCv: (params) => dispatch(createCv(params)),
  updateCv: (params) => dispatch(updateCv(params)),
  updateProfileImage: (params) => dispatch(updateProfileImage(params)),
  clearState: () => clearState(dispatch, 'cvs'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
