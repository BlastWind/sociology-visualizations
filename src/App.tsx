import "./App.css";
import WealthMap from "./images/screen-shot-2015-10-04-at-4-09-29-pm.webp";
import LifeExpectancyImage from "./images/life-expectancy.png";
import HospitalIndexImage from "./images/HPSAPC.png";
import HealthMap from "./images/health-map.png";
import EducationNotEqualizer from "./images/education-is-not-the-great-equalizer.png";
import EmploymentNotEqualizer from "./images/employment-is-not-the-great-equalizer.png";
import React, { useEffect, useState, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import RussianLifeExpectancy from "./data/russian-men-vs-women-life-expectancy";
import { TwitterTweetEmbed } from "react-twitter-embed";
import {
  HospitalChart,
  IncomeByStateChart,
  LifeByStateChart,
  WealthByStateChart,
} from "./charts";
import { LifeExpectancyByState } from "./data";

const useFirstIntersect = (ids) => {
  const [intersectionIds, setIntersectionIds] = useState(
    ids.map((id) => {
      return { id: id, isIntersecting: false };
    })
  );
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const {
            target: { id },
            isIntersecting,
          } = entry;
          setIntersectionIds((array) =>
            // Update isIntersect
            array.map((item) =>
              item.id === id ? { ...item, isIntersecting } : item
            )
          );
        });
      },
      { threshold: 0.5 }
    )
  );
  useEffect(() => {
    ids.forEach((id) => observer.current.observe(document.getElementById(id)));
  }, [ids]);

  return intersectionIds.find((ele) => ele.isIntersecting)?.id;
};

