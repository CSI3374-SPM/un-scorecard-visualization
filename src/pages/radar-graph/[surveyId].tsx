import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchSurveyResults, SurveyResponse } from "../../api/Wrapper";
import SurveyRadarGraph from "../../components/SurveyRadarGraph";
import _ from "lodash";

// const characterData = [
//   {
//     Strength: 1,
//     Intelligence: 250,
//     Luck: 1,
//     Stealth: 40,
//     Charisma: 50,
//     "Other Thing": 45,
//     "Other Thing 2": 85,
//     "Other Thing 3": 22,
//     "Other Thing 4": 44,
//     "Other Thing 5": 74,
//   },
//   {
//     Strength: 2,
//     Intelligence: 300,
//     Luck: 2,
//     Stealth: 80,
//     Charisma: 90,
//     "Other Thing": 84,
//     "Other Thing 2": 95,
//     "Other Thing 3": 82,
//     "Other Thing 4": 14,
//     "Other Thing 5": 24,
//   },
//   {
//     Strength: 5,
//     Intelligence: 225,
//     Luck: 3,
//     Stealth: 60,
//     Charisma: 120,
//     "Other Thing": 99,
//     "Other Thing 2": 35,
//     "Other Thing 3": 42,
//     "Other Thing 4": 94,
//     "Other Thing 5": 34,
//   },
// ];

function RadarGraphPage() {
  const router = useRouter();
  // @ts-ignore
  const [results, setResults]: [
    SurveyResponse[][] | null,
    (r: SurveyResponse[][] | null) => void
  ] = useState(null);

  const requestResults = async () => {
    if (!_.isString(router.query.surveyId)) {
      return;
    }
    let resp = await fetchSurveyResults(router.query.surveyId);
    setResults(resp);
  };

  useEffect(() => {
    requestResults();
  }, [router.query.surveyId]);

  useEffect(() => {
    const timer = setInterval(requestResults, 5000);
    return () => clearInterval(timer);
  }, [router.query.surveyId]);

  if (router.query.surveyId) {
    /* Radar graph component */
    return (
      <>
        <SurveyRadarGraph surveyData={results} />
      </>
    );
  }
  // Not found
  return <></>;
}

export default RadarGraphPage;
