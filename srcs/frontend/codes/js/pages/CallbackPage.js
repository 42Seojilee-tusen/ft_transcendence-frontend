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
		<div>callback: ${code}</div>
		`;
	}

	mounted() {
		async function getCookie(name) {
			const cookies = document.cookie.split("; ");
			for (let cookie of cookies) {
				let [key, value] = cookie.split("=");
				if (key === name) return value;
			}
			return null;
		}

		async function fetchCsrfToken() {
			try {
				const response = await fetch("https://localhost/api/oauth/csrf", {
					method: "GET",
					credentials: "include",
					headers: { "Accept": "application/json" }
				});

				if (!response.ok) {
					throw new Error(`CSRF 토큰 요청 실패: ${response.statue}`);
				}

				await response.json(); // CSRF 토큰이 쿠키에 저장됨
				const csrftoken = await getCookie("csrftoken");
				if (!csrftoken) throw new Error("CSRF 토큰을 쿠키에서 찾을 수 없음");

				return csrftoken;
			} catch (error) {
				console.error("❌ CSRF 토큰 가져오기 실패:", error);
				throw error;
			}
		}

		async function fetchAccessToken(csrftoken, authCode) {
			try {
				console.log(csrftoken);
				console.log(authCode);
				const response = await fetch("https://localhost/api/oauth/token", {
					method: "POST",
					credentials: "include",
					headers: {
						"Accept": "application/json",
						"X-CSRFToken": csrftoken,
					},
					body: JSON.stringify({ 'code' : authCode })
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(`액세스 토큰 요청 실패: ${errorData.error || response.status}`);
				}
		
				const data = await response.json();
				console.log("✅ 액세스 토큰 응답:", data);
				return data.access_token;
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
				const csrftoken = await fetchCsrfToken();
		
				const accessToken = await fetchAccessToken(csrftoken, authCode);
		
				saveLoginState(accessToken);
		
				window.location.replace("https://localhost");
			} catch (error) {
				console.error("❌ 로그인 실패:", error);
			}
		}

		loginWithOAuth(this.$state.code);
	}
}
