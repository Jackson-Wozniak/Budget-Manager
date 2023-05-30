package jjw.api.manager.dto;

import jjw.api.manager.entity.MonthlyBudget;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class MonthlyBudgetDTO {

    private String month;
    private double monthlyGoal;
    private double moneySpent;
    private double incomeGenerated;
    private List<SpendingCategoryDTO> spendingCategories;

    public MonthlyBudgetDTO(MonthlyBudget monthlyBudget){
        this.month = monthlyBudget.getId().getMonth();
        this.monthlyGoal = monthlyBudget.getSpendingGoal();
        this.spendingCategories = monthlyBudget.getSpendingCategories().stream()
                .map(SpendingCategoryDTO::new)
                .collect(Collectors.toList());
        this.moneySpent = calculateMoneySpent();
        this.incomeGenerated = 0.0;
    }

    public double calculateMoneySpent(){
        return this.spendingCategories.stream()
                .mapToDouble(SpendingCategoryDTO::getValueOfExpenses).sum();
    }
}
