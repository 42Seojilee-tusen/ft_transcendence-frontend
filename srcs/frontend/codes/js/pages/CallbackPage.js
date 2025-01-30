import Component from "../core/Component.js";

export default class Callback extends Component {
	setup() {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		this.$state = {
			code: code,
		};
	}

	template() {
		const { code } = this.$state;
		return `
		<div>callback: ${code}</div>
		`;
	}

	mounted() {
		localStorage.setItem("username", "Sample");
		window.location.href = './#';
	}
}
