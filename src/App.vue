<template>
	<v-app>
		<AppHeader></AppHeader>
		<v-main>
			<v-container class="main__container">
				<router-view/>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/template/AppHeader.vue';

@Component({
	components: {
		AppHeader,
	},
})
export default class app extends Vue {

}
</script>

<style lang="scss">
.main__container {
	height: calc(100vh - 48px);
}
</style>
