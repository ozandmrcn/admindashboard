"use client";

import { FC, useEffect, useState } from "react";
import Field from "./field";

interface Props {
  initialValue?: string;
}

const ImagePreview: FC<Props> = ({ initialValue }) => {
  const [url, setUrl] = useState<string>(initialValue || "");

  // inputun değişim anını izleyelim
  useEffect(() => {
    // resim url'İnin girildiği input elementini al
    const imageInput = document.getElementById("image_url") as HTMLInputElement;

    if (imageInput) {
      // Eğer prop değişirse state'i güncelle (opsiyonel ama iyi olur)
      if (initialValue) setUrl(initialValue);

      // inputun değişim anında çalışacak fonksiyon
      const handleChange = () => {
        setUrl(imageInput.value);
      };

      // inputa olay izleyicisi ekle
      imageInput.addEventListener("input", handleChange);

      // component unmount olduğunda olay izleyicisi kaldır
      return () => {
        imageInput.removeEventListener("input", handleChange);
      };
    }
  }, [initialValue]);

  return (
    <Field htmlFor="image_url" label="Resim Önizleme">
      <div className="relative h-48 w-full bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border border-gray-200">
        {url ? (
          <img
            src={url}
            className="h-full w-full object-contain"
            alt="önizleme"
            onError={(e) => {
              e.currentTarget.src =
                "https://www.pngkey.com/png/detail/233-2332677_image-500-px-png-no-image-available-png.png";
            }}
          />
        ) : (
          <div className="text-gray-400 text-sm">Resim URL'si girilmedi</div>
        )}
      </div>
    </Field>
  );
};

export default ImagePreview;
