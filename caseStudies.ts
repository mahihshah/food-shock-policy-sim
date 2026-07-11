// caseStudies.ts
//
// Real-world precedents shown beside each policy choice.
//
// KEYED BY DESTINATION, NOT BY THE SCENARIO ON SCREEN: each key is a
// Choice.nextId. When QuestionCard renders scenario X's two choices, it
// looks up caseStudies[choice.nextId] for each choice and shows that case
// study next to that specific button — i.e. "here's what happened when a
// real government took roughly this path."
//
// Written to stay neutral: describes what a country did and the concrete
// numbers involved, without editorialising on whether it worked out well or
// badly, so it doesn't nudge the player toward either option. Pure data —
// same pattern as scenarios.ts. No React/HTML here.

export interface CaseStudy {
  flag: string;
  country: string;
  year: string;
  text: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  "1": {
    flag: "🇮🇳",
    country: "India",
    year: "2022–23",
    text: `Banned exports of broken rice, then non-basmati white rice, covering roughly 40% of globally traded rice. Importing nations scrambled to secure alternative suppliers within weeks.`,
  },
  "2": {
    flag: "🇿🇼",
    country: "Zimbabwe",
    year: "2007",
    text: `Ordered manufacturers and retailers to cut prices on all basic goods by 50% overnight, capping a standard loaf of bread far below its production cost.`,
  },
  "1.1": {
    flag: "🇪🇬",
    country: "Egypt",
    year: "n/a",
    text: `Banned rice exports to stockpile supply domestically. Traders moved thousands of tonnes across the Libyan and Sudanese desert borders, and through the ports of Alexandria and Port Said.`,
  },
  "1.1.1": {
    flag: "🇺🇸",
    country: "United States",
    year: "ongoing",
    text: `Spends over $200 billion in combined baseline and supplemental funding on border enforcement and immigration control — among the largest such budgets of any government.`,
  },
  "1.1.1.1": {
    flag: "🇺🇸",
    country: "United States",
    year: "1935–38",
    text: `A tax increase plus new Social Security payroll deductions cut the federal budget deficit from 5.4% of GDP to 0.1% in three years — one of the sharpest fiscal contractions in US history.`,
  },
  "1.1.1.2": {
    flag: "🇬🇧",
    country: "United Kingdom",
    year: "1931",
    text: `Cut public-sector wages and unemployment benefits to defend the gold standard, before abandoning the gold standard later that same year.`,
  },
  "1.1.2": {
    flag: "🇰🇿",
    country: "Kazakhstan",
    year: "2020",
    text: `Replaced a total export ban on wheat, flour and vegetables with fixed monthly quotas (200,000 tonnes wheat, 70,000 tonnes flour), later expanded to 250,000 and 150,000 tonnes as domestic stocks normalised.`,
  },
  "1.1.2.1": {
    flag: "🇮🇳",
    country: "India",
    year: "2023",
    text: `Carved a government-to-government quota out of its rice export ban, legalising a fixed 200,000-tonne allocation of non-basmati white rice to Malaysia.`,
  },
  "1.1.2.2": {
    flag: "🇮🇳",
    country: "India",
    year: "2022",
    text: `Signed an MOU with the UN World Food Programme, shipping 40,000 tonnes of wheat directly for humanitarian relief, later extended by a further 10,000-tonne tranche via Iran's Chabahar Port.`,
  },
  "1.2": {
    flag: "🇦🇷",
    country: "Argentina",
    year: "2021",
    text: `Lifted a 30-day beef export ban after strikes by ranchers and meat-packers, reopening lucrative export channels to China and the US.`,
  },
  "1.2.1": {
    flag: "🇱🇰",
    country: "Sri Lanka",
    year: "2021",
    text: `Declared a state of emergency over food shortages and issued subsidised vouchers for milk powder, sugar, wheat and rice through state-run Sathosa retail outlets.`,
  },
  "1.2.1.1": {
    flag: "🇱🇰",
    country: "Sri Lanka",
    year: "2021",
    text: `As food inflation passed 24%, introduced per-person purchasing limits on staples across all income groups to curb stockpiling.`,
  },
  "1.2.1.2": {
    flag: "🇻🇪",
    country: "Venezuela",
    year: "2018",
    text: `Stopped enforcing its Law of Fair Prices and legalised dollar-denominated transactions, letting retailers price basics like flour and milk at free-market rates.`,
  },
  "1.2.2": {
    flag: "🇭🇹",
    country: "Haiti",
    year: "1995",
    text: `Cut the import tariff on rice from 50% to 3% under structural adjustment, opening the domestic market to subsidised US rice known locally as "Miami Rice."`,
  },
  "1.2.2.1": {
    flag: "🇯🇵",
    country: "Japan",
    year: "ongoing",
    text: `Runs the "Marukin" scheme — a state-backed income-insurance program that pays farmers automatically when production costs exceed revenue, cushioning the removal of livestock import barriers under the CPTPP.`,
  },
  "1.2.2.2": {
    flag: "🇪🇬",
    country: "Egypt",
    year: "2022",
    text: `Raised its guaranteed wheat procurement price 40–50% to roughly 1,250 EGP per ardeb, securing over 4 million tonnes of domestic wheat for state bread-subsidy silos.`,
  },
  "2.1": {
    flag: "🇲🇽",
    country: "Mexico",
    year: "1980s",
    text: `Used the state agri-food agency CONASUPO as a monopoly buyer, purchasing corn from farmers at supported prices while holding the retail tortilla price at a fixed ceiling.`,
  },
  "2.1.1": {
    flag: "🇮🇩",
    country: "Indonesia",
    year: "1998",
    text: `Launched the Raskin ("Rice for Poor Families") program after the Asian Financial Crisis, concentrating its entire food subsidy budget on a single commodity: rice.`,
  },
  "2.1.1.1": {
    flag: "🇬🇹",
    country: "Guatemala",
    year: "1974",
    text: `Mandated fortifying all domestically sold sugar with 15mg of Vitamin A per kilogram. Within a year, severe deficiency among children fell from 68% to 33%, and clinical blindness from malnutrition was later eliminated nationwide.`,
  },
  "2.1.1.2": {
    flag: "🇵🇪",
    country: "Peru",
    year: "ongoing",
    text: `The Qali Warma school feeding program fortifies rice with iron, folic acid and B-vitamins, and enriches accompanying grain beverages with vitamins A, D, E, calcium, zinc and magnesium — reaching over 3 million schoolchildren by 2022.`,
  },
  "2.1.2": {
    flag: "🇲🇼",
    country: "Malawi",
    year: "2005",
    text: `Launched the Farm Input Subsidy Programme for roughly 1.5 million smallholders farming under 0.4 hectares, explicitly excluding large commercial estates, after drought collapsed the national maize harvest.`,
  },
  "2.1.2.1": {
    flag: "🇿🇼",
    country: "Zimbabwe",
    year: "2000",
    text: `The Fast-Track Land Reform Programme brought roughly 23 million acres of commercial farmland under state control, redistributing it to smallholders, state entities and political allies.`,
  },
  "2.1.2.2": {
    flag: "🇺🇦",
    country: "Ukraine",
    year: "1991",
    text: `After independence, let thousands of debt-laden Soviet-era collective farms go bankrupt rather than issue bailouts, choosing market liberalisation over state rescue.`,
  },
  "2.2": {
    flag: "🇨🇳",
    country: "China",
    year: "2019 & 2022",
    text: `Released frozen pork from state strategic reserves to ease supply crunches, at one point dumping over 107,000 tonnes into wholesale markets in a single month.`,
  },
  "2.2.1": {
    flag: "🇩🇪",
    country: "Germany",
    year: "1914",
    text: `Under wartime naval blockade, banned feeding bread-grade grains like rye and barley to the country's roughly 25 million pigs, redirecting the grain to human consumption.`,
  },
  "2.2.1.1": {
    flag: "🇪🇸",
    country: "Spain",
    year: "2022–23",
    text: `Eased EU pesticide and phytosanitary import rules to bring in emergency corn and feed from Argentina, Brazil and the US after heatwaves cut domestic wheat and barley yields by 20–30%.`,
  },
  "2.2.1.2": {
    flag: "🇩🇰",
    country: "Denmark",
    year: "2023",
    text: `Launched the world's first national Action Plan for Plant-Based Foods, backing it with a dedicated fund of 100 million kroner (~$14.5 million) a year for plant-based product and processing development.`,
  },
  "2.2.2": {
    flag: "🇮🇩",
    country: "Indonesia",
    year: "ongoing",
    text: `Runs a B35 biodiesel mandate blending 35% palm oil into diesel fuel, with a roadmap toward B40 already field-tested across logistics, rail and marine engines.`,
  },
  "2.2.2.1": {
    flag: "🇳🇬",
    country: "Nigeria",
    year: "2022",
    text: `Spent ₦4.39 trillion (~$9.6 billion) absorbing the gap between global and domestic petrol prices, funded largely through borrowing that pushed public debt to ₦87.38 trillion.`,
  },
  "2.2.2.2": {
    flag: "🇻🇪",
    country: "Venezuela",
    year: "decades",
    text: `Sold gasoline for under a US penny per gallon for decades, funding the subsidy after 2014's oil price collapse by having the central bank print currency directly for the state oil company.`,
  },
};