import * as React from "react";

interface QuestionProps {
	id: string;
	question: string;
	correctAnswer: string;
	incorrectAnswer: string;
	difficulty: string;
	category: string;
	selectedAnswer: string;
	showAnswer: string;
	handleSelectAnswer: (id: any, answer: any) => void;
}

const Question: React.FunctionComponent<QuestionProps> = ({ question, correctAnswer, incorrectAnswer, difficulty, category }) => {
	const incorrectAnswersElems = 


	return <h2>{question}</h2>;
};

export default Question;
