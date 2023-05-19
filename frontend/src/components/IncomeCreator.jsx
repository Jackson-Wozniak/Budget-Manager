import '../styles/IncomeCreator.css';

function IncomeCreator(props) {

    function createIncomeForm(e){
        e.preventDefault();
        console.log(e.target.incomeValue.value);
    }

    return (  
        <div className="income-creator-container">
            <div className="income-creator-popup"></div>
            <form className="income-creator-window" onSubmit={(e) => createIncomeForm(e)}>
                <button onClick={() => props.setVisible(false)} className="exit-button">x</button>

                <input name="incomeValue" type="number" placeholder="$ Value of Income" required id="income-value"/>
                <input type="submit" />
            </form>
        </div>
    );
}

export default IncomeCreator;