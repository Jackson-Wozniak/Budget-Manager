import '../../styles/overview/OverviewWindow.css';
import { useState } from "react";
import { createSpendingCategory } from "../../utils/MonthlyBudgetApi";
import { createExpense } from "../../utils/MonthlyBudgetApi";
import ExpenseCreator from "../creators/ExpenseCreator";
import IncomeCreator from "../creators/IncomeCreator";
import SpendingCategoryCreator from "../creators/SpendingCategoryCreator";

/*
CONTAINS:
    - month of budget, button to change month
    - $ remaining in budget
    - Expense, Income, Spending Category creation buttons
    - $ goal for this month
    - Progress bar, including the $ spend/ $ goal
*/
function OverviewWindow(props) {

    let month = props.month;
    let budget = props.budget;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    let sum = budget.monthlyGoal - budget.moneySpent;
    let totalToSpend = (sum >= 0) ?  (formatter.format(sum) + " remaining") : (formatter.format(sum * -1) + " overspent");

    const [expenseCreatorVisible, setExpenseCreatorVisible] = useState(false);
    const [incomeCreatorVisible, setIncomeCreatorVisible] = useState(false);
    const [categoryCreatorVisible, setCategoryCreatorVisible] = useState(false);
    


    function setNewMonth(month){
        props.setNewMonth(month);
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
            setNewMonth(month);
            setExpenseCreatorVisible(false);
        });
    }

    let creatorWindow;
    if(expenseCreatorVisible){
        creatorWindow = <ExpenseCreator spendingCategories={budget.spendingCategories} createNewExpense={createNewExpense} setVisible={setExpenseCreatorVisible}/>;
    }else if(incomeCreatorVisible){
        creatorWindow = <IncomeCreator setVisible={setIncomeCreatorVisible}/>
    }else if(categoryCreatorVisible){
        creatorWindow = <SpendingCategoryCreator setVisible={setCategoryCreatorVisible} createNewCategory={createNewCategory}/>
    }

    return ( 
        <div className="overview-container">
            {creatorWindow}
            <div className="overview-date-container">
                <input type="month" id="month-display" min="2020-08" defaultValue={month} onChange={(e) => setNewMonth(e.target.value)} />
            </div>
            <div className="overview-stats-container">
                <h1 id="total-to-spend">{totalToSpend}</h1>
                <h5 id="goal-display">out of your {formatter.format(budget.monthlyGoal)} goal</h5>

                <div className="overview-progress-bar-container">
                    <progress max={budget.monthlyGoal} value={budget.moneySpent} className={("overview-progress-bar ") + ((sum > 0) ? "meeting" : (sum === 0) ? "at" : "past")}/>
                    <span>{formatter.format(budget.moneySpent)}  /  {formatter.format(budget.monthlyGoal)}</span>
                </div>
            </div>
            <div className="overview-buttons-container">
                <button onClick={() => setExpenseCreatorVisible(true)} className="creator-buttons">+ New Expense</button>
                <button onClick={() => setIncomeCreatorVisible(true)} className="creator-buttons">+ New Income</button>
                <button onClick={() => setCategoryCreatorVisible(true)} className="creator-buttons">+ New Spending Category</button>
            </div>
        </div>
    );
}

export default OverviewWindow;