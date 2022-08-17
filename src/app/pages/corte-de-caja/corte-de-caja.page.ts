import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CorteDeCajaService } from 'src/app/services/corte-de-caja.service';
import { TerminalService } from 'src/app/services/terminal.service';
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
  ip = '123.123.123';
  ultimoCorteDeCaja: any = {};
  dataApi: any = {};
  orders: Order[] = [];
  inputEfectivoReal = 0;
  retiroOAbono = 0;
  corte: CorteDeCaja;
  numbersKeyboard: number[] = [1,2,3,4,5,6,7,8,9, ,]
  optionRetiroOabono = "abonar"
  terminal = ""
  constructor(private checkService: CheckoutService,
    private router: NavController,
    private session: AuthService,
    private corteService: CorteDeCajaService,
    private terminalService: TerminalService) { }

  async ngOnInit() {
    this.terminal = await this.terminalService.getTerminal()
    this.session.getUser().then(
      user => {
        this.user = user;
      }
    );
    this.corteService.getCalculo(this.terminal).subscribe(
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
  hacerCorte(){
    this.corte = {
      ordenesEfectivo: this.dataApi.ventasConsideradas,
      saldoInicialEfectivo: this.ultimoCorteDeCaja,
      terminal: this.terminal,
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
  addNumberEfectivoReal(number: any){
    const input = this.inputEfectivoReal.toString() + number
    this.inputEfectivoReal = parseInt(input)
  }
  addNumberToRetitoOAbono(number: any){
    const input = this.retiroOAbono.toString() + number;
    this.retiroOAbono = parseInt(input)
    if(this.optionRetiroOabono === "retirar"){
      if(this.retiroOAbono > 0){
        this.retiroOAbono *= -1
      }
    }
  }
  deleteDigit(inputToChange:number, property: string){
    const input = inputToChange.toString().slice(0, -1);
    this[property] = input.length === 0 ? 0 : parseInt(input)
  }
  backToMenu(){
    this.router.navigateBack('/menu');
  }
  onChangeRetiroOAbono(){
    console.log('onChangeRetiroOAbono', this.optionRetiroOabono)
    // This function executes before the value changes
    if(this.optionRetiroOabono === "abonar"){
      if(this.retiroOAbono > 0){
        this.retiroOAbono *= -1
      }
    } else {
      if(this.retiroOAbono < 0){
        this.retiroOAbono *= -1
      }
    }
  }
}
