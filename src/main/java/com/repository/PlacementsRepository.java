package com.repository;

import com.model.Placements;
import com.model.Rates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PlacementsRepository extends JpaRepository<Placements, Long> {
}
