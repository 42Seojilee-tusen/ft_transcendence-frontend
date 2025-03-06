import Component from "../../core/Component.js";
import MyProfile from "./MyProfile.js";
import MatchHistory from "./MatchHistory.js";
import FriendProfile from "./FriendProfile.js";
import UpdateError from "./UpdateError.js";
import { requestApi } from "../../core/requestApi.js";

export default class ChangeNameModalButton extends Component {
	setup() {
		this.$state = {
			profile: this.$props,
		}
	}

	template() {
		const profile = this.$state.profile;

		// profile 값에 따라서 다른 template 반환
		return `${
			profile === null
			? `
				<div id="MyProfile-username" class="fs-4">
					Loading name...
				</div>
			`
			: `
				<div id="MyProfile-username" class="btn fs-4" data-bs-toggle="modal" data-bs-target="#changeNameModal">
					${profile.username}
					<i class="bi bi-pencil"></i>
				</div>
				<div class="modal fade" id="changeNameModal" tabindex="-1" aria-labelledby="changeNameModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="changeNameModalLabel">이름 변경</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<div>
									<!-- 검색 입력 -->
									<input type="text" id="changeNameInput" class="form-control" placeholder="변경할 이름을 입력해주세요.">
								</div>
							</div>
							<div class="modal-footer d-flex flex-column justify-content-center align-content-center text-center ">
								<div data-component="updateError" class="text-danger text-center">
								</div>
								<div id="changeNameBtn" class="btn btn-secondary fs-4">
									업데이트
								</div>
							</div>
						</div>
					</div>
				</div>
			`
		}
		`;
	}

	mounted() {
		const profile = this.$state.profile;

		if (profile !== null){
			const $changeNameBtn = document.querySelector('div#changeNameModal div#changeNameBtn');
			$changeNameBtn.addEventListener("click", () => {
				const $name = document.querySelector('div#changeNameModal input#changeNameInput').value;

				// 변경할 이름에 특수문자 및 공백이 포함되는지 확인
				const regex = /^[a-zA-Z0-9가-힣]+$/;
				if (!regex.test($name)) {
					// 사용할 수 없는 이름인 경우 에러 메시지
					const $updateError = document.querySelector('div#changeNameModal [data-component="updateError"]');
					new UpdateError($updateError, "특수문자 및 공백은 포함될 수 없습니다.");
				}
				else
					this.fetchUserName($name);
			});
		}
	}

	async fetchUserName(name) {
		try {
			const response = await requestApi(`https://` + HOST + `/api/users/me/`, {
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({"username":name}),
			});
			const data = await response.json();

			if (data.error === undefined) {

				// 모달 엘리먼트 가져오기
				const changeNameModalEl = document.getElementById("changeNameModal");

				// modal instance 가져오기
				const modalInstance = bootstrap.Modal.getInstance(changeNameModalEl);

				// 모달 숨기기
				modalInstance.hide();

				// My Profile 이름을 변경된 이름으로 update
				const $myProfile = document.querySelector('[data-component="MyPage-MyProfile"]');
				new MyProfile($myProfile);

				// Match History의 이름을 변경된 이름으로 update
					// 경기기록이 화면에 보여진 경우에만 update 할 수 있도록 해당 DOM이 있는지 확인
				const isMatchHistoryExist = document.querySelector('[data-component="MatchHistory"] div#simpleHistory');
				if (isMatchHistoryExist !== null)
				{
					const $friendProfile = document.querySelector('[data-component="AdditionalInfo"]');
					const $matchHistory = document.querySelector('[data-component="MatchHistory"]');
					const $userName = document.querySelector('#friendProfile-username');

					// friendProfile이 화면에 랜더링된 경우 $username은 존재
					if ($userName === null)
						new MatchHistory($matchHistory, name);
					else {
						new FriendProfile($friendProfile, $userName.innerText);
						new MatchHistory($matchHistory, $userName.innerText);
					}
				}

				// Success 메시지 띄워주기
					// Toast 요소 선택
				const toastEl = document.querySelector('.toast');
					// toast-body 요소 선택 및 text 값 설정
				document.querySelector('.toast-body').innerText = '이름을 성공적으로 변경하였습니다!';

					// Toast 인스턴스 생성
				const toast = new bootstrap.Toast(toastEl);
					// Toast 표시
				toast.show();
			}
			else {
				// 오류 메시지 띄워주기
				const $updateError = document.querySelector('div#changeNameModal [data-component="updateError"]');

				new UpdateError($updateError, "사용할 수 없는 이름입니다.");
			}

		} catch (error) {
			console.error("Error fetching /api/users/me/:", error);
		}
	}
}
