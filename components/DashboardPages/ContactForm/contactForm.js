import React from 'react';
import get from 'lodash/get';
import { Formik, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { contactFormValidation } from './validation';
import Loader from '../../../components/Loader';
import Feedback from '../../../components/Feedback';
import renderInputWrapper from '../../../helpers/formHelpers';
import { SEND_EMAIL } from '../../../graphql/actions/mutations';
import { getToken, getDecodedToken } from '../../../helpers/jwt';

const formInputFields = [
  {
    id: 'email',
    type: 'email',
  },
  {
    id: 'subject',
    type: 'text',
  },
  {
    id: 'message',
    multilineRows: 3,
    maxCharacters: 230,
  },
];

const ContactForm = () => {
  const user = getDecodedToken(getToken());
  const email = get(user, 'email');

  const initialFormValues = {
    email,
    subject: '',
    message: '',
  };

  const [sendEmail, { error, loading, data }] = useMutation(SEND_EMAIL);

  const handleSubmit = async (emailParams) => {
    try {
      await sendEmail({
        variables: {
          emailParams,
        },
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && (
        <Feedback
          open={!!error}
          feedbackMessage={error}
          severity='error'
          type='error'
        />
      )}
      {data && (
        <Feedback
          open={!!data}
          feedbackMessage='Message sent'
          severity='success'
          type='success'
        />
      )}
      <Card>
        <CardContent>
          <Formik
            initialValues={initialFormValues}
            validationSchema={contactFormValidation}
            onSubmit={ handleSubmit }
          >
            <Form>
              {formInputFields.map((field) => renderInputWrapper(field))}
              <Button
                variant="contained"
                type='submit'
                color="primary"
                fullWidth
              >
                SEND MESSAGE
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactForm;
