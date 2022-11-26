<template>
    <div>
        <h1>Atualizando usuário</h1>

        <v-alert v-if="finish" shaped outlined type="success" style=" margin: 20px">
            Usuário atualizado com sucesso! Você será redirecionada para a pagina de usuários.
            <a @click="goToList()">Ir Agora</a>
        </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation
            style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">

            <v-text-field v-model="name" :rules="nameRules" label="Name" outlined required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="e-mail" outlined required></v-text-field>
            <v-text-field v-model="celular" label="Celular" outlined required></v-text-field>

           
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="updateUser">
                Atualizar
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
                Limpar
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import UserService from "../services/User";

export default {
    data() {
        return {
            valid: false,
            finish: false,
            name: '',
            email: '',
            celular: '',
            data_atual: '',
            nameRules: [
                v => !!v || 'Nome é obrigatório'
            ],
            emailRules: [
                v => !!v || 'email é obrigatório'
            ],
           
            idUser: null
        }
    },
    mounted() {
        this.idUser = this.$route.params.id;
        this.getUser();
    },
    methods: {
        async getUser() {
            try {
                const response = await UserService.getOne(this.idUser);
                this.name = response.data.usuario.name;
                this.email = response.data.usuario.email;
                this.celular = response.data.usuario.celular;


            } catch (err) {
                this.users = [];
            }
        },
        async updateUser() {
            try {
                const data = {
                    name: this.name,
                    email: this.email,
                    celular: this.celular,
                    nameRules: [
                        v => !!v || 'Nome é obrigatório'
                    ],
                    emailRules: [
                        v => !!v || 'email é obrigatório'
                    ],

                }

                await UserService.update(this.idUser, data);

                this.finish = true;
                this.reset();

                setTimeout(() => {
                    this.goToList();
                }, 3000);

            } catch (err) {
                console.log(err);
            }
        },
        goToList() {
            this.$router.push({ path: '/dash/user' });
        },
        reset() {
            this.$refs.form.reset();
        },
    }
}
</script>

