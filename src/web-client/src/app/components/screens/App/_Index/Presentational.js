import React from 'react';
import { 
  Switch, 
  Route, 
} from 'react-router-dom';

import NotFound from '../../404/Presentational';
import routes from '../../../../constants/routes';

const Presentational = () => (
  <Switch>
    <Switch>
      <Route 
        exact 
        path={routes.APP.INDEX}
        component={NotFound}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Switch>
);

export default Presentational;
