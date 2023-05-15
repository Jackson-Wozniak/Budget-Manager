package jjw.api.manager.controller;

import jjw.api.manager.dto.ExpenseDTO;
import jjw.api.manager.entity.Expense;
import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.SpendingCategory;
import jjw.api.manager.entity.User;
import jjw.api.manager.entity.id.MonthlyBudgetId;
import jjw.api.manager.entity.id.SpendingCategoryId;
import jjw.api.manager.enums.PaymentMethod;
import jjw.api.manager.request.ExpenseRequest;
import jjw.api.manager.service.ExpenseService;
import jjw.api.manager.service.MonthlyBudgetService;
import jjw.api.manager.service.SpendingCategoryService;
import jjw.api.manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/v1/expense")
@AllArgsConstructor
public class ExpenseController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final SpendingCategoryService spendingCategoryService;
    @Autowired
    private final MonthlyBudgetService monthlyBudgetService;
    @Autowired
    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<?> getAllExpensesByCategory(@RequestParam("month") String month, @RequestParam("categoryName") String categoryName) {
        try{
            User user = userService.findDefaultUser();
            MonthlyBudget budget = monthlyBudgetService.findBudgetById(new MonthlyBudgetId(user, month));
            SpendingCategory category = spendingCategoryService.findCategoryById(new SpendingCategoryId(budget.getId(), categoryName));

            return ResponseEntity.ok(category.getExpenses().stream()
                    .map(ExpenseDTO::new)
                    .collect(Collectors.toList())
            );
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createNewExpense(@RequestBody ExpenseRequest request) {
        try{
            User user = userService.findDefaultUser();
            MonthlyBudget budget = monthlyBudgetService.findBudgetById(new MonthlyBudgetId(user, request.getMonth()));
            SpendingCategory category = spendingCategoryService.findCategoryById(new SpendingCategoryId(budget.getId(), request.getCategoryName()));

            Expense expense = new Expense(
                    category,
                    request.getDescription(),
                    PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()),
                    request.getValue()
            );
            expenseService.saveNewExpense(expense);
            return ResponseEntity.ok("Expense Saved");
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
