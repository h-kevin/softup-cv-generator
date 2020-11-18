import React from 'react';
import { 
  Switch, 
  Route, 
  Redirect,
} from 'react-router-dom';

import NotFound from '../../404/Presentational';
import Management from '../Management/Container';
import FormPage from '../FormPage/Container';
import routes from '../../../../constants/routes';

const Presentational = () => (
  <Switch>
    <Switch>
      <Route 
        exact
        path={routes.APP.MANAGEMENT}
        component={Management}
      />
      <Route
        exact
        path={routes.APP.FORM_PAGE}
        component={FormPage}
      />
      <Route 
        exact 
        path={routes.APP.INDEX}
      >
        <Redirect to={routes.APP.MANAGEMENT} />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  </Switch>
);

export default Presentational;
