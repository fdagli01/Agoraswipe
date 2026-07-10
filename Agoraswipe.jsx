/**
 * Agoraswipe — Brainscrolling prototipi
 * Tek dosyalık React bileşeni. Gereksinimler: react, framer-motion, tailwindcss.
 * Herhangi bir Vite/Next projesine bırakıp <Agoraswipe /> olarak render edebilirsin.
 *
 * Tasarım dili: "Gece Agorası" — derin mürekkep zemini, sıcak mermer tipografi,
 * kategori bazlı vurgu tonları. index.html'deki CDN'siz prototiple birebir aynı UX.
 */
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DATA = [
  {
    cat: "Sosyoloji", icon: "🌍", acc: "#4fa8a0",
    kicker: "Gözetim toplumu",
    hook: "İzlenmediğin anlarda bile neden izleniyormuş gibi davranıyorsun?",
    text: "Jeremy Bentham'ın Panoptikon'u, tek bir gardiyanın tüm mahkûmları görebildiği ama mahkûmların ne zaman izlendiklerini asla bilemediği bir hapishane tasarımıydı. Foucault'ya göre bunun dehası şu: izlenip izlenmediğini bilmeyen insan, kendi kendinin gardiyanı olur. Sosyal medyadaki hâlini düşün.",
    src: "Michel Foucault — Hapishanenin Doğuşu (1975)",
  },
  {
    cat: "Felsefe", icon: "🏛️", acc: "#c9a96a",
    kicker: "Nietzsche'nin formülü",
    hook: "Kaderini değiştirmeyi değil, onu sevmeyi dene: Amor Fati.",
    text: "Nietzsche'ye göre insandaki büyüklüğün formülü, olanın başka türlü olmasını istememektir — ne ileride, ne geride, ne de sonsuza dek. Zorunlu olana katlanmak yetmez; onu gizlemek hiç yetmez. Onu sevmek gerekir. Pişmanlığın panzehiri budur.",
    src: "Friedrich Nietzsche — Ecce Homo (1888)",
  },
  {
    cat: "Tarih", icon: "📜", acc: "#c2764f",
    kicker: "Zaman algını kıran gerçek",
    hook: "Kleopatra, piramitlerin inşasından çok Ay'a inişe yakın yaşadı.",
    text: "Büyük Giza Piramidi MÖ 2560 civarında tamamlandı. Kleopatra ise MÖ 30'da öldü — yani piramitlere yaklaşık 2500, Apollo 11'e ise sadece 2000 yıl uzaklıkta. Antik Mısır o kadar uzun sürdü ki, Kleopatra piramitlere bizim ona baktığımızdan daha 'antik' bir gözle bakıyordu.",
    src: "MÖ 2560 → MÖ 30 → MS 1969",
  },
  {
    cat: "Felsefe", icon: "🏛️", acc: "#c9a96a",
    kicker: "Stoacı sükûnetin sırrı",
    hook: "Huzursuzluğun tek kaynağı: kontrol edemediğini kontrol etmeye çalışmak.",
    text: "Epiktetos köle olarak doğdu ve özgürlüğün en net tanımını yaptı: bazı şeyler bize bağlıdır (yargılarımız, seçimlerimiz), bazıları değildir (bedenimiz, ünümüz, başkalarının davranışları). Stoacılığın tamamı bu tek ayrımın üstüne kurulur. Enerjini yanlış kefeye koyduğun her an, kaybettiğin andır.",
    src: "Epiktetos — Enkheiridion (yak. MS 125)",
  },
  {
    cat: "Din", icon: "🕊️", acc: "#9a86c8",
    kicker: "Tarihin en tuhaf tesadüfü",
    hook: "Buda, Konfüçyüs ve Sokrates neredeyse aynı yüzyılda yaşadı.",
    text: "MÖ 800–200 arasında, birbirinden habersiz coğrafyalarda insanlık aynı anda uyandı: Hindistan'da Buda, Çin'de Konfüçyüs ve Lao Tzu, İran'da Zerdüşt geleneği, İsrail'de peygamberler, Yunanistan'da filozoflar. Karl Jaspers bu döneme 'Eksen Çağı' dedi — bugün hâlâ o çağın sorularıyla yaşıyoruz.",
    src: "Karl Jaspers — Tarihin Kaynağı ve Hedefi (1949)",
  },
  {
    cat: "Kitap", icon: "📖", acc: "#c07a8a",
    kicker: "İki distopya, tek kazanan",
    hook: "Orwell kitapların yasaklanmasından korktu. Huxley, kimsenin okumak istemeyeceğinden.",
    text: "Neil Postman'ın meşhur karşılaştırması: 1984'te bizi acı yönetir, Cesur Yeni Dünya'da haz. Orwell bilginin bizden gizlenmesinden korkuyordu; Huxley ise bilginin önemsizlik denizinde boğulmasından. Postman'a göre kazanan Huxley oldu. Şu an bu uygulamada olman bile bunun kanıtı sayılır.",
    src: "Neil Postman — Televizyon: Öldüren Eğlence (1985)",
  },
  {
    cat: "Felsefe", icon: "🏛️", acc: "#c9a96a",
    kicker: "2400 yıllık bulmaca",
    hook: "Her parçası değişen gemi hâlâ aynı gemi mi? Peki ya sen?",
    text: "Atinalılar, Theseus'un gemisini onardıkça eski tahtaların hepsi yenileriyle değişti. Plutarkhos sordu: bu hâlâ aynı gemi mi? Hobbes işi büyüttü: ya biri eski tahtalardan ikinci bir gemi yaparsa? Vücudundaki atomların büyük kısmı yıllar içinde değiştiğine göre, soru aslında seninle ilgili.",
    src: "Plutarkhos — Paralel Hayatlar, Theseus",
  },
  {
    cat: "Sosyoloji", icon: "🌍", acc: "#4fa8a0",
    kicker: "Beynindeki misafir listesi",
    hook: "Beynin en fazla 150 kişilik bir kasabaya göre tasarlandı.",
    text: "Antropolog Robin Dunbar, primatlarda beyin korteksinin büyüklüğü ile grup boyutu arasında ilişki buldu. İnsan için sınır: anlamlı ilişki sürdürebileceğimiz yaklaşık 150 kişi. Neolitik köyler, Roma birlikleri ve modern şirket ekipleri hep bu sayının etrafında kümelenir. 5000 takipçin olabilir; kabilen hâlâ 150 kişi.",
    src: "Robin Dunbar — 'Dunbar Sayısı' (1992)",
  },
  {
    cat: "Tarih", icon: "📜", acc: "#c2764f",
    kicker: "Her şeyi tersine çeviren kazı",
    hook: "Göbekli Tepe'yi inşa edenler henüz çiftçiliği bile bilmiyordu.",
    text: "Ders kitapları şöyle diyordu: önce tarım, sonra yerleşim, en son din. Şanlıurfa'daki Göbekli Tepe (MÖ ~9500) bu sırayı bozdu — avcı-toplayıcılar, tarımdan önce dev taş sütunlu tapınaklar dikmişti. Belki de medeniyeti başlatan şey karın tokluğu değil, birlikte inanma ihtiyacıydı.",
    src: "Klaus Schmidt kazıları, 1995–2014",
  },
];

