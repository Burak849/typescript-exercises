import Header from "./components/Headers";
import localImg from './assets/goals.jpg'
import CourseGoals from "./components/CourseGoals";
import NewGoals from "./components/NewGoals";
import { useState } from "react";

function App() {
  
  const [ goals, setGoals ] = useState([
    { 
      id: 1,
      title: 'Learn TS',
      description: 'Learn TS from the course'
    },
    { 
      id: 2,
      title: 'Learn React',
      description: 'Learn React from the course'
    },
    { 
      id: 3,
      title: 'Practice',
      description: 'Practice working with TS'
    }
  ]); // to update this 

  function handleDeleteGoal( id: number ){
    setGoals( (prevGoals) => prevGoals.filter( g => g.id !== id ) ); // this is how to delete the goal
    // we passed a function to setGoals
  }

  function handleAddGoal ( text: string, summary: string ){
    setGoals( prevGoals => prevGoals.concat( { id: Math.random(), title: text, description: summary } ) ); // concat add goals and copy it
  }

  return (
    <>
     <main>
      <Header image={ {src: localImg, alt: 'Some text'} }>
        <h1>Course Goals</h1>
      </Header>
      {/* <CourseGoals goals = { [ 
      { 
        id: 1,
        title: 'Learn TS',
        description: 'Learn TS from the course'
      },
      { 
        id: 2,
        title: 'Learn React',
        description: 'Learn React from the course'
      },
      { 
        id: 3,
        title: 'Practice',
        description: 'Practice working with TS'
      }
      ]} />  WE CAN USE ANOTHER WAY TO DO THAT */}
      
    <NewGoals onAdd={handleAddGoal} />
    <CourseGoals goals = {goals} onDelete={handleDeleteGoal}/> 

     </main>
    </>
  );
}

export default App
