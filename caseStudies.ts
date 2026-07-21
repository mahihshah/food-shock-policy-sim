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
//
// SOURCES: each `source` field holds one or more full citations (with URL),
// separated by a blank line ("\n\n") where there's more than one. The
// QuestionCard tooltip renders this with `whitespace-pre-line` so each
// citation appears on its own line/paragraph — see the matching edit in
// QuestionCard.tsx.
//
// HIGHLIGHTS: ::phrase:: marks in `text` render as coloured underlines via
// renderHighlighted() in QuestionCard.tsx / resilienceCards.tsx. Reserved
// for the shocking stat or the core policy mechanism in each entry — not
// every number, just the one or two that make the case study land.

export interface CaseStudy {
  flag: string;
  country: string;
  year: string;
  text: string;
  /** Optional citation(s) shown in the (i) tooltip. Multiple citations are separated by "\n\n". Leave "" to hide the tooltip button. */
  source?: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  "1": {
    flag: "🇮🇳",
    country: "India",
    year: "2022–23",
    text: `Banned exports of broken rice, then non-basmati white rice, covering ::roughly 40% of globally traded rice::. Importing nations scrambled to secure alternative suppliers within weeks.`,
    source: `Glauber, Joseph, and Abdullah Mamun. "India's Export Restrictions on Rice Continue to Disrupt Global Markets, Supplies, and Prices | IFPRI." Accessed 12 July 2026. https://www.ifpri.org/blog/indias-export-restrictions-rice-continue-disrupt-global-markets-supplies-and-prices/.

Glauber, Joseph, and Abdullah Mamun. "India's New Ban on Rice Exports: Potential Threats to Global Supply, Prices, and Food Security | IFPRI." Accessed 12 July 2026. https://www.ifpri.org/blog/indias-new-ban-rice-exports-potential-threats-global-supply-prices-and-food-security/.

"Food Export Restrictions Hurt Millions in Least Developed Countries | UN Trade and Development (UNCTAD)." Accessed 10 July 2026. https://unctad.org/topic/least-developed-countries/chart-march-to-june-2022.`,
  },
  "2": {
    flag: "🇿🇼",
    country: "Zimbabwe",
    year: "2007",
    text: `Ordered manufacturers and retailers to ::cut prices on all basic goods by 50% overnight::, capping a standard loaf of bread far below its production cost.`,
    source: `NPR. "Government Price Controls Choke Zimbabwe." World. 14 August 2007. https://www.npr.org/2007/08/14/12776125/government-price-controls-choke-zimbabwe.`,
  },
  "1.1": {
    flag: "🇪🇬",
    country: "Egypt",
    year: "2008",
    text: `Banned rice exports to stockpile supply domestically. Traders moved ::thousands of tonnes:: across the Libyan and Sudanese desert borders, and through the ports of Alexandria and Port Said.`,
    source: `Dahan, Maha El, and Sherine El Madany. "Egypt's Rice Export Ban Only Benefits Smugglers." World. Reuters, 19 March 2012. https://www.reuters.com/article/world/egypts-rice-export-ban-only-benefits-smugglers-idUSBRE82I0HS/.

Soon, Jan Mei, and Louise Manning. "Food Smuggling and Trafficking: The Key Factors of Influence." Trends in Food Science & Technology 81 (November 2018): 132–38. https://doi.org/10.1016/j.tifs.2018.09.007.`,
  },
  "1.1.1": {
    flag: "🇺🇸",
    country: "United States",
    year: "ongoing",
    text: `Spends ::over $200 billion:: in combined baseline and supplemental funding on border enforcement and immigration control — among the largest such budgets of any government.`,
    source: `"Breakdown of ICE and Customs and Border Protection Funding." Accessed 10 July 2026. https://datawrapper.dwcdn.net/hIPfV/18/.

O'Herron, Margy. "ICE and Customs and Border Protection Budgets to Exceed $200 Billion | Brennan Center for Justice." 27 May 2026. https://www.brennancenter.org/our-work/research-reports/ice-and-customs-and-border-protection-budgets-exceed-200-billion.`,
  },
  "1.1.1.1": {
    flag: "🇺🇸",
    country: "United States",
    year: "1935–38",
    text: `A tax increase plus new Social Security payroll deductions ::cut the federal budget deficit from 5.4% of GDP to 0.1% in three years:: — one of the sharpest fiscal contractions in US history.`,
    source: `Edwards, Chris. "Tax Increases and the Great Depression." Cato Institute, 16 November 2022. https://www.cato.org/blog/tax-increases-great-depression.`,
  },
  "1.1.1.2": {
    flag: "🇬🇧",
    country: "United Kingdom",
    year: "1931",
    text: `Cut public-sector wages and unemployment benefits to defend the gold standard, ::before abandoning the gold standard later that same year::.`,
    source: `Miller, Fredric M. "The Unemployment Policy of the National Government, 1931-1936." The Historical Journal 19, no. 2 (1976): 453–76.`,
  },
  "1.1.2": {
    flag: "🇰🇿",
    country: "Kazakhstan",
    year: "2020",
    text: `Replaced a total export ban on wheat, flour and vegetables with fixed monthly quotas (::200,000 tonnes wheat, 70,000 tonnes flour::), later expanded to 250,000 and 150,000 tonnes as domestic stocks normalised.`,
    source: `"Kazakhstan and Ukraine Ease Trade Restrictions | Food Price Monitoring and Analysis (FPMA) | Food and Agriculture Organization of the United Nations." Accessed 12 July 2026. https://www.fao.org/giews/food-prices/food-policies/detail/en/c/1278155/.`,
  },
  "1.1.2.1": {
    flag: "🇮🇳",
    country: "India",
    year: "2023",
    text: `Carved a government-to-government quota out of its rice export ban, legalising a fixed ::200,000-tonne allocation:: of non-basmati white rice to Malaysia.`,
    source: `Nes, Kjersti, K. Aleks Schaefer, and Jisang Yu. "Economic Impacts of the Indian Ban on Non-Basmati Rice Exports." Food Policy 134 (July 2025): 102893. https://doi.org/10.1016/j.foodpol.2025.102893.`,
  },
  "1.1.2.2": {
    flag: "🇮🇳",
    country: "India",
    year: "2022",
    text: `Signed an MOU with the UN World Food Programme, shipping ::40,000 tonnes of wheat:: directly for humanitarian relief, later extended by a further 10,000-tonne tranche via Iran's Chabahar Port.`,
    source: `"India and WFP Sign Agreement for Fifth Tranche of Wheat Donation to the People of Afghanistan | World Food Programme." Accessed 12 July 2026. https://www.wfp.org/news/india-and-wfp-sign-agreement-fifth-tranche-wheat-donation-people-afghanistan.`,
  },
  "1.2": {
    flag: "🇦🇷",
    country: "Argentina",
    year: "2021",
    text: `Lifted a ::30-day beef export ban:: after strikes by ranchers and meat-packers, reopening lucrative export channels to China and the US.`,
    source: `Misculin, Nicolás. "Argentine Farm Tensions Build over Government Beef Export Ban." Americas. Reuters, 18 May 2021. https://www.reuters.com/world/americas/argentine-farmers-halt-livestock-trade-protest-beef-export-ban-2021-05-18/.`,
  },
  "1.2.1": {
    flag: "🇱🇰",
    country: "Sri Lanka",
    year: "2021",
    text: `::Declared a state of emergency:: over food shortages and issued subsidised vouchers for milk powder, sugar, wheat and rice through state-run Sathosa retail outlets.`,
    source: `"Explained | What Is the 'Food Emergency' in Sri Lanka? - The Hindu." Accessed 12 July 2026. https://www.thehindu.com/news/international/what-is-the-food-emergency-in-sri-lanka/article36327786.ece.`,
  },
  "1.2.1.1": {
    flag: "🇱🇰",
    country: "Sri Lanka",
    year: "2021",
    text: `As food inflation passed ::24%::, introduced per-person purchasing limits on staples across all income groups to curb stockpiling.`,
    source: `Reuters. "Sri Lanka Targets Hoarders, Bad Traders to Tackle Food Shortages." Asia Pacific. 3 September 2021. https://www.reuters.com/world/asia-pacific/sri-lanka-targets-hoarders-bad-traders-tackle-food-shortages-2021-09-03/.`,
  },
  "1.2.1.2": {
    flag: "🇻🇪",
    country: "Venezuela",
    year: "2018",
    text: `Stopped enforcing its Law of Fair Prices and ::legalised dollar-denominated transactions::, letting retailers price basics like flour and milk at free-market rates.`,
    source: `Ellsworth, Brian. "Venezuela Decrees New Price Controls to Fight Inflation | Reuters." Accessed 12 July 2026. https://www.reuters.com/article/world/venezuela-decrees-new-price-controls-to-fight-inflation-idUSBREA0N1GR/.

Oliveros, Asdrúbal. "Dollarization Can't Save the Venezuelan Economy." Accessed 12 July 2026. https://www.americasquarterly.org/article/dollarization-cant-save-the-venezuelan-economy/.`,
  },
  "1.2.2": {
    flag: "🇭🇹",
    country: "Haiti",
    year: "1995",
    text: `Cut the import tariff on rice ::from 50% to 3%:: under structural adjustment, opening the domestic market to subsidised US rice known locally as "Miami Rice."`,
    source: `Cochrane, Nancy, Nathan Childs, and Stacy Rosen. "Rice Imports Help Alleviate Haiti's Food Needs | Economic Research Service." Accessed 12 July 2026. https://www.ers.usda.gov/amber-waves/2016/january-february/rice-imports-help-alleviate-haiti-s-food-needs.`,
  },
  "1.2.2.1": {
    flag: "🇯🇵",
    country: "Japan",
    year: "ongoing",
    text: `Runs the "Marukin" scheme — a state-backed income-insurance program that ::pays farmers automatically when production costs exceed revenue::, cushioning the removal of livestock import barriers under the CPTPP.`,
    source: `"Japan: Agricultural Policy Monitoring and Evaluation 2025 | OECD." Accessed 12 July 2026. https://www.oecd.org/en/publications/2025/10/agricultural-policy-monitoring-and-evaluation-2025_354e7040/full-report/japan_d94ab3f7.html.`,
  },
  "1.2.2.2": {
    flag: "🇪🇬",
    country: "Egypt",
    year: "2022",
    text: `::Raised its guaranteed wheat procurement price 40–50%:: to roughly 1,250 EGP per ardeb, securing over 4 million tonnes of domestic wheat for state bread-subsidy silos.`,
    source: `"Egypt Raises Local Wheat Procurement Price More than 40% amid Inflation | Reuters." Accessed 12 July 2026. https://www.reuters.com/world/middle-east/egypt-raises-local-wheat-procurement-price-44-amid-inflation-2023-01-18/.`,
  },
  "2.1": {
    flag: "🇲🇽",
    country: "Mexico",
    year: "1980s",
    text: `Used the state agri-food agency CONASUPO as a ::monopoly buyer::, purchasing corn from farmers at supported prices while holding the retail tortilla price at a fixed ceiling.`,
    source: `Yunez–Naude, Antonio. "The Dismantling of CONASUPO, a Mexican State Trader in Agriculture - Yunez–Naude - 2003 - The World Economy - Wiley Online Library." Accessed 12 July 2026. https://onlinelibrary.wiley.com/doi/abs/10.1111/1467-9701.00512.`,
  },
  "2.1.1": {
    flag: "🇮🇩",
    country: "Indonesia",
    year: "1998",
    text: `Launched the Raskin ("Rice for Poor Families") program after the Asian Financial Crisis, ::concentrating its entire food subsidy budget on a single commodity: rice::.`,
    source: `Gupta, Prachi. In-Kind Transfer and Child Development: Evidence from Subsidized Rice Program in Indonesia. no. 826 (March 2018). https://www.adb.org/publications/kind-transfer-and-child-development-evidence-indonesia.

The Abdul Latif Jameel Poverty Action Lab (J-PAL). "Improving the Transparency and Delivery of a Subsidized Rice Program in Indonesia | The Abdul Latif Jameel Poverty Action Lab." Accessed 12 July 2026. https://www.povertyactionlab.org/evaluation/improving-transparency-and-delivery-subsidized-rice-program-indonesia.`,
  },
  "2.1.1.1": {
    flag: "🇬🇹",
    country: "Guatemala",
    year: "1974",
    text: `Mandated fortifying all domestically sold sugar with 15mg of Vitamin A per kilogram. Within a year, ::severe deficiency among children fell from 68% to 33%::, and clinical blindness from malnutrition was later eliminated nationwide.`,
    source: `Pineda, Oscar. "Fortification of Sugar with Vitamin A." Food and Nutrition Bulletin 19, no. 2 (1998): 131–36. https://doi.org/10.1177/156482659801900207.`,
  },
  "2.1.1.2": {
    flag: "🇵🇪",
    country: "Peru",
    year: "ongoing",
    text: `The Qali Warma school feeding program fortifies rice with iron, folic acid and B-vitamins, and enriches accompanying grain beverages with vitamins A, D, E, calcium, zinc and magnesium — ::reaching over 3 million schoolchildren:: by 2022.`,
    source: `"Lessons from Peru: Strengthening Linkages between Social Protection and Food Systems to Enhance Nutrition | World Food Programme." Accessed 12 July 2026. https://www.wfp.org/publications/lessons-peru-strengthening-linkages-between-social-protection-and-food-systems-enhance.`,
  },
  "2.1.2": {
    flag: "🇲🇼",
    country: "Malawi",
    year: "2005",
    text: `Launched the Farm Input Subsidy Programme for roughly ::1.5 million smallholders:: farming under 0.4 hectares, explicitly excluding large commercial estates, after drought collapsed the national maize harvest.`,
    source: `Pauw, Karl, and James Thurlow. Malawi's Farm Input Subsidy Program: Where Do We Go From Here?

World Bank. "How Malawi's Reform Is Just the Beginning for Smallholder Farmers." Text/HTML. https://doi.org/10/21/how-malawi-s-reform-is-just-the-beginning-for-smallholder-farmers.`,
  },
  "2.1.2.1": {
    flag: "🇿🇼",
    country: "Zimbabwe",
    year: "2000",
    text: `The Fast-Track Land Reform Programme brought roughly ::23 million acres:: of commercial farmland under state control, redistributing it to smallholders, state entities and political allies.`,
    source: `"Fast Track Land Reform in Zimbabwe." Centre for Public Impact, 30 August 2017. https://centreforpublicimpact.org/public-impact-fundamentals/fast-track-land-reform-in-zimbabwe/.

Makamure, Goldmarks, and Innocent Simphiwe Nojiyeza. "Socio-Economic Outcomes of the Zimbabwe Fast-Track Land Reform Program in Terms of Productive Efficiency." SSRN Scholarly Paper No. 4672564. Social Science Research Network, 18 July 2023. https://papers.ssrn.com/abstract=4672564.

Scoones, Ian. "Zimbabwe's Land Reform After 25 Years." Institute of Development Studies, n.d. Accessed 12 July 2026. https://www.ids.ac.uk/projects/zimbabwes-land-reform-after-25-years/.`,
  },
  "2.1.2.2": {
    flag: "🇺🇦",
    country: "Ukraine",
    year: "1991",
    text: `After independence, ::let thousands of debt-laden Soviet-era collective farms go bankrupt:: rather than issue bailouts, choosing market liberalisation over state rescue.`,
    source: `Sedik, David. Rural Finance without Markets in Ukraine, 1991-2000.`,
  },
  "2.2": {
    flag: "🇨🇳",
    country: "China",
    year: "2019 & 2022",
    text: `Released frozen pork from state strategic reserves to ease supply crunches, at one point ::dumping over 107,000 tonnes into wholesale markets in a single month::.`,
    source: `Reuters. "China to Release Sixth Batch of Frozen Pork from Reserves." China. 19 October 2022. https://www.reuters.com/world/china/china-release-sixth-batch-frozen-pork-reserves-2022-10-19/.

South China Morning Post. "China to Boost Frozen Pork Reserves as Hog Prices Tumble to Multi-Year Troughs." 3 April 2026. https://www.scmp.com/economy/china-economy/article/3348920/china-boost-frozen-pork-reserves-hog-prices-tumble-multi-year-troughs.`,
  },
  "2.2.1": {
    flag: "🇩🇪",
    country: "Germany",
    year: "1914",
    text: `Under wartime naval blockade, banned feeding bread-grade grains like rye and barley to the country's ::roughly 25 million pigs::, redirecting the grain to human consumption.`,
    source: `Ashley, W. J. "Germany's Resources Under the Blockade." The Atlantic, 1 June 1915. https://www.theatlantic.com/magazine/archive/1915/06/germanys-resources-under-the-blockade/645514/.

Cox, Mary Elisabeth. "Hunger Games: Or How the Allied Blockade in the First World War Deprived German Children of Nutrition, and Allied Food Aid Subsequently Saved Them." The Economic History Review 68, no. 2 (2015): 600–631. https://doi.org/10.1111/ehr.12070.`,
  },
  "2.2.1.1": {
    flag: "🇪🇸",
    country: "Spain",
    year: "2022–23",
    text: `Eased EU pesticide and phytosanitary import rules to bring in emergency corn and feed from Argentina, Brazil and the US after heatwaves ::cut domestic wheat and barley yields by 20–30%::.`,
    source: `Reuters. "Spain Set to Approve Emergency U.S., Argentina Corn Buying." Business. 14 March 2022. https://www.reuters.com/business/spain-set-approve-emergency-us-argentina-corn-buying-2022-03-14/.`,
  },
  "2.2.1.2": {
    flag: "🇩🇰",
    country: "Denmark",
    year: "2023",
    text: `Launched the world's first national Action Plan for Plant-Based Foods, backing it with a dedicated fund of ::100 million kroner (~$14.5 million) a year:: for plant-based product and processing development.`,
    source: `"Action Plan on Plant-Based Foods." Accessed 12 July 2026. https://en.fvm.dk/news-and-contact/focus-on/action-plan-on-plant-based-foods.

Ritchie, Hannah. "If the World Adopted a Plant-Based Diet, We Would Reduce Global Agricultural Land Use from 4 to 1 Billion Hectares." Our World in Data, 4 March 2021. https://ourworldindata.org/land-use-diets.`,
  },
  "2.2.2": {
    flag: "🇮🇩",
    country: "Indonesia",
    year: "ongoing",
    text: `Runs a B35 biodiesel mandate ::blending 35% palm oil into diesel fuel::, with a roadmap toward B40 already field-tested across logistics, rail and marine engines.`,
    source: `Halimatussadiah, A., D. Nainggolan, S. Yui, F. R. Moeis, and A. A. Siregar. "Progressive Biodiesel Policy in Indonesia: Does the Government's Economic Proposition Hold?" Renewable and Sustainable Energy Reviews 150 (October 2021): 111431. https://doi.org/10.1016/j.rser.2021.111431.`,
  },
  "2.2.2.1": {
    flag: "🇳🇬",
    country: "Nigeria",
    year: "2022",
    text: `Spent ::₦4.39 trillion (~$9.6 billion):: absorbing the gap between global and domestic petrol prices, funded largely through borrowing that pushed public debt to ₦87.38 trillion.`,
    source: `Eboh, Camillus. "Nigeria's NNPC Spent $10 Billion on Fuel Subsidy in 2022." Energy. Reuters, 20 January 2023. https://www.reuters.com/business/energy/nigerias-nnpc-spent-10-billion-fuel-subsidy-2022-2023-01-20/.`,
  },
  "2.2.2.2": {
    flag: "🇻🇪",
    country: "Venezuela",
    year: "decades",
    text: `::Sold gasoline for under a US penny per gallon for decades::, funding the subsidy after 2014's oil price collapse by having the central bank print currency directly for the state oil company.`,
    source: `Helman, Christopher. "Cheap Gasoline: Why Venezuela Is Doomed To Collapse." Forbes. Accessed 12 July 2026. https://www.forbes.com/sites/christopherhelman/2014/02/20/cheap-gasoline-why-venezuela-is-doomed-to-collapse/.`,
  },
};