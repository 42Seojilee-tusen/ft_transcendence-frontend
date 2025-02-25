import Component from "../../core/Component.js";
import MyFollows from "./MyFollows.js"
import { requestApi } from "../../core/requestApi.js";
import MatchHistory from "./MatchHistory.js";

export default class AddFriendModalButton extends Component {
	constructor($target, $props) {
		super($target, $props);
		this.fetchUsersNames();
	}

	setup() {
		// 샘플 친구 리스트
		this.$state = {
			usersNames: null,
		}
	}

	template() {
	return `
		<div class="btn btn-secondary fs-4" data-bs-toggle="modal" data-bs-target="#friendModal">
			유저 검색
		</div>
		<div class="modal fade" id="friendModal" tabindex="-1" aria-labelledby="friendModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="friendModalLabel">유저 검색</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<!-- 검색 입력 -->
						<input type="text" id="searchInput" class="form-control" placeholder="친구 이름 검색">
						<!-- 자동완성 목록 -->
						<ul id="friendList" class="list-group mt-2"></ul>
					</div>
					<div class="modal-footer">
					</div>
				</div>
			</div>
		</div>
	`;
	}

	// 렌더가 끝난 후에 DOM에 접근하여 이벤트 등록
	mounted() {
		const searchInput = document.querySelector('div#friendModal input#searchInput');
		const friendList = document.querySelector('div#friendModal ul#friendList');

		searchInput.addEventListener("input", () => {
			this.filterFriends(searchInput, friendList);
		});
	}

	filterFriends(searchInput, friendList) {
		if (this.$state.usersNames === null)
			return ;
		console.log(this.$state.usersNames);

		const $searchInput = searchInput.value;
		friendList.innerHTML = "";

		const filtered = this.$state.usersNames.filter(name => name.includes($searchInput));

		filtered.forEach(name => {
			const li = document.createElement("li");
			li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
			li.textContent = name;

			//const addButton = document.createElement("button");
			//addButton.classList.add("btn", "btn-primary", "btn-sm");
			//addButton.textContent = "추가";
			//addButton.addEventListener("click", () => {
			//	this.fetchFollows(name);
			//});

			//li.appendChild(addButton);
			friendList.appendChild(li);

			li.addEventListener("click", () => {
				// 모달 엘리먼트 가져오기
				const friendModalEl = document.getElementById("friendModal");

				// 이미 인스턴스가 생성되어 있으면 가져오고, 없으면 새로 생성합니다.
				const modalInstance = bootstrap.Modal.getInstance(friendModalEl) || new bootstrap.Modal(friendModalEl);

				// 모달 숨기기
				modalInstance.hide();

				const $matchHisotry = document.querySelector('[data-component="MatchHistory"]');
				new MatchHistory($matchHisotry, name);
			});
		});
	}

	async fetchUsersNames() {
		try {
			// need revise api url
			const response = await requestApi("https://localhost/api/users/usernames/", {
				method: "GET",
				credentials: "include",
			});
			const data = await response.json();
			this.setState({ usersNames: data });
		} catch (error) {
			console.error("Error fetching users name:", error);
		}
	}



}
