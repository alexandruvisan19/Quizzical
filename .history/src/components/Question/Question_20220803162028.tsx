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

const Question: React.FunctionComponent<QuestionProps> = ({ question }) => {
	return <h2></h2>;
};

export default Question;
