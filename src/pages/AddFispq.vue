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
                  <v-stepper-content step="1">
                      <v-text-field v-model="cod_int" :rules="rules20" name="input-5-1" counter="20" label="Cód. interno" outlined required></v-text-field>
                      <v-text-field v-model="produto" name="input-5-1" :rules="rules90" counter="90" label="Nome da substância ou mistura" outlined required></v-text-field>
                      <v-text-field v-model="uso" name="input-5-1" :rules="rules90" counter="90" label="Principais usos recomendados para a substância ou mistura:" outlined required></v-text-field>
                    
                      <v-btn color="primary" @click="e13 = 2"> Continue </v-btn>
                  </v-stepper-content>
            
              <v-stepper-step editable step="2" complete> 2 - CLASSIFICAÇÃO DE PERIGO DO PRODUTO </v-stepper-step>
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

              <v-stepper-step editable step="3" complete> 3 - COMPOSIÇÃO E INFORMAÇÕES SOBRE OS INGREDIENTES </v-stepper-step>
                  <v-stepper-content step="3">
                    <v-data-table :headers="headers" :items="substancias" sort-by="cmm" class="elevation-1">
                      <template v-slot:top>
                        <v-toolbar flat>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                          <v-dialog v-model="dialog" max-width="800px">
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

                  <v-stepper-step editable step="5" complete> 9 - PROPRIEDADES FISICAS E QUÍMICAS </v-stepper-step>
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

                  <v-stepper-step editable step="6" complete> 10 - ESTABILIDADE E REATIVIDADE </v-stepper-step>
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

                  <v-stepper-step editable step="7" complete> 11 - INFORMAÇÕES TOXICOLÓGICAS </v-stepper-step>
                    <v-stepper-content step="7">
                    <v-textarea counter label="Toxicidade" :rules500="rules" :value="toxicidadea"></v-textarea>
                    <!-- <v-text-field v-model="toxicidadea" name="input-5-1" :rules="rules250" label="Toxicidade" outlined required></v-text-field> -->
                    <v-text-field v-model="cpele" name="input-5-1"  label="Corrosão/irritaçãoà pele" outlined required></v-text-field>
                    <v-text-field v-model="srespiratoria" name="input-5-1" :rules="rules250" label="Lesões oculares graves/iritação ocular" outlined required></v-text-field>
                    <v-text-field v-model="mutagenicidade" name="input-5-1" :rules="rules45" label="Sensibilização respiratória ou à pela" outlined required></v-text-field>
                    <v-text-field v-model="carcinogenicidade" name="input-5-1" :rules="rules45" label="Mutagenicidade em célulass germinativas" outlined required></v-text-field>
                    <v-text-field v-model="reproducao" name="input-5-1" :rules="rules45" label="Carcinogenicidade" outlined required></v-text-field>
                    <v-text-field v-model="exposicaou" name="input-5-1" :rules="rules45" label="Toxicidade à reprodução" outlined required></v-text-field>
                    <v-text-field v-model="exposicaor" name="input-5-1" :rules="rules45" label="Toxicidade para órgãos - alvo específicos - exposição única" outlined required></v-text-field>
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

                    <v-btn @click="e13 = 6" style="background: yellow; margin: 15px">Voltar</v-btn>
                    <v-btn color="primary" @click="e13 = 8"> Continue </v-btn>
                    </v-stepper-content>

                  <v-stepper-step editable step="8" complete> 12 - INFORMAÇÕES ECOLÓGICAS </v-stepper-step>
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

                  <v-stepper-step editable step="9" complete> 13 - CONSIDERAÇÕES SOBRE DESTINAÇÃO FINAL </v-stepper-step>
                    <v-stepper-content step="9">
                      <v-container fluid>
                        <v-textarea counter label="Destinação Final" :rules500="rules" :value="destinacaofinal"></v-textarea>
                      </v-container>
                      
                        <v-btn @click="e13 = 8" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 10"> Continue </v-btn>
                    </v-stepper-content>
                
                  <v-stepper-step editable step="10" complete> 14 - INFORMAÇÕES SOBRE TRANSPORTE </v-stepper-step>
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
                  

                  <v-stepper-step editable step="11" complete> 15 - INFORMAÇÕES SOBRE REGULAMENTAÇÕES </v-stepper-step>
                    <v-stepper-content step="11">
                      <v-container fluid>
                        <v-textarea counter label="Regulamentações" :rules500="rules" :value="regulamentacoes"></v-textarea>
                      </v-container>
                      
                      
                        <v-btn @click="e13 = 10" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 12"> Continue </v-btn>
                    </v-stepper-content>

                    <v-stepper-step editable step="12" complete> 16 - OUTRAS INFORMAÇÕES </v-stepper-step>
                    <v-stepper-content step="12">
                      <v-container fluid>
                        <v-textarea counter label="INFORMAÇÕES" :rules500="rules" :value="oinformacoes"></v-textarea>
                      </v-container>
                      
                        <v-btn @click="e13 = 11" style="background: yellow; margin: 15px">Voltar</v-btn>
                        <v-btn color="primary" @click="e13 = 12"> Continue </v-btn>
                    </v-stepper-content>

                  </v-stepper>
                  <v-btn :disabled="!valid" color="success" class="mr-4" @click="addFispq">
                    Cadastrar
                  </v-btn>
        </v-form>
  </div>
