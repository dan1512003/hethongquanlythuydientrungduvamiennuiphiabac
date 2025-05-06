// CustomMarker.tsx
import { memo } from "react";
import thuyvan from "../../assets/thuyvan.jpg" 

 
function Icon1({ src = thuyvan, size = 30 }) {
  return (
    <img
    src={src}
    width={size}
    height={size}
    style={{  cursor: "pointer",
      borderRadius: "50%",      // chuyển thành hình tròn
      objectFit: "cover",       // cắt ảnh vừa khung
      display: "block",
      border:"1px solid black",
    }}
    alt="icon"
  />
  );
}
export default memo(Icon1);