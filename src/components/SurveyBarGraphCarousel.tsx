import { ArrowBack, ArrowForward } from "@material-ui/icons";
import React, { useState } from "react";
import { questions, SurveyResponse } from "../api/Wrapper";
import SurveyBarGraph from "./SurveyBarGraph";

interface Props {
  surveyData: SurveyResponse[][] | null;
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
        <h3 className="text-sm">{questions[index].question}</h3>
        <SurveyBarGraph surveyData={props.surveyData} questionIndex={index} />
      </div>
      <button
        onClick={() => {
          if (index < questions.length - 1) setIndex(index + 1);
        }}
      >
        <ArrowForward />
      </button>
    </div>
  );
}
