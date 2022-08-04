import * as React from "react";

interface QuestionProps {
	id: string;
	question: string;
	correctAnswer: string;
	incorrectAnswer: string[];
	difficulty: string;
	category: string;
	selectedAnswer: string;
	showAnswer: string;
	handleSelectAnswer: (id: any, answer: any) => void;
}

const Question: React.FunctionComponent<QuestionProps> = ({
	question,
	correctAnswer,
	incorrectAnswer,
	difficulty,
	category,
	selectedAnswer,
	showAnswer,
	handleSelectAnswer,
}) => {
	const incorrectAnswersElems = incorrectAnswer.map((answer) => {
		const incorrectAnswerClassName = `
		${selectedAnswer === answer ? "question-btn-selected" : "question-btn"} 
		${
			showAnswer && selectedAnswer === answer && "question-btn-incorrect"
		}`;
	});

	return <h2>{question}</h2>;
};

export default Question;
