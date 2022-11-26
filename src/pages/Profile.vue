<template>
    <div>
        <v-snackbar
            v-model="showAlert"
            :color="colorAlert"
            timeout="3000"
            right
            top
        >
            {{ mensagemAlert }}
        </v-snackbar>
            
        <div>
            <h1>Profile</h1>
        </div>

        <div class="profile">
            <div class="profile_content d-flex align-start flex-wrap">
                <p><b>Nome:</b> {{ user_infos.name }}</p>
                <p><b>E-mail:</b> {{ user_infos.email }}</p>
                <p><b>Celular:</b> {{ user_infos.celular }}</p>
                <!-- <p><b>Grupo de Acesso:</b> {{ user_infos.permission }}</p> -->
                <p><b>Data de Criação:</b> {{ new Date(user_infos.created_at).toLocaleDateString() }}</p>
            </div>

            <hr />

            <v-form class="password_content" v-model="valid" ref="form">
                <v-text-field outlined v-model="password" :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword" :rules="[rules.required, rules.min]" label="Nova Senha"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'" required></v-text-field>

                <v-text-field outlined v-model="confirm_password" :type="showConfirm ? 'text' : 'password'"
                    @click:append="showConfirm = !showConfirm" :rules="[rules.required, rules.min]"
                    label="Confirme a senha" :append-icon="showConfirm ? 'visibility' : 'visibility_off'" required
                    style="margin-left: 10px"></v-text-field>

                <v-btn depressed color="primary" style="margin-left: 10px; margin-top: -25px" @click="alterarSenha()">
                    Alterar
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import UserService from "../services/User";

export default {
    data() {
        return {
            user_id: null,
            user_infos: {},
            showPassword: false,
            showConfirm: false,
            password: '',
            confirm_password: '',
            valid: true,
            showAlert: false,
            mensagemAlert: '',
            colorAlert: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters'
            },
        }
    },
    mounted() {
       
        this.user_id = localStorage.getItem("fispq-free_id");
        this.getUser();
    },
    methods: {
        async getUser() {
            try {
                const response = await UserService.getOne(this.user_id);
                this.user_infos = response.data.usuario;

            } catch (err) {
                this.user_infos = {};
            }
        },
        async alterarSenha() {
            try {
                if(this.password != this.confirm_password || !this.valid) {
                    this.mensagemAlert = 'As senhas não conferem!';
                    this.colorAlert = 'red';
                    this.showAlert = true;
                } else {
                    const data = {
                        'password': this.password
                    }
                    const response = await UserService.changePassword(this.user_id, data);
                    if (response.status === 200) {
                        this.mensagemAlert = 'Senhas alteradas com sucesso!';
                        this.colorAlert = 'green';
                        this.showAlert = true;
    
                        this.password = '';
                        this.confirm_password = '';
                        this.$refs.form.reset();
                    }
                }           
            } catch (err) {
                this.mensagemAlert = 'Tivemos um erro na alteração de senha. Entre em contato com o administrador!';
                this.colorAlert = 'red';
                this.showAlert = true;
            }
        }
    }
}
</script>

<style>
.profile {
    margin-top: 25px;
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
}
.profile .profile_content {
    border-color: 1px solid #CCC;
    width: 100%;
}
.profile .profile_content p {
    min-width: 33%;
}
.profile .password_content {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>