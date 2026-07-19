// econConcepts.ts
//
// Maps each Scenario.id (from scenarios.ts) to 1-2 economic concepts,
// rendered as a callout box above the screen by EconConceptCallout.tsx.
// Keeping this separate from scenarios.ts means you can tweak/add/remove
// concepts without touching game content, and vice versa.
//
// Most mappings come straight from your "Related outcome" notes. A few
// screens had no note attached — those are marked "(my call)" so you can
// swap them easily if you don't like the fit.

export interface EconConcept {
  name: string;
  description: string;
}

export const econConceptsById: Record<string, EconConcept[]> = {
  "0": [
    {
      name: "Comparative Advantage & Gains from Trade",
      description:
        "Countries specialise in producing what they make relatively efficiently, then trade for the rest. Your food security already depends on that network, before you've made a single decision.",
    },
  ],

  "1": [
    {
      name: "Prisoner's Dilemma",
      description:
        "Every country is better off if everyone keeps trade flowing, but each has an incentive to restrict first and protect its own supply. When everyone follows that logic, everyone ends up worse off.",
    },
    {
      name: "Prebisch–Singer Hypothesis",
      description:
        "Countries that depend on imported inputs like fertiliser face a structural vulnerability. That dependence tends to worsen, not improve, once global trade networks come under strain.",
    },
  ],

  "1.1": [
    {
      name: "Incentives & Black Markets",
      description:
        "Prices create incentives. When domestic grain is far cheaper than grain across the border, smuggling becomes hugely profitable, moving trade into informal markets you can't tax or oversee.",
    },
    {
      name: "Government Failure",
      description:
        "Interventions meant to fix a market problem can create new ones. Here, the ban cuts legal exports whilst quietly encouraging illegal ones.",
    },
  ],

  "1.1.1": [
    {
      // (my call) no tagged concept for this branch screen; picked as a
      // natural preview of the fiscal tradeoff the next two endings resolve
      name: "Opportunity Cost",
      description:
        "Every dollar spent enforcing the border cannot be spent elsewhere. Whichever way you fund it, something else goes without.",
    },
  ],

  "1.1.1.1": [
    {
      name: "Fiscal Policy",
      description:
        "Governments influence economic activity through taxing and spending. Higher taxes reduce household spending and business investment, lowering demand across the economy.",
    },
  ],

  "1.1.1.2": [
    {
      name: "Opportunity Cost",
      description:
        "Cutting spending elsewhere avoids a tax rise, but the money still has to come from somewhere. Whatever those programmes were funding, households now go without that instead.",
    },
  ],

  "1.1.2": [
    {
      // (my call)
      name: "Rationing Mechanisms",
      description:
        "A quota is itself a rationing device: a fixed, government-set volume standing in for the price signal you've already suppressed.",
    },
  ],

  "1.1.2.1": [
    {
      // (my call) reused from screen "1" — same underlying trust dynamic
      name: "Prisoner's Dilemma",
      description:
        "Trading partners already suspect you're hoarding rather than cooperating. Visible favouritism confirms that expectation instead of easing it.",
    },
  ],

  "1.1.2.2": [
    {
      // (my call)
      name: "Comparative Advantage & Gains from Trade",
      description:
        "Sending grain where it's needed most sends it where it does the most economic good, not just the most moral good. But those gains arrive after the trust was already damaged.",
    },
  ],

  "1.2": [
    {
      name: "Consumer Surplus",
      description:
        "Higher food prices shrink the gap between what households are willing to pay and what they actually pay. That's a direct loss of welfare for consumers.",
    },
    {
      name: "Producer Surplus",
      description:
        "Farmers gain from access to world prices, so producer surplus rises. Governments now have to weigh that gain against the loss to consumers.",
    },
  ],

  "1.2.1": [
    {
      name: "Sen's Entitlement Theory",
      description:
        "Famine often happens not because food disappears, but because people lose the ability to obtain it. Vouchers restore that entitlement even whilst national supply stays the same.",
    },
    {
      name: "Information Asymmetry",
      description:
        "Households rarely know exactly how much food is really available. Emergency measures can read as a sign that shortages are worse than they are, so people change behaviour to get ahead of it (economists call this anticipation the Lucas critique) by stockpiling before it's necessary.",
    },
  ],

  "1.2.1.1": [
    {
      // (my call) reused from screen "2" — same non-price rationing logic
      name: "Rationing Mechanisms",
      description:
        "When prices aren't allowed to ration a scarce good, something else does. A flat purchase cap is one such mechanism, and it can't tell anxious stockpiling apart from genuine need.",
    },
  ],

  "1.2.1.2": [
    {
      name: "Engel's Law",
      description:
        "Poorer households spend a much larger share of income on food than richer ones. Even a modest rise in food prices hits low-income families hardest, and it shows up first as people getting priced out entirely.",
    },
  ],

  "1.2.2": [
    {
      name: "Comparative Advantage",
      description:
        "Lower tariffs let consumers buy from whoever produces food most efficiently. Prices fall, but domestic farmers now compete directly against that efficiency.",
    },
    {
      name: "Infant Industry Argument",
      description:
        "Some industries need temporary protection whilst they build the scale to compete. Remove that protection too fast, and they can shrink before they've had the chance to adapt.",
    },
  ],

  "1.2.2.1": [
    {
      name: "Deadweight Loss",
      description:
        "Funding both a tariff cut and the farmer support needed to offset it means paying twice for the same market. The gap between the two is real money spent with no one better off for it.",
    },
  ],

  "1.2.2.2": [
    {
      name: "Incidence of Government Support",
      description:
        "Governments write the cheque, but the real cost is shared between farmers, consumers and the state depending on how the market responds. Here, the state ends up absorbing most of it.",
    },
  ],

  "2": [
    {
      name: "Price Controls",
      description:
        "When governments set a price below equilibrium, quantity demanded rises whilst quantity supplied falls. A shortage follows by design of the price itself.",
    },
    {
      name: "Rationing Mechanisms",
      description:
        "If price can't ration a scarce good, something else has to: queues, waiting time, or personal connections. Economists call these non-price rationing mechanisms.",
    },
  ],

  "2.1": [
    {
      name: "Cobweb Model",
      description:
        "Farmers decide what to plant months before they harvest it. High prices today encourage more planting for tomorrow, which can produce oversupply and falling prices later.",
    },
  ],

  "2.1.1": [
    {
      name: "Hidden Hunger",
      description:
        "Calories and nutrition aren't the same thing. Concentrating support on one staple can raise calorie output whilst nutritional quality quietly deteriorates.",
    },
    {
      name: "Goodhart's Law",
      description:
        "When a measure becomes a target, it stops being a good measure. Optimising for calories alone makes calorie numbers look better whilst the underlying diet gets worse.",
    },
  ],

  "2.1.1.1": [
    {
      name: "Hidden Hunger",
      description:
        "Fortification patches the deficiency that's already visible in the data, but the dietary variety that would have prevented it stays missing.",
    },
  ],

  "2.1.1.2": [
    {
      name: "Hidden Hunger",
      description:
        "Targeting children captures the highest long-term returns on nutrition spending, but a school-based fix only reaches children who are in school. Everyone else stays exposed to the same shortfall.",
    },
  ],

  "2.1.2": [
    {
      name: "Economies of Scale",
      description:
        "Large farms often produce more cheaply because fixed costs spread across a bigger output. Losing them can reduce national productivity even when smaller farms survive.",
    },
    {
      name: "Tinbergen Rule",
      description:
        "Every independent policy goal needs its own policy tool. Trying to support smallholders and protect aggregate output with a single subsidy almost always creates a side effect somewhere.",
    },
  ],

  "2.1.2.1": [
    {
      name: "Economies of Scale",
      description:
        "Nationalising preserves output on paper, but the market-tested management that made large farms efficient rarely survives the move to state administration.",
    },
  ],

  "2.1.2.2": [
    {
      name: "Economies of Scale",
      description:
        "What looks like ordinary market discipline is really the market reacting to a distortion your policy introduced earlier.",
    },
  ],

  "2.2": [
    {
      // (my call)
      name: "Information Asymmetry",
      description:
        "Drawing down a reserve is easy to keep quiet. Trying to refill it in full view of global markets tells everyone exactly how thin your reserves have become.",
    },
  ],

  "2.2.1": [
    {
      name: "Production Possibility Frontier (PPF)",
      description:
        "An economy can't maximise every output at once. Diverting grain toward people increases food available today, at the cost of future meat production.",
    },
  ],

  "2.2.1.1": [
    {
      // (my call)
      name: "Comparative Advantage & Gains from Trade",
      description:
        "Importing feed lets you keep relying on trade for what's now scarce domestically, shifting the exposure onto someone else's supply chain rather than actually closing the gap.",
    },
  ],

  "2.2.1.2": [
    {
      // (my call)
      name: "Production Possibility Frontier (PPF)",
      description:
        "Shifting demand toward plant protein is a real long-run solution, but consumer habits move slowly along that frontier whilst the shortfall it's meant to fix happened immediately.",
    },
  ],

  "2.2.2": [
    {
      name: "Derived Demand",
      description:
        "Crops are demanded for fuel as well as food. Reducing biofuel output raises food supply, but it also raises energy prices, because fuel producers now compete for fewer inputs.",
    },
    {
      name: "Cost-Push Inflation",
      description:
        "Rising fuel costs move through transport and production and get passed on to consumers, pushing inflation well beyond food markets alone.",
    },
  ],

  "2.2.2.1": [
    {
      name: "Fiscal Sustainability",
      description:
        "Borrowing is the more credible way to fund a subsidy, since debt is repaid on a defined schedule. But it still adds to a debt load lenders are already pricing risk into.",
    },
  ],

  "2.2.2.2": [
    {
      name: "Quantity Theory of Money",
      description:
        "When the money supply grows faster than what an economy actually produces, prices tend to rise. Printing money funds the subsidy today, at the cost of inflation tomorrow.",
    },
  ],
};