import React, { useEffect, useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// types
import { QuestionsState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import Header from "./components/Header";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// const TOTAL_QUESTIONS = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [startB, setStartB] = useState(true);
  // const [categori, setCategori] = useState(["Any Category", ])
  const [qNumber, setQNumber] = useState("");
  const [qCategory, setQCategory] = useState("");
  const [qDifficulty, setQDifficulty] = useState("");
  const [qType, setQType] = useState("");
  useEffect(() => {
    if (
      qNumber !== "" &&
      qCategory !== "" &&
      qDifficulty !== "" &&
      qType !== ""
    ) {
      setStartB(false);
    }
  }, [qNumber, qCategory, qDifficulty, qType]);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      Number(qNumber),
      Number(qCategory),
      qDifficulty,
      qType
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === Number(qNumber)) {
      setGameOver(true);
      setNumber(0);
    } else {
      setNumber(nextQ);
    }
  };
  const handleSelectGategory = (event: any) => {
    console.log(event.target.value);
    setQCategory(event.target.value);
  };

  const handleSelectDifficulty = (event: any) => {
    console.log(event.target.value);
    setQDifficulty(event.target.value);
  };

  const handleSelectType = (event: any) => {
    console.log(event.target.value);
    setQType(event.target.value);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {/* {!gameOver ? (
          <div> */}
          <Header />
        {gameOver /*|| userAnswers.length === Number(qNumber)*/ ? (
          <Form onSubmit={startTrivia}>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label className="q-label">Question Number</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setQNumber(e.target.value);
                    // console.log(e.target.value);
                  }}
                  min="0"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="q-label">Select Category</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  // onChange={(event) => {
                  //   // setQCategory(this)
                  //   console.log(event.target.value);
                  // }}
                  onChange={handleSelectGategory}
                >
                  <option>Choose...</option>
                  <option value="any">Any Category</option>
                  <option value="9">General Knowledge</option>
                  <option value="10">Entertainment: Books</option>
                  <option value="11">Entertainment: Film</option>
                  <option value="12">Entertainment: Music</option>
                  <option value="13">
                    Entertainment: Musicals &amp; Theatres
                  </option>
                  <option value="14">Entertainment: Television</option>
                  <option value="15">Entertainment: Video Games</option>
                  <option value="16">Entertainment: Board Games</option>
                  <option value="17">Science &amp; Nature</option>
                  <option value="18">Science: Computers</option>
                  <option value="19">Science: Mathematics</option>
                  <option value="20">Mythology</option>
                  <option value="21">Sports</option>
                  <option value="22">Geography</option>
                  <option value="23">History</option>
                  <option value="24">Politics</option>
                  <option value="25">Art</option>
                  <option value="26">Celebrities</option>
                  <option value="27">Animals</option>
                  <option value="28">Vehicles</option>
                  <option value="29">Entertainment: Comics</option>
                  <option value="30">Science: Gadgets</option>
                  <option value="31">
                    Entertainment: Japanese Anime &amp; Manga
                  </option>
                  <option value="32">
                    Entertainment: Cartoon &amp; Animations
                  </option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="q-label">Select Difficulty</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={handleSelectDifficulty}
                >
                  <option>Choose...</option>
                  <option value="any">Any Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label className="q-label">Select Type</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={handleSelectType}
                >
                  <option>Choose...</option>
                  <option value="any">Any Type</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="boolean">True / False</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Button
              disabled={startB}
              variant="primary"
              type="submit"
              className="start"
            >
              Start
            </Button>
          </Form>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={Number(qNumber)}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== Number(qNumber) ? (
          <button className="next" onClick={nextQuestion}>
            {number === Number(qNumber) - 1 ? "Done" : "Next Question"}
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;

// ({number === Number(qNumber) ? (
//   <button className="next" onClick={nextQuestion}>
//   Done
// </button>
// ) : null})