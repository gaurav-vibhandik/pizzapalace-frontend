import OrderLine from "./orderLineInterface";

export default interface Order {
  customerId: string;
  orderLines: OrderLine[];
  deliveryAddress: string;
  totalAmount: number;
}
