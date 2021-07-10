package com.data;

import com.model.*;
import com.repository.RanksRepository;
import com.repository.RatesRepository;
import com.repository.ServerRepository;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Component
public class DataLoaderComponent {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ServerRepository serverRepository;
    @Autowired
    RanksRepository ranksRepository;
    @Autowired
    RatesRepository ratesRepository;
    @Autowired
    PasswordEncoder encoder;

    @PostConstruct
    public void addUsers() {
        User admin = new User("Admin", "Admin", "admin", "admin@gmail.com ", encoder.encode("admin"), ERole.ROLE_ADMIN);
        User booster = new User("Booster", "Booster", "booster", "booster@gmail.com ", encoder.encode("booster"), ERole.ROLE_BOOSTER);
        booster.setPaypalEmail("test@paypal");
        AccountInformation boosterAccountInformation = new AccountInformation();
        boosterAccountInformation.setAccountName("booster");
        boosterAccountInformation.setAccountPassword("booster");
        boosterAccountInformation.setLolAccount("boosterLOL");
        boosterAccountInformation.setLolPassword("boosterLOLPWD");
        boosterAccountInformation.setPaypalEmail("booster@Paypal");
        booster.setAccountInformations(boosterAccountInformation);
        User user = new User("User", "User", "user", "user@gmail.com ", encoder.encode("user"), ERole.ROLE_USER);
        try {
            userRepository.saveAll(Arrays.asList(admin, booster, user));
        } catch (Exception e) {
        } finally {
        }
    }

    @PostConstruct
    public void addServers() {
        Server server0 = new Server("North America", "EU-WEST");
        Server server1 = new Server("EU-WEST", "EU-WEST");
        Server server2 = new Server("EU-Nordic & East", "EU-Nordic & East");
        Server server22 = new Server("Oceanic", "Oceanic");
        Server server3 = new Server("Turkey", "Turkey");
        Server server4 = new Server("Russia", "Russia");
        Server server5 = new Server("Brazil", "Brazil");
        Server server6 = new Server("Latina America North", "Latina America North");
        Server server7 = new Server("Latina America South", "Latina America South");
        Server server8 = new Server("Korea", "Korea");
        Server server9 = new Server("Japan", "Japan");
        Server server10 = new Server("South East Asia", "South East Asia");
        Server server11 = new Server("China", "China");
        try {
            serverRepository.saveAll(Arrays.asList(server0, server1, server2, server22, server3, server4, server5, server6, server7, server8, server9, server10, server11));
        } catch (Exception e) {
        } finally {
        }
    }

    @PostConstruct
    public void addRanks() {
        Ranks ranks1 = new Ranks("Iron", "Iron", "I,II,III", "");
        Ranks ranks2 = new Ranks("Bronze", "Bronze", "I,II,III", "");
        Ranks ranks3 = new Ranks("Silver", "Silver", "I,II,III", "");
        Ranks ranks4 = new Ranks("Gold", "Gold", "I,II,III", "");
        Ranks ranks5 = new Ranks("Platinum", "Platinum", "I,II,III", "");
        Ranks ranks6 = new Ranks("Diamond", "Diamond", "I,II,III", "");
        Ranks ranks7 = new Ranks("Immortal", "Immortal", "", "");
        Ranks ranks8 = new Ranks("Radiant", "Radiant", "", "");
        try {
            ranksRepository.saveAll(Arrays.asList(ranks1, ranks2, ranks3, ranks4, ranks5, ranks6, ranks7, ranks8));
        } catch (Exception e) {
        } finally {
        }
    }

    @PostConstruct
    public void addRates() {
        Rates rates1 = new Rates("rank-appear-offline", "rank-appear-offline", 1);
        Rates rates2 = new Rates("rank-specific-agents", "rank-specific-agents", 2);
        Rates rates3 = new Rates("rank-play-with-boosters", "rank-play-with-boosters", 3);
        Rates rates4 = new Rates("rank-priority-order", "rank-priority-order", 4);
        Rates rates5 = new Rates("rank-streaming", "rank-streaming", 5);
        Rates rates6 = new Rates("rank-appear-offline", "rank-appear-offline", 6);
        Rates rates7 = new Rates("rank-specific-agents", "rank-specific-agents", 7);
        Rates rates8 = new Rates("rank-play-with-boosters", "rank-play-with-boosters", 8);
        Rates rates9 = new Rates("rank-priority-order", "rank-priority-order", 9);
        Rates rates10 = new Rates("rank-streaming", "rank-streaming", 10);
        Rates rates11 = new Rates("rank-appear-offline", "rank-appear-offline", 11);
        Rates rates12 = new Rates("rank-specific-agents", "rank-specific-agents", 12);
        Rates rates13 = new Rates("rank-play-with-boosters", "rank-play-with-boosters", 13);
        Rates rates14 = new Rates("rank-priority-order", "rank-priority-order", 14);
        Rates rates15 = new Rates("rank-streaming", "rank-streaming", 15);
        try {
            ratesRepository.saveAll(Arrays.asList(rates1, rates2, rates3, rates4, rates5, rates6, rates7, rates8, rates9, rates10, rates11, rates12, rates13, rates14, rates15));
        } catch (Exception e) {
        } finally {
        }
    }
}
