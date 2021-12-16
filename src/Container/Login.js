import React from 'react'
import { LoginForm } from '../Components/LoginForm'
import { Grid, Typography,Card } from '@mui/material';
import { Box } from '@mui/system';
import Bg from '../Container/background.jpeg'

export const Login=()=>{
    return(
        <Box
            sx={{
                width:'100vw',
                height:'100vh',
                backgroundImage:`url(${Bg})`
            }}
        >
            <Typography variant='h3' sx={{paddingTop:'4vh',marginBottom:'2vw',color:'#fff'}}>
                Login
            </Typography>
            <Grid container xl={6} sx={{
                marginLeft:'auto',
                marginRight:'auto',
                }}>
                <Grid item xl={8} component={Card} sx={{padding:'24px',marginLeft:'auto',marginRight:'auto'}}>
                    <LoginForm/>
                </Grid>
                
            </Grid>
        </Box>
    )
}