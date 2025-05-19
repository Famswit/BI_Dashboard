"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { mockData } from "./OrderData";

const statusColors: Record<RowData["status"], string> = {
  completed: "#4CAF50",
  cancelled: "#F44336",
  processing: "#FFCA28",
  pending: "#FF9800",
};

interface RowData {
  id: string | number;
  customer: string;
  status: "completed" | "cancelled" | "processing" | "pending";
  date: string;
  total: number;
}

export function DataTable() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const colors = useMemo(
    () => ({
      cardBg: isDark ? "#1A1A1A" : "#FFFFFF",
      border: isDark ? "#444444" : "#CCCCCC",
      text: isDark ? "#FFFFFF" : "#1A1A1A",
      subText: isDark ? "#E0E0E0" : "#555555",
      tableHeader: isDark ? "#333333" : "#F5F5F5",
      hoverBg: isDark ? "#333333" : "#EEEEEE",
      disabledBg: isDark ? "#222222" : "#F0F0F0",
      disabledText: isDark ? "#666666" : "#AAAAAA",
    }),
    [isDark]
  );

  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<RowData[]>(mockData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const rowsPerPage = 5;

  const filteredData = data.filter((row) =>
    row.customer.toLowerCase().includes(filterValue.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    row: RowData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    if (!selectedRow) return;
    const newData = data.filter((row) => row.id !== selectedRow.id);
    setData(newData);
    if (page > 0 && Math.ceil(newData.length / rowsPerPage) <= page) {
      setPage(page - 1);
    }
    handleMenuClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
    >
      <Card
        sx={{
          bgcolor: colors.cardBg,
          border: 1,
          borderColor: colors.border,
          color: colors.text,
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{ fontWeight: "medium", color: colors.text }}
            >
              Recent Orders
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: colors.subText }}>
              A list of recent orders from customers
            </Typography>
          }
          action={
            <Box sx={{ display: "flex", alignItems: "center", py: 2, maxWidth: 300 }}>
              <TextField
                placeholder="Filter by customer..."
                value={filterValue}
                onChange={(event) => setFilterValue(event.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: colors.cardBg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.border,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.text,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Box>
          }
        />
        <CardContent>
          <Box
            sx={{
              border: 1,
              borderColor: colors.border,
              borderRadius: 1,
              overflow: "auto",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: colors.tableHeader }}>
                <TableRow>
                  {["ID", "Customer", "Status", "Date", "Total", ""].map(
                    (head, i) => (
                      <TableCell
                        key={i}
                        sx={{
                          color: colors.text,
                          fontWeight: "medium",
                          position: "sticky",
                          top: 0,
                          bgcolor: colors.tableHeader,
                          p: 2,
                        }}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length ? (
                  paginatedData.map((row, index) => (
                    <motion.tr
                      key={index}
                      whileHover={{ scale: 1.02, backgroundColor: colors.hoverBg }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "table-row" }}
                    >
                      <TableCell sx={{ color: colors.text, p: 2 }}>
                        {row.id}
                      </TableCell>
                      <TableCell sx={{ color: colors.text, p: 2 }}>
                        {row.customer}
                      </TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <Box
                          sx={{
                            bgcolor: statusColors[row.status],
                            color: "#FFFFFF",
                            height: 24,
                            minWidth: 80,
                            borderRadius: 3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.75rem",
                          }}
                        >
                          {row.status.charAt(0).toUpperCase() +
                            row.status.slice(1)}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: colors.text, p: 2 }}>
                        {row.date}
                      </TableCell>
                      <TableCell sx={{ color: colors.text, p: 2 }}>
                        ${row.total.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ p: 2 }}>
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, row)}
                          sx={{ color: colors.text, "&:hover": { bgcolor: colors.hoverBg }, p: 1 }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{ color: colors.subText, textAlign: "center", minHeight: 96, p: 2 }}
                    >
                      <Typography variant="body2">No results.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, py: 2 }}
          >
            {["Previous", "Next"].map((label, i) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage((prev) => prev + (i === 0 ? -1 : 1))}
                  disabled={
                    i === 0
                      ? page === 0
                      : (page + 1) * rowsPerPage >= filteredData.length
                  }
                  sx={{
                    bgcolor: colors.hoverBg,
                    color: colors.text,
                    borderColor: colors.border,
                    "&:hover": { bgcolor: colors.tableHeader, borderColor: colors.text },
                    "&.Mui-disabled": {
                      bgcolor: colors.disabledBg,
                      color: colors.disabledText,
                      borderColor: colors.border,
                    },
                  }}
                >
                  {label}
                </Button>
              </motion.div>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: colors.cardBg,
            color: colors.text,
            border: 1,
            borderColor: colors.border,
          },
        }}
      >
        <MenuItem>View Details</MenuItem>
        <MenuItem>Copy ID</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Record</MenuItem>
      </Menu>
    </motion.div>
  );
}
