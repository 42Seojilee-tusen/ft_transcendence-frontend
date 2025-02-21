import Component from "../core/Component.js";
import MyInfo from "../componenets/MyPage/MyInfo.js"
import MatchHistory from "../componenets/MyPage/MatchHistory.js";
import AddFriendModalButton from "../componenets/MyPage/AddFriendModalButton.js";
import { requestApi } from "../core/requestApi.js";

export default class FriendPage extends Component {
	setup() {

		this.$state = {
			friends: this.getFriendsTemp(),
			//friends: requestApi("https://localhost/api/follows/me", {
			//	method: "GET",
			//	credentials: "include",  // 🔥 쿠키 포함하여 요청
			//}).then((response) => {return response.json()}) // JSON 변환
			//.then((response) => {return response.friend_list}) // response object에서 friend_list 추출
		};
	}

	template() {
		return `
		<div class="container-fluid">
			<div class="row">
				<!-- 좌측 -->
				<div class="col-lg-3 d-flex flex-column bg-light left-panel p-3 pt-0">

					<!-- 좌측 상단 내 정보 -->
					<div id="myPage-profile" class="d-flex flex-column text-center text-break">
					</div>

					<!-- 좌측 중단 친구 목록 text -->
					<div class="text-center p-1 p-md-2 p-lg-3">
						<h2 class="m-2">친구 목록</h2>
					</div>

					<!-- 좌측 중하단 친구 목록 -->
					<div class="col friend-list-container" style="height: 40vh; overflow-y: auto;">
						<div id="friend-list" class="list-group"></div>
					</div>

					<!-- 좌측 하단 친구 추가 -->
					<div id="test" class="d-flex justify-content-center align-content-center text-center p-1 p-md-2 p-lg-3">
						<div data-component="addFriendButton" class="btn btn-secondary my-1 fs-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
							유저 검색
						</div>
					</div>

				</div>

				<!-- 중앙 + 우측 -->
				<div data-component="matchHistory" class="col-lg-9 p-4">
				</div>
			</div>
		</div>
		`;
	}

	mounted() {

		// 좌측 상단 정보
			// 로그인한 유저의 image, name, email, match-history-btn, 정보변경-btn
			// 최초 중앙 + 우측 componen는 위의 MyInfo에서 처리
		const $myInfo = document.querySelector('#myPage-profile');
		new MyInfo($myInfo);

		const friends = this.$state.friends;
		const $friendListEl = document.querySelector("#friend-list");
		const $friendMatchInfo = document.querySelector('[data-component="matchHistory"]');

		// 친구 목록 생성
		friends.forEach((friendName, index) => {
			const friendItem = document.createElement("div");
			friendItem.classList.add("list-group-item", "friend-item");
			friendItem.textContent = friendName;
			friendItem.dataset.index = index;

			// 클릭 이벤트 추가
			friendItem.addEventListener("click", () => {
				// friend name으로 MatchHistory에서 경기기록 api 들고온 후 화면에 보여주기
				new MatchHistory($friendMatchInfo, friendName)
			});

			$friendListEl.appendChild(friendItem);
		});

		// 유저 검색 및 추가 버튼
		const $addFriendBTN = this.$target.querySelector('[data-component="addFriendButton"]');
		$addFriendBTN.addEventListener("click", () => {
			new AddFriendModalButton($addFriendBTN);
		});
	}

	getFriendsTemp() {
		return [
			"test_name1",
			"test_name2",
			"test_name3",
			"test_name4",
			"test_name5",
			"test_name6",
			"test_name7",
			"test_name8",
			"test_name9",
		];
	}

}
