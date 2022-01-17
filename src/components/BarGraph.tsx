import React, { useState, useEffect } from "react";
import { VictoryBar } from "victory";
import { VictoryChart, VictoryTheme } from "victory";

// Code based off of https://formidable.com/open-source/victory/gallery/radar-chart

type Props = {
  data: number[];
  xLabel: string;
  yLabel: string;
};

export default function BarGraph(props: Props) {
  const [data, setData] = useState(props.data);
  const [max, setMax] = useState(5);
  console.log("props data in bar graph: ", props.data)
  useEffect(() => {
    setData(props.data);
    setMax(
      props.data.reduce((a, b) => {
          if (a <= b) {
              if (b < 5){
                  return 5
              }
              return b;
          }
          return a;
      })
    );
  }, [props.data]);

  return (
    <div className="flex flex-col">
      <div className="inline-flex flex-row space-x-0 relative">
        <div className="inline-block self-center min-w-12 -m-16">
          <p className="self-start transform -rotate-90 text-xs">
            {props.yLabel}
          </p>
        </div>
        <div className="w-full">
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryBar
              barWidth={(i) => 25}
              alignment= "middle"
              data={data.map((y, i) => {
                return { x: i.toString(), y };
              })}
              domain={[0, max]}

            />
          </VictoryChart>
        </div>
      </div>
      <div className="self-center">
        <p className="text-xs">{props.xLabel}</p>
      </div>
    </div>
  );
}
