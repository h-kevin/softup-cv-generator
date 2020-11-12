import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import i18n from 'i18next';

import routes from '../../../constants/routes';
import classes from './Styles.module.scss';

const NotFound = () => (
  <section className={classes.Container}>
    <FontAwesomeIcon icon={faFrown} className={classes.Icon} />
    <h1>404</h1>
    <h3>{i18n.t('notFound.pageNotFound')}</h3>
    <Link to={routes.APP.USERS}>{i18n.t('notFound.goBack')}</Link>
  </section>
);

export default NotFound;
