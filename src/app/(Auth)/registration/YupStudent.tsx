import * as Yup from "yup";

const StudentValidationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Full name is required")
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      "Full name should not start with a space, number, or special symbol"
    ),

  email: Yup.string()
    .matches(/^\S.*$/, "Email must not start with a space")
    .required("Email is required")
    .email("Invalid email address"),

  username: Yup.string()
    .required("Username is required")
    .matches(/^\S/, "username must not start with a space"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(
      /^(?!\s)(?=.*[A-Z])/,
      "Password must not begin with a space and contain at least one uppercase letter"
    ),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null as any], "Passwords must match")
    .required("Confirm password is required"),

  interested_categories: Yup.string()
    .required("intrest is required")
    .matches(/^\S/, "interested_categories must not start with a space"),
});

export default StudentValidationSchema;
