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
	
		if (!window.location.hash) {
		  window.location.hash = '#/';
		} if (!this.$state.isLogin) {
			window.location.hash = '#/login';
		}
	
		//초기 렌더링
		checkRoutes();
	}
}