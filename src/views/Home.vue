<template>
	<v-row class="wrapper">
		<v-col cols="6" class="section">
			<div class="section__header">
				<div class="section__header-title">Список новостей</div>

				<div class="home__search">
					<v-text-field
						v-model="model.search"
						prepend-inner-icon="mdi-magnify"
						placeholder="Поиск"
						outlined
						dense
						clearable
						hide-details
					></v-text-field>
				</div>
			</div>

			<div class="section__content">
				<v-row dense align="center">
					<v-col>
						<v-switch
							v-if="!!model.search"
							v-model="model.desc"
							label="Прямая сортировка"
							class="mt-0 pt-0"
							dense
							hide-details
						></v-switch>
					</v-col>
					<v-col>
						<div class="home__item-info">
							Показано: <span>{{ model.filteredItems.length }}</span> из <span>{{ model.items.length }}</span>
						</div>
					</v-col>
				</v-row>
				<v-divider></v-divider>

				<div class="scroll-wrapper">
					<div
						v-if="model.filteredItems.length === 0"
						class="no-data"
					>Не найдены новости</div>
					<NewsList
						v-else
						:items="model.filteredItems"
						:search="model.lazySearch"
						@toggleItem="model.toggleItem($event)"
					></NewsList>
				</div>
			</div>
		</v-col>
		<v-col cols="6" class="section">
			<div class="section__header">
				<div class="section__header-title">Избранные новости</div>
				<v-btn
					v-if="model.favoritesItems.length>0"
					@click="model.clearFavorites()"
					class="ml-auto"
					small
					outlined
				>
					<v-icon size="20" class="mr-2" color="error">mdi-trash-can</v-icon>
					Очистить избранное
				</v-btn>
			</div>
			<div class="section__content">
				<v-row dense align="center">
					<v-col>
						<div class="home__item-info">
							Всего в избранном: <span>{{ model.favoritesItems.length }}</span>
						</div>
					</v-col>
				</v-row>
				<v-divider></v-divider>

				<div class="scroll-wrapper">
					<div
						v-if="model.favoritesItems.length === 0"
						class="no-data"
					>Нет записей в избранном</div>
					<NewsList
						v-else
						:items="model.favoritesItems"
						@toggleItem="model.toggleItem($event)"
						favorites
					></NewsList>
				</div>
			</div>
		</v-col>
	</v-row>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { newsStore } from '@/store/news/NewsStore';
import NewsList from '@/components/global/NewsList.vue';

@Component({
	components: { NewsList },
})
export default class Home extends Vue {
	model = newsStore;
}
</script>

<style lang="scss" scoped>
.home {
	&__search {
		flex: 1 1 40%;
		max-width: 40%;
		margin-left: auto;
		background-color: #fff;
	}

	&__item-info {
		font-size: 0.75rem;
		font-weight: 400;
		line-height: 1.25rem;
		letter-spacing: 0.0333333333em;
		text-align: right;
		height: 24px;

		span {
			color: var(--v-info-base);
		}
	}
}
</style>

