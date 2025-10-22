import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function WeddingInvite() {
  // 💍 Data pasangan & acara
  const bride = "Stefany";
  const groom = "Yudit";
  const date = "Sabtu, 27 Desember 2025";
  const time = "10:00 WIB";
  const venue = "GKJ Sidomukti Salatiga";
  const address = "GKJ Sidomukti Salatiga";
  const googleMapsQuery = encodeURIComponent(address);

  // 📸 Foto dan 🎵 Musik
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

  // 🎧 Musik player state
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // 📸 Popup zoom foto
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const openPhoto = (src) => setSelectedPhoto(src);
  const closePhoto = () => setSelectedPhoto(null);

  // 🎵 Fade-in lembut
  function fadeInAudio(audio) {
    audio.volume = 0;
    let vol = 0;
    const fadeInterval = setInterval(() => {
      vol += 0.05;
      if (vol >= 1) {
        vol = 1;
        clearInterval(fadeInterval);
      }
      audio.volume = vol;
    }, 150);
  }

  // 🎵 Setup dan kontrol musik
  useEffect(() => {
    const audio = new Audio(playlist[currentTrack].src);
    audioRef.current = audio;
    audio.loop = false;
  
    const tryPlay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log("🎵 Autoplay berhasil");
        })
        .catch(() => {
          console.log("🔇 Autoplay diblokir, menunggu interaksi pengguna...");
        });
    };
  
    // Coba autoplay langsung
    tryPlay();
  
    // Kalau autoplay diblokir, mulai saat user klik di mana saja
    const handleUserInteraction = () => {
      if (!isPlaying) {
        tryPlay();
      }
      document.removeEventListener("click", handleUserInteraction);
    };
    document.addEventListener("click", handleUserInteraction);
  
    // Kalau lagu selesai, lanjut ke lagu berikutnya dan otomatis play
    audio.onended = () => {
      const nextIndex = (currentTrack + 1) % playlist.length;
      setCurrentTrack(nextIndex);
      setTimeout(() => {
        const newAudio = new Audio(playlist[nextIndex].src);
        audioRef.current = newAudio;
        newAudio.play().then(() => setIsPlaying(true));
      }, 300);
    };
  
    return () => {
      audio.pause();
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [currentTrack]);

  // Tombol Play/Pause
  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  // Tombol Mute/Unmute
  function toggleMute() {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }

  // Fungsi Next Track tanpa echo
  function nextTrack(auto = false) {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setCurrentTrack((prev) => {
      const next = (prev + 1) % playlist.length;
      if (auto || isPlaying) {
        setTimeout(() => {
          const nextAudio = audioRef.current;
          if (nextAudio) {
            nextAudio.play().catch(() => {});
          }
        }, 500);
      }
      return next;
    });
  }

  // 🎀 Tambahkan font elegan
  useEffect(() => {
    const href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap";
    if (!document.querySelector(`link[href='${href}']`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  // 💐 Tampilan undangan
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-rose-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-rose-100 relative">

        {/* 🎵 Kontrol Musik */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full shadow flex items-center gap-2 px-3 py-1 text-sm text-rose-600 z-10">
          <button onClick={togglePlay} className="font-medium hover:text-rose-800">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={() => nextTrack(false)} className="hover:text-rose-800">
            Next
          </button>
          <button onClick={toggleMute} className="hover:text-rose-800">
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <span className="text-xs font-light truncate max-w-[100px]">
            {playlist[currentTrack].title}
          </span>
        </div>

        {/* 💌 Isi Undangan */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <h1 className="font-playfair text-4xl md:text-5xl leading-tight text-rose-800">
              {bride} &amp; {groom}
            </h1>
            <p className="mt-3 text-sm md:text-base text-rose-600 font-medium">
              Kami mengundang Anda untuk hadir di pernikahan kami
            </p>

            <div className="mt-6 p-4 rounded-xl border border-rose-100 bg-rose-50/40">
              <p className="text-sm text-rose-700">{date}</p>
              <p className="text-sm text-rose-700">Pukul {time}</p>
              <p className="text-sm text-rose-700 font-medium mt-2">{venue}</p>
              <p className="text-xs text-rose-600 mt-1">{address}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${googleMapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-rose-700 text-white font-medium shadow hover:opacity-90"
              >
                Lihat Peta
              </a>
            </div>

            <p className="mt-6 text-sm text-rose-600">
              Dresscode: Semi Formal — Warna pastel dianjurkan.
            </p>
          </motion.div>

          {/* 📸 Foto & Galeri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-6 md:p-0 bg-rose-50 flex flex-col gap-4 items-center justify-center"
          >
            <div className="w-full md:h-full flex items-center justify-center">
              <img
                src={mainPhoto}
                alt="couple"
                className="rounded-xl object-cover w-full h-72 md:h-full md:rounded-l-2xl md:rounded-r-none cursor-pointer"
                onClick={() => openPhoto(mainPhoto)}
              />
            </div>
            <div className="w-full mt-3 grid grid-cols-3 gap-2">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`gallery-${i}`}
                  className="rounded-md h-20 w-full object-cover cursor-pointer hover:scale-105 transition"
                  onClick={() => openPhoto(photo)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-8 text-xs text-rose-400 border-t text-center">
          © {new Date().getFullYear()} Undangan {bride} &amp; {groom} — dibuat dengan ♥
        </div>
      </div>

      {/* 🖼️ Popup Foto Zoom */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={closePhoto}
        >
          <div className="relative">
            <img
              src={selectedPhoto}
              alt="Zoomed"
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closePhoto}
              className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-2 shadow hover:bg-gray-200 transition"
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
