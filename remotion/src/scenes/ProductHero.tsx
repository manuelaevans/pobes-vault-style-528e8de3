import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { display, body } from "../fonts";

type Props = {
  img: string;
  name: string;
  sub: string;
  index: number;
};

export const ProductHero: React.FC<Props> = ({ img, name, sub, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flip = index % 2 === 0;

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const zoom = interpolate(frame, [0, 80], [1.06, 1.16]);
  const slide = interpolate(enter, [0, 1], [flip ? 120 : -120, 0]);

  const nameIn = spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 140 } });


  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile(`images/${img}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom}) translateX(${slide * 0.25}px)`,
            opacity: interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(12,11,9,0.75) 0%, rgba(12,11,9,0.05) 32%, rgba(12,11,9,0.2) 55%, rgba(12,11,9,0.95) 100%)",
        }}
      />

      <AbsoluteFill style={{ padding: 80, justifyContent: "space-between" }}>
        <div
          style={{
            fontFamily: body,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: COLORS.gold,
            opacity: interpolate(frame, [4, 20], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            alignSelf: flip ? "flex-start" : "flex-end",
          }}
        >
          Pobe’s Vault
        </div>

        <div style={{ textAlign: flip ? "left" : "right" }}>
          <div
            style={{
              fontFamily: display,
              textTransform: "uppercase",
              fontSize: 104,
              lineHeight: 0.92,
              color: COLORS.cream,
              transform: `translateY(${interpolate(nameIn, [0, 1], [70, 0])}px)`,
              opacity: nameIn,
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontFamily: body,
              fontSize: 32,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: COLORS.muted,
              opacity: interpolate(frame, [20, 34], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            }}
          >
            {sub}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
