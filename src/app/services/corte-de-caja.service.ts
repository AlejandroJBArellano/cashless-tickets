import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorteDeCajaService {
  public api = environment.api

  constructor(private router: NavController,
    private http: HttpClient) { }

  public makeCut(corte: any){
    return this.http.post(this.api + '/corte-de-caja', corte);
  }
  public getCalculo(terminal: string){
    return this.http.get(this.api + '/calculo-de-corte', {
      params: { terminal }
    });
  }
  public getOrderById(_id: string){
    return this.http.get(this.api, {params: { _id }});
  }
}
