package com.controllers;

import com.model.Ranks;
import com.model.Rates;
import com.model.Server;
import com.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
