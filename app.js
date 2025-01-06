const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/My_Conteat_Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Create a schema and model
const contactSchema = new mongoose.Schema({
    name: String,
    email:{ String, },
    message: String,
    date: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

// Define routes
app.post('/submit', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).send({ message: 'Contact saved successfully!' });
    } catch (err) {
        res.status(500).send({ message: 'Error saving contact', error: err });
    }
});
app.get("/fetch",async (req,res)=>{
    try{
        const contacts = await Contact.find({});
        res.status(200).send(contacts);
    } catch(err){
        res.status(500).send({ message: 'Error fetching contacts', error: err });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
