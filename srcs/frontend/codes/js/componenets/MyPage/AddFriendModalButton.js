import Component from "../../core/Component.js";

export default class AddFriendModalButton extends Component {
	constructor($target, $props) {
		super($target, $props);
		this.fetchUsersName();
	}

	setup() {
		// 샘플 친구 리스트
		this.$state = {
			usersName: null,
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
		const $searchInput = searchInput.value;
		friendList.innerHTML = "";

		const filtered = this.$state.usersName.filter(name => name.includes($searchInput));

		filtered.forEach(name => {
			const li = document.createElement("li");
			li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
			li.textContent = name;

			const addButton = document.createElement("button");
			addButton.classList.add("btn", "btn-primary", "btn-sm");
			addButton.textContent = "추가";
			addButton.addEventListener("click", () => {

			});
			//addButton.onclick = () => alert(`${name} 추가됨!`);

			li.appendChild(addButton);
			friendList.appendChild(li);
		});
	}

	async fetchUsersName() {
		try {
			// need revise api url
			const response = await requestApi("https://localhost/api/users/usernames/", {
				method: "GET",
				credentials: "include",
			});
			const data = await response.json();

			// 되는지 모르겠네.
			this.setState({ usersName: data });
		} catch (error) {
			console.error("Error fetching users name:", error);
		}
	}

}
