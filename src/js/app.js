import ProductModerator from "./moderator/productModerator";
import ChangesModerator from "./moderator/changesModerator";

class App {
  constructor() {
    this.productModerator = new ProductModerator();
    this.changesModerator = new ChangesModerator();

    this.$nav = document.querySelector("#page-tab-container");
    this.$nav.addEventListener("click", this.onClickNavButton);
    window.addEventListener("hashchange", this.onChangePage);

    this.onChangePage();
  }

  onClickNavButton = ({ target }) => {
    if (target.classList.contains("product-management-button")) {
      this.productModerator.init();
    }

    if (target.classList.contains("changes-charge-button")) {
      this.changesModerator.init();
    }
  };

  onChangePage = () => {
    const hash = location.hash;

    if (hash === "#!productManagement") {
      this.productModerator.init();
    }

    if (hash === "#!changesCharge") {
      this.changesModerator.init();
    }
  };
}

new App();