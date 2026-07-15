// resilienceOptions.ts
//
// Data for the post-game "resilience options" carousel: seven long-term
// preparedness strategies, each with an image, a one-line "what this means"
// summary for the card face, and 4 detail items shown when the user
// explores that card further.
//
// Pure data — no React/HTML here, same pattern as scenarios.ts and
// caseStudies.ts. Images referenced by filename only; actual files live in
// /public/resilience/<image> (see setup notes given alongside this file).

export interface ResilienceItem {
  /** Short technical name of this specific intervention */
  title: string;
  /** The precise / technical description — shown in a tooltip, not inline */
  technical: string;
  /** Plain-language version — this is the text shown by default */
  simple: string;
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
        technical:
          "Standardize plumbing hooks and bioreactor piping in commercial breweries. This allows rapid conversion into single-cell protein fermenters.",
        simple:
          "Breweries already have giant metal tanks for beer; adding special pipe attachments means those same tanks can grow edible, high-protein microbes instead.",
      },
      {
        title: "Paper Mill Re-Tooling",
        technical:
          "Mandate that pulp factories keep specific cellulase enzymes on standby. This enables them to turn wood chips into digestible sugar water via enzymatic hydrolysis.",
        simple:
          "Paper mills smash trees into wood pulp; if they mix in a special protein chemical (an enzyme), they can break down the wood into a sweet, edible syrup for energy.",
      },
      {
        title: "Biofuel Diversion Valves",
        technical:
          "Install automated bypass valves at starch-based ethanol plants. This instantly redirects corn starch away from fermentation into human-grade glucose lines.",
        simple:
          "Fuel plants turn corn into car fuel; adding a switch-valve lets workers immediately stop making fuel and send that corn flour straight to the food supply.",
      },
      {
        title: "Monetized Idle Capacity",
        technical:
          "Grant corporate tax credits to biotechnology firms that maintain redundant, empty aerobic fermenters. These tanks sit dormant until a food emergency strikes.",
        simple:
          "The government pays factories to keep extra, empty mixing tanks on standby so they are clean and ready to grow food the minute disaster hits.",
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
        technical:
          "Zone massive coastal areas for macroalgae mariculture ahead of time. This cuts bureaucratic red tape before deployment.",
        simple:
          "Pre-approving large areas of the ocean for seaweed farming so people don't have to wait months for government paperwork during a crisis.",
      },
      {
        title: "Floating Rope Stockpiles",
        technical:
          "Warehouse cheap, durable buoyancy-controlled nylon rope grids near coastlines. These can be towed out to sea instantly to grow kelp.",
        simple:
          "Storing miles of heavy rope in coastal warehouses so they can be thrown into the water immediately for seaweed to cling to and grow on.",
      },
      {
        title: "Sunlight-Free Nutrients",
        technical:
          "Utilize deep-ocean artificial upwelling pumps to bring nitrate-rich and phosphate-rich water to the surface. This feeds marine crops if atmospheric ash blocks out the sun.",
        simple:
          "Using underwater pumps to suck up natural fertilizers from the deep sea, feeding the seaweed even if a dark sky blocks out normal sunlight.",
      },
      {
        title: "Wild Seafood Rations",
        technical:
          "Pre-map local benthic and pelagic marine biomass. This allows rapid, organized harvesting without causing total ecosystem collapse.",
        simple:
          "Keeping a careful count of where wild fish and seaweed live so we can harvest them in an organized way without completely wiping them out.",
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
        technical:
          "Maintain a public, unpatented genomic registry of methanotrophic and hydrogenotrophic bacteria. These microbes can eat methane or hydrogen and turn it into protein.",
        simple:
          "Sharing a free internet blueprint of special bacteria that \"eat\" natural gas and turn it into a nutritious flour you can bake into food.",
      },
      {
        title: "Freeze-Dried Seed Banks",
        technical:
          "Distribute backup kits of cryopreserved, cold-tolerant, and low-light crop seeds. These go to regional agricultural hubs for immediate greenhouse planting.",
        simple:
          "Keeping super-frozen seeds that can survive freezing weather and dark skies, and giving them to local towns ahead of time.",
      },
      {
        title: "Universal Enzyme Recipes",
        technical:
          "Publish free, open-source biological blueprints for manufacturing cellulase catalysts. This is the exact enzyme needed to break down tough plant biomass.",
        simple:
          "Giving away the \"recipe\" for a chemical liquid that dissolves tough leaves and grass, turning them into soft, edible nutrients.",
      },
      {
        title: "Radiation-Proof Cultures",
        technical:
          "Engineer and store starter cultures of radioresistant Saccharomyces cerevisiae (yeast). These strains can survive high atmospheric radiation or pollution.",
        simple:
          "Breeding and storing special bread yeast that won't die even if a disaster leaves high radiation or heavy pollution in the air.",
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
        technical:
          "Build industrial tanks that utilize gas fermentation to feed hydrogen or methane to microbes. This creates high-protein biomass without any soil.",
        simple:
          "Growing edible powder inside sealed metal tanks by feeding them natural gases instead of planting seeds in dirt.",
      },
      {
        title: "Leaf Concentrate Presses",
        technical:
          "Deploy mechanical fractionation presses to squeeze nutrients out of inedible leaves. This isolates vitamins and proteins directly while removing toxic alkaloids.",
        simple:
          "Using heavy squishing machines to squeeze the protein out of grass and tree leaves while leaving behind the bitter, toxic parts.",
      },
      {
        title: "Petrochemical Calories",
        technical:
          "Refine chemical synthesis methods to convert industrial hydrocarbons into edible synthetic lipids and fatty acids. This provides a temporary survival energy source.",
        simple:
          "Using laboratory chemistry to turn fossil fuels (like oil) into safe, edible fats that humans can digest for energy in an absolute emergency.",
      },
      {
        title: "Mushroom Log Networks",
        technical:
          "Standardize the inoculation of lignocellulosic agricultural waste with saprophytic fungi. This uses indoor darkness to grow edible mushrooms rapidly.",
        simple:
          "Planting mushroom spores on old corn stalks or wood chips inside dark buildings to grow massive amounts of edible fungi very fast.",
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
        technical:
          "Code legal statutes that automatically mandate the cessation of livestock feed production. This diverts raw crop calories directly to human consumption pathways.",
        simple:
          "Making a law that says if food runs low, it is instantly illegal to feed corn to farm animals — it must all go to feeding hungry people instead.",
      },
      {
        title: "Peacetime Option Contracts",
        technical:
          "Execute derivative financial contracts with industrial biotechnology firms. In exchange for annual premiums, they must legally pivot production during a crisis.",
        simple:
          "Paying factories a small fee every year during peacetime so that they are legally required to start making survival food the moment the government gives the order.",
      },
      {
        title: "Anti-Hoarding Ration Software",
        technical:
          "Pre-install cryptographic rationing modules in commercial point-of-sale systems. This activates identity-linked food allocation limits instantly.",
        simple:
          "Coding a hidden feature into grocery store registers that automatically locks down and limits how much food one person can buy using their ID.",
      },
      {
        title: "Patent Waiver Triggers",
        technical:
          "Enact international treaties that automatically trigger compulsory licensing of food-processing IP. This allows local factories to copy survival tech without lawsuits.",
        simple:
          "A global agreement that pauses all patent laws during a disaster, letting any factory freely copy food recipes and machine designs to save lives.",
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
        technical:
          "Store pure, desiccated chemical substrates (like nitrogen and phosphorus powders) instead of bulky grains. These feed indoor farms and bioreactors for years.",
        simple:
          "Storing dry, concentrated plant and microbe food instead of heavy wheat, allowing us to grow fresh food indoors for a long time.",
      },
      {
        title: "Mineral and Vitamin Paks",
        technical:
          "Bulk-buy shelf-stable micronutrient compounds. These supplement nutrient-poor survival foods like wood-sugar or basic microbial starches.",
        simple:
          "Stockpiling giant boxes of pure vitamins to mix into survival foods so people don't get sick from vitamin deficiencies.",
      },
      {
        title: "Enzyme Stabilization Tanks",
        technical:
          "Maintain temperature-controlled vats of chemical catalysts. These speed up the chemical hydrolysis of raw biomass into food.",
        simple:
          "Keeping liquid chemicals in chilled tanks that act like \"super-spit,\" instantly dissolving tough plants into edible sugars.",
      },
      {
        title: "Water Purification Cubes",
        technical:
          "Stockpile compact, industrial-grade flocculants and chlorine disinfection blocks. This ensures clean water for food factories during grid failures.",
        simple:
          "Storing small, powerful powder blocks that make dirty river water instantly clean enough for food factories to use.",
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
        technical:
          "Distribute low-cost schematics for building automated LED hydroponic systems. This uses household items to grow food in the dark without soil.",
        simple:
          "Giving everyone a simple instruction booklet on how to grow salad greens in their basement using cheap water tubs and purple grow lights.",
      },
      {
        title: "Community Compost Loops",
        technical:
          "Design local urban neighborhoods to channel organic waste into vermiculture systems. This generates high-protein worms and organic fertilizer locally.",
        simple:
          "Setting up neighborhood bins where food scraps feed worm farms, creating both a backup protein source and rich soil for indoor plants.",
      },
      {
        title: "Appliance Retrofit Manuals",
        technical:
          "Create instructions to convert domestic refrigeration appliances into insulated mycological incubators. This utilizes home hardware for food production.",
        simple:
          "Printing guides that show people how to unplug an old fridge and turn it into a warm, dark box perfect for growing mushrooms.",
      },
      {
        title: "Micro-Grid Food Bubbles",
        technical:
          "Connect local indoor agricultural setups directly to decentralized photovoltaic arrays and battery banks. This keeps food growing independent of the main power grid.",
        simple:
          "Plugging neighborhood indoor farms directly into local solar panels so the food keeps growing even if the city's electricity goes completely dark.",
      },
    ],
  },
];