package jjw.api.manager.service;

import jjw.api.manager.entity.Expense;
import jjw.api.manager.entity.SpendingCategory;
import jjw.api.manager.repository.ExpenseRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExpenseService {

    @Autowired
    private final ExpenseRepository expenseRepository;

    public Expense saveNewExpense(Expense expense){
        return expenseRepository.save(expense);
    }

    public List<Expense> findAllExpensesByCategory(SpendingCategory spendingCategory){
        return expenseRepository.findAll().stream()
                .filter(expense -> expense.getSpendingCategory().getId().equals(spendingCategory.getId()))
                .collect(Collectors.toList());
    }
}
