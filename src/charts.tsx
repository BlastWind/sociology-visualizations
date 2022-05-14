import { useEffect, useState } from "react";
import {
  HospitalRanking,
  IncomeByState2020,
  LifeExpectancyByState,
  WealthByState2019,
} from "./data";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const minIncomeState = IncomeByState2020.reduce(
  (prevItem, curItem) =>
    curItem.MedianIncome && curItem.MedianIncome < prevItem
      ? curItem.MedianIncome
      : prevItem,
  IncomeByState2020[0].MedianIncome
);
const maxIncomeState = IncomeByState2020.reduce(
  (prevItem, curItem) =>
    curItem.MedianIncome && curItem.MedianIncome > prevItem
      ? curItem.MedianIncome
      : prevItem,
  IncomeByState2020[0].MedianIncome
);

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

const IncomeByStateColorScale = scaleQuantile()
  .domain([
    Number(standardify(minIncomeState)),
    Number(standardify(maxIncomeState)),
  ])
  .range(redToWhite);

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
export const IncomeByStateChart = () => {
  return (
    <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const cur = IncomeByState2020.find(
                (item) => item.State === geo.properties.name
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill={
                    cur && cur.MedianIncome
                      ? IncomeByStateColorScale(
                          Number(standardify(cur.MedianIncome))
                        )
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

const minWealthState = WealthByState2019.reduce(
  (prevItem, curItem) =>
    Number.isInteger(Number(standardify(curItem.networth))) &&
    Number(standardify(curItem.networth)) < prevItem
      ? Number(standardify(curItem.networth))
      : prevItem,
  Number(standardify(WealthByState2019[0].networth))
);
const maxWealthState = WealthByState2019.reduce(
  (prevItem, curItem) =>
    Number.isInteger(Number(standardify(curItem.networth))) &&
    Number(standardify(curItem.networth)) > prevItem
      ? Number(standardify(curItem.networth))
      : prevItem,
  Number(standardify(WealthByState2019[0].networth))
);

const WealthByStateColorScale = scaleQuantile()
  .domain([minWealthState, maxWealthState])
  .range(redToWhite);

export const WealthByStateChart = () => {
  return (
    <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const cur = WealthByState2019.find(
                (item) => item.state === geo.properties.name
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill={
                    cur && cur.networth
                      ? String(
                          WealthByStateColorScale(
                            Number(standardify(cur.networth))
                          )
                        )
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

const minLife = LifeExpectancyByState.reduce(
  (prevItem, curItem) =>
    Number(curItem.RATE) && Number(curItem.RATE) < prevItem
      ? Number(curItem.RATE)
      : prevItem,
  Number(LifeExpectancyByState[0].RATE)
);
const maxLife = LifeExpectancyByState.reduce(
  (prevItem, curItem) =>
    Number(curItem.RATE) && Number(curItem.RATE) > prevItem
      ? Number(curItem.RATE)
      : prevItem,
  Number(LifeExpectancyByState[0].RATE)
);

const LifeScale = scaleQuantile().domain([minLife, maxLife]).range(redToWhite);

export const LifeByStateChart = () => {
  return (
    <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const cur = LifeExpectancyByState.find(
                (item) => item.STATE === geo.properties.name
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill={
                    cur && cur.RATE
                      ? String(LifeScale(Number(cur.RATE)))
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

// const minHospitalIndex = HospitalRanking.reduce(
//   (prevItem, curItem) =>
//     curItem.ranking < prevItem ? curItem.ranking : prevItem,
//   HospitalRanking[0].ranking
// );

// const maxHospitalIndex = HospitalRanking.reduce(
//   (prevItem, curItem) =>
//     curItem.ranking > prevItem ? curItem.ranking : prevItem,
//   HospitalRanking[0].ranking
// );
const HospitalScale = scaleQuantile()
  .domain([1, 48])
  .range([0, 1, 2, 3, 4, 5, 6, 7, 8]);

export const HospitalChart = () => {
  return (
    <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const cur = HospitalRanking.find(
                (item) => item.state === geo.properties.name
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill={
                    cur && cur.ranking
                      ? whiteToRed[HospitalScale(cur.ranking)]
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

// interface ChoroplethChartProps<T> {
//   geoUrl: string;
//   // minVal: Number;
//   // maxVal: Number;
//   data: T[];
//   parsingFn: (arg0: T) => any;
// }

// export const ChoroplethChart = <T,>({
//   geoUrl,
//   data,
//   compProp,

//   parsingFn,
// }: ChoroplethChartProps<T>) => {
//   const minVal = data.reduce(
//     (prevItem, curItem) =>
//       parsingFn(curItem) < prevItem ? parsingFn(curItem) : prevItem,
//     parsingFn(data[0])
//   );
//   const maxVal = data.reduce(
//     (prevItem, curItem) =>
//       parsingFn(curItem) < prevItem ? parsingFn(curItem) : prevItem,
//     parsingFn(data[0])
//   );

//   const colorScale = scaleQuantile()
//     .domain([minWealthState, maxWealthState])
//     .range(redToWhite);

//   return (
//     <ComposableMap projection="geoAlbersUsa" width={1000} height={1000}>
//       <Geographies geography={geoUrl}>
//         {({ geographies }) => (
//           <>
//             {console.log(geographies)}
//             {geographies.map((geo) => {
//               const cur = data.find(
//                 (item) => item.state === geo.properties.name
//               );
//               return (
//                 <Geography
//                   key={geo.rsmKey}
//                   stroke="#FFF"
//                   geography={geo}
//                   fill={
//                     cur && cur.networth
//                       ? String(
//                           (
//                             Number(standardify(cur.networth))
//                           )
//                         )
//                       : "DDD"
//                   }
//                 />
//               );
//             })}
//           </>
//         )}
//       </Geographies>
//     </ComposableMap>
//   );
// };