const SERIF = { fontFamily: '"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif' };
const pop = { scale: [0.6, 1.3, 1], transition: { duration: 0.45, ease: [0.2, 1.6, 0.4, 1] } };

function ActionRail({ item, liked, saved, onLike, onSave, onShare }) {
  return (
    <div className="absolute right-4 bottom-14 z-10 flex flex-col items-center gap-6">
      <motion.button aria-label="Beğen" whileTap={{ scale: 0.8 }} onClick={onLike}
        className="flex flex-col items-center gap-1">
        <motion.svg animate={liked ? pop : {}} viewBox="0 0 24 24" className="h-8 w-8"
          fill={liked ? "#e0655f" : "none"} stroke={liked ? "#e0655f" : "#ede6d6"} strokeWidth="1.7">
          <path d="M12 21c-5.5-4.1-9-7.3-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.7-3.5 6.9-9 11z" />
        </motion.svg>
        <small className="text-[11px] text-[#b9b2a2] tabular-nums">{item.likes}</small>
      </motion.button>
      <motion.button aria-label="Kaydet" whileTap={{ scale: 0.8 }} onClick={onSave}
        className="flex flex-col items-center gap-1">
        <motion.svg animate={saved ? pop : {}} viewBox="0 0 24 24" className="h-8 w-8"
          fill={saved ? item.acc : "none"} stroke={saved ? item.acc : "#ede6d6"} strokeWidth="1.7">
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
        </motion.svg>
        <small className="text-[11px] text-[#b9b2a2]">Kaydet</small>
      </motion.button>
      <motion.button aria-label="Paylaş" whileTap={{ scale: 0.8 }} onClick={onShare}
        className="flex flex-col items-center gap-1">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#ede6d6" strokeWidth="1.7">
          <path d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M5 13v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6" />
        </svg>
        <small className="text-[11px] text-[#b9b2a2]">Paylaş</small>
      </motion.button>
    </div>
  );
}

