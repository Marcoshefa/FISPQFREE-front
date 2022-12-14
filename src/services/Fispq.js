import Api from './Api'

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Controller - service at Fispqs
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default {
    getAll () {
        return Api({}).get('/fispq/')
    },

    add (data) {
        return Api({}).post('/fispq/', data)
    },

    addComp (data) {
        return Api({}).post('/fispq/comp/', data)
    },

    delete(id) {
        return Api({}).delete('/fispq/' + id)
    },

    getOne(id) {
        return Api({}).get('/fispq/' + id)
    },

    update(id, dados) {
        return Api({}).put('/fispq/' + id, dados)
    },

    getFispq () {
        return Api({}).get('/fispq')
    },

    getFispqFrase () {
        return Api({}).get('/fispq/frase_perigo/')
    },

    getAllFrase () {
        return Api({}).get('/fispq/frase_perigo')
    },
}