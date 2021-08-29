import Vue from 'vue';
import Vuetify from 'vuetify';
import CustomCard from '@/components/template/CustomCard.vue';
import { createLocalVue, mount } from '@vue/test-utils';

Vue.use(Vuetify);

describe('CustomCard.vue', () => {
	const localVue = createLocalVue();
	let vuetify: any;
	
	beforeEach(() => {
		vuetify = new Vuetify();
	});
	
	it('should have a custom title and match snapshot', () => {
		const wrapper = mount(CustomCard, {
			localVue,
			vuetify,
			propsData: { title: 'Foobar' },
		});
		
		// With jest we can create snapshot files of the HTML output
		expect(wrapper.html()).toMatchSnapshot();
		
		// We could also verify this differently
		// by checking the text content
		const title = wrapper.find('.v-card__title > span');
		
		expect(title.text()).toBe('Foobar');
	});
	
	it('should emit an event when the action v-btn is clicked', () => {
		const wrapper = mount(CustomCard, {
			localVue,
			vuetify,
			propsData: { title: 'Foobar' },
		});
		
		const event = jest.fn();
		const button = wrapper.find('.v-btn');
		
		// Here we bind a listener to the wrapper
		// instance to catch our custom event
		// https://vuejs.org/v2/api/#Instance-Methods-Events
		wrapper.vm.$on('action-btn:clicked', event);
		
		expect(event).toHaveBeenCalledTimes(0);
		
		// Simulate a click on the button
		button.trigger('click');
		button.trigger('click');
		
		// Ensure that our mock event was called
		expect(event).toHaveBeenCalledTimes(2);
	});
});
