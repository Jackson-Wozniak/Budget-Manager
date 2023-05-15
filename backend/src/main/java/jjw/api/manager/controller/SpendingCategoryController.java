package jjw.api.manager.controller;

import jjw.api.manager.dto.SpendingCategoryDTO;
import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.SpendingCategory;
import jjw.api.manager.entity.User;
import jjw.api.manager.entity.id.MonthlyBudgetId;
import jjw.api.manager.entity.id.SpendingCategoryId;
import jjw.api.manager.service.MonthlyBudgetService;
import jjw.api.manager.service.SpendingCategoryService;
import jjw.api.manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/categories")
@AllArgsConstructor
public class SpendingCategoryController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final SpendingCategoryService spendingCategoryService;
    @Autowired
    private final MonthlyBudgetService monthlyBudgetService;

    @GetMapping
    public ResponseEntity<?> getSpendingCategory(@RequestParam("name") String name, @RequestParam("month") String month) throws Exception {
        month = month.replace("_", "/");
        try{
            User user = userService.findDefaultUser();
            MonthlyBudget monthlyBudget = monthlyBudgetService.findBudgetById(new MonthlyBudgetId(user, month));
            SpendingCategory category = spendingCategoryService.findCategoryById(new SpendingCategoryId(monthlyBudget.getId(), name));
            return ResponseEntity.ok(new SpendingCategoryDTO(category));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createSpendingCategory(@RequestParam("name") String name, @RequestParam("month") String month, @RequestParam("goal") String goal) throws Exception {
        month = month.replace("_", "/");
        try{
            User user = userService.findDefaultUser();
            MonthlyBudget monthlyBudget = monthlyBudgetService.findBudgetById(new MonthlyBudgetId(user, month));
            SpendingCategory category = spendingCategoryService.createSpendingCategory(monthlyBudget, Double.parseDouble(goal), name);
            return ResponseEntity.ok("Category Created");
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
