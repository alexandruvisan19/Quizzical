import * as React from "react";

interface QuestionProps {
	question: string;
}

const Question: React.FunctionComponent<QuestionProps> = ({ question }) => {
	return <h2 key={question}>{question}</h2>;
};

export default Question;
