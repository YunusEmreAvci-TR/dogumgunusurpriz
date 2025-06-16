import { useEffect, useState, useRef } from "react";
import "../index.css";
import "../styles/GalleryPage.css";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/images/1.png";
import image2 from "../assets/images/2.png";
import image3 from "../assets/images/3.png";
import image4 from "../assets/images/4.png";
import image5 from "../assets/images/5.png";
import image6 from "../assets/images/6.png";
import image7 from "../assets/images/7.png";
import image9 from "../assets/images/9.png";
import image10 from "../assets/images/10.png";
import image12 from "../assets/images/12.png";
import image13 from "../assets/images/13.png";
import image14 from "../assets/images/14.png";
import image15 from "../assets/images/15.png";

import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const images = [
  {
    src: image1,
    alt: "Çilek elbiseli kız",
    title: "Melis",
    caption: "Çilek Elbiseli Kız",
    description:
      "Bunun tam hikayesini bilmiyorum ama mekan ve çilekli elbise baya güzel durmuş",
  },
  {
    src: image2,
    alt: "Dağ manzarası",
    title: "Melis",
    caption: "Kız Kıza Eğlence",
    description:
      "Arkada Watson reklamı var ama olsun, sanırım burada güzel bir konser vardı beraber katıldığınız",
  },
  {
    src: image3,
    alt: "Göl manzarası",
    title: "Melis",
    caption: "Kadıköy Pub Kızı",
    description:
      "Gördüğüm kadarıyla bir pub benzeri bir yerde gayet keyifli bir gezi olmuş",
  },
  {
    src: image4,
    alt: "Orman manzarası",
    title: "Melis",
    caption: "Bir gün Fransa",
    description:
      "Fransayı sevdiğini söylemiştin belki fiziksel olarak şuan gidilemese de ben gittin sayarım, Eyfel kulesi güzel gözüküyor",
  },
  {
    src: image5,
    alt: "Deniz manzarası",
    title: "Melis",
    caption: "Bir Gün Almanya",
    description:
      "Almanyayı sever misin sevmez misin bilemedim ama Köln Katedrali güzel bir yer bence gezip görmek istersin diye sen gezmeden önce fotoğrafı gelecekten çekip geldik.",
  },
  {
    src: image6,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Kayak Ustası",
    description:
      "Ekipmanları ve cesareti ile tamamen kaymaya odaklı kırmızı başlıklı kız",
  },
  {
    src: image7,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Aile Mutluluğu",
    description:
      "Herkesin bir araya geldiği yüzlerin güldüğü o muazzam, kimsenin bitmemesini istediği an",
  },

  {
    src: image9,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Agalarla Konser",
    description:
      "Gösterinin olduğu günün devamında diğer bir yerleşkede asla fırsatını kaçırmadığın agalarla toplanılmış konser etkinliği",
  },
  {
    src: image10,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Bir Gün İtalya",
    description:
      "Roma Kolezyumuna daha önce gitmemiş olsanda artık gittin sayılır",
  },
  {
    src: image12,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Küçük Melis",
    description:
      "2 hafta önceye ait yeni mezun olduğun bir fotoğraf sanırım, yaş olarak şuan ki zamandan çokta bir fark yok sanki",
  },
  {
    src: image13,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Anime Kızı Melis",
    description:
      "İnstagramda öne çıkarılanlara bakarken viking şapkalı seni görünce bir an bunu anime yapmak geldi aklıma, bunu aslında jinx tarzında tam Arcane dizisi içerisinde yapmak istiyordum hakkım doldu",
  },
  {
    src: image14,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Hürrem Sultan ve Bedirhan",
    description:
      "Bedirhanı 3 elli yaptı ama onu görmezden gel. Güzelliği ile nam salmış Hürrem Sultanın yanında kendi özel tasarımcısı Bedirhan Bey",
  },
  {
    src: image15,
    alt: "Şehir manzarası",
    title: "Melis",
    caption: "Hürrem Sultan ve Havuç Kafa",
    description:
      "Tacı ile gezmelere çıkmış Hürrem Sultanın peruğunu çalarak havuç kafaya dönüştüğüm o mistik an",
  },
];

const GalleryPage = () => {
  const galleryRef = useRef(null);
  const time = 10000;
  const [showTitle, setShowTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {}, 100);
    setTimeout(() => setShowTitle(true), 200);
    const obj = galleryRef.current;
    if (!obj) return;

    let timeoutId;

    const animStart = () => {
      if (!obj.classList.contains("active")) {
        obj.classList.add("active");
        timeoutId = setTimeout(() => {
          animEnd();
        }, time);
      }
    };

    const animEnd = () => {
      obj.classList.remove("active");
      void obj.offsetWidth;
    };

    const onScroll = () => animStart();
    const onResize = () => animStart();

    animStart();

    document.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(timeoutId);
      clearTimeout(timer);
    };
  }, []);

  const handleImageClick = (imageData) => {
    const image = {
      url: imageData.src,
      title: imageData.caption,
      description: imageData.description,
      photographer: imageData.title,
    };
    navigate("/image-detail", { state: { image } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#164e4e] via-[#3b2c3d] to-[#a05065] flex flex-col items-center px-0 md:px-0">
      <button className="back-button" onClick={() => navigate("/")}>
        Geri Dön
      </button>
      <div className="w-full flex justify-center">
        <div className="gallery-container w-full max-w-5xl px-4 sm:px-6 pt-16 pb-10 md:pt-24 md:pb-16 flex flex-col items-center">
          <h2
            style={{
              color: "#fff",
              textShadow: "0 4px 32px #000a, 0 1px 2px #0008",
              fontWeight: 800,
              fontSize: "2.5rem",
              marginBottom: ".5rem",
              marginTop: "2.5rem",
              letterSpacing: "-1px",
              opacity: showTitle ? 1 : 0,
              transform: showTitle ? "translateY(0)" : "translateY(-32px)",
              transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
              textAlign: "center",
            }}
          >
            Anıların
          </h2>
          <p style={{ color: "#fff", fontSize: ".9rem", fontWeight: 200 }}>
            Resimlerin üzerine tıklamayı unutma!
          </p>
          <main>
            <div id="gallery" ref={galleryRef}>
              {images.map((image, i) => (
                <figure
                  key={i}
                  onClick={() => handleImageClick(image)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    title={image.title}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Button
        variant="contained"
        size="medium"
        endIcon={<ArrowForwardIcon sx={{ fontSize: 22, ml: 0.5 }} />}
        onClick={() => navigate("/gift-page")}
        sx={{
          borderRadius: 9999,
          px: 3.5,
          py: 1.2,
          minWidth: 0,
          fontWeight: 600,
          fontSize: "1rem",
          letterSpacing: 0.5,
          background: "linear-gradient(90deg, #fff 0%, #ffe0ea 100%)",
          color: "#2d3436",
          transition: "all 0.3s ease",
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          "&:hover": {
            transform: "translateX(-50%) translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        Devam Et
      </Button>
    </div>
  );
};

export default GalleryPage;
