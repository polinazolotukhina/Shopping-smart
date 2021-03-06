import React from 'react';
import { Field, reduxForm } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from 'material-ui/TextField';
import { Button } from 'react-bootstrap';
import renderDatePicker from './MyDatePicker';
import Upload from './Upload';

const validate = values => {
  const errors = {};
  const requiredFields = ['item', 'price', 'brand', 'times', 'day'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.times < 0) {
    errors.times = 'Invalid amount of time';
  } else if (values.price < 0) {
    errors.price = 'Invalid price';
  }
  return errors;
};

const lessThan = ({ otherField }) => (value, previousValue, allValues) =>
  value < allValues[otherField] ? value : previousValue;
const greaterThan = otherField => (value, previousValue, allValues) =>
  value > allValues[otherField] ? value : previousValue;

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    fullWidth={true}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field name="item" component={renderTextField} label="item" />
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
            label="times it was used"
            type="number"
          />
        </div>
        <div>
          Day of purchase
          <Field
            name="day"
            component={renderDatePicker}
            label="day"
            className="inputDate"
          />
        </div>
        <Upload />
        <Button type="submit" disabled={pristine || submitting}>
          Save
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </form>
    );
  }
}
export default reduxForm({
  form: 'AddForm', // a unique identifier for this form
  validate
})(AddForm);
