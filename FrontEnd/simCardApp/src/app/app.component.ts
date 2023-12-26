// app.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { SimCardService } from './service/sim-card.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';
import { PopupService } from './service/popup.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CreateSimPopupComponent } from './createsim-popup/createsim-popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/lightbox.min.css', '../assets/css/main.css', '../assets/css/utility.css'],
  providers: [SimCardService],
})
export class AppComponent implements OnInit {
  title = 'simCardApp';
  simCards: any;
  displayedColumns: string[] = ['iccId', 'msisdn', 'pinCode','pukCode','tag','accessPointName','ipAddress','status','creationDate','actions'];
  dataSource = new MatTableDataSource<any>([]);
  isDetailPopupVisible = false;
  showPopup = false;
  selectedSim: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private simcardservice: SimCardService,private dialog: MatDialog, private popupService: PopupService ) {}

  ngOnInit(): void {
    console.log('OnInit method');
    this.simcardservice.getSimCards().subscribe((datas) => {
      this.simCards = datas;
      this.dataSource = new MatTableDataSource<any>(this.simCards);
      this.dataSource.paginator = this.paginator;
    });
    this.popupService.showDetailPopup$.subscribe((data) => {
      // Affichage la pop-up lorsque le service émet un événement
      this.isDetailPopupVisible = true;
    });
    this.popupService.closeDetailPopup$.subscribe(() => {
      // Fermeture de la pop-up lorsque le service émet un événement de fermeture
      this.isDetailPopupVisible = false;
    });
    this.simcardservice.modify$.subscribe((data) => {
      if (data) {
        
        this.modifier(data, data.iccId);
        
      console.log('Changements détectés dans le composant :', data);
      }
    });
    this.popupService.modificationComplete$.subscribe(() => {
      // Rafraîchir la liste des cartes SIM dès que la modification est terminée
      this.refreshSimCards();
    });
  }
 
  consulter(sim: any): void {
    const simId = sim.iccId; 
  
    this.simcardservice.getSimCardById(simId).subscribe(
      (simDetails) => {
        this.popupService.showDetailPopup(simDetails);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la carte SIM :', error);
      }
    );
  }

  modifier(sim: any, id: string): void {
    this.simcardservice.updateSimCard(sim, id).subscribe(
      (response) => {
        console.log('Modification réussie :', response);
      },
      (error) => {
        console.error('Erreur lors de la modification :', error);
  
      }
    );
  }

  closePopup() {
    // Fermez la pop-up
    console.log('Popup closed');
    this.popupService.closeDetailPopup();
  }

  openEditPopup(sim: any): void {
   
    const simId = sim.iccId; 
  
    this.simcardservice.getSimCardById(simId).subscribe(
      (simDetails) => {
        this.popupService.showDetailEditPopup(simDetails);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la carte SIM :', error);
      }
    );
  }

 
  
  


 


  confirmDelete(simId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       width: '400px', // Ajustez la largeur selon vos besoins
       data: { message: 'Êtes-vous sûr de vouloir supprimer cette carte SIM?' },
    });
 
    dialogRef.afterClosed().subscribe((result) => {
       if (result) {
          // Si l'utilisateur a confirmé la suppression
          this.deleteSimCard(simId);
       }
    });
 }
 
 deleteSimCard(simId: string): void {
    // Appeler votre service pour supprimer la carte SIM
    this.simcardservice.deleteSimCard(simId).subscribe(
       (response) => {
          console.log('Suppression réussie :', response);
          // Rafraîchir la liste après la suppression
          this.refreshSimCards();
       },
       (error) => {
          console.error('Erreur lors de la suppression :', error);
       }
    );
 }
 
 refreshSimCards(): void {
    // Appeler votre service pour récupérer la liste mise à jour des cartes SIM
    this.simcardservice.getSimCards().subscribe((datas) => {
       this.simCards = datas;
       this.dataSource = new MatTableDataSource<any>(this.simCards);
       this.dataSource.paginator = this.paginator;
    });
 }


 createNewSim(): void {
  // Ouvrez une pop-up ou effectuez toute autre action nécessaire pour la création d'une nouvelle carte SIM
  const dialogRef = this.dialog.open(CreateSimPopupComponent, {
    width: '400px', // ajustez la largeur en fonction de vos besoins
  });

  // Après la fermeture de la pop-up, rafraîchissez les données si nécessaire
  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'created') {
      // Rafraîchissez les données si nécessaire
      this.refreshSimCards();
    }
  });
}
}
