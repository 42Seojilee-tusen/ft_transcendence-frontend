import Component from "./core/Component.js";
import createPages from "./pages/PageIndex.js";

export default class App extends Component {
	setup() {
		let loginSaved = false;
		if (sessionStorage.getItem("accessToken") !== null) {
			loginSaved = true;
		}
		this.$state = {
		  isLogin: loginSaved,
		  routes: [],
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
		this.$state.routes.push({ fragment: '#/friend', component: pages.friend });
		this.$state.routes.push({ fragment: '#/mypage', component: pages.counter });
		this.$state.routes.push({ fragment: '#/callback', component: pages.callback });
		this.$state.routes.push({ fragment: '#/game', component: pages.game });
		this.$state.routes.push({ fragment: '#/twofa', component: pages.twofa });
	
		//현재 URL 체크
		const checkRoutes = () => {
			const path = window.location.pathname;
			let hashPath = window.location.hash;
			let currentRoute = this.$state.routes.find((route) => {
				return route.fragment === hashPath;
			});
			if (!currentRoute) {
				//redirect to home
				hashPath = '#/';
				currentRoute = this.$state.routes[0];
			}
			if (!this.$state.isLogin && path === "/callback") {
				hashPath = '#/callback';
			} else if (!this.$state.isLogin) {
				hashPath = '#/login';
			}
			window.location.hash = hashPath;
		  	currentRoute.component();
		};

		//URL 변경 이벤트
		window.addEventListener('hashchange', checkRoutes);

		checkRoutes();
	}
}
