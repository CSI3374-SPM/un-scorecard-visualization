import React, { useState, useEffect } from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory";

// Code based on https://formidable.com/open-source/victory/gallery/radar-chart

type Point = {
  x: string;
  y: number;
};

export type Memo = {
  [key: string]: number;
};

type GroupedData = {
  [key: string]: number[];
};

const getMaxima = (data: Memo[]): Memo => {
  const groupedData: GroupedData = Object.keys(data[0]).reduce(
    (memo: GroupedData, key: string) => {
      memo[key] = data.map((d: Memo) => d[key]);
      return memo;
    },
    {}
  );
  return Object.keys(groupedData).reduce((memo: Memo, key: string) => {
    memo[key] = 5; // Math.max(...groupedData[key]);
    return memo;
  }, {});
};

const processData = (data: Memo[]): Point[][] => {
  const maxByGroup: Memo = getMaxima(data);
  const makeDataArray = (d: Memo) => {
    return Object.keys(d).map((key: string) => {
      return { x: key, y: d[key] / maxByGroup[key] };
    });
  };
  return data.map((datum: Memo) => makeDataArray(datum));
};

type Props = {
  data: Memo[];
};

export default function RadarGraph(props: Props) {
  const [data, setData] = useState(processData(props.data));
  const [maxima, setMaxima] = useState(getMaxima(props.data));

  useEffect(() => {
    // console.log(data);
    setData(processData(props.data));
    setMaxima(getMaxima(props.data));
  }, [props.data]);

  return (
    <VictoryChart polar theme={VictoryTheme.material} domain={{ y: [0, 1] }}>
      <VictoryGroup
        colorScale={["gold", "orange", "tomato"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        {data.map((data, i) => {
          return <VictoryArea key={i} data={data} />;
        })}
      </VictoryGroup>
      {Object.keys(maxima).map((key, i) => {
        return (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: { padding: 10 },
              axis: { stroke: "none" },
              grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
            }}
            tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={(t) => Math.ceil(t * maxima[key])}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
          />
        );
      })}
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.5 },
        }}
      />
    </VictoryChart>
  );
}
