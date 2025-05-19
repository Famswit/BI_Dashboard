"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { passwordValidtaion } from "@/schema/passwordValidation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidtaion,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Registration values:", values);
        login(false);
        setOpenSnackbar(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (error) {
        console.error("Registration failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      className="flex items-center justify-center min-h-screen px-4"
      sx={{ bgcolor: "#121212" }}
    >
      <Card
        className="w-full max-w-md flex flex-col"
        sx={{ bgcolor: "#1A1A1A", border: 1, borderColor: "#444444" }}
      >
        <Box className="px-5 pt-5">
          <Typography
            sx={{ fontSize: "25px", fontWeight: "bold", color: "#FFFFFF" }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            className="py-1"
            sx={{ color: "#E0E0E0" }}
          >
            Register to access your dashboard
          </Typography>
        </Box>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <FormControl fullWidth>
              <Typography sx={{ color: "#FFFFFF" }}>Full Name</Typography>
              <TextField
                id="fullName"
                name="fullName"
                size="small"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1"
                placeholder="John Doe"
                required
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#1A1A1A",
                    color: "#FFFFFF",
                    borderColor: "#444444",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444444",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <FormHelperText sx={{ color: "#F44336" }}>
                  {formik.errors.fullName}
                </FormHelperText>
              )}
            </FormControl>

            {/* Email */}
            <FormControl fullWidth>
              <Typography sx={{ color: "#FFFFFF" }}>Email</Typography>
              <TextField
                id="email"
                name="email"
                size="small"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1"
                placeholder="name@example.com"
                required
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#1A1A1A",
                    color: "#FFFFFF",
                    borderColor: "#444444",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444444",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText sx={{ color: "#F44336" }}>
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>

            {/* Password */}
            <FormControl fullWidth>
              <Typography sx={{ color: "#FFFFFF" }}>Password</Typography>
              <TextField
                id="password"
                name="password"
                size="small"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1"
                placeholder="Enter your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: "#FFFFFF" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#1A1A1A",
                    color: "#FFFFFF",
                    borderColor: "#444444",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444444",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText sx={{ color: "#F44336" }}>
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {/* Confirm Password */}
            <FormControl
              fullWidth
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
            >
              <Typography sx={{ color: "#FFFFFF" }}>
                Confirm Password
              </Typography>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                size="small"
                type={showConfirm ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1"
                placeholder="Re-enter your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm(!showConfirm)}
                        sx={{ color: "#FFFFFF" }}
                      >
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "#1A1A1A",
                    color: "#FFFFFF",
                    borderColor: "#444444",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444444",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <FormHelperText sx={{ color: "#F44336" }}>
                    {formik.errors.confirmPassword}
                  </FormHelperText>
                )}
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                bgcolor: "#1976D2",
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#1565C0" },
                "&.Mui-disabled": { bgcolor: "#666666", color: "#AAAAAA" },
              }}
            >
              {isLoading ? "Creating Account..." : "Register"}
            </Button>

            {/* Login Redirect */}
            <Typography
              variant="body2"
              className="text-center mt-2"
              sx={{ color: "#E0E0E0" }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400 text-sm hover:underline"
              >
                Login
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Registration successful, welcome to BI dashboard
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
