<template>
	<v-row class="wrapper">
		<v-col cols="6" class="section">
			<div class="section__header">
				<div class="section__header-title">Список элементов</div>

				<div class="home__search">
					<v-text-field
							v-model="model.search"
							prepend-inner-icon="mdi-magnify"
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
								label="Сортировать по убыванию"
								class="mt-0 pt-0"
								dense
								hide-details
						></v-switch>
					</v-col>
					<v-col>
						<div class="home__item-info">
							Показано записей: <span>{{ model.filteredItems.length }}</span> из <span>{{ model.items.length }}</span>
						</div>
					</v-col>
				</v-row>
				<v-divider></v-divider>

				<div class="scroll-wrapper">
					<v-virtual-scroll
						bench="2"
						:items="model.filteredItems"
						height="300"
						item-height="64"
					>
						<template v-slot:default="{ item }">
							<div>{{ item.name }}</div>
						</template>
					</v-virtual-scroll>

<!--						<div-->
<!--								v-for="item in model.filteredItems"-->
<!--								:key="item.id"-->
<!--								@click="model.toggleItem(item)"-->
<!--						>-->
<!--							<div v-html="wrapText(item.name, model.lazySearch)"></div>-->
<!--							<div class="text-caption"><i v-html="wrapText(getItemDetails(item), model.lazySearch)" ></i></div>-->
<!--						</div>-->
				</div>
			</div>
		</v-col>
		<v-col cols="6">
			<v-btn v-if=" model.favoritesItems.length>0" @click="model.clearFavorites()" >Очистить избранное</v-btn>
			<div>Всего в избранном: {{ model.favoritesItems.length }}</div>
			<div
				v-for="item in model.favoritesItems"
				:key="item.id"
				@click="model.toggleItem(item)"
			>
				<div>{{ item.name }}</div>
				<div class="text-caption"><i>{{ getItemDetails(item) }}</i></div>
			</div>
		</v-col>
	</v-row>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { newsStore } from '@/store/news/NewsStore';
import wrapFilteredText from '@/helpers/wrapFilteredText';
import { News } from '@/api/fetchNews/types/newsTypes';

@Component
export default class Home extends Vue {
	model = newsStore;
	wrapText = wrapFilteredText;

	getItemDetails(item: News): string {
		return item.items.map(subItem => subItem.name).join(', ');
	}
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

