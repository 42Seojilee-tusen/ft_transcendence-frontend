import Component from "../core/Component.js";
import MyInfo from "../componenets/MyPage/MyInfo.js";
import MyMatchHistory from "../componenets/MyPage/MyMatchHistory.js";
import MoveButton from "../componenets/MoveButton.js";

export default class MyPage extends Component {
	template() {
		return `
		<div class="container-fluid min-vw-100">
			<div class="row">
				<div class="col-1 p-0">
					<div class="row m-2 text-truncate" data-component="backButton">
					</div>
				</div>
				<div id="myMatchHistory" class="col-7 d-flex flex-column align-content-center text-center text-break">
				</div>
				<div class="col-1">
				</div>
				<div id="myInfo" class="col-3 d-flex flex-column align-content-center text-center text-break">
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
