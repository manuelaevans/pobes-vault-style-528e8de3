import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { display, body } from "../fonts";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const title = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 90 } });
  const sub = interpolate(frame, [34, 52], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const drift = interpolate(frame, [0, 90], [0, -22]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: 90 }}>
      <div style={{ transform: `translateY(${drift}px)`, textAlign: "center" }}>
        <div
          style={{
            width: interpolate(line, [0, 1], [0, 220]),
            height: 3,
            background: COLORS.gold,
            margin: "0 auto 46px",
          }}
        />
        <div
          style={{
            fontFamily: display,
            fontSize: 150,
            lineHeight: 0.86,
            letterSpacing: -2,
            color: COLORS.cream,
            textTransform: "uppercase",
            transform: `scale(${interpolate(title, [0, 1], [0.82, 1])})`,
            opacity: title,
          }}
        >
          Pobe’s
          <br />
          <span style={{ color: COLORS.gold }}>Vault</span>
        </div>
        <div
          style={{
            marginTop: 44,
            fontFamily: body,
            fontSize: 34,
            letterSpacing: 14,
            color: COLORS.muted,
            textTransform: "uppercase",
            opacity: sub,
          }}
        >
          Accra · Ghana
        </div>
      </div>
    </AbsoluteFill>
  );
};
