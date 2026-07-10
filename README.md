# Agoraswipe 🏛️

**Doomscrolling yerine brainscrolling.** TikTok/Reels'in dikey snap-scroll mekaniğiyle felsefe, tarih, sosyoloji, din ve kitaplardan hap bilgiler sunan bir web uygulaması prototipi.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Sıfır bağımlılıklı, kurulabilir (PWA) prototip. Bir sunucuya koyup açman yeterli — CDN dahil hiçbir dış kaynak gerektirmez. |
| `manifest.json` | PWA manifesti — "Ana ekrana ekle" ile gerçek uygulama gibi kurulabilmesini sağlar. |
| `sw.js` | Service worker — kartları önbelleğe alır, çevrimdışı da açılır. |
| `icons/` | Tapınak logosundan üretilmiş uygulama ikonları (192/512/maskable/apple-touch/favicon). |
| `brand.html` | Marka kartelası — logo varyantları, kilitli düzenler, renk paleti, tipografi, kategori sistemi. |
| `Agoraswipe.jsx` | Aynı deneyimin React + Tailwind CSS + framer-motion ile yazılmış tek dosyalık bileşen versiyonu. Vite/Next projesine bırakıp `<Agoraswipe />` olarak kullan. |

## Özellikler

- **100dvh snap-mandatory dikey akış** — tekerlek, dokunmatik kaydırma ve ok tuşlarıyla kart kart geçiş
- **"Gece Agorası" tasarım dili** — derin mürekkep zemini, sıcak mermer serif tipografi, kategori başına vurgu rengi ve degrade, hayalet Yunan harfleri (Φ Χ Π Θ Β)
- **Tapınak logosu** — alınlık + üç sütun + basamak; uygulama ikonu, favicon ve üst bar wordmark'ında kullanılır
- **Kart anatomisi** — üstte kategori çipi, ortada kanca başlık + hap bilgi + kaynak atfı, sağ altta dikey aksiyon rayı (beğen / kaydet / paylaş)
- **Bugünün Agorası** — her gün farklı 5 kartlık bir seçki (tarihe göre rotasyon), 5. karttan sonra yumuşak bir "bugünlük bu kadar" ekranı; sonsuz kaydırmaya bilinçli bir sınır
- **Günlük seri** — üst barda 🔥 rozeti, `localStorage` ile art arda kaç gün açtığını sayar
- **Kütüphanem** — kaydettiğin kartların listelendiği alt panel; dokununca ilgili karta geri döner (`localStorage` ile kalıcı)
- **PWA / çevrimdışı** — manifest + service worker ile telefonun ana ekranına eklenip gerçek bir uygulama gibi açılır
- **Mikro etkileşimler** — kalp/bookmark pop animasyonu, çift dokunuşta kalp patlaması, toast bildirimleri, Web Share API (yoksa panoya kopyalama)
- **Sağ kenarda ilerleme rayı**, ilk kartta kaydırma ipucu, `prefers-reduced-motion` desteği

## Kurulum (kendi telefonunda kullanmak için)

`index.html`, `manifest.json`, `sw.js` ve `icons/` klasörünü aynı dizin yapısıyla herhangi bir statik barındırmaya (GitHub Pages, Vercel, Netlify) yükle — HTTPS üzerinden servis edilmesi gerekir (service worker gereksinimi). Telefonda açtıktan sonra Safari/Chrome'un "Ana ekrana ekle" seçeneğiyle gerçek bir uygulama simgesi olarak kurulur.

## İçerik

9 kart, 5 kategori: Panoptikon, Amor Fati, Kleopatra zaman paradoksu, Stoacı kontrol dikotomisi, Eksen Çağı, Orwell vs. Huxley, Theseus'un Gemisi, Dunbar Sayısı, Göbekli Tepe. Tüm içerikler gerçek kaynaklara atıflıdır ve `DATA` dizisinden yönetilir; her kartın sabit bir `id`'si var (seri, kaydetme ve kütüphane bu kimliklerle çalışır).
