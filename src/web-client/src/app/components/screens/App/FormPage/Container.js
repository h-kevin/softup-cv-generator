import { connect } from 'react-redux';
import queryString from 'query-string';

import Presentational from './Presentational';
import { getCv } from '../../../../redux/modules/cvs/actions/read';
import { createCv } from '../../../../redux/modules/cvs/actions/create';
import { updateCv, updateProfileImage } from '../../../../redux/modules/cvs/actions/update';
import { clearState } from '../../../../utils/actions';
import { modifyApiRequest, modifyApiResponse } from './helpers';

const mapStateToProps = (state, ownProps) => {
  const cvs = state.cvs._data 
    ? state.cvs._data.cvs
    : undefined;

  const queryParams = queryString.parse(ownProps.location?.search);
  const cv = cvs?.find((item) => item._id === queryParams.id);

  return ({
    cv: modifyApiResponse(cv),
    isReadingCv: state.cvs.isReading,
    error: state.cvs.error,
  });
};

const mapDispatchToProps = (dispatch) => ({
  getCv: (params) => dispatch(getCv(params)),
  createCv: (params) => dispatch(modifyApiRequest(createCv(params))),
  updateCv: (params) => dispatch(modifyApiRequest(updateCv(params))),
  updateProfileImage: (params) => dispatch(updateProfileImage(params)),
  clearState: () => clearState(dispatch, 'cvs'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Presentational);
