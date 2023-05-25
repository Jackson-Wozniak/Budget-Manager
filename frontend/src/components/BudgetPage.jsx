import { useState } from "react";
import '../styles/BudgetPage.css';
import { createExpense, getMonthlyBudget } from "../utils/MonthlyBudgetApi";
import { useNavigate } from 'react-router-dom';
import SpendingCategory from "./SpendingCategory";
import ExpenseCreator from "./creators/ExpenseCreator";
import IncomeCreator from "./creators/IncomeCreator";
import SpendingCategoryCreator from "./creators/SpendingCategoryCreator";
import { createSpendingCategory } from "../utils/MonthlyBudgetApi";
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

function BudgetPage() {
    const [month, setMonth] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState({});
    const [expenseCreatorVisible, setExpenseCreatorVisible] = useState(false);
    const [incomeCreatorVisible, setIncomeCreatorVisible] = useState(false);
    const [categoryCreatorVisible, setCategoryCreatorVisible] = useState(false);

    const navigate = useNavigate();

    function setNewMonth(month){
        getMonthlyBudget(month).then((data) => {
            if(data === "User has not created budget for this month"){
                navigate("create-budget");
                return;
            }
            setMonthlyBudget(data);
            setMonth(month);
        });
    }

    function createNewCategory(e, name, goal){
        e.preventDefault();
        if(name === "" || goal === 0 || name === null || goal === null) return
        createSpendingCategory(name, month, goal).then(() => {
            setNewMonth(month);
            setCategoryCreatorVisible(false);
        });
    }

    function createNewExpense(desc, value, paymentMethod, categoryName){
        createExpense(desc, value, paymentMethod, categoryName, month).then((data) => {
            console.log(data);
            setNewMonth(month);
            setExpenseCreatorVisible(false);
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

    let creatorWindow;
    if(expenseCreatorVisible){
        creatorWindow = <ExpenseCreator spendingCategories={monthlyBudget.spendingCategories} createNewExpense={createNewExpense} setVisible={setExpenseCreatorVisible}/>;
    }else if(incomeCreatorVisible){
        creatorWindow = <IncomeCreator setVisible={setIncomeCreatorVisible}/>
    }else if(categoryCreatorVisible){
        creatorWindow = <SpendingCategoryCreator setVisible={setCategoryCreatorVisible} createNewCategory={createNewCategory}/>
    }

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: monthlyBudget.spendingCategories.map(category => category.name),
        datasets: [
          {
            label: '$ per category',
            data: monthlyBudget.spendingCategories.map(category => category.sumOfExpenses),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    let chartWindow;
    if(monthlyBudget.spendingCategories.length > 0){
        chartWindow = <div className="chart-container"><Chart type="doughnut" data={data} style={{width : "40vh" , height : "40vh"}}/></div>;
    }

    return ( 
        <div className="budget-container">
            <input type="month" id="month-display" min="2020-08" defaultValue={month} onChange={(e) => setNewMonth(e.target.value)} />

            <h1>$ {monthlyBudget.monthlyGoal - monthlyBudget.moneySpent} to spend</h1>
            <progress max={monthlyBudget.monthlyGoal} value={monthlyBudget.moneySpent} id="monthly-budget-progress"/>

            <h5>$ {monthlyBudget.moneySpent} spent | $ {monthlyBudget.monthlyGoal} goal</h5>

            {creatorWindow}
            {chartWindow}

            <hr />
            <div className="creation-buttons">
                <button onClick={() => setExpenseCreatorVisible(true)}>Add Expense</button>
                <button onClick={() => setIncomeCreatorVisible(true)}>Add Income</button>
                <button onClick={() => setCategoryCreatorVisible(true)}>Add Spending Category</button>
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