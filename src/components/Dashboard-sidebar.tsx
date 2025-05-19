"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Home,
  BarChart,
  ShowChart,
  People,
  PieChart,
  Settings,
  Logout,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { title: "Sales", href: "/dashboard/sales", icon: ShowChart },
  { title: "Users", href: "/dashboard/users", icon: People },
  { title: "Reports", href: "/dashboard/reports", icon: PieChart },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Logout", href: "/login", icon: Logout },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <Box
      sx={{
        width: 256,
        flexShrink: 0,
        borderRight: 1,
        borderColor: theme.palette.divider,
        display: { xs: "none", md: "block" },
        bgcolor: theme.palette.background.default,
        height: "160vh",
        position: "relative",
        pb: 8,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Top nav items */}
        <List
          sx={{
            flex: 0,
            px: 2,
            py: 4,
            gap: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {sidebarItems.slice(0, -1).map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  sx={{
                    borderRadius: 1,
                    px: 3,
                    py: 2,
                    bgcolor: active
                      ? theme.palette.action.selected
                      : "transparent",
                    color: active
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                    "&:hover": {
                      bgcolor: theme.palette.action.hover,
                      color: theme.palette.text.primary,
                      transform: "scale(1.02)",
                    },
                    transition: "background-color 0.2s, transform 0.2s",
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <item.icon sx={{ fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: "medium",
                      color: "inherit",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Logout item */}
        {/* Logout item */}
        <Box sx={{ width: "100%", px: 2 }}>
          <List sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to logout?"
                  );
                  if (confirmed) {
                    logout();
                    router.replace("/login");
                  }
                }}
                sx={{
                  borderRadius: 1,
                  px: 3,
                  py: 2,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                    color: theme.palette.text.primary,
                    transform: "scale(1.02)",
                  },
                  transition: "background-color 0.2s, transform 0.2s",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Logout sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    variant: "body2",
                    fontWeight: "medium",
                    color: "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}
