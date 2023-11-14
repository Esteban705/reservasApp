import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { Alert, Container, createTheme } from "@mui/material";
import { Formik } from "formik";

export interface ILogin {
  handleSubmit: (event: any) => void;
  isLogin: boolean;
}

export const Login: React.FC<ILogin> = ({ handleSubmit, isLogin }) => {
  const defaultTheme = createTheme();

  return (
    <div>
      <main style={{ width: "100%" }}>
        <ThemeProvider theme={defaultTheme}>
          <Formik
            initialValues={{
              name: "",
              password: "",
            }}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(formikProps) => (
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                      fontSize: "20px",

                      "&:hover": {
                        backgroundColor: "inherit",
                        color: "inherit",
                      },
                    }}
                  >
                    Sign up
                  </Typography>
                  <Box
                    style={{ width: "100%" }}
                    component="form"
                    noValidate
                    onSubmit={formikProps.handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        {/* Reemplaza TextField con un input de Tailwind */}
                        <input
                          type="text"
                          required
                          className="w-full p-2 border rounded-md text-3xl"
                          placeholder="Usuario"
                          name="name"
                          onChange={formikProps.handleChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        {/* Reemplaza TextField con un input de Tailwind */}
                        <input
                          type="password"
                          required
                          className="w-full p-2 border rounded-md text-3xl mt-5"
                          placeholder="Contraseña"
                          name="password"
                          onChange={formikProps.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={(e) => {
                        e.preventDefault();
                        formikProps.handleSubmit();
                      }}
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontSize: "15px",
                        "&:hover": {
                          backgroundColor: "inherit",
                          color: "inherit",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                    <div>
                      {/* La alerta solo se mostrará si isLogin es true */}
                      {isLogin ? (
                        <Alert severity="error" style={{ fontSize: "15px" }}>
                          Contraseña o Usuario Incorrecto
                        </Alert>
                      ) : null}
                      {/* Resto del componente */}
                    </div>
                  </Box>
                </Box>
              </Container>
            )}
          </Formik>
        </ThemeProvider>
      </main>
    </div>
  );
};
