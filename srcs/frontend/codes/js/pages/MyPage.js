import Component from "../core/Component.js";
import MyProfile from "../componenets/MyPage/MyProfile.js"
import MyFollows from "../componenets/MyPage/MyFollows.js"
import AddFriendModalButton from "../componenets/MyPage/AddFriendModalButton.js";

export default class MyPage extends Component {
	constructor($target, $props) {
		super($target, $props);
	}

	setup() {
	}

	template() {
		return `
		<div class="container-fluid">
			<div class="row">
				<!-- 좌측 -->
				<div class="col-lg-3 d-flex flex-column bg-light left-panel p-3 py-0">

					<!-- 좌측 상단 내 정보 Component -->
					<div data-component="MyPage-MyProfile" class="d-flex flex-column text-center text-break">
					</div>

					<!-- 좌측 중하단 친구 목록 Component -->
					<div data-component="MyPage-MyFollows" class="d-flex flex-column text-center text-break">
					</div>

					<!-- 좌측 하단 유저 검색 -->
					<div data-component="MyPage-AddFriendBtn" class="d-flex justify-content-center align-content-center text-center p-1 p-md-2 p-lg-3">
					</div>

				</div>

				<!-- 중앙 통계 정보 -->
				<div data-component="AdditionalInfo" class="col-lg-3 d-flex flex-column justify-content-center align-content-center p-4">
				</div>

				<!-- 우측 경기 정보 -->
				<div data-component="MatchHistory" class="col-lg-6 p-4">
				</div>
			</div>
			<div class="toast-container position-fixed top-50 start-50 translate-middle p-3">
				<div class="toast">
					<div class="toast-header">
						<strong class="me-auto">알림</strong>
						<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
					</div>
					<div class="toast-body">
					</div>
				</div>
			</div>
		</div>
		`;
	}

	mounted() {

		// 좌측 상단 정보
			// 로그인한 유저의 image, name, email, match-history-btn, 정보변경-btn
			// 최초 중앙 + 우측 componen는 위의 MyInfo에서 처리
		const $myProfile = document.querySelector('[data-component="MyPage-MyProfile"]');
		new MyProfile($myProfile);

		// 좌측 중하단 정보
			// 친구 목록 list
		const $myFollows = document.querySelector('[data-component="MyPage-MyFollows"]');
		new MyFollows($myFollows);

		// 좌측 하단 정보
			// user 검색 버튼 -> modal button 이용
		const $addFriendBtn = this.$target.querySelector('[data-component="MyPage-AddFriendBtn"]');
		new AddFriendModalButton($addFriendBtn);
	}
}
