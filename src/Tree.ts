export default class Tree {
    value: string
    children: Tree[]

    constructor(value: string) {
        this.value = value
        this.children = []
    }

    addChild(value: string): Tree {
        const child = new Tree(value)
        this.children.push(child)
        return child
    }

    addChildren(nodeName: string, arr: string[]): Tree {
        const subTree = this.find(nodeName)
        arr.forEach((item) => subTree.addChild(item))
        return subTree
    }

    traverseBF(fn: (arg: Tree) => void): void {
        const queue = [...this.children]
        while (queue.length) {
            const node = queue.shift()
            if (node) queue.push(...node.children)
            if (node) fn(node)
        }
    }

    traverseDF(fn: (arg: Tree) => void): void {
        const stack = [...this.children]
        while (stack.length) {
            const node: Tree | undefined = stack.shift()
            if (node) stack.unshift(...node?.children)
            if (node) fn(node)
        }
    }
    traverseLevelOrder(fn: (arg: string[][]) => void): void {
        const ans: string[][] = []
        let level = 0
        const exec = (root: Tree) => {
            if (ans.length === level) {
                ans.push([root.value])
            } else {
                ans[level].push(root.value)
            }
            level++
            for (const n of root.children) {
                exec(n)
            }
            level--
        }
        exec(this)
        fn(ans)
    }

    findLevel(needle: string): number {
        const ans: Record<string, number> = {}
        let level = 0
        const exec = (root) => {
            ans[root.value] = level
            level++
            for (const n of root.children) {
                exec(n)
            }
            level--
        }
        exec(this)
        return ans[needle]
    }

    traverse(fn: (arg: Tree) => void): void {
        function exec(subTree) {
            if (subTree.children.length) {
                subTree.children.forEach(exec)
            }
            fn(subTree)
        }
        exec(this)
    }

    find(value: string): Tree {
        let output
        function exec(subTree) {
            if (subTree.value === value) {
                output = subTree
                return
            }
            if (subTree.children.length && !output) {
                for (const child of subTree.children) {
                    exec(child)
                }
            }
        }

        exec(this)
        return output
    }

    toString(): string {
        return JSON.stringify(this)
    }
}
