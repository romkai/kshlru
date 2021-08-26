export interface News {
	id: number;
	name: string;
	items: Array<{
		id: number;
		name: string;
	}>;
}
