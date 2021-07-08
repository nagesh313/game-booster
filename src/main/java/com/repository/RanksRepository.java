package com.repository;

import com.model.Ranks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RanksRepository extends JpaRepository<Ranks, Long> {
}
