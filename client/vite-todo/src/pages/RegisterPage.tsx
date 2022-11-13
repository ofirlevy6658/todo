import React from "react";
import {
  Box,
  InputLabel,
  Paper,
  Typography,
  FormControl,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  FormHelperText,
} from "@mui/material";
import { pink, grey } from "@mui/material/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerReq } from "../api/axios";
import { BootstrapInput } from "../ui/BootstrapInput";
import { useNavigate } from "react-router-dom";
type Inputs = {
  fullName: string;
  email: string;
  password: string;
};

const schema = yup
  .object({
    fullName: yup
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(16)
      .required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(12),
  })
  .required();

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const registerMutate = useMutation({
    mutationFn: (credinatils: {
      fullName: string;
      email: string;
      password: string;
    }) => registerReq(credinatils),
    onSuccess: (resp) => {
      console.log(resp);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (credinatils) => {
    registerMutate.mutate(credinatils);
  };

  const handleNavigate = () => {
    navigate("/login");
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
          height: 600,
        },
      }}
    >
      <Paper elevation={24}>
        <Box sx={{ p: "35px" }}>
          <Typography variant="h6" color={grey[600]}>
            Register
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: "25px" }}
          >
            {/* full name */}
            <FormControl variant="standard" sx={{ mt: "10px" }}>
              <InputLabel shrink htmlFor="fullname-input">
                Full Name
              </InputLabel>
              <BootstrapInput
                id="fullname-input"
                placeholder="Jon Voight"
                {...register("fullName")}
              />
              <FormHelperText error id="email-input" sx={{ height: "20px" }}>
                {errors.fullName?.message}
              </FormHelperText>
            </FormControl>
            {/* email */}
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
            {/*password*/}
            <FormControl variant="standard" sx={{ mt: "10px" }}>
              <InputLabel shrink htmlFor="password-input">
                Password
              </InputLabel>
              <BootstrapInput
                id="password-input"
                placeholder="*******"
                {...register("password")}
                type="password"
              />
              <FormHelperText error id="password-input" sx={{ height: "20px" }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
            {/* <FormControlLabel
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
            /> */}
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
              register
            </Button>
          </Box>
          <Box sx={{ mt: "35px" }}>
            <Divider variant="middle" />
            <Divider variant="middle" />
            <Typography sx={{ mt: "15px", textAlign: "center" }}>
              Already have an Account?
              <Box
                component="span"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={handleNavigate}
              >
                {" "}
                Login
              </Box>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
