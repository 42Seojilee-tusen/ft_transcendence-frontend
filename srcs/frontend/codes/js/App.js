import Component from "./core/Component.js";
import createPages from "./pages/PageIndex.js";
import { WSS_PROTOCOL, HOST } from "./constants/ApiConstants.js";
import { requestApi } from "./core/requestApi.js";

export default class App extends Component {
	setup() {
		this.$state = {
		  routes: [],
		  socket: null,
		};
	}

	template() {
		return `
		<main class="w-100 h-100"></main>
		`;
	}


	mounted() {
		const $main = this.$target.querySelector('main');
		const pages = createPages($main);

		//라우트 페이지 설정
		this.$state.routes.push({ fragment: '#/', component: pages.home });
		this.$state.routes.push({ fragment: '#/login', component: pages.login });
		this.$state.routes.push({ fragment: '#/mypage', component: pages.myPage });
		this.$state.routes.push({ fragment: '#/callback', component: pages.callback });
		this.$state.routes.push({ fragment: '#/twofa', component: pages.twofa });
		this.$state.routes.push({ fragment: '#/battle', component: pages.battle });
		this.$state.routes.push({ fragment: '#/tournament', component: pages.tournament });

		//현재 URL 체크
		const checkRoutes = () => {
			const path = window.location.pathname;
			let hashPath = window.location.hash;
			console.log(`current path: ${hashPath}`);
			if (hashPath === "#/" || hashPath === "#/mypage" || hashPath === "#/battle" || hashPath === "#/tournament") {
				this.connectOnline();
			}
			let currentRoute = this.$state.routes.find((route) => {
				return route.fragment === hashPath;
			});
			if (currentRoute) {
				const $page = currentRoute.component();
				window.addEventListener("popstate", () => {
					$page.destroy();
				});
			}
			if (!currentRoute) {
				hashPath = '#/';
				currentRoute = this.$state.routes[0];
			}
			if (path === "/callback") {
				hashPath = '#/callback';
				currentRoute = this.$state.routes[4];
			}
			window.location.hash = hashPath;
		};

		//URL 변경 이벤트
		window.addEventListener('hashchange', checkRoutes);

		checkRoutes();
	}

	connectOnline() {
		let token = sessionStorage.getItem("accessToken");
		if (token == null) {
			requestApi(`https://${HOST}/api/users/me/`, { // 임시 api => 이걸 이용해서 로그인 시간 유지
				method: "GET",
				credentials: "include",  // 🔥 쿠키 포함하여 요청
				headers: {
					"Content-Type": "application/json",
				},
			}).then(() => {
				token = sessionStorage.getItem("accessToken")
				if (this.$state.socket !== null) {
					return ;
				}
				console.log("websocket 생성");
				this.$state.socket = new WebSocket(
					WSS_PROTOCOL + HOST + `/api/ws/online/?token=${token}`
				);

				this.$state.socket.onopen = () => {
					console.log("connect WebSocket connection established");
				};

				this.$state.socket.onclose = (e) => {
					console.log("connect WebSocket connection closed", e);
					this.$state.socket = null;
				};
			});
		} else {
			if (this.$state.socket !== null) {
				return ;
			}
			console.log("websocket 생성");
			this.$state.socket = new WebSocket(
				WSS_PROTOCOL + HOST + `/api/ws/online/?token=${token}`
			);

			this.$state.socket.onopen = () => {
				console.log("connect WebSocket connection established");
			};

			this.$state.socket.onclose = (e) => {
				console.log("connect WebSocket connection closed", e);
				this.$state.socket = null;
			};
		}
	}
}
