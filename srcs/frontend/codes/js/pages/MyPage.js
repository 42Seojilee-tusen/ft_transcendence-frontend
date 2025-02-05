import Component from "../core/Component.js";
import MyInfo from "../componenets/MyInfo.js";
import MyMatchHistory from "../componenets/MyMatchHistory.js";
import MoveButton from "../componenets/MoveButton.js";

export default class MyPage extends Component {
	template() {
		return `
		<div class="container-fluid min-vw-100 min-vh-100">
			<div class="row min-vh-100">
				<div class="col-1 min-vh-100">
					<div data-component="backButton" class="mt-4 mt-md-5 mt-lg-5 mb-4 mb-md-5 mb-lg-5"></div>
				</div>
				<div id="myMatchHistory" class="col-7 min-vh-100 d-flex flex-column justify-content-center text-center">
				</div>
				<div class="col-1 min-vh-100">
				</div>
				<div id="myInfo" class="col-3 min-vh-100 d-flex flex-column justify-content-center text-center">
				</div>
			</div>
		</div>
		`;
	}

	mounted() {
		const $homeBtn = document.querySelector('[data-component="backButton"]');
		const $myInfo = document.querySelector('#myInfo');
		const $myMatchHistory = document.querySelector('#myMatchHistory');
		new MoveButton($homeBtn, {name: "<-", href:"#/", color:"btn-white"});
		new MyInfo($myInfo);
		new MyMatchHistory($myMatchHistory);
	}
}
