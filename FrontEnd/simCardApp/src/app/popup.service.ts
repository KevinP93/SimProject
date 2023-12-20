// popup.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showDetailPopupSubject = new Subject<void>();
  private closeDetailPopupSubject = new Subject<void>();
  private dialogRef!: MatDialogRef<any>; 

  showDetailPopup$ = this.showDetailPopupSubject.asObservable();
  closeDetailPopup$ = this.closeDetailPopupSubject.asObservable();

  constructor(private dialog: MatDialog) {}

  showDetailPopup(data: any) {
    this.dialogRef = this.dialog.open(DetailPopupComponent, {
      data: data,
    });

    // Émettre un événement lorsque la popup est ouverte
    this.showDetailPopupSubject.next();

    // Suivre la fermeture de la popup
    this.dialogRef.afterClosed().subscribe(() => {
      this.closeDetailPopupSubject.next();
    });
  }

  closeDetailPopup() {
    // Vérifiez si la popup est ouverte avant de la fermer
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.close();
    }
  }
}
