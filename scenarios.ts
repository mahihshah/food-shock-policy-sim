// data/scenarios.ts
//
// Purpose: Stores all the content of the food shock simulator.
// This file is pure data (no React, no HTML, no game logic) so new
// scenarios/branches can be added just by editing this file.
//
// -----------------------------------------------------------------------------
// SHAPE
// -----------------------------------------------------------------------------

export interface Choice {
  /** Text shown on the button/card for this choice */
  text: string;
  /** The id of the Scenario this choice leads to */
  nextId: string;
  /**
   * Optional supporting copy for this specific choice (e.g. "why this option
   * exists"). Separate from Scenario.description because a "problem" scenario
   * can have different framing per choice.
   */
  description?: string;
  /**
   * Reserved for later: rich/linked version of `description`, e.g.
   * 'Fertiliser prices rose after <a href="https://...">export bans</a> hit supply.'
   * Left undefined until you're ready to add hyperlinks.
   */
  descriptionHtml?: string;
}

export interface Scenario {
  /** Unique id. Other scenarios reference this via Choice.nextId */
  id: string;
  /** Short label, e.g. "Export controls" */
  title: string;
  /** Main body copy — usually frames the "problem" the player now faces */
  description: string;
  /**
   * Reserved for later: rich/linked version of `description`, so you can
   * add hyperlinks (sources, definitions, etc.) without changing the UI code.
   */
  descriptionHtml?: string;
  /** Optional extra context, stats, definitions, etc. shown alongside the scenario */
  supportingInfo?: string;
  /** True only for the single entry point of the simulator */
  isStart?: boolean;
  /** True only for terminal scenarios (no further choices) */
  isEnding?: boolean;
  /**
   * Only present on ending scenarios — the final consequence of the path
   * the player took (e.g. "deep recession").
   */
  outcome?: string;
  /**
   * Exactly 2 for branch scenarios, empty array for endings.
   * Each choice points to the next scenario via nextId.
   */
  choices: Choice[];
}

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

