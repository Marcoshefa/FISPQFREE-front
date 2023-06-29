<template>
  <div>
    
      <h1>Cadastre uma nova FISPQ</h1>

      <v-alert v-if="finish" shaped outlined type="success" style=" margin: 20px">
          Usuário cadastrado com sucesso! Você será redirecionado ...
        <a @click="goToList()">Ir Agora</a>
      </v-alert>

        <v-form ref="form" v-model="valid" lazy-validation style="background: #FFF; border-radius: 5px; padding: 20px; margin: 20px">
          <v-stepper v-model="e13" vertical>
              <v-stepper-step editable step="1" complete> 1 - IDENTIFICAÇÃO </v-stepper-step>
              <v-stepper-content step="1" >
                    <div style="width: 100%; height: 10px;"></div>
                      <v-text-field v-model="cod_int" :rules="rules20" name="input-5-1" counter="20" label="Cód. interno" outlined required></v-text-field>
                      <v-text-field v-model="produto" name="input-5-1" :rules="rules90" counter="90" label="Nome da substância ou mistura" outlined required></v-text-field>
                      <v-text-field v-model="uso" name="input-5-1" :rules="rules90" counter="90" label="Principais usos recomendados para a substância ou mistura:" outlined required></v-text-field>
                      <v-text-field v-model="onu" name="input-5-1" :rules="rules500" label="Número ONU" outlined required></v-text-field>
                        <div class="text-center" @click="getFrasesByONU()">
                          <!-- <v-btn color="yellow" @click="getFrasesByONU()"> Buscar </v-btn> -->
                          <v-btn green color="yellow" @click="snackbar = true"> Buscar </v-btn>
                          <v-snackbar color="green" v-model="snackbar" >
                          {{ text }}
                          <template v-slot:action="{attrs}">
                            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                              Fechar
                            </v-btn>
                          </template>
                          </v-snackbar>
                        </div>

                      <v-btn color="primary" @click="e13 = 2"> Continue </v-btn>
                  </v-stepper-content>
            
              <v-stepper-step editable step="2" complete> 2 - CLASSIFICAÇÃO DE PERIGO DO PRODUTO </v-stepper-step>
                  <v-stepper-content step="2">
                    <div style="width: 100%; height: 10px;"></div>
                    <div id="app">


                      <!-- <img src="@asset/images/pictogramas/${}" alt=""> -->
                          <v-select
                        
                            v-model="selectedClassificacao"
                            :items="classificacao"
                            item-text="categoria"
                            item-value="num"
                            label="CLASSIFICAÇÃO DE PERIGO"
                            multiple
                            @change="getAllFrasesClassificacaoByIDS()"
                          >
                            <template v-slot:prepend-item>
                              <v-list-item
                                ripple
                                @mousedown.prevent
                                @click="toggle"
                              >
                                <v-list-item-action>
                                  <v-icon :color="selectedClassificacao.length > 0 ? 'indigo darken-4' : ''">
                                    {{ icon }}
                                  </v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    Select All
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-divider class="mt-2"></v-divider>
                            </template>
                            
                          </v-select>

                    </div>
                    <v-textarea  v-model="todas_frases_Perigo" counter label="Frase de Perigo"></v-textarea>
                    <v-textarea v-model="todas_frases_Precaucao" counter label="Frase de Precaução"></v-textarea>
                    
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-bottom: 15px">
                      <v-checkbox
                        v-for="pictograma in pictogramas_disponiveis"
                        :key="pictograma.name"
                        v-model="pictogramas"
                        :value="pictograma.name"
                        style="width: 9.5%; border-radius: 10px; border: 1.5px solid #CCC;"
                      >
                        <template slot="label">
                          <img :src="require(`@/assets/images/pictogramas/${pictograma.imagem}`)" :alt="pictograma.name" style="width: 95%;" />
                        </template>
                      </v-checkbox>
                    </div>

                    <v-text-field v-model="frase_Advertencia" name="input-5-1" rules500="rules" label="Frase de Advertência" outlined required></v-text-field> 
                    
                    <v-btn @click="e13 = 1" style="background: yellow; margin: 10px">Voltar</v-btn>
                    <v-btn color="primary" @click="e13 = 3" style="margin: 10px"> Continue </v-btn>
                  </v-stepper-content>

              <v-stepper-step editable step="3" complete> 3 - COMPOSIÇÃO E INFORMAÇÕES SOBRE OS INGREDIENTES </v-stepper-step>
                  <v-stepper-content step="3">
                    <div style="width: 100%; height: 10px;"></div>
                    <v-data-table :headers="headers" :items="substancias" class="elevation-1">
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
                                      <v-text-field v-model="editedItem.cmm" label="Concentração (M/M)"></v-text-field>
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
                          <v-dialog v-model="dialogDelete" max-width="600px">
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
                        <!-- <v-btn class="mx-2" fab dark small color="primary" :to="'/dash/edit-fispq/' + item.id"> -->
                        <v-btn class="mx-2" fab dark small color="primary"  @click="editItem(item)">  
                          <v-icon dark> edit </v-icon>
                        </v-btn>

                        <!-- <v-btn class="mx-2" fab dark small color="red" v-bind="attrs" v-on="on"> -->
                        <v-btn class="mx-2" fab dark small color="red" @click="deleteItem(item)">
                          <v-icon dark> delete </v-icon>
                        </v-btn>
                      </template>

                      <!-- <template v-slot:no-data>
                        <v-btn 
                          color="primary" @click="initialize">Reset
                        </v-btn>
                      </template> -->

                    </v-data-table> 

                      <v-btn @click="e13 = 2" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 4"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="4" complete> 4 - MEDIDAS DE PRIMEIROS SOCORROS </v-stepper-step>
                  <v-stepper-content step="4">
                    <div style="width: 100%; height: 10px;"></div>
                      <v-text-field v-model="inalacao" name="input-5-1" :rules="rules250" label="EM CASO DE INALAÇÃO:" outlined required></v-text-field>
                      <v-text-field v-model="cont_pele" name="input-5-1" :rules="rules250" label="EM CASO DE CONTATO COM A PELE:" outlined required></v-text-field>
                      <v-text-field v-model="cont_olhos" name="input-5-1" :rules="rules250" label="EM CASO DE CONTATO COM OS OLHOS:" outlined required></v-text-field>
                      <v-text-field v-model="ingestao" name="input-5-1" :rules="rules250" label="EM CASO DE INGESTÃO:" outlined required></v-text-field>
                      <v-text-field v-model="sintomas" name="input-5-1" :rules="rules250" label="Sintomas e efitos mais importantes, agudos ou tardios:" outlined required></v-text-field>
                      <v-text-field v-model="medico" name="input-5-1" :rules="rules250" label="Notas para o médico" outlined required></v-text-field>
                      <v-btn @click="e13 = 3" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 5"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="5" complete> 5 - MEDIDAS DE COMBATE A INCÊNDIO </v-stepper-step>
                  <v-stepper-content step="5">
                    <div style="width: 100%; height: 10px;"></div>
                      <v-text-field v-model="extincao" name="input-5-1" :rules="rules250" label="Medidas de extinção apropriados" outlined required></v-text-field>
                      <v-text-field v-model="perigo_esp" name="input-5-1" label="Perigos específicos da substância ou mistura:" outlined required></v-text-field>
                      <v-text-field v-model="medidas_protecao" name="input-5-1" :rules="rules90" label="Medidas de proteção da equipe de combate a incêndio" outlined required></v-text-field>
                      <v-btn @click="e13 = 4" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 6"> Continue </v-btn>
                    </v-stepper-content>

                  <v-stepper-step editable step="6" complete> 6 - MEDIDAS DE CONTROLE PARA DERRAMAMENTO OU VAZAMENTO </v-stepper-step>
                  <v-stepper-content step="6">
                    <div style="width: 100%; height: 10px;"></div>
                      <v-text-field v-model="servico_emergencia" name="input-5-1" :rules="rules500" label="Para o pessoal que não faz parte do serviço de emergência" outlined required></v-text-field>
                      <v-text-field v-model="servico_emergencia2" name="input-5-1" :rules="rules500" label="Para o pessoal do serviço de emergência" outlined required></v-text-field>
                      <v-text-field v-model="precaucao_ambiente" name="input-5-1" :rules="rules500" label="Precauções para o meio ambiente" outlined required></v-text-field>
                      <v-text-field v-model="metodos_materiais" name="input-5-1" label="Métodos e materiais para a contenção da limpeza" outlined required></v-text-field>
                      <v-btn @click="e13 = 5" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 7"> Continue </v-btn>
                    </v-stepper-content>

                    <v-stepper-step editable step="7" complete> 7 - MANUSEIO E ARMAZENAMENTO </v-stepper-step>
                  <v-stepper-content step="7">
                    <div style="width: 100%; height: 10px;"></div>
                      <v-text-field v-model="manuseio_seguro" name="input-5-1" :rules="rules500" label="Precauções para o manuseio seguro" outlined required></v-text-field>
                      <v-text-field v-model="medidas_higiene" name="input-5-1" :rules="rules500" label="Medidas de higiene" outlined required></v-text-field>
                      <v-text-field v-model="condicoes_armazenamento" name="input-5-1" :rules="rules500" label="Condições de armazenamento seguro, incluindo qualquer incompatibilidade" outlined required></v-text-field>
                      <v-btn @click="e13 = 6" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 8"> Continue </v-btn>
                    </v-stepper-content>

                  <v-stepper-step editable step="8" complete> 8 - CONTROLE DE EXPOSIÇÃO E PROTEÇÃO INDIVIDUAL </v-stepper-step>
                  <v-stepper-content step="8">
                    <div style="width: 100%; height: 10px;"></div>
                      <v-textarea v-model="limitexposicao" counter label="Limite de exposição" :rules="rules500"></v-textarea>
                      <v-text-field v-model="medcontroleng" name="input-5-1" :rules="rules250" label="Medidas de controle e engenharia" outlined required></v-text-field>
                      <v-text-field v-model="polhos" name="input-5-1" :rules="rules90" label="Proteção para os olhos/face" outlined required></v-text-field>
                      <v-text-field v-model="ppele" name="input-5-1" :rules="rules90" label="Proteção da pele" outlined required></v-text-field>
                      <v-text-field v-model="prespiratoria" name="input-5-1" :rules="rules90" label="Proteção respiratória" outlined required></v-text-field>
                      <v-text-field v-model="ptermicos" name="input-5-1" :rules="rules90" label="Perigos térmicos" outlined required></v-text-field>

                      <v-btn @click="e13 = 7" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 9"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="9" complete> 9 - PROPRIEDADES FISICAS E QUÍMICAS </v-stepper-step>
                  <v-stepper-content step="9">
                    <div style="width: 100%; height: 10px;"></div>
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

                      <v-btn @click="e13 = 8" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 =10"> Continue </v-btn>

                  </v-stepper-content>

                  <v-stepper-step editable step="10" complete> 10 - ESTABILIDADE E REATIVIDADE </v-stepper-step>
                  <v-stepper-content step="10">
                    <div style="width: 100%; height: 10px;"></div>
                    <v-text-field v-model="reatividade" name="input-5-1" :rules="rules90" label="Reatividade" outlined required></v-text-field>
                    <v-text-field v-model="estabilidadeq" name="input-5-1" :rules="rules250" label="Estabilidade química" outlined required></v-text-field>
                    <v-text-field v-model="rperigosas" name="input-5-1"  :rules="rules500" label="Possibilidade de reações perigosas" outlined required></v-text-field>
                    <v-text-field v-model="caseremevitadas" name="input-5-1" :rules="rules250" label="Condições a serem evitadas" outlined required></v-text-field>
                    <v-text-field v-model="incompativeis" name="input-5-1" :rules="rules250" label="Materiais incompatíveis" outlined required></v-text-field>
                    <v-text-field v-model="pdecomposicao" name="input-5-1" :rules="rules250" label="Produtos perigosos de decomposição" outlined required></v-text-field>

                    <div>
                      <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                      <a href ="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">PubChem</a>
                    </div>

                      <v-btn @click="e13 = 9" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 11"> Continue </v-btn>
                  
                    </v-stepper-content>

                  <v-stepper-step editable step="11" complete> 11 - INFORMAÇÕES TOXICOLÓGICAS </v-stepper-step>
                    <v-stepper-content step="11">
                      <div style="width: 100%; height: 10px;"></div>
                    <v-textarea v-model="toxicidadea" counter label="Toxicidade" :rules="rules500"></v-textarea>
                    <v-text-field v-model="cpele" name="input-5-1" :rules="rules250" label="Corrosão/irritaçãoà pele" outlined required></v-text-field>
                    <v-text-field v-model="loculares" name="input-5-1" :rules="rules250" label="Lesões oculares graves/iritação ocular" outlined required></v-text-field>
                    <v-text-field v-model="srespiratoria" name="input-5-1" :rules="rules250" label="Sensibilização respiratória ou à pele" outlined required></v-text-field>
                    <v-text-field v-model="mutagenicidade" name="input-5-1" :rules="rules45" label="Mutagenicidade em célulass germinativas" outlined required></v-text-field>
                    <v-text-field v-model="carcinogenicidade" name="input-5-1" :rules="rules45" label="Carcinogenicidade" outlined required></v-text-field>
                    <v-text-field v-model="reproducao" name="input-5-1" :rules="rules45" label="Toxicidade à reprodução" outlined required></v-text-field>
                    <v-text-field v-model="exposicaou" name="input-5-1" :rules="rules45" label="Toxicidade para órgãos - alvo específicos - exposição única" outlined required></v-text-field>
                    <v-text-field v-model="exposicaor" name="input-5-1" :rules="rules45" label="Toxicidade para órgãos - alvo específicos - exposição repetida" outlined required></v-text-field>
                    <v-text-field v-model="aspiracao" name="input-5-1" :rules="rules250" label="Perigo por aspiração" outlined required></v-text-field>

                    <div>
                      <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                      <a href ="https://www.atsdr.cdc.gov/toxprofiledocs/index.html" target="_blank">Agency for toxic Substances and Disease Registry</a>
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

                    <v-btn @click="e13 = 10" style="background: yellow; margin: 15px">Voltar</v-btn>
                    <v-btn color="primary" @click="e13 = 12"> Continue </v-btn>
                    </v-stepper-content>

                  <v-stepper-step editable step="12" complete> 12 - INFORMAÇÕES ECOLÓGICAS </v-stepper-step>
                    <v-stepper-content step="12">
                      <div style="width: 100%; height: 10px;"></div>
                    <v-text-field v-model="ecotoxidade" name="input-5-1" :rules="rules500" label="Ecotoxidade" outlined required></v-text-field>
                    <v-text-field v-model="degradabilidade" name="input-5-1" :rules="rules500" label="Persistência e degradabilidade" outlined required></v-text-field>
                    <v-text-field v-model="bioacumulativo" name="input-5-1" :rules="rules500" label="Potencial bioacumulativo" outlined required></v-text-field>
                    <v-text-field v-model="mobilidade" name="input-5-1" :rules="rules500" label="Mobilidade ao solo" outlined required></v-text-field>
                    <v-text-field v-model="outros_efeitos" name="input-5-1" :rules="rules500" label="Outros efeitos adversos" outlined required></v-text-field>

                    <div>
                      <p style="color:blue; font-size: 20px">LINKS DE APOIO</p>
                      <a href ="https://comptox.epa.gov/dashboard/" target="_blank">CompTox Chemicals Dashboard</a>
                    </div>
                    <div>
                      <a href ="https://pubchem.ncbi.nlm.nih.gov/" target="_blank">PubChem</a>
                    </div>

                    <v-btn @click="e13 = 11" style="background: yellow; margin: 15px">Voltar</v-btn>
                    <v-btn color="primary" @click="e13 = 13"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-step editable step="13" complete> 13 - CONSIDERAÇÕES SOBRE DESTINAÇÃO FINAL </v-stepper-step>
                    <v-stepper-content step="13">
                      <div style="width: 100%; height: 10px;"></div>
                      <v-container fluid>
                        <v-textarea counter label="Destinação Final" :value="destinacaofinal"></v-textarea>
                      </v-container>
                      
                        <v-btn @click="e13 = 12" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 14"> Continue </v-btn>
                    </v-stepper-content>
                
                  <v-stepper-step editable step="14" complete> 14 - INFORMAÇÕES SOBRE TRANSPORTE </v-stepper-step>
                    <v-stepper-content step="14">
                      <div style="width: 100%; height: 10px;"></div>
                      <v-container fluid>
                        <v-textarea v-model="terrestre" counter label="TERRESTRE" :rules="rules500"></v-textarea>
                        <v-text-field v-model="onu" name="input-5-1" :rules="rules500" label="Número ONU" outlined required></v-text-field>
                        <v-text-field v-model="nome_embarque" name="input-5-1"  label="Nome apropriado para embarque" outlined required></v-text-field>
                        <v-text-field v-model="classe" name="input-5-1" :rules="rules500" label="Classe/Subclasse" outlined required></v-text-field>
                        <v-text-field v-model="n_risco" name="input-5-1" :rules="rules500" label="Número de risco" outlined required></v-text-field>
                        <v-text-field v-model="grupo_emb" name="input-5-1" :rules="rules500" label="Grupo de embalagem" outlined required></v-text-field>
                        <v-textarea v-model="hidroviario" counter label="HIDROVIÁRIO" :rules="rules500"></v-textarea>
                        <!-- <v-text-field v-model="onuh" name="input-5-1" :rules="rules500" label="Número ONU" outlined required></v-text-field>
                        <v-text-field v-model="embarqueh" name="input-5-1" :rules="rules500" label="Nome apropriado para embarque" outlined required></v-text-field> -->
                        <!-- <v-text-field v-model="classeh" name="input-5-1" :rules="rules500" label="Classe/Subclasse" outlined required></v-text-field>
                        <v-text-field v-model="riscoh" name="input-5-1" :rules="rules500" label="Número de risco" outlined required></v-text-field>
                        <v-text-field v-model="embalagemh" name="input-5-1" :rules="rules500" label="Grupo de embalagem" outlined required></v-text-field> -->
                        <v-textarea v-model="aereo" counter label="AÉREO" :rules="rules500"></v-textarea>
                        <!-- <v-text-field v-model="onua" name="input-5-1" :rules="rules500" label="Número ONU" outlined required></v-text-field>
                        <v-text-field v-model="embarquea" name="input-5-1" :rules="rules500" label="Nome apropriado para embarque" outlined required></v-text-field> -->
                        <!-- <v-text-field v-model="classea" name="input-5-1" :rules="rules500" label="Classe/Subclasse" outlined required></v-text-field>
                        <v-text-field v-model="riscoa" name="input-5-1" :rules="rules500" label="Número de risco" outlined required></v-text-field>
                        <v-text-field v-model="embalagema" name="input-5-1" :rules="rules500" label="Grupo de embalagem" outlined required></v-text-field> -->
                      </v-container>
                      
                      <v-btn @click="e13 = 13" style="background: yellow; margin: 15px">Voltar</v-btn>
                      <v-btn color="primary" @click="e13 = 15"> Continue </v-btn>
                    </v-stepper-content>
                  
                  <v-stepper-step editable step="15" complete> 15 - INFORMAÇÕES SOBRE REGULAMENTAÇÕES </v-stepper-step>
                    <v-stepper-content step="15">
                      <div style="width: 100%; height: 10px;"></div>
                      <v-container fluid>
                        <v-textarea v-model="regulamentacoes" counter label="Regulamentações" :rules="rules500"></v-textarea>
                      </v-container>
                                            
                        <v-btn @click="e13 = 14" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 16"> Continue </v-btn>
                    </v-stepper-content>

                    <v-stepper-step editable step="16" complete> 16 - OUTRAS INFORMAÇÕES </v-stepper-step>
                    <v-stepper-content step="16">
                      <div style="width: 100%; height: 10px;"></div>
                      <v-container fluid>
                        <v-textarea v-model="outras_info" counter label="INFORMAÇÕES" :rules="rules500"></v-textarea>
                      </v-container>
                      
                        <v-btn @click="e13 = 15" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <!-- <v-btn color="primary" @click="e13 = 12"> Continue </v-btn> -->
                    </v-stepper-content>

                  </v-stepper>
                  <div style="display: flex; justify-content: center; margin-top: 25px;">
                    <v-btn :disabled="!valid" color="success" class="mr-4" x-large @click="addFispq">
                      Cadastrar
                    </v-btn>
                </div>
        </v-form>
  </div>
