import { ArrowBack, ArrowForward } from "@material-ui/icons";
import React, { useState } from "react";
import { SurveyResponse } from "../api/Wrapper";
import EssentialRadarGraph, {
  essentialQuestionsIndices,
} from "./EssentialRadarGraph";

interface Props {
  surveyData: SurveyResponse[][] | null;
}

export default function EssentialRadarGraphCarousel(props: Props) {
  const [essential, setEssential] = useState(1);
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
        <h3>Essential {essential}</h3>
        <EssentialRadarGraph
          surveyData={props.surveyData}
          essential={essential}
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
