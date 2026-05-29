// Filename - components/ClickCounter.tsx

import React, {useState} from 'react';
// Importing MUI components Button and Typography
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Defining a functional component called
// ClickCounter
const ClickCounter: React.FC = () => {

    // Initializing the count state to 0
    // using the useState hook
    const [count, setCount] = useState(0);

    // Defining a function that updates the count
    // state when button is clicked
    const handleButtonClick = () => {
        setCount(count + 1);
    };

    // Return JSX elements that render the
    // click counter UI
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Click Counter
            </Typography>
            <Typography variant="body1" gutterBottom>
                You have clicked the button {count} times.
            </Typography>
            <Button variant="contained"
                    sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}
                    onClick={handleButtonClick}>
                Click me!
            </Button>
        </>
    );
};

// Exporting ClickCounter component
export default ClickCounter;