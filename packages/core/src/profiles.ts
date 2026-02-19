import type { VerificationProfile } from "./types.js";

export const profileRules: Record<
  VerificationProfile,
  { minimumLayers: Array<"A">; prohibitedClaims: string[] }
> = {
  "POLR-GENERIC-1.0": {
    minimumLayers: ["A"],
    prohibitedClaims: ["ownership", "originality", "non-AI", "truthfulness"],
  },
  "POLR-IMAGE-1.0": {
    minimumLayers: ["A"],
    prohibitedClaims: ["photograph taken by human", "not AI-generated"],
  },
  "POLR-VIDEO-1.0": {
    minimumLayers: ["A"],
    prohibitedClaims: ["recorded live", "eyewitness evidence"],
  },
  "POLR-TEXT-POST-1.0": {
    minimumLayers: ["A"],
    prohibitedClaims: ["truthful", "original thought", "not AI-assisted"],
  },
  "POLR-MUSIC-1.2": {
    minimumLayers: ["A"],
    prohibitedClaims: ["ownership", "licensing status"],
  },
  "POLR-NEWS-1.1": {
    minimumLayers: ["A"],
    prohibitedClaims: ["factual accuracy", "editorial integrity"],
  },
  "POLR-MIXED-MEDIA-1.0": {
    minimumLayers: ["A"],
    prohibitedClaims: ["bundle ownership"],
  },
};
