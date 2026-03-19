import { useState } from "react";

const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Intro to Economics",
    badge: "Micro & Macro",
    color: "#1565C0",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Micro vs Macroeconomics — Differences & Goals",
        content: [
          { type: "definition", text: "Economics: The social science that studies how individuals, firms, and governments make decisions to allocate scarce resources to satisfy unlimited wants. Applied Economics applies economic theories to real-world decision making." },
          { type: "table", headers: ["Feature", "Microeconomics", "Macroeconomics"],
            rows: [
              ["Meaning", "Study of individual economic units (consumers, firms, markets)", "Study of the economy as a whole (nation-wide)"],
              ["Focus", "Individual prices, consumer behavior, firm production", "National income, inflation, unemployment, GDP"],
              ["Deals with", "Price determination, demand, supply, market structures", "Aggregate demand, aggregate supply, monetary policy"],
              ["Examples", "Price of rice, demand for laptops, firm's profit", "Nepal's GDP, inflation rate, interest rate"],
              ["Tools", "Demand-supply analysis, utility theory, elasticity", "National income accounting, IS-LM model"],
            ]
          },
          { type: "heading", text: "Goals & Instruments of Macroeconomics" },
          { type: "table", headers: ["Goal", "Description"],
            rows: [
              ["Full Employment", "Ensure all willing workers find jobs; reduce unemployment"],
              ["Price Stability", "Control inflation; keep general price level stable"],
              ["Economic Growth", "Increase GDP and living standards over time"],
              ["Balance of Payments", "Maintain equilibrium in international trade accounts"],
              ["Equitable Distribution", "Reduce inequality in income and wealth"],
            ]
          },
          { type: "tip", label: "MCQ TIP", text: "In Microeconomics we study: individual prices, consumer behavior, firm profits. In Macroeconomics we study: national income, inflation, unemployment, economic growth. Controlling inflation is a goal of MACROECONOMIC policy — asked in 2023 MCQ!" },
        ]
      },
    ]
  },
  {
    id: "u2",
    title: "Unit 2 — Elasticity of Demand & Supply",
    badge: "Chapter 2",
    color: "#2E7D32",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Price Elasticity of Demand — Types, Formulas & Diagrams",
        content: [
          { type: "definition", text: "Price Elasticity of Demand (Ep): The measure of responsiveness of quantity demanded to a change in price. It is the ratio of % change in quantity demanded to % change in price." },
          { type: "diagram", text: `
Formula:
       % change in Qty Demanded      ΔQ/Q × 100      ΔQ    P
Ep = ─────────────────────────── = ───────────── = ─── × ───
         % change in Price           ΔP/P × 100      ΔP    Q

Where: Q = Initial quantity, ΔQ = Change in qty, P = Initial price, ΔP = Change in price

TYPES OF PRICE ELASTICITY:

1. Perfectly Elastic (Ep = ∞)       2. Perfectly Inelastic (Ep = 0)
   Price                               Price
     │                                   │D
   P ├──────────────── D                P1 ├──
     │                                   │
   0 └────────────────                   │
             Quantity                P2 ├──
   Horizontal line: any qty           │
   at same price                      └────────────────
                                            Qty (constant)
   → Hypothetical; luxury version         → Salt, medicine

3. Unitary Elastic (Ep = 1)          4. Relatively Elastic (Ep > 1)
   Price (%)change = Qty (%)change      Small price change → large qty change
   Rectangular hyperbola curve          Flatter demand curve
   → Ex: Some manufactured goods        → Luxury goods: TV, fridge

5. Relatively Inelastic (Ep < 1)
   Large price change → small qty change
   Steeper demand curve
   → Necessities: rice, vegetables, medicine` },
          { type: "table", headers: ["Type", "Ep value", "Goods examples", "Demand curve"],
            rows: [
              ["Perfectly Elastic", "Ep = ∞", "Hypothetical only", "Horizontal line"],
              ["Perfectly Inelastic", "Ep = 0", "Salt, medicine, necessities", "Vertical line"],
              ["Unitary Elastic", "Ep = 1", "Some manufactured goods", "Rectangular hyperbola"],
              ["Relatively Elastic", "Ep > 1", "Luxury goods (TV, fridge)", "Flatter/gentle slope"],
              ["Relatively Inelastic", "Ep < 1", "Rice, vegetables, basic food", "Steeper slope"],
            ]
          },
          { type: "heading", text: "Measurement Methods" },
          { type: "table", headers: ["Method", "Formula", "When used"],
            rows: [
              ["Percentage Method", "Ep = %ΔQ / %ΔP", "When % changes are given directly"],
              ["Proportionate Method", "Ep = (ΔQ/Q) / (ΔP/P) = (ΔQ/ΔP) × (P/Q)", "Most common formula — used in most numerical"],
              ["Point Method", "Ep = (ΔQ/ΔP) × (P/Q) at a single point on the curve", "To measure at a specific point on demand curve"],
              ["Arc Method", "Ep = (ΔQ/ΔP) × (P1+P2)/(Q1+Q2)", "When there is large change in price (midpoint formula)"],
              ["Total Outlay Method", "Compare TR before and after price change", "To determine whether Ep > 1, = 1, or < 1"],
            ]
          },
          { type: "heading", text: "Total Outlay (Total Expenditure) Method" },
          { type: "table", headers: ["When Price Falls", "What happens to TR", "Elasticity"],
            rows: [
              ["TR increases", "More qty sold offsets the price fall", "Elastic (Ep > 1)"],
              ["TR unchanged", "Effect exactly cancels out", "Unitary elastic (Ep = 1)"],
              ["TR decreases", "Qty increase not enough to compensate", "Inelastic (Ep < 1)"],
            ]
          },
          { type: "heading", text: "Numerical Example" },
          { type: "diagram", text: `
EXAMPLE: Price falls from Rs.10 to Rs.8. Quantity rises from 100 to 130 units.
Find price elasticity of demand.

Given: P = 10, P2 = 8, ΔP = -2
       Q = 100, Q2 = 130, ΔQ = +30

Ep = (ΔQ/ΔP) × (P/Q)
   = (30 / -2) × (10 / 100)
   = (-15) × (0.1)
   = -1.5

Since |Ep| = 1.5 > 1 → Demand is Relatively Elastic

Note: Ep is always negative for normal goods (inverse price-qty relationship)
But we take absolute value |Ep| for comparison.` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Income & Cross Elasticity of Demand",
        content: [
          { type: "heading", text: "Income Elasticity of Demand (Ey)" },
          { type: "definition", text: "Income Elasticity: Measures the responsiveness of quantity demanded to a change in consumer's income, other things remaining the same." },
          { type: "diagram", text: `
         % change in Qty Demanded      ΔQ    M
Ey = ──────────────────────────── = ─── × ───
          % change in Income           ΔM    Q

TYPES of Income Elasticity:
┌─────────────────────────────────────────────────────┐
│ Ey > 0 → Normal goods: demand rises with income     │
│           Luxury goods: Ey > 1 (e.g., car, jewelry) │
│           Necessities: 0 < Ey < 1 (e.g., food)      │
│ Ey < 0 → Inferior goods: demand FALLS as income rises│
│           (e.g., cheap rice, second-hand goods)      │
│ Ey = 0 → Neutral goods: demand unchanged by income   │
└─────────────────────────────────────────────────────┘` },
          { type: "heading", text: "Cross Elasticity of Demand (Exy)" },
          { type: "definition", text: "Cross Elasticity: Measures responsiveness of quantity demanded of commodity X to a change in price of commodity Y." },
          { type: "diagram", text: `
          % change in Qty of X      ΔQx    Py
Exy = ────────────────────── = ──── × ────
         % change in Price of Y     ΔPy    Qx

TYPES of Cross Elasticity:
┌──────────────────────────────────────────────────────────┐
│ Exy > 0 → Substitute goods (Coke & Pepsi, Tea & Coffee) │
│           Price of Y↑ → demand of X↑                    │
│ Exy < 0 → Complementary goods (Bike & Petrol, Pen & Ink)│
│           Price of Y↑ → demand of X↓                    │
│ Exy = 0 → Unrelated goods (price of bike & demand of rice)│
└──────────────────────────────────────────────────────────┘` },
          { type: "tip", label: "EXAM TIP", text: "Cross elasticity POSITIVE = Substitutes. Cross elasticity NEGATIVE = Complements. Income elasticity NEGATIVE = Inferior goods. Income elasticity POSITIVE = Normal goods. Asked in MCQs every year!" },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Elasticity of Supply — Types & Measurement",
        content: [
          { type: "definition", text: "Price Elasticity of Supply (Es): The measure of responsiveness of quantity supplied to a change in price of a commodity." },
          { type: "diagram", text: `
       % change in Qty Supplied      ΔQs    P
Es = ─────────────────────────── = ──── × ───
          % change in Price           ΔP    Qs

Types: Perfectly Elastic (Es=∞), Perfectly Inelastic (Es=0),
       Unitary (Es=1), Relatively Elastic (Es>1), Inelastic (Es<1)

Supply curve shapes:
  Perfectly Elastic → Horizontal line  (Es = ∞)
  Perfectly Inelastic → Vertical line  (Es = 0)
  Es = 1 → Line through origin
  Es > 1 → Flatter line (meets X-axis)
  Es < 1 → Steeper line (meets Y-axis)` },
        ]
      },
    ]
  },
  {
    id: "u3",
    title: "Unit 3 — Consumer Behaviour",
    badge: "Indifference Curve",
    color: "#6A1B9A",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Cardinal Utility Analysis — Law of DMU & Consumer Equilibrium (Asked 2023!)",
        content: [
          { type: "definition", text: "Cardinal Utility: Utility can be measured numerically (in units called 'utils'). Developed by Alfred Marshall. Assumes utility is quantifiable." },
          { type: "definition", text: "Law of Diminishing Marginal Utility: As a consumer consumes more and more units of a commodity, the marginal utility derived from each successive unit goes on diminishing, other things remaining the same." },
          { type: "diagram", text: `
MU SCHEDULE (Law of DMU):
Units consumed  │ 1  │ 2  │ 3  │ 4  │ 5  │ 6
Total Utility   │ 10 │ 18 │ 24 │ 28 │ 30 │ 30
Marginal Utility│ 10 │  8 │  6 │  4 │  2 │  0

Key relationships:
• When MU > 0 → TU is increasing
• When MU = 0 → TU is at MAXIMUM (saturation point)
• When MU < 0 → TU is decreasing

TU
 │        *  *
 │     *        *
 │   *              *
 │ *                  
 └──────────────────── Units
   
MU
 │ *
 │   *
 │     *
 │       *
 │─────────*────────── Units (MU=0 when TU max)
 │           *  (MU negative)` },
          { type: "heading", text: "Consumer Equilibrium (One Commodity) — Cardinal Approach" },
          { type: "definition", text: "Consumer equilibrium condition (1 commodity): MUx / Px = MUm (Marginal Utility of Money). The consumer maximizes satisfaction when MU per rupee spent equals the marginal utility of money." },
          { type: "heading", text: "Consumer Equilibrium (Two Commodities) — Asked 2023!" },
          { type: "definition", text: "Equilibrium condition: MUx/Px = MUy/Py = MUm. A consumer is in equilibrium when the ratio of MU to price is equal for all goods consumed." },
          { type: "diagram", text: `
2023 EXAM QUESTION TYPE: Given TU schedule, find MU and find equilibrium.

EXAMPLE: M = Rs.5, Px = Py = Rs.1
Units │ TUx │ MUx │ MUx/Px │ TUy │ MUy │ MUy/Py
  1   │  10 │  10 │   10   │  12 │  12 │   12
  2   │  18 │   8 │    8   │  22 │  10 │   10
  3   │  24 │   6 │    6   │  30 │   8 │    8
  4   │  28 │   4 │    4   │  36 │   6 │    6
  5   │  30 │   2 │    2   │  40 │   4 │    4

STEP: With M=5 and Px=Py=1, allocate Rs. 5 to maximize utility.
Equilibrium where MUx/Px = MUy/Py

→ Buy 1X (MU=10) or 1Y (MU=12)?  → Buy 1Y (higher MU)
→ Now buy 1X (MU=10) or 2Y (MU=10)? → Either (both =10), buy 1X
→ Buy 2X (MU=8) or 2Y (MU=10)? → Buy 2Y
... continue until budget (Rs.5) exhausted

EQUILIBRIUM: 2 units of X and 3 units of Y
MUx/Px = 8/1 = 8, MUy/Py = 8/1 = 8 → EQUAL → Equilibrium!
Total Utility = TUx(2) + TUy(3) = 18 + 30 = 48 utils` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Ordinal Utility — Indifference Curves, Budget Line & Consumer Equilibrium",
        content: [
          { type: "definition", text: "Ordinal Utility Analysis: Developed by J.R. Hicks and R.G.D. Allen. Utility cannot be measured numerically but can be ranked (1st, 2nd, 3rd preference). Uses Indifference Curve technique." },
          { type: "definition", text: "Indifference Curve (IC): A curve showing all combinations of two goods that give the consumer equal (same) level of satisfaction. Also called 'iso-utility curve' or 'equal utility curve'." },
          { type: "heading", text: "Properties of Indifference Curves (Important for Exam!)" },
          { type: "table", headers: ["Property", "Explanation"],
            rows: [
              ["1. Downward sloping", "More X means less Y to maintain same satisfaction (MRS is positive)"],
              ["2. Convex to origin", "Due to diminishing Marginal Rate of Substitution (MRS decreases)"],
              ["3. Higher IC = higher satisfaction", "IC₃ > IC₂ > IC₁ (more goods on higher IC)"],
              ["4. Never intersect", "Intersection would imply contradiction — same bundle gives 2 different utility levels"],
              ["5. Need not be parallel", "Rate of MRS is not same for all IC schedules"],
              ["6. Never touch axes", "IC model is 2-commodity model — touching axis means only 1 commodity"],
            ]
          },
          { type: "diagram", text: `
INDIFFERENCE MAP:

Y-axis (Good Y)
    │
 14 ●A
    │  ╲
 10 │   ●B          IC₃ (highest satisfaction)
    │    ╲      ↗
  7 │     ●C  /
    │      ╲/  IC₂
  5 │      ●D    ╲  IC₁ (lowest)
    │       ╲     ╲
    └──────────────────── X-axis (Good X)
       1    2  3  4  5

• Points A, B, C, D, E lie on same IC → same satisfaction
• IC₃ gives more satisfaction than IC₂ because it contains
  more of at least one good without reducing the other
• MRS (slope) = ΔY/ΔX — diminishes as we move right
• A→B: give up 4Y to get 1X
• B→C: give up 3Y to get 1X  → MRS diminishing
• C→D: give up 2Y to get 1X

BUDGET LINE (Price Line):
  M = Px·Qx + Py·Qy
  Line AB shows all affordable combinations with given income M

  Y ●A (= M/Py)
    │╲
    │  ╲  Budget Line
    │    ╲
    └─────●B  (= M/Px)
               X` },
          { type: "heading", text: "Consumer Equilibrium Using IC and Budget Line" },
          { type: "definition", text: "Consumer equilibrium occurs at the point where the budget line is TANGENT to the highest possible indifference curve. At this point: MRSxy = Px/Py (slope of IC = slope of budget line)" },
          { type: "diagram", text: `
CONSUMER EQUILIBRIUM:

Y
│A
│ ╲    IC₃ ← desirable but NOT attainable
│  ╲  IC₂ (tangent point E)
│   ●E ←← EQUILIBRIUM (MRS = Px/Py)
│  ╱  ╲
│ ╱    IC₁ ← attainable but NOT optimal
│╱
└──────────B──────── X

At E: Slope of IC₂ = Slope of Budget Line AB
   MRSxy = Px/Py ← Necessary condition
   IC₂ is convex to origin ← Sufficient condition

Consumer gets maximum satisfaction:
   OM units of X and ON units of Y

F and G (other points on AB) lie on lower IC₁ → less satisfaction` },
          { type: "heading", text: "Price Effect, Income Effect & Substitution Effect" },
          { type: "table", headers: ["Effect", "Cause", "Price Consumption Curve (PCC)", "Income Consumption Curve (ICC)"],
            rows: [
              ["Price Effect", "Change in price of one good (other things constant)", "Normal goods: PCC slopes downward; Giffen: PCC backward bending", "—"],
              ["Income Effect", "Change in consumer's income (prices constant)", "—", "Normal goods: ICC slopes upward; Inferior: ICC backward/downward"],
              ["Substitution Effect", "Change in relative prices (real income constant)", "Always negative (inverse relationship)", "—"],
            ]
          },
          { type: "tip", label: "KEY FORMULA", text: "Price Effect = Substitution Effect + Income Effect. This is the Hicks decomposition. The substitution effect keeps the consumer on the SAME IC, while the income effect is the remaining movement to the new IC." },
        ]
      },
    ]
  },
  {
    id: "u4",
    title: "Unit 4 — Cost & Revenue",
    badge: "Chapter 4",
    color: "#B71C1C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Types of Cost — Definitions & Short Run Cost Curves",
        content: [
          { type: "table", headers: ["Cost Type", "Definition", "Example"],
            rows: [
              ["Actual Cost", "Actual money paid to acquire an asset initially", "Purchase price of machinery"],
              ["Opportunity Cost", "Value of the next best alternative foregone", "Farmer grows wheat → foregoes growing rice"],
              ["Implicit Cost", "Cost of owner-supplied inputs (estimated, not recorded in books)", "Rent on own land used for business"],
              ["Explicit Cost", "Actual payments made to outside factors (recorded in books)", "Wages, rent, interest paid to outsiders"],
              ["Accounting Cost", "All recorded money payments = Explicit costs", "= Explicit cost"],
              ["Economic Cost", "Total of explicit + implicit costs", "Economic cost = Explicit + Implicit"],
            ]
          },
          { type: "heading", text: "Short Run Total Cost Curves" },
          { type: "definition", text: "Total Fixed Cost (TFC): Cost that does NOT change with output. Also called supplementary cost / overhead cost. TFC ≠ f(Q). If Q=0, TFC > 0. Example: Rent, salaries of permanent staff, depreciation." },
          { type: "definition", text: "Total Variable Cost (TVC): Cost that CHANGES with output. Also called prime cost / direct cost. TVC = f(Q). If Q=0, TVC = 0. Example: Raw materials, direct labor, fuel." },
          { type: "definition", text: "Total Cost (TC) = TFC + TVC. At Q=0, TC = TFC." },
          { type: "diagram", text: `
SHORT RUN COST CURVES:

Cost(Rs)
  │       TC (inverse-S shape)
  │      /
  │     /      TVC (starts from origin, inverse-S)
  │    /  ↗
  │   / /
  │  //
  │ /
  ●─────────────────────── Output (Q)
  │
TFC│═══════════════════════ TFC (horizontal line — constant)
  │
  └──────────────────────────

KEY OBSERVATIONS:
• TFC = horizontal (constant at all output levels)
• TVC starts from origin (if Q=0, TVC=0)
• TVC is inverse-S shape due to law of variable proportions
• TC starts from TFC level (when Q=0, TC=TFC)
• Vertical gap between TC and TVC is constant = TFC

Average Costs:
  AFC = TFC/Q → continuously falling (rectangular hyperbola)
  AVC = TVC/Q → U-shaped
  AC  = AFC + AVC → U-shaped (minimum point is to the RIGHT of AVC minimum)

Marginal Cost:
  MC = ΔTC/ΔQ = ΔTC for 1 extra unit
  MC is also U-shaped
  MC passes through MINIMUM points of both AVC and AC` },
          { type: "heading", text: "AC and MC Relationship" },
          { type: "table", headers: ["Condition", "Relationship", "Implication"],
            rows: [
              ["AC falling", "MC < AC", "MC drags AC down"],
              ["AC at minimum", "MC = AC", "MC intersects AC at its minimum point"],
              ["AC rising", "MC > AC", "MC pushes AC up"],
            ]
          },
          { type: "heading", text: "Long Run Average Cost (LAC) — Envelope Curve" },
          { type: "definition", text: "LAC: Also called 'planning curve'. In the long run, all factors are variable. LAC is derived by connecting the lowest points of successive short-run AC curves (SAC₁, SAC₂, SAC₃...). LAC is U-shaped or L-shaped due to economies and diseconomies of scale." },
          { type: "diagram", text: `
LONG RUN AVERAGE COST (ENVELOPE CURVE):

Cost
  │     SAC₁  SAC₂   SAC₃   SAC₄  SAC₅
  │       U     U      U      U     U
  │        ╲   / ╲   / ╲   / ╲   /
  │         ╲ /   ╲ /   ╲ /   ╲ /
  │          ╲     ╲     ╲     ╲
  │.........LAC curve (envelope of SAC curves)........
  └──────────────────────────────── Output (Q)

• LAC envelops (lies below) all SAC curves
• Falling LAC = Economies of scale (internal)
• Rising LAC = Diseconomies of scale (managerial inefficiencies)
• Minimum of LAC = Optimum scale of production` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Revenue Curves — Perfect Competition vs Monopoly",
        content: [
          { type: "definition", text: "Total Revenue (TR) = P × Q. Average Revenue (AR) = TR/Q = P. Marginal Revenue (MR) = ΔTR/ΔQ = Revenue from one additional unit sold." },
          { type: "heading", text: "Revenue Under Perfect Competition" },
          { type: "explain", text: "In perfect competition, price is constant (firm is price taker). Therefore TR increases at a constant rate — TR is an upward sloping straight line through origin. Since P = constant, AR = P = MR at all output levels. AR and MR curves are HORIZONTAL and COINCIDE." },
          { type: "diagram", text: `
PERFECT COMPETITION REVENUE:

TR
│             / (straight line, 45°)
│           /
│         /
│       /
│     /
│   /
│ /
└──────────────── Q

AR/MR
│P = AR = MR ══════════════ (horizontal line)
│
└──────────────── Q

Numerical: P = Rs.5 constant
Q │ 0  │ 1  │ 2  │ 3  │ 4  │ 5
P │ 5  │ 5  │ 5  │ 5  │ 5  │ 5
TR│ 0  │ 5  │10  │15  │20  │25
AR│ —  │ 5  │ 5  │ 5  │ 5  │ 5
MR│ —  │ 5  │ 5  │ 5  │ 5  │ 5
→ P = AR = MR = 5 (constant)` },
          { type: "heading", text: "Revenue Under Imperfect Competition (Monopoly)" },
          { type: "explain", text: "Under monopoly, price falls as quantity increases (negative relationship). TR first increases at decreasing rate, reaches maximum, then falls. AR and MR are both downward sloping straight lines, with MR always BELOW AR (MR < AR). MR = 0 when TR is maximum." },
          { type: "diagram", text: `
MONOPOLY REVENUE:

TR     maximum
│    *       *
│  *           *
│ *              *
│*                *
└──────────────────── Q

MR and AR:
Price/MR
│
│  AR (= Demand curve, downward slope)
│   ╲
│    ╲
│─────╲────────────── (MR = 0 when TR = max)
│      ╲
│       ╲ MR (below AR, steeper)
└──────────────────── Q

• AR > MR at each output level
• When TR increases → MR is positive
• When TR is maximum → MR = 0
• When TR falls → MR is negative` },
          { type: "heading", text: "AR-MR Relationship Under Different Conditions" },
          { type: "table", headers: ["Shape of AR", "Position of MR", "Condition"],
            rows: [
              ["Horizontal (perfect competition)", "MR = AR (coincide)", "P = AR = MR (constant price)"],
              ["Downward sloping straight line", "MR bisects the distance between AR and Y-axis", "Price falls at constant rate (monopoly)"],
              ["Convex downward slope", "MR is to the LEFT of midpoint", "Price falls at diminishing rate"],
              ["Concave downward slope", "MR is to the RIGHT of midpoint", "Price falls at increasing rate"],
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u5",
    title: "Unit 5 — Market Structure",
    badge: "Chapter 5",
    color: "#E65100",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Perfect Competition — Equilibrium (Short Run & Long Run)",
        content: [
          { type: "definition", text: "Perfect Competition: A market with many buyers and sellers, homogeneous products, free entry/exit, perfect knowledge, no transport cost, no government regulation. Firms are PRICE TAKERS." },
          { type: "heading", text: "Short Run Equilibrium Conditions" },
          { type: "bullets", items: [
            "**Necessary condition:** MC = MR (Marginal Cost = Marginal Revenue)",
            "**Sufficient condition:** MC curve must cut MR from BELOW (slope of MC > slope of MR)",
          ]},
          { type: "diagram", text: `
SHORT RUN EQUILIBRIUM (3 cases):

CASE 1: Super Normal Profit (AR > AC)
Price/Cost         MC  AC
│            ←excess profit→
│P ─────────────────────────── AR=MR=P
│      │           │
│      │    E      │
│      │ ← shaded area = PABC
│      AC     Q
│
→ Shaded rectangle PABC = Super Normal Profit (P > AC)

CASE 2: Normal Profit (AR = AC)
P = AR = MR ────────E───── (tangent to AC at minimum)
                 MC = MR at E, and AR = AC
→ Zero economic profit (break-even)

CASE 3: Loss (AR < AC)
AR = MR ───────────────── P
           E  (below AC)
           AC line is above AR
→ Shaded area = Loss (AC > AR)
→ In SR, firm continues if P ≥ AVC (covers variable cost)
→ Shut-down if P < AVC` },
          { type: "heading", text: "Long Run Equilibrium — Only Normal Profit" },
          { type: "explain", text: "In the long run, free entry and exit eliminates both super normal profits and losses. If SR profits exist, new firms enter → supply increases → price falls → profits disappear. If SR losses exist, firms exit → supply decreases → price rises → losses disappear. Long run equilibrium condition:" },
          { type: "diagram", text: `
LONG RUN PERFECT COMPETITION EQUILIBRIUM:

Condition: LMC = MR = AR = P = SAC = LAC

Price/Cost
│                   MC  SAC  LAC
│                    ╲  ╱  ╱
│P* ─────────────────E────────── AR = MR = P
│                   ╱╲╱
│                       (tangent point of LAC and AR)
└──────────────────────────────── Q

→ P = LAC (tangent) → Normal profit only
→ No super normal profit, no loss
→ Both SR and LR equilibrium satisfied` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Monopoly — Equilibrium & Price Discrimination",
        content: [
          { type: "definition", text: "Monopoly: A market with a SINGLE seller, no close substitutes for the product, and strong barriers to entry. The monopolist is a PRICE MAKER." },
          { type: "heading", text: "Short Run Monopoly Equilibrium" },
          { type: "diagram", text: `
MONOPOLY SHORT RUN (Super Normal Profit):

Price
  │            MC
  │           ╱
  │P ──────A──────────  ← AR (demand curve, downward)
  │        │  ╲
  │        B   ╲
  │    AC──┤    ╲
  │        │     MR
  │        │
  └────────Q──────────── Output

Equilibrium at E where MC = MR (from below)
At output OQ:
 • Monopoly price = OP (from AR curve)
 • Average cost = OB (from AC curve)
 • Super normal profit = Shaded area PABC
   (because AR > AC, i.e., P > AC)

KEY: Monopolist faces DOWNWARD sloping AR and MR curves.
In Long Run: Monopolist can earn super normal profit even in LR
because entry is BLOCKED by barriers (unlike perfect competition).` },
          { type: "heading", text: "Price Discrimination (Asked in Exams!)" },
          { type: "definition", text: "Price Discrimination: A practice where the same product produced at the same cost is sold at DIFFERENT prices to different buyers/markets based on income, location, or elasticity of demand." },
          { type: "table", headers: ["Degree", "Type", "Description", "Example"],
            rows: [
              ["1st Degree", "Perfect price discrimination", "Monopolist charges MAXIMUM price each buyer is willing to pay. Consumer surplus = 0.", "Roadside vendors, some service providers"],
              ["2nd Degree", "Quantity discrimination", "Different prices for different quantities bought. Higher qty → lower price per unit.", "ISP charging Rs.4/MB for 10MB, Rs.3/MB for 20MB package"],
              ["3rd Degree", "Market segmentation", "Market divided into sub-markets; higher price where demand is INELASTIC, lower where ELASTIC.", "NEA: higher tariff for industry, lower for households"],
            ]
          },
          { type: "tip", label: "EXAM TIP", text: "Conditions for price discrimination: (1) Monopoly power, (2) Market can be divided/segmented, (3) Buyers can't resell between markets (no leakage), (4) Different price elasticities in different markets. NEA (Nepal Electricity Authority) is the classic Nepal example." },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Monopolistic Competition & Oligopoly",
        content: [
          { type: "table", headers: ["Feature", "Perfect Competition", "Monopoly", "Monopolistic Competition", "Oligopoly"],
            rows: [
              ["Sellers", "Very large number", "Single seller", "Large number", "Few (3–10)"],
              ["Product", "Homogeneous (identical)", "No close substitutes", "Differentiated (close substitutes)", "Homogeneous or differentiated"],
              ["Entry/Exit", "Completely free", "Blocked by barriers", "Relatively free", "Difficult (high barriers)"],
              ["Price control", "No (price taker)", "Full (price maker)", "Some (own product)", "Interdependent (mutual)"],
              ["Demand curve", "Horizontal (perfectly elastic)", "Downward sloping", "Slightly downward (elastic)", "Kinked demand curve"],
              ["Long run profit", "Normal profit only", "Super normal (barriers)", "Normal profit (free entry)", "Indeterminate"],
              ["Examples", "Agriculture markets", "NRB, NWSC", "Restaurants, noodles, soap", "Telecom (Ncell, NTC), cement"],
            ]
          },
          { type: "heading", text: "Oligopoly — Cartel (Joint Profit Maximization)" },
          { type: "definition", text: "Cartel: A formal agreement among oligopoly firms to reduce uncertainty from mutual interdependence. Main aim: maximize JOINT profit. The cartel acts like a multi-plant monopolist. Example: OPEC (oil cartel)." },
          { type: "explain", text: "In the cartel aiming at joint profit maximization, a central agency decides total output (where MR of market = aggregate MC), fixes monopoly price, and allocates output among firms. The firm with LOWER cost gets a HIGHER market share. MR = MC₁ = MC₂ at equilibrium." },
        ]
      },
    ]
  },
  {
    id: "u6",
    title: "Unit 6 — National Income",
    badge: "Chapter 6",
    color: "#00695C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "National Income Concepts — GDP, GNP, NNP, NI, PI, DI",
        content: [
          { type: "definition", text: "National Income: The money value of all final goods and services produced in a country during one year (usually). It measures the economic performance of a nation." },
          { type: "diagram", text: `
NATIONAL INCOME CONVERSION CHAIN:

GDPmp                      Gross Domestic Product (market price)
  + NFIA                   + Net Factor Income from Abroad
─────────
GNPmp                      Gross National Product (market price)
  - Depreciation           - Capital Consumption Allowance
─────────
NNPmp                      Net National Product (market price)
  - Net Indirect Tax (NIT) - (Indirect Tax - Subsidy)
─────────
NNPfc = NI                 Net National Product (factor cost) = National Income
  - Social Security Contribution
  - Undistributed Corporate Profit  
  - Corporate Income Tax
  + Transfer Payments
─────────
PI                         Personal Income
  - Direct Tax (Personal Tax)
─────────
DI                         Disposable Income (C + S)

KEY FORMULAS:
• NFIA = Factor Income FROM Abroad - Factor Income TO Abroad
• NIT = Indirect Tax - Subsidy
• NDP = GDP - Depreciation
• GDPmp = GDPfc + NIT  OR  GDPfc = GDPmp - NIT` },
          { type: "table", headers: ["Term", "Full Form", "Formula", "Key Note"],
            rows: [
              ["GDPmp", "Gross Domestic Product at Market Price", "C + I + G + (X-M) or COE + OS + Dep + MI + NIT", "All production within the country's borders"],
              ["GNPmp", "Gross National Product at Market Price", "GDPmp + NFIA", "GDP + income earned abroad by nationals"],
              ["NNPmp", "Net NP at Market Price", "GNPmp - Depreciation", "Removes capital consumption allowance"],
              ["NI = NNPfc", "National Income", "NNPmp - NIT", "= NNP at factor cost"],
              ["PI", "Personal Income", "NI - SSC - Undistributed profit - Corp. tax + Transfer", "Income actually received by persons"],
              ["DI", "Disposable Income", "PI - Direct Tax", "Income available for spending/saving"],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Expenditure Method — Full Formula with TU Solutions",
        content: [
          { type: "definition", text: "Expenditure Method: GDPmp = C + I + G + (X - M)" },
          { type: "diagram", text: `
EXPENDITURE METHOD COMPONENTS:

C = Private Final Consumption Expenditure
  = Household purchase of domestic goods + Household purchase of foreign goods

I = Investment (Gross Capital Formation)
  = Net Fixed Capital Formation + Depreciation + Change in Stock (Inventories)
  = Gross Fixed Capital Formation + Change in Stock
  Note: Gross Fixed Capital = Net Fixed Capital + Depreciation

G = Government Expenditure
  = Government Consumption + Government Investment expenditure

(X - M) = Net Exports = Exports - Imports
  X = Foreigner's purchase of domestic goods (exports)
  M = All imports (household + business + government)

Important relationships:
  GDPmp = C + I + G + (X-M)
  NDPmp = GDPmp - Depreciation
  GNPmp = GDPmp + NFIA
  NNPmp = GNPmp - Depreciation  OR  NDPmp + NFIA` },
          { type: "heading", text: "Income Method — Full Formula" },
          { type: "definition", text: "Income Method: GDPmp = COE + OS + Depreciation + Mixed Income + NIT" },
          { type: "diagram", text: `
INCOME METHOD COMPONENTS:

COE = Compensation of Employees
    = Wages and Salaries + Bonus + Social Security Contribution by EMPLOYER

OS = Operating Surplus
   = Rent + Interest + Profit
   Rent = Rental income + Royalties
   Interest = Interest paid by household + business + government
   Profit = Corporate profit + Proprietor's income (sometimes)
   Corporate Profit = Dividends + Undistributed profit + Corporate income tax

MI = Mixed Income = Income from self-employment (farmers, shopkeepers)

NIT = Net Indirect Tax = Indirect Taxes - Subsidies

AFTER GETTING NNPmp (= NI):

PI = NI - Social Security Contribution (employee's)
        - Undistributed Corporate Profit
        - Corporate Income Tax
        + Transfer Payments (pension, allowances, from govt + business + abroad)

DI = PI - Personal/Direct Tax

Note: Undistributed Profit = Corporate Profit - Dividends - Corporate Income Tax` },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Solved TU Exam Numericals — All Years",
        content: [
          { type: "heading", text: "TU 2077 — Find GNP, NNP, NI, PI, DI" },
          { type: "diagram", text: `
GIVEN (TU 2077):
  GDP = 3000 | NFIA = 10 | Depreciation = 600 | Indirect Tax = 400
  Corporate Profit = 300 | SSC = 500 | Transfer (Govt+Business) = 725
  Dividends = 175 | Personal Tax = 415

SOLUTION:
  GNP = GDP + NFIA = 3000 + 10 = 3010

  NNP = GNP - Depreciation = 3010 - 600 = 2410

  NI = NNP - Indirect Tax + Subsidy = 2410 - 400 + 0 = 2010

  Undistributed profit = Corporate Profit - Dividends - Corp. Income Tax
                       = 300 - 175 - 0 = 125 (if corp. tax not given, assume 0)

  PI = NI - SSC - Undistributed Profit - Corp. Income Tax + Transfer
     = 2010 - 500 - 125 - 0 + 725 = 2110

  DI = PI - Personal Tax = 2110 - 415 = 1695` },
          { type: "heading", text: "TU 2075 — Find NI, PI, DI (Income Method)" },
          { type: "diagram", text: `
GIVEN (TU 2075) in Rs. crore:
  Wages=420, Rent=200, Corp. Profit Tax=200, Transfer=375
  Dividends=500, Personal Tax=550, Interest=250, SSC=125
  Undistributed Profit=200, Mixed Income=525, NFIA=750

SOLUTION:
  COE = Wages = 420
  OS = Rent + Interest + Profit = 200 + 250 + (200+500+200) = 1350
  Depreciation = 0, Mixed Income = 525

  GDP = COE + OS + Dep + MI = 420 + 1350 + 0 + 525 = 2295
  GNP = GDP + NFIA = 2295 + 750 = 3045
  NNP = GNP - Dep = 3045 - 0 = 3045
  NI  = NNP - Indirect Tax + Subsidy = 3045 - 0 = 3045

  PI = NI - SSC - Undistributed Profit - Corp. Tax + Transfer
     = 3045 - 125 - 200 - 200 + 375 = 2895

  DI = PI - Personal Tax = 2895 - 550 = 2345` },
          { type: "heading", text: "BCA 2020 — Income + Expenditure Method" },
          { type: "diagram", text: `
GIVEN (BCA 2020) in Rs. crore:
  Exports=3542, Imports=3632, Private Consumption=58326, NFIA=-568
  Subsidies=674, Depreciation=4434, COE=26726, Govt Consumption=7602
  Indirect Taxes=7728, Gross Fixed Capital Formation=12610
  Mixed Income=32224, OS (Interest+Rent+Profit)=10088, Change in Stock=2078

INCOME METHOD:
  NIT = 7728 - 674 = 7054
  GDPmp = 26726 + 10088 + 4434 + 32224 + 7054 = 80526

EXPENDITURE METHOD:
  I = 12610 + 2078 = 14688 (Gross fixed + Change in stock)
  GDPmp = 58326 + 14688 + 7602 + (3542-3632) = 80526 ✓

  GDPfc = 80526 - 7054 = 73472
  GNPmp = 80526 + (-568) = 79958
  NNPmp = 79958 - 4434 = 75524
  NNPfc = 75524 - 7054 = 68470` },
          { type: "heading", text: "GDP Deflator & Rate of Inflation" },
          { type: "diagram", text: `
FORMULA:
  GDP Deflator = (Nominal GDP / Real GDP) × 100
  Real GDP = (Nominal GDP / GDP Deflator) × 100

  Rate of Inflation (r) = ((Deflator_current - Deflator_previous) / Deflator_previous) × 100

EXAMPLE TABLE:
Year    │ Nominal GDP │ Real GDP │ GDP Deflator │ Inflation Rate
2010/11 │ 2000        │ 1800     │ 111.11       │ —
2011/12 │ 2200        │ 1900     │ 115.79       │ 4.21%
2012/13 │ 2500        │ 2000     │ 125.00       │ 7.95%
2013/14 │ 3000        │ 2100     │ 142.86       │ 14.29%` },
          { type: "tip", label: "EXAM TIP", text: "In Expenditure method: Investment = Net Fixed Capital + Depreciation + Change in Stock (OR Gross Fixed Capital + Change in Stock). Be careful with what the question gives you! Always check if 'Gross' or 'Net' capital formation is given — if Gross, add Change in Stock directly. If Net, add Depreciation too." },
        ]
      },
    ]
  },
  {
    id: "u7",
    title: "Unit 7 — Money, Banking & Trade",
    badge: "Chapter 7",
    color: "#4527A0",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Money — Functions & Value, Inflation Types & Causes",
        content: [
          { type: "definition", text: "Money: Anything that is generally accepted as a medium of exchange, common measure, and store of value. Includes currency notes, coins, cheques, bank drafts, credit/debit cards." },
          { type: "heading", text: "Functions of Money" },
          { type: "table", headers: ["Category", "Function", "Description"],
            rows: [
              ["Primary", "Medium of Exchange", "Facilitates buying and selling — eliminates double coincidence of wants (barter problem)"],
              ["Primary", "Measure of Value", "Common standard for expressing prices; simplifies comparison of values"],
              ["Secondary", "Store of Value", "Wealth can be stored in money form; more durable than perishable goods"],
              ["Secondary", "Transfer of Value", "Money can move value from one place to another easily (remittances)"],
              ["Secondary", "Standard of Deferred Payment", "Future payments (loans, EMI) can be expressed in money terms"],
              ["Contingent", "Basis of Credit", "Banks create credit (cheques, drafts) based on money deposits"],
              ["Contingent", "Distribution of National Income", "Wages (labor), rent (land), interest (capital), profit (entrepreneur) — all in money"],
            ]
          },
          { type: "definition", text: "Value of Money (Vm): The purchasing power of money — quantity of goods/services one unit of money can buy. Vm = 1/P where P = price level. Higher prices → lower value of money (inverse relationship)." },
          { type: "heading", text: "Money Supply (M1 and M2)" },
          { type: "table", headers: ["Type", "Formula", "Components"],
            rows: [
              ["M1 (Narrow Money)", "M1 = C + DD", "C = Currency (notes + coins held by public) + DD = Demand deposits at commercial banks"],
              ["M2 (Broad Money)", "M2 = M1 + TD", "M1 + TD = Time Deposits (saving, fixed, call, margin deposits)"],
            ]
          },
          { type: "heading", text: "Inflation — Types, Causes & Effects" },
          { type: "definition", text: "Inflation: A continuous and persistent rise in the general price level, causing a fall in the value (purchasing power) of money. Semi-inflation (before full employment) → True inflation starts at full employment (Keynes)." },
          { type: "table", headers: ["Type of Inflation", "Cause", "Diagram behaviour"],
            rows: [
              ["Demand-Pull Inflation", "Excess aggregate demand over aggregate supply — 'too much money chasing too few goods'", "AD curve shifts rightward → price rises while output increases (till full employment)"],
              ["Cost-Push (Supply-Push) Inflation", "Rise in cost of production (wages, raw materials, oil) — AS curve shifts upward/leftward", "AS curve shifts up → price rises while output falls → stagflation"],
            ]
          },
          { type: "heading", text: "Causes of Demand-Pull Inflation" },
          { type: "bullets", items: [
            "Increase in **government expenditure** → raises aggregate demand",
            "Increase in **money supply** → lower interest rate → more investment → more income → more demand",
            "Increase in **private expenditure** → raises demand",
            "**Reduction in direct taxes** → more disposable income → more spending",
            "**Increase in exports** + **decrease in imports** → domestic shortage → price rises",
            "Repayment of past debts by government → more money in hands of people",
            "**Increase in population** → more demand for consumer goods",
          ]},
          { type: "heading", text: "Effects of Inflation" },
          { type: "bullets", items: [
            "**Increases inequality** — fixed income earners (wage/salary) suffer; debtors benefit, creditors lose",
            "**Encourages hoarding** — people hold goods expecting further price rise",
            "**Reduces saving** — people prefer to spend now than save (declining real returns)",
            "**Reduces foreign investment** — uncertainty discourages investors",
            "**Reduces production** — rising costs squeeze profit margins",
            "**Social and political unrest** — people protest against rising cost of living",
          ]},
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Banking — Central Bank & Commercial Bank Functions",
        content: [
          { type: "definition", text: "Central Bank: The supreme bank of a country. It controls, supervises, and guides all other banks. It is a non-profit institution with monopoly power to issue currency. Nepal's central bank = Nepal Rastra Bank (NRB), established 14 Baisakh 2013 B.S." },
          { type: "heading", text: "Functions of Central Bank (NRB) — Asked Every Year!" },
          { type: "table", headers: ["Function", "Description"],
            rows: [
              ["1. Monopoly of Note Issue", "Only central bank can issue currency notes. All issued notes are legal tender. NRB issues notes of Rs.1 to Rs.1000 and coins."],
              ["2. Banker's Bank", "Acts as bank for all commercial banks. Commercial banks keep Cash Reserve Ratio (CRR) with NRB. NRB guides, monitors, and controls all banks."],
              ["3. Bank of Government", "Maintains govt accounts; buys/sells govt securities and foreign currency; advises govt on monetary policy formulation."],
              ["4. Lender of Last Resort", "If commercial bank cannot meet financial obligations from other sources, NRB provides emergency loans to prevent banking crisis."],
              ["5. Clearing House", "Settles inter-bank claims and payments. Since all banks have accounts with NRB, it can easily clear mutual claims."],
              ["6. Credit Control", "Controls credit creation by banks using tools: Bank Rate, Open Market Operations, CRR, SLR. Maintains price stability."],
              ["7. Foreign Exchange Control", "Custodian of foreign exchange reserves. Maintains stability in exchange rate. Manages BOP difficulties."],
              ["8. Development Function", "Collects economic data; helps develop money and capital markets; advises on fiscal and economic policies; links with IMF, World Bank."],
            ]
          },
          { type: "definition", text: "Commercial Bank: A financial institution that accepts deposits and provides loans for commercial purposes to earn profit. Acts as intermediary between savers and investors. Creates credit money. Nepal's first commercial bank: Nepal Bank Limited (1994 B.S.)." },
          { type: "heading", text: "Functions of Commercial Bank" },
          { type: "table", headers: ["Category", "Function"],
            rows: [
              ["Primary — Accepting Deposits", "Current/Demand deposits (no interest, full flexibility), Savings deposits (restricted withdrawals, moderate interest), Fixed/Time deposits (locked period, highest interest)"],
              ["Primary — Providing Loans", "Cash credit (against current assets), Overdraft (withdraw beyond deposits), Money at call (short-term, 1-14 days), Term loans (medium/long term)"],
              ["Secondary", "Collection and payment of credit instruments (cheques, bills of exchange), Remittance of money, Purchase/sale of securities, Dealing in foreign exchange, Income receipt and payment services"],
              ["Contingent", "Safe deposit locker facility, Traveler's cheques, Letter of credit (for trade financing)"],
            ]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "International Trade — BOT vs BOP",
        content: [
          { type: "definition", text: "Balance of Trade (BOT): The difference between the total value of VISIBLE exports and VISIBLE imports of a country in a given period. BOT = X - M (only physical goods)." },
          { type: "definition", text: "Balance of Payment (BOP): A systematic annual record of ALL monetary transactions (both visible and invisible items) between a country and the rest of the world. BOP is a broader concept than BOT." },
          { type: "table", headers: ["Basis", "Balance of Trade (BOT)", "Balance of Payment (BOP)"],
            rows: [
              ["Definition", "Difference between value of visible exports and imports", "Systematic record of all monetary transactions with rest of world"],
              ["Coverage", "Only VISIBLE goods (physical goods recorded at customs)", "Both VISIBLE (goods) + INVISIBLE (services, remittances, banking, insurance) items"],
              ["Scope", "Partial/narrow concept — covers only trade in goods", "Broad concept — covers all economic transactions"],
              ["Broader/Narrower", "Narrower than BOP", "Broader than BOT"],
              ["Economic indicator", "Incomplete picture of economic performance", "Complete picture of economic performance"],
              ["Recovery", "Unfavorable BOT can be recovered by favorable BOP", "Unfavorable BOP cannot be recovered by favorable BOT"],
            ]
          },
          { type: "heading", text: "Types of BOT/BOP" },
          { type: "table", headers: ["Type", "BOT condition", "BOP condition"],
            rows: [
              ["Balanced/Equilibrium", "Exports = Imports", "Total Receipts = Total Payments"],
              ["Surplus (Favorable)", "Exports > Imports", "Total Receipts > Total Payments"],
              ["Deficit (Unfavorable)", "Imports > Exports", "Total Receipts < Total Payments"],
            ]
          },
          { type: "tip", label: "EXAM TIP", text: "Nepal consistently has a TRADE DEFICIT because imports (mainly from India and China) exceed exports. However, Nepal's BOP is somewhat balanced due to remittances (invisible income) from workers abroad, which is recorded in BOP but NOT in BOT." },
        ]
      },
    ]
  },
  {
    id: "u8",
    title: "Unit 8 — 2026 Predictions 🎯",
    badge: "High Probability",
    color: "#C62828",
    sections: [
      {
        qnum: "PRED",
        qtitle: "2026 Exam Predictions Based on Past Papers",
        content: [
          { type: "warning", text: "Based on patterns from 2020, 2021, 2073, 2074, 2075, 2076, 2077, 2078 exams. Questions marked ★ appeared multiple times and are almost certain to reappear." },
          { type: "heading", text: "Group B Predictions (5 Marks Each)" },
          { type: "table", headers: ["Predicted Question", "Probability", "Unit"],
            rows: [
              ["★ Define and calculate: GDP Deflator and Rate of Inflation from given data table", "Very High — appears almost every year", "Unit 6"],
              ["★ Explain demand-pull and cost-push inflation with diagram", "Very High", "Unit 7"],
              ["★ Distinguish between BOT and BOP", "High — asked repeatedly", "Unit 7"],
              ["Explain types of price elasticity of demand with diagrams", "High", "Unit 2"],
              ["Explain properties of indifference curve", "High", "Unit 3"],
              ["Derive MUx and MUy and find consumer equilibrium (2-commodity model)", "High — asked 2023", "Unit 3"],
              ["Explain short run equilibrium of firm under perfect competition (TR-TC + MC-MR)", "High", "Unit 5"],
              ["Functions of Central Bank (NRB) — list and explain", "High — classic question", "Unit 7"],
              ["Distinguish between monopoly and perfect competition", "Medium", "Unit 5"],
              ["Explain price discrimination and its types with example from Nepal", "Medium", "Unit 5"],
              ["Explain income and cross elasticity of demand", "Medium", "Unit 2"],
              ["Explain budget line and its shifts", "Medium", "Unit 3"],
            ]
          },
          { type: "heading", text: "Group C Predictions (10-15 Marks Each)" },
          { type: "table", headers: ["Predicted Question", "Probability", "Unit"],
            rows: [
              ["★ Compute NI, PI, DI by income + expenditure method from given data", "Almost Certain — asked EVERY year", "Unit 6"],
              ["★ Derive MU schedule, find consumer equilibrium using two-commodity model (Cardinal approach)", "Very High — asked 2023 exactly", "Unit 3"],
              ["Explain consumer's equilibrium using IC and budget line. Also explain price effect and PCC.", "Very High", "Unit 3"],
              ["Explain short run and long run equilibrium of monopoly (TR-TC + MR-MC approach)", "High", "Unit 5"],
              ["Explain short run and long run equilibrium of perfect competition + supply curve derivation", "High", "Unit 5"],
              ["Explain short run cost curves (TFC, TVC, TC, AC, AVC, AFC, MC) with diagrams", "High", "Unit 4"],
              ["Calculate GDPmp by both income and expenditure method and also NNPmp, GDPfc etc.", "Very High — standard 2020 format", "Unit 6"],
            ]
          },
          { type: "heading", text: "TOP 5 MUST-KNOW NUMERICALS" },
          { type: "bullets", items: [
            "**National Income (NI/PI/DI)** by Income Method — with COE, OS, Mixed Income, NFIA data",
            "**GDPmp by Expenditure Method** — with C, I (Gross Fixed + Change in Stock), G, X-M",
            "**GDP Deflator** — given Nominal and Real GDP, find deflator and inflation rate",
            "**Consumer Equilibrium by Cardinal approach** — given TU schedule, find MU, find equilibrium with budget constraint",
            "**Price Elasticity of Demand** — given P1, P2, Q1, Q2, calculate Ep and interpret",
          ]},
          { type: "tip", label: "STRATEGY 2026", text: "Spend the most time on: (1) National Income formulas — every sub-formula from GDP→DI. (2) Consumer equilibrium by Cardinal utility (MU table). (3) IC-Budget line equilibrium diagram. (4) Market structure equilibrium diagrams (perfect competition and monopoly). These 4 topics cover ~75% of the total marks." },
        ]
      },
      {
        qnum: "CHEAT",
        qtitle: "Quick Formula Reference Sheet",
        content: [
          { type: "heading", text: "All National Income Formulas at a Glance" },
          { type: "diagram", text: `
NATIONAL INCOME FORMULA CHAIN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXPENDITURE METHOD:
  GDPmp = C + I + G + (X − M)
  where I = Gross Fixed Capital + Change in Stock
        (OR Net Fixed Capital + Depreciation + Change in Stock)

INCOME METHOD:
  GDPmp = COE + OS + Depreciation + Mixed Income + NIT
  COE = Wages+Salaries + Employer's SSC
  OS  = Rent + Interest + Profit
  NIT = Indirect Tax − Subsidy

CONVERSION:
  GNPmp = GDPmp + NFIA
  NNPmp = GNPmp − Depreciation
  NI    = NNPfc = NNPmp − NIT
  PI    = NI − SSC − Undistributed Profit − Corp. Tax + Transfer Payments
  DI    = PI − Personal (Direct) Tax = C + S

  Undistributed Profit = Corporate Profit − Dividends − Corporate Income Tax
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GDP Deflator = (Nominal GDP / Real GDP) × 100
Real GDP     = (Nominal GDP / GDP Deflator) × 100
Inflation(r) = ((Deflator_now − Deflator_prev) / Deflator_prev) × 100` },
          { type: "heading", text: "Elasticity Formulas" },
          { type: "diagram", text: `
Price Elasticity (Ep):
  Ep = (ΔQ/ΔP) × (P/Q)  [Proportionate method]
  Arc: Ep = (ΔQ/ΔP) × (P1+P2)/(Q1+Q2)

Income Elasticity (Ey):  Ey = (ΔQ/ΔM) × (M/Q)
Cross Elasticity (Exy):  Exy = (ΔQx/ΔPy) × (Py/Qx)
Supply Elasticity (Es):  Es = (ΔQs/ΔP) × (P/Qs)

INTERPRETATION:
  |Ep| > 1 → Elastic (luxury goods)
  |Ep| = 1 → Unitary elastic
  |Ep| < 1 → Inelastic (necessities)
  Ep = ∞   → Perfectly elastic (horizontal D)
  Ep = 0   → Perfectly inelastic (vertical D)` },
          { type: "heading", text: "Market Equilibrium Conditions" },
          { type: "table", headers: ["Market", "Short Run Condition", "Long Run Condition"],
            rows: [
              ["Perfect Competition", "MC = MR (from below)", "LMC = MR = AR = P = SAC = LAC (normal profit)"],
              ["Monopoly", "MC = MR (from below)", "LMC = MR (from below); super normal profit possible"],
              ["Monopolistic Competition", "MC = MR (from below)", "LMC = MR; AR = LAC (tangent) → normal profit"],
              ["Oligopoly Cartel", "MRM = MC aggregate", "MCA = MCB = MC(A+B)"],
            ]
          },
          { type: "heading", text: "Consumer Equilibrium Conditions" },
          { type: "table", headers: ["Approach", "Equilibrium Condition"],
            rows: [
              ["Cardinal (1 good)", "MUx / Px = MUm (MU of money)"],
              ["Cardinal (2 goods)", "MUx/Px = MUy/Py = MUm"],
              ["Ordinal (IC method)", "MRSxy = Px/Py AND IC is convex to origin (tangency of IC and Budget Line)"],
            ]
          },
        ]
      },
    ]
  },
];

const COLORS = {
  bg: "#F0F4F8", surface: "#FFFFFF", border: "#DDE3EA",
  code_bg: "#F1F5F9", code_border: "#CBD5E1", text: "#1E293B",
  muted: "#64748B", definition_bg: "#EFF6FF", definition_border: "#3B82F6",
  analogy_bg: "#FFF7ED", analogy_border: "#F97316", tip_bg: "#F0FDF4",
  tip_border: "#22C55E", warning_bg: "#FFF1F2", warning_border: "#F43F5E",
  diagram_bg: "#1E293B", heading: "#1E293B",
};

function ContentBlock({ item }) {
  switch (item.type) {
    case "explain":
      return <p style={{ color: COLORS.text, fontSize: 14.5, lineHeight: 1.8, margin: "8px 0" }}>{item.text}</p>;
    case "heading":
      return <h4 style={{ color: COLORS.heading, fontSize: 15, fontWeight: 700, margin: "18px 0 8px", paddingBottom: 5, borderBottom: `2px solid ${COLORS.border}` }}>{item.text}</h4>;
    case "definition":
      return (
        <div style={{ background: COLORS.definition_bg, border: `1px solid ${COLORS.definition_border}`, borderLeft: `4px solid ${COLORS.definition_border}`, borderRadius: 7, padding: "12px 16px", margin: "10px 0" }}>
          <p style={{ margin: 0, color: "#1D4ED8", fontSize: 14.5, lineHeight: 1.7 }}>{item.text}</p>
        </div>
      );
    case "analogy":
      return (
        <div style={{ background: COLORS.analogy_bg, border: `1px solid ${COLORS.analogy_border}`, borderLeft: `4px solid ${COLORS.analogy_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0" }}>
          <div style={{ color: COLORS.analogy_border, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>🔍 ANALOGY</div>
          <span style={{ color: "#92400E", fontSize: 14.5, lineHeight: 1.7, fontStyle: "italic" }}>{item.text}</span>
        </div>
      );
    case "tip":
      return (
        <div style={{ background: COLORS.tip_bg, border: `1px solid ${COLORS.tip_border}`, borderLeft: `4px solid ${COLORS.tip_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: "#16A34A", fontWeight: 800, fontSize: 12, minWidth: 100, paddingTop: 2 }}>💡 {item.label}</span>
          <span style={{ color: "#14532D", fontSize: 14.5, lineHeight: 1.7 }}>{item.text}</span>
        </div>
      );
    case "warning":
      return (
        <div style={{ background: COLORS.warning_bg, border: `1px solid ${COLORS.warning_border}`, borderLeft: `4px solid ${COLORS.warning_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0" }}>
          <div style={{ color: COLORS.warning_border, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>⚠ WARNING</div>
          <span style={{ color: "#9F1239", fontSize: 14.5, lineHeight: 1.7 }}>{item.text}</span>
        </div>
      );
    case "diagram":
      return (
        <div style={{ background: COLORS.diagram_bg, borderRadius: 8, padding: "14px 18px", margin: "12px 0", overflowX: "auto" }}>
          <pre style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: 12.5, color: "#E2E8F0", lineHeight: 1.6, whiteSpace: "pre" }}>{item.text}</pre>
        </div>
      );
    case "bullets":
      return (
        <ul style={{ margin: "8px 0", paddingLeft: 22 }}>
          {item.items.map((it, i) => (
            <li key={i} style={{ color: COLORS.text, fontSize: 14.5, lineHeight: 1.8, marginBottom: 6 }}
                dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "12px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr>{item.headers.map((h, i) => (
                <th key={i} style={{ background: "#1E293B", color: "#fff", padding: "9px 12px", textAlign: "left", fontWeight: 700, borderBottom: "2px solid #334155" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {item.rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: "8px 12px", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, verticalAlign: "top", lineHeight: 1.6 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function economics() {
  const [activeUnit, setActiveUnit] = useState("u1");
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text, textAlign: "left" }}>
      <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#10B981", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📈</div>
          <div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: 19, fontWeight: 700 }}>Applied Economics — BCA 6th Semester</h1>
            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>Complete Exam Guide 2026 • CAEC353 • 7 Units + 2026 Predictions</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderBottom: `2px solid ${COLORS.border}`, overflowX: "auto" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 0, minWidth: "max-content" }}>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => setActiveUnit(u.id)}
              style={{ padding: "13px 14px", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: activeUnit === u.id ? 700 : 500, color: activeUnit === u.id ? u.color : COLORS.muted, borderBottom: activeUnit === u.id ? `3px solid ${u.color}` : "3px solid transparent", whiteSpace: "nowrap", transition: "all 0.15s" }}>
              {u.title.split("—")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ background: `linear-gradient(135deg, ${unit.color} 0%, ${unit.color}CC 100%)`, borderRadius: 14, padding: "22px 28px", marginBottom: 28, boxShadow: `0 4px 20px ${unit.color}40` }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 21, fontWeight: 700 }}>{unit.title}</h2>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4, display: "block" }}>{unit.badge}</span>
        </div>

        {unit.sections.map((sec, si) => {
          const key = `${unit.id}-${si}`;
          const open = openSections[key] !== false;
          return (
            <div key={key} style={{ background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.border}`, marginBottom: 16, overflow: "hidden", boxShadow: open ? "0 2px 12px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
              <button onClick={() => toggleSection(key)}
                style={{ width: "100%", background: open ? "#F8FAFC" : "#fff", border: "none", padding: "15px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "background 0.15s" }}>
                <span style={{ background: unit.color, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, minWidth: 60, textAlign: "center", whiteSpace: "nowrap" }}>{sec.qnum}</span>
                <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, flex: 1 }}>{sec.qtitle}</span>
                <span style={{ color: COLORS.muted, fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-block" }}>▾</span>
              </button>
              {open && (
                <div style={{ padding: "4px 24px 28px" }}>
                  {sec.content.map((item, ci) => <ContentBlock key={ci} item={item} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
