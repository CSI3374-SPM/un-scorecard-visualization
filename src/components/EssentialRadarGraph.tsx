import React, { useState, useEffect } from "react";
import RadarGraph, { Memo } from "./RadarGraph";
import _ from "lodash";
import { questions, SurveyResponse } from "../api/Wrapper";

interface Props {
  surveyData: SurveyResponse[][] | null;
  essential: number;
}

const computeEssentialAverage = (
  surveyData: SurveyResponse[][] | null,
  essential: number
) => {
  if (_.isNull(surveyData)) return [];

  let essentialAvg: Memo = {};

  const essentialQ = essentialQuestionsIndices[essential - 1];
  const questionAvgs = essentialQ.map((qIndex) =>
    averageQuestionNum(surveyData, qIndex)
  );

  questionAvgs.forEach((avg, index) => {
    let q = questions[essentialQ[index]].question.split(" ")[0];
    essentialAvg[q] = avg;
  });

  // There needs to be at least 3 keys to display properly
  const keys = ["", " "];
  keys.forEach((key) => {
    if (Object.keys(essentialAvg).length < 3) {
      essentialAvg[key] = 0;
    }
  });

  Object.keys(essentialAvg).forEach((key) => {
    if (isNaN(essentialAvg[key])) {
      essentialAvg[key] = 0;
    }
  });

  return [essentialAvg];
};

const averageQuestionNum = (data: SurveyResponse[][], ndx: number) => {
  let total = 0;
  let numResp = 0;
  data.forEach((responder) => {
    const response = responder.find(
      (question) => question.questionIndex === ndx
    );
    if (!_.isUndefined(response)) {
      total += response.score;
      numResp++;
    }
  });
  return total / numResp;
};

export const essentialQuestionsIndices = [
  [0],
  [1, 2, 3],
  [4],
  [5],
  [6],
  [7, 8, 9, 10],
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19, 20],
  [21, 22],
];

export default function EssentialRadarGraph(props: Props) {
  const [data, setData]: [Memo[], (m: Memo[]) => void] = useState([{}]);

  useEffect(() => {
    setData(computeEssentialAverage(props.surveyData, props.essential));
  }, [props.surveyData, props.essential]);

  return !_.isNull(props.surveyData) &&
    data.length > 0 &&
    Object.keys(data[0]).length > 0 ? (
    <RadarGraph data={data} />
  ) : (
    <></>
  );
}
