import { useState, useEffect } from 'react';

import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header';
import GoalList from './components/GoalList';
import EmailInput from './components/EmailInput';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
import AuthContect from './components/store/auth-context';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Pager',
    amount: 94.12,
    date: new Date(2021, 2, 12),
  },
  { id: 'e2', title: 'TV', amount: 799.99, date: new Date(2021, 7, 14) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'desk',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const [usersList, setUsersList] = useState([]);
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [courseGoals, setCourseGoals] = useState([
    { text: 'Do all exercises!', id: 'g1' },
    { text: 'Finish the course!', id: 'g2' },
  ]);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = (email, password) => {
    setIsLoggedIn(false);
  };

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  const addGoalHandler = (enteredText) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({ text: enteredText, id: Math.random().toString() });
      return updatedGoals;
    });
  };

  const deleteItemHandler = (goalId) => {
    setCourseGoals((prevGoals) => {
      const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
      return updatedGoals;
    });
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <AuthContect.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
    >
      <MainHeader />
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
      <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">{content}</section>

      <Header />
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
      <EmailInput />
      <GoalList />
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </AuthContect.Provider>
  );
}

export default App;
