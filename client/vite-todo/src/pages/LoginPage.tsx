import React from "react";
import {
  Box,
  InputLabel,
  Paper,
  Typography,
  FormControl,
  InputBase,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  FormHelperText,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { pink, grey } from "@mui/material/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: 244,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(12),
  })
  .required();

export const LoginPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log("submited");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        "& > :not(style)": {
          m: 1,
          width: 350,
          height: 500,
        },
      }}
    >
      <Paper elevation={24}>
        <Box sx={{ p: "35px" }}>
          <Typography variant="h6" color={grey[600]}>
            Login
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: "25px" }}
          >
            <FormControl variant="standard" sx={{ mt: "10px" }}>
              <InputLabel shrink htmlFor="email-input">
                Email
              </InputLabel>
              <BootstrapInput
                id="email-input"
                placeholder="Jon_voight@gmail.com"
                {...register("email")}
              />
              <FormHelperText error id="email-input" sx={{ height: "20px" }}>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
            {/*  */}
            <FormControl variant="standard" sx={{ mt: "10px" }}>
              <InputLabel shrink htmlFor="password-input">
                Password
              </InputLabel>
              <BootstrapInput
                id="password-input"
                placeholder="*******"
                {...register("password")}
              />
              <FormHelperText error id="password-input" sx={{ height: "20px" }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                />
              }
              label="Remember me?"
            />
            <Button
              sx={{
                mt: 4,
                width: 270,
                backgroundColor: pink[400],
                "&:hover": {
                  backgroundColor: pink[600],
                },
              }}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </Box>
          <Box sx={{ mt: "35px" }}>
            <Divider variant="middle" />
            <Divider variant="middle" />
            <Typography sx={{ mt: "15px", textAlign: "center" }}>
              Don't have an Account? Sign up
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
