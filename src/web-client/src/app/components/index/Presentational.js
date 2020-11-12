import React from 'react';
import { 
  Route, 
  Switch, 
  Redirect,
} from 'react-router-dom';

import routes from '../../constants/routes';

import AppIndex from '../screens/App/_Index/Container';
import NotFound from '../screens/404/Presentational';

const Presentational = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to={routes.APP.INDEX} />
    </Route>
    <Route path={`${routes.APP.INDEX}`} component={AppIndex} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Presentational;
