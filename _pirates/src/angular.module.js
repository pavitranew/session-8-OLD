export default angular.module('pirateApp', ['ngAnimate', 'ngRoute']);

angular.module('pirateApp')
.config(function config($locationProvider, $routeProvider) {
    $routeProvider.
    when('/', {
      template: '<pirate-list></pirate-list>'
  }).
    when('/pirates/:pirateId', {
      template: '<pirate-detail></pirate-detail>'
  }).
    otherwise('/');
}
); 

angular.module('pirateApp').component('pirateList', {
    templateUrl: './partials/pirate-list.template.html' ,
    controller: function PirateAppController($http, $scope){
    	
        $http.get('/api/pirates').
        then( (res) => {
            $scope.pirates = res.data;
        })

        $scope.deletePirate = function(index, pid) {
            $http.delete('/api/pirates/' + pid)
            .then( () => $scope.pirates.splice(index, 1))
        }

        $scope.addPirate = function(data){
        	$http.post('/api/pirates', data)
        	.then( (res) => {
        		$scope.pirates.push(res.data)
        		$scope.pirate = {}
        	})
        }
    }
})

angular.module('pirateApp').component('pirateDetail', {
    templateUrl: './partials/pirate-detail.template.html',
    controller:  function PirateDetailController($http, $routeParams) {
        $http.get('/api/pirates/' + $routeParams.pirateId)
        .then((response) => this.pirate = response.data);

        this.back = () => window.history.back(); 

        this.editorEnabled = true;

        this.toggleEditor = () => this.editorEnabled = !this.editorEnabled;

        this.savePirate = (pirate, pid) => {
            $http.put('/api/pirates/' + pid, pirate)
            .then((res) => this.editorEnabled = false )
        }
    }
})







