import { SRC_URL } from "@/api/apiProxy";
import { AspectRatio, Skeleton } from "@mui/joy";
import { useState } from "react";

export interface Props {
  url: string;
  size?: string;
}

export default function ImageLoad({ url, size }: Props) {
  const [imgLoading, setImgLoading] = useState(false);
  return (
    <AspectRatio
      flex
      ratio="1"
      className="relative"
      sx={{ width: size, height: size, maxHeight:size, maxWidth:size, minWidth:size, minHeight: size, borderRadius: "50%" }}
    >
      {url && (
        <Skeleton animation="wave" loading={imgLoading}>
          <img
            srcSet={`${SRC_URL}/picture/${url}`}
            loading="lazy"
            alt=""
            onLoad={() => setImgLoading(false)}
          />
        </Skeleton>
      )}
    </AspectRatio>
  );
}
