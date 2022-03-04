import Item from './Item';

export default interface Order {
  _id?: string;
  items: Item[];
  paymentType: string;
  userPin: number;
  terminal: string;
  total?: number;
  showOrder?: boolean;
  createdAt?: string;
}
