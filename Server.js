const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const menuRoutes = require("./routes/MenuRoutes");
const menuItemsRoutes = require('./routes/MenulistRoutes');
const itemRoutes = require('./routes/ItemsRoute');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// 🔹 Update CORS Configuration
const corsOptions = {
    origin: ['https://your-frontend-app.com'], // Change to your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// 🔹 Ensure API Routes Work
app.use("/api/menu", menuRoutes);
app.use("/api/menu-items", menuItemsRoutes);
app.use("/api/items", itemRoutes);

// 🔹 Serve React Frontend
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// 🔹 Fix MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
   
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
