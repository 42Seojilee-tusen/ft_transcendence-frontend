import Component from "../../core/Component.js";

export default class UpdateError extends Component {

	template() {
		if (this.$props === "name") {
			return `
				사용할 수 없는 이름 입니다.
			`
		} else if (this.$props === "image") {
			return `
				사용할 수 없는 이미지 입니다.
			`
		} else {
			return ;
		}
	}
}
