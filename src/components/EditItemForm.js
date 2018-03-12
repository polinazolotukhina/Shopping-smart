import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from 'material-ui/TextField';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import renderDatePicker from './MyDatePicker';
import Upload from './Upload';


const validate = values => {
  const errors = {};
  const requiredFields = [
    'item',
    'price',
    'day'
];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.times < 0) {
    errors.times = 'Invalid amount of time'
  } else if (values.price < 0) {
      errors.price = 'Invalid price'
  }
  return errors
 }


const lessThan =   ({ otherField }) =>
  (value, previousValue, allValues) => value < allValues[otherField] ? value : previousValue
const greaterThan = otherField =>
  (value, previousValue, allValues) => value > allValues[otherField] ? value : previousValue


const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    hintText={label} fullWidth={true}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />

class EditItem extends React.Component {
  //   componentWillMount() {
  //   this.props.initialize({
  //       brand: this.props.data.brand,
  //       item: this.props.data.item,
  //       day: this.props.data.day,
  //       price: this.props.data.price
  //   });
  // }

render() {
  const { handleSubmit, pristine, reset, submitting, img } = this.props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="item"
          component={renderTextField}
          label="item"
        />
      </div>
      <div>
        <Field name="brand" component={renderTextField} label="brand" />
      </div>
      <div>
        <Field
            name="price"
            component={renderTextField}
            label="price(£)"
            type="number"
        />
      </div>
      <div>
        <Field
            name="times"
            component={renderTextField}
            label="times it was used"
            type="number"
        />
      </div>
      <div>

        <Field
            name="day"
            component={renderDatePicker}
            label="day"
            className="inputDate"
        />
      </div>
      <Upload img={img}/>
        <Button type="submit">
          Save
        </Button>
        <Button type="button" onClick={() => { browserHistory.push('/'); }}>
          Cancel
        </Button>
    </form>
);
}
}
export default reduxForm({
  form: 'EditItem', // a unique identifier for this form
  validate,
  initialValues: { min: 0, max: 0 }
})(EditItem);
