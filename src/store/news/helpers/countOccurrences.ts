import { News } from '@/api/fetchNews/types/newsTypes';

function occurences(str: string, subStr: string, allowOverlapping = false): number {
	if (subStr.length <= 0) return str.length + 1;
	let n = 0;
	let pos = 0;
	const step = allowOverlapping ? 1 : subStr.length;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		pos = str.indexOf(subStr, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
}

export default function countOccurences(item: News, lcSearch: string): number {
	return occurences(item.name.toLocaleLowerCase(), lcSearch) +
		item.items.reduce((sum, subItem) => sum + occurences(subItem.name.toLocaleLowerCase(), lcSearch), 0);
}
