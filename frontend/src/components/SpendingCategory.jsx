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
        <div className="category-list-container">
            <div className="category-container-title">
                <h1>{category.name}</h1>
                <button className="inner-category-buttons">See Detailed View</button>
                <h3 className="category-to-spend">{totalToSpend}</h3>
            </div>
            <div className="category-container-info">
                <div className="progress-bar-container">
                    <progress max={category.goal} value={category.sumOfExpenses} className={("category-progress-bar ") + ((sum > 0) ? "meeting-goal" : (sum === 0) ? "at-goal" : "past-goal")}/>
                    <span>${category.sumOfExpenses} / ${category.goal}</span>
                </div>
            </div>
        </div>
    );
}

export default SpendingCategory;