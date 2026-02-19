import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip
} from "@mui/material";

function Bikes() {
  const [bikes, setBikes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    bikeId: "",
    name: "",
    brand: "",
    model: "",
    price: "",
    stock: "",
    minimumStock: 5,
    batteryCapacity: "",
    rangeKm: "",
    warrantyMonths: "",
    status: "active"
  });

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const res = await axios.get("/bikes");
      setBikes(res.data.data || []);
    } catch (error) {
      console.error("Fetch Bikes Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      let data;

      // Only use FormData if image exists
      if (image) {
        data = new FormData();
        Object.keys(formData).forEach((key) => {
          data.append(key, formData[key]);
        });
        data.append("image", image);
      } else {
        //  Otherwise send normal JSON
        data = formData;
      }

      if (editId) {
        await axios.put(`/bikes/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post("/bikes", data);
      }

      // Reset form
      setFormData({
        bikeId: "",
        name: "",
        brand: "",
        model: "",
        price: "",
        stock: "",
        minimumStock: 5,
        batteryCapacity: "",
        rangeKm: "",
        warrantyMonths: "",
        status: "active"
      });

      setImage(null);
      fetchBikes();

    } catch (error) {
      console.error("Bike Submit Error:", error);
    }
  };

  const handleEdit = (bike) => {
    setEditId(bike._id);
    setFormData({
      bikeId: bike.bikeId,
      name: bike.name,
      brand: bike.brand,
      model: bike.model,
      price: bike.price,
      stock: bike.stock,
      minimumStock: bike.minimumStock,
      batteryCapacity: bike.batteryCapacity,
      rangeKm: bike.rangeKm || "",
      warrantyMonths: bike.warrantyMonths || "",
      status: bike.status
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/bikes/${id}`);
      fetchBikes();
    } catch (error) {
      console.error("Delete Bike Error:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Bike Management
      </Typography>

      {/* FORM */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>

          <TextField label="Bike ID" name="bikeId" value={formData.bikeId} onChange={handleChange} />
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextField label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
          <TextField label="Model" name="model" value={formData.model} onChange={handleChange} />
          <TextField label="Battery Capacity" name="batteryCapacity" value={formData.batteryCapacity} onChange={handleChange} />

          <TextField label="Price" type="number" name="price" value={formData.price} onChange={handleChange} />
          <TextField label="Stock" type="number" name="stock" value={formData.stock} onChange={handleChange} />
          <TextField label="Minimum Stock" type="number" name="minimumStock" value={formData.minimumStock} onChange={handleChange} />
          <TextField label="Range (KM)" type="number" name="rangeKm" value={formData.rangeKm} onChange={handleChange} />
          <TextField label="Warranty (Months)" type="number" name="warrantyMonths" value={formData.warrantyMonths} onChange={handleChange} />

          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>

          <Box>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Box>

          <Button variant="contained" onClick={handleSubmit}>
            {editId ? "Update Bike" : "Add Bike"}
          </Button>

        </Box>
      </Paper>

      {/* TABLE */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Bike ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Battery</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bikes.map((bike) => (
              <TableRow key={bike._id}>

                <TableCell>
                  {bike.image && (
                    <img
                      src={`http://localhost:7000${bike.image}`}
                      alt="bike"
                      width="70"
                      style={{ borderRadius: "6px" }}
                    />
                  )}
                </TableCell>

                <TableCell>{bike.bikeId}</TableCell>
                <TableCell>{bike.name}</TableCell>
                <TableCell>{bike.brand}</TableCell>
                <TableCell>{bike.model}</TableCell>
                <TableCell>{bike.batteryCapacity}</TableCell>
                <TableCell>₹ {bike.price}</TableCell>

                <TableCell>
                  {bike.stock <= bike.minimumStock ? (
                    <Chip label={bike.stock} color="error" />
                  ) : (
                    bike.stock
                  )}
                </TableCell>

                <TableCell>
                  <Chip
                    label={bike.status}
                    color={bike.status === "active" ? "success" : "default"}
                  />
                </TableCell>

                <TableCell>
                  <Button size="small" onClick={() => handleEdit(bike)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDelete(bike._id)}
                  >
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Bikes;
