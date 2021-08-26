import { News } from '@/api/fetchNews/types/newsTypes';
import { LoremIpsum } from "lorem-ipsum";

// import axios from 'axios';
// export default function fetchNews(): Promise<News[]> {
//	url = 'https://..........';
// 	return axios.get<News[]>(url);
// }

export default function fetchNews(): Promise<News[]> {
	const news = generateMockNews();
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(news);
		}, 500);
	})
}

function generateMockNews(itemsCount = 1000): News[] {
	const arr: News[] = [];
	let id = 0;
	for (let i = 0; i < itemsCount; i++) {
		const wordsCount = Math.round(Math.random() * 3) + 2;
		const words = lorem.generateWords(wordsCount);
		const subItems = words.split(' ').map((word) => ({
			id: ++id,
			name: word,
		}));
		arr.push({
			id: ++id,
			name: lorem.generateSentences(1),
			items: subItems,
		});
	}
	return arr;
}

const lorem = new LoremIpsum({
	sentencesPerParagraph: { max: 8, min: 4 },
	wordsPerSentence: { max: 8, min: 4 },
});

