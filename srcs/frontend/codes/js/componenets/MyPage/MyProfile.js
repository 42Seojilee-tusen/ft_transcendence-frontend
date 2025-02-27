import Component from "../../core/Component.js";
import MoveButton from "../MoveButton.js";
import ChangeImageModalButton from "./ChangeImageModalButton.js";
import ChangeNameModalButton from "./ChangeNameModalButton.js";
import AdditionalMyInfo from "./AdditionalMyInfo.js";
import MatchHistory from "./MatchHistory.js";
import { requestApi } from "../../core/requestApi.js";

export default class MyProfile extends Component {
	constructor($target, $props) {
		super($target, $props);
		this.fetchProfile();
	}

	setup() {
		this.$state = {
			profile: null,
			history: null,
		}
	}

	template() {
		const profile = this.$state.profile;
		return `
		<!-- homebutton -->
		<div class="d-flex">
			<div data-component="homeButton">
			</div>
		</div>

		<!-- image -->
		<div data-component="MyProfile-ChangeImage" class="my-1 my-md-1 my-lg-2">
		</div>

		<!-- name -->
		<div data-component="MyProfile-ChangeName" class="my-1 my-md-1 my-lg-2">
		</div>

		<!-- email -->
		<div class="my-1 my-md-1 my-lg-2 fs-4">
			${profile ? profile.email : 'Loading email...'}
		</div>

		<!-- my match history -->
		<div data-component="MyMatchHistoryBtn" class="btn btn-primary my-1 my-md-2 my-lg-3 fs-3">
			내 경기 기록 보기
		</div>
		`;
	}

	mounted() {

		// 홈 버튼
		const $home = this.$target.querySelector('[data-component="homeButton"]');
		new MoveButton($home, {name: "<-", href: "#/", color: "btn-white", fontSize: "fs-5" });

		// 이미지 변경 버튼
		const $changeImageBtn = this.$target.querySelector('[data-component="MyProfile-ChangeImage"]');
		new ChangeImageModalButton($changeImageBtn, this.$state.profile);

		// 이름 변경 버튼
		const $changeNameBtn = this.$target.querySelector('[data-component="MyProfile-ChangeName"]');
		new ChangeNameModalButton($changeNameBtn, this.$state.profile);

		// 내 경기 기록 보기 버튼
		const $myMatchHistoryBtn = this.$target.querySelector('[data-component="MyMatchHistoryBtn"]');
		$myMatchHistoryBtn.addEventListener("click", () => {
			// 중앙 + 우측 component
			const $myAdditionalInfo = document.querySelector('[data-component="AdditionalInfo"]');
			const $myMatchHistory = document.querySelector('[data-component="MatchHistory"]');

				// 중앙은 my history를 chart
			new AdditionalMyInfo($myAdditionalInfo, this.$state.profile?.username);
				// 우측은 my match history
			new MatchHistory($myMatchHistory, this.$state.profile?.username);
		});
	}

	async fetchProfile() {
		try {
			const response = await requestApi("https://localhost/api/users/me/", {
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			this.setState({ profile: data });
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	}
}
