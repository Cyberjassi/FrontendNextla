import * as Yup from 'yup';

 export  const studyMaterialSchmea = Yup.object().shape({
  title: Yup.string()
    .min(5, 'Title must be at least 5 characters')
    .required('Title is required'),
  description: Yup.string().required('Description is required'),
  remarks: Yup.string().required('Remarks is required')
});
