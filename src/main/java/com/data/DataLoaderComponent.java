package com.data;

import com.model.*;
import com.repository.*;
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
    PlacementsRepository placementsRepository;
    @Autowired
    WinBoostingsRepository winBoostingsRepository;
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
    public void addBoostRankingRates() {
        Rates rates0 = new Rates("Iron", "Iron", "I", "I", 0.00);
        rates0.setDisabled(true);
        Rates rates1 = new Rates("Iron", "Iron", "I", "II", 11.70);
        Rates rates2 = new Rates("Iron", "Iron", "II", "III", 11.70);
        Rates rates3 = new Rates("Iron", "Bronze", "III", "I", 11.70);
        Rates rates40 = new Rates("Bronze", "Bronze", "I", "I", 0.00);
        rates40.setDisabled(true);
        Rates rates4 = new Rates("Bronze", "Bronze", "I", "II", 12.89);
        Rates rates5 = new Rates("Bronze", "Bronze", "II", "III", 14.07);
        Rates rates6 = new Rates("Bronze", "Silver", "III", "I", 15.25);
        Rates rates70 = new Rates("Silver", "Silver", "I", "I", 0.00);
        rates70.setDisabled(true);
        Rates rates7 = new Rates("Silver", "Silver", "I", "II", 17.62);
        Rates rates8 = new Rates("Silver", "Silver", "II", "III", 21.16);
        Rates rates9 = new Rates("Silver", "Gold", "III", "I", 21.16);
        Rates rates100 = new Rates("Gold", "Gold", "I", "I", 0.00);
        rates100.setDisabled(true);
        Rates rates10 = new Rates("Gold", "Gold", "I", "II", 23.53);
        Rates rates11 = new Rates("Gold", "Gold", "II", "III", 24.7);
        Rates rates12 = new Rates("Gold", "Platinum", "III", "I", 28.26);
        Rates rates130 = new Rates("Platinum", "Platinum", "I", "I", 0.00);
        rates130.setDisabled(true);
        Rates rates13 = new Rates("Platinum", "Platinum", "I", "II", 35.35);
        Rates rates14 = new Rates("Platinum", "Platinum", "II", "III", 35.35);
        Rates rates15 = new Rates("Platinum", "Diamond", "III", "I", 38.90);
        Rates rates160 = new Rates("Diamond", "Diamond", "I", "I", 0.00);
        rates160.setDisabled(true);
        Rates rates16 = new Rates("Diamond", "Diamond", "I", "II", 53.09);
        Rates rates17 = new Rates("Diamond", "Diamond", "II", "III", 59.00);
        Rates rates18 = new Rates("Diamond", "Immortal", "III", "", 155.95);
        Rates rates19 = new Rates("Immortal", "Immortal", "", "", 50.72);
        try {
            ratesRepository.saveAll(Arrays.asList(rates0, rates1, rates2, rates3, rates40, rates4, rates5, rates6, rates70, rates7, rates8, rates9, rates100, rates10, rates11, rates12,
                    rates130, rates13, rates14,
                    rates15, rates160, rates16, rates17, rates18));
        } catch (Exception e) {
        } finally {
        }
    }

    @PostConstruct
    public void addPlacementRates() {
        Placements placements1 = new Placements("Unranked", 11.70);
        Placements placements2 = new Placements("Iron", 4.61);
        Placements placements3 = new Placements("Bronze", 5.79);
        Placements placements4 = new Placements("Silver", 6.98);
        Placements placements5 = new Placements("Gold", 11.70);
        Placements placements6 = new Placements("Platinum", 16.4);
        Placements placements7 = new Placements("Diamond", 23.53);
        Placements placements8 = new Placements("Immortal", 23.53);
        Placements placements9 = new Placements("Radiant", 35.35);
        try {
            placementsRepository.saveAll(Arrays.asList(placements1, placements2, placements3, placements4, placements5, placements6, placements7, placements8,
                    placements9));
        } catch (Exception e) {
        } finally {
        }
    }

    @PostConstruct
    public void addWinBoostings() {
        WinBoostings rates0 = new WinBoostings("Iron", "I", 5.79);
        WinBoostings rates1 = new WinBoostings("Iron", "II", 5.79);
        WinBoostings rates2 = new WinBoostings("Iron", "III", 5.79);
        WinBoostings rates4 = new WinBoostings("Bronze", "I", 5.79);
        WinBoostings rates5 = new WinBoostings("Bronze", "II", 5.79);
        WinBoostings rates6 = new WinBoostings("Bronze", "III", 5.79);
        WinBoostings rates70 = new WinBoostings("Silver", "I", 6.98);
        WinBoostings rates7 = new WinBoostings("Silver", "II", 8.16);
        WinBoostings rates8 = new WinBoostings("Silver", "III", 9.34);
        WinBoostings rates100 = new WinBoostings("Gold", "I", 10.52);
        WinBoostings rates10 = new WinBoostings("Gold", "II", 11.70);
        WinBoostings rates11 = new WinBoostings("Gold", "III", 11.70);
        WinBoostings rates130 = new WinBoostings("Platinum", "I", 12.89);
        WinBoostings rates13 = new WinBoostings("Platinum", "II", 14.07);
        WinBoostings rates14 = new WinBoostings("Platinum", "III", 17.62);
        WinBoostings rates160 = new WinBoostings("Diamond", "I", 23.53);
        WinBoostings rates16 = new WinBoostings("Diamond", "II", 29.44);
        WinBoostings rates17 = new WinBoostings("Diamond", "III", 32.99);
        WinBoostings rates18 = new WinBoostings("Diamond", "III", 76.73);
        WinBoostings rates19 = new WinBoostings("Immortal", "", 69.64);

        try {
            winBoostingsRepository.saveAll(Arrays.asList(
                    rates0, rates1, rates2, rates4,
                    rates5, rates6, rates70, rates7,
                    rates8, rates100, rates10, rates11,
                    rates130, rates13, rates14,
                    rates160, rates16, rates17, rates18, rates19));
        } catch (Exception e) {
        } finally {
        }
    }

}
