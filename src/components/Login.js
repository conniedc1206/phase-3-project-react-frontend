import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmailIcon from '@mui/icons-material/Email';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NavSignUp from "./NavSignUp";



const defaultValues = {
  email: "",
  password: "",
};

function Login() {
 
  const [formValues, setFormValues] = useState(defaultValues);
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
// console.log(setFormValues)

const handleSubmit = (e) => {
  e.preventDefault();

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ ...formValues }),
  }

  fetch("/login", configObj)
    .then((res) => res.json())
    .then((data) => navigate(`/dashboard/${data.id}`))
 
  setFormValues(defaultValues)
}

const handleClickShowPassword = () => {
  setShowPassword((currentState) => !currentState)
};

  return (
    <>
      <NavSignUp />
      <form onSubmit={handleSubmit}> 
      <Grid container alignItems="center" justify="center" direction="column" marginTop="2%">
      <h2>Log in to your Book Space</h2>
        <Grid item sx={{ mb: 2 }}>
          <TextField
           InputLabelProps={{ shrink: true }}
           InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
            id="email"
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item sx={{ mb: 2 }}>
          <TextField
           InputLabelProps={{ shrink: true }}
           InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="start">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
            id="password-input"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formValues.password || ""}
            onChange={handleChange}
          />
        </Grid>

      <Button variant="contained" type="submit">
        Login
      </Button>

      </Grid>
    </form>
      <Grid container alignItems="center" justify="center" direction="column" sx={{mt: 2}}>
        <Grid item>
          <Button variant="contained" type="submit">
            Sign up instead
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;