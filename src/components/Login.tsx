"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login values:", { ...values, keepLoggedIn });
        login(keepLoggedIn);
        router.push("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box
      className="flex items-center justify-center min-h-screen"
      sx={{ bgcolor: "#121212" }}
    >
      <Card
        className="w-full max-w-md flex flex-col gap-1"
        sx={{ bgcolor: "#1A1A1A", border: 1, borderColor: "#FFFFFF" }}
      >
        <Box sx={{ m: "18px" }}>
          <Typography
            sx={{ fontSize: "25px", fontWeight: "bold", color: "#FFFFFF" }}
          >
            Login
          </Typography>
          <Typography
            variant="body2"
            className="py-1"
            sx={{ color: "#E0E0E0" }}
          >
            Enter your credentials to access your dashboard
          </Typography>
        </Box>
        <CardContent>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 flex flex-col gap-3"
          >
            {/* Email Field */}
            <FormControl fullWidth>
              <Typography sx={{ color: "#FFFFFF" }}>Email</Typography>
              <TextField
                size="small"
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1"
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
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>

            {/* Password Field with Show/Hide */}
            <FormControl fullWidth>
              <div className="flex items-center justify-between mt-4">
                <Typography sx={{ color: "#FFFFFF" }}>Password</Typography>
                <Link href="#" className="text-sm underline text-blue-400">
                  Forgot password?
                </Link>
              </div>
              <TextField
                size="small"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
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
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>

            {/* Keep Me Logged In */}
            <FormControlLabel
              control={
                <Checkbox
                  id="keep-logged-in"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  sx={{
                    color: "#FFFFFF",
                    "&.Mui-checked": { color: "#FFFFFF" },
                  }}
                />
              }
              label="Keep me logged in"
              className="text-sm"
              sx={{ color: "#FFFFFF" }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              className="mt-4"
              sx={{
                bgcolor: "#1976D2",
                color: "#FFFFFF",
                "&:hover": { bgcolor: "#1565C0" },
                "&.Mui-disabled": { bgcolor: "#666666", color: "#AAAAAA" },
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            {/* Register Link */}
            <Typography
              variant="body2"
              className="text-center mt-4"
              sx={{ color: "#E0E0E0" }}
            >
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-300 hover:underline">
                Register
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
