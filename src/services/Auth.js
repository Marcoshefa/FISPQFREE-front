import Api from './Api'

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Controller - service at Authentication
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default {
    login (data) {
        return Api({}).post('/login', data)
    },

}
