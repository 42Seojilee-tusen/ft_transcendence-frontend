import Component from "../core/Component.js";

export default class MyInfo extends Component {

	template() {
		return `
		<div class="mt-4 mt-md-5 mt-lg-5 mb-4 mb-md-5 mb-lg-5">
			<img src="../../img/testMyPage.jpeg" class="img-fluid w-100" alt="junhapar">
		</div>
		<div class="mb-4 mb-md-5 mb-lg-5 text-break">
			junhapar
		</div>
		<div class="mb-4 mb-md-5 mb-lg-5 text-break">
			junhapar@student.42seoul.kr
		</div>
		<div class="mb-4 mb-md-5 mb-lg-5">
			개인정보 변경
		</div>
		`;
	}

	mounted() {

	}
}
