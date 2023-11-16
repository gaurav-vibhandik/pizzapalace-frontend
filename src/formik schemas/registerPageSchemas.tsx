import * as Yup from "yup";
//=====================================>
export const ValidationSchemaForRegisterCustomer = Yup.object({
  firstName: Yup.string()
    .trim()
    .matches(/^[A-Za-z]{2,}$/, "firstName must contain letters only")
    .min(2, "firstName must contain minimum 2 letters")
    .max(30)
    .required("Please enter first name"),
  lastName: Yup.string()
    .trim()
    .matches(/^[A-Za-z]{2,}$/, "lastName must contain letters only")
    .min(2, "lastName must contain minimum 2 letters")
    .max(30),
  address: Yup.string()
    .trim()
    .max(255, "Address can not exceed beyond 255 letters"),
  phoneNumber: Yup.string()
    .trim()
    .max(20, "phoneNumber can not exceed 20 letters"),
  emailAddress: Yup.string()
    .trim()
    .max(70, "Email address can not exceed 70 letters")
    .required("Please enter your email address"),
  password: Yup.string()
    .trim()
    .max(70, "Password can not exceed 70 letters")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .trim()
    .max(70, "Password can not exceed 70 letters")
    .required("Please re-enter password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
//<=================================================

//customerId?: string;
// firstName: string;
// lastName: string;
// address: string;
// phoneNumber: string;
// emailAddress: string;
