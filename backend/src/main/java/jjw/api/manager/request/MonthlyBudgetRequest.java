package jjw.api.manager.request;

import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyBudgetRequest {

    private String month;
    private double spendingGoal;

    public MonthlyBudget createBudget(User user){
        return new MonthlyBudget(user, month, spendingGoal);
    }
}
