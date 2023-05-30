import '../../styles/details/DetailsWindow.css';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

/*
CONTAINS:
    - $ spent to $ income, total profit for month
    - Top spending category this month
    - Doughnut chart of all spending category allocations
*/
function DetailsWindow(props) {

    let budget = props.budget;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: budget.spendingCategories.map(category => category.name),
        datasets: [
          {
            label: '$ per category',
            data: budget.spendingCategories.map(category => category.sumOfExpenses),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    let chartWindow;
    if(budget.spendingCategories.length > 0){
        chartWindow = <div className="chart-container"><Chart type="doughnut" data={data} style={{width : "40vh" , height : "40vh"}}/></div>;
    }
    return ( 
        <div className="details-container">
          <div className="income-details">
            <h5>Income: {formatter.format(budget.incomeGenerated)}</h5>
            <h5>Spent: {formatter.format(budget.moneySpent)}</h5>
            <h3>Total: {formatter.format(budget.incomeGenerated - budget.moneySpent)}</h3>
          </div>
          {chartWindow}
        </div>
     );
}

export default DetailsWindow;