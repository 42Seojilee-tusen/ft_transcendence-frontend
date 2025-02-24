import Component from "../../core/Component.js";
import MyFollows from "./MyFollows.js";
import { requestApi } from "../../core/requestApi.js";

export default class FriendProfile extends Component {
	constructor($target, $props) {
		super($target, $props);
		this.fetchFollows();
		this.fetchFriendProfile();
	}

	setup() {
		this.$state = {
			username: this.$props,
			profile: null,
			follows: null,
		}
	}

	template() {
		const profile = this.$state.profile;
		return `
		<!-- image -->
		<div class="my-1 my-md-1 my-lg-2">
			${profile ? `<img src="https://localhost/api${profile.profile_image}" class="img-fluid w-100" alt="${profile.username}">` : '<div>Loading image...</div>'}
		</div>

		<!-- name -->
		<div id="MyProfile-username" class="my-1 my-md-1 my-lg-2 fs-4 text-center text-break">
			${profile ? profile.username : 'Loading name...'}
		</div>

		<!-- email -->
		<div class="my-1 my-md-1 my-lg-2 fs-4 text-center text-break">
			${profile ? profile.email : 'Loading email...'}
		</div>

		<!-- 친구 추가 or 삭제 -->
		<div id="friendStatusBtn" class="btn btn-primary my-1 my-md-2 my-lg-3 fs-3">
		</div>
		`;
	}

	mounted() {

		if (this.$state.follows != null)
		{
			const $friendStatusBtn = document.querySelector('#friendStatusBtn');
			const isFollowing = this.$state.follows.includes(this.$state.username);

			if (isFollowing === true){
				$friendStatusBtn.innerText = "친구 삭제"
				$friendStatusBtn.addEventListener("click", () => {
					this.fetchFollow(this.$state.username, "DELETE");
				});
			} else {
				$friendStatusBtn.innerText = "친구 추가"
				$friendStatusBtn.addEventListener("click", () => {
					this.fetchFollow(this.$state.username, "POST");
				});
			}
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

	async fetchFriendProfile() {
		try {
			const response = await requestApi(`https://localhost/api/users/${this.$state.username}/`, {
				method: "GET",
				credentials: "include",
			});
			const data = await response.json();
			this.setState({ profile: data });
		} catch (error) {
			console.error("Error fetching profile:", error);
		}
	}

	async fetchFollow(username, method) {
		try {
			// need revise api url
			const response = await requestApi("https://localhost/api/follows/me", {
				method: method,
				credentials: "include",
				body: JSON.stringify({"username":username}),
			});
			const responseMsg = await response.json();

			if (responseMsg.error === undefined) { // ADD friend SUCCESS !
				// modal로 구현하기 넘 귀찮...
				alert(`${username}를 친구 목록에 추가했어요!`)

				// 되는지 모르겠네.
				const $myFollows = document.querySelector('[data-component="MyPage-MyFollows"]');
				new MyFollows($myFollows);
			}
			else {
				if (responseMsg.error === "User not found") { // error
					alert(`${username}라는 유저는 존재하지 않습니다.`)
				}
				else if (responseMsg.error === "Same user") { // error
					alert(`${username}라는 유저는 당신이에요!`)
				}
				else if (responseMsg.error === "Already friends") { // error
					alert(`${username}라는 유저는 이미 친구입니다.`)
				}
			}

			this.fetchFollows();

		} catch (error) {
			console.error("Error fetching users name:", error);
		}
	}
}
