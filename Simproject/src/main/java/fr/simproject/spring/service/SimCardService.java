package fr.simproject.spring.service;

import fr.simproject.spring.model.SimCard;
import fr.simproject.spring.repository.SimCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
public class SimCardService {

    @Autowired
    private SimCardRepository simCardRepository;



    public List<SimCard> getSimCards() {
        List<SimCard> simCards = new ArrayList<>();
        simCardRepository.findAll().forEach(sim -> {
            simCards.add(sim);
        });
        return simCards;
    }

    public SimCard getSimCardById(Long id) {
        return simCardRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("La carte SIM avec l'ID " + id + " n'existe pas."));
    }

    public void deleteSimCard(Long id) {
        // On vérifie d'abord si la carte SIM existe
        if (simCardRepository.existsById(id)) {
            simCardRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("La carte SIM avec l'ID " + id + " n'existe pas.");
        }
    }

    public void addSimCard(SimCard simCard) {
        simCardRepository.save(simCard);
    }

    public void updateSimCard(SimCard simCard, Long id) {
        // On vérifie d'abord si la carte SIM existe
        if (simCardRepository.existsById(id)) {
            // Maj de la carte SIM
            simCard.setIccId(id);
            simCardRepository.save(simCard);
        } else {
            // La carte SIM n'existe pas
            throw new IllegalArgumentException("La carte SIM avec l'ID " + id + " n'existe pas.");
        }
    }

    public boolean isMsisdnAvailable(String msisdn) {
        return !simCardRepository.existsByMsisdn(msisdn);
    }

    public boolean isIpAddressAvailable(String ipAddress) {
        return !simCardRepository.existsByIpAddress(ipAddress);
    }

}
