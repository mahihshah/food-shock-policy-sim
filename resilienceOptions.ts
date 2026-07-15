// resilienceOptions.ts
//
// Data for the post-game "resilience options" scrollytelling experience.
// Each of the 7 categories has 4-5 sub-items. Each item now carries:
//   - biology: an accessible intro paragraph (jargon explained inline)
//   - economics: 2-3 bullets tying the mechanism to core econ concepts
//   - caseStudy: a real-world precedent shown in a side box
//   - icons: 2-3 Lucide icon names (must match named exports from 'lucide-react')
//
// Pure data — no React/HTML here, same pattern as scenarios.ts.

export interface CaseStudyBox {
  flag: string;
  country: string;
  year: string;
  text: string;
  source?: string;
}

export interface ResilienceItem {
  /** Short technical name of this specific intervention */
  title: string;
  /** Accessible biology intro — jargon explained inline, shown as the opening paragraph */
  biology: string;
  /** 2-3 bullets connecting the mechanism to core economics concepts */
  economics: string[];
  /** Real-world precedent shown in the side box */
  caseStudy: CaseStudyBox;
  /** 2-3 Lucide icon names matching the content */
  icons: string[];
}

export interface ResilienceCategory {
  /** Unique id, also used as the DOM anchor when a card is expanded */
  id: string;
  emoji: string;
  title: string;
  /** One-line summary shown on the card face itself (keep this short) */
  whatThisMeans: string;
  /** Filename only — actual file lives at /public/resilience/<image> */
  image: string;
  items: ResilienceItem[];
}

