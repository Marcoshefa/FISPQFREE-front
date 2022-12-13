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
    },
    getUsers () {
        return Api({}).get('/users')
    },

    getUser (idUser) {
        return Api({}).get('/user/?id=' + idUser)
    },

    changePassword(idUser, data) {
        return Api({}).post('/user/change_password/' + idUser, data)
    },
}
