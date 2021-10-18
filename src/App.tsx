import React from 'react';
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
  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1>REACT QUIZ</h1>

      </Wrapper>
    </>
  );
}

export default App;
