import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText(/edd/i), 's');
    const errMessage = screen.getByText(/error/i);
    expect(errMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    const errArray = screen.getAllByText(/error/i);
    expect(errArray).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const fName = screen.getByPlaceholderText(/edd/i);
    const lName = screen.getByPlaceholderText(/burke/i);
    const button = screen.getByRole('button')
    userEvent.type(fName, 'Sarah');
    userEvent.type(lName, 'Guidry')
    userEvent.click(button);
    const errArray = screen.getAllByText(/error/i);
    expect(errArray).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByPlaceholderText(/bluebill1049/i);
    const button = screen.getByRole('button');

    userEvent.type(email, 'sarah.com');
    userEvent.click(button);
    expect(screen.getByText(/email must be a valid email address/i)).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/lastName is a required field/i)).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText(/edd/i), 'sarah');
    userEvent.type(screen.getByPlaceholderText(/burke/i), 'guidry');
    userEvent.type(screen.getByPlaceholderText(/bluebill/i), 'sarah@help.com');
    userEvent.click(screen.getByRole(/button/i));
    const fname = screen.getAllByText(/sarah/i);
    expect(fname).toHaveLength(2);
    const lname = screen.getAllByText(/Guidry/i);
    expect(lname).toHaveLength(1);
    expect(screen.getAllByText(/message/i)).toHaveLength(1);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    userEvent.type(screen.getByPlaceholderText(/edd/i), 'Sarah');
    userEvent.type(screen.getByPlaceholderText(/burke/i), 'Guidry');
    userEvent.type(screen.getByPlaceholderText(/bluebill/i), 'sarah@help.com');
    userEvent.type(screen.getByLabelText(/message/i), 'Turtles are fun!');
    userEvent.click(screen.getByRole('button'));
    const fname = screen.getAllByText(/sarah/i);
    expect(fname).toHaveLength(2);
    const lname = screen.getAllByText(/Guidry/i);
    expect(lname).toHaveLength(1);
    expect(screen.getAllByText(/message/i)).toHaveLength(2);


});