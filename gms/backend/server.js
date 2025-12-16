const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (Ensure MongoDB is running locally)
mongoose.connect('mongodb://localhost:27017/gym_db')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// --- Database Models ---
// Schema for Members [cite: 15, 18]
const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    package: String, // Fee Package
    joinDate: Date
});
const Member = mongoose.model('Member', MemberSchema);

// Schema for Bills/Receipts [cite: 17, 25]
const BillSchema = new mongoose.Schema({
    memberId: String,
    memberName: String,
    amount: Number,
    date: { type: Date, default: Date.now },
    status: String
});
const Bill = mongoose.model('Bill', BillSchema);

// --- Routes ---

// 1. Admin Login (Simple simulation) [cite: 14]
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded for simplicity; in production use hashed passwords in DB
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, role: 'admin' });
    } else if (username === 'user' && password === 'user123') {
        res.json({ success: true, role: 'member' });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

// 2. Member Management [cite: 15, 16]
app.post('/api/members', async (req, res) => {
    const newMember = new Member(req.body);
    await newMember.save();
    res.json(newMember);
});

app.get('/api/members', async (req, res) => {
    const members = await Member.find();
    res.json(members);
});

// 3. Billing Management [cite: 17, 25]
app.post('/api/bills', async (req, res) => {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.json(newBill);
});

app.get('/api/bills', async (req, res) => {
    const bills = await Bill.find();
    res.json(bills);
});

// Start Server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});