const Figure = ({ id }) => {
  switch (id) {
    case "life-expectancy":
      return <img width="100%" src={LifeExpectancyImage} />;
    case "russia":
      return (
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={RussianLifeExpectancy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="male" stroke="#8884d8" />
            <Line type="monotone" dataKey="female" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      );
    case "income":
      return (
        // <iframe width="100%" height="100%" src="http://www.justicemap.org/" />
        <IncomeByStateChart />
      );
    case "wealth":
      return <WealthByStateChart />;
    case "health":
      return <LifeByStateChart />;
    case "hospital-quality-index":
      return <HospitalChart />;

    case "no-great-equalizer-2":
    case "no-great-equalizer":
      return (
        <div>
          <img width="100%" src={EducationNotEqualizer} />
          <img width="100%" src={EmploymentNotEqualizer} />
        </div>
      );
    case "class-or-culture":
      return (
        <div style={{ width: "100%" }}>
          <TwitterTweetEmbed tweetId={"1495100175999647745"} />
        </div>
      );

    default:
      return <div></div>;
  }
};

function App() {
  const firstIntersectId = useFirstIntersect([
    "life-expectancy",
    "russia",
    "income",
    "wealth",
    "health",
    "hospital-quality-index",
    "no-great-equalizer",
    "no-great-equalizer-2",
    "class-or-culture",
  ]);
  return (
    <div className="page">
      <div className="header">INEQUALITY FOR ALL</div>
      <div className="subheader">A HEALTH PERSPECTIVE</div>
      <div className="scroll-container-outer">
        <div className="scroll-container-inner">
          <div className="scroll-text-container">
            <div id="life-expectancy" className="text-paragraph">
              When I first started thinking critically about population health,
              my mind first goes to hard, cold metrics like life expectancy. I
              pop up an average life expectancy graph of developed countries,
              expecting Japan to be on top, America to be somewhere in the
              middle amongst all developed countries, and China to be near the
              bottom. <br /> And I am correct. Except, America ranks a bit
              further down, and is only 28 out of the 37 OECD countries, and
              China still counts as a developing country.
            </div>
            <div id="russia" className="text-paragraph">
              With a bit more curiosity , I open up a few new tabs, accidentally
              surfing data on life expectancy with regards to
              <a style={{ fontWeight: "bold" }}>sex </a>
              amongst countries. These results show that even today, Russian men
              are expected to live a whole decade shorter than Russian women.
              This statistic prompted me in thinking about the reason of
              durastic differences between groups in one nation. Vodka? Hmm,
              that might be a part of it. Men just doing stupid things? Well,
              there will never be a “near death experience montage” on Youtube
              whose main characters aren’t Russian men, and researches cite
              "hypermasculinity" as health damaging. But say, grown men doing
              stupid things is the cause, then why is infant mortality rate
              gendered (favoring female over male) in Russia as well [1]?
            </div>
            <div id="" className="text-paragraph">
              The Russian question is merely a thought exercise, today's main
              focus is health inequties in the US. As we move through this
              discussion, keep one question in mind:
              <a style={{ fontWeight: "bold" }}>
                What are the utilities a human life deserve?
              </a>
              <br />
              Together now, let's look at data confirming US inequities and
              explanatory frameworks, before I offer some larger solutions.
            </div>
            <div id="income" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Chapter 1: Definitions and Data
              </a>
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 1: Income map [2]
              </div>
              On <a href="http://www.justicemap.org/">Justice Map,</a>
              &nbsp;we see that the richest county, Loudoun VA, has an
              astounding average income of 136k. On the other hand, todd south
              dakota has an average income of 24k. That’s a five-point-six fold
              difference, rounding down. But a more general pattern emerges. The
              South is very evidently poorer. Strips of blue appear often not in
              connection with other blue strips. There actually occurs quite
              some sudden drastic shifts (from darker red to darker blue),
              although more changes occur in gradient.
              <div>
                On the interactive map to the right, we see income distribution
                by state (the redder, the lower the income).
              </div>
            </div>
            <div id="wealth" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 2: Wealth map [3]
              </div>
              Wealth follows the trend of income, which makes sense, wealth is
              at its core, the accumulation of cross generational income. But
              pan your mouse around the map and notice the larger differences.
            </div>
            <div id="health" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 3: Health map [4]
              </div>
              The health map (using life expectancy) follows the general
              patterns of the wealth and income map. Therefore, there’s a
              connection between wealth and health. Is this connection causal?
              Common sense says yes, and sociologists say so too.
            </div>
            <div id="hospital-quality-index" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 4: Hospital Quality Index map [5]
              </div>
              There's a connection to the wealth graph, again.
              <br />
              Income, wealth, and health are individual based measurements. But,
              Hospital Index is an institutional level measurement. Yet we
              continue to see the same pattern. This is institutional health
              inequity. If you are poor, you aren’t treated the same. Why should
              this be the norm?
              <br />
              Should the highest bidder win? On Ebay, yes. But what if you are
              bidding on your health? Bidding on arriving at a trustworthy,
              readily supplied hospital in case of emergencies?
              <br />
              <a style={{ fontWeight: "bold" }}>
                Isn't the enjoyment of the highest attainable standard of health
                a human right?
              </a>
            </div>
            <div id="frameworks-intro" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Chapter 2: Frameworks
              </a>
              <div>
                Those from low SES communities lack resources to protect and/or
                improve their health. But furthermore, those with ample SES are
                still subjected to the effects of relative poverty. These two
                statements are encapsulated in the FCT (fundamental cause
                theorem) and the social gradient frameworks [6,7]. The FCT
                states an unfortunately common sense fact. But the "social
                gradient" framework also observes the following baffling result:
                Not only are people subjected to relative poverty, but health
                forms a linear relationship with SES. Marmot, the coiner of
                "social gradient", uses autonomy to explain this result: We want
                to be the champions of our fate. The less others have control
                over us, the healthier we are. Of course, the lower your SES,
                the more likely you have superiors, stress, and less control.
                Biologists study the physical health consequences of stress and
                allostatic load [8]. But sociologists also observe that stress
                in turn cuts away time and opportunities to, for example, go for
                a health checkup, exercise, etc.
              </div>
            </div>
            <div id="income-paragraph" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Framework Concerns
              </div>
              <div>
                FCT is just the “draped cloth over a table” that reveals the
                shape of hidden systems of social stratification. But, inferred
                in the word “fundamental” is a sense of staticness. One of the
                flaws of FCT, evident in sociology research, is the implication
                that progress can’t be made because social stratification is
                also unchangeable [9].
                <br />
                We must, however, confront this seemingly unchangeable
                stratification.
              </div>
            </div>
            <div id="no-great-equalizer" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Chapter 3: Solutions
              </a>
              <div>
                If SES is the fundamental cause of health inequities. Do we
                focus on fixing SES or fixing health first? That’s a difficult
                question, the more upstream we try to solve a problem, the more
                greed and bureaucracy tangled resistance there will be.
                <br />
                How do we even fix SES? SES in the states relates intimately
                with race. Non-Asian racial minorities have significantly lower
                SES, not to mention that racial minorities fare worse in health
                than their white counterparts even when other health
                determinants are held constant. And, apparently in the two
                graphs to the right, there is no apparent equalizers
                (employment, education) on wealth.
              </div>
            </div>
            <div id="no-great-equalizer-2" className="text-paragraph">
              <div>
                I am an "upstream" guy, and I believe in addressing wealth and
                education should be the priority, and that in turn, they can
                balance health inequities. I believe this for two reasons: 1)
                Health is merely a reflection of relative SES (5.1% of all
                deaths can be attributed to income inequality, 7.5% to racial
                segregation, 11.4% to low education for 25-64 year olds) [10].
                2) SES solves other problems. The Acheson Inquiry, similarily,
                suggest that the main area to focus in reducing health
                inequities to be Early child development and education [11].
                Other areas include work environments, building healthy
                communities and supporting active social engagement of older
                people.
                <br />
                First, let's address wealth. Here are the stats: Although the
                top 1% owns 18% of the income, they own anywhere from 37% - 48%
                of the wealth [13]. Studies show that one of the potential
                factors for health equity in OECD countries is wealth taxation.
                Wealth taxation may have a redistributive effect, reducing
                wealth inequality, increasing investments in social programs,
                and potentially contributing to better health outcomes. And
                indeed, the most equal OECD countries have the strongest wealth
                tax, Wealth taxations usually come in the form of inheritance,
                gifting, and estate tax. Thus, I am proposing wealth tax as the
                fundamental way of rebalancing. I am not a number cruncher, but
                I consider Elizabeth Warren's&nbsp;
                <a href="https://2020.elizabethwarren.com/toolkit/umt">
                  2 Cent Tax
                </a>
                &nbsp;Plan is a great step.
                <br />
                Now, let's address education: Although the graphs paint
                equalizing efforts as futile, it is "overdramatic" for two
                reasons: 1) Education here is not studied cross generations, 2)
                Black families historically have significantly lower wealth,
                since wealth is also cross generational. At the end of the day,
                the most significant way one can improve their outcomes is to
                increase their education level. Our education system today is
                inequitable: While high SES families see a 18% increase in
                college graduation rates, low SES families only see 4% [13].
                Taxed wealth should prioritize flowing into the education
                sector, focusing on simulatenous, cross generational, low income
                parent and child education.
              </div>
            </div>
            <div id="class-or-culture" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Aside 1: Class vs Culture?
              </a>
              <div>
                In my writeup, I didn't mention enough about race, gender, and
                inequities in regards to intersectionality. But that's because I
                feel the need to end with the following question, and in
                addressing the unfortunate racial and gender patterns, I
                would've been too intimate with "culture", and therefore taint
                your gut reaction.
                <a style={{ fontWeight: "bold", fontSize: "18px" }}>
                  &nbsp;Are we fighting a culture war when we should be fighting
                  a class war?
                </a>
              </div>
            </div>
          </div>
          <div className="scroll-figure-container-outer">
            <div className="scroll-figure-container-inner">
              <Figure id={firstIntersectId} />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          window.open(
            "https://github.com/BlastWind/sociology-visualizations/tree/main/src/citations",
            "_blank",
            "noopener"
          );
        }}
      >
        Source Code And Citations
      </button>
    </div>
  );
}

export default App;
