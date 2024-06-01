import * as Yup from 'yup';

const CoursevalidationSchema = Yup.object().shape({
    
    category: Yup.string().required('Category is required'),
    title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be more than 3 letters')
    .matches(/^\S/, 'Title must not start with a space'),
  description: Yup.string()
    .required('Description is required')
    .test(
      'word-count',
      'Description must be at least 5 words',
      value => value.trim().split(/\s+/).length >= 5
    ),
  price: Yup.string().required('Price is required'),
  techs: Yup.string().required('Techs is required').matches(/^\S/, 'Title must not start with a space'),
});

export default CoursevalidationSchema;
