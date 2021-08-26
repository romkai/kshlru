import { debounce } from 'lodash';
import VueStore from 'vue-class-store';
import api from '@/api/api';
import { FavoritesAction, HelperItem, HistoryItem } from '@/store/news/types/newsTypes';
import { News } from '@/api/fetchNews/types/newsTypes';
import countOccurences from '@/store/news/helpers/countOccurrences';
import sorterFunc from '@/store/news/helpers/sorterFunc';

@VueStore
class NewsStore {
	
	public items: News[] = [];
	public favoritesIds: number[] = [];
	public search = '';
	public desc = true;
	public lazySearch = '';
	public loading = false;
	public history: HistoryItem[] = [];
	
	public fetchData(): void {
		this.loading = true;
		this.items = [];
		this.history = [];
		api.fetchNews()
			.then((items) => this.items = items)
			.catch((err: Error) => console.log(err))
			.finally(() => this.loading = false);
	}
	
	public toggleItem(item: News): void {
		const { id, name } = item;
		const index = this.favoritesIds.indexOf(id);
		index === -1
			? this.favoritesIds.push(id)
			: this.favoritesIds.splice(index, 1);
		const action = (index === -1) ? FavoritesAction.ADD_TO_FAVORITES : FavoritesAction.REMOVE_FROM_FAVORITES;
		const dtm = new Date().toISOString() + Math.round(Math.random() * 1000);
		this.history.push({ id, name, action, dtm })
	}
	
	public clearFavorites() {
		this.favoritesItems.forEach(item => this.toggleItem(item));
	}
	
	get occurrencesHelper(): HelperItem[] {
		const helper: HelperItem[] = [];
		this.items.forEach((item, index) => helper.push({
			index, occurences: countOccurences(item, this.lazySearch)
		}));
		return [...helper].sort(sorterFunc(this.desc));
	}
	
	get favoritesItems() {
		return this.items.filter(item => this.favoritesIds.includes(item.id));
	}
	
	get filteredItems(): News[] {
		return this.occurrencesHelper
			.filter(helperItem => helperItem.occurences > 0 && !this.favoritesIds.includes(this.items[helperItem.index].id))
			.map(helperItem => this.items[helperItem.index]);
	}
	
	public clearHistory(): void {
		this.history = [];
	}
	
	private updateSearch() {
		this.lazySearch = (this.search || '').trim().toLocaleLowerCase();
	}
	public debouncedUpdateSearch = debounce(this.updateSearch, 100);
	'on:search' (): void {
		this.debouncedUpdateSearch();
	}
	
}

export const newsStore = new NewsStore();
newsStore.fetchData();
