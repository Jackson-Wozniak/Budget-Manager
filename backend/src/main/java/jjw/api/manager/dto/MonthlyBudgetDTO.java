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
    private List<SpendingCategoryDTO> spendingCategories;

    public MonthlyBudgetDTO(MonthlyBudget monthlyBudget){
        this.month = monthlyBudget.getId().getMonth();
        this.monthlyGoal = monthlyBudget.getSpendingGoal();
        this.moneySpent = 0.0;
        this.spendingCategories = monthlyBudget.getSpendingCategories().stream()
                .map(SpendingCategoryDTO::new)
                .collect(Collectors.toList());
    }
}
