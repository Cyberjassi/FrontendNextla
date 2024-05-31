import * as Yup from 'yup';

const TeacherValidationSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null as any], 'Passwords must match')
    .required('Confirm password is required'),
  qualification: Yup.string().required('Qualification is required'),
  mobile_no: Yup.string().required('Mobile number is required'),
  skills: Yup.string().required('Skills are required'),
//   profile_img: Yup.mixed().required('Profile image is required'),  // This assumes you're using a file input for profile_img
});

export default TeacherValidationSchema;
