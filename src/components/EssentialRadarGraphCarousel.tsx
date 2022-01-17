import { ArrowBack, ArrowForward } from "@material-ui/icons";
import React, { useState } from "react";
import {QuestionType, SurveyResponse} from "../api/WrapperV2";
import EssentialRadarGraph, {
  essentialQuestionsIndices,
} from "./EssentialRadarGraph";

interface Props {
  surveyData: SurveyResponse[] | null;
  questions: QuestionType[];
}






export default function EssentialRadarGraphCarousel(props: Props) {
  const [essential, setEssential] = useState(1);
  const essentialDesc = [...new Set(props.questions.map((question: QuestionType) => question.category))];
  console.log("Descriptions: ", essentialDesc)
  return (
    <div className="flex flex-row p-4">
      <button
        onClick={() => {
          if (essential > 1) setEssential(essential - 1);
        }}
      >
        <ArrowBack />
      </button>
      <div className="inline-flex flex-col max-w-md p-4">
        <h3>
          <strong>Essential {essential}</strong>
        </h3>
        <h4 className="text-sm">{essentialDesc[essential - 1]}</h4>
        <EssentialRadarGraph
          surveyData={props.surveyData}
          essential={essential}
          questions={props.questions}
        />
      </div>
      <button
        onClick={() => {
          if (essential < essentialQuestionsIndices.length)
            setEssential(essential + 1);
        }}
      >
        <ArrowForward />
      </button>
    </div>
  );
}
