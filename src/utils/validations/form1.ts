import * as yup from 'yup';

const form1ValidationSchema = yup.object().shape({
  name: yup.string().required('This field is required.'),
  phone: yup.string().required('This field is required.'),
  id: yup.string().required('This field is required.'),
  area: yup.string().required('This field is required.'),
  interviewer: yup.string().required('This field is required.'),
});

export default form1ValidationSchema;