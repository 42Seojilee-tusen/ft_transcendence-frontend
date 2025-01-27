import Component from "../core/Component.js";
import MoveButton from "../componenets/MoveButton.js";
import ModalButton from "../componenets/ModalButton.js";

export default class Home extends Component {
	template() {
		return `
		<div class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="row">
				<div class="col"></div>
				<div class="col-6">
					<div data-component="localButton" class="mt-4 mt-md-5 mt-lg-5 mb-4 mb-md-5 mb-lg-5"></div>
					<div data-component="multiButton" class="mb-4 mb-md-5 mb-lg-5"></div>
					<div data-component="friendButton" class="mb-4 mb-md-5 mb-lg-5"></div>
					<div data-component="mypageButton" class="mb-4 mb-md-5 mb-lg-5"></div>
				</div>
				<div class="col"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $local = this.$target.querySelector('[data-component="localButton"]');
		const $multi = this.$target.querySelector('[data-component="multiButton"]');
		const $friend = this.$target.querySelector('[data-component="friendButton"]');
		const $mypage = this.$target.querySelector('[data-component="mypageButton"]');
		new MoveButton($local, {name: "로컬 플레이", href: "#/local", });
		new ModalButton($multi, {name: "멀티 플레이" });
		new MoveButton($friend, {name: "친구 관리", href: "#/friend", });
		new MoveButton($mypage, {name: "마이 페이지", href: "#/mypage", });
	}
}