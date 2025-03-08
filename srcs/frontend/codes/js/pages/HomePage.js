import Component from "../core/Component.js";
import MoveButton from "../componenets/MoveButton.js";
import ModalButton from "../componenets/ModalButton.js";

export default class HomePage extends Component {
	template() {
		return `
		<div class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="row">
				<div class="col"></div>
				<div class="col-6">
					<div data-component="multiButton" class="mb-4 mb-md-5 mb-lg-5"></div>
					<div data-component="mypageButton" class="mb-4 mb-md-5 mb-lg-5"></div>
				</div>
				<div class="col"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $multi = this.$target.querySelector('[data-component="multiButton"]');
		const $mypage = this.$target.querySelector('[data-component="mypageButton"]');
		new ModalButton($multi, {name: "멀티 플레이", color: "btn-green", fontSize: "fs-2" });
		new MoveButton($mypage, {name: "마이 페이지", href: "#/mypage", color: "btn-green", fontSize: "fs-2" });
	}
}
