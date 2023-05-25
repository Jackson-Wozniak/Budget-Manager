import '../styles/SpendingCategory.css';

function SpendingCategory(props) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    let category = props.category;
    let sum = category.goal - category.sumOfExpenses;
    let totalToSpend = (category.goal - category.sumOfExpenses >= 0) ?  (formatter.format(sum) + " to spend") : (formatter.format(sum * -1) + " past goal");

    return (  
        <div className="category-container">
            <div className="category-container-title">
                <h1>{category.name}</h1>
                <button className="category-buttons">See Detailed View</button>
            </div>
            <div className="category-container-info">
                <h3 className="category-to-spend">{totalToSpend}</h3>
                <p>${category.sumOfExpenses} / ${category.goal}</p>
                <progress max={category.goal} value={category.sumOfExpenses} className={("category-progress-bar ") + ((sum > 0) ? "meeting-goal" : (sum === 0) ? "at-goal" : "past-goal")}/>
            </div>
        </div>
    );
}

export default SpendingCategory;