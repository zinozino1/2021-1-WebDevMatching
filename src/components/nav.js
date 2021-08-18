class Nav {
  $target;
  $props;
  constructor({ $app, $target, $props }) {
    this.$target = $target;
    this.$props = $props;
    this.$target.className = "breadCrumb";
    $app.appendChild(this.$target);
    this.render();
  }

  template() {
    const { breadCrumb } = this.$props.state;
    return breadCrumb.map((v) => `<div>${v}</div>`).join("");
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default Nav;
