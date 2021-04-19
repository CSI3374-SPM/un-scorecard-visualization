import React, { useState, useEffect } from "react";
import { VictoryBar } from "victory";
import { VictoryChart, VictoryTheme } from "victory";

// Code based off of https://formidable.com/open-source/victory/gallery/radar-chart

type Props = {
  data: number[];
};

export default function BarGraph(props: Props) {
  const [data, setData] = useState(props.data);
  const [max, setMax] = useState(5);

  useEffect(() => {
    setData(props.data);
    setMax(
      props.data.reduce((a, b) => {
        if (a < b) {
          return b;
        }
        if (b < 5) {
          return 5;
        }
        return b;
      })
    );
  }, [props.data]);

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryBar
        barWidth={(i) => 25}
        alignment="start"
        data={data.map((y, i) => {
          return { x: i.toString(), y };
        })}
        domain={[0, max]}
      />
    </VictoryChart>
  );
}
