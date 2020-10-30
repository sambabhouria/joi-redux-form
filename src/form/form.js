import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import './form.css';

const Joi = require("@hapi/joi");

const postSchema = Joi.object().keys({
    title: Joi.string()
      .min(10)
      .max(140)
      .required(),
    authorName: Joi.string().required(),
    slug: Joi.string()
      .regex(/^[a-z0-9-]+$/)
      .required(),
    published: Joi.date()
      .iso()
      .required(),
    content: Joi.string()
});

const validate = values => {
  const { error } = postSchema.validate(values);
  console.log("errror", { ...error })
  if (error) {
    return error.details.reduce((result, item) => {
      result[item.path[0]] = item.message;
      return result;
    }, {});
  }

  return {};
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span style={{color:'red'}}>{error}</span>)}
    </div>
  </div>
);


class Form extends Component {

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
     <div id="register">
      <form onSubmit={handleSubmit}>
        <Field name="title" type="text" component={renderField} label="Title" />
        <Field
          name="authorName"
          type="text"
          component={renderField}
          label="Author Name"
        />
        <Field name="slug" type="text" component={renderField} label="Slug" />
        <Field
          name="published"
          type="date"
          component={renderField}
          label="Published"
        />
        <Field
          name="content"
          type="text"
          component={renderField}
          label="Content"
        />
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "post",
  validate
})(Form);
