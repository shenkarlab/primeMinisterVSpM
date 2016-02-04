var PMApp = angular.module('PMvsPM',[]);
/*
	var model = {
		   user: "bibi",
		   PM:[{"PMname" :"בנימין נתניהו", "number": 8, "year": "2009-2015", "category1": 70, "category2": 10, "category3": 70, "category4": 90, "category5": 30, "category6": 70, "category7": 90, "id": 1},
		       {"PMname" :"רבין", "number": 3, "year": "1992-1996", "category1": 80, "category2": 30, "category3": 20, "category4": 60, "category5": 70, "category6": 30, "category7": 40, "id": 2}]
	};
*/
/* set up XMLHttpRequest */
var url = "data.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
var dataOfExcel;
var model={
	user:"bibi",
	PM:[]
};
	
oReq.onload = function(e) {


  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
 
var address_of_cell = 'A3';

/* Get worksheet */
var worksheet = workbook.Sheets[first_sheet_name];

/* Find desired cell */
var desired_cell = worksheet[address_of_cell];

/* Get the value */
//var desired_value = desired_cell.v;
dataOfExcel = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);

}

	oReq.send();





PMApp.controller('PMCtrl', function($scope, $http){
	/*$http.get("./sidebar.json").success(function (data) {
			model.items = JSON.stringify(data);
			model.items = JSON.parse(model.items);
	});*/

	setTimeout(function(){
		
		model.PM = dataOfExcel;
		$scope.PM = model;
		 console.log($scope.PM);

		 angular.forEach ($scope.PM, function(item){
       		//console.log(item);
		 });
	}, 100);

});
