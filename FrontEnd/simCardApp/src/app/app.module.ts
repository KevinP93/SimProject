import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SimCardService } from './service/sim-card.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupService } from './service/popup.service';
import { DetailPopupComponent } from './detail-popup/detail-popup.component'; 
import { MatIconModule } from '@angular/material/icon';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DigitsOnlyDirective } from './directive/digits-only.directive';
import { IpAddressFormatDirective } from './directive/ipaddressformat.directive';
import { ApnFormatDirective } from './directive/apn-format.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CreateSimPopupComponent } from './createsim-popup/createsim-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    DetailPopupComponent,
    EditPopupComponent,
    DigitsOnlyDirective,
    ApnFormatDirective,
    IpAddressFormatDirective,
    ConfirmDialogComponent,
    CreateSimPopupComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule, 
    MatTableModule,
    MatDialogModule, 
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [SimCardService,PopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
