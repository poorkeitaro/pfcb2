'use strict';

angular.module('dndsheetApp')
  .controller('MainCtrl', function ($scope, $http, $q, $resource) {
  
    var stat = function(val, shorthand) {
      this.val = val;
      this.shorthand = shorthand;
      this.getModifier = function() {
        return Math.floor((this.val-10)/2);
      };
    };

  $scope.data  = {
          'abs' :
          {  //Expand these into short names/ordering
              'Strength' : new stat(12, 'STR'),
              'Dexterity' : new stat(17, 'DEX'),
              'Constitution' : new stat(14, 'CON'),
              'Intelligence' : new stat(6, 'INT'),
              'Wisdom' : new stat(15, 'WIS'),
              'Charisma' : new stat(17, 'CHA') 
          },
          'baseHP' : 36,
          'tempHP' : 0,
          'totalHP' : 0,
          'currentHP' : 0,
          'lethalDamage' : 0,
          'nonlethalDamage' : 0,
          'Speed' : 0,
          'BaseAC' : 10,
          'NaturalArmor' : 2,
          'Fortitude' : 0,
          'Reflex' : 0,
          'Will' : 0,
          'LVL' : 3,
          'BAB' : 1,
          'SR' : 0,
          'CMB' : 0,
          'CMD' : 0,
          'Name' : '',
          'Homeland' : '',
          'Deity' : '',
          'Skills' : [],
          'Feats' : [1351, 1460],
          'Items' : [],
          'Spells' : []
        };

        $scope.allFeats = [];
        $scope.selectedFeat = "";

        $http.get("/api/feats/").then(function(d){
          
          angular.forEach(d.data, function(feat){
            // if (feat.prerequisites.indexOf("Str") > -1) {
              // $scope.allFeats.push(feat.id+" : " + feat.name+" : "+feat.prerequisites);
              $scope.allFeats.push(feat);
            // }
          });
        });

    $scope.feats = [];
    for (var i = $scope.data.Feats.length -1; i >= 0; i--) {
      $http.get('/api/feats/' + $scope.data.Feats[i]).success(function(d){
          $scope.feats.push(d[0]);
      });
    };

    $scope.addFeat = function(feat) {
      $scope.data.Feats.push(parseInt(feat.id));
      $scope.feats.push(feat);
    };

    $scope.GetModifier = function(score) {
     
      return Math.floor((score-10)/2);
    };

    $scope.updateHP = function() {
      return $scope.data.totalHP - (parseInt($scope.data.lethalDamage) + parseInt($scope.data.nonlethalDamage));
    };

    $scope.calcHP = function() {
      return $scope.data.totalHP = $scope.data.baseHP + ($scope.data.abs.Constitution.getModifier() * $scope.data.LVL);
    };

    $scope.calcInit = function() {
      return $scope.data.abs.Dexterity.getModifier();
    };

    $scope.calcAC = function () {
      return $scope.data.BaseAC + $scope.data.NaturalArmor + $scope.data.abs.Dexterity.getModifier();
    };

  }).directive('statblock', [function () {
    return {
      restrict: 'A',
      transclude:true,
      template: "<div class='innerStat' ng-transclude></div>"
    };
  }]);
