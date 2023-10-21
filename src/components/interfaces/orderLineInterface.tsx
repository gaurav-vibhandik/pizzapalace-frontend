export default interface OrderLine {
  pizzaId: string;
  size: string;
  crustId: string;
  quantity: number;
  extraCheese: boolean;
  toppingList: [];
  orderLinePrice: number;
}
