import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

export const Backdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 60;
  const drift2 = Math.cos(frame / 120) * 80;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1400,
          height: 1400,
          left: -400 + drift,
          top: -300 + drift2,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(231,166,60,0.16), rgba(231,166,60,0) 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          right: -420 - drift,
          bottom: -320 - drift2,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(231,166,60,0.10), rgba(231,166,60,0) 65%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
