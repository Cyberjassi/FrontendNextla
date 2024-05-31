import * as Yup from 'yup';

const CoursevalidationSchema = Yup.object().shape({
    
    category: Yup.string().required('Category is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  techs: Yup.string().required('Techs is required'),
});

export default CoursevalidationSchema;
