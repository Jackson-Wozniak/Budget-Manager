import '../styles/ExpenseCreator.css';

function ExpenseCreator(props) {

    let spendingCategories = props.spendingCategories.map(category => category.name);

    function createExpenseForm(e){
        e.preventDefault();
        let categoryName = e.target.categoryName.value;
        let expenseValue = e.target.expenseValue.value;
        let dateOfPurchase = e.target.expenseDate.value;
        console.log(categoryName + " $" + expenseValue + " " + dateOfPurchase);
        props.setVisible(false);
    }

    return (  
        <div className="expense-creator-container">
            <div className="expense-creator-popup"></div>
            <form className="expense-creator-window" onSubmit={(e) => createExpenseForm(e)}>
                <button onClick={() => props.setVisible(false)} className="exit-button">x</button>

                <input name="expenseValue" type="number" placeholder="$ Value of Expense" required id="expense-value"/>
                <input name="expenseDate" type="date" required id="expense-date"/>
                
                <select name="categoryName" id="category-choice" defaultValue="" required>
                    <option value="" hidden>Spending Category</option>
                    {spendingCategories.map((categoryName, index) => {
                        return <option value={categoryName} key={index}>{categoryName}</option>
                    })}
                </select>
                <input type="submit" />
            </form>
        </div>
    );
}

export default ExpenseCreator;