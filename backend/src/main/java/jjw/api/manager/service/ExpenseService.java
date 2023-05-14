package jjw.api.manager.service;

import jjw.api.manager.entity.Expense;
import jjw.api.manager.repository.ExpenseRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ExpenseService {

    @Autowired
    private final ExpenseRepository expenseRepository;

    public Expense saveNewExpense(Expense expense){
        return expenseRepository.save(expense);
    }
}
