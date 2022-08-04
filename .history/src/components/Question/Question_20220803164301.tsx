import * as React from "react";
import { decode } from "html-entities";

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
	id,
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
		${showAnswer && selectedAnswer === answer && "question-btn-incorrect"}`;

		return (
			<button key={id} className={incorrectAnswerClassName} onClick={() => handleSelectAnswer(id, answer)}>
				{decode(answer)}
			</button>
		);
	});

	return (
		<>
			<h2>{decode(question)}</h2>
			{incorrectAnswersElems}
		</>
	);
};

export default Question;
