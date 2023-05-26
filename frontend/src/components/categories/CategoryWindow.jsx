import '../../styles/categories/CategoryWindow.css';
import SpendingCategory from "../SpendingCategory";

/*
CONTAINS:
    - All spending category by month
    - Each category contains the name, $ left to spend, and progress bar for tracking
*/
function CategoryWindow(props) {

    let budget = props.budget;

    return ( 
        <div className="category-container">
            <h1>Spending Categories</h1>
            <p>click category for details</p>
            {budget.spendingCategories.map((spendingCategory, index) => {
                return <SpendingCategory key={index} category={spendingCategory} />
            })}
        </div>
     );
}

export default CategoryWindow;