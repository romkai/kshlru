<template>
	<v-app-bar app dense>
		<v-container class="app-bar__container">
			<a href="/">
				<v-img
					class="app-bar__logo"
					:src="require('../../assets/logo.png')"
				></v-img>
			</a>


			<v-tabs class="app-bar__tabs">
				<v-tab to="/">
					<v-icon size="20">mdi-home</v-icon>
					Главная
				</v-tab>
				<v-tab to="/history/all">
					<v-icon size="20">mdi-history</v-icon>
					История
				</v-tab>
			</v-tabs>
		</v-container>
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppHeader extends Vue { }
</script>

<style lang="scss" scoped>
.app-bar {
	&__container {
		display: flex;
		padding-top: 0;
		padding-bottom: 0;
		align-items: center;
	}

	&__logo {
		max-width: 170px;
	}

	&__tabs {
		margin-left: 36px;

		&::v-deep .v-tabs-bar {
			background-color: inherit !important;
		}

		.v-tab {
			text-transform: none;
			padding-top: 4px;

			.v-icon {
				margin-right: 6px;
			}
		}
	}
}
</style>
