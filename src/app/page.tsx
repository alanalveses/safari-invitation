
"use client";

import { Chewy, Ballet, MonteCarlo, Playball } from "next/font/google";
import { useEffect, useState, useRef } from "react";

const ballet = Ballet({ subsets: ["latin"], weight: "400" });

const montecarlo = MonteCarlo({ subsets: ["latin"], weight: "400" });
const playball = Playball({ subsets: ["latin"], weight: "400" });

const chewy = Chewy({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [clouds, setClouds] = useState<
    {
      top: number;
      left: number;
      width: number;
      opacity: number;
      rotate: number;
      duration: number;
      src: string;
    }[]
  >([]);

  useEffect(() => {
    const generateClouds = (count = 20) =>
      [...Array(count)].map((_, i) => {
        const width = 30 + Math.random() * 40;
        const widthPercent = (width / window.innerWidth) * 100;
        const maxLeftPercent = 100 - widthPercent;

        return {
          left: Math.random() * maxLeftPercent,
          top: Math.random() * 60, 
          width,
          opacity: 0.4 + Math.random() * 0.4,
          rotate: Math.random() * 10 - 5,
          duration: 6 + Math.random() * 4,
          src:
            i % 2 === 0 ? "/images/cloud-bg.png" : "/images/cloud-bg-two.png",
        };
      });

    setClouds(generateClouds(30));
  }, []);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = () => {
      audio.muted = false;
      audio.play().catch((err) => {
        console.warn("Erro ao tentar tocar áudio após interação:", err);
      });
      setMuted(false);

      window.removeEventListener("click", startAudio);
    };

    window.addEventListener("click", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      audio.play().catch((err) => {
        console.warn("Erro ao tentar tocar áudio:", err);
      });
    } else {
      audio.muted = true;
    }

    setMuted(!muted);
  };

  return (
    <main className="bg-[#cff0fe] min-h-screen font-fredoka lg:mx-80 md:mx-72">
      <button
        onClick={toggleMute}
        className="fixed top-2 right-2 z-50 bg-white/30 hover:bg-white/50 text-blue-900 backdrop-blur-md px-3 py-2 rounded-full flex items-center gap-2 transition"
      >
      </button>

      <audio ref={audioRef} src="/audio/safari.mp3" autoPlay loop />

      <header className="relative w-full overflow-hidden flex flex-col items-center justify-start">
        <div className="relative w-full min-h-[550px] flex flex-col items-center justify-start">
          <img
            src="/images/bg-home-cup.jpg"
            alt="Fundo Safari"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <img
            src="/images/bg-banner-alt.png"
            alt="Placa de Boas-vindas"
            className="w-full max-w-[700px] z-20"
          />

          {clouds.concat(clouds).map((cloud, i) => (
            <img
              key={i}
              src={cloud.src}
              alt="Nuvem"
              className="absolute z-10 cloud-animation"
              style={{
                top: `${cloud.top ?? Math.random() * 30}%`,
                left: `${cloud.left}%`,
                width: `${cloud.width}px`,
                opacity: cloud.opacity,
                transform: `rotate(${cloud.rotate}deg)`,
                animationDuration: `${cloud.duration}s`,
              }}
            />
          ))}

          <div className="z-20 mt-10 mb-8">
            <img
              src="/images/safari.png"
              alt="Carrinho Safari"
              className="w-44"
            />
          </div>
        </div>
      </header>

      <section className="relative w-full overflow-hidden flex flex-col items-center justify-start bg-green-100 py-14">
        <div className="relative w-full flex flex-col items-center justify-start">
          <div className="w-full h-[auto] aspect-[1280/720] bg-transparent z-0" />

          <p
            className={`${playball.className} text-xl text-amber-950 z-10 px-4 text-right -mt-40  max-w-xl relative`}
          >
            Desde o ventre materno dependo de ti; tu me sustentaste desde as
            entranhas de minha mãe. Eu sempre te louvarei!
            <br /> <strong>Salmo 71:6</strong>
          </p>
        </div>
      </section>

      <section className="relative bg-green-100 pb-32">
       
        <img
          src="/images/safari-left-title.png"
          alt="Imagem decorativa"
          className="absolute top-6 -left-3 w-96"
        />

        <img
          src="/images/raccoon.png"
          alt="Guaxinim animado"
          className="absolute top-0 left-20 w-24 z-10"
        />
      </section>

      <section className="grid grid-cols-2  bg-green-100  gap-4 px-6 py-14 ">
        {[
          {
            img: "/images/leon-b.png",
            head: "/images/leon-h.png",
            alt: "Leão",
            texto: 'Leão: "Veja todos os detalhes da aventura!"',
            bg: "bg-yellow-100",
            action: () => {
              document
                .getElementById("event-details")
                ?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            img: "/images/monkey-b.png",
            head: "/images/monkey-h.png",
            alt: "Macaco",
            texto: 'Macaco: "Confirme sua presença nessa aventura!"',
            bg: "bg-red-100",
            action: () => {
              document
                .getElementById("rsvp-form")
                ?.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            img: "/images/hipo-b.png",
            head: "/images/hipo-h.png",
            alt: "Hipopotamo",
            texto: 'Hipopotamo: "Siga-me até o lugar da festa!"',
            bg: "bg-purple-100",
            action: () => {
              window.open(
                "https://maps.app.goo.gl/qCXKALhqorKTi7Z26",
                "_blank"
              );
            },
          },
          {
            img: "/images/elephant-b.png",
            head: "/images/elephant-h.png",
            alt: "Elefante",
            texto: 'Elefante: "Vamos brincar de memória!"',
            bg: "bg-blue-100",
            action: () => {
              window.location.href = "/game";
            },
          },
        ].map(({ img, head, alt, texto, bg, action }, i) => (
          <button
            key={i}
            onClick={action}
            className={`${bg} rounded-xl p-4 text-center shadow focus:outline-none transition hover:scale-105 active:scale-95`}
          >
            <div className="relative w-16 mx-auto">
              <img
                src={head}
                alt={`${alt} cabeça`}
                className="absolute top-0 left-0 w-full z-10"
              />
              <img src={img} alt={alt} className="relative w-full z-0" />
            </div>
            <p className="mt-2 text-amber-950 font-bold text-sm drop-shadow-sm">
              {texto}
            </p>
          </button>
        ))}
      </section>

      <section id="event-details" className="relative w-full bg-[#f4d8a4] py-12 px-4 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-amber-950 mb-6 mt-4">
          Todo o safari já está em festa.
          <br />
          Anoita aí para não dar Zebra!
        </h2>

        <div className="bg-[url('/images/wood-sign.png')] bg-contain bg-no-repeat bg-center w-80 h-40 flex flex-col justify-center items-center text-white shadow-lg my-14">
          <img
            src="/images/board-date.png"
            className="w-40"
            alt="Plaça da Data e Horário"
          />
        </div>

        <div className="absolute -top-3 -left-3 w-24">
          <img src="/images/sun.png" alt="Sol" />
        </div>
        <div className="absolute top-0 left-42 w-24">
          <img src="/images/cloud-bg.png" alt="Nuvem" />
        </div>
        <div className="absolute top-0 right-3 w-24">
          <img src="/images/cloud-bg-two.png" alt="Nuvem" />
        </div>

        <div className="absolute bottom-0 left-0 w-24">
          <img src="/images/zebra.png" alt="Zebra" />
        </div>

        <div className="absolute bottom-0 right-0 w-24">
          <img src="/images/monkey.png" alt="Macaco" />
        </div>

        <div className="absolute bottom-0 right-50 w-52">
          <img src="/images/bush.png" alt="Moita" />
        </div>
      </section>

      <section
        className="relative bg-green-100 overflow-hidden text-center pb-10"
      >
        <img
          src="/images/bg-info.jpeg"
          alt="Fundo Safari"
          className="w-full h-auto object-cover"
        />
      </section>

      <section
        id="rsvp-form"
        className="relative p-6 py-10 bg-green-100 text-center overflow-hidden"
      >
        <img
          src="/images/rsvp-title.png"
          alt="Confirme sua presença"
          className="absolute top-6 -right-3 w-96 mt-9"
        />
        <img
          src="/images/squirrel.png"
          alt="Esquilo animado"
          className="absolute -top-2 right-20 w-24 mt-9 z-10"
        />

        <div className="pt-20 mt-9">
        </div>
      </section>

      <footer
  className="relative bg-blue-200 text-left py-6 pt-10 bg-no-repeat bg-bottom bg-cover h-64 flex flex-col justify-start"
  style={{
    backgroundImage: 'url("/images/footer-bg-alt.png")',
  }}
>
        <div className="w-full px-6 text-center">
          <p className="text-amber-950 font-semibold">
            Esperamos por você com muito carinho! 💖
          </p>
          <p className="text-amber-800">Com amor, mamãe e papai do Pedro.</p>
        </div>
      </footer>
    </main>
  );
}
