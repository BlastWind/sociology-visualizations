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
import RussianLifeExpectancy from "./data/russian-men-vs-women-life-expectancy.js";
import { TwitterTweetEmbed } from "react-twitter-embed";

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
    console.log(document.getElementById("income-paragraph"));
    ids.forEach((id) => observer.current.observe(document.getElementById(id)));
  }, [ids]);

  return intersectionIds.find((ele) => ele.isIntersecting)?.id;
};

const Figure = ({ id }) => {
  console.log({ id });
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
        <iframe width="100%" height="100%" src="http://www.justicemap.org/" />
      );
    case "wealth":
      return <img width="100%" src={WealthMap} />;
    case "health":
      return <img width="100%" src={HealthMap} />;
    case "hospital-quality-index":
      return <img width="100%" src={HospitalIndexImage} />;

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
              When evaluating the health of a population, my mind first goes to
              life expectancy. I pop up an average life expectancy graph of
              developed countries, expecting Japan to be on top, America to be
              somewhere in the middle amongst all developed countries, and China
              to be near the bottom. <br /> And I am correct. Except, America
              ranks a bit further down, and is only 28 out of the 37 OECD
              countries, and China still counts as a developing country.
            </div>
            <div id="russia" className="text-paragraph">
              With a bit more curiosity , I open up a few new tabs, accidentally
              surfing data on life expectancy with regards to{" "}
              <a style={{ fontWeight: "bold" }}>sex </a>
              amongst countries. These results show that even today, Russian men
              are expected to live a whole decade shorter than Russian women.
              Now that I see comparisons between social groups in one national
              population, my mind starts searching for answers. Vodka? Hmm, that
              might be a part of it. Men just doing stupid things? Well, there
              will never be a “near death experience montage” on Youtube whose
              main features aren’t Russian men. But why is infant mortality rate
              gendered in Russia as well?
            </div>
            <div id="" className="text-paragraph">
              In addition to cultural beliefs and folk traditions, there’s gotta
              be more to the whole story.
              <br />
              Together now, let's look at more data, hold constant different
              traditional health determinants, and examine their effects on
              different social groups.
            </div>
            <div id="income" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Chapter 1: Definitions and Data
              </a>
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 1: Income map
              </div>
              The richest county, Loudoun VA, has an astounding average income
              of 136k. On the other hand, todd south dakota has an average
              income of 24k. That’s a five-point-six fold difference, rounding
              down. But a more general pattern emerges. The South is very
              evidently poorer. Strips of blue appear often not in connection
              with other blue strips. There actually occurs quite some sudden
              drastic shifts (from darker red to darker blue), although more
              changes occur in gradient.
            </div>
            <div id="wealth" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 2: Wealth map
              </div>
              The richest county, Loudoun VA, has an astounding average income
              of 136k. On the other hand, todd south dakota has an average
              income of 24k. That’s a five-point-six fold difference, rounding
              down. But a more general pattern emerges. The South is very
              evidently poorer. Strips of blue appear often not in connection
              with other blue strips. There actually occurs quite some sudden
              drastic shifts (from darker red to darker blue), although more
              changes occur in gradient.
            </div>
            <div id="health" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 3: Health map
              </div>
              The health map follows the general patterns of the wealth and
              income map. Therefore, there’s a connection between wealth and
              health. Is this connection causal? Common sense says yes, and
              sociologists say so too.
            </div>
            <div id="hospital-quality-index" className="text-paragraph">
              <div style={{ fontStyle: "italic", fontSize: "22px" }}>
                Data 4: Hospital Quality Index map
              </div>
              There's a connection to the wealth graph, again.
              <br />
              But why should this be the case? Income and wealth is an micro or
              meso level measurement. Health is too a lower level measurement.
              But here, Hospital Index is a macro (institutional) level
              measurement. Yet we continue see the same pattern. This is
              institutional health inequity. If you are poor, you aren’t treated
              the same.
              <br />
              Should the highest bidder win? On Ebay, yes. But what if you are
              bidding on your health? Bidding on arriving at a trustworthy,
              readily supplied hospital on time when your pregnant wife’s water
              breaks?
              <br />
              <a style={{ fontWeight: "bold" }}>
                Is the enjoyment of the highest attainable standard of health a
                human right?
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
                theorem) and social gradient frameworks. The FCT frames, what I
                would say, is unfortunately common sense (unfortunate in that
                health does not appear to be a fundamental right in America).
                But the "social gradient" framework also observes the following
                baffling result: Not only are people subjected to relative
                poverty, but health forms a linear relationship with SES.
                Marmot, the coiner of "social gradient", uses autonomy to
                explain this result: We want to be the champions of our fate.
                The less others have control over us, the healthier we are. Of
                course, that the lower your SES, the more likely you have
                superiors and more stress that makes you feel less in control.
                Biologists study the physical health consequences of stress. But
                sociologists also observe that stress in turn cuts away time and
                opportunities to, for example, go for a health checkup,
                exercise, etc.
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
                also unchangeable.
                <br />
                That's why I challenged us to question the fairness of the
                Hospital Index Map.
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
                Furthermore, non-Asian racial minorities have significantly
                lower SES. Not to mention that racial minorities fare worse than
                their white counterparts even when other health determinants are
                held constant. And, there is apparently no apparent equalizers
                (employment, education) on wealth. [Show income, wealth in
                regards to education]
              </div>
            </div>
            <div id="no-great-equalizer-2" className="text-paragraph">
              <div>
                Personally, I believe addressing wealth and education should be
                the priority.
                <br />
                First, on wealth: Although the top 1% owns 18% of the income
                (fact check this), they own anywhere from 37% - 48% of the
                wealth. Studies show that one of the potential factors for
                health equity in OECD countries is wealth taxation. Wealth
                taxation may have a redistributive effect, reducing wealth
                inequality, increasing investments in social programs, and
                potentially contributing to better health outcomes. Wealth
                taxations usually come in the form of inheritance, gifting, and
                estate tax.
                <br />
                Now, on education: The "education is not the great equalizer"
                graph from earlier looks so skewed for two reasons: 1) Education
                here is not studied cross generations 2) Black families
                historically have significantly lower wealth. At the end of the
                day, the most significant way one can improve their outcomes in
                to increase their education level. Our education system today is
                inequitable: While high SES families see a 18% increase in
                college graduation rates, low SES families only see 4%. Taxed
                wealth should prioritize flowing into the education sector.
              </div>
            </div>
            <div id="income-paragraph" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Aside 1: Collection of interesting finding I have yet to
                synthesize
              </a>
              <ul>
                <li>
                  Stress management, as indicated with the 40% of american using
                  these stress managements tactics in 2010 fact.
                </li>
                <li>
                  The Acheson Inquiry made 39 recommendations, with 4 main
                  areas: Early child development and education, work
                  environments, building healthy communities and supporting
                  active social engagement of older people.
                </li>
                <li>
                  As suggested in many works like Guns, Germs, and Steel and
                  Robert Gordon's article, germs gave civilizations a chance to
                  grow and be better. And today, we are ironically taking these
                  chances away from poorer countries.
                </li>
                <li>
                  The most equal OECD countries have the strongest wealth tax.
                </li>
                <li>
                  5.1% of all deaths can be attributed to income inequality,
                  7.5% to racial segregation, 11.4% to low education for 25-64
                  year olds.
                </li>
              </ul>
            </div>
            <div id="income-paragraph" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Aside 2: What I lacked in addressing
              </a>
              <div>Intersectionality.</div>
            </div>
            <div id="class-or-culture" className="text-paragraph">
              <a style={{ fontWeight: "bold", fontSize: "25px" }}>
                Aside 3: Class or Culture?
              </a>
              <div>
                1) Which one should we be fighting first?
                <br />
                2) Who is/is there a "they"?
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
            "https://github.com/BlastWind/sociology-visualizations",
            "_blank",
            "noopener"
          );
        }}
      >
        Source code
      </button>
    </div>
  );
}

export default App;
