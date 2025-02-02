import Component from "./core/Component.js";
import createPages from "./pages/PageIndex.js";

export default class App extends Component {
	setup() {
		const savedUsername = localStorage.getItem("username");
		let loginSaved = false;
		if (savedUsername !== null) {
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
	
		//현재 URL 체크
		const checkRoutes = () => {
			let currentRoute = this.$state.routes.find((route) => {
				return route.fragment === window.location.hash;
			});
			if (!currentRoute) {
				//redirect to home
				window.location.href = './#';
				currentRoute = this.$state.routes[0];
		  	}
		  	currentRoute.component();
		};

		//URL 변경 이벤트
		window.addEventListener('hashchange', checkRoutes);

		const path = window.location.pathname;

		let hashPath = "#/";
		if (!this.$state.isLogin && path === "/callback") {
			hashPath = '#/callback';
		} else if (!this.$state.isLogin) {
			hashPath = '#/login';
		}

		window.location.hash = hashPath;
	}
}