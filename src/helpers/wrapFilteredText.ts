function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function wrapFilteredText(str: string, substr: string): string {
	if (!substr || substr.length < 2) return str;
	const escapedStr = escapeRegExp(substr);
	return str.replace(new RegExp(`(${escapedStr})`, 'gi'), '<span class=\'secondary lighten-1\'>$1</span>');
}
