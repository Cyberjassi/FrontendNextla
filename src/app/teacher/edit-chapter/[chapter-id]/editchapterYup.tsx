import * as Yup from "yup";

const editchapterMaterialSchmea = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be more than 3 letters")
    .matches(/^\S/, "Title must not start with a space"),
  description: Yup.string()
    .required("Description is required")
    .test(
      "word-count",
      "Description must be at least 5 words",
      (value) => value.trim().split(/\s+/).length >= 5
    )
    .test(
      "no-leading-space",
      "Description must not start with a space",
      (value) => !/^\s/.test(value)
    ),
  remarks: Yup.string()
    .required("Remarks is required")
    .matches(/^\S/, "Title must not start with a space"),
});
export default editchapterMaterialSchmea;
