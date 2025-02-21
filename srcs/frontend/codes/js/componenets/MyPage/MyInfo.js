import Component from "../../core/Component.js";
import MoveButton from "../MoveButton.js";
import MatchHistory from "./MatchHistory.js";
import { requestApi } from "../../core/requestApi.js";

export default class MyInfo extends Component {
	constructor($target, $props) {
		super($target, $props);
		this.fetchProfile();
	}
	setup() {
		this.$state = {
			profile: null,
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
		<div id="myInfo-image" class="my-1 my-md-1 my-lg-2">
			${profile ? `<img src="https://localhost/api${profile.profile_image}" class="img-fluid w-100" alt="${profile.username}">` : '<div>Loading image...</div>'}
		</div>

		<!-- name -->
		<div id="myInfo-name" class="my-1 my-md-1 my-lg-2 fs-4">
			${profile ? profile.username : 'Loading name...'}
		</div>

		<!-- email -->
		<div id="myInfo-email" class="my-1 my-md-1 my-lg-2 fs-4">
			${profile ? profile.email : 'Loading email...'}
		</div>

		<!-- my match history -->
		<div data-component="myMatchHistoriesButton" class="btn btn-primary my-1 my-md-2 my-lg-3 fs-3">
			내 경기 기록 보기
		</div>
		`;
	}

	mounted() {

		// 홈 버튼
		const $home = this.$target.querySelector('[data-component="homeButton"]');
		new MoveButton($home, {name: "<-", href: "#/", color: "btn-white", fontSize: "fs-5" });

		// 내 경기 기록 보기 버튼
		const $myMatchHistoriesBTN = this.$target.querySelector('[data-component="myMatchHistoriesButton"]');
		$myMatchHistoriesBTN.addEventListener("click", () => {
			// 동작 중앙 + 우측 component
			const $myMatchInfo = document.querySelector('[data-component="matchHistory"]');
			new MatchHistory($myMatchInfo, this.$state.profile?.username);
		});
	}

	async fetchProfile() {
		try {
			const response = await requestApi("https://localhost/api/users/me/", {
				method: "GET",
				credentials: "include",
			});
			const data = await response.json();
			this.setState({ profile: data });
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	}
}
