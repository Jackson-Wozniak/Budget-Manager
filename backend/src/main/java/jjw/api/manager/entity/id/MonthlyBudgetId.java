package jjw.api.manager.entity.id;

import jakarta.persistence.Embeddable;
import jjw.api.manager.entity.User;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
public class MonthlyBudgetId implements Serializable {

    private String username;
    private String month;

    public MonthlyBudgetId(User user, String month){
        this.username = user.getUsername();
        this.month = month;
    }
}
