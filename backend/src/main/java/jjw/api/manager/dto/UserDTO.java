package jjw.api.manager.dto;

import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserDTO {

    private String username;
    private List<MonthlyBudgetDTO> monthlyBudgets;

    public UserDTO(User user){
        this.username = user.getUsername();
        this.monthlyBudgets = user.getMonthlyBudgets().stream()
                .map(MonthlyBudgetDTO::new)
                .collect(Collectors.toList());
    }
}
