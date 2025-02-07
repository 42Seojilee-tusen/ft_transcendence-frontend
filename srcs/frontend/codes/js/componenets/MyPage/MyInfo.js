import Component from "../../core/Component.js";

export default class MyInfo extends Component {

	template() {
		return `
		<div class="my-2 my-md-3 my-lg-4">
			<img src="../../img/testMyPage.jpeg" class="img-fluid w-100" alt="junhapar">
		</div>
		<div class="my-2 my-md-3 my-lg-4">
			junhapar
		</div>
		<div class="my-2 my-md-3 my-lg-4">
			junhapar@student.42seoul.kr
		</div>
		<div class="my-2 my-md-3 my-lg-4">
			개인정보 변경
		</div>
		`;
	}

	mounted() {

	}
}