export const resilienceCategories: ResilienceCategory[] = [
  {
    id: "dual-use-retrofits",
    emoji: "🏢",
    title: "Dual-Use Industry Retrofits",
    whatThisMeans:
      "Using existing factories that make everyday things — like beer, fuel, or paper — and setting them up so they can quickly switch to making survival food if farming fails.",
    image: "dual-use-retrofits.jpg",
    items: [
      {
        title: "Brewery Transition Kits",
        biology:
          "Breweries already run large fermentation tanks — the same vessels that turn sugar into beer. Standardising the pipes and fittings on these tanks means they can just as easily be switched to grow single-cell protein: colonies of bacteria or yeast that multiply into a dense, edible, high-protein paste. Because microbes reproduce far faster than crops or livestock, a full batch can be ready in 3 to 8 days, compared with roughly 20 weeks to raise poultry — and none of it needs sunlight or farmland.",
        economics: [
          "CapEx reduction: retrofitting existing tanks avoids the huge capital expenditure (CapEx — the upfront cost of building new factories) needed to construct dedicated protein plants from scratch, using an estimated 1.89 billion hectolitres of already-idle global brewing capacity.",
          "Waste-to-value: brewery byproducts that currently sell for a low €35–50 per tonne can be converted into high-value protein ingredients, turning a disposal cost into a revenue stream.",
          "Flexibility: because the same tanks can pivot between fuel, fibre, and food, producers can shift output toward whichever market is paying the most — similar to a factory reallocating capacity to its most profitable use.",
        ],
        caseStudy: {
          flag: "🇰🇿",
          country: "Kazakhstan",
          year: "ongoing",
          text: "Kazakhstan has established bioprotein production from natural gas, modernising its livestock feed industry without needing extra farmland or irrigation water.",
          source: "FAO, \"Bioprotein production from natural gas,\" 2025.",
        },
        icons: ["Factory", "FlaskConical", "Timer"],
      },
      {
        title: "Paper Mill Re-Tooling",
        biology:
          "Wood is mostly made of lignocellulose — a tough combination of cellulose (long sugar chains) and lignin (a rigid structural glue) that human bodies can't digest. Enzymes called cellulase and xylanase act like biological scissors, cutting those long sugar chains into simple sugars (monosaccharides) that are edible. Paper mills already break wood down mechanically; keeping a stock of these enzymes on hand lets them go one step further and turn wood pulp into a sugary, energy-rich liquid.",
        economics: [
          "Reusable catalysts: the enzymes can be immobilised (chemically anchored to a solid surface) and reused for 20+ cycles, spreading their cost over many batches instead of buying fresh enzyme each time.",
          "Lower processing costs: enzymatic reactions run at milder temperatures and pressures than chemical alternatives, cutting energy costs and avoiding toxic byproducts like soap.",
        ],
        caseStudy: {
          flag: "🧪",
          country: "Research finding",
          year: "2018",
          text: "Researchers used co-immobilised enzyme cocktails to raise sugarcane bagasse conversion into edible sugars by over 150% compared to free (non-reusable) enzymes.",
          source: "Andler & Goddard, npj Science of Food, 2018.",
        },
        icons: ["Scissors", "Leaf", "FlaskConical"],
      },
      {
        title: "Biofuel Diversion Valves",
        biology:
          "Ethanol plants normally turn the starch inside corn into sugar, then ferment that sugar into fuel-grade alcohol. A diversion valve interrupts the process right after the starch has been broken into sugar — before fermentation — and instead routes that human-grade glucose (a simple, edible sugar) straight into the food supply.",
        economics: [
          "Off-ramp for demand: biofuel mandates currently lock up 16% of global maize; a valve gives policymakers an instant way to redirect that demand back to food markets instead of waiting for new legislation.",
          "Price stabilisation: when food prices exceed fuel prices, producers have a financial incentive to sell the diverted glucose as food, since it becomes the more profitable output — a natural market response to changing relative prices.",
        ],
        caseStudy: {
          flag: "🇧🇷",
          country: "Brazil & EU",
          year: "2022",
          text: "Following the Russia-Ukraine war, Brazil and the EU cut biofuel blending mandates, redirecting rapeseed and maize away from fuel tanks and back toward the food supply.",
          source: "Glauber & Hebebrand, IFPRI, 2023.",
        },
        icons: ["Fuel", "Wheat", "RefreshCw"],
      },
      {
        title: "Monetized Idle Capacity",
        biology:
          "Aerobic fermenters — sealed tanks that use oxygen to grow microbes — can be kept clean, empty, and ready to activate at short notice. Because microbial protein production takes only 3–8 days once a tank is switched on, idle capacity acts like a biological insurance policy: dormant until needed, then quickly productive.",
        economics: [
          "De-risking through subsidy: tax credits offset the 'cost of readiness' (the expense of maintaining unused capacity) so companies aren't penalised for keeping backup infrastructure instead of idle capital.",
          "Shared infrastructure: centralised, public-private fermentation hubs spread the fixed costs of building and maintaining tanks across many potential users, reducing the capital burden on any single firm.",
        ],
        caseStudy: {
          flag: "🇺🇸",
          country: "United States",
          year: "2020",
          text: "Operation Warp Speed pre-ordered vaccines and scaled manufacturing capacity months before any product existed — proving that paying for 'readiness' before a crisis saves critical time once one hits.",
          source: "The Good Food Institute, 2025.",
        },
        icons: ["Landmark", "FlaskConical", "ShieldCheck"],
      },
    ],
  },
  {
    id: "ocean-farming",
    emoji: "🌊",
    title: "Ocean-Based Farming Reserves",
    whatThisMeans:
      "Setting up massive underwater farms along the coast to grow seaweed, which doesn't need soil, fresh water, or even full sunlight to survive.",
    image: "ocean-farming.jpg",
    items: [
      {
        title: "Pre-Permitted Ocean Plots",
        biology:
          "Macroalgae — seaweed — is one of the fastest-growing organisms on Earth and needs no soil, fresh water, or fertiliser to grow; it draws everything it needs from seawater. 'Mariculture' just means farming in the sea. Pre-approving coastal zones for this kind of farming means the biology is ready to scale the moment permission is needed, rather than waiting months for permits.",
        economics: [
          "Reduced red tape: pre-permitting removes the administrative lag between deciding to scale up and actually being allowed to — in a shortage, the opportunity cost of delay is measured in missed harvests.",
          "Global capacity: the UN estimates the world could be fed using just 2% of the ocean for sustainable farming, showing how much slack pre-permitted zones could unlock.",
        ],
        caseStudy: {
          flag: "🇳🇦",
          country: "Namibia",
          year: "recent",
          text: "Namibia granted Kelp Blue environmental clearance for large-scale seaweed farming aimed at the fertiliser, textile, and pharmaceutical industries.",
          source: "World Economic Forum, 2021.",
        },
        icons: ["Waves", "FileText", "Anchor"],
      },
      {
        title: "Floating Rope Stockpiles",
        biology:
          "Regenerative ocean farms use vertical rope grids anchored in the water; seaweed and shellfish attach to the ropes and grow using only sunlight, seawater nutrients, and dissolved gases — no feed required. Warehousing the rope itself, rather than the crops, means the infrastructure can be towed out and deployed within days.",
        economics: [
          "Low barrier to entry: a 20-acre rope farm can be started for roughly $20,000–25,000 — a relatively small capital outlay compared to land-based agriculture.",
          "Paying for public goods: programmes like the Kelp Climate Fund pay farmers for the farm's environmental impact (e.g. carbon capture) — an example of internalising a positive externality, a benefit to society that wouldn't otherwise show up in the market price.",
        ],
        caseStudy: {
          flag: "🌎",
          country: "North America",
          year: "ongoing",
          text: "GreenWave trains coastal communities to deploy rope-based ocean farms, building a decentralised 'blue economy' led by small-scale farmers.",
          source: "GreenWave, 2024.",
        },
        icons: ["Anchor", "Waves", "Package"],
      },
      {
        title: "Sunlight-Free Nutrients",
        biology:
          "If ash or smoke blocks sunlight, ordinary photosynthesising crops struggle. Deep-ocean water is naturally rich in nitrates and phosphates (nutrients plants and microbes need to grow); artificial upwelling pumps bring this water to the surface to feed marine crops. Separately, methanotrophic microbes — organisms that 'eat' methane gas — can produce protein without needing any sunlight at all.",
        economics: [
          "Fail-safe design: this mirrors the logic of the Svalbard Seed Vault — using a natural, low-maintenance backup (cold deep water instead of permafrost) that keeps working even if the power grid fails.",
          "Regional viability: the approach is most cost-effective where deep-ocean access or cheap natural gas is already available, avoiding duplication of an existing regional advantage.",
        ],
        caseStudy: {
          flag: "🇮🇹",
          country: "Italy",
          year: "ongoing",
          text: "Off the coast of Italy, Nemo's Garden grows crops like tomatoes and basil inside underwater biosphere pods, fed by controlled irrigation tubes and sensors.",
          source: "World Economic Forum, 2021.",
        },
        icons: ["Waves", "CloudRain", "Droplets"],
      },
      {
        title: "Wild Seafood Rations",
        biology:
          "Pelagic species live in the open sea; benthic species live on the sea floor. Mapping their location and abundance ahead of time means any emergency harvest can be organised and sustainable rather than a chaotic scramble that risks collapsing the population entirely — currently 44% of assessed wild stocks are already fished at their maximum sustainable level, and 25% are already overfished.",
        economics: [
          "Protecting livelihoods: over 100 million people depend on small-scale fisheries, so unmanaged harvesting risks a classic tragedy of the commons — a shared resource depleted because no single user bears the full cost of overuse.",
          "Reducing waste: better mapping could cut into the roughly 27 million tonnes of fish discarded annually as unwanted bycatch, recovering calories that are currently wasted.",
        ],
        caseStudy: {
          flag: "🌐",
          country: "Kyoto Conference",
          year: "1995",
          text: "95 states agreed on a Plan of Action to improve monitoring of fish stocks and strengthen cooperation to stabilise wild-catch supplies.",
          source: "FAO, World Food Summit.",
        },
        icons: ["Fish", "MapPin", "Users"],
      },
    ],
  },
  {
    id: "open-source-biology",
    emoji: "🧪",
    title: "Open-Source Biology Toolkits",
    whatThisMeans:
      "Creating a free, public digital library of super-hardy microbes and seeds so any community can start growing food in a lab right away without paying for patents.",
    image: "open-source-biology.jpg",
    items: [
      {
        title: "Digital Microbe Vaults",
        biology:
          "Methanotrophic and hydrogenotrophic bacteria consume methane or hydrogen gas and convert it into biomass — up to 67% of which can be protein, packed with essential amino acids (the building blocks of protein the body can't make itself). A public, patent-free genetic registry means any country with access to natural gas could, in principle, grow its own protein supply without paying licensing fees.",
        economics: [
          "Lower R&D barriers: this follows the same logic as a TRIPS waiver (an international agreement temporarily suspending patent protection) — it removes the cost of years of private research for anyone using the recipe.",
          "Turning a byproduct into a resource: countries with methane emissions from sources like coal mines could convert a wasted, even harmful, gas into nutrition.",
        ],
        caseStudy: {
          flag: "🌐",
          country: "Global precedent",
          year: "2020",
          text: "South Africa and India proposed a TRIPS patent waiver for COVID-19 vaccines — the same logic a microbe vault would apply to food: skip licensing fees and manufacture locally.",
          source: "CSIS Perspectives on Innovation, 2023.",
        },
        icons: ["Dna", "Unlock", "TestTube"],
      },
      {
        title: "Freeze-Dried Seed Banks",
        biology:
          "Cryopreservation means storing biological material at extremely low temperatures to pause its metabolism almost entirely, keeping seeds viable for years or decades. Distributing cold-tolerant, low-light seed kits to regional hubs means that if a disaster darkens the sky or drops temperatures, there's already a ready-to-plant backup nearby.",
        economics: [
          "Insurance against irreversible loss: seed diversity, once lost, generally can't be recreated — so these banks function like an insurance policy against a loss that has no market price because it can't be undone.",
          "Reducing single points of failure: distributing kits regionally, rather than storing them all centrally, means one local disaster can't wipe out the entire backup.",
        ],
        caseStudy: {
          flag: "🇸🇾",
          country: "Syria / Lebanon / Morocco",
          year: "2015",
          text: "When war disrupted its Syrian genebank, ICARDA performed the first-ever withdrawal from the Svalbard Global Seed Vault, regenerating its seed collection in Lebanon and Morocco.",
          source: "Crop Trust.",
        },
        icons: ["Snowflake", "Sprout", "Package"],
      },
      {
        title: "Universal Enzyme Recipes",
        biology:
          "Cellulase enzymes break down lignocellulose (the tough, fibrous material in wood, stalks, and leaves) into fermentable sugars that humans or microbes can use for energy. Publishing the biological blueprint for manufacturing these enzymes — rather than keeping it as a trade secret — lets any local mill produce them itself.",
        economics: [
          "Reusable catalysts: like other enzyme applications, immobilising cellulase on a solid support allows 20+ reuse cycles, lowering the cost per tonne of food produced over time.",
          "Democratising R&D: developing new food biotech typically costs around $1 billion; open-source blueprints let smaller, local processors skip that cost entirely.",
        ],
        caseStudy: {
          flag: "🧪",
          country: "Research finding",
          year: "2018",
          text: "Researchers used 'combi-CLEA' enzyme cocktails to convert sugarcane bagasse into edible glucose at a 150% higher rate than free enzymes.",
          source: "Andler & Goddard, npj Science of Food, 2018.",
        },
        icons: ["FlaskConical", "BookOpen", "Leaf"],
      },
      {
        title: "Radiation-Proof Cultures",
        biology:
          "Saccharomyces cerevisiae is ordinary baking and brewing yeast. Engineering radioresistant strains — ones that survive higher radiation or pollution than normal — means fermentation-based food production (and even medicines like insulin) could keep running even after a nuclear accident or a volcanic eruption that pollutes the atmosphere.",
        economics: [
          "Rapid-response buffer: fermentation can yield a protein harvest in just 3–8 days versus roughly 20 weeks for conventional livestock, so storing these cultures acts as a fast, low-cost economic buffer against a slow agricultural recovery.",
          "Avoiding costly resupply: local production capacity reduces reliance on expensive, dangerous resupply missions into a contaminated area.",
        ],
        caseStudy: {
          flag: "🇺🇸",
          country: "United States",
          year: "2020",
          text: "The same Operation Warp Speed readiness strategy — pre-scaling manufacturing before a crisis — applies to storing radiation-tolerant yeast cultures ahead of a nuclear or volcanic emergency.",
          source: "The Good Food Institute, 2025.",
        },
        icons: ["Radiation", "TestTube", "Timer"],
      },
    ],
  },
  {
    id: "sunlight-independent",
    emoji: "🏭",
    title: "Sunlight-Independent Superfoods",
    whatThisMeans:
      "Making food entirely indoors using gas, mushrooms, or leaves, completely skipping the need for traditional farms, soil, or sunlight.",
    image: "sunlight-independent.jpg",
    items: [
      {
        title: "Gas-To-Protein Bioreactors",
        biology:
          "Methanotrophic bacteria — the same methane-eating microbes used in Digital Microbe Vaults — are grown industrially in sealed tanks fed with natural gas or hydrogen. Utilisation efficiency is nearly 100%, meaning almost none of the gas is wasted, and the resulting biomass can be over 42% essential amino acids by weight, entirely without sunlight, soil, or fresh water.",
        economics: [
          "Regional comparative advantage: this is most viable wherever natural gas is already cheap or is otherwise a hazardous waste product (like methane leaking from coal mines) — turning a local liability into a local asset.",
          "Value from a potent pollutant: methane traps roughly 28 times more heat than CO2, so converting it into food also reduces a costly environmental externality.",
        ],
        caseStudy: {
          flag: "🇰🇿",
          country: "Kazakhstan",
          year: "ongoing",
          text: "Kazakhstan is building bioprotein production from natural gas into its national feed-industry strategy, aiming to meet domestic protein demand without new farmland.",
          source: "FAO, 2025.",
        },
        icons: ["Flame", "FlaskConical", "Dna"],
      },
      {
        title: "Leaf Concentrate Presses",
        biology:
          "Many leaves are surprisingly high in protein, but also contain bitter or even toxic alkaloids (naturally occurring plant compounds) that make them inedible as-is. Mechanical fractionation presses physically break open leaf cells, and filtration then separates the pure protein and vitamins from the fibrous, toxic remainder — cauliflower leaves, for example, an ordinarily discarded byproduct, are roughly 20% protein.",
        economics: [
          "Valorising waste: turning a byproduct that's normally thrown away into a saleable ingredient creates a new revenue stream for farmers — monetising what used to be a cost.",
          "Lower environmental footprint: producing protein from leaves already grown as farm byproducts has a smaller land and emissions footprint than raising animals for the same protein.",
        ],
        caseStudy: {
          flag: "🇧🇩",
          country: "Bangladesh",
          year: "2024",
          text: "In Khamergragram village, smallholder farmer Shahina Begum turned household organic waste into new income streams — the same underlying logic that leaf-protein pressing extends to squeezing nutrition out of discarded leaves.",
          source: "CGIAR System, 2024.",
        },
        icons: ["Leaf", "FlaskConical", "Recycle"],
      },
      {
        title: "Petrochemical Calories",
        biology:
          "Through chemical synthesis (building complex molecules from simpler ones in a lab), industrial hydrocarbons — the molecules that make up crude oil and its derivatives — can be refined into edible synthetic fats like palmitic and stearic acid. These provide dense, storable calories as a last-resort energy source when normal fats are unavailable.",
        economics: [
          "Asset flexibility: petrochemical infrastructure can pivot toward food-grade output when fuel prices are low relative to food prices — an economic 'off-ramp' similar to biofuel diversion.",
          "Bridging a recovery gap: since crop recovery after a shock typically takes 6–12 months, this option provides temporary caloric supply during exactly the window when food would otherwise be