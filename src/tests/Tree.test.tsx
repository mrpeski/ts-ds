import { beforeEach, describe, it, expect } from '@jest/globals'
import Tree from '../Tree'

describe('Tree Class', () => {
    const tree = new Tree('root')
    beforeEach(() => {
        tree.addChildren('root', [
            'markets',
            'retailers',
            'brands',
            'category',
            'gender',
            'size',
            'colours',
            'patterns',
            'price',
            'style',
        ])
        tree.addChildren('category', [
            'tops',
            'footwear',
            'accessories',
        ]).addChildren('footwear', ['boots'])
        tree.addChildren('accessories', ['belt', 'anklets'])
    })

    it('should return proper levels', () => {
        expect(tree.findLevel('belt')).toBe(3)
    })
})
