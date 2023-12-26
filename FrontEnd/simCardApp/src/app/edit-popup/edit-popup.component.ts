import { Component, Inject, OnInit } from '@angular/core';
import { PopupService } from '../service/popup.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimCardService } from '../service/sim-card.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private popupService: PopupService,
    private simcardservice: SimCardService,
    private dialogRef: MatDialogRef<EditPopupComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.initForm();

    // Configuration de la validation pour le MSISDN
    this.setupMsisdnValidation();

    // Configuration de la validation pour l'adresse IP
    this.setupIpAddressValidation();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      iccId: [this.data.iccId, [Validators.required]],
      msisdn: [this.data.msisdn, [Validators.required, Validators.maxLength(10)]],
      pinCode: [this.data.pinCode, [Validators.required, Validators.maxLength(4)]],
      pukCode: [this.data.pukCode, [Validators.required, Validators.maxLength(8)]],
      tag: [this.data.tag, [Validators.required, Validators.maxLength(7)]],
      accessPointName: [this.data.accessPointName, [Validators.required, Validators.pattern(/^APN\d{4}$/)]],
      ipAddress: [this.data.ipAddress, [Validators.required, this.validateIpAddress.bind(this)]],
      status: [this.data.status, [Validators.required]],
    });
  }


  validateIpAddress(control: AbstractControl): ValidationErrors | null {
    const ipAddress = control.value as string;

    // Format de l'adresse iP
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const isValidFormat = ipPattern.test(ipAddress);

    if (!isValidFormat) {
      return { 'ipAddressInvalidFormat': true };
    }

    // Appel du service pour vérifier si l'adresse IP est déjà présente
    const isAvailable = this.simcardservice.checkIpAddressAvailability(ipAddress);

    return isAvailable ? null : { 'ipAddressTaken': true };
  }


  // Méthode pour configurer la validation pour le MSISDN
  setupMsisdnValidation() {
    this.editForm.get('msisdn')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.simcardservice.checkMsisdnAvailability(typeof value === 'string' ? value : '')
        )
      )
      .subscribe(
        (isAvailable: boolean) => {
          const msisdnControl = this.editForm.get('msisdn');
          if (!isAvailable) {
            msisdnControl?.setErrors({ msisdnTaken: true });
          } else {
            msisdnControl?.setErrors(null);
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification du MSISDN :', error);
        }
      );
  }

  // Méthode pour configurer la validation pour l'adresse IP
  setupIpAddressValidation() {
    this.editForm.get('ipAddress')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.simcardservice.checkIpAddressAvailability(typeof value === 'string' ? value : '')
        )
      )
      .subscribe(
        (isAvailable: boolean) => {
          const ipAddressControl = this.editForm.get('ipAddress');
          if (!isAvailable) {
            ipAddressControl?.setErrors({ ipAddressTaken: true });
          } else {
            ipAddressControl?.setErrors(null);
          }
        },
        (error) => {
          console.error('Erreur lors de la vérification de l\'adresse IP :', error);
        }
      );
  }

  closePopup() {
    this.popupService.closeDetailPopup();
    this.dialogRef.close();
  }

  saveChanges(): void {
    if (this.editForm && this.editForm.valid) {
      const updatedData = {
        ...this.data,
        iccId: this.editForm.get('iccId')?.value,
        msisdn: this.editForm.get('msisdn')?.value,
        pinCode: this.editForm.get('pinCode')?.value,
        pukCode: this.editForm.get('pukCode')?.value,
        tag: this.editForm.get('tag')?.value,
        accessPointName: this.editForm.get('accessPointName')?.value,
        ipAddress: this.editForm.get('ipAddress')?.value,
        status: this.editForm.get('status')?.value,
        
      };

      this.simcardservice.updateSimCard(updatedData, this.data.iccId).subscribe(
        (response) => {
          console.log('Modification réussie :', response);
          this.dialogRef.close();
          this.popupService.completeModification();
        },
        (error) => {
          console.error('Erreur lors de la modification :', error);
        }
      );
    } else {
      console.log('Erreurs de validation du formulaire :', this.editForm?.errors);

      Object.keys(this.editForm?.controls || {}).forEach((key) => {
        console.log(`Erreurs pour le champ ${key} :`, this.editForm?.get(key)?.errors);
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
