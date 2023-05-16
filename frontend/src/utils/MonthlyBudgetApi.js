export async function getMonthlyBudget(month){
    const response = await fetch("http://localhost:8080/api/v1/monthly_budget?month=" + month);

    if(response.status !== 200){
        return await response.text();
    }

    const json = await response.json();

    return json;
}