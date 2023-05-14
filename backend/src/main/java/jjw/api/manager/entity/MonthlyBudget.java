package jjw.api.manager.entity;

import jakarta.persistence.*;
import jjw.api.manager.entity.id.MonthlyBudgetId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "monthlyBudget")
@Getter
@Setter
@NoArgsConstructor
public class MonthlyBudget {

    @EmbeddedId
    private MonthlyBudgetId id;

    @MapsId(value = "username")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(name = "spending_goal")
    private Double spendingGoal;

    @OneToMany(mappedBy = "monthlyBudget", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SpendingCategory> spendingCategories;

    public MonthlyBudget(User user, String month, Double spendingGoal) {
        this.id = new MonthlyBudgetId(user, month);
        this.user = user;
        this.spendingGoal = spendingGoal;
    }
}
