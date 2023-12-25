import { Component , Inject,Input  } from '@angular/core';
import { PopupService } from '../service/popup.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SimCardService } from '../service/sim-card.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})


export class EditPopupComponent {
  @Input() ngModel!: NgModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private popupService: PopupService,
    private simcardservice : SimCardService,
    private dialogRef: MatDialogRef<EditPopupComponent>,
    private router : Router
  ) {}

  closePopup() {
    // Fermer la pop-up
    this.popupService.closeDetailPopup();
    this.dialogRef.close();
  }

  saveChanges(): void {
    console.log('Données à envoyer côté client :', this.data);
    this.simcardservice.updateSimCard(this.data, this.data.iccId).subscribe(
      (response) => {
        console.log('Modification réussie :', response);
        // Fermeture la popup après avoir sauvegardé les modifications
        this.dialogRef.close();
        this.popupService.completeModification();
        
        
      },
      (error) => {
        console.error('Erreur lors de la modification :', error);
        console.error('Erreur côté client :', error.message);
        
      }
    );
  }


  cancel(): void {
    // Annuler la modification et fermer la popup
    this.dialogRef.close();
  }
  
}
