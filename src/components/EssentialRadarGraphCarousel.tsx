import { ArrowBack, ArrowForward } from "@material-ui/icons";
import React, { useState } from "react";
import { SurveyResponse } from "../api/Wrapper";
import EssentialRadarGraph, {
  essentialQuestionsIndices,
} from "./EssentialRadarGraph";

interface Props {
  surveyData: SurveyResponse[][] | null;
}

const essentialDesc = [
  "Integration of public health and governance",
  "Integration of public health and disaster scenarios",
  "Integration of public health and finances",
  "Integration of public health and land use/building codes",
  "Management of ecosystem services that affect public health",
  "Integration of public health and institutional capacity",
  "Integration of public health and societal capacity",
  "Integration of public health and infrastructure resilience",
  "Integration of public health and disaster response",
  "Integration of public health and recovery/building back better",
];

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
        <h3>
          <strong>Essential {essential}</strong>
        </h3>
        <h4 className="text-sm">{essentialDesc[essential - 1]}</h4>
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
