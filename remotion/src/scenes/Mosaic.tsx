import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { COLORS, products } from "../theme";
import { display, body } from "../fonts";

const picks = [
  "numeris.jpeg",
  "adilette.jpeg",
  "greyjeans.jpeg",
  "coachslides.jpeg",
  "pumasuede-black.jpeg",
  "slides.jpeg",
  "tees.jpeg",
  "sweatpants.jpeg",
  "campus.jpeg",
];

export const Mosaic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const head = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 24 });

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{ padding: 70, justifyContent: "center", gap: 54 }}>
        <div style={{ opacity: head, transform: `translateY(${interpolate(head, [0, 1], [40, 0])}px)` }}>
          <div
            style={{
              fontFamily: body,
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: 10,
              color: COLORS.gold,
              textTransform: "uppercase",
            }}
          >
            The Vault
          </div>
          <div
            style={{
              fontFamily: display,
              fontSize: 96,
              lineHeight: 0.95,
              color: COLORS.cream,
              textTransform: "uppercase",
              marginTop: 14,
            }}
          >
            Sneakers · Slides
            <br />
            Boots · Denim
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {picks.map((p, i) => {
            const s = spring({ frame: frame - 10 - i * 4, fps, config: { damping: 16, stiffness: 130 } });
            return (
              <div
                key={p}
                style={{
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: 18,
                  border: `1px solid rgba(231,166,60,0.35)`,
                  transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`,
                  opacity: s,
                  backgroundColor: COLORS.bgSoft,
                }}
              >
                <Img
                  src={staticFile(`images/${p}`)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${1 + Math.sin((frame + i * 20) / 70) * 0.04})`,
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontFamily: body,
            fontWeight: 700,
            fontSize: 34,
            color: COLORS.muted,
            letterSpacing: 4,
            textTransform: "uppercase",
            textAlign: "center",
            opacity: interpolate(frame, [50, 66], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          }}
        >
          {products.length}+ pieces in stock
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
