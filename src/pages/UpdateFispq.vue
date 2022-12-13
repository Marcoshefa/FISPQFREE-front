<template>
    <div>
        <h1>Atualizando Fispq</h1>
        {{idFispq}}

        <v-alert v-if="finish" shaped outlined type="success" style=" margin: 20px">
            Fispq atualizada com sucesso! Você será redirecionada para a pagina de principal.
            <a @click="goToList()">Ir Agora</a>
        </v-alert>

        <!-- <v-form ref="form" v-model="valid" lazy-validation
            style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">

            <v-text-field v-model="idfispq" :rules="idfispqRules" label="ID Fispq" outlined required></v-text-field>
            <v-text-field v-model="produto" :rules="produtoRules" label="Produto" outlined required></v-text-field> -->
          <v-form ref="form" v-model="valid" lazy-validation style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">
          <v-stepper v-model="e13" vertical>
              <v-stepper-step editable step="1" complete> 1-IDENTIFICAÇÃO </v-stepper-step>
                  <v-stepper-content step="1">
                      <v-text-field v-model="cod_int" :rules="rules20" name="input-5-1" counter="20" label="Cód. interno" outlined required></v-text-field>
                      <v-text-field v-model="produto" name="input-5-1" :rules="rules90" counter="90" label="Nome da substância ou mistura" outlined required></v-text-field>
                      <v-text-field v-model="uso" name="input-5-1" :rules="rules90" counter="90" label="Principais usos recomendados para a substância ou mistura:" outlined required></v-text-field>
                    
                      <v-btn color="primary" @click="e13 = 2"> Continue </v-btn>
                  </v-stepper-content>
            
              <v-stepper-step editable step="2" complete> 2-CLASSIFICAÇÃO DE PERIGO DO PRODUTO </v-stepper-step>
                  <v-stepper-content step="2">
                    <div id="app">
                      <v-app id="inspire">
                        <v-container fluid grid-list-xl>
                          <v-flex xs12 sm6 d-flex>
                            <v-select v-model="frase_perigo_selecionada" label="frase de perigo" :items="frase_perigo_availables" item-text="name" item-value="codigo" return-object outlined></v-select>
                            <!-- <v-select :items="items" label="Standard" outlined="true"></v-select> -->
                          </v-flex>

                          <v-flex xs12 sm6 d-flex> 
                            <v-select :items="items" label="Solo field"
                                solo
                            ></v-select>
                          </v-flex>
                        </v-container>
                      </v-app>
                    </div>
                      <v-btn @click="e13 = 1" style="background: yellow; margin: 10px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 3" style="margin: 10px"> Continue </v-btn>
                  </v-stepper-content>

              <v-stepper-step editable step="3" complete> 3-COMPOSIÇÃO E INFORMAÇÕES SOBRE OS INGREDIENTES </v-stepper-step>
                  <v-stepper-content step="3">
                    <v-data-table :headers="headers" :items="substancias" sort-by="cmm" sort-desc="true" class="elevation-1">
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                          <v-dialog v-model="dialog" max-width="800px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn color="green" dark class="mb-2" v-bind="attrs" v-on="on"
                              >Nova Substância
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                              </v-card-title>

                              <v-card-text>
                                <v-container>
                                  <v-row>

                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem.substancia" label="Substância">
                                      </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field
                                        v-model="editedItem.cas" label="CAS">
                                      </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.fm" label="Formula Molecular">
                                      </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.pm" label="Peso Molecular">
                                      </v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                      <v-text-field v-model="editedItem.cmm" label="Concentração (M/M)"
                                      ></v-text-field>
                                    </v-col>

                                  </v-row>
                                </v-container>
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="blue darken-1" text @click="close"> Cancel 
                                </v-btn>

                                <v-btn 
                                  color="blue darken-1" text @click="save"> Save
                                </v-btn>

                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                              <v-card-title class="text-h5">Você tem certeza que deseja cancelar este item?</v-card-title>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-toolbar>
                      </template>
                      <template v-slot:[`item.actions`]="{ item }">
                        
                        <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/edit-fispq/' + item.id">
                          <v-icon dark> edit </v-icon>
                        </v-btn>

                        <v-btn class="mx-2" fab dark small color="red" v-bind="attrs" v-on="on">
                          <v-icon dark> delete </v-icon>
                        </v-btn>
                      </template>

                      <template v-slot:no-data>
                        <v-btn 
                          color="primary" @click="initialize">Reset
                        </v-btn>
                      </template>

                    </v-data-table> 

                      <v-btn @click="e13 = 2" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 4"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="4" complete> 8 - CONTROLE DE EXPOSIÇÃO E PROTEÇÃO INDIVIDUAL </v-stepper-step>
                  <v-stepper-content step="4">
                      <v-textarea counter label="Limite de exposição" :rules500="rules" :value="limitexposicao"></v-textarea>
                      <!-- <v-text-field v-model="limitexposicao" name="input-5-1" :rules="rules90" label="Limite de exposição" outlined required></v-text-field> -->
                      <v-text-field v-model="medcontroleng" name="input-5-1" :rules="rules250" label="Medidas de controle e engenharia" outlined required></v-text-field>
                      <v-text-field v-model="polhos" name="input-5-1" :rules="rules90" label="Proteção para os olhos/face" outlined required></v-text-field>
                      <v-text-field v-model="ppele" name="input-5-1" :rules="rules90" label="Proteção da pele" outlined required></v-text-field>
                      <v-text-field v-model="prespiratoria" name="input-5-1" :rules="rules90" label="Proteção respiratória" outlined required></v-text-field>
                      <v-text-field v-model="ptermicos" name="input-5-1" :rules="rules90" label="Perigos térmicos" outlined required></v-text-field>

                      <v-btn @click="e13 = 3" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 5"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="5" complete> 9-PROPRIEDADES FISICAS E QUÍMICAS </v-stepper-step>
                  <v-stepper-content step="5">
                      <v-text-field v-model="aspecto" name="input-5-1" :rules="rules45" label="Aspecto" outlined required></v-text-field>
                      <v-text-field v-model="odor" name="input-5-1" :rules="rules45" label="Odor e limite de cor" outlined required></v-text-field>
                      <v-text-field v-model="ph" name="input-5-1" :rules="rules45" label="pH" outlined required></v-text-field>
                      <v-text-field v-model="fusao" name="input-5-1" :rules="rules45" label="Ponto de fusão/ponto de congelamento" outlined required></v-text-field>
                      <v-text-field v-model="ebulicao" name="input-5-1" :rules="rules45" label="Ponto de ebulição" outlined required></v-text-field>
                      <v-text-field v-model="fulgor" name="input-5-1" :rules="rules45" label="Ponto de fulgor" outlined required></v-text-field>
                      <v-text-field v-model="evaporacao" name="input-5-1" :rules="rules45" label="Taxa de evaporação" outlined required></v-text-field>
                      <v-text-field v-model="inflamabilidade" name="input-5-1" :rules="rules45" label="Inflamabilidade" outlined required></v-text-field>
                      <v-text-field v-model="explosividade" name="input-5-1" :rules="rules45" label="Limite inferior/superior de inflamabilidade ou explosividade" outlined required></v-text-field>
                      <v-text-field v-model="pvapor" name="input-5-1" :rules="rules45" label="Pressão de vapor" outlined required></v-text-field>
                      <v-text-field v-model="dvapor" name="input-5-1" :rules="rules45" label="Densidade de vapor" outlined required></v-text-field>
                      <v-text-field v-model="drelativa" name="input-5-1" :rules="rules45" label="Densidade relativa" outlined required></v-text-field>
                      <v-text-field v-model="solubilidade" name="input-5-1" :rules="rules45" label="Solubilidade" outlined required></v-text-field>
                      <v-text-field v-model="particao" name="input-5-1" :rules="rules45" label="Coeficiente de -n-partição" outlined required></v-text-field>
                      <v-text-field v-model="autoignicao" name="input-5-1" :rules="rules45" label="Temperatura de autoignição" outlined required></v-text-field>
                      <v-text-field v-model="decomposicao" name="input-5-1" :rules="rules45" label="Temperatura de decomposição" outlined required></v-text-field>
                      <v-text-field v-model="viscosidade" name="input-5-1" :rules="rules45" label="Viscosidade" outlined required></v-text-field>
                      <v-text-field v-model="informacoes" name="input-5-1" :rules="rules90" label="Outras informações" outlined required></v-text-field>
                      <div>
                        <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                        <a href ="https://echa.europa.eu/information-on-chemicals/registered-substances" target="_blank">echa.europa</a>
                      </div> 
                      <div>
                          <a href ="https://comptox.epa.gov/dashboard/" target="_blank">CompTox Chemicals Dashboard</a>
                      </div>
                      <div>
                        <a href ="https://echa.europa.eu/information-on-chemicals/registered-substances" target="_blank">echa.europa</a>
                      </div>
                      <div>
                        <a href ="https://www.atsdr.cdc.gov/toxprofiledocs/index.html" target="_blank">Agecy for toxic Substances and Disease Registry</a>
                      </div>

                      <v-btn @click="e13 = 4" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 =6"> Continue </v-btn>

                  </v-stepper-content>

                  <v-stepper-step editable step="6" complete> 10-ESTABILIDADE E REATIVIDADE </v-stepper-step>
                  <v-stepper-content step="6">
                    <v-text-field v-model="reatividade" name="input-5-1" :rules="rules90" label="Reatividade" outlined required></v-text-field>
                    <v-text-field v-model="estabilidadeq" name="input-5-1" :rules="rules250" label="Estabilidade química" outlined required></v-text-field>
                    <v-text-field v-model="rperigosas" name="input-5-1" :rules="rules250" label="Possibilidade de reações perigosas" outlined required></v-text-field>
                    <v-text-field v-model="caseremevitadas" name="input-5-1" :rules="rules250" label="Condições a serem evitadas" outlined required></v-text-field>
                    <v-text-field v-model="incompativeis" name="input-5-1" :rules="rules250" label="Materiais incompatíveis" outlined required></v-text-field>
                    <v-text-field v-model="pdecomposicao" name="input-5-1" :rules="rules250" label="Produtos perigosos de decomposição" outlined required></v-text-field>

                    <div>
                      <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                      <a href ="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">PubChem</a>
                    </div>

                      <v-btn @click="e13 = 5" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 7"> Continue </v-btn>
                  
                    </v-stepper-content>

                  <v-stepper-step editable step="7" complete> 11-INFORMAÇÕES TOXICOLÓGICAS </v-stepper-step>
                    <v-stepper-content step="7">
                    <v-text-field v-model="toxicidadea" name="input-5-1" :rules="rules250" label="Toxicidade" outlined required></v-text-field>
                    <v-text-field v-model="cpele" name="input-5-1" :rules="rules250" label="Corrosão/irritaçãoà pele" outlined required></v-text-field>
                    <v-text-field v-model="srespiratoria" name="input-5-1" :rules="rules45" label="Lesões oculares graves/iritação ocular" outlined required></v-text-field>
                    <v-text-field v-model="mutagenicidade" name="input-5-1" :rules="rules45" label="Sensibilização respiratória ou à pela" outlined required></v-text-field>
                    <v-text-field v-model="carcinogenicidade" name="input-5-1" :rules="rules45" label="Mutagenicidade em célulass germinativas" outlined required></v-text-field>
                    <v-text-field v-model="reproducao" name="input-5-1" :rules="rules45" label="Carcinogenicidade" outlined required></v-text-field>
                    <v-text-field v-model="exposicaou" name="input-5-1" :rules="rules45" label="Toxicidade à reprodução" outlined required></v-text-field>
                    <v-text-field v-model="exposicaor" name="input-5-1" :rules="rules45" label="Toxicidade para órgãos - alvo específicos - exposição única" outlined required></v-text-field>
                    <v-text-field v-model="aspiracao" name="input-5-1" :rules="rules45" label="Perigo por aspiração" outlined required></v-text-field>

                    <div>
                      <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                      <a href ="https://www.atsdr.cdc.gov/toxprofiledocs/index.html" target="_blank">Agecy for toxic Substances and Disease Registry</a>
                    </div>
                    <div>
                      <a href ="https://comptox.epa.gov/dashboard/" target="_blank">CompTox Chemicals Dashboard</a>
                    </div>
                    <div>
                      <a href ="https://monographs.iarc.who.int/agents-classified-by-the-iarc/" target="_blank">Carcinogenic</a>
                    </div>
                    <div>
                      <a href ="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">PubChem</a>
                    </div>

                    <v-btn @click="e13 = 6" style="background: yellow; margin: 15px">Voltar</v-btn>
                    <v-btn color="primary" @click="e13 = 8"> Continue </v-btn>
                    </v-stepper-content>

                  <v-stepper-step editable step="8" complete> 12-INFORMAÇÕES ECOLÓGICAS </v-stepper-step>
                    <v-stepper-content step="8">
                    <v-text-field v-model="ecotoxidade" name="input-5-1" label="Ecotoxidade" outlined required></v-text-field>
                    <v-text-field v-model="degradabilidade" name="input-5-1" label="Persistência e degradabilidade" outlined required></v-text-field>
                    <v-text-field v-model="bioacumulativo" name="input-5-1" label="Potencial bioacumulativo" outlined required></v-text-field>
                    <v-text-field v-model="mobilidade" name="input-5-1" label="Mobilidade ao solo" outlined required></v-text-field>
                    <v-text-field v-model="outros_efeitos" name="input-5-1" label="Outros efeitos adversos" outlined required></v-text-field>

                    <div>
                      <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                      <a href ="https://comptox.epa.gov/dashboard/" target="_blank">CompTox Chemicals Dashboard</a>
                    </div>
                    <div>
                      <a href ="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">PubChem</a>
                    </div>

                    <v-btn @click="e13 = 7" style="background: yellow; margin: 15px">Voltar</v-btn>
                    <v-btn color="primary" @click="e13 = 9"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="9" complete> 13-CONSIDERAÇÕES SOBRE DESTINAÇÃO FINAL </v-stepper-step>
                    <v-stepper-content step="9">
                      <v-container fluid>
                        <v-textarea counter label="Destinação Final" :rules500="rules" :value="destinacaofinal"></v-textarea>
                      </v-container>
                      
                        <v-btn @click="e13 = 8" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 10"> Continue </v-btn>
                    </v-stepper-content>
                
                  <v-stepper-step editable step="10" complete> 14-INFORMAÇÕES SOBRE TRANSPORTE </v-stepper-step>
                    <v-stepper-content step="10">
                      <v-container fluid>
                        <v-textarea counter label="TERRESTRE" :rules500="rules" :value="terrestre"></v-textarea>
                        <v-text-field v-model="onu" name="input-5-1" label="Número ONU" outlined required></v-text-field>
                        <v-text-field v-model="nome_embarque" name="input-5-1" label="Nome apropriado para embarque" outlined required></v-text-field>
                        <v-text-field v-model="classe" name="input-5-1" label="Classe/Subclasse" outlined required></v-text-field>
                        <v-text-field v-model="n_risco" name="input-5-1" label="Número de risco" outlined required></v-text-field>
                        <v-text-field v-model="grupo_emb" name="input-5-1" label="Grupo de embalagem" outlined required></v-text-field>
                        <v-textarea counter label="HIDROVIÁRIO" :rules500="rules" :value="hidroviario"></v-textarea>
                        <v-text-field v-model="onuh" name="input-5-1" label="Número ONU" outlined required></v-text-field>
                        <v-text-field v-model="embarqueh" name="input-5-1" label="Nome apropriado para embarque" outlined required></v-text-field>
                        <v-text-field v-model="classeh" name="input-5-1" label="Classe/Subclasse" outlined required></v-text-field>
                        <v-text-field v-model="riscoh" name="input-5-1" label="Número de risco" outlined required></v-text-field>
                        <v-text-field v-model="embalagemh" name="input-5-1" label="Grupo de embalagem" outlined required></v-text-field>
                        <v-textarea counter label="AÉREO" :rules500="rules" :value="aereo"></v-textarea>
                        <v-text-field v-model="onua" name="input-5-1" label="Número ONU" outlined required></v-text-field>
                        <v-text-field v-model="embarquea" name="input-5-1" label="Nome apropriado para embarque" outlined required></v-text-field>
                        <v-text-field v-model="classea" name="input-5-1" label="Classe/Subclasse" outlined required></v-text-field>
                        <v-text-field v-model="riscoa" name="input-5-1" label="Número de risco" outlined required></v-text-field>
                        <v-text-field v-model="embalagema" name="input-5-1" label="Grupo de embalagem" outlined required></v-text-field>
                      </v-container>
                      
                      <v-btn @click="e13 = 9" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 11"> Continue </v-btn>
                    </v-stepper-content>
                  

                  <v-stepper-step editable step="11" complete> 15-INFORMAÇÕES SOBRE REGULAMENTAÇÕES </v-stepper-step>
                    <v-stepper-content step="11">
                      <v-container fluid>
                        <v-textarea counter label="Regulamentações" :rules500="rules" :value="iregulamentacao"></v-textarea>
                      </v-container>
                      
                      
                        <v-btn @click="e13 = 10" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 12"> Continue </v-btn>
                    </v-stepper-content>

                    <v-stepper-step editable step="12" complete> 16-OUTRAS INFORMAÇÕES </v-stepper-step>
                    <v-stepper-content step="12">
                      <v-container fluid>
                        <v-textarea counter label="RINFORMAÇÕES" :rules500="rules" :value="iregulamentacao"></v-textarea>
                      </v-container>
                      
                        <v-btn @click="e13 = 11" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 12"> Continue </v-btn>
                    </v-stepper-content>

                  </v-stepper>
                  <v-btn :disabled="!valid" color="success" class="mr-4" @click="addFispq">
                    Cadastrar
                  </v-btn>
        

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
            cod_int: '',
            produto:'',
            uso:'',
            // frase_perigo_selecionada: null,
            // frase_perigo_availables:[],
            limitexposicao:'',
            medcontroleng:'',
            polhos:'',
            ppele:'',
            prespiratoria:'',
            ptermicos:'',
            aspecto:'',
            odor:'',
            ph:'',
            fusao:'',
            ebulicao:'',
            fulgor:'',
            evaporacao:'',
            inflamabilidade:'',
            explosividade:'',
            pvapor:'',
            dvapor:'',
            drelativa:'',
            solubilidade:'',
            particao:'',
            autoignicao:'',
            decomposicao:'',
            viscosidade:'',
            informacoes:'',
            reatividade:'',
            estabilidadeq:'',
            rperigosas:'',
            caseremevitadas:'',
            incompativeis:'',
            pdecomposicao:'',
            toxicidadea:'',
            cpele:'',
            srespiratoria:'',
            mutagenicidade:'',
            carcinogenicidade:'',
            reproducao:'',
            exposicaou:'',
            exposicaor:'',
            aspiracao:'',
            ecotoxidade:'',
            degradabilidade:'',
            bioacumulativo:'',
            mobilidade:'',
            outros_efeitos:'',
            destinacaofinal:'',
            terrestre: '',
            onu: '',
            nome_embarque: '',
            classe: '',
            n_risco: '',
            grupo_emb: '',
            hidroviario: '',
            aereo: '',
            regulamentacoes: '',
            outras_info: '',
            outras_info2: '',
            legenda: '',

            e13: 1,
            dialog: false,
            dialogDelete: false,
            
            headers: [
              {
                text: 'Substância',
                align: 'start',
                sortable: false,
                value: 'substancia',
                class:'blue lighten-3 subtitle-1 font-weight-black'
              },
              { text: 'CAS', value: 'cas', class:'blue lighten-3 subtitle-1 font-weight-black' },
              { text: 'Formula Molecular', value: 'fm', class:'blue lighten-3 subtitle-1 font-weight-black' },
              { text: 'Peso Molecular', value: 'pm', class:'blue lighten-3 subtitle-1 font-weight-black' },
              { text: 'Concentração (M/M)', value: 'cmm', class:'blue lighten-3 subtitle-1 font-weight-black' },
              { text: 'Actions', value: 'actions', sortable: false, class:'blue lighten-3 subtitle-1 font-weight-black' },
            ],
            substancias: [],
            editedIndex: -1,
            editedItem: {
              substancia: '',
              cas: '',
              fm: '',
              pm: '',
              cmm: '',
            },
            defaultItem: {
              substancia: '',
              cas: '',
              fm: '',
              pm: '',
              cmm: '',
            },
            idfispqRules: [
                v => !!v || 'ID é obrigatório'
            ],
            produtoRules: [
                v => !!v || 'Produto é obrigatório'
            ],
           
            idFispq: null
        }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Substância' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    mounted() {
        this.idFispq = this.$route.params.id;
        this.getFispq();
    },
    methods: {
        async getFispq() {
            try {
                const response = await FispqService.getOne(this.idFispq);
                this.idfispq = response.data.fispq.idFispq;
                this.produto = response.data.fispq.produto;
                this.cod_int = response.data.fispq.cod_int;
                this.uso = response.data.fispq.uso;
                this.inalacao = response.data.fispq.inalacao;
                this.cont_olhos = response.data.fispq.cont_olhos;
                this.cont_pele = response.data.fispq.cont_pele;
                this.ingestao = response.data.fispq.ingestao;
                this.sintomas = response.data.fispq.sintomas;
                this.medico = response.data.fispq.medico;
                this.extincao = response.data.fispq.extincao;
                this.perigo_esp = response.data.fispq.perigo_esp;
                this.medidas_protecao = response.data.fispq.medidas_protecao;
                this.servico_emergencia = response.data.fispq.servico_emergencia;
                this.servico_emergencia2 = response.data.fispq.servico_emergencia2;
                this.precaucao_ambiente = response.data.fispq.precaucao_ambiente;
                this.metodos_materiais = response.data.fispq.metodos_materiais;
                this.manuseio_seguro = response.data.fispq.manuseio_seguro;
                this.medidas_higiene = response.data.fispq.medidas_higiene;
                this.condicoes_armazenamento = response.data.fispq.condicoes_armazenamento;
                // this.frase_perigo_selecionada = response.data.fispq.frase_perigo_selecionada;
                // this.frase_perigo_availables = response.data.fispq.frase_perigo_availables;
                this.limitexposicao = response.data.fispq.limitexposicao;
                this.medcontroleng = response.data.fispq.medcontroleng;
                this.polhos = response.data.fispq.polhos;
                this.ppele = response.data.fispq.ppele;
                this.prespiratoria = response.data.fispq.prespiratoria;
                this.ptermicos = response.data.fispq.ptermicos;
                this.aspecto = response.data.fispq.aspecto;
                this.odor = response.data.fispq.odor;
                this.ph = response.data.fispq.ph;
                this.fusao = response.data.fispq.fusao;
                this.ebulicao = response.data.fispq.ebulicao;
                this.fulgor = response.data.fispq.fulgor;
                this.evaporacao = response.data.fispq.evaporacao;
                this.inflamabilidade = response.data.fispq.inflamabilidade;
                this.explosividade = response.data.fispq.explosividade;
                this.pvapor = response.data.fispq.pvapor;
                this.dvapor = response.data.fispq.dvapor;
                this.drelativa = response.data.fispq.drelativa;
                this.solubilidade = response.data.fispq.solubilidade;
                this.particao = response.data.fispq.particao;
                this.autoignicao = response.data.fispq.autoignicao;
                this.decomposicao = response.data.fispq.decomposicao;
                this.viscosidade = response.data.fispq.viscosidade;
                this.informacoes = response.data.fispq.informacoes;
                this.reatividade = response.data.fispq.reatividade;
                this.estabilidadeq = response.data.fispq.estabilidadeq;
                this.rperigosas = response.data.fispq.rperigosas;
                this.caseremevitadas = response.data.fispq.caseremevitadas;
                this.incompativeis = response.data.fispq.incompativeis;
                this.pdecomposicao = response.data.fispq.pdecomposicao;
                this.toxicidadea = response.data.fispq.toxicidadea;
                this.cpele = response.data.fispq.cpele;
                this.srespiratoria = response.data.fispq.srespiratoria;
                this.mutagenicidade = response.data.fispq.mutagenicidade;
                this.carcinogenicidade = response.data.fispq.carcinogenicidade;
                this.reproducao = response.data.fispq.reproducao;
                this.exposicaou = response.data.fispq.exposicaou;
                this.exposicaor = response.data.fispq.exposicaor;
                this.aspiracao = response.data.fispq.aspiracao;
                this.ecotoxidade = response.data.fispq.ecotoxidade;
                this.degradabilidade = response.data.fispq.degradabilidade;
                this.bioacumulativo = response.data.fispq.bioacumulativo;
                this.mobilidade = response.data.fispq.mobilidade;
                this.outros_efeitos = response.data.fispq.outros_efeitos;
                this.destinacaofinal = response.data.fispq.destinacaofinal;
                this.terrestre = response.data.fispq.terrestre;
                this.onu = response.data.fispq.onu;
                this.nome_embarque = response.data.fispq.nome_embarque;
                this.classe = response.data.fispq.classe;
                this.n_risco = response.data.fispq.n_risco;
                this.grupo_emb = response.data.fispq.grupo_emb;
                this.hidroviario = response.data.fispq.hidroviario;
                this.aereo = response.data.fispq.aereo;
                this.regulamentacoes = response.data.fispq.regulamentacoes;
                this.outras_info = response.data.fispq.outras_info;
                this.outras_info2 = response.data.fispq.outras_info2;
                this.legenda = response.data.fispq.legenda;

                this.substancias= response.data.fispq.substancias;



            } catch (err) {
                this.fispqs = [];
            }
        },
        async updateFispq() {
            try {
                const data = {
                idfispq: this.idfispq,
                produto: this.produto,
                cod_int: this.cod_int,
                uso: this.uso,
                inalacao: this.inalacao,
                cont_olhos: this.cont_olhos,
                cont_pele: this.cont_pele,
                ingestao: this.ingestao,
                sintomas: this.sintomas,
                medico: this.medico,
                extincao: this.extincao,
                perigo_esp: this.perigo_esp,
                medidas_protecao: this.medidas_protecao,
                servico_emergencia: this.servico_emergencia,
                servico_emergencia2: this.servico_emergencia2,
                precaucao_ambiente: this.precaucao_ambiente,
                metodos_materiais: this.metodos_materiais,
                manuseio_seguro: this.manuseio_seguro,
                medidas_higiene: this.medidas_higiene,
                condicoes_armazenamento: this.condicoes_armazenamento,
                limitexposicao: this.limitexposicao,
                medcontroleng: this.medcontroleng,
                polhos: this.polhos,
                ppele: this.ppele,
                prespiratoria: this.prespiratoria,
                ptermicos: this.ptermicos,
                aspecto: this.aspecto,
                odor: this.odor,
                ph: this.ph,
                fusao: this.fusao,
                ebulicao: this.ebulicao,
                fulgor: this.fulgor,
                evaporacao: this.evaporacao,
                inflamabilidade: this.inflamabilidade,
                explosividade: this.explosividade,
                pvapor: this.pvapor,
                dvapor: this.dvapor,
                drelativa: this.drelativa,
                solubilidade: this.solubilidade,
                particao: this.particao,
                autoignicao: this.autoignicao,
                decomposicao: this.decomposicao,
                viscosidade: this.viscosidade,
                informacoes: this.informacoes,
                reatividade: this.reatividade,
                estabilidadeq: this.estabilidadeq,
                rperigosas: this.rperigosas,
                caseremevitadas: this.caseremevitadas,
                incompativeis: this.incompativeis,
                pdecomposicao: this.pdecomposicao,
                toxicidadea: this.toxicidadea,
                cpele: this.cpele,
                srespiratoria: this.srespiratoria,
                mutagenicidade: this.mutagenicidade,
                carcinogenicidade: this.carcinogenicidade,
                reproducao: this.reproducao,
                exposicaou: this.exposicaou,
                exposicaor: this.exposicaor,
                aspiracao: this.aspiracao,
                ecotoxidade: this.ecotoxidade,
                degradabilidade: this.degradabilidade,
                bioacumulativo: this.bioacumulativo,
                mobilidade: this.mobilidade,
                outros_efeitos: this.outros_efeitos,
                destinacaofinal: this.destinacaofinal,
                terrestre: this.terrestre,
                onu: this.onu,
                nome_embarque: this.nome_embarque,
                classe: this.classe,
                n_risco: this.n_risco,
                grupo_emb: this.grupo_emb,
                hidroviario: this.hidroviario,
                aereo: this.aereo,
                regulamentacoes: this.regulamentacoes,
                outras_info: this.outras_info,
                outras_info2: this.outras_info2,
                legenda: this.legenda,
                
                substancias: this.substancias,
                // substancia: this.substancia,
                // cas: this.cas,
                // fm: this.fm,
                // pm: this.pm,
                // cmm: this.cmm,

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
                }, 1000);

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

      editItem (item) {
        this.editedIndex = this.substancias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.substancias.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.substancias.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.substancias[this.editedIndex], this.editedItem)
        } else {
          this.substancias.push(this.editedItem)
        }
        this.close()
      },
    },

  }
</script>