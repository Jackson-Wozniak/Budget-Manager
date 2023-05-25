import '../../styles/creators/ExpenseCreator.css';
import { useState } from 'react';

function ExpenseCreator(props) {

    const [desc, setDesc] = useState("");
    const [expenseValue, setExpenseValue] = useState(0);
    const [categoryName, setCategoryName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    let spendingCategories = props.spendingCategories.map(category => category.name);

    function createExpenseForm(e){
        e.preventDefault();
        if(paymentMethod === null || paymentMethod === ""){
            alert("Ensure All Fields are filled");
            return;
        }
        if(desc === null || desc === ""){
            alert("Ensure All Fields are filled");
            return;
        }
        if(expenseValue === null || expenseValue === 0){
            alert("Ensure All Fields are filled");
            return;
        }
        if(categoryName === null || categoryName === ""){
            alert("Ensure All Fields are filled");
            return;
        }
        props.createNewExpense(desc, expenseValue, paymentMethod, categoryName);
    }

    return (  
        <div className="expense-creator-container">
            <div className="expense-creator-popup"></div>
            <div className="expense-creator-window">
                <button onClick={() => props.setVisible(false)} className="exit-button">x</button>

                <input type="text" placeholder="description of charge" onChange={(e) => setDesc(e.target.value)} className="expense-inputs"/>
                <input type="number" placeholder="($)Expense Value" onChange={(e) => setExpenseValue(e.target.value)} required id="expense-value"/>
                <input name="expenseDate" type="date" required id="expense-date" />
                
                <select name="categoryName" id="category-choice" defaultValue="" required onChange={(e) => setCategoryName(e.target.value)}>
                    <option value="" hidden>Spending Category</option>
                    {spendingCategories.map((categoryName, index) => {
                        return <option value={categoryName} key={index}>{categoryName}</option>
                    })}
                </select>

                <select id="category-choice" defaultValue="" required onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="" hidden>Payment Method</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="CASH">Cash</option>
                    <option value="CHECK">Check</option>
                    <option value="OTHER">Other</option>
                </select>
                <button onClick={(e) => createExpenseForm(e)}>Save</button>
            </div>
        </div>
    );
}

export default ExpenseCreator;