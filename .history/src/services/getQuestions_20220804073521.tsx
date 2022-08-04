export interface GetQuestionsProps {
	category?: string;
	difficulty?: string;
	type?: string;
}

const getQuestions = async ({ category, difficulty, type }: GetQuestionsProps) => {
	let categoryQueryParam = "";
	let difficultyQueryParam = "";
	let typeQueryParam = "";

	if (category !== "") categoryQueryParam = `&category=${category}`;

	if (difficulty !== "") difficultyQueryParam = `&difficulty=${difficulty}`;

	if (type !== "") typeQueryParam = `&type=${type}`;

	let apiUrl = `https://opentdb.com/api.php?amount=5${categoryQueryParam}${difficultyQueryParam}${typeQueryParam}`;

	const res = await fetch(apiUrl);
	const data = await res.json();
	return data.results;
};

export default getQuestions;
