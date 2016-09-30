import TestChild from './components/TestChild'

// Sync route definition
export default function () {
    // Tip inject key for sync router
    return {
        path: 'child',
        component: TestChild
    }
}
