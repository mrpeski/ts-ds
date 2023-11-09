"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tree = /** @class */ (function () {
    function Tree(value) {
        this.value = value;
        this.children = [];
    }
    Tree.prototype.addChild = function (value) {
        var child = new Tree(value);
        this.children.push(child);
        return child;
    };
    Tree.prototype.addChildren = function (nodeName, arr) {
        var subTree = this.find(nodeName);
        arr.forEach(function (item) { return subTree.addChild(item); });
        return subTree;
    };
    Tree.prototype.traverseBF = function (fn) {
        var queue = __spreadArray([], this.children, true);
        while (queue.length) {
            var node = queue.shift();
            if (node)
                queue.push.apply(queue, node.children);
            if (node)
                fn(node);
        }
    };
    Tree.prototype.traverseDF = function (fn) {
        var stack = __spreadArray([], this.children, true);
        while (stack.length) {
            var node = stack.shift();
            if (node)
                stack.unshift.apply(stack, node === null || node === void 0 ? void 0 : node.children);
            if (node)
                fn(node);
        }
    };
    Tree.prototype.traverseLevelOrder = function (fn) {
        var ans = [];
        var level = 0;
        var exec = function (root) {
            if (ans.length === level) {
                ans.push([root.value]);
            }
            else {
                ans[level].push(root.value);
            }
            level++;
            for (var _i = 0, _a = root.children; _i < _a.length; _i++) {
                var n = _a[_i];
                exec(n);
            }
            level--;
        };
        exec(this);
        fn(ans);
    };
    Tree.prototype.findLevel = function (needle) {
        var ans = {};
        var level = 0;
        var exec = function (root) {
            ans[root.value] = level;
            level++;
            for (var _i = 0, _a = root.children; _i < _a.length; _i++) {
                var n = _a[_i];
                exec(n);
            }
            level--;
        };
        exec(this);
        return ans[needle];
    };
    Tree.prototype.traverse = function (fn) {
        function exec(subTree) {
            if (subTree.children.length) {
                subTree.children.forEach(exec);
            }
            fn(subTree);
        }
        exec(this);
    };
    Tree.prototype.find = function (value) {
        var output;
        function exec(subTree) {
            if (subTree.value === value) {
                output = subTree;
                return;
            }
            if (subTree.children.length && !output) {
                for (var _i = 0, _a = subTree.children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    exec(child);
                }
            }
        }
        exec(this);
        return output;
    };
    Tree.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Tree;
}());
exports.default = Tree;
