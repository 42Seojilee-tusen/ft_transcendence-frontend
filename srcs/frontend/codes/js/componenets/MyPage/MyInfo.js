import Component from "../../core/Component.js";
import MoveButton from "../MoveButton.js";
import MatchHistory from "../../componenets/MatchHistory.js";

export default class MyInfo extends Component {
	setup() {
		this.$state = {
			profile: JSON.parse(this.getProfileTemp()),
			//profile: requestApi("https://localhost/api/users/me", {
			//	method: "GET",
			//	credentials: "include",
			//}).then((response) => {return response.json()})
			//.then((response) => {return response.user}),
		}
	}

	template() {
		return `
		<!-- homebutton -->
		<div class="d-flex">
			<div data-component="homeButton">
			</div>
		</div>

		<!-- image -->
		<div id="myInfo-image" class="my-1 my-md-1 my-lg-2">
			<!-- <img src="../../img/testMyPage.jpeg" class="img-fluid w-100" alt="junhapar"> -->
		</div>

		<!-- name -->
		<div id="myInfo-name" class="my-1 my-md-1 my-lg-2 fs-4"></div>

		<!-- email -->
		<div id="myInfo-email" class="my-1 my-md-1 my-lg-2 fs-4"></div>

		<!-- my match history -->
		<div data-component="myMatchHistoriesButton" class="btn btn-primary my-1 my-md-2 my-lg-3 fs-3">
			내 경기 기록 보기
		</div>
		`;
	}

	mounted() {
		const profile = this.$state.profile;

		// 홈 버튼
		const $home = this.$target.querySelector('[data-component="homeButton"]');
		new MoveButton($home, {name: "<-", href: "#/", color: "btn-white", fontSize: "fs-5" });

		// 이미지
		const $image = this.$target.querySelector('#myInfo-image');
		$image.innerHTML = `<img src="${profile.profile_image}" class="img-fluid w-100" alt="junhapar">`;

		// 이름
		const $name = this.$target.querySelector('#myInfo-name');
		$name.innerText = profile.username;

		// email
		const $email = this.$target.querySelector('#myInfo-email')
		$email.innerText = profile.email;

		// 내 경기 기록 보기
		const $myMatchHistoriesBTN = this.$target.querySelector('[data-component="myMatchHistoriesButton"]');
		const $myMatchInfo = document.querySelector('[data-component="matchHistory"]');
		new MatchHistory($myMatchInfo, profile);
		$myMatchHistoriesBTN.addEventListener("click", () => {
			// 동작 중앙 + 우측 component
			new MatchHistory($myMatchInfo, profile.username);
		});
	}

	getProfileTemp() {
		return `
			{
				"id": 157956,
				"username": "tajeong",
				"email": "tajeong@student.42seoul.kr",
				"profile_image": "https://cdn.intra.42.fr/users/e7ab03142365d92346161e4069838ff1/tajeong.jpg"
			}
		`;
	}
}
