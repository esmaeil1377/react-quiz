import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
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
}

export default App;
