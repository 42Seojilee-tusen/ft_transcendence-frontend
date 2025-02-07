import Component from "../core/Component.js";

export default class Callback extends Component {
	setup() {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		this.$state = {
			code: code,
		};
	}

	template() {
		const { code } = this.$state;
		return `
		<div class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="row">
				<img src="../../img/chill.jpeg" alt="chill guy"></img>
				<h1 style="text-align: center;">공 chill 노릇이군..<h1>
			</div>
		</div>
		`;
	}

	mounted() {
		async function requestFirstToken(authCode) {
			try {
				const response = await fetch("https://localhost/api/oauth/token", {
					method: "POST",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ 'code' : authCode })
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`액세스 토큰 요청 실패: ${errorData.error || response.status}`);
				}
		
				const data = await response.json();
				console.log("✅ 액세스 토큰 응답:", data);
				return data;
			} catch (error) {
				console.error("❌ 액세스 토큰 요청 실패:", error);
				throw error;
			}
		}

		function saveLoginState(accessToken) {
			sessionStorage.setItem("accessToken", accessToken);
			console.log("✅ 로그인 상태 저장 완료");
		}

		async function loginWithOAuth(authCode) {
			try {
				const tokenData = await requestFirstToken(authCode);
				saveLoginState(tokenData.access_token);
				window.location.href = "https://localhost/#/twofa";
			} catch (error) {
				console.error("❌ 로그인 실패:", error);
				window.location.replace("https://localhost");
			}
		}

		loginWithOAuth(this.$state.code);
	}
}
