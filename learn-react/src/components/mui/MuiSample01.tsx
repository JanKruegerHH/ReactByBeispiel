import React from 'react';
import {Badge, Button, IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {badgeClasses} from "@mui/material/Badge";
import {styled} from "@mui/material/styles";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MuiSample01: React.FC = () => {

    const CartBadge = styled(Badge)(({theme}) => ({
        [`& .${badgeClasses.badge}`]: {
            top: -12,
            right: -6,
        },
    }));

    const nativeId = React.useId();
    const id = React.useId();

    return (
        <section>
            <div style={{padding: 20}}>
                <h2>MuiSample01</h2>
            </div>
            <div style={{padding: 20}}>
                <Button variant="contained" endIcon={<SendIcon/>} onClick={() => {
                    alert("Hello World!")
                }}>
                    Hello World!
                </Button>
            </div>
            <div style={{padding: 20}}>
                <IconButton>
                    <NotificationsNoneIcon fontSize="large"/>
                    <CartBadge badgeContent={2} color="primary" overlap="circular"/>
                </IconButton>
            </div>
            <div>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel htmlFor={`${nativeId}-select`}>Grouping</InputLabel>
                    <Select native defaultValue="" id={`${nativeId}-select`} label="Grouping">
                        <option aria-label="None" value=""/>
                        <optgroup label="Category 1">
                            <option value={1}>Option 1</option>
                            <option value={2}>Option 2</option>
                        </optgroup>
                        <optgroup label="Category 2">
                            <option value={3}>Option 3</option>
                            <option value={4}>Option 4</option>
                        </optgroup>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 120}}>
                    <InputLabel id={`${id}-label`} htmlFor={`${id}-select`}>
                        Grouping
                    </InputLabel>
                    <Select
                        defaultValue=""
                        id={`${id}-select`}
                        label="Grouping"
                        SelectDisplayProps={{
                            'aria-labelledby': `${id}-label`,
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <ListSubheader>Category 1</ListSubheader>
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <ListSubheader>Category 2</ListSubheader>
                        <MenuItem value={3}>Option 3</MenuItem>
                        <MenuItem value={4}>Option 4</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </section>
    );
}

export default MuiSample01;
