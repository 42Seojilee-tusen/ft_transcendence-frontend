import Component from "../../core/Component.js";
import AdditionalMyInfo from "./AdditionalMyInfo.js";
import FriendProfile from "./FriendProfile.js";
import MatchHistory from "./MatchHistory.js";
import { requestApi } from "../../core/requestApi.js";
import { HOST } from "../../constants/ApiConstants.js";

export default class SearchUserModalButton extends Component {
	constructor($target, $props) {
		super($target, $props);
		this.fetchUsersNames();
	}

	setup() {
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

		// input 값이 변경될 때마다 관련된 user를 시각화 할 수 있도록 함수 호출
		searchInput.addEventListener("input", () => {
			this.filterFriends(searchInput, friendList);
		});
	}

	filterFriends(searchInput, friendList) {
		if (this.$state.usersNames === null)
			return ;

		// DocumentFragment 생성
		const fragment = document.createDocumentFragment();
		const $searchInput = searchInput.value;

		// api로 들고온 모든 user의 name중에서 searchInput가 동일한 형식의 이름을 배열 형태로 저장
		const filtered = this.$state.usersNames.filter(name => name.includes($searchInput));

		filtered.forEach(name => {
			// element 초기화
			const li = document.createElement("li");
			li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
			li.textContent = name;

			// list 추가
			fragment.appendChild(li);

			li.addEventListener("click", () => {
				// 모달 엘리먼트 가져오기
				const friendModalEl = document.getElementById("friendModal");

				// 이미 인스턴스가 생성되어 있으면 가져오고, 없으면 새로 생성합니다.
				const modalInstance = bootstrap.Modal.getInstance(friendModalEl) || new bootstrap.Modal(friendModalEl);

				// 모달 숨기기
				modalInstance.hide();

				// 선택한 user의 profile 및 경기 기록 띄우기
				const $myName = document.querySelector('#MyProfile-username').innerText.trim();
				const $friendProfile = document.querySelector('[data-component="AdditionalInfo"]');
				const $matchHisotry = document.querySelector('[data-component="MatchHistory"]');

				if (name === $myName) {
					const $myAdditionalInfo = document.querySelector('[data-component="AdditionalInfo"]');
					new AdditionalMyInfo($myAdditionalInfo, name);
				}
				else
					new FriendProfile($friendProfile, name);
				new MatchHistory($matchHisotry, name);
			});
		});

		// 이후에 DOM 한 번에 초기화
		friendList.replaceChildren(fragment);
	}

	async fetchUsersNames() {
		try {
			const response = await requestApi(`https://` + HOST + `/api/users/usernames/`, {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			this.setState({ usersNames: data });
		} catch (error) {
			console.error("Error fetching /api/users/usernames/:", error);
		}
	}
}
