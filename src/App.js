import './App.css';
import Header from './components/Header';
import GoalList from './components/GoalList';
import EmailInput from './components/EmailInput';
import ExpenseItem from './components/ExpenseItem';

function App() {
  return (
    <>
      <Header />
      <EmailInput />
      <GoalList />
      <ExpenseItem />
    </>
  );
}

export default App;
