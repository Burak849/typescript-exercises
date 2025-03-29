import { type FC } from "react"; // if we use FC we dont need this 


type Goal = {
    id: number;
    title: string;
    description: string;
};

interface CourseGoalsProps{
    goals: Goal[];
    onDelete: ( id: number ) => void; // this is a function 
}

// FC stands for function type
// export default function CourseGoals ( {goals}: CourseGoals Props ){};    this is the other way and perfectly fine o use
 
const CourseGoals: FC<CourseGoalsProps> = ( {goals, onDelete} ) =>
    {
    return (
        <ul>
            {goals.map( (goal) => (
                <li key = {goal.id}>
                    <article>
                        <div>
                            <h2>{goal.title}</h2>
                            <p>{goal.description}</p>
                        </div>
                        <button onClick={() => onDelete(goal.id)}>Delete</button>
                    </article>
                </li>
            ) )}
        </ul>
    );
}
export default CourseGoals;