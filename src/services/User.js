import Api from './Api'

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Controller - service at Users
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default {
    getAll () {
        return Api({}).get('/user/')
    },

    add (data) {
        return Api({}).post('/user/', data)
    },

    delete(id) {
        return Api({}).delete('/user/' + id)
    },

    getOne(id) {
        return Api({}).get('/user/' + id)
    },

    update(id, dados) {
        return Api({}).put('/user/' + id, dados)
    }
}
