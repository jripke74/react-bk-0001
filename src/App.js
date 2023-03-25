import './App.css';
import Header from './components/Header';
import GoalList from './components/GoalList';
import EmailInput from './components/EmailInput';
import Expenses from './components/Expenses/Expenses';

function App() {
  const expenses = [
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

  return (
    <>
      <Header />
      <EmailInput />
      <GoalList />
      <Expenses items={expenses} />
    </>
  );
}

export default App;