</template>

<script>
import FispqService from "../services/Fispq";
export default {

  data: () => ({

      snackbar: false,
      text: `As Frases correspondentes a este numero ONU foram adicionadas`,
      valid: false,
      finish: false,
      cod_int: '',
      produto:'',
      uso:'Reagente para uso em laboratório',
      limitexposicao:'',
      medcontroleng:'',
      polhos:'Utilizar óculos de segurança com proteção contra respingos.',
      ppele:'Vestuário em tecido sintético ou algodão podem ser usados na composição indumentária.',
      prespiratoria:'Não é necessária.',
      ptermicos:'Não apresenta perigos térmicos.',
      aspecto:'',
      odor:'',
      ph:'Não disponível',
      fusao:'Não disponível',
      ebulicao:'Não disponível',
      fulgor:'Não disponível',
      evaporacao:'Não disponível',
      inflamabilidade:'Não disponível',
      explosividade:'Não disponível',
      pvapor:'Não disponível',
      dvapor:'Não disponível',
      drelativa:'Não disponível',
      solubilidade:'Não disponível',
      particao:'Não disponível',
      autoignicao:'Não disponível',
      decomposicao:'Não disponível',
      viscosidade:'Não disponível',
      informacoes:'Não disponível',
      reatividade:'Não disponível',
      estabilidadeq:'Produto estável sob as condições recomendadas de armazenamento. ',
      rperigosas:'',
      caseremevitadas:'',
      incompativeis:'',
      pdecomposicao:'',
      toxicidadea:'Não disponível',
      cpele:'Não disponível',
      srespiratoria:'Não disponível',
      mutagenicidade:'Não disponível',
      carcinogenicidade:'Não disponível',
      reproducao:'Não disponível',
      exposicaou:'Não disponível',
      exposicaor:'Não disponível',
      aspiracao:'Não disponível',
      ecotoxidade:'Não disponível',
      degradabilidade:'Não disponível',
      bioacumulativo:'Não disponível',
      mobilidade:'Não disponível',
      outros_efeitos:'Não disponível',
      destinacaofinal:'No tratamento e disposição do produto, de seus restos e de embalagens usadas, devem-se seguiras orientações da legislação nas esferas municipal, estadual e federal. Recomenda-se queimar em um incinerador químico equipado com pós-combustor e purificador de gases, mas tomar precauções adicionais ao colocar esse material em ignição, visto que é altamente inflamável. Observar todos os regulamentos ambientais federais, estaduais e locais.',
      terrestre: 'TERRESTRE: \nResolução n° 5.947 de 01 de junho de 2021 da Agência Nacional de Transportes Terrestres (ANTT), Atualiza o Regulamento para o Transporte Rodoviário de Produtos Perigosos e aprova as suas Instruções Complementares, e dá outras providências',
      onu:'',
      nome_embarque:'',
      classe:'',
      n_risco:'',
      grupo_emb:'',
      hidroviario:'DPC - Diretoria de Portos e Costas (transporte de águas brasileiras)\nNormas de autoridade Marítima (NORMAM)\nNORMAM 01/DPC: Embarcações empregada na Navegação em Mar Aberto\nNORMAM 02/DPC: Embarcações Empregadas na Navegação Interior\nIMO - "International Maritime Organization" (Organização Marítima Internacional)\nInternational Maritime Dangerous Googs Code(IMDG Code)',
      onuh:'',
      embarqueh:'',
      classeh:'',
      riscoh:'',
      embalagemh:'',
      aereo: 'AÉREO\nANAC - Agência Nacional de Aviação Civil - Resolução n°129 de 8 de dezembro de 2009.\nRBAC N°175 - REGULAMENTO BRASILEIRO DA AVIAÇÃO CIVIL - TRANSPORTE DE ARTIGOS PERIGOSOS EM AERONAVES CIVIS./n IS N° 175-001-INSTRUÇÃO SUPLEMENTAR IS\n ICAO - "International Civil Aviation Organization"(Organização da Aviação Civil Internacional)-DOC 9284-na/905\nIATA - "International Air Transport Association" (Associação Internacional de Transporte Aéreo)\nDangerous Goods Regulation (DGR)',
      onua:'',
      embarquea:'',
      classea:'',
      riscoa:'',
      embalagema:'',
      regulamentacoes:'Decreto Federal nº 2.657, de 3 de julho de 1998. \nNorma ABNT-NBR 14725:2012.\nPortaria n° 229 de 24 de maio de 2011.',
      outras_info:'Centros de Informações Toxicológicas\nBelo Horizonte - Serviço de Toxicologia de Minas Gerais - Hospital João XXIII\nFone: (31) 3239.9224/3239.9223 (Hospital) (31)3239-9308 / 3224-4000 (Tel. CIT) Fax: (31) 3239.9260(CIT).\n\nPorto Alegre Centro de Informações Toxicológicas do Rio Grande do Sul.\nFone: (51) 3217.1751 (Tel. CIT) Fax: (51) 3217.9067 Atendimento: 0800 78 02 00.\nRecife - Centro de Assistência Toxicológica de Pernambuco - Hospital da Restauração - 1º andar.\nFone: (81) 3421.5444 R. 151 (Tel. Hospital) Fax: (81) 3421.5927 / 3423-8263.\nRio de Janeiro- Centro de Controle de Intoxicações do Rio de Janeiro - Hospital Universitário Clementino Fraga Filho.\nFone: (21) 2573.3244/2290-3344 (Tel. CIT) - Fax: (21) 2573-7079 (CIT).\nSalvador- Centro de Informações Anti-Veneno da Bahia - CIAVE - Hospital Geral Roberto Santos.\nFone: (71) 387.3414/387-4343 e 0800 284 43 43 Fax: (71) 387.3414.\nSão Paul- Centro de Controle de Intoxicações de São Paulo - Hospital Municipal Dr. Artur Ribeiro de Saboya.\nFone/Fax: (11) 5012/2399 (Tel. CIT) (11) 5012-5311 (atendimento médico) Atendimento: 0800 771 37 33.\nLegendas e abreviaturas\nCAS - Chemical Abstracts Service\nONU – Organização das Nações Unidas\nACGIH - American Conference of Governmental Industrial Hygienists\nTLV - Threshold Limit Values (limites de exposição)\nTWA – Time-Weighted Average (média ponderada pelo tempo)\nSTEL – Short-Term Exposure Limit (exposição de curta duração)\nDL50 – Dose letal 50%\nCL50 – Concentração letal 50%\nCE50 – Concentração Efetiva\nO não cumprimento das informações acima descritas, isenta o fabricante de responsabilidade pelo uso indevido do produto. As indicações baseiam-se no nível atual de nossos conhecimentos e servem para a caracterização do produto no que se refere às medidas de segurança a tomar. Estas indicações não implicam em qualquer garantia das propriedades do produto acima descrito.\nPermitido fazer número ilimitado de cópias físicas, somente para uso interno.',
      loculares:'Não disponível',
      todas_frases_Perigo:[],
      todas_frases_Precaucao:[],
      frase_Advertencia:"",
      pictogramas: [],
      substancias: [],
      inalacao:'',
      cont_pele:'',
      cont_olhos:'',
      ingestao:'',
      sintomas:'',
      medico:'',
      extincao:'',
      perigo_esp:'',
      medidas_protecao:'',
      servico_emergencia:'',
      servico_emergencia2:'',
      precaucao_ambiente:'',
      metodos_materiais:'',
      manuseio_seguro:'',
      medidas_higiene:'',
      condicoes_armazenamento:'',

      e13: 1,
      dialog: false,
      dialogDelete: false,

      corrosivo: true,
      checkbox2: false,
      checkbox3: false,

      pictogramas_disponiveis: [
      {
          name: 'explosivo',
          imagem: 'explosivo.jpg'
        },
        {
          name: 'ambiente',
          imagem: 'ambiente.jpg'
        },
        {
          name: 'corrosivo',
          imagem: 'corrosivo.jpg'
        },
        {
          name: 'gas_comprimido',
          imagem: 'gas_comprimido.jpg'
        },
        {
          name: 'inflamavel',
          imagem: 'inflamavel.jpg'
        },
        {
          name: 'exclamacao',
          imagem: 'exclamacao.jpg'
        },
        {
          name: 'oxidante',
          imagem: 'oxidante.jpg'
        },
        {
          name: 'perigo_a_saude',
          imagem: 'perigo_a_saude.jpg'
        },
        {
          name: 'toxico',
          imagem: 'toxico.jpg'
        },
      ],


      // items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      
      classificacao: [],

 
      selectedClassificacao: [],
  

      headers: [
        {
          text: 'Substância',
          align: 'start',
          sortable: false,
          value: 'substancia',
          class:'blue lighten-3 subtitle-1 font-weight-black'
        },
        { text: 'CAS', value: 'cas', class:'blue lighten-3 subtitle-1 font-weight-black' },
        { text: 'Formula Molecular', value: 'fm',class:'blue lighten-3 subtitle-1 font-weight-black' },
        { text: 'Peso Molecular', value: 'pm', class:'blue lighten-3 subtitle-1 font-weight-black' },
        { text: 'Concentração (M/M)', value: 'cmm', class:'blue lighten-3 subtitle-1 font-weight-black' },
        { text: 'Actions', value: 'actions', sortable: false, class:'blue lighten-3 subtitle-1 font-weight-black' },
      ],
      
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

      rules20: [v => !!v || 'Este campo é obrigatório', v => v.length <= 20 || 'Max 20 caracteres',],
      rules45: [v => v.length <= 45 || 'Max 45 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules90: [v => v.length <= 90 || 'Max 90 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules250: [v => v.length <= 250 || 'Max 250 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules500:[v => v.length <= 500 || 'Max 500 caracteres', v => !!v || 'Este campo é obrigatório'],
    }),


    computed: {

      likesAllClassificacao () {
      return this.selectedClassificacao.length === this.classificacao.length
      },
      likesSomeClassificacao () {
        return this.selectedClassificacao.length > 0 && !this.likesAllClassificacao
        },
      icon () {
        if (this.likesAllClassificacao) return 'mdi-close-box'
        if (this.likesSomeClassificacao) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
        },
  
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
    this.getFrasesClassificacao();
  },

  methods: {

    toggle () {
      this.$nextTick(() => {
        if (this.likesAllClassificacao) {
          this.selectedClassificacao = []
        } else {
          this.selectedClassificacao = this.classificacao.slice()
        }
      })
    },
    async getFrasesClassificacao() {
            try {
                const response = await FispqService.getClassificacao();
                this.classificacao = response.data.categorias_list.map(categoria=> {
                    return {
                    
                      categoria: categoria.Categoria,
                      num:categoria.Num
                    }
                });

            } catch (err) {
                this.classificacao = [];
            }
        },

        async getAllFrasesClassificacaoByIDS() {
            try {
              // const = cria a variavel
              // response = nome da variavel
              // await = 
              // FispqService = ?????
              // getFrasesONU = metodo para chamar uma rota
              // () = 
              const response = await FispqService.getAllFrasesClassificacaoByIDS(this.selectedClassificacao);

              this.todas_frases_Perigo = response.data['frases_perigo'].join('\n');
              this.todas_frases_Precaucao = response.data['frases_precaucao'].join('\n');
              this.frase_Advertencia = response.data['frases_advertencia'];
              this.pictogramas = response.data['pictogramas'];
              this.todas_frases_classificacao = response.data['frases_classificacao'].join('\n')

              console.log(response);

            } catch (err) {
              this.todas_frases_Perigo['erro']
            }
          },

      async addFispq() {
          try {
              const data = {
//                produto = nome do campo criado para receber informações do front
//                this = acrescenta a informação no metodo data
//                produto = nome do campo do backend
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
                  loculares: this.loculares,
                  substancias: this.substancias,
                  todas_frases_Perigo:this.todas_frases_Perigo,
                  todas_frases_Precaucao:this.todas_frases_Precaucao,
                  frase_Advertencia:this.frase_Advertencia,
                  pictogramas:this.pictogramas.join(","),
                  todas_frases_classificacao: this.todas_frases_classificacao, 
                  ids_frases_perigo: this.selectedClassificacao.join(",")
              } 
              await FispqService.add(data);
           
              this.finish = true;
//            reseta o formulário
              this.reset();

              setTimeout(() => {
                  this.$router.push({path: '/dash/fispq'});
              }, 1000);
                
          } catch (err) {
              console.log(err);
          }
      },
      

      async getFrasesByONU() {
//         Bloco try/catch serve para tratamento de exceções, tratamento de códigos que podem não ser totalmente atendidos e gerarem alguma exceção/erro.
//         O try consegue recuperar erros que possam ocorrer no código fornecido em seu bloco.
//         O catch por sua vez faz o tratamento dos erros que aconteceram.
            try {
              // const = cria a variavel
              // response = nome da variavel
              // await = 
              // FispqService = ?????
              // getFrasesONU = metodo para chamar uma rota
              // () = 
                const response = await FispqService.getFrasesONU(this.onu);
                
                this.inalacao = response.data['frases']['4.1'];
                this.cont_olhos = response.data['frases']['4.2'];
                this.cont_pele = response.data['frases']['4.3'];
                this.ingestao = response.data['frases']['4.4'];
                this.sintomas = response.data['frases']['4.5'];
                this.medico = response.data['frases']['4.6'];
                this.extincao = response.data['frases']['5.1'];
                this.perigo_esp = response.data['frases']['5.2'];
                this.medidas_protecao = response.data['frases']['5.3'];
                this.servico_emergencia = response.data['frases']['6.1'];
                this.servico_emergencia2 = response.data['frases']['6.2'];
                this.precaucao_ambiente = response.data['frases']['6.3'];
                this.metodos_materiais = response.data['frases']['6.4'];
                this.manuseio_seguro = response.data['frases']['7.1'];
                this.medidas_higiene = response.data['frases']['7.2']
                this.nome_embarque = response.data['Nome_aprop'][2]
                this.onuh = response.data['numero_onu']
                this.embarqueh = response.data['Nome_aprop'][2]
                this.onua = response.data['numero_onu']
                this.embarquea = response.data['Nome_aprop'][2]

            } catch (err) {
              console.log(err)
            }
      },
        goToList() {
            this.$router.push({ path: '/dash/fispq' });
        },
        reset() {
            this.$refs.form.reset();
        },
    
    // methods: {
      // initialize () {
      //   this.substancias = [
      //     {
      //       substancia: 'Água',
      //       cas: 159,
      //       fm: 2,
      //       pm: 18,
      //       cmm: 90,
      //     },
      //     {
      //       substancia: 'Ice cream sandwich',
      //       cas: 237,
      //       fm: 9.0,
      //       pm: 37,
      //       cmm: 4.3,
      //     },
      //     {
      //       substancia: 'Eclair',
      //       cas: 262,
      //       fm: 16.0,
      //       pm: 23,
      //       cmm: 6.0,
      //     },
      //   ]
      // },

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
