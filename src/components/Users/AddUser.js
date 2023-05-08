import { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username" onChange={usernameChangeHandler}>
          Username
        </label>
        <input id="username" type="text" />
        <label htmlFor="age" onChange={ageChangeHandler}>
          Age (Years)
        </label>
        <input id="age" type="number" />
        <Button type="submt">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
