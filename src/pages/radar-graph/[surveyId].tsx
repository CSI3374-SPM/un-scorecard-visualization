import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  closeResultsSocket,
  fetchSurveyResultsStream,
  SurveyResponse,
} from "../../api/Wrapper";
import SurveyRadarGraph from "../../components/SurveyRadarGraph";
import _ from "lodash";
import Switch from "../../components/Switch";
import SurveyBarGraphCarousel from "../../components/SurveyBarGraphCarousel";
import EssentialRadarGraphCarousel from "../../components/EssentialRadarGraphCarousel";

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
  const [socket, setSocket]: [
    SocketIOClient.Socket | null,
    (s: SocketIOClient.Socket | null) => void
  ] = useState(null as SocketIOClient.Socket | null);
  const [showEssentials, setShowEssentials] = useState(false);
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    if (_.isNull(socket) && _.isString(router.query.surveyId)) {
      setSocket(fetchSurveyResultsStream(router.query.surveyId, setResults));
    } else if (!_.isNull(socket)) {
      closeResultsSocket(socket);
      setSocket(null);
    }
    return () => {
      if (!_.isNull(socket)) {
        console.log("results a");
        closeResultsSocket(socket);
      }
    };
  }, [router.query.surveyId]);

  useEffect(() => {
    return () => {
      if (!_.isNull(socket)) {
        console.log("results b");
        closeResultsSocket(socket);
      }
    };
  }, []);

  if (router.query.surveyId) {
    /* Radar graph component */
    return (
      <div className="content-center max-w-5xl mx-auto">
        <h1 className="text-center text-xl mt-8">
          <strong>Visualizations for survey {router.query.surveyId}</strong>
        </h1>
        <div className="flex flex-row p-4">
          <div className="flex-grow max-w-6xl">
            <SurveyRadarGraph surveyData={results} />
          </div>
          <div className="flex flex-col p-4">
            <Switch
              label="Show Essentials Radar Charts"
              callback={setShowEssentials}
            />
            {showEssentials ? (
              <div className="max-w-md">
                <EssentialRadarGraphCarousel surveyData={results} />
              </div>
            ) : (
              <></>
            )}
            <Switch
              label="Show Question Score Charts"
              callback={setShowScores}
            />
            {showScores ? (
              <div className="max-w-md">
                <SurveyBarGraphCarousel surveyData={results} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
  // Not found
  return <></>;
}

export default RadarGraphPage;
