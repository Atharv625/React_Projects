import Header from "./Header";
import Main from "./Component/Main";
import Loader from "./Component/Loader";
import Error from "./Component/Error";
import StartScreen from "./Component/StartScreen";
import NextButton from "./Component/NextButton";
import Question from "./Component/Question";
import Progress from "./Component/Progress";
import { useEffect, useReducer } from "react";
import EndScreen from "./Component/EndScreen";
import Timer from "./Component/Timer";
const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
         secondsRemaining:
      state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      const isLastQuestion = state.index === state.questions.length - 1;

      return {
        ...state,
        index: isLastQuestion ? state.index : state.index + 1,
        status: isLastQuestion ? "finished" : state.status,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
  return {
    ...initialState,
    questions: state.questions,
    status: "ready",
  };
      case "tick":
  return {
    ...state,
    secondsRemaining: state.secondsRemaining - 1,
    status:
      state.secondsRemaining === 1
        ? "finished"
        : state.status,
  };
    default:
      throw new Error("Action");
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
 const maxPossiblePoints = state.questions.reduce(
   (prev, cur) => prev + cur.points,
   0,
 );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen
            numQuestions={state.questions.length}
            dispatch={dispatch}
          />
        )}{" "}
        {state.status === "active" && (
          <>
            <Progress
              index={state.index}
              numQuestions={state.questions.length}
              points={state.points}
              maxPossible={maxPossiblePoints}
              answer={state.answer}
            />{" "}
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={state.secondsRemaining}
              />
              <NextButton
                dispatch={dispatch}
                answer={state.answer}
                index={state.index}
                numQuestions={state.questions.length}
              />{" "}
            </footer>
          </>
        )}{" "}
        {state.status === "finished" && (
          <EndScreen
            points={state.points}
            maxPossible={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
