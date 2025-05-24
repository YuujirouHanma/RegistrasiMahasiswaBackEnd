// Ambil elemen DOM
const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#mahasiswaTable tbody');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

async function renderTable(data = null) {
    const mahasiswaList = data || await getAllMahasiswa();
    tableBody.innerHTML = '';

    mahasiswaList.forEach((mhs, index) => {
        const umur = new Date().getFullYear() - mhs.tahunLahir;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${mhs.nama}</td>
            <td>${umur}</td>
            <td>${mhs.jenisKelamin}</td>
            <td>${mhs.jurusan}</td>
            <td>
                <button onclick="editData(${mhs.id})">Edit</button>
                <button onclick="hapusData(${mhs.id})">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const tahunLahir = parseInt(document.getElementById('tahunLahir').value);
    const alamat = document.getElementById('alamat').value;
    const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value;
    const jurusan = document.getElementById('jurusan').value;

    const data = { nama, tahunLahir, alamat, jenisKelamin, jurusan };

    await createMahasiswa(data);
    await renderTable();
    form.reset();
});

async function hapusData(id) {
    if (confirm("Yakin ingin menghapus data ini?")) {
        await deleteMahasiswa(id);
        await renderTable();
    }
}

searchBtn.addEventListener('click', async () => {
    const keyword = searchInput.value.trim();
    if (keyword === '') {
        await renderTable(); // Tampilkan semua
    } else {
        const result = await searchMahasiswa(keyword);
        renderTable(result);
    }
});

// Panggil saat halaman pertama kali dibuka
renderTable();
