package fr.simproject.spring.controller;

import fr.simproject.spring.model.SimCard;
import fr.simproject.spring.service.SimCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class SimController {

    @Autowired
    private SimCardService simCardService;

    @RequestMapping("/simCards")
   public List<SimCard> getSimcards(){
       return simCardService.getSimCards();
   }

    @RequestMapping("/simCard/{id}")
    public SimCard getSimCardById(@PathVariable(name = "id") long id){
        return simCardService.getSimCardById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "simCard/{id}")
    public void deleteSimCard(@PathVariable(name = "id") Long id){
        simCardService.deleteSimCard(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "simCards")
    public void addSimCard(@RequestBody SimCard simCard){
        simCardService.addSimCard(simCard);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "simCard/{id}")
    public void updateSimCard(@RequestBody  SimCard simCard, @PathVariable(name = "id") Long id){
        simCardService.updateSimCard(simCard,id);
    }

    @RequestMapping(method = RequestMethod.GET, value = "simCards/checkMsisdn/{msisdn}")
    public boolean checkMsisdnAvailability(@PathVariable(name = "msisdn") String msisdn) {
        return simCardService.isMsisdnAvailable(msisdn);
    }

    @RequestMapping(method = RequestMethod.GET, value = "simCards/checkIpAddress/{ipAddress}")
    public boolean checkIpAddressAvailability(@PathVariable String ipAddress) {
        return simCardService.isIpAddressAvailable(ipAddress);
    }

}
