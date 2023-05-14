package jjw.api.manager.entity;

import jakarta.persistence.*;
import jjw.api.manager.enums.PaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "expense_desc")
    private String description;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "value")
    private Double value;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
        @JoinColumn(name="month", referencedColumnName="monthly_budget_month"),
        @JoinColumn(name="username", referencedColumnName="monthly_budget_user_username"),
        @JoinColumn(name="name", referencedColumnName="name")
    })
    private SpendingCategory spendingCategory;

    public Expense(SpendingCategory spendingCategory, String desc, PaymentMethod paymentMethod, double value){
        this.spendingCategory = spendingCategory;
        this.description = desc;
        this.paymentMethod = paymentMethod;
        this.value = value;
        this.dateTime = LocalDateTime.now();
    }
}
