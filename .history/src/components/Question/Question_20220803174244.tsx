import * as React from "react";
import { decode } from "html-entities";
import uniqid from "uniqid";
import { Shuffle } from "../../helpers/Shuffle";

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
			<button key={uniqid()} className={incorrectAnswerClassName} onClick={() => handleSelectAnswer(id, answer)}>
				{decode(answer)}
			</button>
		);
	});

	const correctAnswerClassName = `
		${selectedAnswer === correctAnswer ? "question-btn-selected" : "question-btn"}
		${showAnswer && "question-btn-correct"}
	`;

	const correctAnswerElem = (
		<button key={uniqid()} className={correctAnswerClassName} onClick={() => handleSelectAnswer(id, correctAnswer)}>
			{decode(correctAnswer)}
		</button>
	);

	Shuffle(incorrectAnswersElems.push(correctAnswerElem));

	return (
		<>
			<h2>{decode(question)}</h2>
			{incorrectAnswersElems}
		</>
	);
};

export default Question;
