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
            <input type="month" id="month-display" min="2020-08" defaultValue={month} onChange={(e) => setNewMonth(e.target.value)} />

            <h1>$ {budget.monthlyGoal - budget.moneySpent} to spend</h1>
            <progress max={budget.monthlyGoal} value={budget.moneySpent} id="monthly-budget-progress"/>

            <h5>$ {budget.moneySpent} spent | $ {budget.monthlyGoal} goal</h5>

            {creatorWindow}

            <hr />
            <div className="creation-buttons">
                <button onClick={() => setExpenseCreatorVisible(true)}>+ Expense</button>
                <button onClick={() => setIncomeCreatorVisible(true)}>+ Income</button>
                <button onClick={() => setCategoryCreatorVisible(true)}>+ Spending Category</button>
            </div>
        </div>
    );
}

export default OverviewWindow;