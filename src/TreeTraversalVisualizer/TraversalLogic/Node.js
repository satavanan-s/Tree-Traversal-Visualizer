export default class NodeBackEnd {
    constructor(value) {
        this.colour = 'lightsalmon';
        this.value = value;
        this.left = null;
        this.right = null;
    }
    visitNode() {
        this.colour = 'lightblue'
    }
    leaveNode() {
        this.colour = 'lightsalmon'
    }
}