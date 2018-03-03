import React from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from 'material-ui/TextField';
import renderDatePicker from './MyDatePicker';


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

class AddForm extends React.Component {

render() {
  const { handleSubmit, pristine, reset, submitting } = this.props
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
            type="number"
            label="price"
        />
      </div>
      <div>
        <Field
            name="times"
            component={renderTextField}
            label="times"
            type="number"
        />
      </div>
      <div>
      Choose a day
        <Field
            name="day"
            component={renderDatePicker}
            label="day"
            className="inputDate"
        />
      </div>
        <button type="submit" disabled={pristine || submitting}>
          Save
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
    </form>
  )
}
}
export default reduxForm({
  form: 'AddForm', // a unique identifier for this form
  validate
})(AddForm)
