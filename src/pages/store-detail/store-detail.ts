import { StoresService } from './../../providers/stores-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.html',
})
export class StoreDetailPage {
  id:number = 0
  store:any = []
  loader = this.loadingCtrl.create()
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public storesService: StoresService
    ) {
      this.id = this.navParams.get('storeId')
      if(this.id != 0){
        this.getStoreDetail(this.id)
      }
  }

  ionViewDidLoad() {

  }

  getStoreDetail(id){
    this.loader.present()
    this.storesService.storesDetail(id).subscribe(data => {
      this.store = data['store']
      this.loader.dismiss()

    }, error => {
      console.log("errooooor", error);
      this.loader.dismiss()

    })
  }

}
