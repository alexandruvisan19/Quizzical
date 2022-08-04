import React, { useEffect, useState } from "react";
import "./App.css";
import QuestionsAndAnswers from "./components/QuestionsAndAnswers/QuestionsAndAnswers";


function App() {
	const [startQuiz, setStartQuiz] = useState(false);
	const [showNoQuestionsError, setShowNoQuestionsError] = useState(false);
	const [quizOptions, setQuizOptions] = useState({
		category: "",
		difficulty: "",
		type: "",
	});

	const startQuizHandler = () => setStartQuiz((prevStartQuiz) => !prevStartQuiz);

	const handleNoQuestionsError = (boolean: any) => setShowNoQuestionsError(boolean);

	const changeQuizHandler = (e: any) => {
		setQuizOptions((prevQuizOptions) => {
			return { ...prevQuizOptions, [e.target.name]: e.target.value };
		});
	};

	console.log(quizOptions);
	toast.error("OH NO ERROR");

	return (
		<div className="App">
			{startQuiz ? (
				<QuestionsAndAnswers
					quizOptions={quizOptions}
					startQuizHandler={startQuizHandler}
					handleNoQuestionsError={handleNoQuestionsError}
				/>
			) : (
				<section className="game-intro">
					<h1 className="game-title">Quizzical</h1>
					<p className="game-text">Answer the questions and test your knowledge!</p>

					{showNoQuestionsError && (
						<h2 className="noQuestions-text">Oops! We couldn't find any questions with these options!</h2>
					)}

					<div className="gameOptions-container">
						<div className="select-container">
							<label className="custom-label" htmlFor="category">
								Category:
							</label>

							<select onChange={changeQuizHandler} name="category" id="category" className="custom-select">
								<option value="">Any Category</option>
								<option value="9">General Knowledge</option>
								<option value="10">Entertainment: Books</option>
								<option value="11">Entertainment: Film</option>
								<option value="12">Entertainment: Music</option>
								<option value="13">Entertainment: Musicals &amp; Theatres</option>
								<option value="14">Entertainment: Television</option>
								<option value="15">Entertainment: Video Games</option>
								<option value="16">Entertainment: Board Games</option>
								<option value="17">Science &amp; Nature</option>
								<option value="18">Science: Computers</option>
								<option value="19">Science: Mathematics</option>
								<option value="20">Mythology</option>
								<option value="21">Sports</option>
								<option value="22">Geography</option>
								<option value="23">History</option>
								<option value="24">Politics</option>
								<option value="25">Art</option>
								<option value="26">Celebrities</option>
								<option value="27">Animals</option>
								<option value="28">Vehicles</option>
								<option value="29">Entertainment: Comics</option>
								<option value="30">Science: Gadgets</option>
								<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
								<option value="32">Entertainment: Cartoon &amp; Animations</option>
							</select>
						</div>

						<div className="select-container">
							<label className="custom-label" htmlFor="difficulty">
								Difficulty:
							</label>

							<select onChange={changeQuizHandler} name="difficulty" id="difficulty" className="custom-select">
								<option value="">Any Difficulty</option>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</select>
						</div>

						<div className="select-container">
							<label className="custom-label" htmlFor="type">
								Type of questions:
							</label>

							<select onChange={changeQuizHandler} name="type" id="type" className="custom-select">
								<option value="">Any Type</option>
								<option value="multiple">Multiple Choice</option>
								<option value="boolean">True / False</option>
							</select>
						</div>
					</div>

					<button onClick={startQuizHandler} className="btn-primary">
						Start Quiz
					</button>
				</section>
			)}
		</div>
	);
}

export default App;
function setShowNoQuestionsError(boolean: any) {
	throw new Error("Function not implemented.");
}
