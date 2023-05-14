package jjw.api.manager.entity.id;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@EqualsAndHashCode
public class SpendingCategoryId {

    @Embedded
    private MonthlyBudgetId monthlyBudgetId;
    private String name;
}
