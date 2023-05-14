package jjw.api.manager.dto;

import jjw.api.manager.entity.Expense;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenseDTO {

    private long id;
    private String description;
    private double value;
    private String dateTime;

    public ExpenseDTO(Expense expense){
        this.id = expense.getId();
        this.description = expense.getDescription();
        this.value = expense.getValue();
        this.dateTime = expense.getDateTime().toString();
    }
}
