import { forwardRef, useEffect, useRef } from "react";

type ImageWithPreviewProps = {
  hugeSrc?: string;
  onHugeLoad?: () => void;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const ImageWithPreview = forwardRef<
  HTMLImageElement | null,
  ImageWithPreviewProps
>(({ hugeSrc, onHugeLoad, ...props }, forwardedRef) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!hugeSrc) return;

    const img = new Image();

    img.onload = () => {
      onHugeLoad?.();

      if (!imageRef.current) return;
      imageRef.current.src = img.src;
    };

    img.src = hugeSrc;

    return () => {
      img.onload = null;
    };
  }, [hugeSrc]);

  return (
    <img
      ref={(ref) => {
        imageRef.current = ref;
        if (forwardedRef) {
          //WTF??????
          (forwardedRef as any).current = ref;
        }
      }}
      {...props}
    />
  );
});
