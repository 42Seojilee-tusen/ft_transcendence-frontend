import Component from "../core/Component.js";
import FriendDetail from "../componenets/FriendDetail.js"

export default class FriendPage extends Component {
	template() {
		return `
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-4 bg-light left-panel p-3">
					<h5>친구 목록</h5>
					<div id="friend-list" class="list-group">
					</div>
				</div>

				<!-- 우측 친구 정보 -->
				<div class="col-md-8 p-4">
					<h3>친구 정보</h3>
					<div id="friend-details" class="border p-3 rounded">
					</div>
				</div>
			</div>
		</div>
		`;
	}

	mounted() {
		const friends = [
			{ name: "김철수", online: true, battle: [ 10, 5, 5 ], tournament: [ 25, 10, 5, 5, 5 ] },
			{ name: "이영희", online: true, battle: [ 4, 1, 3 ], tournament: [ 20, 5, 5, 5, 5 ] },
			{ name: "박민수", online: false, battle: [ 5, 4, 1 ], tournament: [ 16, 2, 9, 4, 1 ] },
			{ name: "정다혜", online: true, battle: [ 15, 14, 1 ], tournament: [ 5, 1, 1, 1, 1 ] },
			{ name: "한준호", online: false, battle: [ 5, 2, 3 ], tournament: [ 2, 0, 1, 0, 1 ] },
		];


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
}
