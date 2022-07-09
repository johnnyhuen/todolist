let list = ["apple", "banana"]

const get = (uri) => {
    //API of return list
    if (uri == 'list') {
        // Return the list
        return { 'code': 200, list }
    } else {
        return { 'code': 400, 'error': true }
    }
    
}

const post = (uri, body) => {
    //API of add a new item to the list
    if (uri == 'list') {
        try {
            const reqJson = JSON.parse(body)
            // Get the raw body
            const newList = reqJson.item
            // Check the data correct
            if (typeof newList !== 'string') {
                throw new Error
            } 
            // Check if duplicate
            if (list.indexOf(newList)==-1){
                list.push(newList)
                return { 'code': 200, list }
            } else {
                return { 'code': 404, 'error': true, 'message': 'You cannot add duplicate item' }
            }
        } catch (e) {
            return { 'code': 404, 'error': true }
        }
    } else {
        return { 'code': 400, 'error': true }
    }
}

const remove = (uri, body) => {
    // API of remove an item
    if (uri == 'list') {
        try {
            const reqJson = JSON.parse(body)
            // Get the raw body
            const removeList = reqJson.item
            if (typeof removeList !== 'string') {
                throw new Error
            }
            const i = list.indexOf(removeList)
            // Check item exists
            if (i == -1){
                return { 'code': 404, 'error': true, 'message': 'Cannot find this item' }
            } else {
                // Remove a item from the list
                list.splice(i, 1)
                return { 'code': 200, list }
            } 
        } catch (e) {
            return { 'code': 404, 'error': true }
        }
    } else if (uri == 'all') {
        //API of remove all items
        if (list.length == 0){
            return { 'code': 404, 'error': true }
        } else {
            // Remove all items
            list = []
            return { 'code': 200, list }
        }
    } else {
        return { 'code': 400, 'error': true }
    }
}

module.exports = { get, post, remove }