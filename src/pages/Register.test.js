import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Register from './Register'

//Register-komponentin renderöinti
test('(TEST) Render register form', () => {
    render(<Register/>);
});


//Arvojen syöttäminen lomakkeeseen
test('(TEST)Place input values', async () => {
    render(<Register/>);

    const user = userEvent.setup()
    const username = screen.getByTestId("User")
    const password = screen.getByTestId("Pw")
    
    await user.type(username, 'testaaja')
    await user.type(password, 'testaaja')

    expect(username).toHaveDisplayValue('testaaja')
    expect(password).toHaveDisplayValue('testaaja')
})
 
//Napin toiminta register-komponentissa
test('(TEST) submit button', async () => {
    render(<Register/>);
    const user = userEvent.setup()
    const sendButton = screen.getByTestId('submit')
    const status = screen.getByTestId('registerStatus')
    await user.click(sendButton)
    expect(status).toBeTruthy()
  })