export default function Agoraswipe() {
  const items = useRef(DATA.map((d) => ({ ...d, likes: `${(Math.random() * 4 + 1.2).toFixed(1)}b` }))).current;
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(null);
  const [burst, setBurst] = useState(null); // {i, x, y}
  const lastTap = useRef(0);
  const toastTimer = useRef();

  const say = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const share = (d) => {
    const payload = `${d.hook} — Agoraswipe`;
    if (navigator.share) navigator.share({ text: payload }).catch(() => {});
    else navigator.clipboard?.writeText(payload).then(() => say("Panoya kopyalandı"));
  };

  const doubleTap = (i) => (e) => {
    if (e.target.closest("button")) return;
    const now = Date.now();
    if (now - lastTap.current < 350) {
      setLiked((s) => ({ ...s, [i]: true }));
      const r = e.currentTarget.getBoundingClientRect();
      setBurst({ i, x: e.clientX - r.left, y: e.clientY - r.top, key: now });
      setTimeout(() => setBurst(null), 850);
    }
    lastTap.current = now;
  };

  return (
    <div className="h-dvh overflow-y-auto snap-y snap-mandatory bg-[#0b0e14] text-[#ede6d6] antialiased overscroll-y-contain">
      {/* üst bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-[#0b0e14]/85 to-transparent">
        <div className="flex items-center gap-2.5">
          <span className="grid h-[22px] w-[22px] place-items-center rounded-full border-[1.5px] border-[#ede6d6] text-[13px]" style={SERIF}>α</span>
          <span className="text-xl tracking-wide" style={SERIF}>Agora<i>swipe</i></span>
        </div>
        <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#b9b2a2]">Doomscroll'a veda</span>
      </header>

      {/* ilerleme rayı */}
      <nav aria-label="İlerleme" className="fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-[7px]">
        {items.map((_, i) => (
          <motion.span key={i} className="w-[3px] rounded-full"
            animate={{ height: active === i ? 26 : 16, backgroundColor: active === i ? "#ede6d6" : "rgba(237,230,214,0.18)" }} />
        ))}
      </nav>

      {items.map((d, i) => (
        <motion.section key={i} onPointerUp={doubleTap(i)}
          onViewportEnter={() => setActive(i)} viewport={{ amount: 0.6 }}
          className="relative flex h-dvh snap-start snap-always flex-col justify-end overflow-hidden px-6 pb-14 sm:px-[6vw]"
          style={{
            background: `radial-gradient(120% 90% at 18% 8%, ${d.acc}29, transparent 60%),
                         radial-gradient(110% 80% at 85% 100%, ${d.acc}17, transparent 55%),
                         linear-gradient(#11151f,#0b0e14)`,
          }}>
          {/* kategori çipi */}
          <motion.span initial={{ opacity: 0, y: -14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.6 }}
            className="mb-auto mt-24 inline-flex items-center gap-2 self-start rounded-full border px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.2em]"
            style={{ borderColor: `${d.acc}8c`, background: `${d.acc}1f`, color: d.acc }}>
            <span aria-hidden="true">{d.icon}</span> {d.cat}
          </motion.span>

          {/* içerik */}
          <div className="relative z-[2] max-w-xl pr-20">
            {[
              <p key="k" className="mb-3.5 text-[11px] uppercase tracking-[0.24em]" style={{ color: d.acc }}>{d.kicker}</p>,
              <h2 key="h" className="mb-4 text-[clamp(30px,6.2vw,46px)] font-medium leading-[1.12] [text-wrap:balance]" style={SERIF}>{d.hook}</h2>,
              <p key="t" className="mb-5 max-w-[60ch] text-[16px] leading-relaxed opacity-90">{d.text}</p>,
              <p key="s" className="flex items-center gap-2.5 text-[12.5px] text-[#b9b2a2] before:h-px before:w-6 before:flex-none" >
                <span className="h-px w-6 flex-none" style={{ background: d.acc }} />{d.src}
              </p>,
            ].map((el, j) => (
              <motion.div key={j} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6 }} transition={{ duration: 0.6, delay: j * 0.08, ease: [0.2, 0.7, 0.2, 1] }}>
                {el}
              </motion.div>
            ))}
          </div>

          <ActionRail item={d} liked={liked[i]} saved={saved[i]}
            onLike={() => setLiked((s) => ({ ...s, [i]: !s[i] }))}
            onSave={() => { setSaved((s) => ({ ...s, [i]: !s[i] })); say(saved[i] ? "Kayıt kaldırıldı" : "Kütüphanene kaydedildi"); }}
            onShare={() => share(d)} />

          {/* çift dokunuş kalp patlaması */}
          <AnimatePresence>
            {burst?.i === i && (
              <motion.span key={burst.key} className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 text-7xl"
                style={{ left: burst.x, top: burst.y }}
                initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.15, 1.5], y: -70 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>🤍</motion.span>
            )}
          </AnimatePresence>

          {i === 0 && (
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute inset-x-0 bottom-3 flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-[#b9b2a2]">
              Kaydır <span aria-hidden="true">↓</span>
            </motion.div>
          )}
        </motion.section>
      ))}

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#ede6d6] px-4.5 py-2.5 text-[13.5px] text-[#0b0e14]">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
