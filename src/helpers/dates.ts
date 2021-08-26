export function dateStr(dt: string): string {
	return `${dt.slice(8, 10)}/${dt.slice(5, 7)}/${dt.slice(0, 4)} ${dt.slice(11, 16)}`;
}
