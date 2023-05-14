package jjw.api.manager.entity;

import jakarta.persistence.*;
import jjw.api.manager.entity.id.SpendingCategoryId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "spendingCategory")
@Getter
@Setter
@NoArgsConstructor
public class SpendingCategory {

    @EmbeddedId
    private SpendingCategoryId id;

    @MapsId(value = "monthlyBudgetId")
    @ManyToOne(fetch = FetchType.LAZY)
    private MonthlyBudget monthlyBudget;

    @Column(name = "spending_goal")
    private Double spendingGoal;

    @OneToMany(mappedBy = "spendingCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Expense> expenses;

    public SpendingCategory(String name, MonthlyBudget monthlyBudget, Double spendingGoal) {
        this.id = new SpendingCategoryId(monthlyBudget.getId(), name);
        this.monthlyBudget = monthlyBudget;
        this.spendingGoal = spendingGoal;
    }
}
