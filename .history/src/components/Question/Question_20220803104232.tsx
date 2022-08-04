import * as React from "react";

interface IQuestionProps {
	question: string;
}

const Question: React.FunctionComponent<IQuestionProps> = ({ question }) => {
	return <h2 key={question}>{question}</h2>;
};

export default Question;
