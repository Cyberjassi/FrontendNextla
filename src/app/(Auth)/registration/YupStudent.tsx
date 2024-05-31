import * as Yup from 'yup';

const StudentValidationSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  username: Yup.string().required('Username is required'),
  interested_categories: Yup.string().required('intrest is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null as any], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default StudentValidationSchema;