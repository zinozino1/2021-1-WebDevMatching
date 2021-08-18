class Nodes {
  $target;
  $props;

  constructor({ $app, $target, $props }) {
    this.$target = $target;
    this.$props = $props;
    this.$target.className = "Nodes";
    this.setEvent();
    $app.appendChild(this.$target);
    this.render();
  }

  templateBuilder() {
    const { nodes, depth } = this.$props.state;
    const prevBtn =
      depth === 0
        ? ""
        : `
      <div class="Node" data-node-type="back" data-node-id="-1" data-node-name="back">
        <img src="./assets/prev.png">
      </div>
      `;
    return (
      prevBtn +
      nodes
        .map((node) => {
          const path =
            node.type === "DIRECTORY"
              ? "./assets/directory.png"
              : "./assets/file.png";
          const imageSrc = node.filePath && node.filePath;
          return `
          <div class="Node" data-node-id=${node.id} data-node-type=${
            node.type
          } data-node-name=${node.name} data-image-path=${imageSrc && imageSrc}>
              <img src=${path}>
              <div>${node.name}</div>
          </div>
          `;
        })
        .join("")
    );
  }

  setEvent() {
    this.$target.addEventListener("click", ({ target }) => {
      const targetNode = target.closest(".Node");
      const { nodeId, nodeType, nodeName, imagePath } = targetNode.dataset;
      if (nodeId) {
        if (nodeType === "DIRECTORY") {
          this.$props.changeDirectory(nodeId, nodeName);
        } else if (nodeType === "FILE") {
          this.$props.showImage(
            imagePath &&
              `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public${imagePath}`,
          );
        } else {
          this.$props.goBack();
        }
      }
    });
  }

  render() {
    this.$target.innerHTML = this.templateBuilder();
  }
}

export default Nodes;
