// CustomMarker.tsx
import { memo } from "react";
import ho from "../../assets/ho.png";



function Icon4({ size = 30}) {
  // cái này để ảnh nhỏ hơn khung chứa, giúp nền còn hiện ra
  const innerSize = size * 0.8;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        border:"1px solid black",
      }}
    >
      <img
        src={ho}
        width={innerSize}
        height={innerSize}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
        }}
        alt="icon"
      />
    </div>
  );
}

export default memo(Icon4);