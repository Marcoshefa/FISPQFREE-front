<template>
    <v-stepper v-model="e13" vertical>
      
        <v-stepper-step step="1" complete> IDENTIFICAÇÃO{{uso}} </v-stepper-step>
            <v-stepper-content step="1">



                <v-text-field v-model="idfispq" :rules="rules20" name="input-5-1" counter="20" label="Cód. interno" outlined required></v-text-field>
                <v-text-field v-model="produto" name="input-5-1" :rules="rules90" counter="90" label="Nome da substância ou mistura" outlined required></v-text-field>
                <v-text-field v-model="uso" name="input-5-1" :rules="rules90" counter="90" label="Principais usos recomendados para a substância ou mistura:" outlined required></v-text-field>
                {{uso}}
                <v-btn color="primary" @click="e13 = 2"> Continue </v-btn>
                <v-btn text>Cancel</v-btn>


            </v-stepper-content>
      
            <v-stepper-step step="2" complete> CLASSIFICAÇÃO DE PERIGO DO PRODUTO </v-stepper-step>
            <v-stepper-content step="2">
              <div id="app">
                <v-app id="inspire">
                  <v-container fluid grid-list-xl>


                      <v-flex xs12 sm6 d-flex>
                        <v-select :items="items" label="Standard" outlined="true"></v-select>
                      </v-flex>
                
                
                      <v-flex xs12 sm6 d-flex>
                        <v-select
                          :items="items"
                          label="Solo field"
                          solo
                        ></v-select>
                      </v-flex>

                  </v-container>
                </v-app>
              </div>

                <v-btn @click="e13 = 1" style="background: yellow; margin: 10px">Voltar</v-btn>
                <v-btn color="primary" @click="e13 = 3" style="margin: 10px"> Continue </v-btn>
                <v-btn text style="margin: 10px">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step step="3" complete> COMPOSIÇÃO E INFORMAÇÕES SOBRE OS INGREDIENTES </v-stepper-step>
            <v-stepper-content step="3">
             
              <v-data-table :headers="headers" :items="substancias" sort-by="cmm" class="elevation-1">
                
                <template v-slot:top>
                  <v-toolbar flat>
                    <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
                    <v-divider
                      class="mx-4"
                      inset
                      vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog
                      v-model="dialog"
                      max-width="800px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
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
                  
                  <!-- <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon> -->
                  <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/edit-fispq/' + item.id">
                        <v-icon dark>
                            edit
                        </v-icon>
                    </v-btn>

                  <!-- <v-icon small @click="deleteItem(item)">
                    mdi-delete
                  </v-icon> -->

                  <v-btn class="mx-2" fab dark small color="red" v-bind="attrs" v-on="on">
                                <v-icon dark>
                                    delete
                                </v-icon>
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
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4" complete> CONTROLE DE EXPOSIÇÃO E PROTEÇÃO INDIVIDUAL </v-stepper-step>
            <v-stepper-content step="4">
                <v-text-field v-model="limitexposicao" name="input-5-1" label="Limite de exposição" outlined required></v-text-field>
                <v-text-field v-model="medcontroleng" name="input-5-1" label="Medidas de controle e engenharia" outlined required></v-text-field>
                <v-text-field v-model="polhos" name="input-5-1" label="Proteção para os olhos/face" outlined required></v-text-field>
                <v-text-field v-model="ppele" name="input-5-1" label="Proteção da pele" outlined required></v-text-field>
                <v-text-field v-model="prespiratoria" name="input-5-1" label="Proteção respiratória" outlined required></v-text-field>
                <v-text-field v-model="ptermicos" name="input-5-1" label="Perigos térmicos" outlined required></v-text-field>

                <v-btn @click="e13 = 3" style="background: yellow; margin: 15px">Voltar</v-btn>
                <v-btn color="primary" @click="e13 = 5"> Continue </v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step step="5" complete> PROPRIEDADES FISICAS E QUÍMICAS </v-stepper-step>
            <v-stepper-content step="5">
                <v-text-field v-model="aspecto" name="input-5-1" label="Aspecto" outlined required></v-text-field>
                <v-text-field v-model="odor" name="input-5-1" label="Odor e limite de cor" outlined required></v-text-field>
                <v-text-field v-model="ph" name="input-5-1" label="pH" outlined required></v-text-field>
                <v-text-field v-model="fusao" name="input-5-1" label="Ponto de fusão/ponto de congelamento" outlined required></v-text-field>
                <v-text-field v-model="ebulicao" name="input-5-1" label="Ponto de ebulição" outlined required></v-text-field>
                <v-text-field v-model="fulgor" name="input-5-1" label="Ponto de fulgor" outlined required></v-text-field>
                <v-text-field v-model="evaporacao" name="input-5-1" label="Taxa de evaporação" outlined required></v-text-field>
                <v-text-field v-model="inflamabilidade" name="input-5-1" label="Inflamabilidade" outlined required></v-text-field>
                <v-text-field v-model="explosividade" name="input-5-1" label="Limite inferior/superior de inflamabilidade ou explosividade" outlined required></v-text-field>
                <v-text-field v-model="pvapor" name="input-5-1" label="Pressão de vapor" outlined required></v-text-field>
                <v-text-field v-model="dvapor" name="input-5-1" label="Densidade de vapor" outlined required></v-text-field>
                <v-text-field v-model="drelativa" name="input-5-1" label="Densidade relativa" outlined required></v-text-field>
                <v-text-field v-model="solubilidade" name="input-5-1" label="Solubilidade" outlined required></v-text-field>
                <v-text-field v-model="particao" name="input-5-1" label="Coeficiente de -n-partição" outlined required></v-text-field>
                <v-text-field v-model="autoignicao" name="input-5-1" label="Temperatura de autoignição" outlined required></v-text-field>
                <v-text-field v-model="decomposicao" name="input-5-1" label="Temperatura de decomposição" outlined required></v-text-field>
                <v-text-field v-model="viscosidade" name="input-5-1" label="Viscosidade" outlined required></v-text-field>
                <v-text-field v-model="informacoes" name="input-5-1" label="Outras informações" outlined required></v-text-field>
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
                <v-btn text>Cancel</v-btn>


            </v-stepper-content>

            <v-stepper-step step="6" complete> ESTABILIDADE E REATIVIDADE </v-stepper-step>
            <v-stepper-content step="6">
              <v-text-field v-model="reatividade" name="input-5-1" label="Reatividade" outlined required></v-text-field>
              <v-text-field v-model="estabilidadeq" name="input-5-1" label="Estabilidade química" outlined required></v-text-field>
              <v-text-field v-model="rperigosas" name="input-5-1" label="Possibilidade de reações perigosas" outlined required></v-text-field>
              <v-text-field v-model="caseremevitadas" name="input-5-1" label="Condições a serem evitadas" outlined required></v-text-field>
              <v-text-field v-model="incompativeis" name="input-5-1" label="Materiais incompatíveis" outlined required></v-text-field>
              <v-text-field v-model="pdecomposicao" name="input-5-1" label="Produtos perigosos de decomposição" outlined required></v-text-field>

              <div>
                <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                <a href ="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">PubChem</a>
              </div>

                <v-btn @click="e13 = 5" style="background: yellow; margin: 15px">Voltar</v-btn>
                <v-btn color="primary" @click="e13 = 7"> Continue </v-btn>
                <v-btn text>Cancel</v-btn>
            
              </v-stepper-content>

            <v-stepper-step step="7" complete> INFORMAÇÕES TOXICOLÓGICAS </v-stepper-step>
              <v-stepper-content step="7">
              <v-text-field v-model="D" name="input-5-1" label="Reatividade" outlined required></v-text-field>
              <v-text-field v-model="cpele" name="input-5-1" label="Corrosão/irritaçãoà pele" outlined required></v-text-field>
              <v-text-field v-model="srespiratoria" name="input-5-1" label="Lesões oculares graves/iritação ocular" outlined required></v-text-field>
              <v-text-field v-model="mutagenicidade" name="input-5-1" label="Sensibilização respiratória ou à pela" outlined required></v-text-field>
              <v-text-field v-model="carcinogenicidade" name="input-5-1" label="Mutagenicidade em célulass germinativas" outlined required></v-text-field>
              <v-text-field v-model="reproducao" name="input-5-1" label="Carcinogenicidade" outlined required></v-text-field>
              <v-text-field v-model="exposicaou" name="input-5-1" label="Toxicidade à reprodução" outlined required></v-text-field>
              <v-text-field v-model="exposicaor" name="input-5-1" label="Toxicidade para órgãos - alvo específicos - exposição única" outlined required></v-text-field>
              <v-text-field v-model="pdecomposicao" name="input-5-1" label="toxicidade para órgãos - alvo específicos - exposição repetida" outlined required></v-text-field>
              <v-text-field v-model="aspiracao" name="input-5-1" label="Perigo por aspiração" outlined required></v-text-field>

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
              <v-btn text>Cancel</v-btn>
              </v-stepper-content>

            <v-stepper-step step="8" complete> INFORMAÇÕES ECOLÓGICAS </v-stepper-step>
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
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step step="9" complete> CONSIDERAÇÕES SOBRE DESTINAÇÃO FINAL </v-stepper-step>
              <v-stepper-content step="9">
              <v-text-field v-model="ecotoxidade" name="input-5-1" label="Ecotoxidade" outlined required></v-text-field>
              <v-text-field v-model="degradabilidade" name="input-5-1" label="Persistência e degradabilidade" outlined required></v-text-field>
              <v-text-field v-model="bioacumulativo" name="input-5-1" label="Potencial bioacumulativo" outlined required></v-text-field>
              <v-text-field v-model="mobilidade" name="input-5-1" label="Mobilidade ao solo" outlined required></v-text-field>
              <v-text-field v-model="outros_efeitos" name="input-5-1" label="Outros efeitos adversos" outlined required></v-text-field>


              <v-btn @click="e13 = 8" style="background: yellow; margin: 15px">Voltar</v-btn>
              <v-btn color="primary" @click="e13 = 9"> Continue </v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <!-- <v-stepper-step step="10">
              View setup instructions
            </v-stepper-step> -->
        
                  <!-- <v-stepper-content step="10>
              <v-card
                color="grey lighten-1"
                class="mb-12"
                height="200px"
              ></v-card>
              <v-btn
                color="primary"
                @click="e13 = 1"
              >
                Continue
              </v-btn>
              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>-->
          </v-stepper>
  </template>

