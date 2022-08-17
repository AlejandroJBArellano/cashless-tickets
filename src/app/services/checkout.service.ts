import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import Item from '../types/Item';
import Order from '../types/Order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public api = environment.api;

  private checkoutStorage: Storage | null = null;

  constructor(private http: HttpClient,
  private storage: Storage,
  private authService: AuthService) {}

  async init(){
    const storage = await this.storage.create();
    this.checkoutStorage = storage;
  }
  public async conditionalStorage(){
    if(!this.checkoutStorage){
      await this.init();
    };
  }
  public async payCheckout(order: Order){
    await this.goToCheckout([]);
    return this.http.post(this.api + '/order', order).toPromise();
  }
  public async goToCheckout(checkout: Item[]){
    await this.conditionalStorage();
    await this.checkoutStorage.set('checkout', checkout);
  }
  public async getCheckout(): Promise<Item[]>{
    await this.conditionalStorage();
    let checkout: Item[] = [];
    await this.checkoutStorage.get('checkout').then( e => checkout = e);
    return checkout;
  }


}
