# SEA-Cinema

SEA Cinema adalah website pemesenan tiket film, dengan memberikan kenyamanan pada pengguna yaitu membeli tiket secara online dan melakukan pembayaran tanpa perlu transaksi tunai

# Instalasi

1. Pastikan Anda memiliki Node.js terinstal di sistem Anda. Unduh dari https://nodejs.org  dan ikuti petunjuk instalasinya.
2. Salin repositori ini ke dalam folder lokal Anda.
3. Buka terminal dan arahkan ke direktori proyek.
4. Jalankan perintah berikut untuk menginsta depedensi :
   <h4>npm install</h4>
5. Penginstalan berhasil ketika folder node_modules sudah muncul pada direktori Anda.

# Konfigurasi
1. Buat file `.env` di direktori utama proyek Anda. Isi file tersebut dengan konfigurasi lingkungan yang diperlukan dalam format
  <h6>ACCESS_TOKEN_SECRET = </h6>
  <h6>DB_HOST = </h6>
  <h6>DB_USER = </h6>
  <h6>DB_PASSWORD = </h6>
  <h6>DB_NAME = </h6>
  
2. Isi entri `ACCESS_TOKEN_SECRET` dengan nilai kunci rahasia JWT yang Anda inginkan
3. Isi entri `DB_HOST` , `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` dengan nilai pengkonfigurasian database yang Anda miliki

(Catatan : Untuk data yang ada pada database, bisa diimport menggunakan file sql yang tersedia)

# Penggunaan
1. Jalankan perintah berikut untuk menjalankan proyek pada terminal direktori:
   <h4>npm run start</h4>
   Proyek akan dijalankan dan dapat diakses melalui `http://localhost:3000`
2. Setelah mengakses `http://localhost:3000` akan tampil halaman utama untuk menuju ke halaman signin
3. <h6>Sign Up</h6> : Masuk ke halaman signup jika belum memiliki akun, dengan memasukan username, password, name, dan age.
4. <h6>Sign In</h6> : Masuk ke halaman signin jika sudah memiliki akun, dengan memasukan username dan password
5. <h6>Menu Home</h6> : Setalah Login berhasil akan ditampilkan halaman home yang berisikan daftar film yang tersedia
6. <h6>Menu Balance</h6> : Sebelum melakukan pembelian tiket film, lakukan pengisian saldo untuk melanjutkan pembayaran transaksi tiket film
7. <h6>Buy Ticket</h6> : Menekan button `Buy Ticket` pada film yang diinginkan untuk membeli tiket tersebut.
8. Isikan jumlah tiket yang akan dibeli
9. Pilih nama tiket, lalu pilih 1 nomor kursi untuk per tiketnya, lalu menekan button `Add`, dan lakukan pada seluruh tiket yang dipunya.
10. Setelah semua tiket sudah memiliki nomor kursi, lalu menekan button `finish` untuk menyelesaikan transaksi, jika ingin membatalkan transaksi tekan button `cancel`
11. Proses Transaksi selesai
12. <h6>History Transc</h6> : Menu riwayat transaksi, anda dapat melihat seluruh transaksi yang anda lakukan, dan dapat membatalkan transaksi tersebut dengan menekan button `cancel`
13. <h6>Profile</h6> : Menu dropdown pada username yang ditampilkan, pada menu ini Anda dapat melihat data akun anda, dan melakukan pengeditan data tersebut dengan mengisikan username, name, age, new password, dan old password, sesuai dengan keinganan anda.
14. <h6>Logout</h6> : Berfungsi untuk keluar dari akun, dan kembali pada menu signin
15. Selesai

# Struktur Proyek
- /bin               # Tempat penyimpanan skrip untuk menjalankan server web
- /controllers       # Berisikan logika pada aplikasi
- /models            # Model basis data
- /public            # Berkas publik (CSS, Image, Js)
- /routes            # Rute aplikasi
- /views             # Templat tampilan aplikasi
- app.js             # Berkas utama aplikasi
- database.js        # Menghubungkan aplikasi dengan database
- package.json       # Daftar depedensi dan skrip
- package-lock.json  # Memastikan konsitstenasi instalasi pada paket di berbagai lingkungan
- README.md          # Dokumentasi proyek

# FAQ
<b>Pertanyaan 1</b> : Setelah melakukan pemelihan nomor kursi per tiketnya apa yang akan terjadi pada website nya?

<b>Jawaban</b> : Website akan menampilkan alert 'Transaksi tiket berhasil` atau website akan memuat ulang halaman

# Lisensi
Proyek ini dilisensikan di bawah [Apache License 2.0](LICENSE.txt).
