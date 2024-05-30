const mongoose = require('mongoose');

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/sitani', { useNewUrlParser: true, useUnifiedTopology: true });

// Definisi model untuk artikel
const Artikel = mongoose.model('Artikel', {
  judul: String,
  isi: String
});

// Fungsi untuk menambahkan artikel
function addArtikel(judul, isi) {
  const newArtikel = new Artikel({
    judul: judul,
    isi: isi
  });

  newArtikel.save((err) => {
    if (err) {
      console.error('Gagal menambahkan artikel:', err);
    } else {
      console.log('Artikel berhasil ditambahkan!');
      // Perbarui tabel artikel di halaman HTML
      updateTabelArtikel();
    }
  });
}

// Fungsi untuk mengedit artikel
function editArtikel(id, judul, isi) {
  Artikel.findByIdAndUpdate(id, { judul: judul, isi: isi }, (err) => {
    if (err) {
      console.error('Gagal mengedit artikel:', err);
    } else {
      console.log('Artikel berhasil diedit!');
      // Perbarui tabel artikel di halaman HTML
      updateTabelArtikel();
    }
  });
}

// Fungsi untuk menghapus artikel
function deleteArtikel(id) {
  Artikel.findByIdAndDelete(id, (err) => {
    if (err) {
      console.error('Gagal menghapus artikel:', err);
    } else {
      console.log('Artikel berhasil dihapus!');
      // Perbarui tabel artikel di halaman HTML
      updateTabelArtikel();
    }
  });
}

// Fungsi untuk memperbarui tabel artikel di halaman HTML
function updateTabelArtikel() {
  const tabelArtikel = document.getElementById('tabel-artikel').querySelector('tbody');
  tabelArtikel.innerHTML = ''; // Kosongkan tabel

  Artikel.find({}, (err, data) => {
    if (err) {
      console.error('Gagal mengambil data artikel:', err);
    } else {
      data.forEach(artikel => {
        const row = tabelArtikel.insertRow();
        row.insertCell().textContent = artikel._id;
        row.insertCell().textContent = artikel.judul;
        row.insertCell().textContent = artikel.isi;
        const aksiCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
          // Tampilkan form edit artikel dengan data artikel yang dipilih
          fillEditForm(artikel._id, artikel.judul, artikel.isi);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.onclick = () => {
          deleteArtikel(artikel._id);
        };
        aksiCell.appendChild(editButton);
        aksiCell.appendChild(deleteButton);
      });
    }
  });
}

// Fungsi untuk mengisi form edit artikel
function fillEditForm(id, judul, isi) {
  // ... (Implementasi untuk mengisi form edit artikel dengan data yang diberikan)
}

// Event listener untuk form tambah artikel
document.getElementById('form-tambah-artikel').addEventListener('submit', (event) => {
  event.preventDefault();
  const judul = document.getElementById('judul').value;
  const isi = document.getElementById('isi').value;
  addArtikel(judul, isi);
});

// Memuat data artikel saat halaman dimuat
updateTabelArtikel();
