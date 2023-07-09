-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Jul 2023 pada 07.33
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_sea`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `balance`
--

CREATE TABLE `balance` (
  `id_balance` int(11) NOT NULL,
  `total_balance` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_transaction`
--

CREATE TABLE `detail_transaction` (
  `id_detail` int(11) NOT NULL,
  `id_transaction` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `id_ticket` varchar(255) NOT NULL,
  `no_seats` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `release_date` date NOT NULL,
  `poster_url` varchar(255) NOT NULL,
  `age_rating` int(2) NOT NULL,
  `ticket_price` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `film`
--

INSERT INTO `film` (`id`, `title`, `description`, `release_date`, `poster_url`, `age_rating`, `ticket_price`, `created_at`, `updated_at`) VALUES
(1, 'Fast X', 'Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.', '2023-05-17', 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg', 25, 53000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(2, 'John Wick: Chapter 4', 'ohn Wick mengungkap jalan untuk mengalahkan The High Table. Tapi sebelum dia bisa mendapatkan kebebasannya, Wick harus berhadapan dengan musuh baru dengan aliansi kuat di seluruh dunia dan kekuatan yang mengubah teman lama menjadi musuh.', '2023-03-22', 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', 10, 60000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(3, 'The Super Mario Bros. Movie', 'Ketika sedang bekerja di bawah tanah untuk memperbaiki pipa air, Mario dan Luigi, yang merupakan tukang ledeng dari Brooklyn, tiba-tiba terhisap ke dalam pipa misterius dan masuk ke dunia yang sangat berbeda. Mereka berada di tempat yang ajaib dan aneh. Tapi sayangnya, mereka terpisah satu sama lain. Mario memulai petualangan besar untuk mencari dan menemukan Luigi.', '2023-04-05', 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg', 14, 49000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(4, 'Avatar: The Way of Water', 'Jake Sully tinggal bersama keluarga barunya di planet Pandora. Setelah ancaman kembali datang, Jake harus bekerja dengan Neytiri dan pasukan ras Na\'vi untuk melindungi planet mereka.', '2022-12-14', 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', 12, 53000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(5, 'title\":\"Guardians of the Galaxy Vol. 3', 'Peter Quill masih trauma karena kehilangan Gamora. Ia perlu mengumpulkan timnya untuk melindungi alam semesta dan salah satu anggota mereka. Jika mereka gagal, Guardian akan berakhir.', '2023-05-03', 'https://image.tmdb.org/t/p/w500/nAbpLidFdbbi3efFQKMPQJkaZ1r.jpg', 12, 41000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(6, 'Ant-Man and the Wasp: Quantumania', 'Scott Lang dan Hope van Dyne adalah pasangan pahlawan super. Mereka pergi bersama orang tua Hope, Janet van Dyne dan Hank Pym, serta anak perempuan Scott, Cassie Lang, untuk menjelajahi Alam Kuantum. Di sana, mereka bertemu dengan makhluk-makhluk aneh dan memulai petualangan yang tak terduga. Petualangan ini akan menguji batas-batas mereka.', '2023-02-15', 'https://image.tmdb.org/t/p/w500/g0OWGM7HoIt866Lu7yKohYO31NU.jpg', 12, 51000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(7, 'The Pope\'s Exorcist', 'Pastor Gabriele Amorth, yang memimpin tim pengusir setan di Vatikan, menginvestigasi kasus kekerasan roh jahat yang menghantui seorang anak laki-laki. Dalam penyelidikannya, ia secara tak terduga menemukan rahasia tua yang disembunyikan oleh Vatikan selama berabad-abad.', '2023-04-05', 'https://image.tmdb.org/t/p/w500/gNPqcv1tAifbN7PRNgqpzY8sEJZ.jpg', 13, 51000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(8, 'To Catch a Killer', 'Baltimore. Malam tahun baru. Seorang petugas polisi yang berbakat tetapi bermasalah (Shailene Woodley) direkrut oleh kepala penyelidik FBI (Ben Mendelsohn) untuk membantu membuat profil dan melacak individu yang terganggu yang meneror kota.', '2023-04-06', 'https://image.tmdb.org/t/p/w500/mFp3l4lZg1NSEsyxKrdi0rNK8r1.jpg', 15, 47000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(9, 'Transformers: Age of Extinction', 'Lima tahun setelah Chicago dihancurkan, manusia berbalik melawan robot. Namun seorang ayah tunggal dan penemu membangkitkan robot yang dapat menyelamatkan dunia.', '2014-06-25', 'https://image.tmdb.org/t/p/w500/jyzrfx2WaeY60kYZpPYepSjGz4S.jpg', 11, 54000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(10, 'Puss in Boots: The Last Wish', 'Puss in Boots menemukan fakta bahwa kecintaannya pada petualangan telah merenggut nyawanya: dia telah menghabiskan delapan dari sembilan nyawanya. Puss kini memulai petualangan epik untuk menemukan harapan terakhir untuk memulihkan sembilan nyawanya.', '2022-12-07', 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg', 11, 51000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(11, 'Scream VI', 'Setelah pembunuhan terbaru oleh Ghostface, keempat orang yang selamat pergi dari Woodsboro dan memulai hidup baru.', '2023-03-08', 'https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg', 12, 36000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(12, 'Black Adam', 'Hampir 5.000 tahun setelah dia dianugerahi kekuatan maha kuasa para dewa Mesirâ€”dan dipenjara dengan cepatâ€”Black Adam dibebaskan dari makam duniawinya, siap untuk melepaskan bentuk keadilannya yang unik di dunia modern.', '2022-10-19', 'https://image.tmdb.org/t/p/w500/A5imhXiFF3AL9RRA4FBzNDFmfgW.jpg', 10, 42000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(13, 'Dungeons & Dragons: Honor Among Thieves', 'Seorang pencuri menawan dan sekelompok petualang yang unik melakukan pencurian besar-besaran untuk mencuri relik yang hilang. Namun, segalanya menjadi kacau ketika mereka berjumpa dengan orang yang salah.', '2023-03-23', 'https://image.tmdb.org/t/p/w500/A7AoNT06aRAc4SV89Dwxj3EYAgC.jpg', 12, 38000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(14, 'Avengers: Infinity War', 'Karena Avengers dan sekutunya terus melindungi dunia dari ancaman yang terlalu besar untuk ditangani oleh seorang pahlawan, bahaya baru telah muncul dari bayangan kosmik: Thanos. Seorang lalim penghujatan intergalaksi, tujuannya adalah untuk mengumpulkan semua enam Batu Infinity, artefak kekuatan yang tak terbayangkan, dan menggunakannya untuk menimbulkan kehendak memutar pada semua realitas. Segala sesuatu yang telah diperjuangkan oleh Avengers telah berkembang hingga saat ini - nasib Bumi dan keberadaannya sendiri tidak pernah lebih pasti.', '2018-04-25', 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', 10, 46000, '2023-07-05 12:56:28', '2023-07-05 12:56:28'),
(15, 'title\":\"The Whale', 'Seorang guru bahasa Inggris yang tertutup dan gemuk mencoba untuk berhubungan kembali dengan putri remajanya yang terasing.', '2022-12-09', 'https://image.tmdb.org/t/p/w500/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg', 15, 55000, '2023-07-05 12:56:28', '2023-07-05 12:56:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaction`
--

CREATE TABLE `transaction` (
  `id_transaction` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `bayar` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `number_of_ticket` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`id_balance`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `detail_transaction`
--
ALTER TABLE `detail_transaction`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id` (`id`),
  ADD KEY `id_transaction` (`id_transaction`);

--
-- Indeks untuk tabel `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id_transaction`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `balance`
--
ALTER TABLE `balance`
  MODIFY `id_balance` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `detail_transaction`
--
ALTER TABLE `detail_transaction`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `film`
--
ALTER TABLE `film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `balance`
--
ALTER TABLE `balance`
  ADD CONSTRAINT `balance_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `detail_transaction`
--
ALTER TABLE `detail_transaction`
  ADD CONSTRAINT `detail_transaction_ibfk_2` FOREIGN KEY (`id`) REFERENCES `film` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_transaction_ibfk_3` FOREIGN KEY (`id_transaction`) REFERENCES `transaction` (`id_transaction`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
