import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TokenService } from '../../providers/token-service';
import { UserService } from '../../providers/user-service';
import { TripService } from '../../providers/trip-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user:any = {}
  public tripsFollowing:any;
  public allTrips:any

  constructor
  (
    public navCtrl: NavController,
    public tokenService: TokenService,
    public userService: UserService,
    public tripService: TripService
    ) {
     this.loadAllData()
      
  }
  currentUser(){
    this.tokenService.getUser().subscribe(data => {
      this.userService.getUser(data['pk']).subscribe(user => {
        this.user = user
        console.log(this.user)
      }, error => {
        console.log("errorgettingcurrentuser", error);
        
      })
    })
  }

  loadAllData(){
    this.currentUser()
    if(this.user){
      this.tripService.getAllTripsByUsersFollowing().subscribe(trips => {
        this.tripsFollowing = trips
        console.log(this.tripsFollowing);
        
      }, error => {
        console.log("errorgettingtripsbyfollowing", error);
        
      })
      this.tripService.getAllTrips().subscribe(trips => {
        this.allTrips = trips
        console.log(this.allTrips);
        
      }, error => {
        console.log("errorgettingalltrips");
        
      })
    }
  }
}
