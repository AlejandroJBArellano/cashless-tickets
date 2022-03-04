import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CorteDeCajaService } from 'src/app/services/corte-de-caja.service';
import CorteDeCaja from 'src/app/types/CorteDeCaja';
import Item from 'src/app/types/Item';
import Order from 'src/app/types/Order';
import User from 'src/app/types/User';

@Component({
  selector: 'app-corte-de-caja',
  templateUrl: './corte-de-caja.page.html',
  styleUrls: ['./corte-de-caja.page.scss'],
})
export class CorteDeCajaPage implements OnInit {

  user: User | null = null;
  checkouts = [0];
  totalInBox = 0;
  ip = '';
  ultimoCorteDeCaja: any = {};
  dataApi: any = {};
  orders: Order[] = [];
  inputEfectivoReal = 0;
  retiroOAbono = 0;
  corte: CorteDeCaja;

  constructor(private checkService: CheckoutService,
    private router: NavController,
    private session: AuthService,
    private corteService: CorteDeCajaService) { }

  ngOnInit() {
    this.session.getIpAdress().subscribe(
      (res: any) => {
        this.ip = res.ip;
        this.session.getUser().then(
          user => {
            this.user = user;
          }
        );
        this.corteService.getCalculo(this.ip).subscribe(
          (response: any) => {
            this.ultimoCorteDeCaja = response.ultimoCorteDeCaja;
            if(!this.ultimoCorteDeCaja){
              this.ultimoCorteDeCaja = {
                saldoFinalEfectivo: 0
              };
            }
            this.dataApi = response;
            this.orders = this.dataApi.ventasConsideradas.map((e: Order)=>{
              let total = 0;
              e.items.forEach((el: Item) => {
                total += el.price;
              });
              e.total = total;
              return e;
            });
            console.log(this.orders, this.dataApi);
          }
        );
      }
    );
  }
  hacerCorte(){
    this.corte = {
      ordenesEfectivo: this.dataApi.ventasConsideradas,
      saldoInicialEfectivo: this.ultimoCorteDeCaja,
      terminal: this.ip,
      user: {
        profileName: this.user.profile.profileName,
        completeName: this.user.completeName,
        pin: this.user.pin
      },
      saldoRealEfectivo: this.inputEfectivoReal,
      retiroOAbonoEfectivo: this.retiroOAbono,
    };
    console.log(this.corte);
    this.corteService.makeCut(this.corte).subscribe(
      res => {
        console.log(res)
        this.router.navigateBack('/menu')
      },
      err => console.error(err)
    );
  }
  orderById(_id: string){
    // eslint-disable-next-line no-underscore-dangle
    const orderFounded: Order = this.orders.find(order => order._id === _id);
    orderFounded.showOrder = !orderFounded.showOrder;
  }
}
