import { ImgHTMLAttributes } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const Image = ({ fallbackSrc = "/img/fallback.svg", ...props }: ImageProps) => {
  return <img {...props} onError={(event) => (event.currentTarget.src = fallbackSrc)} />;
};
