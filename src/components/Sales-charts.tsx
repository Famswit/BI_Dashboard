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
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 2780 },
  { month: "May", sales: 1890 },
  { month: "Jun", sales: 2390 },
  { month: "Jul", sales: 3490 },
  { month: "Aug", sales: 4000 },
  { month: "Sep", sales: 2780 },
  { month: "Oct", sales: 1890 },
  { month: "Nov", sales: 3578 },
  { month: "Dec", sales: 5000 },
];

export function SalesChart() {
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
          gridColumn: { xs: "span 1", lg: "span 2" },
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
              Sales Trends
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Monthly sales revenue for the current year
            </Typography>
          }
        />
        <CardContent>
          <Box
            sx={{
              bgcolor: theme.palette.background.paper,
              aspectRatio: "2/1",
              width: "100%",
              height: "300px",
              minHeight: "200px",
              position: "relative",
              overflow: "visible",
              "& > svg": { width: "100%", height: "100%" },
            }}
          >
            <LineChart
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
                tickFormatter={(value) => `$${value}`}
                axisLine={{ stroke: theme.palette.divider }}
                width={80}
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
                          {`Sales: $${payload[0].value}`}
                        </Typography>
                      </Box>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={theme.palette.success.main}
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
