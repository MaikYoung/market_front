import { Component, OnInit } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TokenService } from '../../providers/token-service';
import { UserService } from '../../providers/user-service';
import { LoginPage } from '../login/login';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  public user:any;

  constructor(
    public userService: UserService,
    public navCtrl: NavController
    ) {
    
  
  }

  ngOnInit() {
    this.userService.isLogged().then(result => {
      if(!result){
        this.navCtrl.setRoot(LoginPage)
      }
    })
  }
}
