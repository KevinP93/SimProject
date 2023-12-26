// popup.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetailPopupComponent } from '../detail-popup/detail-popup.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showDetailPopupSubject = new Subject<void>();
  private closeDetailPopupSubject = new Subject<void>();
  private dialogRef!: MatDialogRef<any>; 
  private modifySubject = new BehaviorSubject<any>(null);
  modify$ = this.modifySubject.asObservable();
  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();
  private modificationCompleteSubject = new Subject<void>();
  modificationComplete$ = this.modificationCompleteSubject.asObservable();

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

  showDetailEditPopup(data: any) {
    this.dialogRef = this.dialog.open(EditPopupComponent, {
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
    // On verifie si la popup est ouverte avant de la fermer
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.close();
    }
  }


  triggerModify(sim: any, id: string) {
    this.modifySubject.next({ sim, id });
  }

  refreshSimCards() {
    this.refreshSubject.next();
  }

  completeModification() {
    // Émettre un événement pour indiquer que la modification est terminée
    this.modificationCompleteSubject.next();
  }
}
