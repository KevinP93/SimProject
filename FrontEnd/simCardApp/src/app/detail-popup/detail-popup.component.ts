import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-detail-popup',
  templateUrl: './detail-popup.component.html',
  styleUrls: ['./detail-popup.component.css'],
})
export class DetailPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<DetailPopupComponent>
  ) {}

  closePopup() {
    // Fermer la pop-up
    this.popupService.closeDetailPopup();
    this.dialogRef.close();
  }
}
