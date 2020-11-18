import { connect } from 'react-redux';

import Presentational from './Presentational';

import { getCvs } from '../../../../redux/modules/cvs/actions/read';
import { generateDocx } from '../../../../redux/modules/cvs/actions/generateDocx';
import { deleteCv } from '../../../../redux/modules/cvs/actions/delete';
import { clearState } from '../../../../utils/actions';

const mapStateToProps = (state) => ({
  cvs: state.cvs._data 
    ? state.cvs._data.cvs 
    : null,
  isReadingCvs: state.cvs.isReading,
  isDeletingCv: state.cvs.isDeleting,
  error: state.cvs.error,
});

const mapDispatchToProps = (dispatch) => ({
  getCvs: () => dispatch(getCvs()),
  generateDocx: (params) => dispatch(generateDocx(params)),
  deleteCv: (params) => dispatch(deleteCv(params)),
  clearState: () => clearState(dispatch, 'cvs'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
