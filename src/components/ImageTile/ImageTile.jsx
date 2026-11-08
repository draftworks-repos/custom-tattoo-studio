import React, { useState } from "react";
import "./ImageTile.css";

export const ImageTile = ({
  src,
  alt = "",
  width,
  height,
  className = "",
  aspectRatio,
  tone = false,
  cursorView = false,
  fetchPriority,
  loading = "lazy",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`image-tile ${loaded ? "image-tile--loaded" : ""} ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      data-cursor={cursorView ? "view" : undefined}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        className={`image-tile__img ${tone ? "tone" : ""}`}
        draggable={false}
        {...props}
      />
    </div>
  );
};
