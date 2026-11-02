# 🌲🌌 Portfolio Personal Bertema Hutan & Aurora Digital

Website portofolio personal modern, responsif, dan interaktif dengan estetika **Dark Mode Hutan Gelap & Cahaya Aurora**. Dibangun dengan kombinasi warna aksen utama **Hijau Tosca (`#10b981`)** dan **Aurora Ungu (`#8b5cf6`)**, lengkap dengan efek partikel, daun berguguran halus, dan kabut misterius bergerak.

---

## ✨ Fitur Utama & Desain

1. **Atmosfer Hutan & Aurora Dinamis:**
   - **Animasi Partikel Cahaya Aurora:** Pita cahaya aurora bergerak (*Aurora wave ribbons*) dengan partikel cahaya bioluminesensi yang melayang lembut.
   - **Daun Jatuh Halus (*Falling Leaves*):** Simulasi kanvas daun hutan pinus & willow yang jatuh melayang diagonal dengan rotasi dan ayunan organik.
   - **Efek Fog Bergerak (*Drifting Mist*):** Multi-layer kabut atmosferik yang melintas perlahan dengan variasi opasitas dan blur.
2. **Navbar Melayang Tengah Atas (*Floating Glassmorphism Navbar*):**
   - Berada di posisi tengah atas dengan efek transparansi *glassmorphism* (`backdrop-blur`).
   - Aksen border glow hijau tosca (`#10b981`) dan ungu aurora (`#8b5cf6`).
   - Indikator menu aktif yang berpindah mulus dan navigasi *smooth scroll*.
   - Responsive drawer menu untuk tampilan perangkat mobile.
3. **Hero Section Interaktif:**
   - Tampilan nama besar dengan tipografi gradien tosca-ungu.
   - **Animasi Teks Mengetik Otomatis (*Typewriter Effect*):** Bergantian antara `"Junior Developer"`, `"Tech Enthusiast"`, dan `"Problem Solver"`.
   - Kursor berkedip (*blinking cursor*) dengan efek glow neon.
   - Tombol CTA dengan efek *glow hover*: "Jelajahi Proyek" & "Hubungi Saya".
   - Status ketersediaan kerja (*live status indicator*).
4. **Section About Me:**
   - **Foto Profil:** Bingkai lingkaran dengan *rotating & pulsing circular glow border*.
   - **Riwayat Pendidikan:** *Vertical timeline* dengan simpul menyala (*glowing nodes*), detail gelar, IPK, dan pencapaian.
   - **Pengalaman:** Kartu pengalaman kerja dan organisasi lengkap dengan *tech tags*.
   - **Statistik Proyek:** *Animated counter* yang menghitung naik otomatis saat masuk ke dalam viewport layar.
5. **Section Portfolio dengan 3 Tab Interaktif:**
   - **Tab Proyek (Projects):** Kartu proyek 3D dengan efek *tilt* yang mengikuti gerakan kursor (*mouse-follow 3D tilt & dynamic spotlight glow*), filter kategori (Web App, UI/UX, Mobile/API), tautan Live Demo & GitHub.
   - **Tab Sertifikat (Certificates):** Grid sertifikasi dengan **Modal Lightbox Preview** interaktif saat diklik, menampilkan nomor kredensial, lembaga penerbit, dan tombol verifikasi lisensi.
   - **Tab Tech Stack:** Ikon teknologi dengan animasi melayang (*floating oscillation*) dan *interactive rich tooltips* yang memuat persentase keahlian dan deskripsi teknis.
6. **Section Kontak:**
   - Formulir pesan dengan **validasi client-side real-time** (nama, format email valid, subjek, panjang pesan).
   - **Animasi Submit:** Tombol berubah menampilkan *loading spinner*, disusul notifikasi sukses (*success checkmark banner*).
   - Link sosial media (GitHub, LinkedIn, Instagram, Discord, Email) dengan ikon hover beranimasi rotasi dan aura glow.

---

## 🚀 Cara Menjalankan Website

