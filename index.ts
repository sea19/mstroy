type Id = string | number;
    
interface Item {
    id: Id;
    parent: Id | 'root';
    [key: string]: any;
}

interface Node {
    item: Item,
    children: Id[],
}

interface Nodes {
    [id: Id]: Node;
}


export class TreeStore {
    items: Item[];
    nodes: Nodes = {};

    constructor(items: Item[]) {
        this.items = items;

        for (const item of items) {
            if (this.nodes[item.id]) {
                this.nodes[item.id].item = item;
            }
            else {
                this.nodes[item.id] = {
                    item: item,
                    children: [],
                }
            }

            const parentId = item.parent;

            if (parentId === "root") continue;

            if (this.nodes[parentId]) {
                this.nodes[parentId].children.push(item.id);
            }
            else {
                this.nodes[parentId] = { item: null, children: [item.id]};
            }
        }
    }

    getAll(): Item[] {
        return this.items;
    }

    getItem(id: Id): Item {
        return this.nodes[id].item;
    }

    getChildren(id: Id): Item[] {
        return this.nodes[id].children.map(childId => this.getItem(childId));
    }

    getAllChildren(id: Id): Item[] {
        const children: Item[] = this.getChildren(id);

        for (const child of children) {
            children.push(...this.getChildren(child.id));
        }

        return children;
    }

    getAllParents(id: Id): Item[] {
        const item = this.getItem(id);
        if (item.parent === 'root') return [];

        const firstParent = this.getItem(item.parent);
        const parents = [firstParent];

        for (const { parent } of parents) {
            if (parent !== 'root') {
                parents.push(this.getItem(parent));
            }
        }
        
        return parents;
    }
}