export default class Component {
	$target;
	$props;
	$state;

	constructor($target, $props) {
		this.$target = $target;
		this.$props = $props;
		this.setup();
		this.setEvent();
		this.render();
	}

	setup() {} // 컴포넌트의 state 설정

	mounted() {} // 컴포넌트가 마운트 되었을 때 처리

	template() { // UI 구성
		return '';
	}

	render() { // UI 렌더링 함수
		this.$target.innerHTML = this.template();
		this.mounted();
	}

	setEvent() {} // 컴포넌트의 이벤트 설정
	
	setState(newState) { // 상태 변경 후 렌더링
		this.$state = { ...this.$state, ...newState };
		this.render();
	}

	addEvent(eventType, selector, callback) { // 이벤트 등록 추상화
		this.$target.addEventListener(eventType, (event) => {
			if (!event.target.closest(selector)) return false;
			callback(event);
		});
	}
}