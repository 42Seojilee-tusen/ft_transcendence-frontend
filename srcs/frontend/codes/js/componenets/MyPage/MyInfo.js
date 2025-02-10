import Component from "../../core/Component.js";
import MoveButton from "../MoveButton.js";

export default class MyInfo extends Component {

	template() {
		return `
		<div class="d-flex">
			<div data-component="homeButton">
			</div>
		</div>
		<div class="my-1 my-md-1 my-lg-2">
			<img src="../../img/testMyPage.jpeg" class="img-fluid w-100" alt="junhapar">
		</div>
		<div class="my-1 my-md-1 my-lg-2">
			junhapar
		</div>
		<div class="my-1 my-md-1 my-lg-2">
			junhapar@student.42seoul.kr
		</div>
		<div data-component="myMatchHistoriesButton" class="my-1 my-md-2 my-lg-3 fs-3">
		</div>
		`;
	}

	mounted() {
		// 홈 버튼
		const $home = this.$target.querySelector('[data-component="homeButton"]');
		new MoveButton($home, {name: "<-", href: "#/", color: "btn-white", fontSize: "fs-5" });

		// 임시 버튼 생성
		const $myMatchHistories = this.$target.querySelector('[data-component="myMatchHistoriesButton"]');

		new MoveButton($myMatchHistories, {name: "내 경기 기록 보기", href: "#/friend", color: "btn-green", fontSize: "fs-4" });
	}
}
