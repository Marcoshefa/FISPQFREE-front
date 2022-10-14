<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>Usuário</h1>

            <v-btn color="blue-grey" class="ma-2 white--text" @click="goToAdd()">
                <v-icon left dark>
                    add
                </v-icon>
                Novo Usuário
            </v-btn>
        </div>

        <div style="margin-top: 25px">
            <v-data-table :headers="headers" :items="users" class="elevation-1"
                no-data-text="Não encontramos usuários cadastrados."></v-data-table>
        </div>
    </div>
</template>

<script>

import UserService from "../services/User";
export default {
    data() {
        return {
            headers: [
                { text: 'ID', align: 'start', value: 'id', },
                { text: 'Nome', align: 'start', value: 'name' },
                { text: 'e-mail', align: 'start', value: 'email' },
                { text: 'Celular', align: 'start', value: 'celular' },
                { text: 'Data de criação', align: 'start', value: 'created_at' },
                // { text: 'Data da atualização', align: 'start', value: 'update_at' },
                { text: 'Nível de permissão', align: 'start', value: 'permission_id' }
            ],
            users: []
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            try {
                const response = await UserService.getAll();
                console.log(response)
                this.users = response.data.users_list.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        celular: user.celular,
                        created_at: new Date(user.created_at).toLocaleDateString(),
                        permission_id: user.permission_id,
                    }
                });
            } catch (err) {
                this.users = [];
            }
        },
        goToAdd() {
            this.$router.push({path: '/dash/add-user'});
        }
    }
}
</script>