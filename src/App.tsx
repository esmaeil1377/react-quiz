import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GlobalStyle, Wrapper } from "./App.styles";
import { Form, Row, Col, Button } from "react-bootstrap";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

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
  const handleSelectGategory = (event: any) => {
    console.log(event.target.value);
    setQCategory(event.target.value);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver ? (
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
      </Wrapper>
    </>
  );
};

export default App;
