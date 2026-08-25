import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

export const display = loadAnton("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const body = loadJakarta("normal", { weights: ["500", "700"], subsets: ["latin"] }).fontFamily;
