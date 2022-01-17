import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  closeResultsSocketV2,
  fetchSurveyResultsStreamV2, getQuestions, QuestionType,
  SurveyResponse,
} from "../../api/WrapperV2";
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
    SurveyResponse[] | null,
    (r: SurveyResponse[] | null) => void
  ] = useState(null);
  const [socket, setSocket]: [
    SocketIOClient.Socket | null,
    (s: SocketIOClient.Socket | null) => void
  ] = useState(null as SocketIOClient.Socket | null);
  const [showEssentials, setShowEssentials] = useState(false);
  const [showScores, setShowScores] = useState(false);
  // @ts-ignore
  const [questions, setQuestions]: [
        QuestionType[] | null,
    (questions: QuestionType[] | null) => void
  ] = useState([]);



  useEffect(() => {
    if (_.isNull(socket) && _.isString(router.query.surveyId)) {
      setSocket(fetchSurveyResultsStreamV2(router.query.surveyId, setResults));
    } else if (!_.isNull(socket)) {
      closeResultsSocketV2(socket);
      setSocket(null);
    }
    return () => {
      if (!_.isNull(socket)) {
        console.log("results a");
        closeResultsSocketV2(socket);
      }
    };
  }, [router.query.surveyId]);

  useEffect(() => {
    return () => {
      if (!_.isNull(socket)) {
        console.log("results b");
        closeResultsSocketV2(socket);
      }
    };
  }, []);

  useEffect(() => {
    async function loadQuestions() {
      setQuestions(await getQuestions(router.query.surveyId as string));
      console.log("Fetched questions", questions);
    }
    loadQuestions();
  }, [router.query.surveyId]);


  if (router.query.surveyId) {
    /* Radar graph component */
    return (
      <div className="content-center max-w-5xl mx-auto">
        <h1 className="text-center text-xl mt-8">
          <strong>
            Disaster Resilience Scorecard for Cities: Visualizations for survey{" "}
            {router.query.surveyId}
          </strong>
        </h1>
        <div className="flex flex-row p-4">
          <div className="flex-grow max-w-6xl">
            <SurveyRadarGraph surveyData={results} questions={questions} />
          </div>
          <div className="flex flex-col p-4">
            <Switch
              label="Show average scores for questions within each Essential"
              callback={setShowEssentials}
            />
            {showEssentials ? (
              <div className="max-w-md">
                <EssentialRadarGraphCarousel surveyData={results} questions={questions} />
              </div>
            ) : (
              <></>
            )}
            <Switch
              label="Show score distribution for each survey question"
              callback={setShowScores}
            />
            {showScores ? (
              <div className="max-w-md">
                <SurveyBarGraphCarousel surveyData={results} questions={questions} />
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
