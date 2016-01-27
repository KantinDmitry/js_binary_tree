'use strict';

class BinaryTree {

  constructor() {
    this.root = null;
  }

  insert(data) {
    if (this.root) this.recursiveInsert(this.root, data);
    else this.root = new Node(data);
  }

  recursiveInsert(node, data) {
    if (!node.data) node.data = data;
    else {
      var direction = (data > node.data) ? 'right' : 'left';
      if (!node[direction])  node[direction] = new Node();
      this.recursiveInsert(node[direction], data);
    }
  }

  contains(data) {
    return this.recursiveContains(this.root, data);
  }

  recursiveContains(node, data) {
    var found = (node.data == data);
    if (node.right) found = found || this.recursiveContains(node.right, data);
    if (node.left) found = found || this.recursiveContains(node.left, data);
    return found;
  }

  remove(data) {
    if (this.root && this.root.data == data) {
      this.removeRoot();
      return;
    }

    var previousNode = this.findPreviousNode(this.root, data);
    if (!previousNode) return;
    var direction;
    if (previousNode.right && previousNode.right.data == data) direction = 'right';
    if (previousNode.left && previousNode.left.data == data) direction = 'left';
    var deletingNode = previousNode[direction];
    if (deletingNode.right) {
      previousNode[direction] = deletingNode.right;
      var extendingNode = deletingNode.right;
      while (extendingNode.left) extendingNode = extendingNode.left;
      extendingNode.left = deletingNode.left;
    } else
      previousNode[direction] = deletingNode.left;
  }

  removeRoot() {
    if (!this.root.right) {
      this.root = this.root.left;
      return;
    }

    var leftBranch = this.root.left;
    this.root = this.root.right;
    var extendingNode = this.root;
    while (extendingNode.left) extendingNode = extendingNode.left;
    extendingNode.left = leftBranch;
  }

  findPreviousNode(node, data) {
    var previousNode = null;
    if (node.right) {
      if (node.right.data == data) previousNode = node;
      else
        previousNode = previousNode || this.findPreviousNode(node.right, data);
    }

    if (node.left) {
      if (node.left.data == data) previousNode = node;
      else
        previousNode = previousNode || this.findPreviousNode(node.left, data);
    }

    return previousNode;
  }

  size() {
    this.elementsCount = 0;
    this.recursiceSize(this.root);
    return this.elementsCount;
  }

  recursiceSize(node) {
    if (!node) return;
    this.elementsCount++;
    if (node.right) this.recursiceSize(node.right);
    if (node.left) this.recursiceSize(node.left);
  }

  isEmpty() {
    return (this.root == null);
  }
}
