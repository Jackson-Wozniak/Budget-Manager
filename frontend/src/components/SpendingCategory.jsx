function SpendingCategory(props) {

    let category = props.category;

    return (  
        <div>
            <p>{category.name}</p>
            <p>{category.goal}</p>
        </div>
    );
}

export default SpendingCategory;