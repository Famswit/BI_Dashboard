"use client";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import {
  People,
  Timeline,
  AttachMoney,
  ShoppingCart,
  ArrowUpward,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const metrics = [
  {
    title: "Total Users",
    value: "12,345",
    change: "+12%",
    changeColor: "success.main",
    changeIcon: ArrowUpward,
    changeText: "from last month",
    icon: People,
  },
  {
    title: "Active Sessions",
    value: "2,543",
    change: "+8%",
    changeColor: "success.main",
    changeIcon: ArrowUpward,
    changeText: "from yesterday",
    icon: Timeline,
  },
  {
    title: "Sales Revenue",
    value: "#550,000,050.00",
    change: "3%",
    changeColor: "error.main",
    changeIcon: ArrowUpward,
    changeText: "from last week",
    icon: AttachMoney,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+18%",
    changeColor: "success.main",
    changeIcon: ArrowUpward,
    changeText: "from last month",
    icon: ShoppingCart,
  },
];

export function MetricsCards() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr 1fr 1fr",
        },
        gap: 4,
        bgcolor: theme.palette.background.default,
        p: 4,
      }}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Card
            sx={{
              bgcolor: theme.palette.background.paper,
              border: 1,
              borderColor: theme.palette.divider,
              color: theme.palette.text.primary,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <CardHeader
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                pb: 2,
              }}
              title={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "medium", color: "text.secondary" }}
                >
                  {metric.title}
                </Typography>
              }
              action={
                <metric.icon sx={{ fontSize: 20, color: "text.disabled" }} />
              }
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                {metric.value}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "#a5d6a7",
                    fontWeight: 500,
                    mr: 0.5,
                  }}
                >
                  <metric.changeIcon sx={{ fontSize: 14, mr: 0.5, mb:1 }} />
                  {metric.change}
                </Box>
                {metric.changeText}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
}
