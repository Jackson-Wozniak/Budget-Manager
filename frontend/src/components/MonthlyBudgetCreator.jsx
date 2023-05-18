import { createMonthlyBudget } from "../utils/MonthlyBudgetApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MonthlyBudgetCreator() {

    const [month, setMonth] = useState(null);
    const [spendingGoal, setSpendingGoal] = useState(0.0);
    const navigate = useNavigate();

    function createNewBudget(){
        if(month === null) return;
        if(spendingGoal === null || spendingGoal <= 0) return;

        let budgetCreated = createMonthlyBudget(month, spendingGoal);
        if(budgetCreated){
            navigate("/");
            return;
        }
        alert(budgetCreated);
    }

    function verifyAndSaveMonth(month){
        if(month === null) return;
        setMonth(month);
    }

    function verifyAndSaveGoal(goal){
        if(goal === null || goal <= 0) return;
        setSpendingGoal(goal);
    }

    return (  
        <form onSubmit={() => createNewBudget()}>
            <h1>Choose your desired budget month</h1>
            <input type="month" min="2020-08" onChange={(e) => verifyAndSaveMonth(e.target.value)} />

            <hr />

            <h1>Choose your spending goal this month</h1>
            <input type="number" onChange={(e) => verifyAndSaveGoal(e.target.value)}/>

            <hr />

            <input type="submit" value="Save Budget"/>
        </form>
    );
}

export default MonthlyBudgetCreator;