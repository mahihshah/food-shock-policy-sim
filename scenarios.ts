// data/scenarios.ts
//
// Purpose: Stores all the content of the food shock simulator.
// This file is pure data (no React, no HTML, no game logic) so new
// scenarios/branches can be added just by editing this file.
//
// HIGHLIGHTS: ::phrase:: marks render as coloured underlines via
// renderHighlighted() in QuestionCard.tsx.
//
// -----------------------------------------------------------------------------
// SHAPE
// -----------------------------------------------------------------------------

export interface Choice {
  text: string;
  nextId: string;
  description?: string;
  descriptionHtml?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  supportingInfo?: string;
  isStart?: boolean;
  isEnding?: boolean;
  outcome?: string;
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
      "Could you manage a food economy in crisis?\n\nFood has always seemed plentiful.\nUntil now.\n\nOver the next few minutes, you'll make the same decisions governments face when food suddenly becomes scarce.",
    isStart: true,
    isLanding: true,
    choices: [{ text: "Start", nextId: "00" }],
  },
  {
    id: "00",
    title: "Role",
    description:
      "You are the Minister for Food Security.\n\nYour country is middle-income, and like most of the world, it doesn't grow or make everything it needs. You import a share of your key food staples, plus the fertiliser and other agricultural inputs your farmers depend on.\n\nMarkets, households and other governments respond to every decision you make.\n\nYou have one goal: make sure everyone has enough to eat, no matter what.",
    isLanding: true,
    choices: [{ text: "I'm ready", nextId: "0" }],
  },

  // ---------------------------------------------------------------------
  // START
  // ---------------------------------------------------------------------
  {
    id: "0",
    title: "Multiple Breadbasket Failure",
    description:
      "The Atlantic Ocean's main current system, the one that keeps large parts of the Northern Hemisphere from freezing over, grinds to a halt. ::Three of the world's grain belts:: (the regions that grow most of its wheat, corn and rice) fail in the same growing season. (Climate scientists reckon something like this could plausibly happen within the next 100 years!)\n\nYou inherit a country with less food than it needs, and a population that hasn't noticed yet.",
    choices: [
      {
        text: "Impose export controls",
        nextId: "1",
        description:
          "Ban grain from leaving the country. Rather than letting price ration scarce food, cut off outflow directly and keep every available tonne within your own borders, where you control it.",
      },
      {
        text: "Impose a price ceiling on food",
        nextId: "2",
        description:
          "Set a legal maximum price for food, below what the market would otherwise charge. Keep essentials affordable and protect household budgets the moment the shock hits.",
      },
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
      {
        text: "Maintain and intensify the ban",
        nextId: "1.1",
        description:
          "Hold the line, or tighten the export ban further. Prioritise domestic supply above everything else and keep every tonne of grain inside your own borders.",
      },
      {
        text: "Reduce restrictions",
        nextId: "1.2",
        description:
          "Ease the export ban to repair trade relationships abroad. Reopen channels with partners and signal that you intend to keep trading, not retreat behind your borders.",
      },
    ],
  },

  {
    id: "1.1",
    title: "Maintain and Intensify the Ban",
    description:
      "You hold the line on exports.\n\nWithin weeks, however, grain is leaving anyway, just not through anywhere you control well: the border.",
    choices: [
      {
        text: "Increase border enforcement",
        nextId: "1.1.1",
        description:
          "Deploy more customs officers, patrols and inspections at the border. Enforce the ban directly and physically stop grain crossing without authorisation.",
      },
      {
        text: "Legalise some exports through a quota system",
        nextId: "1.1.2",
        description:
          "Replace the blanket ban with a fixed, government-set quota. Allow a controlled volume of trade to continue each month whilst keeping the overall total capped.",
      },
    ],
  },

  {
    id: "1.1.1",
    title: "Increase Border Enforcement",
    description:
      "You put more people and more money on the border, and the smuggling does slow down.\n\nYou just haven't worked out how you're paying for it yet.",
    choices: [
      {
        text: "Increase taxes to fund enforcement",
        nextId: "1.1.1.1",
        description:
          "Raise tax revenue to cover the enforcement bill. Fund the border operation through the public purse, leaving other spending untouched.",
      },
      {
        text: "Reduce government spending on other programs",
        nextId: "1.1.1.2",
        description:
          "Redirect funds from other budgets to pay for enforcement. Cover the cost without raising taxes, keeping the burden on households unchanged.",
      },
    ],
  },
  {
    id: "1.1.1.1",
    title: "Increase Taxes to Fund Enforcement",
    description:
      "You raise taxes to cover the enforcement bill.\n\nConsumption drops, investment stalls, and the economy tips into recession right as food is already scarce.",
    outcome:
      "Funding enforcement through taxes is honest and transparent, a normal way to pay for a public good. The timing is what hurts: raising taxes whilst an export ban is already making food scarcer and pricier pulls money out of households at the worst possible moment. Stack two contractions on top of each other, and ::a shortage turns into a recession::.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.1.1.2",
    title: "Reduce Government Spending on Other Programs",
    description:
      "You cut spending elsewhere instead of raising taxes.\n\nThe border holds, but everything else your government used to fund quietly stops holding too, and the economy slides into recession alongside the food shock.",
    outcome:
      "Cutting other programs instead of raising taxes at least keeps the tax bill unchanged. But withdrawing public spending on top of an already-tightening export ban removes exactly the support households need when prices are climbing. Different route, same destination: ::a stacked contraction that tips a shortage into a recession::.",
    isEnding: true,
    choices: [],
  },

  {
    id: "1.1.2",
    title: "Legalise Some Exports Through a Quota",
    description:
      "You open a small, controlled exception to keep your allies onside.\n\nEvery ally who didn't get one now wants to know why, and the ones who did want more.",
    choices: [
      {
        text: "Prioritise allied nations",
        nextId: "1.1.2.1",
        description:
          "Allocate the export quota to your closest diplomatic partners first. Reward existing alliances and strengthen ties with governments you already trust.",
      },
      {
        text: "Allocate based on humanitarian need",
        nextId: "1.1.2.2",
        description:
          "Direct the export quota toward the countries facing the most severe shortages. Base allocation on where the grain is needed most, not on existing alliances.",
      },
    ],
  },
  {
    id: "1.1.2.1",
    title: "Prioritise Allied Nations",
    description:
      "You allocate the quota by loyalty.\n\nIt buys you goodwill with a few governments and a long memory in the rest.",
    outcome:
      "Rewarding allies with quota access is standard diplomacy, and on its own a reasonable way to shore up relationships. But it lands right after a ban and a border crackdown that already looked like hoarding to your trading partners. Add visible favouritism on top of that, and ::you confirm the suspicion instead of easing it::.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.1.2.2",
    title: "Allocate Based on Humanitarian Need",
    description:
      "You allocate the quota by need instead of by relationship.\n\nIt's the harder position to defend in a closed-door meeting, and you'll be having a lot of those.",
    outcome:
      "Allocating grain by need sends it where it does the most economic and human good. Trouble is, it arrives after a ban and a crackdown that already made you look unreliable, so ::the fairness reads as damage control:: rather than a genuine change of heart.",
    isEnding: true,
    choices: [],
  },

  {
    id: "1.2",
    title: "Reduce Restrictions",
    description:
      "You ease the export ban to repair relations abroad.\n\nAt home, prices start climbing before the ink is dry.",
    choices: [
      {
        text: "Introduce targeted food vouchers",
        nextId: "1.2.1",
        description:
          "Issue means-tested vouchers to the households who need help affording food most. Put support directly into the hands of those who need it, at a fraction of the cost of subsidising everyone.",
      },
      {
        text: "Reduce food import tariffs on one staple food",
        nextId: "1.2.2",
        description:
          "Cut the tax on importing one specific staple. Make foreign supply cheaper and get relief onto shelves within weeks.",
      },
    ],
  },

  {
    id: "1.2.1",
    title: "Targeted Food Vouchers",
    description:
      "You issue vouchers to the households that need them most, and for a moment it works.\n\nThen wealthier households, worried the shortage will reach them too, start buying like it already has.",
    choices: [
      {
        text: "Introduce household purchasing limits",
        nextId: "1.2.1.1",
        description:
          "Cap how much of a staple any single household can buy per visit. Keep shelves stocked for everyone by rationing purchases evenly.",
      },
      {
        text: "Ease price-gouging laws (letting prices rise further)",
        nextId: "1.2.1.2",
        description:
          "Relax the rules on retail markups during shortages. Let price rise to reflect scarcity and let the market signal exactly how urgent the shortage is.",
      },
    ],
  },
  {
    id: "1.2.1.1",
    title: "Introduce Household Purchasing Limits",
    description:
      "You cap how much any household can buy at once.\n\nIt curbs the panic, but the households with the least room to adapt are the ones who feel the cap hardest.",
    outcome:
      "Capping purchases per household is a normal, sensible way to ration scarce goods fairly across everyone. But it lands on top of vouchers designed specifically to help low-income households, and a flat limit doesn't distinguish between a household stocking up out of anxiety and one that depends on that single trip to eat that week. ::The safeguard ends up working against the group it was built to protect::.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.2.1.2",
    title: "Ease Price-Gouging Laws",
    description:
      "You let prices rise freely to discourage stockpiling, especially by eliminating anti-gouging laws.\n\nIt works, in the sense that the people who can no longer afford food have stopped buying it.",
    outcome:
      "Letting prices rise lets scarcity send an honest signal, and in a healthy market that pulls supply toward wherever it's needed most. But you had just built a voucher scheme specifically to shield low-income households from that exact price signal. Loosen the cap right after, and ::you quietly cancel the safeguard you'd only just put in place::.",
    isEnding: true,
    choices: [],
  },

  {
    id: "1.2.2",
    title: "Reduce Food Import Tariffs on One Staple Food",
    description:
      "You cut the tariff on one staple to bring relief fast.\n\nCheaper imports arrive within weeks, and your own farmers can't match the price.",
    choices: [
      {
        text: "Provide temporary farmer income support",
        nextId: "1.2.2.1",
        description:
          "Pay domestic farmers directly to offset cheaper imports. Keep local production running at full strength whilst consumers enjoy the lower import price.",
      },
      {
        text: "Set a minimum support price / price floor for farmers",
        nextId: "1.2.2.2",
        description:
          "Guarantee farmers a price no import can undercut. Protect domestic production with a fixed price floor, regardless of what imports cost.",
      },
    ],
  },
  {
    id: "1.2.2.1",
    title: "Temporary Farmer Income Support",
    description:
      "You pay farmers directly to offset the cheaper imports.\n\nIt keeps them in business for now, though you're effectively funding both sides of the same market.",
    outcome:
      "Paying farmers directly to stay afloat is a reasonable, common way to protect domestic supply. The catch is you had just cut the tariff that made imports cheaper in the first place, so now you're funding both sides of the very same market. ::The gap between what farmers need and what imports cost is a deadweight loss::: real money spent with no one actually better off for it.",
    isEnding: true,
    choices: [],
  },
  {
    id: "1.2.2.2",
    title: "Minimum Support Price / Price Floor",
    description:
      "You guarantee farmers a floor price the imports can't undercut.\n\nSomeone is still covering that gap, and it isn't the farmers.",
    outcome:
      "A price floor is a well-established, defensible way to protect farm incomes. But it follows a tariff cut that just made imports cheaper, which means the floor now has to bridge a wider gap than it would have on its own. Someone still has to cover that difference, and increasingly it's the state, with ::the bill compounding into growing national debt::.",
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
      {
        text: "Pay farmers a subsidy and make direct grain purchases",
        nextId: "2.1",
        description:
          "Subsidise domestic farmers and have the government buy grain directly. Combine both levers at once to guarantee shelves stay stocked.",
      },
      {
        text: "Release national stockpiles",
        nextId: "2.2",
        description:
          "Draw down the grain reserve your government has been building for exactly this moment. Put stored supply straight onto the market and stabilise prices immediately.",
      },
    ],
  },

  {
    id: "2.1",
    title: "Subsidise Farmers and Purchase Grain Directly",
    description:
      "You subsidise farmers to keep output up and start buying grain directly to close the gap.\n\nThe shelves stay stocked, and the bill for keeping them that way lands on your desk every month.",
    choices: [
      {
        text: "Subsidise only one staple crop",
        nextId: "2.1.1",
        description:
          "Concentrate the entire subsidy budget on a single staple. Maximise the impact of every dollar spent by backing one crop fully.",
      },
      {
        text: "Subsidise only small farmers",
        nextId: "2.1.2",
        description:
          "Direct subsidy money specifically to smallholders. Support the farmers with the thinnest financial cushion and stretch a limited budget as far as it will go.",
      },
    ],
  },

  {
    id: "2.1.1",
    title: "Subsidise Only One Staple Crop",
    description:
      "You put the subsidy behind a single staple to keep the programme affordable.\n\nDiets narrow along with it, and deficiencies start showing up in places your statistics don't cover yet.",
    choices: [
      {
        text: "Mandate wheat fortification with iron & vitamins",
        nextId: "2.1.1.1",
        description:
          "Require a staple like flour to be fortified with essential micronutrients by law. Build nutrition directly into what people already eat every day.",
      },
      {
        text: "Expand school micronutrient feeding programs",
        nextId: "2.1.1.2",
        description:
          "Deliver fortified meals directly through the school system. Reach children during the years nutrition matters most.",
      },
    ],
  },
  {
    id: "2.1.1.1",
    title: "Mandatory Wheat Fortification",
    description:
      "You fortify the staple with iron and vitamins, a cheap and genuinely effective fix.\n\nIt solves the deficiency you can measure, but not quickly enough. This is the oft-neglected problem of \"hidden hunger.\"",
    outcome:
      "Fortifying a staple with iron and vitamins is cheap, fast, and one of the best-value tools in public health. But it's patching a gap your own subsidy created by narrowing diets to a single crop: ::it treats the deficiency already visible in the data, whilst the dietary variety that would have prevented it stays missing::.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.1.1.2",
    title: "School Micronutrient Feeding Expansion",
    description:
      "You expand micronutrient feeding through schools, reaching children when it still matters.\n\nIt's slow to scale beyond them, and the hunger you can't see is still spreading everywhere the programme hasn't reached.",
    outcome:
      "Targeting children through school meals is smart budgeting, since early-life nutrition has the highest long-term payoff of almost any public spending. But it's still responding to a gap your own subsidy created, and ::a school programme only reaches children who are in school::. Everyone else stays exposed to the same shortfall it was meant to fix.",
    isEnding: true,
    choices: [],
  },

  {
    id: "2.1.2",
    title: "Subsidise Only Small Farmers",
    description:
      "You direct the subsidy toward small farmers, the group with the least cushion.\n\nLarge farms, without the same support, start failing anyway, and they were carrying more of the harvest than anyone admitted.",
    choices: [
      {
        text: "Nationalise large farms",
        nextId: "2.1.2.1",
        description:
          "Bring failing large farms under direct state ownership. Take control of production yourself and keep output flowing under government management.",
      },
      {
        text: "Allow large farms to fail",
        nextId: "2.1.2.2",
        description:
          "Let unprofitable large farms close on their own terms. Let the market reallocate resources without government intervention.",
      },
    ],
  },
  {
    id: "2.1.2.1",
    title: "Nationalise Large Farms",
    description:
      "You take the failing large farms under state control rather than lose them.\n\nOutput stabilises on paper, but every operational decision now runs through a state bureaucracy learning how to run a farm from scratch.",
    outcome:
      "Keeping large farms running by nationalising them preserves output on paper. But their struggles trace straight back to your own subsidy, which gave smallholders support that large farms never got. Take them over, and ::you also lose the market-tested management that made them productive in the first place::. State administration rarely replaces price signals as efficiently as it replaces ownership.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.1.2.2",
    title: "Allow Large Farms to Fail",
    description:
      "You let the large farms close.\n\nThe market corrects itself, and national output takes a hit you don't recover from quickly.",
    outcome:
      "Letting unprofitable farms close is ordinary market discipline, in theory. In practice, your own subsidy tilted the field toward smallholders and pushed these farms into unprofitability in the first place. ::What looks like the market correcting itself is really the market reacting to a distortion your own policy introduced::.",
    isEnding: true,
    choices: [],
  },

  {
    id: "2.2",
    title: "Release National Stockpiles",
    description:
      "You draw down the national grain reserve to hold prices steady.\n\nIt works, until you try to refill it, and the world notices exactly how much you're buying. Markets respond in kind with higher world prices… again.",
    choices: [
      {
        text: "Divert crop use away from animal feed",
        nextId: "2.2.1",
        description:
          "Redirect grain earmarked for livestock feed toward direct human consumption instead. Route calories straight to people rather than through animals first.",
      },
      {
        text: "Divert crop use away from biofuels",
        nextId: "2.2.2",
        description:
          "Redirect crops grown for biofuel back into the food supply. Prioritise plates over fuel tanks.",
      },
    ],
  },

  {
    id: "2.2.1",
    title: "Divert Crop Use From Animal Feed",
    description:
      "You redirect grain from livestock feed to human consumption, and the math works on paper.\n\nMeat prices spike, culling starts to look necessary, and everyone remembers too late that a herd takes years to rebuild.",
    choices: [
      {
        text: "Import animal feed & meat products from abroad",
        nextId: "2.2.1.1",
        description:
          "Buy feed and meat internationally to keep domestic livestock fed. Preserve herds and the human food supply at the same time.",
      },
      {
        text: "Aggressively promote plant-based substitution",
        nextId: "2.2.1.2",
        description:
          "Launch public campaigns encouraging a shift toward plant-based protein. Shift demand away from meat and ease pressure on feed grain.",
      },
    ],
  },
  {
    id: "2.2.1.1",
    title: "Import Animal Feed & Products",
    description:
      "You import feed to keep livestock alive without touching the human food supply.\n\nThe shortfall's still there, just relocated onto someone else's shipping lanes, and protein could still run short if the ships stop coming.",
    outcome:
      "Importing feed to keep herds alive avoids a cull that would take years to recover from, a genuinely good instinct. But it's papering over a shortfall your own policy created by diverting domestic grain away from feed in the first place, ::shifting the protein risk from your fields onto someone else's supply chain::.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.2.1.2",
    title: "Promote Plant-Based Substitution",
    description:
      "You push consumption toward plant-based protein instead of importing feed.\n\nIt buys time without solving the shortfall underneath it, and time is the one thing you don't have much of.",
    outcome:
      "Encouraging plant-based protein is sound long-run economics; consumer demand really does shift given the right incentives. The problem is speed: habits change over years, whilst the grain diversion that created the protein shortfall took effect immediately. ::A slow fix for a fast problem still leaves a gap in the meantime::.",
    isEnding: true,
    choices: [],
  },

  {
    id: "2.2.2",
    title: "Divert Crop Use From Biofuels",
    description:
      "You redirect crops from biofuel production back to food.\n\nEnergy prices rise in response, and that cost moves through the economy far faster than the food relief does.",
    choices: [
      {
        text: "Borrow heavily to fund fuel subsidies",
        nextId: "2.2.2.1",
        description:
          "Take on government debt to keep energy prices low. Finance the subsidy through borrowing rather than taxation.",
      },
      {
        text: "Print money to fund fuel subsidies",
        nextId: "2.2.2.2",
        description:
          "Fund the subsidy by expanding the money supply. Cover the cost immediately without raising taxes or issuing debt.",
      },
    ],
  },
  {
    id: "2.2.2.1",
    title: "Borrow Heavily to Fund Fuel Subsidies",
    description:
      "You borrow to subsidise fuel and keep energy costs manageable.\n\nThe debt, however, doesn't disappear soon. It just waits for the moment your economy is least prepared to service it.",
    outcome:
      "Borrowing to fund the subsidy is, on its own, the more credible option: debt can be repaid on a defined schedule in a way that printed money never really is. But it comes right after stockpile releases and crop diversions that already told markets your reserves were thin. Add debt on top of that signal, and ::lenders start pricing in the risk that the debt itself becomes the next crisis::.",
    isEnding: true,
    choices: [],
  },
  {
    id: "2.2.2.2",
    title: "Print Money to Fund Fuel Subsidies",
    description:
      "You fund the fuel subsidy by printing money, the fastest fix available to you.\n\n(Hyper)inflation follows, regardless of how urgent the reasons were.",
    outcome:
      "Printing money is the fastest way to fund a subsidy, and the least credible. It follows stockpile releases and crop diversions that had already signalled thinning reserves to anyone watching. Expand the money supply on top of that signal, and ::inflation is the least of it::: you've all but confirmed exactly what markets already suspected.",
    isEnding: true,
    choices: [],
  },
];

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

