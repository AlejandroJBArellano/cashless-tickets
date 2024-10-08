import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { TerminalService } from 'src/app/services/terminal.service';
import Item from 'src/app/types/Item';
import Order from 'src/app/types/Order';
import User from 'src/app/types/User';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements  ViewDidEnter {

  public readonly XD = "XDXDXD"

  public checkout: Item[] = [];
  public user: User;
  public returningMessage: string;
  private terminal: string;
  public total: number = 0;
  constructor(private checkoutService: CheckoutService,
  private auth: AuthService,
  private router: Router,
  private terminalService: TerminalService) { }
  public processingCheckout = false

  ionViewDidEnter() {
    this.terminalService.getTerminal().then((res) => {
      this.terminal = res
    }).catch((e) => {
      console.log(e);
    });
    this.auth.getUser().then(async e => {
      this.user = e;
      this.checkoutService.getCheckout().then(checkout => {
        console.log(checkout);
        this.checkout = checkout;
        if(checkout.length === 0) {this.backToMenu();}
        for (const item of checkout) {
          this.total += item.price
        }
      });
    });
  }

  async deleteItem(item: Item){
    this.checkout = this.checkout.filter(eCheckout => eCheckout.checkoutId !== item.checkoutId);
    await this.checkoutService.goToCheckout(this.checkout);
    if(this.checkout.length === 0) {this.backToMenu();}{}
    this.total = 0;
    for (const item of this.checkout) {
      this.total += item.price
    }
  }

  backToMenu(){
    this.router.navigateByUrl('/menu');
  }

  async payCheckout(paymentType){
    this.processingCheckout = true
    this.checkoutService.payCheckout({
      paymentType,
      items: this.checkout,
      userPin: this.user.pin,
      terminal: this.terminal
    }).then((e: {message: string; newOrder: Order}) => {
      console.log(e)
      this.returningMessage = `${e.message}. Redirigiendo a menú.`;
      setTimeout(() => {
        this.processingCheckout = false
        this.backToMenu()
      }, 3000)
    }).catch((e) => {
      console.log(e);
      this.processingCheckout = false
    });
  }

}
