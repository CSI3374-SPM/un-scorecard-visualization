import React, { useState, useEffect } from "react";
import RadarGraph, { Memo } from "./RadarGraph";
import _ from "lodash";
import { QuestionType, SurveyResponse} from "../api/WrapperV2";




interface Props {
  surveyData: SurveyResponse[] | null;
  questions: QuestionType[];
}



const computeEssentialAverages = (surveyData: SurveyResponse[] | null, questions: QuestionType[]) => {
  if (_.isNull(surveyData)) return [];

  const questionAvgs = questions.map((_q, i) => {
    return averageQuestionNum(surveyData, i);
  });

  let essentialAvgs: Memo = {};
  // const MAX_VAL = 5;
  const multiplier = 1; //100 / MAX_VAL;

  essentialAvgs["Essential 1"] = questionAvgs[0] * multiplier;
  essentialAvgs["Essential 2"] =
    ((questionAvgs[1] + questionAvgs[2] + questionAvgs[3]) / 3) * multiplier;
  essentialAvgs["Essential 3"] = questionAvgs[4] * multiplier;
  essentialAvgs["Essential 4"] = questionAvgs[5] * multiplier;
  essentialAvgs["Essential 5"] = questionAvgs[6] * multiplier;
  essentialAvgs["Essential 6"] =
    ((questionAvgs[7] + questionAvgs[8] + questionAvgs[9] + questionAvgs[10]) /
      4) *
    multiplier;
  essentialAvgs["Essential 7"] =
    ((questionAvgs[11] + questionAvgs[12] + questionAvgs[13]) / 3) * multiplier;
  essentialAvgs["Essential 8"] =
    ((questionAvgs[14] + questionAvgs[15] + questionAvgs[16]) / 3) * multiplier;
  essentialAvgs["Essential 9"] =
    ((questionAvgs[17] +
      questionAvgs[18] +
      questionAvgs[19] +
      questionAvgs[20]) /
      4) *
    multiplier;
  essentialAvgs["Essential 10"] =
    ((questionAvgs[21] + questionAvgs[22]) / 2) * multiplier;

  Object.keys(essentialAvgs).forEach((key) => {
    if (isNaN(essentialAvgs[key])) {
      essentialAvgs[key] = 0;
    }
  });

  return [essentialAvgs];
};

const averageQuestionNum = (data: SurveyResponse[], ndx: number) => {
  let total = 0;
  let numResp = 0;

  console.log("Data for averages: ", data)
  console.log("index: ", ndx)
  let currentResp = data.filter(response => response.questionNumber == (ndx + 1))
  console.log("currentResp: ", currentResp)
  currentResp.forEach((response: SurveyResponse) => {
    if(!_.isUndefined(response)) {
      total += Number(response.score);
      numResp++;
    }
  })
  console.log("Average for ", ndx, " is: ", total/numResp, "with total: ", total, "responses: ", numResp)
  return total / numResp;
};

export default function SurveyRadarGraph(props: Props) {
  const [data, setData]: [Memo[], (m: Memo[]) => void] = useState([{}]);

  useEffect(() => {
    setData(computeEssentialAverages(props.surveyData, props.questions));
  }, [props.surveyData]);
  console.log("Data passed to radar graph: ", data)
  return !_.isNull(props.surveyData) &&
    data.length > 0 &&
    Object.keys(data[0]).length > 0 ? (
    <RadarGraph data={data} />
  ) : (
    <></>
  );
}
