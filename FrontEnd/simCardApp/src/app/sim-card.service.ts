import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimCardService {

  readonly API_URL = "http://localhost:8080"

  readonly ENDPOINT_SIMCARDS = "/simCards"

  readonly  ENDPOINT_SIMCARD= "/simCard/"

  constructor(private httpClient : HttpClient) {

   }

   getSimCards(){
    return this.httpClient.get(this.API_URL+this.ENDPOINT_SIMCARDS)
   }
   getSimCardById(id: string) {
  
    return this.httpClient.get(this.API_URL+this.ENDPOINT_SIMCARD+id);
  }
}
