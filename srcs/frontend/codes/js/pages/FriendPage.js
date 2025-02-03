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
						<p>친구를 선택하세요.</p>
					</div>
				</div>
			</div>
		</div>
		`;
	}

	mounted() {
		const friends = [
			{ name: "김철수", age: 25, hobby: "축구" },
			{ name: "이영희", age: 23, hobby: "독서" },
			{ name: "박민수", age: 27, hobby: "게임" },
			{ name: "정다혜", age: 24, hobby: "영화 감상" },
			{ name: "한준호", age: 26, hobby: "등산" }
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