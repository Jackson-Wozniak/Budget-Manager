package jjw.api.manager.dto;

import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.SpendingCategory;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class SpendingCategoryDTO {

    private String name;
    private double goal;
    private List<ExpenseDTO> expenses;
    private double sumOfExpenses;

    public SpendingCategoryDTO(SpendingCategory spendingCategory){
        this.name = spendingCategory.getId().getName();
        this.goal = spendingCategory.getSpendingGoal();
        this.expenses = spendingCategory.getExpenses().stream()
                .map(ExpenseDTO::new)
                .collect(Collectors.toList());
        this.sumOfExpenses = getValueOfExpenses();
    }

    public double getValueOfExpenses(){
        return this.expenses.stream().mapToDouble(ExpenseDTO::getValue).sum();
    }
}
