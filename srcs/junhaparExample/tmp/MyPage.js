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
					<div data-component="backButton" class="row m-2 text-truncate">
					</div>
				</div>
				<div id="my-MatchHistories" class="col-7 d-flex flex-column align-content-center text-center text-break">
				</div>
				<div class="col-1">
				</div>
				<div id="my-Info" class="col-3 d-flex flex-column align-content-center text-center text-break">
				</div>
			</div>
		</div>
		`;
	}

	mounted() {
		// backButton
		const $homeBtn = document.querySelector('[data-component="backButton"]');
		new MoveButton($homeBtn, {name: "<-", href:"#/", color:"btn-white"});

		// 전적 및 역대 경기 기록
		const $myMatchHistory = document.querySelector('#my-MatchHistories');
		new MyMatchHistory($myMatchHistory);

		// 로그인한 유저의 image, name, email, match-history-btn, 정보변경-btn
		const $myInfo = document.querySelector('#my-Info');
		new MyInfo($myInfo);
	}
}
