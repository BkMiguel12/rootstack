angular.module('root', ['ui.bootstrap'])
.controller('rootCtrl', function($scope, $http, $log) {

    $scope.sourceList = ['Internet search', 'Facebook', 'Referal'];
    $scope.statusList = ['Lead', 'Client', 'Prospect'];
    $scope.caseList = ['Divorce', 'Fraud', 'DUI', 'Tax Evasion', 'Assault'];
    $scope.itemsPerPageList = [5, 10, 15];
    $scope.editing;
    $scope.filtering;
    $scope.currPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;

    // Api rest - GET data
    if(localStorage.getItem('data') === null){
        $http.get('https://randomapi.com/api/a8f41b3e14fa98659579b3d5fb2af8c2?fmt=raw&sole').then(function(res) {
            $scope.data = res.data;
            localStorage.setItem('data', JSON.stringify($scope.data)); //Save data in Local Storage
            console.log($scope.data);
        }, function(err) {
            console.log(err);
        })
    }else{
        $log.debug('Permanent data');
        $scope.data = JSON.parse(localStorage.getItem('data')) //Data saved in Local Storage
    }
    
    // Create lead
    $scope.addNew = function() {
        var modal = angular.element('#modalAdd');
        var newUser = {
            name: $scope.newName,
            email: $scope.newEmail,
            phone: $scope.newPhone,
            source: $scope.newSource,
            status: $scope.newStatus,
            case: $scope.newCase
        }
        $scope.data.unshift(newUser);
        $scope.updatePag();
        localStorage.setItem('data', JSON.stringify($scope.data));

        $scope.newName = "";
        $scope.newEmail = "";
        $scope.newPhone = "";
        $scope.newSource = "";
        $scope.newStatus = "";
        $scope.newCase = "";

        modal.modal('hide');

        console.log(newUser);
    }

    // Delete Lead
    $scope.deleteLead = function(id) {
        $scope.data.splice(id, 1);
        $scope.updatePag();
        localStorage.setItem('data', JSON.stringify($scope.data));
    }

    // Edits
    // Edit source
    $scope.editSource = function(id, source){
        $scope.data[id].source = source;
        localStorage.setItem('data', JSON.stringify($scope.data));
    }
    // Edit status
    $scope.editStatus = function(id, status){
        $scope.data[id].status = status;
        localStorage.setItem('data', JSON.stringify($scope.data));
    }
    // Edit Lead
    $scope.checkInputs = function(id) {//Check fields for edit
        console.log(id);
        $scope.id = id;
        $scope.editing == true ? $scope.editing = false : $scope.editing = true;
    }
    $scope.editLead = function() {//Edit data
        localStorage.setItem('data', JSON.stringify($scope.data));
        $scope.editing = false;
    }

    // Pagination
    $scope.setItemsPerPage = function(number){
        console.log(number);
        $scope.itemsPerPage = number;
        $scope.updatePag();
    }
    $scope.numOfPages = function(){
        return Math.ceil($scope.data.length / $scope.itemsPerPage);
    }
    $scope.updatePag = function() {
        var start = (($scope.currPage - 1) * $scope.itemsPerPage);
        end = start + $scope.itemsPerPage;

        $scope.filteredItems = $scope.data.slice(start, end);
    }

    $scope.$watch('currPage + numPerPage',function() {
        $scope.updatePag();
    });

    // Order
    $scope.setStringForOrder = function(str) {
        $scope.stringToSearch = str;
        $scope.statusSearch = str;
        $scope.filtering = true;
    }
    $scope.setStringSouForOrder = function(str) {
        $scope.sourceSearch = str;
        $scope.stringToSearch = str;
        $scope.filtering = true;
    }

    $scope.clearFilter = function(){
        $scope.stringToSearch = '';
        $scope.sourceSearch = '';
        $scope.statusSearch = '';
        $scope.filtering = false;
    }
    
})