import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { StoresService } from '../../providers/stores-service';
import { EnterPage } from '../enter/enter';
import { StoreDetailPage } from '../store-detail/store-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader = this.loadingCtrl.create()

  public stores:any = []

  constructor(
    public navCtrl: NavController,
    public storesService: StoresService,
    public loadingCtrl: LoadingController,
    ) {

  }
  ionViewDidLoad(){
    this.getStoresList()
  }

  goBack(){
    this.navCtrl.setRoot(EnterPage)
  }

  getStoresList(){
    this.loader.present()
    this.storesService.storesList().subscribe(result => {
      this.stores = result
      this.loader.dismiss()
    }, error => {
      console.log("estoy en el error", error);
      this.loader.dismiss()
    })
  }

  goToStore(id){
    this.navCtrl.push(StoreDetailPage, {
      storeId: id
    })
  }

}
