// import { useState } from 'react';
import { shuffleArray } from "./utils";
// https://opentdb.com/api.php?amount=10&category=11&difficulty=hard&type=multiple
// import axios from "axios";
const baseUrl = "https://opentdb.com";
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionsState = Question & { answers: string[] };
export const fetchQuizQuestions = async (
  amount: number,
  category: number,
  difficulty: string,
  type: string
): Promise<QuestionsState[]> => {
  if (type === "any") {
    const endpoint = `${baseUrl}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
    const data = await (await fetch(endpoint)).json();
    console.log(data.results);
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } else {
    const endpoint = `${baseUrl}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    const data = await (await fetch(endpoint)).json();
    console.log(data.results);
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  }
};
