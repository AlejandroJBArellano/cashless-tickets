import Order from './Order';
import User from './User';

export default interface CorteDeCaja {
  ordenesEfectivo?: Order[];
  saldoInicialEfectivo?: number;
  ventasEfectivo?: number;
  saldoEsperadoEfectivo?: number;
  faltanteOSobrante?: number;
  saldoRealEfectivo?: number;
  retiroOAbonoEfectivo?: number;
  saldoFinalEfectivo?: number;
  user?: User;
  terminal?: string;
  createdAt?: string;
  saldo?: number;
}
