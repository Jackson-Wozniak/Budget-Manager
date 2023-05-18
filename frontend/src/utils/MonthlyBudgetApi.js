export async function getMonthlyBudget(month){
    const response = await fetch("http://localhost:8080/api/v1/monthly_budget?month=" + month);

    if(response.status !== 200){
        return await response.text();
    }

    const json = await response.json();

    return json;
}

export async function createMonthlyBudget(month, spendingGoal){
    const response = await fetch("http://localhost:8080/api/v1/monthly_budget", {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({"month" : month, "spendingGoal" : spendingGoal})
    });

    if(response.status !== 200){
        return await response.text();
    }

    return true;
}
