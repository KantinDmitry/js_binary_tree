'use strict';

class BinaryTree {

	constructor() {
		this.root = null
	}

	insert(data) {
		if(this.root) this.recursive_insert(this.root, data);
		else this.root = new Node(data);
	}

	recursive_insert(node, data){
		if(!node.data) node.data = data;
		else {
			var direction = (data > node.data)? 'right' : 'left';
			if (!node[direction])	node[direction] = new Node();
			this.recursive_insert(node[direction], data);
		}

	}

	contains(data) {
		return this.recursive_contains(this.root, data)
	}

	recursive_contains(node, data){
		var found = (node.data == data);
		if(node.right) found = found || this.recursive_contains(node.right, data);
		if(node.left) found = found || this.recursive_contains(node.left, data);
		return found;
	}

	remove(data) {
		if(this.root && this.root.data == data){
			this.remove_root();
			return;
		}
		var previous_node = this.find_previous_node(this.root, data);
		if(!previous_node) return;
		var direction;
		if(previous_node.right && previous_node.right.data == data) direction = 'right';
		if(previous_node.left && previous_node.left.data == data) direction = 'left';
		var deliting_node = previous_node[direction];
		if(deliting_node.right){
			previous_node[direction] = deliting_node.right;
			var extending_node = deliting_node.right;
			while(extending_node.left) extending_node = extending_node.left;
			extending_node.left = deliting_node.left
		}
		else
			previous_node[direction] = deliting_node.left;
	}

	remove_root(){
		if(!this.root.right){
			this.root = this.root.left;
			return;
		}
		var left_branch = this.root.left;
		this.root = this.root.right
		var extending_node = this.root;
		while(extending_node.left) extending_node = extending_node.left;
		extending_node.left = left_branch
	}

	find_previous_node(node, data){
		var previous_node = null;
		if(node.right){
			if(node.right.data == data) previous_node = node;
			else
				previous_node = previous_node || this.find_previous_node(node.right, data);
		}
		if(node.left){
			if(node.left.data == data) previous_node = node;
			else
				previous_node = previous_node || this.find_previous_node(node.left, data);
		}
		return previous_node;
	}

	size() {
		this.elements_count = 0;
		this.recursice_size(this.root);
		return this.elements_count;
	}

	recursice_size(node){
		if(!node) return;
		this.elements_count++;
		if(node.right) this.recursice_size(node.right);
		if(node.left) this.recursice_size(node.left);
	}

	isEmpty() {
		return (this.root == null);
	}
}
