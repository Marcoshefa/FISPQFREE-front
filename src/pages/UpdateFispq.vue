<template>
    <div>
        <h1>Atualizando Fispq</h1>

        <v-alert v-if="finish" shaped outlined type="success" style=" margin: 20px">
            Fispq atualizada com sucesso! Você será redirecionada para a pagina de principal.
            <a @click="goToList()">Ir Agora</a>
        </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation
            style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">

            <v-text-field v-model="idfispq" :rules="idfispqRules" label="ID Fispq" outlined required></v-text-field>
            <v-text-field v-model="produto" :rules="produtoRules" label="Produto" outlined required></v-text-field>
           
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="updateFispq">
                Atualizar
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
                Limpar
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import FispqService from "../services/Fispq";
export default {
    data() {
        return {
            valid: false,
            finish: false,
            idfispq: '',
            produto: '',
            idfispqRules: [
                v => !!v || 'ID é obrigatório'
            ],
            produtoRules: [
                v => !!v || 'Produto é obrigatório'
            ],
           
            idFispq: null
        }
    },
    mounted() {
        this.idFispq = this.$route.params.id;
        this.getFispq();
    },
    methods: {
        async getFispq() {
            try {
                const response = await FispqService.getOne(this.idFispq);
                this.idfispq = response.data.idfispq;
                this.produto = response.data.produto;

            } catch (err) {
                this.fispqs = [];
            }
        },
        async updateFispq() {
            try {
                const data = {
                idfispq: this.idfispq,
                produto: this.produto,

                idfispqRules: [
                    v => !!v || 'Id é obrigatório'
                ],
                produtoRules: [
                    v => !!v || 'Produto é obrigatório'
                ],

                }

                await FispqService.update(this.idFispq, data);
                this.finish = true;
                this.reset();
                setTimeout(() => {
                    this.goToList();
                }, 5000);

            } catch (err) {
                console.log(err);
            }
        },
        goToList() {
            this.$router.push({ path: '/dash/fispq' });
        },
        reset() {
            this.$refs.form.reset();
        },
    }
}
</script>