package jjw.api.manager.service;

import jakarta.transaction.Transactional;
import jjw.api.manager.entity.MonthlyBudget;
import jjw.api.manager.entity.id.MonthlyBudgetId;
import jjw.api.manager.exception.CreationException;
import jjw.api.manager.repository.MonthlyBudgetRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MonthlyBudgetService {

    @Autowired
    private final MonthlyBudgetRepository monthlyBudgetRepository;

    public MonthlyBudget saveNewBudget(MonthlyBudget monthlyBudget){
        if(monthlyBudgetRepository.findById(monthlyBudget.getId()).isPresent()){
            throw new CreationException("This months budget has already been created for this user");
        }
        return monthlyBudgetRepository.save(monthlyBudget);
    }

    public MonthlyBudget updateBudget(MonthlyBudget monthlyBudget){
        return monthlyBudgetRepository.save(monthlyBudget);
    }

    public MonthlyBudget findBudgetById(MonthlyBudgetId id){
        return monthlyBudgetRepository.findById(id).orElseThrow(() -> new RuntimeException(""));
    }

    @Transactional
    public boolean deleteBudget(MonthlyBudget monthlyBudget){
        try{
            monthlyBudgetRepository.delete(monthlyBudget);
        }catch (Exception ex){
            return false;
        }
        return true;
    }
}
