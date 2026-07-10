# Agoraswipe 🏛️

**Doomscrolling yerine brainscrolling.** TikTok/Reels'in dikey snap-scroll mekaniğiyle felsefe, tarih, sosyoloji, din ve kitaplardan hap bilgiler sunan bir web uygulaması prototipi.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `index.html` | Sıfır bağımlılıklı, tek dosyalık çalışan prototip. Tarayıcıda açman yeterli — CDN dahil hiçbir dış kaynak gerektirmez. |
| `Agoraswipe.jsx` | Aynı deneyimin React + Tailwind CSS + framer-motion ile yazılmış tek dosyalık bileşen versiyonu. Vite/Next projesine bırakıp `<Agoraswipe />` olarak kullan. |

## Özellikler

- **100dvh snap-mandatory dikey akış** — tekerlek, dokunmatik kaydırma ve ok tuşlarıyla kart kart geçiş
- **"Gece Agorası" tasarım dili** — derin mürekkep zemini, sıcak mermer serif tipografi, kategori başına vurgu rengi ve degrade
- **Kart anatomisi** — üstte kategori çipi, ortada kanca başlık + hap bilgi + kaynak atfı, sağ altta dikey aksiyon rayı (beğen / kaydet / paylaş)
- **Mikro etkileşimler** — kalp/bookmark pop animasyonu, çift dokunuşta kalp patlaması, toast bildirimleri, Web Share API (yoksa panoya kopyalama)
- **Sağ kenarda ilerleme rayı**, ilk kartta kaydırma ipucu, `prefers-reduced-motion` desteği

## İçerik

9 kart, 5 kategori: Panoptikon, Amor Fati, Kleopatra zaman paradoksu, Stoacı kontrol dikotomisi, Eksen Çağı, Orwell vs. Huxley, Theseus'un Gemisi, Dunbar Sayısı, Göbekli Tepe. Tüm içerikler gerçek kaynaklara atıflıdır ve `DATA` dizisinden yönetilir.
