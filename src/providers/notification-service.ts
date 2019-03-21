import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api-service';





@Injectable()
export class NotificationService extends APIService { 

    constructor(
        protected http: HttpClient,
    ) {super(http);}

        public getNotifications(){
            return this.http.get(`${this.getApiUrl('user_notifications')}`)
        }

}