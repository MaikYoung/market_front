import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TokenService } from '../../providers/token-service';
import { UserService } from '../../providers/user-service';
import { TripService } from '../../providers/trip-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public user:any = {}
  public tripsFollowing:any = []
  public nextPage:any;

  constructor
  (
    public navCtrl: NavController,
    public tokenService: TokenService,
    public userService: UserService,
    public tripService: TripService
    ) {
      
      }

      ngOnInit(){
        this.currentUser()
      }

  currentUser(){
    this.tokenService.getUser().subscribe(data => {
      this.userService.getUser(data['pk']).subscribe(user => {
        this.user = user
        this.loadTrips()
        console.log(this.user)
      }, error => {
        console.log("errorgettingcurrentuser", error);
      })
    })
  }

  loadTrips(event=null){
    if(event && this.nextPage == null){return event.enable(false)}
    let call = (!event) ? this.tripService.getAllTripsByUsersFollowing() : this.tripService.getAllTripsByUsersFollowing(this.nextPage)
    call.subscribe(trips => { 
      for(let trip of trips['results']){
        this.tripsFollowing.push(trip)
      }
      this.nextPage = trips['next']
      if(event){event.complete()}
    }, error => {
      console.log("errorgettingtripsbyfollowing", error);
      
    })
    
  }


}
