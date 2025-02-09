import Component from "./core/Component.js";
import createPages from "./pages/PageIndex.js";

export default class App extends Component {
	setup() {
		this.$state = {
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
		this.$state.routes.push({ fragment: '#/mypage', component: pages.myPage });
		this.$state.routes.push({ fragment: '#/callback', component: pages.callback });
		this.$state.routes.push({ fragment: '#/game', component: pages.game });
		this.$state.routes.push({ fragment: '#/twofa', component: pages.twofa });

		//현재 URL 체크
		const checkRoutes = () => {
			const path = window.location.pathname;
			let hashPath = window.location.hash;
			console.log(`current path: ${hashPath}`);
			let currentRoute = this.$state.routes.find((route) => {
				return route.fragment === hashPath;
			});
			if (currentRoute) {
				currentRoute.component();
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
}
