import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { COLORS } from "../theme";
import { display, body } from "../fonts";

const strip = ["jordan4.jpeg", "boston.jpeg", "timberland.jpeg", "airmax95.jpeg"];

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const num = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 150 } });
  const pulse = 1 + Math.sin(frame / 9) * 0.02;

  return (
    <AbsoluteFill>
      <Backdrop />
      <AbsoluteFill style={{ padding: 80, justifyContent: "center", alignItems: "center", gap: 46 }}>
        <div style={{ display: "flex", gap: 16, opacity: interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" }) }}>
          {strip.map((p, i) => {
            const s = spring({ frame: frame - i * 4, fps, config: { damping: 18, stiffness: 140 } });
            return (
              <div
                key={p}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid rgba(231,166,60,0.4)`,
                  transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
                }}
              >
                <Img src={staticFile(`images/${p}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            transform: `translateY(${interpolate(head, [0, 1], [50, 0])}px)`,
            opacity: head,
          }}
        >
          <div
            style={{
              fontFamily: display,
              fontSize: 118,
              lineHeight: 0.92,
              color: COLORS.cream,
              textTransform: "uppercase",
            }}
          >
            Order Via
            <br />
            <span style={{ color: COLORS.gold }}>WhatsApp</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontFamily: body,
              fontWeight: 500,
              fontSize: 32,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            Nationwide delivery · Accra pickup
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "26px 56px",
            borderRadius: 999,
            background: COLORS.gold,
            transform: `scale(${interpolate(num, [0, 1], [0.75, 1]) * pulse})`,
            opacity: num,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill={COLORS.bg}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <div style={{ fontFamily: display, fontSize: 76, color: COLORS.bg, letterSpacing: 2 }}>055 876 3858</div>
        </div>

        <div
          style={{
            marginTop: 10,
            fontFamily: display,
            fontSize: 54,
            letterSpacing: 8,
            color: COLORS.gold,
            textTransform: "uppercase",
            opacity: interpolate(frame, [60, 78], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          }}
        >
          Pobe’s Vault
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
