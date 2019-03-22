import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../providers/user-service';
import { TabsPage } from '../tabs/tabs';
import { TokenService } from '../../providers/token-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb : FormBuilder,
    private userService: UserService,
    public tokenService: TokenService
    ) {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  ionViewDidLoad() {
    
  }

  login(){
    let data = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.userService.userLogin(data).subscribe(() => {
      this.navCtrl.setRoot(TabsPage)
    }, error => {
      console.log("error login", error)
    })
  }
}
