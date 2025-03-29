import { type FormEvent, useRef } from "react";


interface NewGoalProps {
    onAdd: ( text: string, summary: string ) => void;
}

export default function createGoal( {onAdd}: NewGoalProps ){

    const goalRef = useRef<HTMLInputElement>(null); // typically we use null to first val, htmlinputelement makes this its null for now but it takes from the html input element
    const summaryRef = useRef<HTMLInputElement>(null);// but if we give null value, down there value has been never for that we will use generic type

    function handleSubmit( event: FormEvent<HTMLFormElement> ) { // FormEvent is react type to define and we should clarify the FormEvent is that HTMLFormElement
        event.preventDefault();
        // const [] = useState(); this is normal way and we have another way to do this with useRef

        const enteredGoal = goalRef.current!.value;
        const enteredSummary = goalRef.current!.value;

        onAdd( enteredGoal, enteredSummary );
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="goal">Your Goal</label>
                <input type="text" id="goal" ref={goalRef} />
            </p>
            <p>
                <label htmlFor="summary">Short summary</label>
                <input type="text" id="summary" ref={summaryRef} />
            </p>
            <p>
                <button>Add goal</button>
            </p>
        </form>
    );
}