</template>

<script>
import FispqService from "../services/Fispq";
export default {

  data: () => ({
      valid: false,
      finish: false,
      cod_int: '',
      produto:'',
      uso:'Reagente para uso em laboratório',
      // frase_perigo_selecionada: null,
      // frase_perigo_availables:[],
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
      oinformacoes:'Centros de Informações Toxicológicas\nBelo Horizonte - Serviço de Toxicologia de Minas Gerais - Hospital João XXIII\nFone: (31) 3239.9224/3239.9223 (Hospital) (31)3239-9308 / 3224-4000 (Tel. CIT) Fax: (31) 3239.9260(CIT).\n\nPorto Alegre Centro de Informações Toxicológicas do Rio Grande do Sul.\nFone: (51) 3217.1751 (Tel. CIT) Fax: (51) 3217.9067 Atendimento: 0800 78 02 00.\nRecife - Centro de Assistência Toxicológica de Pernambuco - Hospital da Restauração - 1º andar.\nFone: (81) 3421.5444 R. 151 (Tel. Hospital) Fax: (81) 3421.5927 / 3423-8263.\nRio de Janeiro- Centro de Controle de Intoxicações do Rio de Janeiro - Hospital Universitário Clementino Fraga Filho.\nFone: (21) 2573.3244/2290-3344 (Tel. CIT) - Fax: (21) 2573-7079 (CIT).\nSalvador- Centro de Informações Anti-Veneno da Bahia - CIAVE - Hospital Geral Roberto Santos.\nFone: (71) 387.3414/387-4343 e 0800 284 43 43 Fax: (71) 387.3414.\nSão Paul- Centro de Controle de Intoxicações de São Paulo - Hospital Municipal Dr. Artur Ribeiro de Saboya.\nFone/Fax: (11) 5012/2399 (Tel. CIT) (11) 5012-5311 (atendimento médico) Atendimento: 0800 771 37 33.\nLegendas e abreviaturas\nCAS - Chemical Abstracts Service\nONU – Organização das Nações Unidas\nACGIH - American Conference of Governmental Industrial Hygienists\nTLV - Threshold Limit Values (limites de exposição)\nTWA – Time-Weighted Average (média ponderada pelo tempo)\nSTEL – Short-Term Exposure Limit (exposição de curta duração)\nDL50 – Dose letal 50%\nCL50 – Concentração letal 50%\nCE50 – Concentração Efetiva\nO não cumprimento das informações acima descritas, isenta o fabricante de responsabilidade pelo uso indevido do produto. As indicações baseiam-se no nível atual de nossos conhecimentos e servem para a caracterização do produto no que se refere às medidas de segurança a tomar. Estas indicações não implicam em qualquer garantia das propriedades do produto acima descrito.\nPermitido fazer número ilimitado de cópias físicas, somente para uso interno.',
      outras_info:'',
      outras_info2: '',
      legenda: '',

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

      rules20: [v => !!v || 'Este campo é obrigatório', v => v.length <= 20 || 'Max 20 caracteres',],
      rules45: [v => v.length <= 45 || 'Max 45 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules90: [v => v.length <= 90 || 'Max 90 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules250: [v => v.length <= 250 || 'Max 250 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules350: [v => v.length <= 350 || 'Max 350 caracteres', v => !!v || 'Este campo é obrigatório'],
      rules500:[v => v.length <= 500 || 'Max 500 caracteres', v => !!v || 'Este campo é obrigatório'],
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

  mounted() {
  },

  methods: {
      async addFispq() {
          try {
              const data = {
                  // cod_int: this.cod_int,
                  // produto: this.produto,
                  // uso: this.uso,
                  // onu: this.onu,
                  // embarque: this.embarque,
                  // limitexposicao:this.limitexposicao,
                  // medcontroleng:this.medcontroleng,
                  // polhos:this.polhos,
                  // ppele:this.ppele,
                  // prespiratoria:this.prespiratoria,

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
                  // frase_perigo_selecionada: this.frase_perigo_selecionada,
                  // frase_perigo_availables: this.frase_perigo_availables,
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

              }
              await FispqService.add(data);
                
              this.finish = true;
              this.reset();

              setTimeout(() => {
                  this.$router.push({path: '/dash/fispq'});
              }, 1000);
                
          } catch (err) {
              console.log(err);
          }
      },
      
      // async updateCategory() {
      //       try {
      //           const data = {
      //               name: this.name,
      //               description: this.description,
      //               author_id: this.author_selected.id
      //           }
      //           await FispqService.update(this.idCategory, data);

      //           this.finish = true;
      //           this.reset();

      //           setTimeout(() => {
      //               this.goToList();
      //           }, 10000);

      //       } catch (err) {
      //           console.log(err);
      //       }
      //   },
      
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