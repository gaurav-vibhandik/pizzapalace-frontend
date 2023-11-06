import * as Yup from "yup";

export const ValidationSchemaForAdminDisplay_CreatePizzaForm = Yup.object({
  name: Yup.string()
    .trim()
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
