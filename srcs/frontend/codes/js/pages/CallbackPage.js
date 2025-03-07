import Component from "../core/Component.js";
import { HOST } from "../constants/ApiConstants.js";

export default class CallbackPage extends Component {
	setup() {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		this.$state = {
			code: code,
		};
	}

	template() {
		return `
		<div class="container-xxl vh-100 d-flex flex-column justify-content-center">
			<div class="row d-flex flex-grow-1">
				<div class="col d-flex align-items-center justify-content-center"></div>
				<div class="col d-flex align-items-center justify-content-center">
					<div>
						<img src="../../img/chill.jpeg" alt="chill guy" style="max-width: 100%; height: auto;"></img>
						<h3 class="text-white" style="text-align: center;">공 chill 노릇이군..</h3>
						</div>
				</div>
				<div class="col d-flex align-items-center justify-content-center"></div>
			</div>
		</div>
		`;
	}

	mounted() {
		async function requestFirstToken(authCode) {
			try {
				const response = await fetch(`https://${HOST}/api/oauth/token/`, {
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

		async function loginWithOAuth(authCode) {
			try {
				const tokenData = await requestFirstToken(authCode);
				sessionStorage.setItem("accessToken", tokenData.access_token);
				window.location.href = `https://${HOST}/#/twofa`;
			} catch (error) {
				console.error("❌ 로그인 실패:", error);
				window.location.replace(`https://${HOST}`);
			}
		}

		loginWithOAuth(this.$state.code);
	}
}
