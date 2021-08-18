export async function fetchRoot() {
  try {
    const res = await fetch(
      `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev`,
    );
    return await res.json();
  } catch (e) {
    throw new Error("error!");
  }
}

export async function fetchDirectory(nodeId) {
  try {
    const res = await fetch(
      `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${nodeId}`,
    );
    return await res.json();
  } catch (e) {
    throw new Error("error!");
  }
}
