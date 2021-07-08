package com.repository;

import com.model.Rates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RatesRepository extends JpaRepository<Rates, Long> {
}
