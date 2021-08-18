class ImageModal {
  $target;
  $props;

  constructor({ $app, $target, $props }) {
    this.$target = $target;
    this.$target.classList.add("Modal");
    this.$target.classList.add("ImageViewer");
    $props.state.selectedImage
      ? (this.$target.style.display = "block")
      : (this.$target.style.display = "none");
    this.$props = $props;
    $app.appendChild(this.$target);
    this.setEvent();
    this.render();
  }

  setEvent() {
    document.body.addEventListener("click", ({ target }) => {
      const targetClassList = target.classList;
      if (targetClassList.contains("Modal")) {
        target.style.display = "none";
      }
    });

    window.onkeyup = function (e) {
      const key = e.keyCode ? e.keyCode : e.which;
      const modal = document.querySelector(".Modal");
      if (key === 27 && modal.style.display === "block") {
        modal.style.display = "none";
      }
    };
  }

  templateBuilder(selectedImage) {
    return `
          <div class="content">
              <img src=${selectedImage}>
          </div>
      `;
  }

  render() {
    const { selectedImage } = this.$props.state;
    if (selectedImage) {
      this.$target.innerHTML = this.templateBuilder(selectedImage);
    }
  }
}

export default ImageModal;
