import * as Yup from "yup";

const TeacherValidationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Full name is required")
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      "Full name should not start with a space, number, or special symbol"
    ),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
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

  qualification: Yup.string()
    .required("Qualification is required")
    .matches(/^\S/, "Qualification must not start with a space"),

  mobile_no: Yup.string()
    .required("Mobile number is required")
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits long "),

  skills: Yup.string()
    .required("Skills are required")
    .matches(/^\S/, "Qualification must not start with a space"),
});

export default TeacherValidationSchema;
