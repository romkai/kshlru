<template>
	<RecycleScroller
		class="virtual-scroller"
		:items="items"
		:item-size="68"
		key-field="id"
		v-slot="{ item }"
	>
		<v-list-item>
			<v-list-item-icon>
				<v-avatar :color="favorites ? 'warning' : 'indigo'" size="36">
					<span class="white--text text-h6">{{ item.name.charAt(0) }}</span>
				</v-avatar>
			</v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title v-html="wrapText(item.name, search)"></v-list-item-title>
				<v-list-item-subtitle v-html="wrapText(getItemDetails(item), search)"></v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-icon>
				<v-hover v-slot="{ hover }">
					<v-btn
						@click="$emit('toggleItem', item)"
						icon
					>
						<v-icon :color="getIconColor(hover)">{{ getIcon(hover) }}</v-icon>
					</v-btn>
				</v-hover>
			</v-list-item-icon>
		</v-list-item>
		<v-divider></v-divider>
	</RecycleScroller>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import wrapFilteredText from '@/helpers/wrapFilteredText';
import { News } from '@/api/fetchNews/types/newsTypes';

@Component
export default class NewsList extends Vue {
	@Prop({ type: Array, required: true }) items!: News[];
	@Prop({ type: Boolean, default: false }) favorites!: boolean;
	@Prop({ type: String, default: '' }) search!: string;

	wrapText = wrapFilteredText;

	getItemDetails(item: News): string {
		return item.items.map(subItem => subItem.name).join(', ');
	}

	getIconColor(hover: boolean): string {
		if (this.favorites) return hover ? 'error' : 'secondary';
		return hover ? 'yellow' : 'secondary';
	}

	getIcon(hover: boolean): string {
		if (this.favorites) return hover ? 'mdi-trash-can' : 'mdi-trash-can-outline';
		return hover ? 'mdi-star' : 'mdi-star-outline';
	}
}

</script>
