// app.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { SimCardService } from './sim-card.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DetailPopupComponent } from './detail-popup/detail-popup.component';
import { PopupService } from './popup.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/lightbox.min.css', '../assets/css/main.css', '../assets/css/utility.css'],
  providers: [SimCardService],
})
export class AppComponent implements OnInit {
  title = 'simCardApp';
  simCards: any;
  displayedColumns: string[] = ['iccId', 'msisdn', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  isDetailPopupVisible = false;
  showPopup = false;
  selectedSim: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private simcardservice: SimCardService,private dialog: MatDialog, private popupService: PopupService) {}
 
  consulter(sim: any): void {
    const simId = sim.iccId; 
  
    this.simcardservice.getSimCardById(simId).subscribe(
      (simDetails) => {
        console.log('Popup shown');
        this.popupService.showDetailPopup(simDetails);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la carte SIM :', error);
      }
    );
  }

  closePopup() {
    // Fermez la pop-up
    console.log('Popup closed');
    this.popupService.closeDetailPopup();
  }



  ngOnInit(): void {
    console.log('OnInit method');
    this.simcardservice.getSimCards().subscribe((datas) => {
      this.simCards = datas;
      this.dataSource = new MatTableDataSource<any>(this.simCards);
      this.dataSource.paginator = this.paginator;
    });
    this.popupService.showDetailPopup$.subscribe((data) => {
      // Afficher la pop-up lorsque le service émet un événement
      this.isDetailPopupVisible = true;
    });
    this.popupService.closeDetailPopup$.subscribe(() => {
      // Fermer la pop-up lorsque le service émet un événement de fermeture
      this.isDetailPopupVisible = false;
    });
  }
}
