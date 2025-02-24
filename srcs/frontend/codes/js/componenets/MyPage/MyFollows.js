import Component from "../../core/Component.js";
import MatchHistory from "./MatchHistory.js";
import { requestApi } from "../../core/requestApi.js";

export default class MyFollows extends Component {
	constructor($target, $props){
		super($target, $props);
		this.fetchFollows();
	}

	setup() {
		this.$state = {
			follows: null,
		}
	}

	template() {

		return `
			<!-- 좌측 중단 친구 목록 text -->
			<div class="text-center p-md-1 p-lg-2">
				<h2 class="m-2">친구 목록</h2>
			</div>

			<!-- 좌측 중하단 친구 목록 -->
			<div class="p-1">
				<div id="MyFollows-FriendList" class="list-group"></div>
			</div>
		`;
	}

	mounted() {
		const follows = this.$state.follows;
		if (follows !== null)
		{
			//const $friendListEl = document.querySelector("#friend-list");
			const $friendListEl = document.querySelector("#MyFollows-FriendList");
			const $friendMatchInfo = document.querySelector('[data-component="MatchHistory"]');

			// 친구 목록 생성
			follows.forEach((friendName, index) => {
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
		}
	}

	async fetchFollows() {
		try {
			const response = await requestApi("https://localhost/api/follows/me", {
				method: "GET",
				credentials: "include",
			});
			const data = await response.json();
			this.setState({ follows: data.friend_list });
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	}
}
