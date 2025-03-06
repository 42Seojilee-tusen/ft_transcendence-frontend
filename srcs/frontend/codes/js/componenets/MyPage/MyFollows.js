import Component from "../../core/Component.js";
import FriendProfile from "./FriendProfile.js";
import MatchHistory from "./MatchHistory.js";
import { requestApi } from "../../core/requestApi.js";
import { HOST } from "../../constants/ApiConstants.js";

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
			// DocumentFragment 생성
			const fragment = document.createDocumentFragment();

			// 친구 목록 생성
			follows.forEach((friendName, index) => {
				const friendItem = document.createElement("div");
				friendItem.classList.add("list-group-item", "friend-item");
				friendItem.textContent = friendName;
				friendItem.dataset.index = index;

				// 클릭 이벤트 추가
				friendItem.addEventListener("click", () => {
					// click 시 friend의 profile과 match history 화면 랜더링
					const $friendProfile = document.querySelector('[data-component="AdditionalInfo"]');
					const $friendMatchHisotry = document.querySelector('[data-component="MatchHistory"]');

					new FriendProfile($friendProfile, friendName);
					new MatchHistory($friendMatchHisotry, friendName);
				});

				fragment.appendChild(friendItem);
			});

			// DOC에 한 번에 추가
			const $friendListEl = document.querySelector("#MyFollows-FriendList");
			$friendListEl.replaceChildren(fragment);
		}
	}

	async fetchFollows() {
		try {
			const response = await requestApi(`https://` + HOST + `/api/follows/me/`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			this.setState({ follows: data.friend_list });
		} catch (error) {
			console.error("Error fetching /api/follows/me/:", error);
		}
	}
}
