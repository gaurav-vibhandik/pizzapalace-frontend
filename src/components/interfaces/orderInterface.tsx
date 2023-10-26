import OrderLine from "./orderLineInterface";

export default interface Order {
  orderId?: string;
  customerId: string;
  status?: boolean;
  totalAmount: number;
  orderDateTime?: Date;
  deliveryAddress: string;
  orderLines: OrderLine[];
}

// ? represents property can be OPTIONAL(it will hold value as undefined irrespective of type provided for that property)
