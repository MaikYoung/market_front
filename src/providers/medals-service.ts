import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api-service';





@Injectable()
export class MedalsService extends APIService { 

    constructor(
        protected http: HttpClient,
    ) {super(http);}

        public getUserMedals(){
            return this.http.get(`${this.getApiUrl('user_medals')}`)
        }

}