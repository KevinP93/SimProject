import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimCardService {

  readonly API_URL = "http://localhost:8080"

  readonly ENDPOINT_SIMCARDS = "/simCards"

  readonly  ENDPOINT_SIMCARD= "/simCard/"

  private modifySubject = new BehaviorSubject<any>(null);
  modify$ = this.modifySubject.asObservable();

  constructor(private httpClient : HttpClient) {

   }

   getSimCards(){
    return this.httpClient.get(this.API_URL+this.ENDPOINT_SIMCARDS)
   }
   getSimCardById(id: string) {
  
    return this.httpClient.get(this.API_URL+this.ENDPOINT_SIMCARD+id);
  }


  updateSimCard(sim: any, id: string) {
    const url = `${this.API_URL}${this.ENDPOINT_SIMCARD}${id}`;
    return this.httpClient.put(url, sim).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la modification :', error);
        let errorMessage = 'Erreur lors de la modification de la carte SIM.';
        if (error.status === 500) {
          errorMessage = 'Une erreur interne du serveur s\'est produite.';
        } else if (error.status === 404) {
          errorMessage = 'La carte SIM à modifier n\'a pas été trouvée.';
        }
  
        return throwError(errorMessage);
      })
    );
  }

  deleteSimCard(simId: string){
    return this.httpClient.delete(this.API_URL+this.ENDPOINT_SIMCARD+simId);
  }

  addSimCard(sim: any) {
  return this.httpClient.post(this.API_URL + this.ENDPOINT_SIMCARDS, sim);
}


checkMsisdnAvailability(msisdn: string) {
  console.log('MSISDN reçu dans le service :', msisdn);
  return this.httpClient.get<boolean>(`${this.API_URL}${this.ENDPOINT_SIMCARDS}/checkMsisdn/${msisdn}`)
    .pipe(
      catchError(() => throwError(false))
    );
}

checkIpAddressAvailability(ipAddress: string) {
  return this.httpClient.get<boolean>(`${this.API_URL}${this.ENDPOINT_SIMCARDS}/checkIpAddress/${ipAddress}`);
}




  
}
