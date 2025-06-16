import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useImageStore } from "../store/imageStore";
import { useAuthStore } from "../store/authStore";
import { useToast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Loader2, ArrowLeft, Download, Share2 } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { getImage, deleteImage } = useImageStore();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageData = await getImage(id);
        if (!imageData) {
          toast({
            title: "Hata",
            description: "Görsel bulunamadı",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        setImage(imageData);
      } catch (error) {
        console.error("Görsel yüklenirken hata:", error);
        toast({
          title: "Hata",
          description: "Görsel yüklenirken bir hata oluştu",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [id, getImage, navigate, toast]);

  const handleDelete = async () => {
    if (!window.confirm("Bu görseli silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      await deleteImage(id);
      toast({
        title: "Başarılı",
        description: "Görsel başarıyla silindi",
      });
      navigate("/");
    } catch (error) {
      console.error("Görsel silinirken hata:", error);
      toast({
        title: "Hata",
        description: "Görsel silinirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `spotify-wrapped-${image.id}.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("İndirme hatası:", error);
      toast({
        title: "Hata",
        description: "Görsel indirilirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Spotify Wrapped Görselim",
          text: "Spotify Wrapped görselimi paylaşıyorum!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Başarılı",
          description: "Bağlantı panoya kopyalandı",
        });
      }
    } catch (error) {
      console.error("Paylaşım hatası:", error);
      toast({
        title: "Hata",
        description: "Paylaşım sırasında bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
          <p className="text-white text-lg">Görsel yükleniyor...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            className="text-white hover:text-purple-200"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Geri Dön
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={image?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[9/16] w-full max-w-md mx-auto bg-black/20 rounded-lg overflow-hidden shadow-2xl"
          >
            {!previewLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}

            {/* Küçük önizleme resmi */}
            <img
              src={image?.url.replace(".webp", "-preview.webp")}
              alt="Önizleme"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                previewLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setPreviewLoaded(true)}
              loading="eager"
            />

            {/* Ana resim */}
            <img
              src={image?.url}
              alt="Spotify Wrapped"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="eager"
              fetchpriority="high"
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-white/80 text-sm mb-4">
            {image?.createdAt &&
              format(new Date(image.createdAt), "d MMMM yyyy, HH:mm", {
                locale: tr,
              })}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={handleDownload}
              className="bg-white text-purple-900 hover:bg-purple-100"
            >
              <Download className="h-5 w-5 mr-2" />
              İndir
            </Button>

            <Button
              onClick={handleShare}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Paylaş
            </Button>

            {user && image?.userId === user.uid && (
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                Sil
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImageDetail;
