import '../styles/SpendingCategory.css';

function SpendingCategory(props) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    let category = props.category;
    let sum = category.goal - category.sumOfExpenses;
    let totalToSpend = (category.goal - category.sumOfExpenses >= 0) ?  (formatter.format(sum) + " remaining") : (formatter.format(sum * -1) + " overspent");

    return (  
        <div className="category-list-container" onClick={() => alert("hello")}>
            <div className="category-container-title">
                <h2 id="category-identifier">{category.name}</h2>
                <h3 id="category-to-spend">{totalToSpend}</h3>
            </div>
            <div className="category-container-info">
                <div className="progress-bar-container">
                    <progress max={category.goal} value={category.sumOfExpenses} className={("category-progress-bar ") + ((sum > 0) ? "meeting-goal" : (sum === 0) ? "at-goal" : "past-goal")}/>
                    <span>${category.sumOfExpenses}  /  ${category.goal}</span>
                </div>
            </div>
        </div>
    );
}

export default SpendingCategory;