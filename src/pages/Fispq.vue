<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>FISPQ</h1>

            <v-btn color="blue-grey" class="ma-2 white--text" @click="goToAdd()">
                <v-icon left dark>
                    add
                </v-icon>
                Nova Fispq
            </v-btn>
        </div>

        <div style="margin-top: 25px">
            <v-data-table :headers="headers" :items="fispqs" :items-per-page="10" class="elevation-1"
                no-data-text="Não encontramos FISPQ cadastradas.">
                
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/edit-fispq/' + item.idFispq">
                        <v-icon dark>
                            edit
                        </v-icon>
                    </v-btn>

                    
                        <!-- <template v-slot:activator="{ on, attrs }"> -->
                            <!-- <v-btn class="mx-2" fab dark small color="red" v-bind="attrs" v-on="on"> -->
                    <v-btn class="mx-2" fab dark small color="red" @click="dialogCancelar = true; idParaCancelar = item.idFispq;">
                        <v-icon dark>
                            delete
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>

            <v-dialog v-model="dialogCancelar" persistent max-width="350">
                <v-card>
                    <v-card-title class="text-h5">
                        Excluindo Fispq: {{idParaCancelar}}
                    </v-card-title>

                    <v-card-text>Tem certeza que deseja excluir a FISPQ?</v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialogCancelar = false; idParaCancelar = null;" >
                            Cancelar
                        </v-btn>
                        <v-btn color="green darken-1" text @click="excluirFispq(idParaCancelar)">
                            SIM
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            
        </div>
    </div>
</template>

<script>

import FispqService from "../services/Fispq";

export default {
    data() {
        return {
            headers: [
                { text: 'ID', align: 'start', value: 'idFispq', },
                { text: 'Produto', align: 'start', value: 'produto' },
                { text: 'ONU', align: 'start', value: 'onu' },
                { text: 'Nome apropriado para embarque', align: 'start', value: 'nome_embarque' },
                { text: 'Data de criação', align: 'start', value: 'created_at' },
                { text: 'Data da atualização', align: 'start', value: 'update_at' },
                { text: 'Ações', align: 'start', value: 'actions' }
            ],
            sortable: false,
            fispqs: [],
            dialogCancelar:false,
            idParaCancelar: null,
        }
    },
    mounted() {
        
        this.getFispqs();
    },
    methods: {
        async getFispqs() {
            try {
                const response = await FispqService.getAll();
                this.fispqs = response.data.fispqs_list.map(fispq => {
                    return {
                        idFispq: fispq.idFispq,
                        produto: fispq.produto,
                        onu: fispq.onu,
                        nome_embarque: fispq.nome_embarque,
                        created_at: new Date(fispq.created_at).toLocaleString('pt-br', { timeZone: 'UTC' }),
                        update_at: fispq.update_at,
                    }
                });
            } catch (err) {
                this.fispqs = [];
            }
        },
        async excluirFispq(id_Fispq) {
            try {
                await FispqService.delete(id_Fispq);
                this.dialogCancelar = false;
                this.getFispqs();

            } catch (err) {
                console.log(err)
            }
        },

        goToAdd() {
            this.$router.push({path: '/dash/add-fispq'});
        }
    }
}
</script>