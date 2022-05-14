import {
  HospitalRanking,
  IncomeByState2020,
  LifeExpectancyByState,
  WealthByState2019,
} from "./data";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import React, { useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

const removePhraseFrom = (str: string, phrase: string) => {
  return str.replace(phrase, "");
};

const standardify = (str: string) => removePhraseFrom(str, ",");

const whiteToRed = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const redToWhite = [
  "#782618",
  "#9a311f",
  "#be3d26",
  "#e2492d",
  "#ff5533",
  "#ff8a75",
  "#ffad9f",
  "#ffcec5",
  "#ffedea",
];

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export const IncomeByStateChart = () => (
  <ChoroplethChart
    data={IncomeByState2020.map((d) => {
      return {
        state: d.State,
        MedianIncome: Number(standardify(d.MedianIncome)),
      };
    })}
    compProp="MedianIncome"
    colorRange={redToWhite}
  />
);

export const WealthByStateChart = () => (
  <ChoroplethChart
    data={WealthByState2019.map((d) => {
      return {
        ...d,
        networth: Number(standardify(d.networth)),
      };
    })}
    compProp="networth"
    colorRange={redToWhite}
  />
);

export const LifeByStateChart = () => (
  <ChoroplethChart
    data={LifeExpectancyByState.map((d) => {
      return {
        ...d,
        state: d.STATE,
        RATE: Number(standardify(d.RATE)),
      };
    })}
    compProp="RATE"
    colorRange={redToWhite}
  />
);

export const HospitalChart = () => (
  <ChoroplethChart
    data={HospitalRanking.map((d) => {
      return {
        ...d,
        RATE: Number(d.ranking),
      };
    })}
    compProp="ranking"
    colorRange={whiteToRed}
  />
);

interface StateChoroplethChartProps<
  T extends Record<K, number> & { state: string },
  K extends keyof T
> {
  // minVal: Number;
  // maxVal: Number;
  data: T[];
  compProp: K;
  colorRange: string[];
}

export const ChoroplethChart = <
  T extends Record<K, number> & { state: string },
  K extends keyof T
>({
  data,
  compProp,
  colorRange,
}: StateChoroplethChartProps<T, K>) => {
  const setToolTipContent = useContext(ToolTipContext);

  const minVal = data.reduce(
    (prevItem, curItem) =>
      curItem[compProp] < prevItem ? curItem[compProp] : prevItem,
    data[0][compProp]
  );
  const maxVal = data.reduce(
    (prevItem, curItem) =>
      curItem[compProp] >= prevItem ? curItem[compProp] : prevItem,
    data[0][compProp]
  );

  //@ts-ignore, .range() works fine with string[], though its type annotation only accepts number[]
  const colorScale = scaleQuantile().domain([minVal, maxVal]).range(colorRange);

  return (
    <ComposableMap
      data-tip=""
      projection="geoAlbersUsa"
      width={1000}
      height={1000}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const cur = data.find(
                (item) => item.state === geo.properties.name
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  onMouseEnter={() => {
                    console.log("set it?");
                    setToolTipContent(
                      `${geo.properties.name}: ${cur[compProp]}`
                    );
                  }}
                  onMouseLeave={() => {
                    setToolTipContent("");
                  }}
                  fill={
                    cur && cur[compProp]
                      ? String(colorScale(cur[compProp]))
                      : "DDD"
                  }
                />
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export enum ChartIds {
  Health = "health",
  Income = "income",
  Wealth = "wealth",
  Hospital = "hospital-quality-index",
}

const ToolTipContext = React.createContext(null);

export const Charts = ({ id }: { id: ChartIds }) => {
  const [ID, setID] = useState(id);
  const [toolTipContent, setToolTipContent] = useState("");
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [ID]);

  useEffect(() => {
    setID(id);
  }, [id]);

  console.log({ toolTipContent });

  let current: JSX.Element;
  switch (ID) {
    case "health":
      current = <LifeByStateChart />;
      break;
    case "income":
      current = <IncomeByStateChart />;
      break;
    case "wealth":
      current = <WealthByStateChart />;
      break;
    case "hospital-quality-index":
      current = <HospitalChart />;
  }
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          {[
            ChartIds.Income,
            ChartIds.Wealth,
            ChartIds.Health,
            ChartIds.Hospital,
          ].map((id) => (
            <button
              key={id}
              onClick={() => {
                setID(id);
              }}
              style={{ fontWeight: id === ID ? "bold" : "inherit" }}
            >
              {id}
            </button>
          ))}
        </div>
        <ToolTipContext.Provider value={setToolTipContent}>
          {current}
        </ToolTipContext.Provider>
      </div>
      <ReactTooltip>{toolTipContent}</ReactTooltip>
    </>
  );
};
