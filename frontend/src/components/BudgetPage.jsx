import { useState } from "react";
import '../styles/BudgetPage.css';
import { useNavigate } from 'react-router-dom';
import DetailsWindow from './details/DetailsWindow';
import OverviewWindow from "./overview/OverviewWindow";
import CategoryWindow from './categories/CategoryWindow';
import { getMonthlyBudget } from '../utils/MonthlyBudgetApi';

function BudgetPage() {
    const [month, setMonth] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState({});

    const navigate = useNavigate();

    function setNewMonth(month){
        getMonthlyBudget(month).then((data) => {
            if(data === "User has not created budget for this month"){
                navigate("create-budget");
                return;
            }
            setMonthlyBudget(data);
            setMonth(month);
        });
    }

    if(month === null){
        return(
            <div>
                <h1>Choose your desired budget month</h1>
                <input type="month" id="start" name="start" min="2020-08" onChange={(e) => setNewMonth(e.target.value)} />
            </div>
        );
    }

    return ( 
        <div className="budget-container">

            <DetailsWindow className="details-window" budget={monthlyBudget}/>
            <OverviewWindow className="overview-window" 
                budget={monthlyBudget}
                month={month}
                setNewMonth={setNewMonth}
            />
            <CategoryWindow className="category-window" budget={monthlyBudget}/>
        </div>
    );
}

export default BudgetPage;