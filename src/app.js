import Nodes from "../src/components/nodes.js";
import Nav from "../src/components/nav.js";
import ImageModal from "../src/components/imageModal.js";
import { fetchDirectory, fetchRoot } from "../src/util.js";

class App {
  $target;
  state;

  constructor($target) {
    this.$target = $target;
    this.setUp();
  }

  async setUp() {
    try {
      this.state = {
        isLoading: true,
      };
      this.render();
      this.state = {
        depth: 0,
        nodes: await fetchRoot(),
        breadCrumb: ["root"],
        curr: "root",
        prevState: null,
        selectedImage: null,
        isLoading: false,
      };
      this.render();
    } catch (e) {
      throw new Error("error!");
    }
  }

  mounted() {
    this.$target.innerHTML = "";
    if (this.state) {
      new Nav({
        $app: this.$target,
        $target: document.createElement("nav"),
        $props: {
          state: this.state,
        },
      });

      new Nodes({
        $app: this.$target,
        $target: document.createElement("div"),
        $props: {
          state: this.state,
          changeDirectory: this.changeDirectory.bind(this),
          goBack: this.goBack.bind(this),
          showImage: this.showImage.bind(this),
        },
      });

      new ImageModal({
        $app: this.$target,
        $target: document.createElement("div"),
        $props: {
          state: this.state,
        },
      });
    }
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    if (this.state.isLoading) {
      const loadingModal = document.createElement("div");
      loadingModal.classList.add("Modal");
      loadingModal.classList.add("Loading");
      loadingModal.innerHTML = `
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
            `.trim();

      this.$target.appendChild(loadingModal);
    } else {
      this.mounted();
    }
  }

  // nodes component logic

  async changeDirectory(nodeId, nodeName) {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const res = await fetchDirectory(nodeId);
      this.setState({
        ...this.state,
        nodes: res,
        depth: this.state.depth + 1,
        curr: nodeName,
        breadCrumb: this.state.breadCrumb.concat(nodeName),
        prevState: { ...this.state },
        isLoading: false,
      });
    } catch (error) {
      throw new Error("error!");
    }
  }

  goBack() {
    this.setState({
      ...this.state.prevState,
      isLoading: false,
    });
  }

  showImage(url) {
    this.setState({
      ...this.state,
      selectedImage: url,
    });
  }
}

new App(document.querySelector(".App"));
