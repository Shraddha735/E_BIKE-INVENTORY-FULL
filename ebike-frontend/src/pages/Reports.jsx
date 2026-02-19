import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

function Reports() {
  const [report, setReport] = useState({
    revenue: 0,
    totalSales: 0,
    totalPurchases: 0,
    totalCustomers: 0,
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState({});

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [salesRes, purchasesRes, customersRes] =
        await Promise.all([
          axios.get("/sales"),
          axios.get("/purchases"),
          axios.get("/customers"),
        ]);

      const sales = salesRes.data.data || [];
      const purchases = purchasesRes.data.data || [];
      const customers = customersRes.data.data || [];

      const revenue = sales.reduce(
        (acc, sale) => acc + (sale.totalAmount || 0),
        0
      );

      // Monthly revenue grouping
      const monthly = {};

      sales.forEach((sale) => {
        const month = new Date(sale.createdAt)
          .toLocaleString("default", { month: "long" });

        if (!monthly[month]) {
          monthly[month] = 0;
        }

        monthly[month] += sale.totalAmount || 0;
      });

      setMonthlyRevenue(monthly);

      setReport({
        revenue,
        totalSales: sales.length,
        totalPurchases: purchases.length,
        totalCustomers: customers.length,
      });

    } catch (err) {
      console.error("Report Fetch Error:", err);
    }
  };

  const ReportCard = ({ title, value }) => (
    <Card sx={{ minHeight: 120, mb: 3 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" sx={{ mt: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Reports Overview
      </Typography>

      <Box>
        <ReportCard title="Total Revenue" value={`₹ ${report.revenue}`} />
        <ReportCard title="Total Sales" value={report.totalSales} />
        <ReportCard title="Total Purchases" value={report.totalPurchases} />
        <ReportCard title="Total Customers" value={report.totalCustomers} />
      </Box>

      <Paper sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Monthly Revenue
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Revenue</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(monthlyRevenue).map((month) => (
              <TableRow key={month}>
                <TableCell>{month}</TableCell>
                <TableCell>₹ {monthlyRevenue[month]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Reports;
