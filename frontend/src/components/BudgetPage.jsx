import { useState } from "react";
import '../styles/BudgetPage.css';
import { getMonthlyBudget } from "../utils/MonthlyBudgetApi";
import { useNavigate } from 'react-router-dom';
import SpendingCategory from "./SpendingCategory";

function BudgetPage() {
    const [month, setMonth] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState({});

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

    return ( 
        <div className="budget-container">
            <input type="month" id="month-display" min="2020-08" defaultValue={month} onChange={(e) => setNewMonth(e.target.value)} />

            <h3>$ {monthlyBudget.monthlyGoal - monthlyBudget.moneySpent} to spend</h3>
            <progress max={monthlyBudget.monthlyGoal} value={monthlyBudget.moneySpent} id="monthly-budget-progress"/>

            <h5>$ {monthlyBudget.moneySpent} spent | $ {monthlyBudget.monthlyGoal} goal</h5>

            <h1>Spending Categories</h1>
            {monthlyBudget.spendingCategories.map((spendingCategory, index) => {
                return <SpendingCategory key={index} category={spendingCategory} />
            })}
        </div>
    );
}

export default BudgetPage;