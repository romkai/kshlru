<template>
	<v-row class="wrapper">
		<v-col cols="12" class="section">
			<div class="section__header">
				<div class="section__header-title">История</div>

				<div class="history__toggle">
					<v-btn-toggle
						v-model="toggle_exclusive"
						mandatory
						color="info"
					>
						<v-btn small to="/history/all">История</v-btn>
						<v-btn small to="/history/added">История добавлений</v-btn>
						<v-btn small to="/history/removed">История удалений</v-btn>
					</v-btn-toggle>
				</div>
			</div>
			<div class="section__content">
				<v-row class="text-body-2">
					<v-col cols="2">Дата</v-col>
					<v-col cols="1" class="text-center">Действие</v-col>
					<v-col cols="1">ID</v-col>
					<v-col>Наименование</v-col>
				</v-row>
				<v-divider class="mb-1"></v-divider>
				<div class="scroll-wrapper">
					<div
							v-if="filteredHistory.length === 0"
							class="no-data"
					>Нет событий в истории</div>
					<RecycleScroller
							v-else
							class="virtual-scroller"
							:items="filteredHistory"
							:item-size="40"
							key-field="dtm"
							v-slot="{ item }"
					>
						<v-row class="text-body-2">
							<v-col cols="2">{{ dateStr(item.dtm) }}</v-col>
							<v-col cols="1" class="text-center">
								<v-icon
										:color="getActionText(item.action).color"
								>
									{{ getActionText(item.action).icon }}
								</v-icon>
							</v-col>
							<v-col cols="1">{{ item.id }}</v-col>
							<v-col>{{ item.name }}</v-col>
						</v-row>
					</RecycleScroller>
				</div>
			</div>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { newsStore } from '@/store/news/NewsStore';
import { FavoritesAction, HistoryItem } from '@/store/news/types/newsTypes';
import { dateStr } from '@/helpers/dates';

@Component
export default class History extends Vue {
	model = newsStore;
	toggle_exclusive = undefined;
	dateStr = dateStr;

	get mode(): string {
		return this.$route.params.mode;
	}

	get filteredHistory(): HistoryItem[] {
		if (this.mode === 'added') return this.model.history.filter(item => item.action === FavoritesAction.ADD_TO_FAVORITES);
		if (this.mode === 'removed') return this.model.history.filter(item => item.action === FavoritesAction.REMOVE_FROM_FAVORITES);
		return [...this.model.history];
	}

	getActionText(action: FavoritesAction): Record<string, string> {
		if (action === FavoritesAction.REMOVE_FROM_FAVORITES) return { icon: 'mdi-arrow-left-circle-outline', color: 'error' };
		return { icon: 'mdi-arrow-right-circle-outline', color: 'success' };
	}
}
</script>

<style lang="scss" scoped>
.history {

	&__toggle {
		margin-left: auto;
	}
}
</style>
