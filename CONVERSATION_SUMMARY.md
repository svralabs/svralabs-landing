# Rangkuman Percakapan & Riwayat Pengembangan Landing Page Svralabs

Dokumen ini merangkum seluruh kronologi diskusi, investigasi teknis, pemecahan masalah, perubahan kode, dan status tugas terkini pada repositori `svralabs-landing`.

---

## 1. Kronologi Permintaan Pengguna

| No | Permintaan User | Inti Kebutuhan & Konteks |
|:---|:---|:---|
| 1 | *masalah solusi keatasin lg bro biar kerasa efek parallax nya trs kasih rounded juga* | Penyesuaian section Masalah & Solusi agar efek kedalaman parallax lebih terasa dan ditambahkan sudut membulat (*rounded*). |
| 2 | *dikeatasin mksd nya pas scrolling bro kalo gini nutup section atas nya* | Koreksi posisi saat scrolling agar section tidak langsung menimpa atau menutupi konten di atasnya secara kasar. |
| 3 | *nah tinggal beresin incoming component compoentn di masalah & solusi* | Pengerjaan animasi masuk (*incoming*) untuk sub-komponen kartu di dalam section Masalah & Solusi. |
| 4 | *bro solusi kami kok balik lagi bro dia snaping force card 2 , gimana ya cara ngatasin nya...* | Menghilangkan snapping paksa yang mengunci gesture scroll pengguna. Mengurangi jarak scroll dari 3 kali scroll menjadi 2 kali scroll per kartu agar pacing lebih nyaman. |
| 5 | *npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend" broo install ini bro* | Instalasi dan adaptasi skill standar desain frontend anti-slop / high-taste frontend. |
| 6 | *lanjutt transisi animasi masalah solusi ke section berikutnya bro* | Menyambungkan transisi mulus dari Masalah & Solusi menuju section berikutnya. |
| 7 | *lanjutt kebawah bro* | Menerapkan transisi konsisten ke section-section bawahnya. |
| 8 | *sudah sampai footer ? animasi transisi micro interactive* | Memastikan transisi berlanjut hingga footer lengkap dengan interaksi mikro (*micro-interactions*). |
| 9 | *jgn reserve parallax semua laa creative sikik* | Protes pengguna karena semua section menggunakan gaya transisi yang sama (reverse parallax / kartu tumpuk). Diminta variasi yang lebih kreatif dan variatif. |
| 10 | *lah masih reverse parallax semua ini km kok bohong* | Evaluasi kritis pengguna: meskipun animasi mikro dalam elemen sudah ada, tampilan makro antar-section secara keseluruhan masih terasa seperti tumpukan lembaran kartu (reverse parallax). |
| 11 | *run kan* | Menjalankan kembali Vite dev server setelah server environment restart (`http://localhost:5173/`). |
| 12 | *perbaiki positioning , timing ya masalh solusi kebawah, imrpove interactive animation, incoming , present , out animation* (+ Screenshot) | Permintaan evaluasi posisi vertikal (gap besar antara tombol CTA Fitur dengan judul Workflow Kasir), timing transisi, serta siklus animasi 3 tahap: **Incoming** (saat masuk), **Present** (saat aktif di viewport), dan **Out** (saat bergeser keluar). |

---

## 2. Analisis Masalah Mendalam & Akar Masalah (Root Cause)

### A. Isu "Reverse Parallax Seragam" (Mengapa Terlihat Membosankan / Sama Semua)
Pada pengujian awal, meskipun animasi teks dan kartu di dalam section telah dimodifikasi, pengguna tetap melihat efek yang sama di setiap pergantian section. Akar masalahnya diidentifikasi pada 4 faktor struktural:
1. **Container Luar Memakai Class Lembaran Kartu**:
   Hampir setiap section dibungkus kelas CSS:
   ```html
   rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[60px] lg:rounded-t-[72px] border-t border-slate-200/90 shadow-[0_-30px_70px_rgba(0,0,0,0.06)]
   ```
   Hal ini membuat tiap section tampak seperti lembaran kertas/kartu fisik yang menimpa section di bawahnya.
2. **Pinning GSAP di Setiap Section**:
   Parameter `pin: currentSec, pinSpacing: false` aktif di semua batas section. Section atas dibekukan di viewport sementara section bawah meluncur naik menutupinya.
3. **Global Z-Index Stacking**:
   Script menerapkan `sec.style.zIndex = String(10 + idx)`, memaksa browser merender tumpukan berurutan dari atas ke bawah.
4. **Konflik Action `sectionLayeredParallax`**:
   Proporsi `fgSpeed: -1.0` menggerakkan elemen berlawanan arah scroll, memperkuat kesan lembaran naik.

### B. Isu Snapping & Pacing Scroll
- Snapping bawaan terasa kaku karena memotong momentum natural trackpad/mouse wheel.
- Diperbaiki dengan mengganti mekanisme snap paksa menjadi continuous scrubbed timeline (`scrub: 1`) dan memperpendek scroll distance dari 300vh menjadi 200vh.

