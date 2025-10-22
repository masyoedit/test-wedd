import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function WeddingInvite() {
  const bride = "Stefany";
  const groom = "Yudit";
  const date = "Sabtu, 27 Desember 2025";
  const time = "10:00 WIB";
  const venue = "GKJ Sidomukti Salatiga";
  const address = "GKJ Sidomuksi Salatiga";
  const googleMapsQuery = encodeURIComponent(address);

  const mainPhoto = "/images/main-photo.jpg";
  const galleryPhotos = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
  ];

  const playlist = [
    { title: "Perfect - Ed Sheeran", src: "/music/perfect.mp3" },
    { title: "All of Me - John Legend", src: "/music/allofme.mp3" },
    { title: "A Thousand Years - Christina Perri", src: "/music/athousandyears.mp3" },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(playlist[currentTrack].src);
    audioRef.current = audio;
    audio.loop = false;

    audio.onended = () => {
      nextTrack();
    };

    return () => {
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (isFirstPlay) {
        fadeInAudio(audio);
        setIsFirstPlay(false);
      } else {
        audio.play().catch(()=>{});
      }
      setIsPlaying(true);
    }
  }

  function fadeInAudio(audio) {
    try {
      audio.volume = 0;
      audio.play().catch(()=>{});
      let vol = 0;
      const fadeInterval = setInterval(() => {
        vol += 0.05;
        if (vol >= 1) {
          vol = 1;
          clearInterval(fadeInterval);
        }
        audio.volume = vol;
      }, 150); // sekitar 3 detik
    } catch (e) {
      console.warn("Audio play prevented:", e);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  function nextTrack() {
    const audio = audioRef.current;
    if (audio) audio.pause();
    function nextTrack() {
    const audio = audioRef.current;
    if (audio) audio.pause();

    const nextIndex = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextIndex);

    // Tunggu sebentar agar state update, lalu mainkan lagu baru
    setTimeout(() => {
      const newAudio = new Audio(playlist[nextIndex].src);
      audioRef.current = newAudio;
      newAudio.play();
      setIsPlaying(true);
    }, 300);
  }

  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);

  useEffect(() => {
    const href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap";
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  function handleRsvpSubmit(e) {
    e.preventDefault();
    setRsvpSent(true);
    setTimeout(() => {
      setIsRsvpOpen(false);
      setRsvpSent(false);
      setRsvpName("");
      setRsvpGuests(1);
      setRsvpMessage("");
      alert("Terima kasih — konfirmasi Anda telah tersimpan (simulasi).");
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-rose-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-rose-100 relative">
        {/* === Music Player Controls === */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full shadow flex items-center gap-2 px-3 py-1 text-sm text-rose-600 z-10">
          <button onClick={togglePlay} className="font-medium hover:text-rose-800">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={nextTrack} className="hover:text-rose-800">Next</button>
          <button onClick={toggleMute} className="hover:text-rose-800">
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <span className="text-xs font-light truncate max-w-[100px]">{playlist[currentTrack].title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="p-8 md:p-12 flex flex-col justify-center">
            <h1 className="font-playfair text-4xl md:text-5xl leading-tight text-rose-800">{bride} &amp; {groom}</h1>
            <p className="mt-3 text-sm md:text-base text-rose-600 font-medium">Kami mengundang Anda untuk hadir di pernikahan kami</p>

            <div className="mt-6 p-4 rounded-xl border border-rose-100 bg-rose-50/40">
              <p className="text-sm text-rose-700">{date}</p>
              <p className="text-sm text-rose-700">Pukul {time}</p>
              <p className="text-sm text-rose-700 font-medium mt-2">{venue}</p>
              <p className="text-xs text-rose-600 mt-1">{address}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setIsRsvpOpen(true)} className="px-4 py-2 rounded-full border border-rose-300 text-rose-700 font-medium hover:shadow">Konfirmasi Kehadiran</button>
              <a href={`https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-rose-700 text-white font-medium shadow">Lihat Peta</a>
            </div>

            <p className="mt-6 text-sm text-rose-600">Kami yang berbahagia</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="p-6 md:p-0 bg-rose-50 flex flex-col gap-4 items-center justify-center">
            <div className="w-full md:h-full flex items-center justify-center">
              <img src={mainPhoto} alt="couple" className="rounded-xl object-cover w-full h-72 md:h-full md:rounded-l-2xl md:rounded-r-none" />
            </div>
            <div className="w-full mt-3 grid grid-cols-3 gap-2">
              {galleryPhotos.map((photo, i) => (
                <img key={i} src={photo} alt={`gallery-${i}`} className="rounded-md h-20 w-full object-cover" />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="p-8 text-xs text-rose-400 border-t text-center">© {new Date().getFullYear()} Undangan {bride} &amp; {groom} — dibuat dengan ♥</div>
      </div>

      {isRsvpOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }} className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="text-lg font-semibold text-rose-700">Konfirmasi Kehadiran</h3>
            <form className="mt-4 flex flex-col gap-3" onSubmit={handleRsvpSubmit}>
              <input required value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} placeholder="Nama lengkap" className="px-3 py-2 border rounded-md text-sm" />
              <input required type="number" min={1} value={rsvpGuests} onChange={(e) => setRsvpGuests(Number(e.target.value))} placeholder="Jumlah tamu" className="px-3 py-2 border rounded-md text-sm" />
              <textarea value={rsvpMessage} onChange={(e) => setRsvpMessage(e.target.value)} placeholder="Pesan / ucapan (opsional)" className="px-3 py-2 border rounded-md text-sm h-20" />
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => setIsRsvpOpen(false)} className="px-3 py-2 rounded-md border">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-rose-700 text-white font-medium">{rsvpSent ? 'Mengirim...' : 'Kirim'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/*
✨ Pembaruan:
- Musik autoplay dengan fade-in 3 detik hanya saat pertama kali diputar.
- Kontrol Play/Pause, Next, dan Mute/Unmute di pojok kanan atas.
- Ganti foto & musik di folder public/images dan public/music.
*/

