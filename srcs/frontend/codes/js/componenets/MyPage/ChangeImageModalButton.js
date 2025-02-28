import Component from "../../core/Component.js";
import MyProfile from "./MyProfile.js";
import UpdateError from "./UpdateError.js";
import { requestApi } from "../../core/requestApi.js";

export default class ChangeImageModalButton extends Component {
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
				<div class="fs-4">
					Loading image...
				</div>
				`
			: `
				<div class="btn" data-bs-toggle="modal" data-bs-target="#changeImageModal">
					<img src="https://localhost/api${profile.profile_image}" class="img-fluid w-100" alt="${profile.username}">
					<i class="bi bi-pencil"></i>
				</div>
				<div class="modal fade" id="changeImageModal" tabindex="-1" aria-labelledby="changeImageModalLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="changeImageModalLabel">이미지 변경</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<!-- 파일 input (화면에 보이지 않게 설정) -->
								<input type="file" id="imageUpload" accept="image/*">
							</div>
							<div class="modal-footer d-flex flex-column justify-content-center align-content-center text-center ">
								<div data-component="updateError" class="text-danger text-center">
								</div>
								<div id="changeImageBtn" class="btn btn-secondary fs-4">
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
			const $changeImageBtn = document.querySelector('div#changeImageModal div#changeImageBtn');
			$changeImageBtn.addEventListener("click", () => {
				const $image = document.querySelector('div#changeImageModal input#imageUpload').files[0];
				this.fetchUserImage($image);
			});
		}
	}

	async fetchUserImage(image) {
		try {
			const formData = new FormData();
    		formData.append('profile_image', image); // 'profile_image'는 백엔드에서 받을 필드 이름

			const response = await requestApi("https://localhost/api/users/me/", {
				method: "PATCH",
				credentials: "include",
				headers: {
					// Content-type 명시 금지
					//"Content-Type": "application/json",
				},
				body: formData,
			});
			const data = await response.json();

			if (data.error === undefined) {

				// 모달 엘리먼트 가져오기
				const changeImageModalEl = document.getElementById("changeImageModal");

				// modal instance 가져오기
				const modalInstance = bootstrap.Modal.getInstance(changeImageModalEl);

				// 모달 숨기기
				modalInstance.hide();

				// 변경한 이미지로 profile을 띄워주기
				const $myProfile = document.querySelector('[data-component="MyPage-MyProfile"]');
				new MyProfile($myProfile);

				// Success 메시지 띄워주기
					// Toast 요소 선택
					const toastEl = document.querySelector('.toast');
					// toast-body 요소 선택 및 text 값 설정
				document.querySelector('.toast-body').innerText = '이미지를 성공적으로 변경하였습니다!';

					// Toast 인스턴스 생성
				const toast = new bootstrap.Toast(toastEl);
					// Toast 표시
				toast.show();
			}
			else {
				// 오류 메시지 띄워주기
				const $updateError = document.querySelector('div#changeImageModal [data-component="updateError"]');

				new UpdateError($updateError, "image");
			}

		} catch (error) {
			console.error("Error fetching /api/users/me/:", error);
		}
	}
}
