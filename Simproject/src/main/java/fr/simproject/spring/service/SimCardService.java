package fr.simproject.spring.service;

import fr.simproject.spring.model.SimCard;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class SimCardService {
    static final Date currentDate = new Date();
    static private List<SimCard> mySimCards = new ArrayList<>(Arrays.asList(
            new SimCard(1,"iccid","msisdn","0000","000000","tag","ici","00000",currentDate),
            new SimCard(2,"iccid2","msisdn2","0001","000000","tag","ici","00000",currentDate),
            new SimCard(3,"iccid3","msisdn","0002","000000","tag","ici","00000",currentDate),
            new SimCard(4,"iccid4","msisdn'","0003","000000","tag","ici","00000",currentDate)
    ));
    public List<SimCard> getSimCards(){
        return mySimCards;
    }

    public SimCard getSimCards(long id) {
        return mySimCards.stream().filter(sim -> sim.getId() == id).findFirst().orElse(null);
    }

    public void deleteSimCard(long id) {
        mySimCards.removeIf(sim -> sim.getId() == id);
    }

    public void addSimCard(SimCard simCard) {
        mySimCards.add(simCard);
    }

    public void updateSimcard(SimCard simCard, long id) {
        mySimCards.forEach(sim -> {
            if(sim.getId() == id){
                mySimCards.set(mySimCards.indexOf(sim),simCard);
            }
        });
    }
}
