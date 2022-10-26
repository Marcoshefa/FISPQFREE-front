<template>
    <div>
        <h1>Cadastre uma nova FISPQ</h1>

        <v-stepper v-model="e1" >
            <v-stepper-header style= "height: 350px">
                <v-stepper-step :complete="e1 > 1" step="1"> IDENTIFICAÇÃO </v-stepper-step><v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2"> CLASSIFICAÇÃO DE PERIGO DO PRODUTO </v-stepper-step><v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" step="3"> COMPOSIÇÃO E INFORMAÇÕES SOBRE OS INGREDIENTES </v-stepper-step><v-divider></v-divider>
                <v-stepper-step :complete="e1 > 4" step="4"> CONTROLE DE EXPOSIÇÃO E PROTEÇÃO INDIVIDUAL</v-stepper-step><v-divider></v-divider>
                <v-stepper-step :complete="e1 > 5" step="5"> PROPRIEDADES FISICAS E QUÍMICAS </v-stepper-step><v-divider></v-divider>
                <v-stepper-step :complete="e1 > 6" step="6"> ESTABILIDADE E REATIVIDADE</v-stepper-step><v-divider></v-divider>
                <v-stepper-step step="7">Name of step 3</v-stepper-step>
            </v-stepper-header>
    
        <v-stepper-items>
            <v-stepper-content step="1" style="background: #FFF; border-radius: 5px; padding: 20px; margin-top: 30px">
            
                <v-text-field v-model="idfispq" name="input-5-1" label="Cód. interno" outlined required></v-text-field>
                <v-text-field v-model="produto" name="input-5-1" label="Nome da substância ou mistura" outlined required></v-text-field>
                <v-text-field v-model="uso" name="input-5-1" label="Principais usos recomendados para a substância ou mistura:" outlined required></v-text-field>

            <v-btn
                color="primary"
                @click="e1 = 2"
            >
                Continue
            </v-btn>
    
            <v-btn text>
                Cancel
            </v-btn>
            </v-stepper-content>
    
            <v-stepper-content step="2">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            ></v-card>

            <v-btn
                @click="e1 = 1" style="background: yellow; margin: 15px"
            >
                Voltar
            </v-btn>
            <v-btn
                color="primary"
                @click="e1 = 3"
            >
                Continue
            </v-btn>
    
            <v-btn text>
                Cancel
            </v-btn>
            </v-stepper-content>
    
            <v-stepper-content step="3">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            ></v-card>
    
            <v-btn
                color="primary"
                @click="e1 = 1"
            >
                Continue
            </v-btn>
    
            <v-btn text>
                Cancel
            </v-btn>
            </v-stepper-content>
        </v-stepper-items>
        </v-stepper>
    </div>
</template>



<!-- <template>
    <div>
        <h1>Cadastre uma nova FISPQ</h1>

        <v-alert v-if="finish" shaped outlined type="success" style=" margin: 20px">
            FISPQ cadastrada com sucesso! Você será redirecionado ...
            <a @click="goToList()">Ir Agora</a>
        </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation
            style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">

            <v-text-field v-model="idfispq" :rules="idfispqRules" label="ID Fispq" outlined required></v-text-field>
            <v-text-field v-model="produto" :rules="produtoRules" label="Produto" outlined required></v-text-field>

           <v-textarea v-model="description" name="input-5-1" label="Descrição" outlined></v-textarea> -->

            <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="addUser">
                Cadastrar
            </v-btn>

            <v-btn color="error" class="mr-4" @click="reset">
                Limpar
            </v-btn>
        </v-form>
    </div>
</template> --> -->

<script>
import FispqService from "../services/Fispq";
    export default {
        data () {
            return {
                e1: 1,
                idfispq: '',
                produto: '',
            }
        },
  
// export default {
//     data() {
//         return {
//             valid: false,
//             finish: false,
//             idfispq: '',
//             produto: '',
//             idfispqRules: [
//                 v => !!v || 'ID é obrigatório'
//             ],
//             produtoRules: [
//                 v => !!v || 'Produto é obrigatório'
//             ],
//         }
//     },

    mounted() {
    },

    methods: {
        async addFispq() {
            try {
                const data = {
                    idfispq: this.idfispq,
                    produto: this.produto,
                }
                await FispqService.add(data);
                
                this.finish = true;
                this.reset();

                setTimeout(() => {
                    this.$router.push({path: '/dash/fispq'});
                }, 10000);
                
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