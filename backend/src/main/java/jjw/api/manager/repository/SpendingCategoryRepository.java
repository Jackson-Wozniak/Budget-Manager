package jjw.api.manager.repository;

import jjw.api.manager.entity.SpendingCategory;
import jjw.api.manager.entity.id.SpendingCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpendingCategoryRepository extends JpaRepository<SpendingCategory, SpendingCategoryId> {
}