<script>
export default {

data: () => ({
      e13: 1,
      dialog: false,
      dialogDelete: false,
      
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

      headers: [
        {
          text: 'Substância',
          align: 'start',
          sortable: false,
          value: 'substancia',
        },
        { text: 'CAS', value: 'cas' },
        { text: 'Formula Molecular', value: 'fm' },
        { text: 'Peso Molecular', value: 'pm' },
        { text: 'Concentração (M/M)', value: 'cmm' },
        { text: 'Actions', value: 'actions', sortable: false },
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
      
      idfispq: '',
      produto: '',
      uso:'',

      rules20: [v => !!v || 'Este campo é obrigatório', v => v.length <= 20 || 'Max 20 caracteres',],
      rules90: [v => v.length <= 90 || 'Max 90 caracteres', v => !!v || 'Este campo é obrigatório'],

    }),


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

    methods: {
      initialize () {
        this.substancias = [
          {
            substancia: 'Água',
            cas: 159,
            fm: 2,
            pm: 18,
            cmm: 90,
          },
          {
            substancia: 'Ice cream sandwich',
            cas: 237,
            fm: 9.0,
            pm: 37,
            cmm: 4.3,
          },
          {
            substancia: 'Eclair',
            cas: 262,
            fm: 16.0,
            pm: 23,
            cmm: 6.0,
          },
        ]
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