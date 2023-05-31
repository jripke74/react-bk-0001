import React, { useContext } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Home.module.css';
import AuthContect from '../../store/auth-context';

const Home = () => {
  const authCtx = useContext(AuthContect);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
