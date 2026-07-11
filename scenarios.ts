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

  /** True for full-screen intro screens (landing, role briefing) that render without the case-file card and only need 1 choice */
  isLanding?: boolean;

  choices: Choice[];
}





// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

export const scenarios: Scenario[] = [
{
    id: "000",
    title: "Landing",
    description:
      "Could you keep a nation fed?\n\nFood has always seemed plentiful.\nUntil now.\n\nOver the next few minutes, you'll make the same decisions governments face when food suddenly becomes scarce.",
    isStart: true,
    isLanding: true,
    choices: [{ text: "Start", nextId: "00" }],
  },
  {
    id: "00",
    title: "Role",
    description:
      "You are the Minister for Food Security.\n\nYour job is simple: make sure everyone has enough to eat, no matter what.",
    isLanding: true,
    choices: [{ text: "I'm ready for this", nextId: "0" }],
  },
  
  // ---------------------------------------------------------------------
  // START
  // ---------------------------------------------------------------------
  {
    id: "0",
    title: "Multiple Breadbasket Failure",
    description:
      "The Atlantic current stalls, and three of the world's grain belts fail in the same growing season.\n\nYou inherit a country with less food than it needs and a population that hasn't noticed, yet.",
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
      "You stop grain from leaving the country, hoping to keep prices low at home.\n\nTwo of your neighbours respond by cutting off your fertiliser, and you realise you were never as self-sufficient as you thought…",
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
      "You hold the line on exports.\n\nWithin weeks, however, grain is leaving anyway, just not through anywhere you control well: the border.",
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
      "You put more people and more money on the border, and the smuggling does slow down.\n\nYou just haven't worked out how you're paying for it yet.",
    choices: [
      { text: "Increase taxes to fund enforcement", nextId: "1.1.1.1" },
      { text: "Reduce government spending on other programs", nextId: "1.1.1.2" },
    ],
  },
  {
    id: "1.1.1.1",
    title: "Increase Taxes to Fund Enforcement",
    description:
      "You raise taxes to cover the enforcement bill.\n\nConsumption drops, investment stalls, and congratulations, you've bought yourself a recession on top of a food crisis!",
    outcome: "Deep recession.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.1.1.2",
    title: "Reduce Government Spending on Other Programs",
    description:
      "You cut spending elsewhere instead of raising taxes.\n\nThe border holds, but everything else your government used to fund quietly stops holding too. Enjoy your economy's recession!",
    outcome: "Deep recession.",
    isEnding: true,
    choices: [],
  },

  // 1.1.2: Legalise some exports through quota
  {
    id: "1.1.2",
    title: "Legalise Some Exports Through a Quota",
    description:
      "You open a small, controlled exception to keep your allies onside.\n\nEvery ally who didn't get one now wants to know why, and the ones who did want more.",
    choices: [
      { text: "Prioritise allied nations", nextId: "1.1.2.1" },
      { text: "Allocate based on humanitarian need", nextId: "1.1.2.2" },
    ],
  },
  {
    id: "1.1.2.1",
    title: "Prioritise Allied Nations",
    description:
      "You allocate the quota by loyalty.\n\nIt buys you goodwill with a few governments and a long memory in the rest.",
    outcome: "Difficulty managing international affairs.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.1.2.2",
    title: "Allocate Based on Humanitarian Need",
    description:
      "You allocate the quota by need instead of by relationship.\n\nIt's the harder position to defend in a closed-door meeting, and you'll be having a lot of those.",
    outcome: "Difficulty managing international affairs.",
    isEnding: true,
    choices: [],
  },

  // --- 1.2: Reduce restrictions ---
  {
    id: "1.2",
    title: "Reduce Restrictions",
    description:
      "You ease the export ban to repair relations abroad.\n\nAt home, prices start climbing before the ink is dry.",
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
      "You issue vouchers to the households that need them most, and for a moment it works.\n\nThen wealthier households, worried the shortage will reach them too, start buying like it already has.",
    choices: [
      { text: "Introduce household purchasing limits", nextId: "1.2.1.1" },
      { text: "Ease price-gouging laws (letting prices rise further)", nextId: "1.2.1.2" },
    ],
  },
  {
    id: "1.2.1.1",
    title: "Introduce Household Purchasing Limits",
    description:
      "You cap how much any household can buy at once.\n\nIt curbs the panic, but the households with the least room to adapt are the ones who feel the cap hardest.",
    outcome: "The precariat suffers.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.2.1.2",
    title: "Ease Price-Gouging Laws",
    description:
      "You let prices rise freely to discourage stockpiling, especially by eliminating anti-gouging laws.\n\nIt works, in the sense that the people who can no longer afford food have stopped buying it.",
    outcome: "The precariat suffers.",
    isEnding: true,
    choices: [],
  },

  // 1.2.2: Reduce food import tariffs on one staple
  {
    id: "1.2.2",
    title: "Reduce Food Import Tariffs on One Staple Food",
    description:
      "You cut the tariff on one staple to bring relief fast.\n\nCheaper imports arrive within weeks, and your own farmers can't match the price.",
    choices: [
      { text: "Provide temporary farmer income support", nextId: "1.2.2.1" },
      { text: "Set a minimum support price / price floor for farmers", nextId: "1.2.2.2" },
    ],
  },
  {
    id: "1.2.2.1",
    title: "Temporary Farmer Income Support",
    description:
      "You pay farmers directly to offset the cheaper imports.\n\nIt keeps them in business for now, though you're effectively funding both sides of the same market. This is massively inefficient, and it begets what economists call a \"deadweight loss.\"",
    outcome: "Welfare loss — someone always loses.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.2.2.2",
    title: "Minimum Support Price / Price Floor",
    description:
      "You guarantee farmers a floor price the imports can't undercut.\n\nSomeone is still covering that gap, and it isn't the farmers. Spoiler: it's you! Enjoy the insurmountable national debt you're racking up.",
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
      "You cap the price of food directly.\n\nSuppliers respond by supplying less of it.",
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
      "You subsidise farmers to keep output up and start buying grain directly to close the gap.\n\nThe shelves stay stocked, and the bill for keeping them that way lands on your desk every month.",
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
      "You put the subsidy behind a single staple to keep the programme affordable.\n\nDiets narrow along with it, and deficiencies start showing up in places your statistics don't cover yet.",
    choices: [
      { text: "Mandate wheat fortification with iron & vitamins", nextId: "2.1.1.1" },
      { text: "Expand school micronutrient feeding programs", nextId: "2.1.1.2" },
    ],
  },
  {
    id: "2.1.1.1",
    title: "Mandatory Wheat Fortification",
    description:
      "You fortify the staple with iron and vitamins, a cheap and genuinely effective fix.\n\nIt solves the deficiency you can measure, but not quickly enough. This is the oft-neglected problem of \"hidden hunger.\"",
    outcome:
      "A genuinely good programme — but it treats the symptom, not the underlying problem of \"hidden hunger\" (micronutrient deficiency that isn't visible in calorie counts).",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.1.1.2",
    title: "School Micronutrient Feeding Expansion",
    description:
      "You expand micronutrient feeding through schools, reaching children while it still matters.\n\nIt's slow to scale beyond them, and the hunger you can't see is still spreading everywhere the programme hasn't reached.",
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
      "You direct the subsidy toward small farmers, the group with the least cushion.\n\nLarge farms, without the same support, start failing anyway, and they were carrying more of the harvest than anyone admitted.",
    choices: [
      { text: "Nationalise large farms", nextId: "2.1.2.1" },
      { text: "Allow large farms to fail", nextId: "2.1.2.2" },
    ],
  },
  {
    id: "2.1.2.1",
    title: "Nationalise Large Farms",
    description:
      "You take the failing large farms under state control rather than lose them.\n\nOutput stabilises on paper, but every operational decision now runs through people who've never run a farm (including you).",
    outcome: "Food production becomes inefficient, which can lead to crashes.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.1.2.2",
    title: "Allow Large Farms to Fail",
    description:
      "You let the large farms close.\n\nThe market corrects itself, and national output takes a hit you don't recover from quickly.",
    outcome: "Food production becomes inefficient, which can lead to crashes.",
    isEnding: true,
    choices: [],
  },

  // --- 2.2: Release national stockpiles ---
  {
    id: "2.2",
    title: "Release National Stockpiles",
    description:
      "You draw down the national grain reserve to hold prices steady.\n\nIt works, until you try to refill it, and the world notices exactly how much you're buying. Markets respond in kind with higher world prices… again.",
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
      "You redirect grain from livestock feed to human consumption, and the math works on paper.\n\nMeat prices spike, culling starts to look necessary, and everyone remembers too late that a herd takes years to rebuild.",
    choices: [
      { text: "Import animal feed & meat products from abroad", nextId: "2.2.1.1" },
      { text: "Aggressively promote plant-based substitution", nextId: "2.2.1.2" },
    ],
  },
  {
    id: "2.2.1.1",
    title: "Import Animal Feed & Products",
    description:
      "You import feed to keep livestock alive without touching the human food supply.\n\nThe shortfall hasn't gone away, it's just been outsourced, and protein could still run short if the ships stop coming.",
    outcome:
      "Doesn't solve the core production problem, and may lead to protein deficiency.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.2.1.2",
    title: "Promote Plant-Based Substitution",
    description:
      "You push consumption toward plant-based protein instead of importing feed.\n\nIt buys time without solving the shortfall underneath it, and time is the one thing you don't have much of.",
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
      "You redirect crops from biofuel production back to food.\n\nEnergy prices rise in response, and that cost moves through the economy far faster than the food relief does.",
    choices: [
      { text: "Borrow heavily to fund fuel subsidies", nextId: "2.2.2.1" },
      { text: "Print money to fund fuel subsidies", nextId: "2.2.2.2" },
    ],
  },
  {
    id: "2.2.2.1",
    title: "Borrow Heavily to Fund Fuel Subsidies",
    description:
      "You borrow to subsidise fuel and keep energy costs manageable.\n\nThe debt, however, doesn't disappear soon. It just waits for the moment your economy is least prepared to service it.",
    outcome: "Macro instability.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.2.2.2",
    title: "Print Money to Fund Fuel Subsidies",
    description:
      "You fund the fuel subsidy by printing money, the fastest fix available to you.\n\n(Hyper)inflation follows, and it doesn't care how urgent your reasons were.",
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