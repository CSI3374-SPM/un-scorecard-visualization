import React, { useState, useEffect } from "react";
import BarGraph from "./BarGraph";
import _ from "lodash";
import { QuestionType, SurveyResponse} from "../api/WrapperV2";

interface Props {
  surveyData: SurveyResponse[] | null;
  questionIndex: number;
  questions: QuestionType[];
}

const computeResponseSums = (
  surveyData: SurveyResponse[] | null,
  ndx: number
) => {
  if (_.isNull(surveyData)) return [0, 0, 0, 0, 0, 0];

  return QuestionNum(surveyData, ndx);
};

const QuestionNum = (data: SurveyResponse[], ndx: number) => {
  let scoreTotals = [0, 0, 0, 0, 0, 0];
  let currentResp = data.filter(response => response.questionNumber == (ndx + 1))

  currentResp.forEach((response) => {
    if(!_.isUndefined(response)) {
      let score = Number(response.score)
      if(score >= 0 && score <= 5) {
        scoreTotals[score]++;
      }
    }
  })

  return scoreTotals;
};

export default function SurveyBarGraph(props: Props) {
  // @ts-ignore
  const [data, setData]: [number[], (n: number[]) => void] = useState([]);

  useEffect(() => {
    setData(computeResponseSums(props.surveyData, props.questionIndex));
  }, [props.surveyData, props.questionIndex]);
  //console.log("resp: " + data);
  return !_.isNull(props.surveyData) && data.length > 0 ? (
    <BarGraph
      data={data}
      xLabel="Score values"
      yLabel="Number of responders for score"
    />
  ) : (
    <></>
  );
}
