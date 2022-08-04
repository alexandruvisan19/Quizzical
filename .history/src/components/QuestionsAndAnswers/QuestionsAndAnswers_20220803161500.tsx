import * as React from "react";
import { Shuffle } from "../../helpers/Shuffle";
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
	const [correctAnswer, setCorrectAnswer] = React.useState(false);
	const [count, setCount] = React.useState(0);

	React.useEffect(() => {
		getQuestions(quizOptions).then((questions) => {
			console.log(questions);
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
	}, []);

	const clickHandler = (id: any, answer: any) => {
		console.log(id, answer);
	};

	
	const questionElements = QnaArray.map((question: {
		correct_answer: string;
		question: string; id: string; 
}) => (
		<Question key={question.id} id={question.id} question={question.question} correctAnswer={question.correct_answer} />
	))

	return (
		<>
			<div className="answers-container">
				{questionElements}
				{correctAnswer ? (
					<>
						<p>You Scored {count}/5 correct answers</p>
						<button>Play Again</button>
					</>
				) : (
					<button>Check Answers</button>
				)}
			</div>
		</>
	);
};

export default QuestionsAndAnswers;
