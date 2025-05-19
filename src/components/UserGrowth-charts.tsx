"use client";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 600 },
  { month: "Mar", users: 800 },
  { month: "Apr", users: 1000 },
  { month: "May", users: 1200 },
  { month: "Jun", users: 1500 },
  { month: "Jul", users: 1800 },
  { month: "Aug", users: 2100 },
  { month: "Sep", users: 2400 },
  { month: "Oct", users: 2700 },
  { month: "Nov", users: 3000 },
  { month: "Dec", users: 3300 },
];

export function UserGrowthChart() {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      layout
    >
      <Card
        sx={{
          bgcolor: theme.palette.background.paper,
          border: 1,
          borderColor: theme.palette.divider,
          color: theme.palette.text.primary,
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{ fontWeight: "medium", color: "text.primary" }}
            >
              User Growth
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Monthly user acquisition
            </Typography>
          }
        />
        <CardContent>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              aspectRatio: "4/3",
              width: "100%",
              height: "300px",
              minHeight: "200px",
              position: "relative",
              overflow: "visible",
              "& > svg": { width: "100%", height: "100%" },
            }}
          >
            <BarChart
              data={data}
              width={500}
              height={300}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                stroke={theme.palette.divider}
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
              />
              <YAxis
                tick={{ fill: theme.palette.text.secondary }}
                axisLine={{ stroke: theme.palette.divider }}
                width={40}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Box
                        sx={{
                          bgcolor: theme.palette.background.default,
                          color: theme.palette.text.primary,
                          p: 1,
                          borderRadius: 1,
                          border: 1,
                          borderColor: theme.palette.divider,
                        }}
                      >
                        <Typography variant="caption">{`Month: ${label}`}</Typography>
                        <Typography variant="caption" component="div">
                          {`Users: ${payload[0].value}`}
                        </Typography>
                      </Box>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="users"
                fill={theme.palette.primary.main}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
