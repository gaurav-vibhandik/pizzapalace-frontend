import * as Yup from "yup";
//=====================================>
//<=================================================

//=====================================>
export const ValidationSchemaForAdminDisplay_CreatePizzaForm = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z]+$/, "Name must contain letters only")
    .min(2, "Pizza name must contain minimum 2 letters")
    .max(50)
    .required("Please enter pizza name"),
  description: Yup.string()
    .trim()
    .max(255, "Description excceds maximum character limit of 255")
    .required("Please enter pizza description"),
  type: Yup.string()
    .oneOf(["VEG", "NON_VEG"])
    .required("Please select pizza type"),
  imageUrl: Yup.string().required("Please provide pizza imageUrl"),
});
//<=================================================

//=====================================>
export const ValidationSchemaForAdminDisplay_CreateToppingForm = Yup.object({
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z]+$/, "Name must contain letters only")
    .min(2, "Topping name must contain a minimum of 2 letters")
    .max(50, "Topping name can not exceed 50 letters limit")
    .required("Please enter topping name"),
  type: Yup.string()
    //.default("VEG")
    .oneOf(["VEG", "NON_VEG"], "Topping type must be one of VEG or NON_VEG")
    .required("Please select topping type"),
  price: Yup.number()
    .min(0, "Topping price can not be negative")
    .required("Please enter price"),
  quantity: Yup.number()
    .min(0, "Quantity can not be negative")
    .required("Please provide quantity"),
});
//<=================================================

export const ValidationSchemaForAdminDisplay_CreatePizzaPriceForm = Yup.object({
  pizzaId: Yup.string()
    .trim()
    .matches(/^[A-Z0-9]{5}$/, "Name must be in format ZA000")
    .required("Please enter pizzaId"),
  crustId: Yup.string().required("Please select crustType"),
  pizzaSize: Yup.string().required("Please select pizzaSize"),
  price: Yup.number()
    .min(0, "Price can not be negative")
    .required("Please enter price"),
});
//<=================================================
