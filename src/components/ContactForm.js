import * as React from 'react'
import { useTheme } from '@emotion/react'
import { Alert, Form } from 'chaoskit/src/components'
import { misc } from 'chaoskit/src/assets/styles/utility'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'redaxios'
import qs from 'qs'
import to from 'await-to-js'
import FormField from 'chaoskit/src/components/FormField'

import StyledButton from './StyledButton'

const schema = yup.object().shape({
  'bot-field': yup.string().max(0),
  name: yup.string().required().trim().label('Name'),
  email: yup.string().required().email().trim().label('Email'),
  message: yup.string().required().trim().label('Message'),
})

const ContactForm = (props) => {
  const theme = useTheme()

  const methods = useForm({
    defaultValues: {
      'form-name': 'contact',
      'bot-field': '',
      name: '',
      email: '',
      message: '',
    },
    resolver: yupResolver(schema),
  })

  const [response, setResponse] = React.useState()

  const handleSubmit = async (data) => {
    const [, success] = await to(
      axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url: '/',
      })
    )

    if (success) {
      setResponse('success')
    } else {
      setResponse('error')
    }
  }

  return (
    <React.Fragment>
      {response === 'success' && (
        <Alert type="primary">Your message was sent successfully!</Alert>
      )}

      {response === 'error' && (
        <Alert type="danger">
          There was an error sending your message. Please try again later.
        </Alert>
      )}
      {!response && (
        <FormProvider {...methods}>
          <Form
            name="contact"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={methods.handleSubmit(handleSubmit)}
            {...props}
          >
            <input
              type="hidden"
              name="form-name"
              value="contact"
              ref={methods.register}
            />

            <FormField
              name="bot-field"
              css={[misc.hide]}
              autoComplete="new-password"
            />
            <FormField label="Name" name="name" required />
            <FormField label="Email" name="email" type="email" required />
            <FormField label="Message" name="message" required as="textarea" />
            <div css={{ marginTop: theme.space.large, textAlign: 'center' }}>
              <StyledButton
                loading={methods.formState.isSubmitting}
                actionType="submit"
                variation="submit"
              >
                Send Message
              </StyledButton>
            </div>
          </Form>
        </FormProvider>
      )}
    </React.Fragment>
  )
}

export default ContactForm
