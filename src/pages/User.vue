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
                no-data-text="Não encontramos usuários cadastrados.">
                
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/edit-user/' + item.id">
                        <v-icon dark>
                            edit
                        </v-icon>
                    </v-btn>

                    <v-dialog v-model="dialogCancelar" persistent max-width="350">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn class="mx-2" fab dark small color="red" v-bind="attrs" v-on="on">
                                <v-icon dark>
                                    delete
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="text-h5">
                                Excluindo Usuário
                            </v-card-title>

                            <v-card-text>Tem certeza que deseja excluir o usuário?{{item.id}}</v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="dialogCancelar = false">
                                    Cancelar
                                </v-btn>
                                <v-btn color="green darken-1" text @click="excluirUser(item.id)">
                                    SIM
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                </template>
            </v-data-table>
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
                { text: 'Data da atualização', align: 'start', value: 'update_at' },
                { text: 'Nível de permissão', align: 'start', value: 'permission_id' },
                { text: 'Ações', align: 'start', value: 'actions' }
            ],
            users: [],
            dialogCancelar:false
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            try {
                const response = await UserService.getAll();
                this.users = response.data.users_list.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        celular: user.celular,
                        created_at: new Date(user.created_at).toLocaleDateString(),
                        update_at: user.update_at,
                        permission_id: user.permission_id,
                    }
                });
            } catch (err) {
                this.users = [];
            }
        },
        async excluirUser(idUser) {
            try {
                await UserService.delete(idUser);
                this.dialogCancelar = false;
                this.getUsers();

            } catch (err) {
                console.log(err)
            }
        },

        goToAdd() {
            this.$router.push({path: '/dash/add-user'});
        }
    }
}
</script>