### C. Isu Terkini: Gap Positioning & Siklus Animasi Masalah/Solusi ke Bawah
Berdasarkan screenshot pengguna (`media_1788801038166.png`):
- Tombol CTA *"Mulai Digitalisasi Sekarang"* di bagian bawah grid Fitur/Solusi menggantung dengan ruang kosong (*whitespace*) yang terlalu lebar sebelum menyentuh judul section *"Kasir yang bikin antri cepat, laporan beres sendiri."* (Workflow Kasir).
- Animasi pergantian antar-section memerlukan pematangan 3 fase yang tegas:
  - **Incoming**: bagaimana elemen masuk ke viewport secara terarah.
  - **Present**: interaktivitas saat elemen berada di tengah layar (micro-interaction, floating, dynamic glow).
  - **Out**: bagaimana elemen pamit keluar tanpa meninggalkan jeda kosong yang canggung.

---

## 3. Solusi & Perubahan Teknis yang Telah Diimplementasikan

### 1. Eliminasi Sheet Container & Pinning Bebas di Section Tengah
- Menghapus class `rounded-t-[...]`, `border-t`, dan `shadow-[0_-30px...]` dari:
  - `PlatformWorkflowSection.svelte`
  - `PlatformSecuritySection.svelte`
  - `CoreServicesSection.svelte`
  - `PricingSection.svelte`
  - `TestimonialSection.svelte`
  - `BlogSection.svelte`
- Menghapus `pin: currentSec, pinSpacing: false` dari boundaries 1 s/d 6 di `src/lib/actions/sectionTransition.ts`.
- Efek tirai naik dipertahankan **hanya** pada transisi penutup paling bawah (`blog` $\rightarrow$ `kontak` / Obsidian Luxury Finale).

### 2. Implementasi 7 Koreografi Transisi Tematik Unik

| No | Boundary | Karakter Transisi | Implementasi Gerakan GSAP |
|:---|:---|:---|:---|
| 1 | **Fitur $\rightarrow$ Workflow** | *Seamless Dolly Zoom* | Halaman mengalir alami tanpa penutup, panggung workflow kasir melakukan zoom optik (`scale: 0.88 -> 1.0`, `y: 80 -> 0`). |
| 2 | **Workflow $\rightarrow$ Security** | *Cybernetic Dual Docking* | Pintu brankas kiri (`x: -100`) dan kanan (`x: +100`) meluncur merapat ke tengah saat masuk viewport. |
| 3 | **Security $\rightarrow$ Layanan** | *Editorial Column Cascade* | 3 pilar layanan masuk berurutan (*staggered cascade* `y: 80, 120, 160 -> 0`). |
| 4 | **Layanan $\rightarrow$ Harga** | *Tier Unfold & Recommended Pop* | Kartu paket harga mekar naik; kartu Growth/Rekomendasi terangkat menonjol dengan halo pendaran hijau. |
| 5 | **Harga $\rightarrow$ Portofolio** | *Asymmetrical Split Glide* | Kartu SIMPUS meluncur dari kiri-bawah (`x: -80, y: 80`), kartu ERP Fashion meluncur dari kanan-bawah (`x: +80, y: 120`). |
| 6 | **Portofolio $\rightarrow$ Blog** | *Magazine Deck Fan-In* | Tiga kartu wawasan blog mekar dengan sudut rotasi editorial majalah (`-4.5°`, `0°`, `+4.5°`). |
| 7 | **Blog $\rightarrow$ Footer** | *The Grand Obsidian Finale* | Tirai gelap obsidian (`#111827`) dengan border emerald meluncur naik menutup halaman sebagai klimaks CTA. |

### 3. Preservasi Micro-Interactions
- `use:tilt3D`: Efek tilt perspektif 3D interaktif yang mengikuti kursor mouse pada kartu.
- Dynamic Glare: Lapisan pendaran reflektif pada hover.
- `use:magneticButton`: Tombol CTA memiliki daya tarik magnetik lembut mengikuti posisi pointer.

---

## 4. Status Pengujian & Verifikasi

- **Svelte Check (`npm run check`)**: `0 errors, 0 warnings`.
- **Browser Runtime**: Tidak ada error console, tidak ada layout shift tak terkontrol.
- **Dev Server**: Berjalan aktif di `http://localhost:5173/`.
- **Screenshot Verifikasi**: Tersimpan di direktori brain (`verify_trans5_portofolio.png`, `verify_portofolio_cards.png`, `verify_trans6_blog.png`, `verify_trans7_finale.png`).

---

## 5. Agenda Pekerjaan Berikutnya (Pending Tasks)

1. **Perbaikan Positioning & Whitespace Fitur $\rightarrow$ Workflow**:
   - Mengurangi padding bawah pada section Fitur / tombol CTA *"Mulai Digitalisasi Sekarang"*.
   - Menyelaraskan margin/padding atas pada section Workflow Kasir agar tidak ada gap putih kosong yang terlalu lebar.
2. **Penyempurnaan 3-Fase Animasi (Incoming, Present, Out)**:
   - **Incoming**: Masuk dengan koordinasi translate + opacity + scale yang terkalibrasi halus.
   - **Present**: Menambahkan subtle breathing/floating state atau scroll-tied highlights saat elemen aktif di tengah viewport.
   - **Out**: Transisi keluar yang proporsional saat pengguna menggulir melewatinya sehingga perpindahan ke section berikutnya terasa mulus dan menyatu.
