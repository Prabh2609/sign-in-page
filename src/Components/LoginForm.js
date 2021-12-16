import React, { useState } from 'react'
import {Button,Divider, Typography,Box,TextField,Snackbar,Alert,Card, Stack,InputLabel,Select,MenuItem,FormControl } from '@mui/material';
import { addData,auth,db } from '../Backend/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {doc, setDoc } from 'firebase/firestore';
import { useHistory } from "react-router";

export const LoginForm=()=>{
    const handleChange=(event)=>{
      
        switch(event.target.id){
            case 'fullName':
                setUser({...user,fullName:event.target.value})
                break
            case 'email':
                console.log(event.target.value)
                setUser({...user,email:event.target.value})
                break
            case 'dob':
                setUser({...user,dob:event.target.value})
                break
            case 'password':
                setUser({...user,password:event.target.value})
                break
            case 'gender':
                console.log('changed')
                break
            
        }
    }
    const history = useHistory();
    const handleClose=()=>{
      setOpen(false)
      setMsg(null)
    }
    const genderChange=(event)=>{
      setUser({...user,gender:event.target.value})
    }

    const  addData=(data,docId)=>{
      setOpen(true)
      setMsg('Adding data to database..')
      console.log(docId)
      try{
        const docRef = setDoc(doc(db,'users',docId),rem)
                        .then(()=>{
                          setOpen(true)
                          setMsg('Added To Database')
                          history.push('/welcome')
                        })
      }catch(e){
        console.log(e)
      }
  }

    const authProcess=(data)=>{
        createUserWithEmailAndPassword(auth,data.email,data.password)
      .then((cred)=>{
        delete data['password']
        addData(data,cred.user.uid)
      })
      .catch((err)=>{
        setOpen(true)
        if(err.code == 'auth/email-already-in-use'){
          setMsg('Account already exists, Logging in ...')
          signInWithEmailAndPassword(auth,data.email,data.password)
          .then(()=>{
            setOpen(true)
            setMsg('Logged In')
            history.push('/welcome')
          })
        }
        else(setMsg(err.code))
      })  
    }

    const onSubmit=()=>{
        let errorObj={
          fullNameError:null,
          emailError:null,
          dobError:null,
          passwordError:null,
          genderError:null
        };
        let error=false;
        for(const value in user){
            switch(value){
                case 'fullName':
                    let nameRegEx = /^[A-Za-z]{3,29}[ ]{0,1}[A-Za-z]{0,29}$/
                    console.log(nameRegEx.test(user.fullName))
                    if(!nameRegEx.test(user.fullName)){
                        errorObj.fullNameError = 'Name length should be greater than 3 and can only contains alphabets'
                        error = true;
                    }else{
                      errorObj.fullNameError = null
                        error = false;
                    }
                    break
                case 'email':
                    let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                    if(!user.email.match(emailRegEx))
                        {errorObj.emailError = 'Invalid Email'
                        error = true
                      }
                    else
                        {errorObj.emailError=null
                        error = false}
                    break
                case 'dob':
                    let today=new Date().toLocaleDateString();
                    let dob = new Date(user.dob).toLocaleDateString();
                    if(dob>today)
                          { 
                            error = true
                            errorObj.dobError='Invalid Date, DOB can not be from future'
                          }
                    else
                        {
                          errorObj.dobError = null
                          error = false
                        }
                    break
                case 'gender':
                    if(!user.gender){
                      errorObj.genderError='Field cannot be empty'
                      error=true
                    }else{
                      error = false
                      errorObj.genderError = null
                    }
                    break
                case 'password':
                    let passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
                    if(!user.password.match(passwordRegEx))
                       { errorObj.passwordError =' Password should have min 8 letter, with at least a symbol, upper and lower case letters and a number'
                      error = true}
                    else
                        {errorObj.passwordError=null 
                          error=false}
                    break
            }
            
        }
        setErrorText({
          fullNameError:errorObj.fullNameError,
          emailError:errorObj.emailError,
          dobError:errorObj.dobError,
          passwordError:errorObj.passwordError,
          genderError:errorObj.genderError
        })
        
        if(!error){
          authProcess(user)
          
          // addData(user,'abcdefghi')
        }
    }
    const [user,setUser]=useState({
        fullName:'',
        email:'',
        password:'',
        dob:'',
        gender:''
    })
    
    const [open,setOpen] = useState(false)
    const [msg,setMsg] = useState(null)

    const [errorText,setErrorText]=useState({
        fullNameError:null,
        passwordError:null,
        emailError:null,
        dobError:null,
        genderError:null
    })

    return(
        <Stack spacing={4}>
        
          <TextField
            id="fullName"
            label="Full Name"
            required
            error={errorText.fullNameError != null}
            helperText={errorText.fullNameError != null ? errorText.fullNameError:null}
            onChange={handleChange}
          />
          
          <TextField
            id="email"
            label="Email"
            type="email"
            error={errorText.emailError != null}
            helperText={errorText.emailError != null?errorText.emailError:null}
            onChange={handleChange}
            // inputRef={email}
            required
            
          />
          <TextField
            id="dob"
            helperText="Date of Birth"
            type="date"
            helperText={errorText.dobError != null ?errorText.dobError:null}
            error={errorText.dobError != null}
            // InputProps={{ inputProps: { max: `2021-11-26` } }}
            required
            onChange={handleChange} 
          />
          <TextField
            id="password"
            required
            error={errorText.passwordError != null}
            helperText={errorText.passwordError != null? errorText.passwordError : null}
            type="password"
            label='Password'
            onChange={handleChange}
            required
            
          />
          <FormControl fullWidth>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            id="gender"
            value={user.gender}
            label="Gender"
            onChange={genderChange}
            required
            error = {errorText.genderError != null}
            helpertext = {errorText.genderError}
          >
            <MenuItem  value={'Male'}>Male</MenuItem>
            <MenuItem  value={'Female'}>Female</MenuItem>
            <MenuItem  value={'Others'}>Others</MenuItem>
            <MenuItem  value={'Refuse to disclose'}>Refuse to disclose</MenuItem>
          </Select>
          </FormControl>
          <Button variant='contained' onClick={onSubmit}>
            Submit
          </Button>  
          
          
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{horizontal:'right',vertical:'bottom'}} onClose={handleClose} message={msg}>
          
        </Snackbar>
        
        
        {/* 
        <div>
        <TextField
          id="input-with-icon-textfield"
          label="TextField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        
        
        </div>
        
        <div>
        <TextField 
        label="Social Media" 
        color="secondary" 
        focused 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
        
        />
        </div>
   */}
        {/* 
        <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField 
        id="fullWidth"
        label="Social Media" 
        color="secondary" 
        focused 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkedInIcon />
            </InputAdornment>
          ),
        }}
        
        />
      </Box>
  
        */}
      </Stack>
    )
}