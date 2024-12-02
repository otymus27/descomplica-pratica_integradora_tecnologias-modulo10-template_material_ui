import React, { useState, useEffect } from "react";
import { 
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from '@mui/icons-material/Google';
import InputWithIcon from "../../components/InputIcon";

const Login = () => {
  return (
    <>

     <Box display="flex" alignItems="center" justifyContent="center" bgcolor="gray" minHeight="100vh">

          <Box               
               
               display="flex"
               flexDirection="column"        
               height="500px"
               alignItems="center"
               justifyContent="center"
               width="300px"
               alignContent="center"
               maxWidth="100%"
               bgcolor="white" 
          >
          <Box
               component="form"          
               display="flex"
               flexDirection="column"
               gap={2}
               maxWidth="360px"
               width="100%" 
          >         

               <InputWithIcon/>       


               <FormControlLabel
               control={<Checkbox value="remember" color="primary" required />}
               label="Lembrar-me"
               
               />
               <Button
                    type="submit"
                    onClick={() => alert("Entrar")}
                    variant="contained"
                    >
                    Entrar
               </Button>
          </Box>

          <Box
               width="100%"
               display="flex"
               justifyContent="space-between"
               maxWidth="360px"
               alignItems="center"
          >
               <Link href="" variant="body2">
               Esqueci minha senha
               </Link>
               <Link href="" variant="body2">
               Não tem conta? <br />
               Fazer cadastro
               </Link>
          </Box>

          <Box
               mt={4}
               display="flex"
               flexDirection="column"
               alignItems="space-between"
               gap={2}
               
          >
               <Button variant="outlined">
               <Box display="flex" alignItems="space-between" gap={2}>              
               <GoogleIcon/>      
               Entrar com Google
               
               </Box>
               </Button>

               <Button variant="outlined">
               <Box display="flex" alignItems="space-between" gap={2}>               
               <FacebookIcon />
               Entrar com Facebook
               </Box>
               </Button>
          </Box>
          </Box>

     </Box>

      
    </>
  );
};

export default Login;
