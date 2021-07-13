package com.controllers;

import com.model.*;
import com.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/config")
public class ConfigController {
    @Autowired
    private ServerRepository serverRepository;
    @Autowired
    private RanksRepository ranksRepository;
    @Autowired
    private RatesRepository ratesRepository;
    @Autowired
    private PlacementsRepository placementsRepository;
    @Autowired
    private WinBoostingsRepository winBoostingsRepository;

    @GetMapping("/servers")
    public List<Server> allServers() {
        return serverRepository.findAll();
    }

    @GetMapping("/ranks")
    public List<Ranks> allRanks() {
        return ranksRepository.findAll();
    }

    @GetMapping("/rates")
    public List<Rates> getAllRates() {
        return ratesRepository.findAll();
    }

    @GetMapping("/placements")
    public List<Placements> getAllPlacements() {
        return placementsRepository.findAll();
    }

    @GetMapping("/winboostings")
    public List<WinBoostings> getAllWinBoostings() {
        return winBoostingsRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/rates")
    public void saveAllRates(@RequestBody List<Rates> rates) {
        ratesRepository.saveAll(rates);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/placements")
    public void saveAllPlacements(@RequestBody List<Placements> placements) {
        placementsRepository.saveAll(placements);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/winboostings")
    public void saveAllWinBoostings(@RequestBody List<WinBoostings> winBoostings) {
        winBoostingsRepository.saveAll(winBoostings);
    }
}
