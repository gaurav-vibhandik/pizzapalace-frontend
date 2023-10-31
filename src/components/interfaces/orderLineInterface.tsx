export default interface OrderLine {
  orderLineId?: string;
  orderId?: string;
  pizzaId: string;
  size: string;
  crustId: string;
  quantity: number;
  extraCheese: boolean;
  toppingList: string[];
  totalPrice: number;
}
