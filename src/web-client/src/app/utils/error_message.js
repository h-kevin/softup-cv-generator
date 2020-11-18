export default (errorObject) => {
  let err = '';
  
  try {
    if (errorObject?.response?.data?.message) {
      err = errorObject?.response?.data?.message;

      if (errorObject?.response?.data?.payload?.message) {
        err = `${err}: ${errorObject?.response?.data?.payload?.message}`;
      } else if (errorObject?.response?.data?.payload?.name) {
        err = `${err}: ${errorObject?.response?.data?.payload?.name}`;
      }
    } else if (errorObject?.response?.status === 400 && errorObject?.response?.data?.details) {
      const missingParams = errorObject?.response?.data?.details?.map((item) => item.path[0]);

      err = `Bad Request - Following fields are missing or invalid: ${missingParams}`;
    } else if (errorObject?.response === undefined) {
      err = 'Network Error';
    } else {
      err = errorObject?.response?.data;
    } 

    return err !== '' ? err : 'Internal Error';
  } catch (e) {
    return err !== '' ? err : 'Internal Error';
  }
};
