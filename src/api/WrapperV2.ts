import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import io from "socket.io-client";
5000
const apiUrl = process.env.API_URL || "http://localhost:5000";
const api = axios.create({
    baseURL: apiUrl,
});

const request = async (
    config: AxiosRequestConfig,
    onFail: (e: any) => void = console.log
) => {
    try {
        const response = await api.request(config);
        if (!_.isUndefined(response.data)) {
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        onFail(e);
        return null;
    }
};

export type QuestionType = {
    id: number;
    number: number;
    text: string;
    category: string;
    descriptions: string[];
};

// The data field for the state
export interface SurveyResponse {
    userId: string;
    questionNumber: number;
    id: number;
    // Score restricted to 0 to 5
    score: number;
    justification?: string;
}

const makeSocket = () => {
    return io(apiUrl, { transports: ["websocket"], timeout: 30000 });
};

const closeSocket = (socket: SocketIOClient.Socket) => {
    console.log("WebSocket connection closing");
    socket.off("connect");
    socket.off("disconnect");
    socket.close();
};

export const closeResultsSocketV2 = (socket: SocketIOClient.Socket) => {
    socket.off("survey_responses_updated");
    closeSocket(socket);
};

export const getQuestions = async (
    surveyID: string,
    onFail: (e: any) => void = console.log
) => {
    const data = await request(
        {
            method: "GET",
            url: "/api/get/questions",
            params: {
                survey_id: surveyID,
            },
        },
        onFail
    );

    if (!_.isNull(data)) {
        return data.map((questionData: any[], index: number) => {
            const question: QuestionType = {
                id: questionData[0],
                number: questionData[1],
                text: questionData[2],
                category: questionData[3],
            };
            return question;
        });
    }
    return null;
};

export const fetchSurveyResultsStreamV2 = (
    surveyId: string,
    callback: (results: SurveyResponse[] | null) => void,
    onFail: (socket: SocketIOClient.Socket) => void = closeResultsSocketV2
) => {
    const socket = makeSocket();
    socket.on("connect", () => {
        console.log("connected to responses");
        socket.emit("survey_responses_subscribe", {
            surveyId,
        });
    });

    socket.on("survey_responses_updated", (rawData: any) => {
        if (!_.isNull(rawData)) {
            const rawResponses: any[] = rawData.Data;
            if (rawData.status === "ERROR" || _.isUndefined(rawResponses)) {
                socket.emit("survey_responses_unsubscribe", { surveyId });
                onFail(socket);
            }
            console.log("Raw data ", rawResponses);
            const results = rawResponses.map((rawResults) => {
                const response: SurveyResponse = {
                    userId: rawResults["user_id"],
                    id: rawResults["question_id"],
                    score: rawResults["score"],
                    justification: rawResults["justification"],
                    questionNumber: rawResults["question_num"],
                };

                return response;
            });
            callback(results);
        }
    });
    return socket;
};
