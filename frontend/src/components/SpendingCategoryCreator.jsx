import '../styles/SpendingCategoryCreator.css';

function SpendingCategoryCreator(props) {

    function createCategoryForm(e){
        e.preventDefault();
        console.log(e.target.categoryName.value);
        console.log(e.target.categoryGoal.value);
    }

    return (  
        <div className="category-creator-container">
            <div className="category-creator-popup"></div>
            <form className="category-creator-window" onSubmit={(e) => createCategoryForm(e)}>
                <button onClick={() => props.setVisible(false)} className="exit-button">x</button>

                <input name="categoryName" type="text" placeholder="Name of category" required id="category-name"/>
                <input name="categoryGoal" type="number" placeholder="$ Category Goal" required id="category-goal"/>
            
                <input type="submit" />
            </form>
        </div>
    );
}

export default SpendingCategoryCreator;