// resilienceOptions.ts
//
// Data for the post-game "resilience options" scrollytelling experience.
// Each of the 7 categories has 4-5 sub-items. Each item now carries:
//   - biology: an accessible intro paragraph (jargon explained inline)
//   - economics: 2-3 bullets tying the mechanism to core econ concepts
//   - caseStudy: a real-world precedent shown in a side box
//   - icons: 2-3 Lucide icon names (must match named exports from 'lucide-react')
//
// Pure data - no React/HTML here, same pattern as scenarios.ts.

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
  /** Accessible biology intro - jargon explained inline, shown as the opening paragraph */
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
  /** Filename only - actual file lives at /public/resilience/<image> */
  image: string;
  items: ResilienceItem[];
}

export const resilienceCategories: ResilienceCategory[] = [
  {
    id: "dual-use-retrofits",
    emoji: "🏢",
    title: "Dual-Use Industry Retrofits",
    whatThisMeans:
      "Using existing factories that make everyday things - like beer, fuel, or paper - and setting them up so they can quickly switch to making survival food if farming fails.",
    image: "dual-use-retrofits.jpg",
    items: [
      {
        title: "Brewery Transition Kits",
        biology:
          "Breweries already run large fermentation tanks - the same vessels that turn sugar into beer. Standardising the pipes and fittings on these tanks means they can just as easily be switched to grow single-cell protein: colonies of bacteria or yeast that multiply into a dense, edible, high-protein paste. Because microbes reproduce far faster than crops or livestock, a full batch can be ready in 3 to 8 days, compared with roughly 20 weeks to raise poultry - and none of it needs sunlight or farmland.",
        economics: [
          "CapEx reduction: retrofitting existing tanks avoids the huge capital expenditure (CapEx - the upfront cost of building new factories) needed to construct dedicated protein plants from scratch, using an estimated 1.89 billion hectolitres of already-idle global brewing capacity.",
          "Waste-to-value: brewery byproducts that currently sell for a low €35–50 per tonne can be converted into high-value protein ingredients, turning a disposal cost into a revenue stream.",
          "Flexibility: because the same tanks can pivot between fuel, fibre, and food, producers can shift output toward whichever market is paying the most - similar to a factory reallocating capacity to its most profitable use.",
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
          "Wood is mostly made of lignocellulose - a tough combination of cellulose (long sugar chains) and lignin (a rigid structural glue) that human bodies can't digest. Enzymes called cellulase and xylanase act like biological scissors, cutting those long sugar chains into simple sugars (monosaccharides) that are edible. Paper mills already break wood down mechanically; keeping a stock of these enzymes on hand lets them go one step further and turn wood pulp into a sugary, energy-rich liquid.",
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
          "Ethanol plants normally turn the starch inside corn into sugar, then ferment that sugar into fuel-grade alcohol. A diversion valve interrupts the process right after the starch has been broken into sugar - before fermentation - and instead routes that human-grade glucose (a simple, edible sugar) straight into the food supply.",
        economics: [
          "Off-ramp for demand: biofuel mandates currently lock up 16% of global maize; a valve gives policymakers an instant way to redirect that demand back to food markets instead of waiting for new legislation.",
          "Price stabilisation: when food prices exceed fuel prices, producers have a financial incentive to sell the diverted glucose as food, since it becomes the more profitable output - a natural market response to changing relative prices.",
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
          "Aerobic fermenters - sealed tanks that use oxygen to grow microbes - can be kept clean, empty, and ready to activate at short notice. Because microbial protein production takes only 3–8 days once a tank is switched on, idle capacity acts like a biological insurance policy: dormant until needed, then quickly productive.",
        economics: [
          "De-risking through subsidy: tax credits offset the 'cost of readiness' (the expense of maintaining unused capacity) so companies aren't penalised for keeping backup infrastructure instead of idle capital.",
          "Shared infrastructure: centralised, public-private fermentation hubs spread the fixed costs of building and maintaining tanks across many potential users, reducing the capital burden on any single firm.",
        ],
        caseStudy: {
          flag: "🇺🇸",
          country: "United States",
          year: "2020",
          text: "Operation Warp Speed pre-ordered vaccines and scaled manufacturing capacity months before any product existed - proving that paying for 'readiness' before a crisis saves critical time once one hits.",
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
          "Macroalgae - seaweed - is one of the fastest-growing organisms on Earth and needs no soil, fresh water, or fertiliser to grow; it draws everything it needs from seawater. 'Mariculture' just means farming in the sea. Pre-approving coastal zones for this kind of farming means the biology is ready to scale the moment permission is needed, rather than waiting months for permits.",
        economics: [
          "Reduced red tape: pre-permitting removes the administrative lag between deciding to scale up and actually being allowed to - in a shortage, the opportunity cost of delay is measured in missed harvests.",
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
          "Regenerative ocean farms use vertical rope grids anchored in the water; seaweed and shellfish attach to the ropes and grow using only sunlight, seawater nutrients, and dissolved gases - no feed required. Warehousing the rope itself, rather than the crops, means the infrastructure can be towed out and deployed within days.",
        economics: [
          "Low barrier to entry: a 20-acre rope farm can be started for roughly $20,000–25,000 - a relatively small capital outlay compared to land-based agriculture.",
          "Paying for public goods: programmes like the Kelp Climate Fund pay farmers for the farm's environmental impact (e.g. carbon capture) - an example of internalising a positive externality, a benefit to society that wouldn't otherwise show up in the market price.",
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
          "If ash or smoke blocks sunlight, ordinary photosynthesising crops struggle. Deep-ocean water is naturally rich in nitrates and phosphates (nutrients plants and microbes need to grow); artificial upwelling pumps bring this water to the surface to feed marine crops. Separately, methanotrophic microbes - organisms that 'eat' methane gas - can produce protein without needing any sunlight at all.",
        economics: [
          "Fail-safe design: this mirrors the logic of the Svalbard Seed Vault - using a natural, low-maintenance backup (cold deep water instead of permafrost) that keeps working even if the power grid fails.",
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
          "Pelagic species live in the open sea; benthic species live on the sea floor. Mapping their location and abundance ahead of time means any emergency harvest can be organised and sustainable rather than a chaotic scramble that risks collapsing the population entirely - currently 44% of assessed wild stocks are already fished at their maximum sustainable level, and 25% are already overfished.",
        economics: [
          "Protecting livelihoods: over 100 million people depend on small-scale fisheries, so unmanaged harvesting risks a classic tragedy of the commons - a shared resource depleted because no single user bears the full cost of overuse.",
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
          "Methanotrophic and hydrogenotrophic bacteria consume methane or hydrogen gas and convert it into biomass - up to 67% of which can be protein, packed with essential amino acids (the building blocks of protein the body can't make itself). A public, patent-free genetic registry means any country with access to natural gas could, in principle, grow its own protein supply without paying licensing fees.",
        economics: [
          "Lower R&D barriers: this follows the same logic as a TRIPS waiver (an international agreement temporarily suspending patent protection) - it removes the cost of years of private research for anyone using the recipe.",
          "Turning a byproduct into a resource: countries with methane emissions from sources like coal mines could convert a wasted, even harmful, gas into nutrition.",
        ],
        caseStudy: {
          flag: "🌐",
          country: "Global precedent",
          year: "2020",
          text: "South Africa and India proposed a TRIPS patent waiver for COVID-19 vaccines - the same logic a microbe vault would apply to food: skip licensing fees and manufacture locally.",
          source: "CSIS Perspectives on Innovation, 2023.",
        },
        icons: ["Dna", "Unlock", "TestTube"],
      },
      {
        title: "Freeze-Dried Seed Banks",
        biology:
          "Cryopreservation means storing biological material at extremely low temperatures to pause its metabolism almost entirely, keeping seeds viable for years or decades. Distributing cold-tolerant, low-light seed kits to regional hubs means that if a disaster darkens the sky or drops temperatures, there's already a ready-to-plant backup nearby.",
        economics: [
          "Insurance against irreversible loss: seed diversity, once lost, generally can't be recreated - so these banks function like an insurance policy against a loss that has no market price because it can't be undone.",
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
          "Cellulase enzymes break down lignocellulose (the tough, fibrous material in wood, stalks, and leaves) into fermentable sugars that humans or microbes can use for energy. Publishing the biological blueprint for manufacturing these enzymes - rather than keeping it as a trade secret - lets any local mill produce them itself.",
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
          "Saccharomyces cerevisiae is ordinary baking and brewing yeast. Engineering radioresistant strains - ones that survive higher radiation or pollution than normal - means fermentation-based food production (and even medicines like insulin) could keep running even after a nuclear accident or a volcanic eruption that pollutes the atmosphere.",
        economics: [
          "Rapid-response buffer: fermentation can yield a protein harvest in just 3–8 days versus roughly 20 weeks for conventional livestock, so storing these cultures acts as a fast, low-cost economic buffer against a slow agricultural recovery.",
          "Avoiding costly resupply: local production capacity reduces reliance on expensive, dangerous resupply missions into a contaminated area.",
        ],
        caseStudy: {
          flag: "🇺🇸",
          country: "United States",
          year: "2020",
          text: "The same Operation Warp Speed readiness strategy - pre-scaling manufacturing before a crisis - applies to storing radiation-tolerant yeast cultures ahead of a nuclear or volcanic emergency.",
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
          "Methanotrophic bacteria - the same methane-eating microbes used in Digital Microbe Vaults - are grown industrially in sealed tanks fed with natural gas or hydrogen. Utilisation efficiency is nearly 100%, meaning almost none of the gas is wasted, and the resulting biomass can be over 42% essential amino acids by weight, entirely without sunlight, soil, or fresh water.",
        economics: [
          "Regional comparative advantage: this is most viable wherever natural gas is already cheap or is otherwise a hazardous waste product (like methane leaking from coal mines) - turning a local liability into a local asset.",
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
          "Many leaves are surprisingly high in protein, but also contain bitter or even toxic alkaloids (naturally occurring plant compounds) that make them inedible as-is. Mechanical fractionation presses physically break open leaf cells, and filtration then separates the pure protein and vitamins from the fibrous, toxic remainder - cauliflower leaves, for example, an ordinarily discarded byproduct, are roughly 20% protein.",
        economics: [
          "Valorising waste: turning a byproduct that's normally thrown away into a saleable ingredient creates a new revenue stream for farmers - monetising what used to be a cost.",
          "Lower environmental footprint: producing protein from leaves already grown as farm byproducts has a smaller land and emissions footprint than raising animals for the same protein.",
        ],
        caseStudy: {
          flag: "🇧🇩",
          country: "Bangladesh",
          year: "2024",
          text: "In Khamergragram village, smallholder farmer Shahina Begum turned household organic waste into new income streams - the same underlying logic that leaf-protein pressing extends to squeezing nutrition out of discarded leaves.",
          source: "CGIAR System, 2024.",
        },
        icons: ["Leaf", "FlaskConical", "Recycle"],
      },
      {
        title: "Petrochemical Calories",
        biology:
          "Through chemical synthesis (building complex molecules from simpler ones in a lab), industrial hydrocarbons - the molecules that make up crude oil and its derivatives - can be refined into edible synthetic fats like palmitic and stearic acid. These provide dense, storable calories as a last-resort energy source when normal fats are unavailable.",
        economics: [
          "Asset flexibility: petrochemical infrastructure can pivot toward food-grade output when fuel prices are low relative to food prices - an economic 'off-ramp' similar to biofuel diversion.",
          "Bridging a recovery gap: since crop recovery after a shock typically takes 6–12 months, this option provides temporary caloric supply during exactly the window when food would otherwise be scarcest.",
        ],
        caseStudy: {
          flag: "🇧🇷",
          country: "Brazil & EU",
          year: "2022",
          text: "Brazil and the EU's 2022 biofuel mandate cuts show the same 'off-ramp' logic that petrochemical-to-food conversion takes to its extreme: redirecting industrial inputs toward food when prices demand it.",
          source: "Glauber & Hebebrand, IFPRI, 2023.",
        },
        icons: ["Fuel", "FlaskConical", "Zap"],
      },
      {
        title: "Mushroom Log Networks",
        biology:
          "Saprophytic fungi are mushrooms that feed on dead organic matter rather than needing sunlight, so they grow readily indoors in the dark. Inoculating - deliberately introducing fungal spores into - waste material like corn stalks or spent brewery grain lets mushrooms break down otherwise-indigestible plant fibre into fast-growing, protein-rich food.",
        economics: [
          "Waste-to-revenue: spent brewery grain currently sells for only about €35–50 per tonne; converting it into mushrooms can multiply its value substantially.",
          "Circular economy: this model turns any factory that produces organic waste into a decentralised mushroom-growing hub, cutting into the roughly 40% of food currently lost to waste.",
        ],
        caseStudy: {
          flag: "🇨🇭",
          country: "Switzerland",
          year: "2024",
          text: "Swiss startup ProSeed processes brewery spent grain into 'cacao-like' nutritional concentrates before it spoils, showing how a waste-log network could work at scale.",
          source: "FI Global Insights, 2024.",
        },
        icons: ["Sprout", "Recycle", "Factory"],
      },
    ],
  },
  {
    id: "automated-legal",
    emoji: "🏛️",
    title: "Automated Legal Triggers",
    whatThisMeans:
      "Writing emergency laws today that turn on automatically during a disaster, instantly forcing companies to share food and patents instead of hoarding them.",
    image: "automated-legal.jpg",
    items: [
      {
        title: "Emergency Grain Diversion",
        biology:
          "Feeding grain to livestock is calorically inefficient - up to 90% or more of the plant's energy is lost as the animal converts it into meat over months. A legal trigger that instantly redirects grain from animal feed to direct human consumption captures those calories immediately, skipping the inefficient conversion step, at a time when 16% of global maize currently goes to biofuel or feed.",
        economics: [
          "Inelastic demand: food demand doesn't fall much even as prices rise sharply - this 'inelasticity' is exactly what drives food prices to extreme highs during a shortage; diverting grain adds supply precisely when it's needed most.",
          "Automatic 'off-ramps': legislating a trigger removes the political delay of passing emergency laws in real time, since the mechanism activates automatically once prices cross a pre-set threshold.",
        ],
        caseStudy: {
          flag: "🇧🇷",
          country: "Brazil & EU",
          year: "2022",
          text: "Brazil cut its biodiesel blending mandate from 13% to 10% after the invasion of Ukraine, diverting millions of tonnes of rapeseed and maize from fuel tanks back to food supply.",
          source: "IFPRI, 2023.",
        },
        icons: ["Wheat", "Gavel", "RefreshCw"],
      },
      {
        title: "Peacetime Option Contracts",
        biology:
          "Industrial bioreactors are biologically flexible: the same equipment used to make fuel, textiles, or other products can often be reprogrammed to produce food-grade microbial protein, with a full harvest achievable in just 3–8 days once the switch is made.",
        economics: [
          "Financial options as insurance: this works like a real option contract in finance - the government pays a small annual premium now for the right (and the firm's obligation) to redirect production during a crisis, without building an entire emergency factory itself.",
          "Shared infrastructure: pooling capacity into public-private fermentation hubs spreads the fixed cost of readiness across more users, lowering the capital burden for any one company.",
        ],
        caseStudy: {
          flag: "🇺🇸",
          country: "United States",
          year: "recent",
          text: "The US National Security Commission on Emerging Biotechnology has proposed pre-purchasing 'options' on industrial fermentation capacity, similar to vaccine pre-orders, so cities could pivot to food production within a week of a crisis.",
          source: "The Good Food Institute, 2025.",
        },
        icons: ["Banknote", "FlaskConical", "ScrollText"],
      },
      {
        title: "Anti-Hoarding Ration Software",
        biology:
          "Equitable distribution of essential amino acids and micronutrients matters biologically because prolonged calorie or nutrient deprivation weakens the immune system, which in turn makes secondary disease outbreaks more likely during a crisis - rationing isn't just about fairness, it's a public-health measure.",
        economics: [
          "Demand smoothing: automated purchase limits prevent panic buying, a self-fulfilling cycle where fear of shortage causes the shortage - a demand shock unrelated to actual supply.",
          "Supply chain predictability: with limits in place, manufacturers can plan around steady demand instead of reacting to erratic surges, reducing the 'bullwhip effect' where small demand changes cause large swings up the supply chain.",
        ],
        caseStudy: {
          flag: "🇺🇸",
          country: "United States",
          year: "2024",
          text: "When avian flu pushed egg prices up nearly 37% in a year, many US shelves emptied not from a true shortage but from localised hoarding - a $1.4 billion shock that rationing software could have limited.",
          source: "The Good Food Institute, 2025.",
        },
        icons: ["Lock", "ShoppingCart", "ShieldCheck"],
      },
      {
        title: "Patent Waiver Triggers",
        biology:
          "Compulsory licensing means a government can legally override a patent so others may copy it - here, letting any capable factory manufacture patented cellulase enzymes or protein-producing bacterial strains without the original patent holder's permission, potentially saving years of otherwise-necessary R&D.",
        economics: [
          "Lowering the barrier to entry: with new food biotech R&D typically costing around $1 billion, a waiver removes a cost that would otherwise be completely prohibitive for many developing nations.",
          "Balancing incentives: waivers are usually designed to activate only when public interest clearly outweighs private profit during acute disasters, preserving the normal incentive to innovate in ordinary times.",
        ],
        caseStudy: {
          flag: "🌐",
          country: "World Trade Organization",
          year: "2022",
          text: "The WTO approved a historic TRIPS waiver for COVID-19 vaccine patents, proving global treaties can pause patent law during a crisis to let any capable factory manufacture what's needed.",
          source: "CSIS Perspectives on Innovation, 2023.",
        },
        icons: ["Unlock", "Gavel", "FlaskConical"],
      },
    ],
  },
  {
    id: "micro-ingredient",
    emoji: "📦",
    title: "Micro-Ingredient Stockpiling",
    whatThisMeans:
      "Storing tiny, concentrated packs of vitamins, minerals, and chemicals that can turn bland survival paste into healthy, complete human meals.",
    image: "micro-ingredient.jpg",
    items: [
      {
        title: "Concentrated Fertilizer Vaults",
        biology:
          "Plants and microbes need nitrogen to build proteins and phosphorus to build DNA. Storing these as pure, dried (desiccated) powders - rather than storing bulky finished grain - provides the essential raw 'building blocks' for indoor farms and bioreactors to keep producing food for years, independent of soil health or weather.",
        economics: [
          "Storage efficiency: dried powders take up far less space and require less climate control than raw grain, lowering long-term warehousing costs.",
          "Multiplier effect: providing concentrated inputs is often cheaper than shipping finished food aid, since it leverages local labour to do the 'last mile' of actually growing the food.",
        ],
        caseStudy: {
          flag: "🇦🇫",
          country: "Afghanistan",
          year: "2021–22",
          text: "During the 2021–22 food crisis, the FAO delivered emergency fertiliser and seeds to 518,000 Afghan households, letting marginal farmers grow their own wheat despite drought and economic collapse.",
          source: "FAO, 2022.",
        },
        icons: ["Package", "Sprout", "Warehouse"],
      },
      {
        title: "Mineral and Vitamin Paks",
        biology:
          "Calorie-dense survival foods like wood-sugar syrup or basic microbial protein are often missing key micronutrients - iron, zinc, and B-vitamins (thiamine, niacin, cobalamin) - that the body needs in small amounts but can't function without. Without supplementation, people can eat enough calories to avoid starving yet still develop anaemia, scurvy, or a weakened immune system.",
        economics: [
          "Boosting ROI on waste: adding just 3–5% micronutrient powder to a cheap byproduct like spent grain flour can turn a €35/tonne waste stream into a nutritionally complete, human-grade ingredient.",
          "Cost-effective public health: because the fortification cost per person is small relative to treating the diseases that deficiency causes, this is a highly efficient use of a stockpiling budget.",
        ],
        caseStudy: {
          flag: "🧪",
          country: "Research finding",
          year: "2025",
          text: "Researchers found that adding just 3–5% upcycled brewer's spent-grain powder to food products could meaningfully boost iron and zinc levels without harming taste.",
          source: "Aradwad et al., Comprehensive Reviews in Food Science and Food Safety, 2025.",
        },
        icons: ["Pill", "Package", "Wheat"],
      },
      {
        title: "Enzyme Stabilization Tanks",
        biology:
          "Cellulase and xylanase enzymes are delicate proteins that lose effectiveness outside a narrow temperature and pH (acidity) range. Stabilisation tanks keep them at the right conditions so they're ready to instantly catalyse (speed up) the chemical breakdown of raw plant matter into edible sugar the moment they're needed.",
        economics: [
          "Reuse lowers unit cost: because these enzymes can be reused for 20+ cycles once immobilised, the ongoing cost per tonne of processed food drops the more the system is used.",
          "Closing the cost gap: repeated reuse helps enzyme-based processing compete on price with cheaper, more energy-intensive chemical alternatives.",
        ],
        caseStudy: {
          flag: "🇨🇭",
          country: "Switzerland",
          year: "2024",
          text: "Swiss startup ProSeed's modular units stabilise brewery spent grain immediately after production, turning what would spoil into a shelf-stable food ingredient.",
          source: "Wiles, FI Global Insights, 2024.",
        },
        icons: ["FlaskConical", "Thermometer", "TestTube"],
      },
      {
        title: "Water Purification Cubes",
        biology:
          "Food-production systems - hydroponic farms, bioreactors - need water free of pathogens (disease-causing organisms) to avoid contaminating the nutrient solutions crops and microbes grow in. Compact blocks of flocculants (chemicals that clump contaminants together for easy removal) and chlorine can quickly render dirty water safe for industrial use.",
        economics: [
          "Protecting sunk investment: a grid failure that contaminates the water supply could otherwise render billions of dollars of processing infrastructure useless; purification cubes are a comparatively low-cost way to prevent that loss.",
          "Compact storage: dense, shelf-stable blocks take up far less warehouse space per unit of purification capacity than bottled water.",
        ],
        caseStudy: {
          flag: "🇸🇬",
          country: "Singapore",
          year: "2030 target",
          text: "Singapore's \"30 by 30\" plan uses advanced hydroponics - including underwater projects like Nemo's Garden - aiming to produce 30% of its food locally by 2030, underpinned by reliable local water purification.",
          source: "Singapore Food Agency / FAO.",
        },
        icons: ["Droplets", "ShieldCheck", "Package"],
      },
    ],
  },
  {
    id: "hyper-local",
    emoji: "🏡",
    title: "Hyper-Local Indoor Survival",
    whatThisMeans:
      "Giving regular people the blueprints and tools to grow their own food inside their homes, basements, or neighborhoods without relying on stores.",
    image: "hyper-local.jpg",
    items: [
      {
        title: "Basement Hydroponic Blueprints",
        biology:
          "Hydroponics grows plants without soil by delivering the 13 essential minerals roots need directly through a nutrient solution. Removing soil also removes soil-borne pests and diseases, and LED grow lights let the whole system run indoors, in the dark, independent of outdoor growing seasons.",
        economics: [
          "Low barrier to entry: basic home kits now cost under $100, making decentralised food production affordable for individual households, not just institutions.",
          "Resource efficiency: closed-loop systems recirculate water and nutrients, using around 95% less water than traditional soil farming.",
        ],
        caseStudy: {
          flag: "🇸🇬",
          country: "Singapore",
          year: "ongoing",
          text: "Sustenir grows over 90 tonnes of crops annually indoors using nutrient-film hydroponics, proving urban buildings can become high-output, water-efficient food hubs.",
          source: "Singapore Food Agency, 2022.",
        },
        icons: ["Home", "Sprout", "Zap"],
      },
      {
        title: "Community Compost Loops",
        biology:
          "Vermiculture uses earthworms to physically break down organic waste - food scraps, for example - into nutrient-rich vermicompost (worm-processed fertiliser). The worms themselves are also edible and high in protein, so the same process produces both a soil amendment and a backup food source.",
        economics: [
          "Cost replacement: households can replace purchased chemical fertiliser (costing 30–50 taka/kg in some regions) with a zero-cost backyard system.",
          "Income diversification: selling surplus compost or produce creates an additional income stream, reducing reliance on any single source of income.",
        ],
        caseStudy: {
          flag: "🇧🇩",
          country: "Bangladesh",
          year: "2024",
          text: "Shahina Begum started with two plastic crates and one kilogram of earthworms; her nine-crate vermicomposting system now earns her family roughly 3,000 taka a month.",
          source: "CGIAR System, 2024.",
        },
        icons: ["Recycle", "Sprout", "HandCoins"],
      },
      {
        title: "Appliance Retrofit Manuals",
        biology:
          "An unplugged refrigerator is already insulated and airtight - exactly the humidity- and temperature-stable environment mycological incubation (mushroom growing) needs. Inoculating waste material inside it with fungal spores lets a piece of discarded hardware become a functioning food-production unit.",
        economics: [
          "Low capital expenditure: reusing discarded appliances avoids the cost of purpose-built equipment, letting communities start production with assets they already own.",
          "Shelf-stability: converting wet organic waste into dry mushroom product before it spoils avoids both disposal costs and the lost value of wasted material.",
        ],
        caseStudy: {
          flag: "🇨🇭",
          country: "Switzerland",
          year: "2024",
          text: "ProSeed's modular processing units, installed directly at breweries, show how repurposed hardware can turn discarded organic waste into a 40% protein concentrate.",
          source: "FI Global Insights, 2024.",
        },
        icons: ["Refrigerator", "Sprout", "Recycle"],
      },
      {
        title: "Micro-Grid Food Bubbles",
        biology:
          "Controlled Environment Agriculture (CEA) means growing food inside a sealed, climate-controlled space rather than outdoors, insulating production from external shocks like disease or ash-darkened skies. Fermentation-based protein production suits this well, since a full harvest is possible in just 3–8 days once the energy supply - here, a local solar micro-grid - is secured.",
        economics: [
          "Avoiding cascading failure: decoupling food production from the main power grid prevents a single grid failure from causing a total crop loss.",
          "Location neutrality: because these systems don't depend on a specific grid, they can be deployed almost anywhere, lowering transport costs by producing food close to where it's needed.",
        ],
        caseStudy: {
          flag: "🇮🇹",
          country: "Italy",
          year: "ongoing",
          text: "Nemo's Garden's underwater pods are powered by solar panels on an above-water control tower, creating a self-contained 'food bubble' that runs on decentralised renewable energy.",
          source: "The Good Food Institute, 2025.",
        },
        icons: ["Zap", "Sun", "Home"],
      },
    ],
  },
];