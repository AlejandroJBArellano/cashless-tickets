import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CorteDeCajaService {

  constructor(private router: NavController,
    private http: HttpClient) { }

  public makeCut(corte: any){
    return this.http.post('http://localhost:3000/corte-de-caja', corte);
  }
  public getCalculo(terminal: string){
    return this.http.get('http://localhost:3000/calculo-de-corte', {
      params: { terminal }
    });
  }
  public getOrderById(_id: string){
    return this.http.get('http://localhost:3000', {params: { _id }});
  }
}
