import { ArrowBack, ArrowForward } from "@material-ui/icons";
import React, {useState} from "react";
import {QuestionType, SurveyResponse} from "../api/WrapperV2";
import SurveyBarGraph from "./SurveyBarGraph";

interface Props {
  surveyData: SurveyResponse[] | null;
  questions: QuestionType[];
}

export default function SurveyBarGraphCarousel(props: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-row p-4">
      <button
        onClick={() => {
          if (index > 0) setIndex(index - 1);
        }}
      >
        <ArrowBack />
      </button>
      <div className="inline-flex flex-col max-w-md p-4">
        <h3 className="text-sm">{props.questions[index].text}</h3>
        <SurveyBarGraph surveyData={props.surveyData} questionIndex={index} questions={props.questions}/>
      </div>
      <button
        onClick={() => {
          if (index < props.questions.length - 1) setIndex(index + 1);
        }}
      >
        <ArrowForward />
      </button>
    </div>
  );
}
