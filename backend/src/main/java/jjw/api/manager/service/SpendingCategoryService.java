package jjw.api.manager.service;

import jjw.api.manager.entity.SpendingCategory;
import jjw.api.manager.entity.id.SpendingCategoryId;
import jjw.api.manager.exception.CreationException;
import jjw.api.manager.repository.SpendingCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SpendingCategoryService {

    @Autowired
    private final SpendingCategoryRepository spendingCategoryRepository;

    public SpendingCategory saveNewSpendingCategory(SpendingCategory spendingCat){
        if(spendingCategoryRepository.findById(spendingCat.getId()).isPresent()){
            throw new CreationException("This category already exists for this month");
        }
        return spendingCategoryRepository.save(spendingCat);
    }

    public SpendingCategory updateSpendingCategory(SpendingCategory spendingCat){
        return spendingCategoryRepository.save(spendingCat);
    }

    public SpendingCategory findCategoryById(SpendingCategoryId id){
        return spendingCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException(""));
    }
}
