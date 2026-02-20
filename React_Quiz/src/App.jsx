import Header from "./Header";
import Main from "./Component/Main";
import Loader from "./Component/Loader";
import Error from "./Component/Error";
import StartScreen from "./Component/StartScreen";
import NextButton from "./Component/NextButton";
import Question from "./Component/Question";
import Progress from "./Component/Progress";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error("Action");
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
            />{" "}
            <Question
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <NextButton dispatch={dispatch} answer={state.answer} />
          </>
        )}{" "}
      </Main>
    </div>
  );
};

export default App;
