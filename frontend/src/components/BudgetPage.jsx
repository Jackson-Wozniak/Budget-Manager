import { useState } from "react";
import '../styles/BudgetPage.css';
import { getMonthlyBudget } from "../utils/MonthlyBudgetApi";
import { useNavigate } from 'react-router-dom';
import SpendingCategory from "./SpendingCategory";
import ExpenseCreator from "./ExpenseCreator";

function BudgetPage() {
    const [month, setMonth] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState({});
    const [expenseCreatorVisible, setExpenseCreatorVisible] = useState(false);

    const navigate = useNavigate();

    function setNewMonth(month){
        getMonthlyBudget(month).then((data) => {
            if(data === "User has not created budget for this month"){
                navigate("create-budget");
                return;
            }
            console.log(data);
            console.log(data.spendingCategories);
            setMonthlyBudget(data);
            setMonth(month);
        });
    }


    if(month === null){
        return(
            <div>
                <h1>Choose your desired budget month</h1>
                <input type="month" id="start" name="start" min="2020-08" onChange={(e) => setNewMonth(e.target.value)} />
            </div>
        );
    }

    let expenseCreatorWindow;
    if(expenseCreatorVisible){
        expenseCreatorWindow = <ExpenseCreator spendingCategories={monthlyBudget.spendingCategories} setVisible={setExpenseCreatorVisible}/>;
    }

    return ( 
        <div className="budget-container">
            <input type="month" id="month-display" min="2020-08" defaultValue={month} onChange={(e) => setNewMonth(e.target.value)} />

            <h3>$ {monthlyBudget.monthlyGoal - monthlyBudget.moneySpent} to spend</h3>
            <progress max={monthlyBudget.monthlyGoal} value={monthlyBudget.moneySpent} id="monthly-budget-progress"/>

            <h5>$ {monthlyBudget.moneySpent} spent | $ {monthlyBudget.monthlyGoal} goal</h5>

            {expenseCreatorWindow}

            <hr />
            <div className="creation-buttons">
                <button onClick={() => setExpenseCreatorVisible(true)}>Add Expense</button>
                <button>Add Income</button>
                <button>Add Spending Category</button>
            </div>

            <hr />
            <h1>Spending Categories</h1>
            {monthlyBudget.spendingCategories.map((spendingCategory, index) => {
                return <SpendingCategory key={index} category={spendingCategory} />
            })}
        </div>
    );
}

export default BudgetPage;