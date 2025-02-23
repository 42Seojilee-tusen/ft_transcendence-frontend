import Component from "../../core/Component.js";

export default class AddFriendModalButton extends Component {

  setup() {
    // 샘플 친구 리스트
    this.friends = ["new_friend_a", "new_friend_b", "new_friend_c", "new_friend_d", "new_friend_e", "new_friend_f"];
  }

  template() {
    // HTML 구조만 반환 (oninput 제거)
    return `
      <div class="btn btn-secondary fs-4" data-bs-toggle="modal" data-bs-target="#friendModal">
        유저 검색
      </div>
      <div class="modal fade" id="friendModal" tabindex="-1" aria-labelledby="friendModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="friendModalLabel">유저 검색</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!-- 검색 입력 -->
              <input type="text" id="searchInput" class="form-control" placeholder="친구 이름 검색">
              <!-- 자동완성 목록 -->
              <ul id="friendList" class="list-group mt-2"></ul>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 렌더가 끝난 후에 DOM에 접근하여 이벤트 등록
  mounted() {
    const searchInput = document.getElementById("searchInput");
    const friendList = document.getElementById("friendList");

    searchInput.addEventListener("input", () => {
      this.filterFriends(searchInput, friendList);
    });
  }

  filterFriends(searchInput, friendList) {
    const query = searchInput.value.toLowerCase();
    friendList.innerHTML = "";

    const filtered = this.friends.filter(name => name.toLowerCase().includes(query));

    filtered.forEach(name => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
      li.textContent = name;

      const addButton = document.createElement("button");
      addButton.classList.add("btn", "btn-primary", "btn-sm");
      addButton.textContent = "추가";
      addButton.onclick = () => alert(`${name} 추가됨!`);

      li.appendChild(addButton);
      friendList.appendChild(li);
    });
  }
}
