"use client";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home & Garden", value: 200 },
  { name: "Sports", value: 150 },
  { name: "Books", value: 100 },
];

const COLORS = ["#4CAF50", "#1976D2", "#FF9800", "#F44336", "#AB47BC"];

{/** Pie Chart for category distribution */}
export function CategoryDistributionChart() {
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
              Category Distribution
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Sales by product category
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
            <PieChart width={500} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
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
                        <Typography variant="caption">{`Category: ${payload[0].name}`}</Typography>
                        <Typography variant="caption" component="div">
                          {`Sales: ${payload[0].value}`}
                        </Typography>
                      </Box>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