export const scenariosById: Record<string, Scenario> = Object.fromEntries(
  scenarios.map((s) => [s.id, s])
);

export const startScenario: Scenario = scenarios.find((s) => s.isStart)!;

export const endingScenarios: Scenario[] = scenarios.filter((s) => s.isEnding);

export const choicePastTense: Record<string, string> = {
  "Impose export controls": "Imposed export controls",
  "Impose a price ceiling on food": "Imposed a price ceiling on food",
  "Maintain and intensify the ban": "Maintained and intensified the ban",
  "Reduce restrictions": "Reduced restrictions",
  "Increase border enforcement": "Increased border enforcement",
  "Legalise some exports through a quota system": "Legalised some exports through a quota system",
  "Increase taxes to fund enforcement": "Increased taxes to fund enforcement",
  "Reduce government spending on other programs": "Reduced government spending on other programs",
  "Prioritise allied nations": "Prioritised allied nations",
  "Allocate based on humanitarian need": "Allocated based on humanitarian need",
  "Introduce targeted food vouchers": "Introduced targeted food vouchers",
  "Reduce food import tariffs on one staple food": "Reduced food import tariffs on one staple food",
  "Introduce household purchasing limits": "Introduced household purchasing limits",
  "Ease price-gouging laws (letting prices rise further)": "Eased price-gouging laws, letting prices rise further",
  "Provide temporary farmer income support": "Provided temporary farmer income support",
  "Set a minimum support price / price floor for farmers": "Set a minimum support price / price floor for farmers",
  "Pay farmers a subsidy and make direct grain purchases": "Paid farmers a subsidy and made direct grain purchases",
  "Release national stockpiles": "Released national stockpiles",
  "Subsidise only one staple crop": "Subsidised only one staple crop",
  "Subsidise only small farmers": "Subsidised only small farmers",
  "Mandate wheat fortification with iron & vitamins": "Mandated wheat fortification with iron & vitamins",
  "Expand school micronutrient feeding programs": "Expanded school micronutrient feeding programs",
  "Nationalise large farms": "Nationalised large farms",
  "Allow large farms to fail": "Allowed large farms to fail",
  "Divert crop use away from animal feed": "Diverted crop use away from animal feed",
  "Divert crop use away from biofuels": "Diverted crop use away from biofuels",
  "Import animal feed & meat products from abroad": "Imported animal feed and meat products from abroad",
  "Aggressively promote plant-based substitution": "Aggressively promoted plant-based substitution",
  "Borrow heavily to fund fuel subsidies": "Borrowed heavily to fund fuel subsidies",
  "Print money to fund fuel subsidies": "Printed money to fund fuel subsidies",
};