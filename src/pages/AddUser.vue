<template>
    <div>
        <h1>Cadastre o novo usuário</h1>

        <v-alert v-if="finish" shaped outlined type="success" style=" margin: 20px">
            Usuário cadastrado com sucesso! Você será redirecionado ...
        </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation
            style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">

            <v-text-field v-model="name" :rules="nameRules" label="Name" outlined required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="e-mail" outlined required></v-text-field>
            <v-text-field v-model="celular" label="Celular" outlined required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" label="Password" outlined required></v-text-field>
            <v-text-field v-model="permission_id" label="Nível de permissão" outlined required></v-text-field>
            <!-- <v-textarea v-model="description" name="input-5-1" label="Descrição" outlined></v-textarea> -->

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="addUser">
                Cadastrar
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
            password: '',
            permission_id: '',
            nameRules: [
                v => !!v || 'Nome é obrigatório'
            ],
            emailRules: [
                v => !!v || 'email é obrigatório'
            ],
            passwordRules: [
                v => !!v || 'password é obrigatório'
            ],
        }
    },

    mounted() {
    },

    methods: {
        async addUser() {
            try {
                const data = {
                    name: this.name,
                    email: this.email,
                    celular: this.celular,
                    password: this.password,
                    permission_id: this.permission_id,
                }
                await UserService.add(data);
                
                this.finish = true;
                this.reset();

                setTimeout(() => {
                    this.$router.push({path: '/dash/user'});
                }, 10000);
                
            } catch (err) {
                console.log(err);
            }
        },
        reset() {
            this.$refs.form.reset();
        },
    }
}
</script>