import React from 'react';
import "./TreeTraversalVisualizer.css"
import TreeBackEnd from './TraversalLogic/Tree.js'
const ANIMATION_SPEED = 1500;

function Node(props) {
    const colour = props.colour;
    return (
        <button className="node" style={{ background: colour }}>{props.node}</button>
    )
}

class TreeTraversalVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: new TreeBackEnd(),
            lastAddedToTree: '',
            displayTraversal: [],
            nodes: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    generateTree() {
        let newTree = new TreeBackEnd();
        for (let i = 0; i < 8; i++) {
            newTree.insert(Math.floor(Math.random() * 100) + 1);
        }
        this.setState({ tree: newTree, nodes: 8 });
    }

    handleChange(event) {
        this.setState({ lastAddedToTree: event.target.value });
    }

    handleSubmit(event) {
        if (parseInt(this.state.lastAddedToTree) && this.state.nodes < 8) {
            this.state.tree.insert(parseInt(this.state.lastAddedToTree));
            this.setState({ nodes: this.state.nodes + 1 });
        }
        else {
            let message = this.state.nodes === 8 ? "For UX reasons it is recommended to have a maximum of 8 nodes." : "Enter an Number please!"
            alert(message);
        }
        event.preventDefault();
    }
    refreshTree(req) {
        let highestTimeoutId = setTimeout(';');
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
        let animation = this.state.tree.getTraversalResponse(req);
        for (let i = 0; i < animation.length; i++) {
            animation[i].leaveNode();
        }
        this.setState({ displayTraversal: [] });
    }
    deleteTree(){
        this.refreshTree('post');
        this.setState({ tree: new TreeBackEnd(), nodes: 0 });
    }
    sendTraversalRequest(req) {
        if (this.state.tree.head == null) {
            alert("You have an empty tree, add some elements!");
            return;
        }
        this.refreshTree(req);
        let animation = this.state.tree.getTraversalResponse(req);
        for (let i = 0; i < animation.length; i++) {
            setTimeout(() => {
                animation[i].visitNode()
                const temp = this.state.displayTraversal.slice().concat([animation[i].value]);
                this.setState({ displayTraversal: temp });
            }, i * ANIMATION_SPEED);
        }
        setTimeout(() => {
            this.refreshTree(req);
        }, (animation.length + 1) * ANIMATION_SPEED);
    }
    renderTreeRecursive(node) {
        if (node == null || (node.right == null && node.left == null)) {
            return;
        }
        return (
            <ul>
                {node.left && <li>
                    <Node node={node.left.value} colour={node.left.colour}></Node>
                    {this.renderTreeRecursive(node.left)}
                </li>}
                {(!node.left && node.right) && <li>
                    <Node></Node>
                </li>}
                {node.right && <li>
                    <Node node={node.right.value} colour={node.right.colour}></Node>
                    {this.renderTreeRecursive(node.right)}
                </li>}
                {(!node.right && node.left) && <li>
                    <Node ></Node>
                </li>}
            </ul>
        );
    }
    render() {
        return (
            <div>
                <div>
                    <h1>Binary Search Tree Traversal Visualizer</h1>
                    <form>
                        <label>
                            <input type="number" value={this.state.lastAddedToTree} onChange={this.handleChange} placeholder="Enter Number to Insert To Binary Search Tree" />
                        </label>
                        <input type="submit" value="Insert" onClick={this.handleSubmit} />
                    </form>
                    <div>
                        <button onClick={() => this.sendTraversalRequest('pre')}>Pre Order Traversal</button>
                        <button onClick={() => this.sendTraversalRequest('in')}>In Order Traversal</button>
                        <button onClick={() => this.sendTraversalRequest('post')}>Post Order Traversal</button>
                    </div>
                    <div>
                        <button onClick={() => this.deleteTree()}>Restart Tree</button>
                        <button onClick={() => this.generateTree()}>Generate New Tree</button>
                    </div>
                    <div>
                        <p>{this.state.displayTraversal.toString()}</p>
                    </div>
                </div>
                {this.state.tree.head && <div className="tree">
                    <ul>
                        <li>
                            <Node node={this.state.tree.head.value} colour={this.state.tree.head.colour}></Node>
                            {this.renderTreeRecursive(this.state.tree.head)}
                        </li>
                    </ul>
                </div>}
            </div>
        );
    }
}


export default TreeTraversalVisualizer;
