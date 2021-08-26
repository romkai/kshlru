<template>
<div> История
	<div
		v-for="item in filteredHistory"
		:key="item.dtm"
	>
		{{ item.dtm }} {{ getActionText(item.action) }}  {{ item.id }} {{ item.name }}
	</div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { newsStore } from '@/store/news/NewsStore';
import { FavoritesAction, HistoryItem } from '@/store/news/types/newsTypes';

@Component
export default class History extends Vue {
	model = newsStore;

	get mode(): string {
		return this.$route.params.mode;
	}

	get filteredHistory(): HistoryItem[] {
		if (this.mode === 'added') return this.model.history.filter(item => item.action === FavoritesAction.ADD_TO_FAVORITES);
		if (this.mode === 'removed') return this.model.history.filter(item => item.action === FavoritesAction.REMOVE_FROM_FAVORITES);
		return this.model.history;
	}

	getActionText(action: FavoritesAction): string {
		if (action === FavoritesAction.REMOVE_FROM_FAVORITES) return '<---';
		return '--->';
	}
}
</script>

