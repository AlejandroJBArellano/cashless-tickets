import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { TerminalService } from 'src/app/services/terminal.service';
import Item from 'src/app/types/Item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements ViewDidEnter {
  menu: {_id: string; items: Item[]} | any = {};
  user: any = {};
  checkout: Item[] = [];
  totalToPay: any = 0; // apply reduce
  constructor(private auth: AuthService,
  private router: Router,
  private checkoutService: CheckoutService,
  private terminal: TerminalService) { }

  ionTabsDidChange(){
    console.log('IonTabsDidChange');
    this.checkoutService.getCheckout().then(
      checkout => {
        this.checkout = checkout;
      }
    );
  }

  ionViewDidEnter() {
    console.log('IonViewDidEnter');
    this.auth.getUser().then(e => {
      this.user = e;
      if(!this.user) {
        this.router.navigateByUrl('/login');
      } else {
        this.menu = this.user.menu;
        this.getCheckout().then(checkout => {
          console.log(checkout);
          this.totalToPay = 0;
          this.checkout = checkout ? checkout : [];
          this.checkout.forEach(item => {
            this.totalToPay += item.price;
          });
        });
      };
    });
  }

  async addItemToCheckout(item: Item){
    this.checkout.push({...item, checkoutId: `${this.checkout.length}`});
    this.totalToPay += item.price;
    await this.checkoutService.goToCheckout(this.checkout);
  }
  async deleteItem(item: Item){
    this.checkout = this.checkout.filter(e => e.checkoutId !== item.checkoutId);
    this.totalToPay -= item.price as number;
    await this.checkoutService.goToCheckout(this.checkout);
  }
  async logOut(){
    await this.auth.logOut();
    await this.terminal.removeTerminal();
    this.router.navigateByUrl('/login');
  }
  async payCheckout(){
    await this.checkoutService.goToCheckout(this.checkout);
    this.router.navigateByUrl('/checkout');
  }
  async getCheckout(){
    return await this.checkoutService.getCheckout();
  }
  async deleteOrder(){
    await this.checkoutService.goToCheckout([]);
    this.getCheckout().then(checkout => {
      this.totalToPay = 0;
      this.checkout = checkout;
      checkout.forEach(item => {
        this.totalToPay += item.price;
      });
    });;
  }
  goToRoute(route: string){
    this.router.navigateByUrl(`/${route}`)
  }
}
