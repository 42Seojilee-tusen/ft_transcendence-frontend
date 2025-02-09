import Component from "../core/Component.js";
import MyInfo from "../componenets/MyPage/MyInfo.js"
import FriendDetail from "../componenets/FriendDetail.js"
import MatchHistory from "../componenets/MatchHistory.js";

export default class FriendPage extends Component {
	setup() {
		this.$state = {
			friends: this.getFriendsTemp(),
		};
	}

	template() {
		return `
		<div class="container-fluid">
			<div class="row">
				<!-- 좌측 -->
				<div class="col-lg-3 d-flex flex-column bg-light left-panel p-3 pt-0">

					<!-- 좌측 상단 내 정보 -->
					<div id="my-Info" class="d-flex flex-column text-center text-break">
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
					<div class="d-flex align-content-center text-center p-1 p-md-2 p-lg-3">
						<div class="flex-grow-1 me-3"></div>
						<div>친구 추가</div>
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
		const $myInfo = document.querySelector('#my-Info');
		new MyInfo($myInfo);

		// 중앙 + 우측 component
		const $myMatchInfo = document.querySelector('[data-component="matchHistory"]');
		new MatchHistory($myMatchInfo, );






		const friends = this.$state.friends

		const $friendListEl = document.querySelector("#friend-list");
		const $friendDetailsEl = document.querySelector("#friend-details");

		const friendDetailComponent = new FriendDetail($friendDetailsEl);

		// 친구 목록 생성
		friends.forEach((friend, index) => {
			const friendItem = document.createElement("div");
			friendItem.classList.add("list-group-item", "friend-item");
			friendItem.textContent = friend.name;
			friendItem.dataset.index = index;
			// 클릭 이벤트 추가
			friendItem.addEventListener("click", () => {
				friendDetailComponent.setFriend(friend);
			});

			$friendListEl.appendChild(friendItem);
		});

	}

	getFriendsTemp() {
		return [
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
		];
	}
}
