import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api-service';





@Injectable()
export class TripService extends APIService { 

    constructor(
        protected http: HttpClient,
    ) {super(http);}

    public getAllTripsByUsersFollowing(){
        return this.http.get(`${this.getApiUrl('trips_by_following')}`)
    }

    public getAllTripsImMate(){
        return this.http.get(`${this.getApiUrl('trips_im_mate')}`)
    }

    public getAllTrips(){
        return this.http.get(`${this.getApiUrl('trips_list')}`)
    }

    public createTrip(data:any){
        return this.http.post(`${this.getApiUrl('trip_create')}`, data)
    }

    public getTrip(id:number){
        return this.http.get(`${this.getApiUrl('trip_detail')}/${id}`)
    }

    public putTrip(id:number, data:any){
        return this.http.put(`${this.getApiUrl('trip_detail')}/${id}`, data)
    }

    public deleteTrip(id:number){
        return this.http.delete(`${this.getApiUrl('trip_detail')}/${id}`)
    }

    public addTripMate(tripId:number, userId:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${tripId}/add_mate/${userId}`, {})
    }

    public deleteTripMate(tripId:number, userId:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${tripId}/delete_mate/${userId}`, {})
    }

    public uploadImageTrip(tripId:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${tripId}/upload_image`, {})
    }

    public deleteImageTrip(tripId:number, imageIndex:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${tripId}/delete_image/${imageIndex}`, {})
    }

    public verifyTrip(id:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${id}/verify`, {})
    }

    public likeTrip(id:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${id}/like`, {})
    }

    public unLikeTrip(id:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${id}/unlike`, {})
    }

    public reportTrip(id:number){
        return this.http.post(`${this.getApiUrl('trip_detail')}/${id}/report`, {})
    }

}