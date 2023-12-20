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
    public SimCard getSimCardById(@PathVariable(name = "id") String id){
        return simCardService.getSimCardById(id);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "simCard/{id}")
    public void deleteSimCard(@PathVariable(name = "id") String id){
        simCardService.deleteSimCard(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "simCards")
    public void addSimCard(@RequestBody SimCard simCard){
        simCardService.addSimCard(simCard);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "simCard/{id}")
    public void updateSimCard(@RequestBody  SimCard simCard, @PathVariable(name = "id") String id){
        simCardService.updateSimCard(simCard,id);
    }
}