export const scenarios: Scenario[] = [
  // ---------------------------------------------------------------------
  // START
  // ---------------------------------------------------------------------
  {
    id: "0",
    title: "Multiple Breadbasket Failure",
    description:
      "A collapse of the AMOC (Atlantic Meridional Overturning Circulation) has triggered simultaneous harvest failures across the world's major breadbasket regions. Global grain reserves are falling fast, and your country must decide how to respond.",
    isStart: true,
    choices: [
      { text: "Impose export controls", nextId: "1" },
      { text: "Impose a price ceiling on food", nextId: "2" },
    ],
  },

  // ---------------------------------------------------------------------
  // BRANCH 1: EXPORT CONTROLS
  // ---------------------------------------------------------------------
  {
    id: "1",
    title: "Export Controls",
    description:
      "You ban or restrict the export of domestic food supplies to keep more grain at home. Other countries retaliate — several restrict fertiliser exports to your country in response.",
    choices: [
      { text: "Maintain / intensify the ban", nextId: "1.1" },
      { text: "Reduce restrictions", nextId: "1.2" },
    ],
  },

  // --- 1.1: Maintain/intensify ban ---
  {
    id: "1.1",
    title: "Maintain / Intensify the Ban",
    description:
      "You double down on export restrictions. Black markets and smuggling networks spring up to move grain across borders illegally.",
    choices: [
      { text: "Increase border enforcement", nextId: "1.1.1" },
      { text: "Legalise some exports through a quota system", nextId: "1.1.2" },
    ],
  },

  // 1.1.1: Increase border enforcement
  {
    id: "1.1.1",
    title: "Increase Border Enforcement",
    description:
      "You pour resources into customs, patrols, and surveillance to stop smuggling. Enforcement is working, but it's expensive.",
    choices: [
      { text: "Increase taxes to fund enforcement", nextId: "1.1.1.1" },
      { text: "Reduce government spending on other programs", nextId: "1.1.1.2" },
    ],
  },
  {
    id: "1.1.1.1",
    title: "Increase Taxes to Fund Enforcement",
    description:
      "Higher taxes fund the enforcement effort, but they squeeze household and business spending at the worst possible time.",
    outcome: "Deep recession.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.1.1.2",
    title: "Reduce Government Spending on Other Programs",
    description:
      "You cut spending elsewhere to fund enforcement, pulling support from other public programs.",
    outcome: "Deep recession.",
    isEnding: true,
    choices: [],
  },

  // 1.1.2: Legalise some exports through quota
  {
    id: "1.1.2",
    title: "Legalise Some Exports Through a Quota",
    description:
      "You allow a limited, legal quota of exports to relieve pressure on the black market. Allied nations start lobbying for a larger share of that quota.",
    choices: [
      { text: "Prioritise allied nations", nextId: "1.1.2.1" },
      { text: "Allocate based on humanitarian need", nextId: "1.1.2.2" },
    ],
  },
  {
    id: "1.1.2.1",
    title: "Prioritise Allied Nations",
    description:
      "You direct the quota toward strategic and political allies first.",
    outcome: "Difficulty managing international affairs.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.1.2.2",
    title: "Allocate Based on Humanitarian Need",
    description:
      "You direct the quota toward the countries facing the worst food insecurity, regardless of alliance.",
    outcome: "Difficulty managing international affairs.",
    isEnding: true,
    choices: [],
  },

  // --- 1.2: Reduce restrictions ---
  {
    id: "1.2",
    title: "Reduce Restrictions",
    description:
      "You ease export controls to repair diplomatic and trade relationships. Domestic food prices begin rising rapidly as more supply leaves the country.",
    choices: [
      { text: "Introduce targeted food vouchers", nextId: "1.2.1" },
      { text: "Reduce food import tariffs on one staple food", nextId: "1.2.2" },
    ],
  },

  // 1.2.1: Targeted food vouchers
  {
    id: "1.2.1",
    title: "Targeted Food Vouchers",
    description:
      "You issue vouchers to help lower-income households cope with rising prices. Wealthier households, anxious about shortages, begin panic buying anyway.",
    choices: [
      { text: "Introduce household purchasing limits", nextId: "1.2.1.1" },
      { text: "Ease price-gouging laws (letting prices rise further)", nextId: "1.2.1.2" },
    ],
  },
  {
    id: "1.2.1.1",
    title: "Introduce Household Purchasing Limits",
    description:
      "You cap how much any one household can buy per visit to slow panic buying.",
    outcome: "The precariat suffers.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.2.1.2",
    title: "Ease Price-Gouging Laws",
    description:
      "You let prices rise further, hoping higher prices will naturally curb panic buying.",
    outcome: "The precariat suffers.",
    isEnding: true,
    choices: [],
  },

  // 1.2.2: Reduce food import tariffs on one staple
  {
    id: "1.2.2",
    title: "Reduce Food Import Tariffs on One Staple Food",
    description:
      "You cut tariffs on a single staple crop to bring in cheaper imports. Domestic farmers of that crop suddenly can't compete on price.",
    choices: [
      { text: "Provide temporary farmer income support", nextId: "1.2.2.1" },
      { text: "Set a minimum support price / price floor for farmers", nextId: "1.2.2.2" },
    ],
  },
  {
    id: "1.2.2.1",
    title: "Temporary Farmer Income Support",
    description:
      "You offer direct, time-limited payments to help farmers stay afloat while imports fill the gap.",
    outcome: "Welfare loss — someone always loses.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.2.2.2",
    title: "Minimum Support Price / Price Floor",
    description:
      "You guarantee farmers a minimum price for their crop, regardless of import competition.",
    outcome: "Welfare loss — someone always loses.",
    isEnding: true,
    choices: [],
  },

  // ---------------------------------------------------------------------
  // BRANCH 2: PRICE CEILING
  // ---------------------------------------------------------------------
  {
    id: "2",
    title: "Price Ceiling",
    description:
      "You cap the price of food to protect consumers from inflation. The artificially low price leads to a shortage.",
    choices: [
      { text: "Pay farmers a subsidy and make direct grain purchases", nextId: "2.1" },
      { text: "Release national stockpiles", nextId: "2.2" },
    ],
  },

  // --- 2.1: Pay farmers subsidy + grain purchases ---
  {
    id: "2.1",
    title: "Subsidise Farmers and Purchase Grain Directly",
    description:
      "The government subsidises farmers and buys grain directly to stabilise supply. The cost to the government is enormous.",
    choices: [
      { text: "Subsidise only one staple crop", nextId: "2.1.1" },
      { text: "Subsidise only small farmers", nextId: "2.1.2" },
    ],
  },

  // 2.1.1: Subsidise only one staple crop
  {
    id: "2.1.1",
    title: "Subsidise Only One Staple Crop",
    description:
      "To control costs, you subsidise a single staple crop (e.g. wheat). Diets narrow, and nutrition and micronutrient deficiencies begin to appear.",
    choices: [
      { text: "Mandate wheat fortification with iron & vitamins", nextId: "2.1.1.1" },
      { text: "Expand school micronutrient feeding programs", nextId: "2.1.1.2" },
    ],
  },
  {
    id: "2.1.1.1",
    title: "Mandatory Wheat Fortification",
    description:
      "You require iron and vitamin fortification of wheat flour to address deficiencies at scale.",
    outcome:
      "A genuinely good programme — but it treats the symptom, not the underlying problem of \"hidden hunger\" (micronutrient deficiency that isn't visible in calorie counts).",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.1.1.2",
    title: "School Micronutrient Feeding Expansion",
    description:
      "You expand micronutrient-fortified school meal programs to reach children directly.",
    outcome:
      "Difficult to scale quickly, and it likewise only surfaces — without fully solving — the underlying \"hidden hunger\" problem.",
    isEnding: true,
    choices: [],
  },

  // 2.1.2: Subsidise only small farmers
  {
    id: "2.1.2",
    title: "Subsidise Only Small Farmers",
    description:
      "You target subsidies at small farmers to protect livelihoods. Large farms, cut off from support, begin to fail — despite their economies of scale.",
    choices: [
      { text: "Nationalise large farms", nextId: "2.1.2.1" },
      { text: "Allow large farms to fail", nextId: "2.1.2.2" },
    ],
  },
  {
    id: "2.1.2.1",
    title: "Nationalise Large Farms",
    description:
      "The government takes over failing large farms to keep them producing.",
    outcome: "Food production becomes inefficient, which can lead to crashes.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.1.2.2",
    title: "Allow Large Farms to Fail",
    description:
      "You let unsupported large farms exit the market rather than intervene.",
    outcome: "Food production becomes inefficient, which can lead to crashes.",
    isEnding: true,
    choices: [],
  },

  // --- 2.2: Release national stockpiles ---
  {
    id: "2.2",
    title: "Release National Stockpiles",
    description:
      "You release grain from national reserves to ease the shortage. When the government later tries to replenish those reserves, it drives world prices even higher.",
    choices: [
      { text: "Divert crop use away from animal feed", nextId: "2.2.1" },
      { text: "Divert crop use away from biofuels", nextId: "2.2.2" },
    ],
  },

  // 2.2.1: Divert crop use from animal feed
  {
    id: "2.2.1",
    title: "Divert Crop Use From Animal Feed",
    description:
      "You redirect grain away from livestock feed toward human consumption. Livestock producers lose access to feed and meat prices soar. Culling herds is considered, but herds take years to rebuild.",
    choices: [
      { text: "Import animal feed & meat products from abroad", nextId: "2.2.1.1" },
      { text: "Aggressively promote plant-based substitution", nextId: "2.2.1.2" },
    ],
  },
  {
    id: "2.2.1.1",
    title: "Import Animal Feed & Products",
    description:
      "You import feed and meat products to cover the shortfall left by diverted grain.",
    outcome:
      "Doesn't solve the core production problem, and may lead to protein deficiency.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.2.1.2",
    title: "Promote Plant-Based Substitution",
    description:
      "You launch a major push to shift diets toward plant-based protein sources.",
    outcome:
      "Doesn't solve the core production problem, and may lead to protein deficiency.",
    isEnding: true,
    choices: [],
  },

  // 2.2.2: Divert crop use from biofuels
  {
    id: "2.2.2",
    title: "Divert Crop Use From Biofuels",
    description:
      "You redirect crops away from biofuel production toward food. Energy prices rise alongside fuel imports, driving inflation.",
    choices: [
      { text: "Borrow heavily to fund fuel subsidies", nextId: "2.2.2.1" },
      { text: "Print money to fund fuel subsidies", nextId: "2.2.2.2" },
    ],
  },
  {
    id: "2.2.2.1",
    title: "Borrow Heavily to Fund Fuel Subsidies",
    description:
      "You take on significant public debt to subsidise fuel prices for consumers.",
    outcome: "Macro instability.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.2.2.2",
    title: "Print Money to Fund Fuel Subsidies",
    description:
      "You finance fuel subsidies by expanding the money supply.",
    outcome: "Macro instability.",
    isEnding: true,
    choices: [],
  },
];

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/** Lookup map for O(1) access by id — build once, reuse everywhere in the UI */
export const scenariosById: Record<string, Scenario> = Object.fromEntries(
  scenarios.map((s) => [s.id, s])
);

/** The single entry point of the simulator */
export const startScenario: Scenario = scenarios.find((s) => s.isStart)!;

/** All terminal scenarios, if you need to e.g. list every possible ending */
export const endingScenarios: Scenario[] = scenarios.filter((s) => s.isEnding);