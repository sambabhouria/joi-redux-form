import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import './form.css';

const Joi = require("@hapi/joi");


// schema a valider par etape
const postSchema = Joi.object().keys({
    title: Joi.string()
      .min(10)
      .max(140)
      .required(),
    //a required string must contain only alphanumeric characters
     //at least 3 characters long but no more than 30
     //must be accompanied by birthyear
    authorName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    // an integer between 1900 and 2013
    birthyear: Joi.number()
    .integer()
    .min(1900)
    .max(2013),
    // a valid email address string must have two domain parts e.g. example.com
    //TLD must be .com or .net , .fr
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
    slug: Joi.string()
      .regex(/^[a-z0-9-]+$/)
      .required(),
    published: Joi.date()
      .iso()
      .required(),
    content: Joi.string(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeatPassword: Joi.ref('password'),
    accessToken: [
      Joi.string(),
      Joi.number()
  ],
})
.with('authorName', 'birthyear')
.xor('password', 'accessToken')
.with('password', 'repeatPassword')
;

// fonction qui  prend en paramettre les inputes et retour l'erreur
   // si le schema n'est pas valide ou un objet vide
const validate = values => {
  console.log("values===", values)
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
        <Field name="birthyear" type="birthyear" component={renderField} label="Birth Year" />
        <Field name="email" type="text" component={renderField} label="Email" />
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
        <Field name="password" type="text" component={renderField} label="Password" />
        <Field name="repeatPassword" type="text" component={renderField} label="Repeat Password" />
        <Field name="accessToken" type="text" component={renderField} label="Access Token" />

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
