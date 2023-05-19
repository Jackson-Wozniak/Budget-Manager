import '../styles/SpendingCategoryCreator.css';
import { useState } from 'react';

function SpendingCategoryCreator(props) {

    const [name, setName] = useState("");
    const [goal, setGoal] = useState(0);

    return (  
        <div className="category-creator-container">
            <div className="category-creator-popup"></div>
            <div className="category-creator-window">
                <button onClick={() => props.setVisible(false)} className="exit-button">x</button>

                <input name="categoryName" type="text" placeholder="Name of category" required id="category-name" onChange={(e) => setName(e.target.value)}/>
                <input name="categoryGoal" type="number" placeholder="$ Category Goal" required id="category-goal" onChange={(e) => setGoal(e.target.value)}/>
            
                <button type="button" onClick={(e) => props.createNewCategory(e, name, goal)}>Save</button>
            </div>
        </div>
    );
}

export default SpendingCategoryCreator;