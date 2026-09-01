import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Backdrop } from "./components/Backdrop";
import { Intro } from "./scenes/Intro";
import { ProductHero } from "./scenes/ProductHero";
import { Mosaic } from "./scenes/Mosaic";
import { CTA } from "./scenes/CTA";
import { COLORS } from "./theme";

const heroes = [
  { img: "jordan4.jpeg", name: "Air Jordan 4", sub: "White Cement" },
  { img: "samba.jpeg", name: "Adidas Samba", sub: "White / Black" },
  { img: "boston.jpeg", name: "Boston Clogs", sub: "Suede & Leather" },
  { img: "timberland.jpeg", name: "Timberland 6″", sub: "Wheat Premium" },
  { img: "polohoodie.jpeg", name: "Polo Full-Zip", sub: "Heather Grey" },
];

const INTRO = 90;
const HERO = 78;
const MOSAIC = 108;
const CTA_LEN = 132;
const T = 16;

export const TOTAL_FRAMES =
  INTRO + HERO * heroes.length + MOSAIC + CTA_LEN - T * (1 + heroes.length + 1);

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO}>
          <AbsoluteFill>
            <Backdrop />
            <Intro />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />

        {heroes.flatMap((h, i) => [
          <TransitionSeries.Sequence key={h.img} durationInFrames={HERO}>
            <ProductHero {...h} index={i} />
          </TransitionSeries.Sequence>,
          <TransitionSeries.Transition
            key={`${h.img}-t`}
            presentation={i % 2 === 0 ? slide({ direction: "from-right" }) : slide({ direction: "from-left" })}
            timing={linearTiming({ durationInFrames: T })}
          />,
        ])}

        <TransitionSeries.Sequence durationInFrames={MOSAIC}>
          <Mosaic />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={CTA_LEN}>
          <CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
