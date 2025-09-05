import * as yup from 'yup';
import React from 'react';
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const RenderError = (error = false) => {
  if (error)
    return (
      <div style={{ color: '#e32b2b' }} className="form-error">
        {error}
      </div>
    );
};

const MAX_FILE_SIZE = 10240000;
const validFileExtensions1 = {
  image: ['csv', 'pdf'],
};
function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions1[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

export const step1ValidationSchema = yup.object({
  name: yup.string().required('Please enter organization name'),
  logo: yup.string().required('Please select logo'),
  categoryId: yup.string().required('Please select category'),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email.',
    )
    .required('Required'),
  password: yup
    .string()
    .required('Please enter password.')
    .matches(
      /^(?=.*[A-Z])(?=.*[~!@#$%^&*()/_=+[\]{}|;:,.<>?-])(?=.*[0-9])(?=.*[a-z]).{8,14}$/,
      'Only accept One Uppercase and atleast one special characters and numbers.',
    )
    .min(8, 'Minimum 8 characters is required.'),
  attachments: yup.array().of(
    yup.object().shape({
      documentId: yup.string().required('Please Select document'),
      file: yup.string().required('Please upload file'),
    }),
  ),
  establishmentYear: yup.string().required('Please select establishment year'),
});

export const step2ValidationSchema = yup.object({
  addressLine1: yup.string().required('Please enter addressLine1'),
  addressLine2: yup.string().required('Please enter addressLine2'),
  city: yup.string().required('Please enter city'),
  state: yup.string().required('Please select state'),
  postalCode: yup.string().required('Please enter postalCode'),
  country: yup.string().required('Please select country'),
});

export const step3ValidationSchema = yup.object({
  contact: yup.object({
    firstName: yup.string().required('Please enter first Name'),
    lastName: yup.string().required('Please enter last Name'),
    mobile: yup
      .string()
      .required('Please enter mobile number')
      .min(7, 'Please enter valid mobile number')
      .max(13, 'Please enter valid mobile number'),
    email: yup
      .string()
      .required('Please enter email address')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter valid email.',
      )
      .required('Please enter email address'),
  }),
});

export const loginCodeValidationSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email.',
    )
    .required('Please enter email address'),
  password: yup.string().required('Please enter password.'),
  verificationCode: yup.string().required('Please enter verification code'),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email.',
    )
    .required('Please enter email address'),

  password: yup.string().required('Please enter password.'),
});

export const showInterestFormValidation = yup.object({
  organizationName: yup.string().required('Please enter organization Name'),
  fullName: yup.string().required('Please enter full Name'),
  designation: yup.string().required('Please enter designation'),
  mobile: yup
    .string()
    .required('Please enter mobile number')
    .min(7, 'Please enter valid mobile number')
    .max(13, 'Please enter valid mobile number'),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email.',
    )
    .required('Please enter email address'),
});

export const addSessionValidationSchema = yup.object({
  sessionName: yup.string().required('Required'),
  eventType: yup.string().required('Required'),
  dategeneral: yup.date().when('eventType', {
    is: 'general',
    then: () => yup.string().required('Required'),
    otherwise: () => yup.date().notRequired(),
  }),
  datelive: yup.date().when('eventType', {
    is: 'live',
    then: () => yup.string().required('Required'),
    otherwise: () => yup.date().notRequired(),
  }),
  template: yup.string().when('eventType', {
    is: 'general',
    then: () => yup.string().required('Required'),
    otherwise: () => yup.string().notRequired(),
  }),
  layout: yup.string().when('eventType', {
    is: 'live',
    then: () => yup.string().required('Required'),
    otherwise: () => yup.string().notRequired(),
  }),
  location: yup.string().when('eventType', {
    is: 'live',
    then: () => yup.string().required('Required'),
    otherwise: () => yup.string().notRequired(),
  }),
  csv: yup.mixed().when('eventType', {
    is: 'general',
    then: () =>
      yup
        .mixed()
        .test('is-valid-type', 'Not a valid  type', (value) =>
          isValidFileType(value && value.name.toLowerCase(), 'image'),
        )
        .test(
          'is-valid-size',
          'Max allowed size is 10MB',
          (value) => value && value.size <= MAX_FILE_SIZE,
        ),
    otherwise: () => yup.mixed().notRequired(),
  }),
});

export const UserSignupValidation = yup.object({
  firstname: yup.string().required('Please enter FirstName'),
  lastname: yup.string().required('Please enter LastName'),
  country: yup.string().required('Please enter Country Name'),
  mobile: yup
    .string()
    .required('Please enter mobile number')
    .min(7, 'Please enter valid mobile number')
    .max(13, 'Please enter valid mobile number'),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email.'),

  password: yup
    .string()
    .required('Please enter password.')
    .matches(
      /^(?=.*[A-Z])(?=.*[~!@#$%^&*()/_=+[\]{}|;:,.<>?-])(?=.*[0-9])(?=.*[a-z]).{8,14}$/,
      'Only accept One Uppercase and atleast one special characters and numbers.',
    )
    .min(8, 'Minimum 8 characters is required.'),
  isPrivacyAndTermAccept: yup
    .boolean()
    .oneOf([true], 'Please check Privacy Policy'),
});

export const UserSignInValidation = yup.object({
  email: yup
    .string()
    .required('Please enter email address')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please enter valid email.',
    ),

  password: yup.string().required('Please enter password.'),
});
export const userProfileValidation = yup.object({
  fullName: yup.string().required('Field is required'),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email address.'),
  dialCode: yup.string().required('Field is required'),
  mobile: yup.string().required('Field is required'),
  dateOfBirth: yup.string().required('Field is required'),
  gender: yup.string().required('Field is required'),
});
export const addressValidation = yup.object({
  formattedAddress: yup.string().required('Field is required'),
  city: yup.string().required('Field is required'),
  country: yup.string().required('Field is required'),
});
