const API_URL_SEARCH = "https://api.vagalume.com.br/search.excerpt?apikey=e5d74f1fae750d34bd8d600fd164457b";
const LIMIT = 5;

function loadDoc(url, cFunction) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cFunction(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }


new Vue({
    el: '#app',
    data() {
        return {
            contemLetra: false,
            letra: [],
            musica: 'Time',
            artista: 'Pink Floyd',
            resposta: undefined,
        }
    },
    methods: {
        voltar() {
            this.contemLetra = !this.contemLetra;
        },
        procuraLetra() {
            this.contemLetra = !this.contemLetra;
        },
    },
    computed: {
        resultList() {
            return this.resposta ? this.resposta.response.docs : [];
        }
    },
    watch: {
        musica(newValue, oldValue) {
            let stringBusca = `${API_URL_SEARCH}&q=${newValue}&limit=${LIMIT}`;
            loadDoc(stringBusca, (data) => {
                let response = JSON.parse(data.responseText);
                this.resposta = response;
            });
            return newValue;
        }
    },
});

// (function(){
//     var app = angular.module('letras', []);

//     app.controller('ProcuraLetrasController', ['$scope', '$http', function ($scope, $http) {
//         var vm = this;

//         $scope.contemLetra = false;
//         $scope.procuraLetra = procuraLetra;
//         $scope.voltar = voltar;
//         $scope.letra = [];
//         $scope.resposta = {}

//         function procuraLetra() {
//             var url = "https://api.vagalume.com.br/search.php?apikey=e5d74f1fae750d34bd8d600fd164457b&art="+ $scope.artista +"&mus="+ $scope.musica;
//             $http.get(url).then(function (resposta) {

//                 $scope.resposta.artista = resposta.data.art.name;
//                 $scope.resposta.musica = resposta.data.mus[0].name;
//                 var letraIngles = resposta.data.mus[0].text;
//                 var letraPortugues = resposta.data.mus[0].translate[0].text;

//                 var arrayIngles = letraIngles.split('\n');
//                 var arrayPortugues = letraPortugues.split('\n');

//                 if (letraIngles != undefined) {
//                     $scope.contemLetra = true;
//                 }


//                 $scope.letra = [];
//                 for (var i = 0; i < arrayIngles.length; i++) {
//                     $scope.letra.push({ ingles: arrayIngles[i], portugues: arrayPortugues[i + 2]});
//                 }
//             }, function (erro) {
//                 console.log(erro)
//             });
//         }

//         function voltar() {
//             $scope.contemLetra = false;
//         }
//     }]);
// })();
