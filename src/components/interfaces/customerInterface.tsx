export default interface Customer {
  customerId?: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  emailAddress: string;
  password?: string;
}
