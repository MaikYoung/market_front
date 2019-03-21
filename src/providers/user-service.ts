import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService } from './api-service';
import { TokenService } from './token-service';
import 'rxjs/add/operator/do';


@Injectable()
export class UserService extends APIService {

    

    constructor(
        protected http: HttpClient,
        protected tokenService: TokenService
    ) { 
        super(http);
    }

    public userLogin(data){
        return this.http.post(this.getApiUrl('login'), data).do(response => {
            const responseToken = response as any; 
            const token = responseToken.token || null;
            if (token) {
                this.tokenService.setToken(token); 
            }
        });
    }

    public logout() {
        this.tokenService.setToken(null);
    }

    public isLogged() {
        return new Promise((resolve, reject) => {
            this.tokenService.getToken().then(value => {
            resolve((value != null));
            }).catch(error => {
            resolve(error);
            });
        })
    }

    public register(data:any){
        return this.http.post(`${this.getApiUrl('register')}`, data)
    }

    public usersList(){
        return this.http.get(`${this.getApiUrl('users_list')}`)
    }

    public userSearchByUserName(userName:string){
        return this.http.get(`${this.getApiUrl('users_list')}?username=${userName}`)
    }

    public getUser(id:number){
        return this.http.get(`${this.getApiUrl('user_detail')}/${id}`)
    }

    public putUser(id:number, data:any){
        return this.http.put(`${this.getApiUrl('user_detail')}/${id}`, data)
    }

    public deleteUser(id:number){
        return this.http.delete(`${this.getApiUrl('user_detail')}/${id}`)
    }

    public getUserFollowers(){
        return this.http.get(`${this.getApiUrl('user_detail')}/followers`)
    }

    public getUserFollowing(){
        return this.http.get(`${this.getApiUrl('user_detail')}/following`)
    }

    public addUserProfilePic(data:any){
        return this.http.put(`${this.getApiUrl('users_list')}`, data)
    }

    public addUserToFollowing(id:number){
        return this.http.post(`${this.getApiUrl('user_detail')}/addfollowing/${id}`, {})
    }

    public deleteUserFromFollowing(id:number){
        return this.http.post(`${this.getApiUrl('user_detail')}/deletefollowing/${id}`, {})
    }

    public deleteFollower(id:number){
        return this.http.post(`${this.getApiUrl('user_detail')}/deletefollower/${id}`, {})
    }
}
