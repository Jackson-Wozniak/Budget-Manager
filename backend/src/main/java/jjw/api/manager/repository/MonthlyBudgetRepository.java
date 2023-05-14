package jjw.api.manager.repository;

import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.id.MonthlyBudgetId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonthlyBudgetRepository extends JpaRepository<MonthlyBudget, MonthlyBudgetId> {
}
