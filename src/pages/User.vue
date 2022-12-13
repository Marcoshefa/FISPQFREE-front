<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>Usuário</h1>

            <v-btn color="green" class="ma-2 white--text" @click="goToAdd()">
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

                    
                        <!-- <template v-slot:activator="{ on, attrs }"> -->
                    <v-btn class="mx-2" fab dark small color="red" @click="dialogCancelar = true; idParaCancelar = item.id;">
                        <v-icon dark>
                            delete
                        </v-icon>
                    </v-btn>
                
                    <!-- v-dialog cria uma caixa de dialogo -->
                    <v-dialog v-model="dialogCancelar" persistent max-width="350">
                        <v-card>
                            <v-card-title class="text-h5">
                                <!-- o valor da {{}} será trocada pelo valor da propriedade do objeto de dados correspondente
                                neste exemplo: (idParaCancelar) coresponde a (idUser) do metodo excluirUser,
                                que corresponde a (id) do metodo delete do arquivo User.js,
                                que corresponde a (id_user) do metodo user_deleted do backend -->
                                Excluindo Usuário: {{idParaCancelar}}
                            </v-card-title>

                            <v-card-text>Tem certeza que deseja excluir o usuário?</v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="dialogCancelar = false; idParaCancelar = null;">
                                    Cancelar
                                </v-btn>
                                <v-btn color="green darken-1" text @click="excluirUser(idParaCancelar)">
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

// importa o arquivo User da pasta Service

import UserService from "../services/User";
export default {
    // data = instância o objeto ao carrear a página
    data() {
        return {
            // headers foi definido no inicio da página como cabeçalho da tabela
            headers: [
                { text: 'ID', align: 'start', value: 'id', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'Nome', align: 'start', value: 'name', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'e-mail', align: 'start', value: 'email', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'Celular', align: 'start', value: 'celular', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'Data de criação', align: 'start', value: 'created_at', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'Data da atualização', align: 'start', value: 'update_at', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'Nível de permissão', align: 'start', value: 'permission_id', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'Ações', align: 'start', value: 'actions', class:'blue lighten-3 subtitle-1 font-weight-black' }
            ],
            // Cria uma variavel para guarda a lista de objetos, neste caso os usuários
            users: [],
            dialogCancelar:false,
            idParaCancelar: null
        }
    },
    // Mounted = renderiza as informações ao carregar a página
    // Chamado depois que o componente foi montado.Um componente é considerado montado após:
    // Todos os seus componentes filhos síncronos foram montados (não inclui componentes assíncronos)
    mounted() {

        // o metodo getUser é um metodo definido no arquivo User.js localizado na pasta Service.
        // Neste exemplo o metodo getUser chama a Api utilizando o metodo de requisição get
        // e acrescentando o path a url.
        this.getUsers();
    },

    // Declare métodos a serem misturados na instância do componente.Os métodos declarados podem ser acessados
    // diretamente na instância do componente ou usados em expressões de modelo. Todos os métodos têm seu this
    // contexto vinculado automaticamente à instância do componente, mesmo quando transmitidos.

    methods: {
        async getUsers() {
            try {
                // Foi criado uma variavel "response" que acessará o metodo getAll do arquivo User.js dentro da pasta Service
                const response = await UserService.getAll();
                this.users = response.data.users_list.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        celular: user.celular,
                        created_at: new Date(user.created_at).toLocaleString('pt-br', { timeZone: 'UTC' }),
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