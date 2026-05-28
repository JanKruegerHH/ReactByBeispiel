// Filename - LoginForm.tsx

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// Define the type for the props passed
// to the LoginForm component
interface LoginFormProps {
    onSubmit: (
        username: string,
        password: string
    ) => void;
}

// Define the LoginForm component using
// the functional component syntax
export default function LoginForm(props: LoginFormProps) {

    // Define state variables for the
    // username and password input fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Define a function to handle form submission
    const handleSubmit =
        (event: React.FormEvent<HTMLFormElement>) => {

            // Prevent the default form submission behavior
            event.preventDefault();

            // Call the onSubmit prop
            props.onSubmit(username, password);
        };

    // Render the login form using MUI components
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <TextField
                sx={{ marginBottom: '1rem' }}
                label="Username"
                variant="outlined"
                value={username}

                // Update the value of the username state
                // variable when the input field changes
                onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
                sx={{ marginBottom: '1rem' }}
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                // Update the value of the password state variable
                // when the input field changes
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button
                sx={{ marginTop: '1rem' }}
                variant="contained"
                color="primary"
                type="submit"
            >
                Login
            </Button>
        </Box>
    );
}