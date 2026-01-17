import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCroppedImg } from "@/utils";
import { MutableRefObject, useCallback, useState } from "react";
import Cropper, { Area, Size } from "react-easy-crop";

interface ImageCropProps {
  setUploadedImage: (image: string) => void;
  fileInputRef: MutableRefObject<HTMLInputElement>;
  cropShape?: "round" | "rect";
  showGrid?: boolean;
  cropSize?: Size;
}

export const ImageCrop = ({
  setUploadedImage,
  fileInputRef,
  cropShape = "rect",
  showGrid = false,
  cropSize,
}: ImageCropProps) => {
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImageSrc(reader.result as string);
          setIsCropDialogOpen(true);
          setCrop({ x: 0, y: 0 });
          setZoom(1);
        });
        reader.readAsDataURL(file);
      }
      // Reset input so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [fileInputRef]
  );

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropCancel = useCallback(() => {
    setIsCropDialogOpen(false);
    setImageSrc(null);
  }, []);

  const handleCropApply = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setUploadedImage(croppedImage);
        setIsCropDialogOpen(false);
        setImageSrc(null);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  }, [imageSrc, croppedAreaPixels, setUploadedImage]);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Dialog open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen}>
        <DialogContent className="sm:max-w-md bg-background border-secondary">
          <DialogHeader>
            <DialogTitle className="text-foreground">Обрезать изображение</DialogTitle>
            <p className="text-muted-foreground text-sm">(Масштабирование колесиком мыши)</p>
          </DialogHeader>

          <div className="relative w-full h-72 bg-secondary/30 rounded-lg overflow-hidden">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape={cropShape}
                showGrid={showGrid}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropSize={cropSize}
                classes={{
                  containerClassName: "rounded-lg",
                }}
              />
            )}
          </div>

          <div className="flex justify-center gap-3 mt-4">
            <Button type="button" variant="outline" onClick={handleCropCancel} className="px-8">
              Отмена
            </Button>
            <Button type="button" onClick={handleCropApply} className="px-8">
              Применить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
