"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Fade,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Notifications,
  Person,
  ExpandMore,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useThemeMode } from "@/lib/Theme-context";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function DashboardHeader() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { mode, toggleTheme } = useThemeMode();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: theme.palette.divider,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          height: 64,
          px: { xs: 2, md: 3 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Link
            href="/dashboard"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <BarChart
              sx={{ fontSize: 24, color: theme.palette.text.secondary }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              BI Dashboard
            </Typography>
          </Link>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
                transform: "scale(1.1)",
              },
              transition: "transform 0.2s, background-color 0.2s",
            }}
          >
            <Notifications sx={{ fontSize: 20 }} />
          </IconButton>

          <IconButton
            onClick={toggleTheme}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                bgcolor: theme.palette.action.hover,
                transform: "scale(1.1)",
              },
              transition: "transform 0.2s, background-color 0.2s",
            }}
          >
            {mode === "dark" ? (
              <DarkModeIcon sx={{ fontSize: 20 }} />
            ) : (
              <LightModeIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": { bgcolor: theme.palette.action.hover },
                transition: "background-color 0.2s",
              }}
            >
              <Person sx={{ fontSize: 20 }} />
            </IconButton>

            <Typography
              sx={{
                color: theme.palette.text.primary,
                display: { xs: "none", md: "inline-block" },
              }}
            >
              John Doe
            </Typography>

            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                  transform: "scale(1.1)",
                },
                transition: "transform 0.2s, background-color 0.2s",
              }}
            >
              <ExpandMore sx={{ fontSize: 16 }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 300 }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  minWidth: 160,
                  boxShadow: 3,
                  bgcolor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                },
              }}
            >
              <MenuItem
                disabled
                sx={{
                  opacity: 1,
                  fontWeight: 600,
                  py: 1,
                  color: theme.palette.text.secondary,
                }}
              >
                My Account
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  "&:hover": { bgcolor: theme.palette.action.hover },
                  transition: "background-color 0.2s",
                }}
              >
                <Person
                  sx={{
                    fontSize: 16,
                    mr: 1,
                    color: theme.palette.text.primary,
                  }}
                />
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  "&:hover": { bgcolor: theme.palette.action.hover },
                  transition: "background-color 0.2s",
                }}
              >
                <Settings
                  sx={{
                    fontSize: 16,
                    mr: 1,
                    color: theme.palette.text.primary,
                  }}
                />
                Settings
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  "&:hover": { bgcolor: theme.palette.action.hover },
                  transition: "background-color 0.2s",
                }}
              >
                <Logout
                  sx={{
                    fontSize: 16,
                    mr: 1,
                    color: theme.palette.text.primary,
                  }}
                />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
