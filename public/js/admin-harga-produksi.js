const mongoose = require('mongoose');

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/sitani', { useNewUrlParser: true, useUnifiedTopology: true });

// Definisi model untuk data harga produksi
const HargaProduksi = mongoose.model('HargaProduksi', {
  namaProduk: String,
  harga: Number
});

// Fungsi untuk menambahkan data harga produksi
function addHargaProduksi(namaProduk, harga) {
  const newHargaProduksi = new HargaProduksi({
    namaProduk: namaProduk,
    harga: harga
  });

  newHargaProduksi.save((err) => {
    if (err) {
      console.error('Gagal menambahkan data harga produksi:', err);
    } else {
      console.log('Data harga produksi berhasil ditambahkan!');
      // Perbarui tabel harga produksi di halaman HTML
      updateTabelHargaProduksi();
    }
  });
}

// Fungsi untuk mengedit data harga produksi
function editHargaProduksi(id, namaProduk, harga) {
  HargaProduksi.findByIdAndUpdate(id, { namaProduk: namaProduk, harga: harga }, (err) => {
    if (err) {
      console.error('Gagal mengedit data harga produksi:', err);
    } else {
      console.log('Data harga produksi berhasil diedit!');
      // Perbarui tabel harga produksi di halaman HTML
      updateTabelHargaProduksi();
    }
  });
}

// Fungsi untuk menghapus data harga produksi
function deleteHargaProduksi(id) {
  HargaProduksi.findByIdAndDelete(id, (err) => {
    if (err) {
      console.error('Gagal menghapus data harga produksi:', err);
    } else {
      console.log('Data harga produksi berhasil dihapus!');
      // Perbarui tabel harga produksi di halaman HTML
      updateTabelHargaProduksi();
    }
  });
}

// Fungsi untuk memperbarui tabel harga produksi di halaman HTML
function updateTabelHargaProduksi() {
  const tabelHargaProduksi = document.getElementById('tabel-harga-produksi').querySelector('tbody');
  tabelHargaProduksi.innerHTML = ''; // Kosongkan tabel

  HargaProduksi.find({}, (err, data) => {
    if (err) {
      console.error('Gagal mengambil data harga produksi:', err);
    } else {
      data.forEach(hargaProduksi => {
        const row = tabelHargaProduksi.insertRow();
        row.insertCell().textContent = hargaProduksi._id;
        row.insertCell().textContent = hargaProduksi.namaProduk;
        row.insertCell().textContent = hargaProduksi.harga;
        const aksiCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
          // Tampilkan form edit data harga produksi dengan data yang dipilih
          fillEditFormHargaProduksi(hargaProduksi._id, hargaProduksi.namaProduk, hargaProduksi.harga);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.onclick = () => {
          deleteHargaProduksi(hargaProduksi._id);
        };
        aksiCell.appendChild(editButton);
        aksiCell.appendChild(deleteButton);
      });
    }
  });
}

// Fungsi untuk mengisi form edit data harga produksi
function fillEditFormHargaProduksi(id, namaProduk, harga) {
  // ... (Implementasi untuk mengisi form edit data harga produksi dengan data yang diberikan)
}

// Event listener untuk form tambah data harga produksi
document.getElementById('form-tambah-harga-produksi').addEventListener('submit', (event) => {
  event.preventDefault();
  const namaProduk = document.getElementById('nama-produk').value;
  const harga = document.getElementById('harga').value;
  addHargaProduksi(namaProduk, harga);
});

// Memuat data harga produksi saat halaman dimuat
updateTabelHargaProduksi();
