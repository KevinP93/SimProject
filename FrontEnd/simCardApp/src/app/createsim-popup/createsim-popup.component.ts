import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SimCardService } from '../service/sim-card.service';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators,FormControl, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-createsim-popup',
  templateUrl: './createsim-popup.component.html',
  styleUrls: ['./createsim-popup.component.css'],
})
export class CreateSimPopupComponent implements OnInit {
  simCardForm: FormGroup;

  msisdn: string = '';
  pinCode: string = '';
  pukCode: string = '';
  tag: string = '';
  accessPointName: string = '';
  ipAddress : string = '';
  status: string = '';
  creationDate: Date = new Date();

  constructor(private dialogRef: MatDialogRef<CreateSimPopupComponent>, private simcardservice: SimCardService, private fb: FormBuilder) {
    this.simCardForm = this.fb.group({
      msisdn: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.maxLength(4)]],
      pukCode: ['', [Validators.required, Validators.maxLength(8)]],
      tag: ['', [Validators.required, Validators.maxLength(7)]],
      accessPointName: ['', [Validators.required, Validators.pattern(/^APN\d{4}$/)]],
      ipAddress: ['', [Validators.required], [this.validateIpAddress.bind(this)]],
      status: ['ACTIVATED'],
      creationDate: [new Date()],
    });
    
  
  }

  ngOnInit(): void {
    this.setupMsisdnValidation();
    //this.setupIpAddressValidation();
  }

  setupMsisdnValidation() {
    this.simCardForm.get('msisdn')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.simcardservice.checkMsisdnAvailability(typeof value === 'string' ? value : '')
        )
      )
      .subscribe(
        (isAvailable: boolean) => {
          const msisdnControl = this.simCardForm.get('msisdn');
          console.log('MSISDN:', msisdnControl?.value);
          if (!isAvailable) {
            msisdnControl?.setErrors({ msisdnTaken: true });
          } else {
            // Remettez à zéro les erreurs si le MSISDN est disponible
            msisdnControl?.setErrors(null);
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification du MSISDN :', error);
          
        }
      );
  }

  validateIpAddress(control: AbstractControl): Observable<{ [key: string]: boolean } | null> {
    const ipAddress = control.value as string;
  
    // Vérifiez d'abord si l'adresse IP est au bon format
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const isValidFormat = ipPattern.test(ipAddress);
  
    if (!isValidFormat) {
      return of({ 'ipAddressInvalidFormat': true });
    }
  
    // Appel du service pour vérifier si l'adresse IP est déjà présente
    return this.simcardservice.checkIpAddressAvailability(ipAddress).pipe(
      map((isAvailable: boolean) => {
        return isAvailable ? null : { 'ipAddressTaken': true };
      }),
      catchError(() => of(null))
    );
  }


  createSimCard(): void {
    if (this.simCardForm.valid) {
      const msisdnControl = this.simCardForm.get('msisdn');

      if (msisdnControl) {
        const msisdnValue = msisdnControl.value;

        this.simcardservice.checkMsisdnAvailability(msisdnValue).subscribe(
          (isAvailable) => {
            if (isAvailable) {
              const simCardData = {
                msisdn: msisdnValue,
                pinCode: this.simCardForm.get('pinCode')?.value,
                pukCode: this.simCardForm.get('pukCode')?.value,
                tag: this.simCardForm.get('tag')?.value,
                accessPointName: this.simCardForm.get('accessPointName')?.value,
                ipAddress: this.simCardForm.get('ipAddress')?.value,
                status: this.simCardForm.get('status')?.value,
                creationDate: this.creationDate
              };

              this.simcardservice.addSimCard(simCardData).subscribe(
                (response) => {
                  console.log('Création réussie :', response);
                  this.dialogRef.close('created');
                },
                (error) => {
                  console.error('Erreur lors de la création :', error);
                  // Gérer les erreurs liées à la création de la carte SIM ici
                }
              );
            } else {
              msisdnControl.setErrors({ msisdnTaken: true });
            }
          },
          (error) => {
            console.error('Erreur lors de la vérification du MSISDN :', error);
            // Gérer les erreurs liées à la vérification du MSISDN ici
            msisdnControl.setErrors({ msisdnInvalid: true });
          }
        );
      } else {
        console.error('Contrôle MSISDN introuvable dans le formulaire.');
      }
    } else {
      console.error('Formulaire invalide, veuillez remplir tous les champs correctement.');

      // Affichez les erreurs de validation dans la console
      console.log('Erreurs de validation du formulaire:', this.simCardForm.errors);

      // Affichez les erreurs spécifiques pour chaque champ dans la console
      Object.keys(this.simCardForm.controls).forEach((key) => {
        console.log(`Erreurs pour le champ ${key}:`, this.simCardForm.get(key)?.errors);
      });
    }
  }
  
  

  cancel(): void {
    // Annuler la création et fermer la pop-up
    this.dialogRef.close();
  }
}
