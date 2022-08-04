import * as React from "react";
import "./QuestionsAndAnswers.css";
import uniqid from "uniqid";
import Question from "../Question/Question";
import getQuestions, { GetQuestionsProps } from "../../services/getQuestions";
import { toast } from "react-toastify";

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

			return setQnaArray(
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		if (QnaArray.length !== 0 && allQuestionsAnswered) {
			let correctAnswers = 0;

			QnaArray.forEach((question: any) => {
				if (question.correct_answer === question.selectedAnswer) correctAnswers++;
			});

			setCorrectAnswersCount(correctAnswers);
			setCheckAnswerBtn(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [QnaArray]);

	const checkAnswer = () => {
		if (allQuestionsAnswered) {
			setIsGameOver(true);

			setQnaArray((prevQnaArray: any) => prevQnaArray.map((question: any) => ({ ...question, showAnswer: true })));
		}
		console.log(QnaArray);
	};

	const resetGame = () => {
		setCheckAnswerBtn(false);
		setIsGameOver(false);
		startQuizHandler();
	};

	const clickHandler = (id: any, answer: any) => {
		if (!isGameOver) {
			setQnaArray((prevQuestionsArray: any) =>
				prevQuestionsArray.map((question: any) =>
					question.id === id ? { ...question, selectedAnswer: answer } : question
				)
			);
		}
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
				<div className="answers-bottom-container">
					{isGameOver && <h3>You scored {correctAnswersCount}/5 correct answers</h3>}
					<button onClick={isGameOver ? resetGame : checkAnswer}>{isGameOver ? "Play again" : "Check answers"}</button>
				</div>
			</div>
		</>
	);
};

export default QuestionsAndAnswers;
