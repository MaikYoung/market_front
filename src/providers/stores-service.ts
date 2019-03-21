import { APIService } from './api-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StoresService extends APIService {
  constructor(
    protected http: HttpClient)
    {
      super(http);
    }

    storesList(){
      return this.http.get(this.getApiUrl('stores_list'))
    }

    storesDetail(storeId){
      return this.http.get(this.getApiUrl('store_detail') + `${storeId}`)
    }

}
