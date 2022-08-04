import * as React from "react";

interface QuestionProps {
	id: string;
	question: string;
	correctAnswer: string;
	incorrectAnswer: string;
	difficulty: string;
	category: 
}

const Question: React.FunctionComponent<QuestionProps> = ({ question }) => {
	return <h2 key={question}>{question}</h2>;
};

export default Question;
