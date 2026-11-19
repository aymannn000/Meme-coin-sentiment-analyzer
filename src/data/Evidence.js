const evidence = {
  socialPosts: [
    {
      text: "This is the next 100x. Get in now before it's too late.",
      likes: 1200,
      reposts: 450,
      accountAgeDays: 3,
    },
    {
      text: "Next 100x for sure. Everyone is buying, don't miss out.",
      likes: 900,
      reposts: 380,
      accountAgeDays: 2,
    },
    {
      text: "Guaranteed moon today. Buy now before the pump starts.",
      likes: 1500,
      reposts: 600,
      accountAgeDays: 1,
    },
    {
      text: "Be careful, the dev wallet holds a huge share and liquidity isn't locked.",
      likes: 40,
      reposts: 5,
      accountAgeDays: 900,
    },
    {
      text: "Has anyone actually checked the contract on this one?",
      likes: 12,
      reposts: 1,
      accountAgeDays: 400,
    },
  ],

  marketData: { liquidityUsd: 18000, volume24hUsd: 450000, tokenAgeHours: 72 },
  safetyChecks: {
    canMint: true,
    liquidityLocked: false,
    topWalletPercentage: 62,
    devWalletPercentage: 31,
  },
};
export default evidence;
