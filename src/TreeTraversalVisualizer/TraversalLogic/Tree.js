import NodeBackEnd from './Node.js'

export default class TreeBackEnd {
    constructor() {
        this.head = null;
        this.order = [];
    }
    insert(value) {
        if (this.head == null) {
            this.head = new NodeBackEnd(value);
            return;
        }
        this.insertHelper(this.head, value);
    }
    insertHelper(node, value){
        if(value > node.value){
            if(node.right == null){
                node.right = new NodeBackEnd(value);
                return;
            }
            else{
                this.insertHelper(node.right, value);
            }
        }
        else{
            if(node.left == null){
                node.left = new NodeBackEnd(value);
                return;
            }
            else{
                this.insertHelper(node.left, value);
            }
        }
    }

    inOrderTraversal(node) {
        if (node == null) {
            return;
        }
        this.inOrderTraversal(node.left);
        this.order.push(node);
        this.inOrderTraversal(node.right);
        return;
    }

    preOrderTraversal(node) {
        if (node == null) {
            return;
        }
        this.order.push(node);
        this.preOrderTraversal(node.left);
        this.preOrderTraversal(node.right);
        return;
    }

    postOrderTraversal(node) {
        if (node == null) {
            return;
        }
        this.postOrderTraversal(node.left);
        this.postOrderTraversal(node.right);
        this.order.push(node);
        return;
    }
    getTraversalResponse(req) {
        if (req === 'in') {
            this.inOrderTraversal(this.head);
        }
        else if (req === 'pre') {
            this.preOrderTraversal(this.head);
        }
        else if (req === 'post') {
            this.postOrderTraversal(this.head);
        }
        let output = this.order.slice();
        this.order = [];
        return output;
    }

}