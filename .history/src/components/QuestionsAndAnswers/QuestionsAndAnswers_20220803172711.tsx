import * as React from "react";
import "./QuestionsAndAnswers.css";
import uniqid from "uniqid";
import Question from "../Question/Question";
import getQuestions, { GetQuestionsProps } from "../../services/getQuestions";

interface IQuestionsAndAnswersProps {
	quizOptions: GetQuestionsProps;
	startQuizHandler: () => void;
	handleNoQuestionsError: (boolean: any) => void;
}

const QuestionsAndAnswers: React.FunctionComponent<IQuestionsAndAnswersProps> = ({
	quizOptions,
	startQuizHandler,
	handleNoQuestionsError,
}) => {
	const [QnaArray, setQnaArray] = React.useState([]);
	const [checkAnswerBtn, setCheckAnswerBtn] = React.useState(false);
	const [correctAnswersCount, setCorrectAnswersCount] = React.useState(0);
	const [isGameOver, setIsGameOver] = React.useState(false);

	const allQuestionsAnswered = QnaArray.every((question: any) => question.selectedAnswer !== "");

	React.useEffect(() => {
		getQuestions(quizOptions).then((questions) => {
			if (questions.length === 0) {
				startQuizHandler();
				handleNoQuestionsError(true);
				return;
			} else {
				handleNoQuestionsError(false);
			}

			setQnaArray(
				questions.map((question: any) => {
					return {
						...question,
						id: uniqid(),
						selectedAnswer: "",
						showAnswer: false,
					};
				})
			);
		});
	}, []);

	const checkAnswer = () => {
		if (allQuestionsAnswered) {
			setIsGameOver(true);

			setQnaArray((prevQnaArray: any) => prevQnaArray.map((question: any) => ({ ...question, showAnswer: true })));
		}
		console.log(QnaArray);
	};

	const resetGame = () => {
		setCheckAnswerBtn
	}

	const clickHandler = (id: any, answer: any) => {
		console.log(id, answer);
	};

	const questionElements = QnaArray.map(
		(question: {
			showAnswer: string;
			selectedAnswer: string;
			difficulty: string;
			category: string;
			incorrect_answers: string[];
			correct_answer: string;
			question: string;
			id: string;
		}) => (
			<Question
				key={question.id}
				id={question.id}
				question={question.question}
				correctAnswer={question.correct_answer}
				incorrectAnswer={question.incorrect_answers}
				difficulty={question.difficulty}
				category={question.category}
				selectedAnswer={question.selectedAnswer}
				showAnswer={question.showAnswer}
				handleSelectAnswer={clickHandler}
			/>
		)
	);

	return (
		<>
			<div className="answers-container">
				{questionElements}
				{isGameOver && <h3>You scored {correctAnswersCount}/5 correct answers</h3>}

				<button onClick={isGameOver ? resetGame : checkAnswer}>{isGameOver ? "Play again" : "Check answers"}</button>
			</div>
		</>
	);
};

export default QuestionsAndAnswers;
