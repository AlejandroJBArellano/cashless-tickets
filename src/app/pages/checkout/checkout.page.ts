import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import Item from 'src/app/types/Item';
import Order from 'src/app/types/Order';
import User from 'src/app/types/User';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements  ViewDidEnter {

  public checkout: Item[] = [];
  public user: User;
  public returningMessage: string;
  private terminal: string;

  constructor(private checkoutService: CheckoutService,
  private auth: AuthService,
  private navController: NavController,
  private router: Router) { }


  ionViewDidEnter() {
    this.auth.getIpAdress().subscribe((res: {ip: string}) => {
      this.terminal = res.ip;
    });
    this.auth.getUser().then(async e => {
      this.user = e;
      this.checkoutService.getCheckout().then(checkout => {
        console.log(checkout);
        this.checkout = checkout;
        if(checkout.length === 0) {this.backToMenu();}
      });
    });
  }

  async deleteItem(item: Item){
    this.checkout = this.checkout.filter(eCheckout => eCheckout.checkoutId !== item.checkoutId);
    await this.checkoutService.goToCheckout(this.checkout);
    if(this.checkout.length === 0) {this.backToMenu();}{}
  }

  backToMenu(){
    this.router.navigateByUrl('/menu');
  }

  async payCheckout(paymentType){
    this.checkoutService.payCheckout({
      paymentType,
      items: this.checkout,
      userPin: this.user.pin,
      terminal: this.terminal
    }).then(async (e: {message: string; newOrder: Order}) => {
      console.log(e);
      // this.checkout = await this.checkoutService.getCheckout();
      this.returningMessage = 'Pago exitoso \n';
      this.returningMessage += e.message;
      this.backToMenu();
    });
  }

}
