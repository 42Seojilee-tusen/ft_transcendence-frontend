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
		function getCookie(name) {
			const cookies = document.cookie.split("; ");
			for (let cookie of cookies) {
				let [key, value] = cookie.split("=");
				if (key === name) return value;
			}
			return null;
		}
		
		// localStorage.setItem("username", "Sample");
		fetch("https://localhost/api/oauth/csrf", { 
			method: "GET",
			credentials: "include",
			headers: {
				"Accept": "application/json"
			}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			const csrftoken = getCookie("csrftoken");
			console.log("✅ CSRF 토큰 응답:", csrftoken);
			
			// 받은 CSRF 토큰을 다음 요청의 헤더에 추가
			return fetch("https://localhost/api/oauth/token", { 
				method: "POST",
				headers: {
					"Accept": "application/json",
					"X-CSRFToken": csrftoken  // CSRF 토큰 추가
				},
				body: JSON.stringify({ 'code': this.$state.code }) 
			});
		})
		.then(response => response.json())
		.then(data => console.log("✅ POST 응답:", data))
		.catch(error => console.error("❌ 오류 발생:", error));
		
		console.log("test");

		// window.location.href = './#';
	}
}
