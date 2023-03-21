import GoalItem from './GoalItem';

function GoalList() {
  return (
    <>
      <ul>
        <GoalItem title="Complete a chapter a day">
          To become a better fullstack developer
        </GoalItem>
        <GoalItem title="Learn to do chalenges on own">
          to learn more
        </GoalItem>
        <GoalItem title="Complete book by June 28th, 2023">
          A good goal to have
        </GoalItem>
      </ul>
    </>
  );
}

export default GoalList;
