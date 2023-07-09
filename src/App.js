import { useState, useContext } from "react";

import "./App.css";
import MainHeader from "./components/MainHeader/MainHeader";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header";
import Header2 from "./components/Header/Header2";
import GoalList from "./components/GoalList";
import EmailInput from "./components/EmailInput";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import CourseGoalList from "./components/CourseGoals/CourseGoalList/CourseGoalList";
import CourseInput from "./components/CourseGoals/CourseInput/CourseInput";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";
import AuthContect from "./store/auth-context";
import Concepts from "./components/Concepts/Concepts";

import componentsImage from "./assets/images/components.png";
import stateImage from "./assets/images/state.png";
import eventsImage from "./assets/images/events.png";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

const concepts = [
  {
    title: "Components",
    image: componentsImage,
    description:
      "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Components can receive data via props, and they can render dynamic output using JSX.",
  },
  {
    title: "State",
    image: stateImage,
    description:
      "State is data that may change over time. As it changes, the UI should be update to reflext the updated data. Each component can maintain its own state and mulitple components can share state.",
  },
  {
    title: "Events",
    image: eventsImage,
    description:
      "Event handlers are added via props to (built-in) components. You pass functions as values to such event handlers to control which functions gets executed for which event.",
  },
];

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Pager",
    amount: 94.12,
    date: new Date(2021, 2, 12),
  },
  { id: "e2", title: "TV", amount: 799.99, date: new Date(2021, 7, 14) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "desk",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function App() {
  const ctx = useContext(AuthContect);

  const [usersList, setUsersList] = useState([]);
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [courseGoals, setCourseGoals] = useState([
    { text: "Do all exercises!", id: "g1" },
    { text: "Finish the course!", id: "g2" },
  ]);
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
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
    <p style={{ textAlign: "center" }}>No goals found. Maybe add one?</p>
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

  const yearlyData = [];

  if (userInput) {
    let currentSavings = userInput["current-savings"];
    const yearlyContribution = userInput["yearly-contribution"];
    const expectedReturn = userInput["expected-return"] / 100;
    const duration = userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <>
      <MainHeader />
      {!ctx.isLoggedIn && <Login />}
      {ctx.ExpensesisLoggedIn && <Home />}
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
      <Header2 />
      <ul id="concepts">
        <Concepts
          image={concepts[0].image}
          title={concepts[0].title}
          description={concepts[0].description}
        />
        <Concepts
          image={concepts[1].image}
          title={concepts[1].title}
          description={concepts[1].description}
        />
        <Concepts
          image={concepts[2].image}
          title={concepts[2].title}
          description={concepts[2].description}
        />
      </ul>
      <div>
        <Header2 />

        <UserInput onCalculate={calculateHandler} />

        {!userInput && (
          <p style={{ textAlign: "center" }}>No investment calculated yet.</p>
        )}
        {userInput && (
          <ResultsTable
            data={yearlyData}
            initialInvestment={userInput["current-savings"]}
          />
        )}
      </div>
    </>
  );
}

export default App;
