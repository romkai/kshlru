import { HelperItem } from '@/store/news/types/newsTypes';

export default (desc: boolean) => (a: HelperItem, b: HelperItem): number => {
	if (desc) return b.occurences - a.occurences;
	return a.occurences - b.occurences;
}
