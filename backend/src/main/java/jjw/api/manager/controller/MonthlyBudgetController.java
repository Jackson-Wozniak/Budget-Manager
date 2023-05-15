package jjw.api.manager.controller;

import jjw.api.manager.dto.MonthlyBudgetDTO;
import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.User;
import jjw.api.manager.entity.id.MonthlyBudgetId;
import jjw.api.manager.request.MonthlyBudgetRequest;
import jjw.api.manager.service.MonthlyBudgetService;
import jjw.api.manager.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/monthly_budget")
@AllArgsConstructor
public class MonthlyBudgetController {

    @Autowired
    private final MonthlyBudgetService budgetService;
    @Autowired
    private final UserService userService;

    @GetMapping
    //month param formatted as MM_YYYY
    public ResponseEntity<?> getBudgetByMonth(@RequestParam("month") String month){
        try{
            User user = userService.findDefaultUser();
            MonthlyBudget budget = budgetService.findBudgetById(new MonthlyBudgetId(user, month));
            return ResponseEntity.ok(new MonthlyBudgetDTO(budget));
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping
    //month param formatted as MM_YYYY
    public ResponseEntity<?> createBudgetForMonth(@RequestBody MonthlyBudgetRequest request){
        try{
            User user = userService.findDefaultUser();
            MonthlyBudget budget = budgetService.saveNewBudget(request.createBudget(user));
            return ResponseEntity.ok(new MonthlyBudgetDTO(budget));
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping
    //month param formatted as MM_YYYY
    public ResponseEntity<?> updateBudgetGoalForMonth(@RequestParam("goal") String goal, MonthlyBudgetRequest request){
        try{
            User user = userService.findDefaultUser();
            budgetService.updateBudgetGoal(request.createBudget(user), Double.parseDouble(goal));
            return ResponseEntity.ok("Goal updated");
        }catch(Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
