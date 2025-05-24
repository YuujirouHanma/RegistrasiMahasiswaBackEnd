const API_BASE_URL = 'http://localhost:3000/api/mahasiswa';

// Mendapatkan semua data mahasiswa
async function getAllMahasiswa() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Gagal mendapatkan data mahasiswa');
    return await response.json();
}

// Mendapatkan data mahasiswa berdasarkan ID
async function getMahasiswaById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Gagal mendapatkan data mahasiswa dengan ID ' + id);
    return await response.json();
}

// Membuat data mahasiswa baru
async function createMahasiswa(data) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Gagal membuat data mahasiswa');
    return await response.json();
}

// Mengupdate data mahasiswa berdasarkan ID
async function updateMahasiswa(id, data) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Gagal mengupdate data mahasiswa dengan ID ' + id);
    return await response.json();
}

// Menghapus data mahasiswa berdasarkan ID
async function deleteMahasiswa(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Gagal menghapus data mahasiswa dengan ID ' + id);
    return await response.json();
}

// Mencari mahasiswa berdasarkan keyword nama
async function searchMahasiswa(keyword) {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(keyword)}`);
    if (!response.ok) throw new Error('Gagal melakukan pencarian mahasiswa');
    return await response.json();
}
