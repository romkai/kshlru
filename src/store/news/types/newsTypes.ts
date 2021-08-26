export interface HelperItem {
	index: number;
	occurences: number;
}

export enum FavoritesAction {
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
}

export interface HistoryItem {
	dtm: string;
	id: number;
	name: string;
	action: FavoritesAction;
}
