package com.repository;

import com.model.Placements;
import com.model.WinBoostings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WinBoostingsRepository extends JpaRepository<WinBoostings, Long> {
}
