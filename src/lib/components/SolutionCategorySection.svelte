<script lang="ts">
    import { fadeUp, staggerFadeUp, fadeIn, magneticButton, shimmerButton, tiltCard, blurReveal, headlineMaskReveal, floatCard } from '$lib/actions/motion';
</script>

<section id="solusi" use:fadeIn={{ duration: 0.8 }} class="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest overflow-hidden">
    <div class="max-w-7xl mx-auto px-gutter">

        <!-- Section Header -->
        <div use:fadeUp={{ duration: 0.8 }} class="text-center max-w-3xl mx-auto mb-20 md:mb-28">
            <span class="inline-flex items-center gap-2 bg-surface-container border border-border-hairline px-4 py-1.5 rounded-full font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest text-xs mb-6">
                <span class="material-symbols-outlined text-[14px] text-primary" style="font-variation-settings: 'FILL' 1;">hub</span>
                Solusi Kami
            </span>
            <h2 use:headlineMaskReveal class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-6">
                Satu sistem, masalah operasional <i class="text-primary font-light">selesai</i>
            </h2>
            <p use:blurReveal={{ delay: 0.15 }} class="font-body-lg text-body-lg text-text-muted max-w-2xl mx-auto">
                Nggak semua bisnis butuh sistem yang sama. Pilih sesuai kebutuhan usahamu — kami bantu dari yang paling sederhana sampai yang custom.
            </p>
        </div>

        <!-- Category Cards -->
        <div use:staggerFadeUp={{ staggerDelay: 0.12 }} class="flex flex-col gap-8">

            <!-- ─── Kategori 1: Kasir & Transaksi ─── -->
            <div use:tiltCard class="group relative bg-white rounded-[32px] border border-border-hairline shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[420px]">
                <!-- Left: Content -->
                <div class="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16 order-2 md:order-1">
                    <div>
                        <div class="flex items-center gap-2.5 mb-6">
                            <div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-[18px] text-white" style="font-variation-settings: 'FILL' 1;">point_of_sale</span>
                            </div>
                            <span class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-xs">Sistem Kasir &amp; Transaksi</span>
                        </div>

                        <h3 class="font-headline-md text-headline-md text-on-surface mb-5 group-hover:text-primary transition-colors duration-300">
                            Capek rekap penjualan manual tiap hari?
                        </h3>

                        <p class="font-body-md text-body-md text-text-muted mb-4 leading-relaxed">
                            Pesanan tercatat di kertas, kadang di WhatsApp, kadang cuma diingat-ingat. Pas tutup toko, rekap penjualan jadi kerjaan tambahan yang makan waktu — dan rawan salah hitung.
                        </p>
                        <p class="font-body-md text-body-md text-on-surface leading-relaxed mb-8">
                            Sistem kasir yang mudah dipakai siapa aja, transaksi langsung tercatat rapi, laporan penjualan otomatis kebentuk sendiri. Kamu tinggal cek angka, bukan hitung manual satu-satu.
                        </p>

                        <!-- Proof Point -->
                        <div class="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 mb-8 flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">verified</span>
                            <p class="font-body-md text-sm text-on-surface">
                                Sudah dipakai untuk sistem kasir toko konveksi (real project), dan tersedia versi siap pakai untuk coffee shop — tinggal sesuaikan, nggak perlu bangun dari nol.
                            </p>
                        </div>
                    </div>

                    <!-- CTA -->
                    <a
                        use:magneticButton
                        href="https://demo.svralabs.com/pos"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 w-fit shadow-md"
                    >
                        <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">play_circle</span>
                        Coba Demo Kasir
                    </a>
                </div>

                <!-- Right: Visual -->
                <div class="relative md:w-[45%] lg:w-[42%] min-h-[260px] md:min-h-full order-1 md:order-2 overflow-hidden bg-surface-faint">
                    <img
                        src="/toko konveksi wonopringgo/Tangkapan Layar 2026-08-09 pukul 00.24.23.png"
                        alt="Sistem kasir POS toko konveksi Wonopringgo"
                        class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/0 md:bg-gradient-to-l md:from-white md:via-white/30 md:to-transparent pointer-events-none"></div>
                    <!-- Floating badge -->
                    <div class="absolute bottom-5 left-5 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm border border-border-hairline">
                        <span class="material-symbols-outlined text-success text-[16px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                        <span class="font-label-bold text-xs text-on-surface">Real project</span>
                    </div>
                </div>
            </div>

            <!-- ─── Kategori 2: Booking & Jadwal (no demo) ─── -->
            <div class="group relative bg-[#F3F4F6] rounded-[32px] border border-border-hairline overflow-hidden flex flex-col md:flex-row min-h-[400px]">
                <!-- Left: Visual/Illustration -->
                <div class="relative md:w-[42%] min-h-[240px] md:min-h-full order-1 md:order-1 flex items-center justify-center bg-gradient-to-br from-primary-container/30 via-surface-container to-[#dbeafe]/40 p-12">
                    <!-- Abstract calendar illustration -->
                    <div class="relative w-full max-w-[260px]">
                        <div class="bg-white rounded-2xl shadow-md border border-border-hairline p-5">
                            <div class="flex items-center justify-between mb-4">
                                <span class="font-label-bold text-sm text-on-surface">Agustus 2026</span>
                                <div class="flex gap-1">
                                    <span class="material-symbols-outlined text-text-muted text-[18px]">chevron_left</span>
                                    <span class="material-symbols-outlined text-text-muted text-[18px]">chevron_right</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-7 gap-1 text-center text-xs mb-3">
                                {#each ['S','S','R','K','J','S','M'] as d}
                                    <div class="font-label-bold text-text-muted py-1">{d}</div>
                                {/each}
                                {#each [1,2,3,4,5,6,7,8,9,10,11,12,13,14] as n}
                                    <div class="py-1.5 rounded-full {n === 9 ? 'bg-primary text-white font-bold' : n === 12 || n === 5 ? 'bg-error-container text-on-error-container font-medium' : 'text-on-surface hover:bg-surface-container transition-colors'} cursor-default">{n}</div>
                                {/each}
                            </div>
                            <div class="border-t border-border-hairline pt-3 space-y-2">
                                <div class="flex items-center gap-2 bg-primary/8 rounded-lg px-2.5 py-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></div>
                                    <span class="text-xs font-medium text-primary">10:00 — Booking baru</span>
                                </div>
                                <div class="flex items-center gap-2 bg-error-container/50 rounded-lg px-2.5 py-1.5">
                                    <div class="w-1.5 h-1.5 rounded-full bg-error-container shrink-0"></div>
                                    <span class="text-xs font-medium text-on-surface-variant">14:00 — Penuh</span>
                                </div>
                            </div>
                        </div>
                        <!-- Coming soon chip -->
                        <div class="absolute -top-4 -right-4 bg-on-surface text-surface text-[10px] font-label-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                            Segera Hadir
                        </div>
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-r from-[#F3F4F6]/0 via-[#F3F4F6]/0 to-[#F3F4F6] md:hidden pointer-events-none"></div>
                </div>

                <!-- Right: Content -->
                <div class="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16 order-2 md:order-2">
                    <div>
                        <div class="flex items-center gap-2.5 mb-6">
                            <div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-[18px] text-white" style="font-variation-settings: 'FILL' 1;">calendar_month</span>
                            </div>
                            <span class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-xs">Sistem Booking &amp; Jadwal</span>
                        </div>

                        <h3 class="font-headline-md text-headline-md text-on-surface mb-5 group-hover:text-primary transition-colors duration-300">
                            Jadwal masih dicatat di buku atau chat WhatsApp?
                        </h3>

                        <p class="font-body-md text-body-md text-text-muted mb-4 leading-relaxed">
                            Pelanggan booking lewat chat, kadang kelewat baca, kadang jadwal bentrok karena dicatat manual. Belum lagi kalau harus bolak-balik konfirmasi satu-satu.
                        </p>
                        <p class="font-body-md text-body-md text-on-surface leading-relaxed mb-8">
                            Sistem booking yang bikin pelanggan bisa lihat jadwal kosong sendiri dan booking tanpa ribet — kamu tinggal pantau dari satu tempat. Nggak perlu lagi nebak-nebak slot mana yang masih kosong.
                        </p>

                        <!-- "Coming soon" info chip -->
                        <div class="bg-surface-container border border-border-hairline rounded-xl px-4 py-3 mb-8 flex items-start gap-3">
                            <span class="material-symbols-outlined text-text-muted text-[18px] mt-0.5 shrink-0">info</span>
                            <p class="font-body-md text-sm text-text-muted">
                                Template ini sedang dalam pengembangan. Kalau butuh sekarang, ceritakan kebutuhanmu — kami bantu rancang yang sesuai.
                            </p>
                        </div>
                    </div>

                    <!-- CTA → WhatsApp, bukan demo -->
                    <a
                        use:shimmerButton
                        href="https://wa.me/6285158418944?text=Halo%20Svralabs,%20saya%20butuh%20sistem%20booking%20dan%20jadwal%20untuk%20bisnis%20saya."
                        target="_blank"
                        rel="noopener noreferrer"
                        class="bg-white border border-border-hairline text-on-surface hover:bg-surface-container transition-colors duration-300 font-label-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 w-fit shadow-sm"
                    >
                        <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">chat</span>
                        Diskusikan Kebutuhanmu
                    </a>
                </div>
            </div>

            <!-- ─── Kategori 3: Tracking & Operasional ─── -->
            <div use:tiltCard class="group relative bg-white rounded-[32px] border border-border-hairline shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[420px]">
                <!-- Left: Content -->
                <div class="flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16 order-2 md:order-1">
                    <div>
                        <div class="flex items-center gap-2.5 mb-6">
                            <div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-[18px] text-white" style="font-variation-settings: 'FILL' 1;">track_changes</span>
                            </div>
                            <span class="font-label-bold text-label-bold text-on-surface uppercase tracking-wider text-xs">Sistem Tracking &amp; Operasional</span>
                        </div>

                        <h3 class="font-headline-md text-headline-md text-on-surface mb-5 group-hover:text-primary transition-colors duration-300">
                            Mau tahu cucian atau antrian mana yang belum selesai, harus nanya dulu?
                        </h3>

                        <p class="font-body-md text-body-md text-text-muted mb-4 leading-relaxed">
                            Cucian yang masih diproses, antrian pasien yang belum dipanggil, orderan konveksi yang belum dikerjakan — semuanya cuma ada di kepala satu orang. Kalau dia lagi sibuk atau nggak di tempat, yang lain nunggu, nanya-nanya, atau salah ambil langkah.
                        </p>
                        <p class="font-body-md text-body-md text-on-surface leading-relaxed mb-8">
                            Setiap cucian, antrian pasien, atau orderan punya statusnya sendiri — kelihatan langsung di layar, tanpa harus nanya ke siapapun. Karyawan laundry tahu mana yang belum selesai, admin klinik tahu siapa yang harus dipanggil berikutnya. Kamu tinggal pantau dari mana aja — dan mulai lihat pola dari data yang otomatis tercatat.
                        </p>

                        <!-- Proof Point -->
                        <div class="bg-primary/5 border border-primary/15 rounded-xl px-4 py-3 mb-8 flex items-start gap-3">
                            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0" style="font-variation-settings: 'FILL' 1;">verified</span>
                            <p class="font-body-md text-sm text-on-surface">
                                Sudah dipakai untuk sistem administrasi Puskesmas Wonokerto (real project), dan tersedia versi siap pakai untuk manajemen laundry — tinggal sesuaikan alur kerjamu.
                            </p>
                        </div>
                    </div>

                    <!-- CTA -->
                    <a
                        use:magneticButton
                        href="https://demo.svralabs.com/operational"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="bg-on-surface text-surface hover:bg-primary transition-colors duration-300 font-label-bold px-7 py-3.5 rounded-full inline-flex items-center gap-2 w-fit shadow-md"
                    >
                        <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">play_circle</span>
                        Coba Demo Tracking
                    </a>
                </div>

                <!-- Right: Visual -->
                <div class="relative md:w-[45%] lg:w-[42%] min-h-[260px] md:min-h-full order-1 md:order-2 overflow-hidden bg-surface-faint">
                    <img
                        src="/puskesmas wonokerto/Tangkapan Layar 2026-08-07 pukul 21.59.46.png"
                        alt="Sistem tracking operasional Puskesmas Wonokerto"
                        class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/0 md:bg-gradient-to-l md:from-white md:via-white/30 md:to-transparent pointer-events-none"></div>
                    <!-- Floating badge -->
                    <div class="absolute bottom-5 left-5 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm border border-border-hairline">
                        <span class="material-symbols-outlined text-success text-[16px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                        <span class="font-label-bold text-xs text-on-surface">Real project</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
