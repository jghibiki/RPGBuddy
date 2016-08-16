'use strict';

var decksModule = angular.module('magicBuddy.decks.viewer', ['ui.router', angularDragula(angular)])


var inject = [
    "$stateParams",
    "$scope",
    "deckManager", 
    "cardManager", 
    "$mdDialog", 
    "$mdMedia", 
    "$sce", 
    "bsLoadingOverlayService",
    DeckViewerCtrl
]
decksModule.controller('DeckViewerCtrl',  inject);
function DeckViewerCtrl($stateParams, $scope, deckManager, cardManager, $mdDialog, $mdMedia, $sce, bsLoadingOverlayService) {
    var vm = this;
    
    // start loader
    bsLoadingOverlayService.start();
        
    vm.name="Viewer"
    vm.type = "deck";
    vm.deckManager = deckManager;
    vm.deckName = $stateParams.deckName;
    vm.showColorless = false;
    vm.startingHand = {
        deck: [],
        cardCount: 7,
        hand: [],
    };


    vm.loadDeck = function(){
        bsLoadingOverlayService.start();  
        vm.deckName = $stateParams.deckName;
		deckManager.get($stateParams.deckName).promise.finally(function(){
			bsLoadingOverlayService.stop();  
		});
    };


	vm.showCard = function(card, ev){
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
		$mdDialog.show({
		  controller: DialogController,
		  templateUrl: 'deck/card.tmpl.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  fullscreen: useFullScreen,
		  locals: {
			card: card
		  }
		})
		$scope.$watch(function() {
		  return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
		  vm.customFullscreen = (wantsFullScreen === true);
		});
	}    

	function DialogController(vm, $mdDialog, card) {
		vm.card = card
		vm.symbolRe = /[^{}]+(?=\})/g;
		vm.viewerMode = "both";

		vm.hide = function() {
		  $mdDialog.hide();
		};
		vm.cancel = function() {
		  $mdDialog.cancel();
		};
		vm.answer = function(answer) {
		  $mdDialog.hide(answer);
		};


		vm.manaSymbols = function(){
			var symbols = [];
			if(vm.card.type !== "Land" && vm.card.type !== "Scheme"){

			  vm.card.manaCost.match(vm.symbolRe).forEach(function(el){
				  symbols.push(el.toLowerCase());
			  });
			}

			return symbols
		}

		vm.getUnderName = function(){
			return encodeURI(vm.card.name
					.toLowerCase()
					.replace(/ /g, "_")
					.replace(/\'/g, "")
					.replace(/-/g, "_")
					.replace(/\?/g, "")
					.replace(/,/g, "")
					.replace(/:/g, "") + ".jpg");
		}

		vm.showImage = function(){
			return vm.viewerMode == "image";
		}

		vm.showText = function(){
			return vm.viewerMode == "text";
		}

		vm.showBoth = function(){
			return vm.viewerMode == "both";
		}

		vm.cardText = function(){
			var text = vm.card.text;
			text = text.replace(vm.symbolRe, function(x){
				return "<span class='mi mi-mana mi-" + x.toLowerCase() + "'></span>"
			});
			text = text.replace(/{/g, "").replace(/}/g, "");
			return $sce.trustAsHtml(text);
		}

	}

    /* Initialization */
    vm.loadDeck();

}
