const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Melayani file statis dari folder saat ini (untuk front-end)
app.use(express.static(__dirname));

// Data sementara (in-memory)
let mahasiswa = [];
let currentId = 1;

// API endpoints

// GET semua mahasiswa
app.get('/api/mahasiswa', (req, res) => {
    res.json(mahasiswa);
});

// GET mahasiswa berdasarkan pencarian nama
app.get('/api/mahasiswa/search', (req, res) => {
    const q = req.query.q ? req.query.q.toLowerCase() : '';
    const hasil = mahasiswa.filter(m => m.nama.toLowerCase().includes(q));
    res.json(hasil);
});

// GET mahasiswa berdasarkan ID
app.get('/api/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = mahasiswa.find(m => m.id === id);
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }
});

// POST tambah mahasiswa baru
app.post('/api/mahasiswa', (req, res) => {
    // Validasi sederhana, bisa dikembangkan
    if (!req.body.nama || !req.body.tahunLahir || !req.body.jenisKelamin || !req.body.jurusan) {
        return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const data = { id: currentId++, ...req.body };
    mahasiswa.push(data);
    res.status(201).json(data);
});

// PUT update mahasiswa berdasarkan ID
app.put('/api/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mahasiswa.findIndex(m => m.id === id);
    if (index !== -1) {
        mahasiswa[index] = { id, ...req.body };
        res.json(mahasiswa[index]);
    } else {
        res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }
});

// DELETE mahasiswa berdasarkan ID
app.delete('/api/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = mahasiswa.findIndex(m => m.id === id);
    if (index !== -1) {
        mahasiswa.splice(index, 1);
        res.json({ message: 'Data dihapus' });
    } else {
        res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
