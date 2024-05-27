import { Component, OnInit, model } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  qrActual = "";

  constructor(
    private plataform: Platform,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
      if(this.plataform.is("capacitor")){

        BarcodeScanner.isSupported().then();
        BarcodeScanner.checkPermissions().then();
        BarcodeScanner.removeAllListeners().then();

      }
  }

  async scanQr() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing:LensFacing.Back
     }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss()

    if(data){
      this.qrActual = data?.barcode?.displayValue
    }

  }

}
