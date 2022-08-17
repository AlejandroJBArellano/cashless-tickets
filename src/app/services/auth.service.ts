import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {HttpClient} from '@angular/common/http';
import User from '../types/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionStorage: Storage | null = null;
  public api = environment.api

  constructor(private storage: Storage,
    private http: HttpClient) { }
  async init(){
    const storage = await this.storage.create();
    this.sessionStorage = storage;
  }

  public async setUser( value: any){
    if(!this.sessionStorage ) {
      await this.init();
    }
    await this.sessionStorage?.set('User', value);
  }

  public findUser(pin: string){
    return this.http.get(this.api + '/user-pin', {
      params: {
        pin
      }
    });
  }

  public async logOut(){
    if(!this.sessionStorage ) {
      await this.init();
    }
    await this.sessionStorage?.remove('User');
  }

  public async getUser(): Promise<User>{
    if(!this.sessionStorage ) {
      await this.init();
    }
    let user = {};
    await this.sessionStorage?.get('User').then(e => user = e);
    return user as User;
  }

  public getIpAdress(){
    return this.http.get('http://api.ipify.org/?format=json');
  };
}
