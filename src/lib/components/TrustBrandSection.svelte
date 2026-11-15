<script lang="ts">
  import { magneticButton } from '$lib/actions/gsapParallax';

  const clientBrands = [
    {
      name: 'Puskesmas Wonokerto',
      sector: 'Kesehatan & Rekam Medis (EMR)',
      slug: 'puskesmas-wonokerto',
      icon: 'local_hospital',
      tag: 'Instansi Pemerintah',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
    },
    {
      name: 'Konveksi Wonopringgo',
      sector: 'Grosir Tekstil & Multi-Gudang',
      slug: 'pos-wonopringgo',
      icon: 'inventory_2',
      tag: 'Garmen & Wholesale',
      color: 'text-blue-700 bg-blue-50 border-blue-200/80',
    },
    {
      name: 'Toko Kopi Seruni',
      sector: 'POS Kasir F&B & Resep HPP',
      slug: 'kopi-seruni',
      icon: 'local_cafe',
      tag: 'Cafe & Kuliner',
      color: 'text-amber-700 bg-amber-50 border-amber-200/80',
    },
    {
      name: 'Warmindo Garwo',
      sector: 'AI Vision OCR Purchasing',
      slug: 'purchasing-garwo',
      icon: 'receipt_long',
      tag: 'Procurement Kuliner',
      color: 'text-rose-700 bg-rose-50 border-rose-200/80',
    },
    {
      name: 'SVRA Laundry Solutions',
      sector: 'Tracking QR & WhatsApp Bot',
      slug: 'laundry',
      icon: 'local_laundry_service',
      tag: 'Jasa & Operasional',
      color: 'text-cyan-700 bg-cyan-50 border-cyan-200/80',
    },
  ];
</script>

<section class="w-full bg-white border-y border-border-hairline py-8 md:py-10 relative z-20 overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
    
    <!-- Header Title -->
    <div class="text-center mb-6 md:mb-8">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-border-hairline/80 mb-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="font-label-sm text-[11px] font-bold text-on-surface uppercase tracking-widest">
          BUKTI KERJASAMA &amp; SISTEM AKTIF
        </span>
      </div>
      <p class="font-body-md text-xs sm:text-sm text-text-muted max-w-xl mx-auto">
        Dipercaya oleh berbagai bidang usaha di Pekalongan &amp; sekitarnya — dari faskes layanan publik hingga ritel dan kuliner.
      </p>
    </div>

    <!-- Client Cards Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {#each clientBrands as brand}
        <a
          href="/project/{brand.slug}"
          class="group bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-border-hairline hover:border-primary/40 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center border {brand.color} shadow-2xs">
                <span class="material-symbols-outlined text-[20px]">{brand.icon}</span>
              </div>
              <span class="inline-flex items-center gap-1 text-[9px] font-label-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                <span class="w-1 h-1 rounded-full bg-emerald-500"></span>
                Aktif
              </span>
            </div>

            <h4 class="font-headline-md text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
              {brand.name}
            </h4>
            <p class="font-body-md text-[11px] text-text-muted mt-0.5 line-clamp-1">
              {brand.sector}
            </p>
          </div>

          <div class="pt-3 mt-3 border-t border-border-hairline/60 flex items-center justify-between text-[10px] text-text-muted group-hover:text-primary font-label-bold">
            <span>Lihat Detail</span>
            <span class="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </a>
      {/each}
    </div>

  </div>
</section>