### Opsi 1: Langsung Dibuka di Browser (Tanpa Instalasi Apapun)
Anda dapat langsung melihat dan menggunakan portofolio ini dalam hitungan detik:
1. Buka folder `c:\Berkas Penting\Porto_Antigravity`
2. **Klik ganda file `buka_portfolio.bat`** (atau klik kanan pada `index.html` dan pilih *Open with Microsoft Edge / Google Chrome*).
3. Seluruh fitur, animasi kanvas aurora, daun jatuh, fog, 3D tilt, dan interaksi formulir langsung aktif sepenuhnya!

### Opsi 2: Menggunakan Node.js & Vite (Development Workflow)
Jika Anda ingin mengembangkan lebih lanjut menggunakan workflow modular React:
```bash
# Masuk ke direktori
cd "c:\Berkas Penting\Porto_Antigravity"

# Install dependensi (pastikan Node.js sudah terinstal)
npm install

# Jalankan server lokal
npm run dev
```

---

## 📁 Struktur Direktori

```
c:\Berkas Penting\Porto_Antigravity\
├── index.html                   # Halaman mandiri lengkap siap pakai di browser
├── buka_portfolio.bat           # File batch 1-klik untuk membuka website langsung
├── package.json                 # Konfigurasi dependensi React, Vite, Tailwind, Framer Motion
├── vite.config.js               # Konfigurasi bundler Vite
├── tailwind.config.js           # Konfigurasi palet warna Hutan & Aurora
├── postcss.config.js            # Konfigurasi PostCSS
├── README.md                    # Dokumentasi lengkap proyek
└── src/
    ├── main.jsx                 # Entry point React
    ├── App.jsx                  # Root component layout
    ├── index.css                # Styling global, font & custom scrollbar
    ├── data/
    │   └── portfolioData.js     # Seluruh data profil, pendidikan, proyek, sertifikat, tech stack
    └── components/
        ├── AuroraCanvas.jsx     # Animasi gelombang pita aurora & partikel cahaya
        ├── FallingLeaves.jsx    # Animasi kanvas daun gugur halus
        ├── FogEffect.jsx        # Lapisan kabut misterius bergerak
        ├── Navbar.jsx           # Navbar melayang di tengah atas
        ├── Hero.jsx             # Hero section + typewriter bergantian + tombol CTA
        ├── About.jsx            # Foto glow melingkar, timeline vertikal & counter animasi
        ├── Portfolio.jsx        # Tab interaktif (Projects, Certificates, Tech Stack)
        ├── ProjectCard.jsx      # Kartu proyek dengan 3D mouse tilt & dynamic spotlight
        ├── CertificateModal.jsx # Modal lightbox preview sertifikat
        ├── Contact.jsx          # Form bervalidasi + animasi submit & link medsos
        └── Footer.jsx           # Footer bertema aurora malam
```

---

## 🎨 Palet Warna Utama

| Elemen | Kode Hex | Keterangan |
| :--- | :--- | :--- |
| **Latar Belakang Dasar** | `#020a06` | Hitam kehijauan pekat (*Deep Forest Dark*) |
| **Aksen Utama 1** | `#10b981` | Hijau Tosca / Emerald (*Bioluminescent glow*) |
| **Aksen Utama 2** | `#8b5cf6` | Ungu Aurora (*Northern Lights Violet*) |
| **Highlight Cyan** | `#06b6d4` | Biru kehijauan cahaya aurora |
| **Teks Primer** | `#f8fafc` | Putih terang berkilau |
| **Teks Sekunder** | `#94a3b8` | Abu-abu keperakan kabut malam |

---

## ✏️ Cara Mengubah Data Portofolio
Semua konten (nama, biografi, riwayat pendidikan, proyek, sertifikat, sosial media) dapat diubah dengan mudah pada file:
- Untuk versi modular: [`src/data/portfolioData.js`](file:///c:/Berkas%20Penting/Porto_Antigravity/src/data/portfolioData.js)
- Untuk file `index.html`: Ubah variabel objek `personalInfo`, `educationHistory`, `projectsData`, `certificatesData`, dan `techStackData` di dalam tag `<script type="text/babel">`.
