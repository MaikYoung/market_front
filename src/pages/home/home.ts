import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TokenService } from '../../providers/token-service';
import { UserService } from '../../providers/user-service';
import { TripService } from '../../providers/trip-service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public user:any = {}
  public tripsFollowing:any = []
  public nextPage:any;
  public reActiveInfinite: any = null
  public detail:any = {}
  public detailOpen:boolean = false

  constructor
  (
    public navCtrl: NavController,
    public tokenService: TokenService,
    public userService: UserService,
    public tripService: TripService,
    public translate: TranslateService
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
      console.log(this.tripsFollowing);
      
      this.nextPage = trips['next']
      if(event){
        this.reActiveInfinite = event
        event.complete()
      }
    }, error => {
      console.log("errorgettingtripsbyfollowing", error);
      
    })
    
  }

  refreshTrips(refresher){
    refresher.cancelable = false
    this.tripsFollowing = []
    this.tripService.getAllTripsByUsersFollowing().subscribe(trips => {
      for(let trip of trips['results']){
        this.tripsFollowing.push(trip)
      }
      this.nextPage = trips['next']
    }, error => {
      console.log("errorrefresher", error);
      
    })
    if(this.reActiveInfinite != null){this.reActiveInfinite.enable(true)}
    refresher.complete();
  }


  tripDetail(id:number){
    this.tripService.getTrip(id).subscribe(trip => {
      this.detail = trip
      console.log(this.detail);
      
    }, error => {

    })
  }

  showDetail(boolean:boolean, id:number){
    if(!this.detailOpen){
      this.tripDetail(id)
      this.detailOpen = boolean
    }else{
      this.detail = {}
      this.detailOpen = false
    }
    
  }

  giveLike(id:number){

    this.tripService.likeTrip(id).subscribe(data => {
      this.detail['likes'] = data
      this.detailOpen = true
      console.log(this.detail);
      
    }, error => {
      console.log("erroraldarlike", error);
      
    })
  }


}
