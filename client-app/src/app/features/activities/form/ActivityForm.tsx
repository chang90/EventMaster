import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';
import * as Yup from 'yup';
import MyTextInput from '../../../common/form/MyTextInput';
import MyTextArea from '../../../common/form/MyTextArea';
import MyDateInput from '../../../common/form/MyDateInput';
import MySelectInput from '../../../common/form/MySelectInput';
import {categoryOptions} from '../../../common/options/categoryOptions'

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

const ActivityForm: React.FC<Props> = ({ activity: selectedActivity, closeForm, createOrEdit, submitting }) => {

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    city: '',
    venue: ''
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  })

  const [activity] = useState(initialState);

  function handleFormSubmit(activity: Activity) {
    createOrEdit(activity);
  }

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik 
        validationSchema={validationSchema}
        enableReinitialize 
        initialValues={activity}
        onSubmit={values => handleFormSubmit(values)}>
        {({handleSubmit, isValid, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name='title' placeholder='Title' />
            <MyTextArea rows={3} placeholder='Description' name='description' />
            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
            <MyDateInput 
              placeholderText='Date' 
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa' />
            <Header content='Location Details' sub color='teal' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
            <Button
              disabled={submitting || !dirty || !isValid} 
              loading={submitting} floated='right' positive type='submit' content='Submit' />
            <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
          </Form>
        )}
      </Formik>

    </Segment>
  )
}

export default ActivityForm;