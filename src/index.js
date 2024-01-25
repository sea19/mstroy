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
exports.TreeStore = void 0;
var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.nodes = {};
        this.items = __spreadArray([], items, true);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (this.nodes[item.id]) {
                this.nodes[item.id].item = item;
            }
            else {
                this.nodes[item.id] = {
                    item: item,
                    children: [],
                };
            }
            var parentId = item.parent;
            if (parentId === "root")
                continue;
            if (this.nodes[parentId]) {
                this.nodes[parentId].children.push(item.id);
            }
            else {
                this.nodes[parentId] = { item: null, children: [item.id] };
            }
        }
    }
    TreeStore.prototype.getAll = function () {
        return this.items;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.nodes[id].item;
    };
    TreeStore.prototype.getChildren = function (id) {
        var _this = this;
        return this.nodes[id].children.map(function (childId) { return _this.getItem(childId); });
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var children = this.getChildren(id);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            children.push.apply(children, this.getChildren(child.id));
        }
        return children;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var item = this.getItem(id);
        if (item.parent === 'root')
            return [];
        var firstParent = this.getItem(item.parent);
        var parents = [firstParent];
        for (var _i = 0, parents_1 = parents; _i < parents_1.length; _i++) {
            var parent_1 = parents_1[_i].parent;
            if (parent_1 !== 'root') {
                parents.push(this.getItem(parent_1));
            }
        }
        return parents;
    };
    return TreeStore;
}());
exports.TreeStore = TreeStore;
