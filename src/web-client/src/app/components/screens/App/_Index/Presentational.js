import React from 'react';
import { 
  Switch, 
  Route, 
} from 'react-router-dom';

import NotFound from '../../404/Presentational';
// import routes from '../../../../constants/routes';

const Presentational = () => (
  <Switch>
    <Route
      path="*" 
      component={NotFound}
    />
  </Switch>
);

export default Presentational;
