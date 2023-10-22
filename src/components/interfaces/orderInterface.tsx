import OrderLine from "./orderLineInterface";

export default interface Order {
  customerId: string;
  orderLineList: OrderLine[];
  address: string;
  totalOrderAmount: number;
}
