<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>FISPQ</h1>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Digite o código da FISPQ"
                single-line
                hide-details
            ></v-text-field>

            <v-btn color="green" class="ma-2 white--text" @click="goToAdd()">
                <v-icon left dark>
                    add
                </v-icon> 
                Nova Fispq
            </v-btn>
        </div>

        <div style="margin-top: 25px ">
            <v-data-table :headers="headers" :items="fispqs" :items-per-page="15" :search="search" class=" elevation-1 "
                no-data-text="Não encontramos FISPQ cadastradas.">
               
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/edit-fispq/' + item.idFispq">
                        <v-icon dark>
                            edit
                        </v-icon>
                    </v-btn>

                    <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/duplicate/' + item.idFispq">
                        <v-icon dark>
                            file_copy
                        </v-icon>
                    </v-btn>

                    <v-btn class="mx-2" fab dark small color="primary" @click="downloadPDF(item.idFispq, item.cod_int)">
                        <v-icon dark>
                            picture_as_pdf
                        </v-icon>
                    </v-btn>
                    
                        <!-- <template v-slot:activator="{ on, attrs }"> -->
                            <!-- <v-btn class="mx-2" fab dark small color="red" v-bind="attrs" v-on="on"> -->
                    <v-btn class="mx-2" fab dark small color="red" @click="dialogCancelar = true; idParaCancelar = item.cod_int;">
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
            search: '',
            headers: [
                { text: 'ID', align: 'start', value: 'idFispq', class:'blue lighten-3 subtitle-1 font-weight-black'},
                { text: 'COD', align: 'start', value: 'cod_int', class:'blue lighten-3 subtitle-1 font-weight-black'},
                { text: 'PRODUTO', align: 'start', value: 'produto', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'ONU', align: 'start', value: 'onu', class:'blue lighten-3 subtitle-1 font-weight-black' },
                // { text: 'NOME APROPRIADO PARA EMBARQUE', align: 'start', value: 'nome_embarque', class:'blue lighten-3 subtitle-1 font-weight-black' },
                // { text: 'DATA DE CRIAÇÃO', align: 'start', value: 'created_at', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'DATA DE ATUALIZAÇÃO', align: 'start', value: 'update_at', class:'blue lighten-3 subtitle-1 font-weight-black' },
                { text: 'AÇÕES', align: 'start', value: 'actions', class:'blue lighten-3 subtitle-1 font-weight-black' }
            ],
            sortable: false,
            fispqs: [],
            dialogCancelar:false,
            idParaCancelar: null,
        }
    },
    mounted() {
        
        this.getFispq();
    },
    methods: {
        async getFispq() {
            try {
                const response = await FispqService.getAll();
                this.fispqs = response.data.fispqs_list.map(fispq => {
                    return {
                        idFispq: fispq.idFispq,
                        cod_int: fispq.cod_int,
                        produto: fispq.produto,
                        onu: fispq.onu,
                        // nome_embarque: fispq.nome_embarque,
                        // created_at: fispq.created_at ? new Date(fispq.created_at).toLocaleString('pt-br', { timeZone: 'UTC' }) : null,
                        // created_at: fispq.created_at ? new Date(fispq.created_at).toLocaleString('pt-br', { timeZone: 'America/Sao_Paulo' }) : null,
                        update_at: fispq.update_at ? new Date(fispq.update_at).toLocaleString('pt-br', { timeZone: 'America/Sao_Paulo' }) : null,
                    }
                });
            } catch (err) {
                this.fispqs = [];
            }
        },
        // async excluirFispq(id_Fispq) {
        //     try {
        //         await FispqService.delete(id_Fispq);
        async excluirFispq(cod_int) {
            try {
                await FispqService.delete(cod_int);
                this.dialogCancelar = false;
                this.getFispq();

            } catch (err) {
                console.log(err)
            }
        },
        async downloadPDF(id_Fispq, cod_int) {
            try {
                const result = await FispqService.gerarPDF(id_Fispq);

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(new Blob([result.data]));
                link.setAttribute('download', `fispq_${cod_int}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } catch (err) {
                alert('Tivemos um erro ao gerar o PDF! Contate o administrador');
            }
        },


        goToAdd() {
            this.$router.push({path: '/dash/add-fispq'});
        }
    }
}
</script>

