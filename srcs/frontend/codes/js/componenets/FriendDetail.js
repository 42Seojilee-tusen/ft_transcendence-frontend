import Component from "../core/Component.js";

export default class FriendDetail extends Component {
    setup() {
        this.$state = {
            selectedFriend: null  // 선택된 친구 정보
        };
    }

    template() {
        const { selectedFriend } = this.$state;
        return selectedFriend
            ? `
                <h4>${selectedFriend.name}</h4>
                <p><strong>배틀 전적:</strong> ${selectedFriend.battle}</p>
                <p><strong>토너먼트 전적:</strong> ${selectedFriend.tournament}</p>
            `
            : `<p>친구를 선택하세요.</p>`;
    }

    setFriend(friend) {
        this.setState({ selectedFriend: friend });  // ✅ 선택한 친구 정보 업데이트
    }
}
