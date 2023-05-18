function SpendingCategory(props) {

    let category = props.category;

    return (  
        <div>
            <p>{category.name}</p>
            <p>{category.goal}</p>
            {category.expenses.map((expense) => {
                return <div key={expense.id}>
                    <p>{expense.description}</p>
                    <p>{expense.value}</p>
                    <p>{expense.dateTime}</p>
                </div>
            })}
        </div>
    );
}

export default SpendingCategory;