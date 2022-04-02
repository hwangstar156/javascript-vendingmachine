class LoginStatus extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.user = JSON.parse(localStorage.getItem("user-info"));
    this.render();
  }

  connectedCallback() {
    if (this.checkLogin()) {
      this.$userProfile = this.shadowRoot.querySelector("#user-profile");
      this.$userMenuList = this.shadowRoot.querySelector(".user-menu-list");
      this.$logOutButton = this.shadowRoot.querySelector("#logout-button");
      this.setUserProfileThumbnail();
      this.$userProfile.addEventListener("click", this.onClickProfile);
      this.$logOutButton.addEventListener("click", this.logOut);
    }
  }

  onClickProfile = () => {
    this.$userMenuList.classList.toggle("hidden");
  };

  logOut = () => {
    localStorage.removeItem("user-info");
    location.reload();
  };

  checkLogin = () => {
    return this.user && this.user.key;
  };

  setUserProfileThumbnail() {
    this.$userProfile.innerText = this.user.name[0];
  }

  render() {
    if (this.checkLogin()) {
      this.renderUserProfile();
      return;
    }

    this.renderLoginNavButton();
  }

  renderLoginNavButton() {
    const template = document.querySelector(
      "#login-menu-button-template"
    ).content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }

  renderUserProfile() {
    const template = document.querySelector("#user-profile-template").content;
    const cloneNode = template.cloneNode(true);
    this.shadowRoot.appendChild(cloneNode);
  }
}

customElements.define("login-status", LoginStatus);