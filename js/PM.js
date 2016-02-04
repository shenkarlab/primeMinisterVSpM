var PMApp = angular.module('PMvsPM',[]);

var url = "data.xlsx";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";
var dataOfExcel;
var model={
	
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
	
	
	setTimeout(function(){
		$scope.PM = model;
	    $scope.presidents = model;
		model.PM = dataOfExcel;
		model.presidents = [];
		var prevPres = 0;
		var totalDiur = 0;
		var iteration = 0;
		var totalLiving = 0;
		var totalSalary = 0;
		var totalUnemp = 0;
		var totalGrowth = 0;
		var lastYear;
		var firstYear;
		var myFlag = 1;
		var myCounter = 0;
		 angular.forEach ($scope.PM, function(item,value){

			 angular.forEach (item, function(vals,i){
			 	var myLenght = item.length;
				//console.log(item[i]); //hold all values..
				prevPres = item[i].presidentsName;
				//model.presidents.push({name: vals.presidentsName});
				//console.log("previous: " + prevPres + "next: " + item[i+1].presidentsName);
				
				// initialize before array
				//console.log(totalDiur);
				if(myFlag == 1){
					firstYear =  item[i].year;
				}
				myCounter = parseInt(myCounter) + 1;
				totalDiur = parseInt(totalDiur) + parseInt(item[i].priceHousing); 
				totalLiving = totalLiving + item[i].costOfLiving;
				totalSalary = totalSalary + item[i].salary;
				totalUnemp = totalUnemp + item[i].Unemployment;
				totalGrowth = totalGrowth + item[i].Growth;
				
				iteration = iteration + 1;
				// initialize before array
				myFlag = parseInt(myFlag) + 1;
				
				if(i < myLenght - 1){
					if (prevPres != item[i+1].presidentsName) { // if different, push into array
						totalDiurSum = parseInt(totalDiur) / parseInt(iteration);
						totalLivingSum = parseInt(totalLiving) / parseInt(iteration);
						totalSalarySum = parseInt(totalSalary) / parseInt(iteration);
						totalUnempSum = parseInt(totalUnemp) / parseInt(iteration);
						totalGrowthSum = parseInt(totalGrowth) / parseInt(iteration);
						lastYear = item[i].year;
						model.presidents.push({name: item[i].presidentsName, totalDiur : totalDiurSum, totalLiving : totalLivingSum, totalSalary : totalSalarySum, totalUnemp : totalUnempSum, totalGrowth : totalGrowthSum, lastYear: lastYear, firstYear: firstYear, myCounter: myCounter});
								totalDiur = 0;
								iteration = 0;
								totalLiving = 0;
								totalSalary = 0;
								totalUnemp = 0;
								totalGrowth = 0;
								myFlag = 1;
								myCounter = 0;
						console.log(model);
						
					}
				}
				else{
					totalDiurSum = parseInt(totalDiur) / parseInt(iteration);
						totalLivingSum = parseInt(totalLiving) / parseInt(iteration);
						totalSalarySum = parseInt(totalSalary) / parseInt(iteration);
						totalUnempSum = parseInt(totalUnemp) / parseInt(iteration);
						totalGrowthSum = parseInt(totalGrowth) / parseInt(iteration);
						lastYear = item[i].year;
						model.presidents.push({name: item[i].presidentsName, totalDiur : totalDiurSum, totalLiving : totalLivingSum, totalSalary : totalSalarySum, totalUnemp : totalUnempSum, totalGrowth : totalGrowthSum, lastYear: lastYear, firstYear: firstYear, myCounter: myCounter});
				}
				 
			 });
		 });
         model.curr = model.presidents[0];
         model.curr2 = model.presidents[1];
         model.firstYear = model.presidents[0].firstYear;
	     model.lastYear = model.presidents[0].lastYear;
		 model.number = 25;
		 model.firstYear = model.presidents[5].firstYear;
		 model.lastYear = model.presidents[5].lastYear;
		 model.number2 = 34;
		 $("div.title1")[0].click();
		 $("div.x")[0].click();
	}, 1000);

	var key;
    var height = $(window).height();
    var flag = 1;
    var flag2 = 1;
		$(window).keydown(function(e) {
			
		      key = e.which;
		   //  console.log(x + " OFFSET " + halfPage + " halfPage");
		    
		     var isHovered = $("div.ms-left").is(":hover"); // returns true or false
		     if (isHovered == true) myFunction();
		     else myFunction2();
	         console.log(isHovered);
		});

		var myFunction =  function(){
			
		   
			      var myHeight = $("div.ms-left").css('marginTop');
			      myHeight = parseInt(myHeight);
			      if(myHeight%height != 0){
			      	
			      }
			      else{
					      $("div.category-title").css({ 'display': 'none'});
					      $("div.category1").css({ 'display': 'none'});
					     
					      var frames = $(window).height() * 4;
					      
					      console.log(key + "key");
					      if(key==40){
					      	var result = myHeight - $(window).height();
					      	if( result >= parseInt(-frames) ){
					      	    flag = flag + 1;
					      	    if(flag == 1) {
					      	    	model.curr = model.presidents[0];
					      	    	model.firstYear = model.presidents[0].firstYear;
					      	    	model.lastYear = model.presidents[0].lastYear;
					      	    	model.number = 25;
					      	    	
					      	    	//console.log(model);
					      	    }
					      	    if(flag == 2) {
					      	    	model.curr = model.presidents[3];
					      	    	model.firstYear = model.presidents[3].firstYear;
					      	    	model.lastYear = model.presidents[3].lastYear;
					      	    	model.number = 30;
					      	    }
					      	    if(flag == 3) {
					      	    	model.curr = model.presidents[4];
					      	    	model.firstYear = model.presidents[4].firstYear;
					      	    	model.lastYear = model.presidents[4].lastYear;
					      	    	model.number = 31;
					      	    }
					      	    if(flag == 4) {
					      	    	model.curr = model.presidents[5];
					      	    	model.firstYear = model.presidents[5].firstYear;
					      	    	model.lastYear = model.presidents[5].lastYear;
					      	    	model.number = 34;
					      	    }
					      	    console.log(flag);
					      		myHeight = myHeight - $(window).height();
					      		$("div.ms-left").animate({ 'marginTop': myHeight + "px"}, 300);
					        }
					      }
					      if (key==38) {
					      	var result = myHeight + $(window).height();
					      	if( result <= (0) ){
					      		 flag = flag - 1;
					      		 if(flag == 1) {
					      	    	model.curr = model.presidents[0];
					      	    	model.firstYear = model.presidents[0].firstYear;
					      	    	model.lastYear = model.presidents[0].lastYear;
					      	    	model.number = 25;
					      	    	//console.log(model);
					      	    }
					      	    if(flag == 2) {
					      	    	model.curr = model.presidents[3];
					      	    	model.firstYear = model.presidents[3].firstYear;
					      	    	model.lastYear = model.presidents[3].lastYear;
					      	    	model.number = 30;
					      	    }
					      	    if(flag == 3) {
					      	    	model.curr = model.presidents[4];
					      	    	model.firstYear = model.presidents[4].firstYear;
					      	    	model.lastYear = model.presidents[4].lastYear;
					      	    	model.number = 31;
					      	    }
					      	    if(flag == 4) {
					      	    	model.curr = model.presidents[5];
					      	    	model.firstYear = model.presidents[5].firstYear;
					      	    	model.lastYear = model.presidents[5].lastYear;
					      	    	model.number = 34;
					      	    }
					      		 console.log(flag);
					      		myHeight = myHeight + $(window).height();
					      		$("div.ms-left").animate({ 'marginTop': myHeight + "px"}, 300);
					        }
					      }
		               $("div.category-title").fadeIn(800);
		               $("div.category1").fadeIn(800);
		                $("div.title1")[0].click();
		                $("div.x")[0].click();
		          }
         }

         var myFunction2 =  function(){
			
		    
			      var myHeight = $("div.ms-right").css('marginTop');
			       myHeight = parseInt(myHeight);
			      if(myHeight%height != 0){
			      }
			      else{			      
					     
					     $("div.category-title").css({ 'display': 'none'});
					     $("div.category1").css({ 'display': 'none'});
					     
					      var frames = $(window).height() * 4;
					      
					      console.log(key + "key2");
					      if(key==40){
					      	var result = myHeight - $(window).height();
					      	if( result >= (0) ){
					      	    flag2 = flag2 - 1;
					      	    if(flag2 == 1) {
					      	    	model.curr2 = model.presidents[5];
					      	    	model.firstYear = model.presidents[5].firstYear;
					      	    	model.lastYear = model.presidents[5].lastYear;
					      	    	model.number2 = 34;
					      	    	//console.log(model);
					      	    }
					      	    if(flag2 == 2) {
					      	    	model.curr2 = model.presidents[4];
					      	    	model.firstYear = model.presidents[4].firstYear;
					      	    	model.lastYear = model.presidents[4].lastYear;
					      	    	model.number2 = 31;
					      	    }
					      	    if(flag2 == 3) {
					      	    	model.curr2 = model.presidents[3];
					      	    	model.firstYear = model.presidents[3].firstYear;
					      	    	model.lastYear = model.presidents[3].lastYear;
					      	    	model.number2 = 30;
					      	    }
					      	    if(flag2 == 4) {
					      	    	model.curr2 = model.presidents[0];
					      	    	model.firstYear = model.presidents[0].firstYear;
					      	    	model.lastYear = model.presidents[0].lastYear;
					      	    	model.number2 = 25;
					      	    }
					      		myHeight = myHeight - $(window).height();
					      		$("div.ms-right").animate({ 'marginTop': myHeight + "px"}, 300);
					        }
					      }
					      if (key==38) {
					      	var result = myHeight + $(window).height();
					      	if( result <= frames ){
					      		 flag2 = flag2 + 1;
					      		 if(flag2 == 1) {
					      	    	model.curr2 = model.presidents[5];
					      	    	model.firstYear = model.presidents[5].firstYear;
					      	    	model.lastYear = model.presidents[5].lastYear;
					      	    	model.number2 = 34;
					      	    	//console.log(model);
					      	    }
					      	    if(flag2 == 2) {
					      	    	model.curr2 = model.presidents[4];
					      	    	model.firstYear = model.presidents[4].firstYear;
					      	    	model.lastYear = model.presidents[4].lastYear;
					      	    	model.number2 = 31;
					      	    }
					      	    if(flag2 == 3) {
					      	    	model.curr2 = model.presidents[3];
					      	    	model.firstYear = model.presidents[3].firstYear;
					      	    	model.lastYear = model.presidents[3].lastYear;
					      	    	model.number2 = 30;
					      	    }
					      	    if(flag2 == 4) {
					      	    	model.curr2 = model.presidents[0];
					      	    	model.firstYear = model.presidents[0].firstYear;
					      	    	model.lastYear = model.presidents[0].lastYear;
					      	    	model.number2 = 25;
					      	    }
					      		myHeight = myHeight + $(window).height();
					      		$("div.ms-right").animate({ 'marginTop': myHeight + "px"}, 300);
					        }
					      }
					       $("div.category-title").fadeIn(800);
					       $("div.category1").fadeIn(800);
					       $("div.title1")[0].click();
		                   $("div.x")[0].click();
			      }
		   
		  
         }
	
         

	



		$scope.getImageName = function() {
			//var test = $($event.currentTarget).css('backgroundImage').replace(/^url|[\(\)]/g, '');
			//var you = test.split("/");
			//alert( you[6].split(".")[0]);
			console.log("hhhhhhhhhhhhhhhhhh");
		}
		
		
	$scope.getData = function() {
			angular.forEach ($scope.presidents, function(item){
			    
				return item[0].name;
		    });	
	}

	$scope.myPick = function($event) {
		$($event.currentTarget).css({'backgroundColor':'#fae819'});	
         

			//angular.forEach ($scope.presidents, function(item){
			    
			//	return item[0].name;
		    //});	
	}

	$scope.myCategory = function($event) {
		
         $scope.pick = model;
         model.pick = [];
         $scope.num1 = model;
         model.num1 = [];
         $scope.num2 = model;
         model.num2 = [];
           $(".myPickSection").css({'display':'block'});
           $(".x").css({'display':'block'});
           $(".cont").css({'display':'block'});
           $(".category-title").css({'display':'none'});
           $(".my-btn").css({'display':'none'});
           $(".category1").css({'display':'none'});
           var myContent = $($event.currentTarget).hasClass("title1");
           //$scope.myTitle = myContent;
           if(myContent == true){
           		model.pick = "צמיחה";
           		model.desc = "זהו המדד הכלכלי החשוב ביותר לממשלה שמתאר בכמה גדלה או התכווצה הפעילות הכלכלית במשק לעומת השנה הקודמת";
                model.num1 = parseInt((model.curr.totalGrowth / 1002449.875) * 100000);
                model.num2 = parseInt((model.curr2.totalGrowth / 1002449.875) * 100000);
               // console.log();
           }

           var myContent = $($event.currentTarget).hasClass("title2");
           //$scope.myTitle = myContent;
           if(myContent == true){
           	 model.pick = "אבטלה";
           	 model.desc = "אחד המדדים התעסוקתיים החשובים ביותר שבודק כמה אנשים לא הצליחו למצוא עבודה למרות שחיפשו";
           	  model.num1 = parseInt((model.curr.totalUnemp)*10);
              model.num2 = parseInt((model.curr2.totalUnemp)*10);
           }

           var myContent = $($event.currentTarget).hasClass("title3");
           //$scope.myTitle = myContent;
           if(myContent == true){
           	  model.pick = "יוקר המחיה";
           	  model.desc = "מדד המחירים לצרכן, שבודק בכמה התייקר/הוזל סל מוצרים של משפחה ממוצעת. הממשלה מכוונת לעלייה של 2% - גידול בריא בפעילות הכלכלית ";
           	  model.num1 = parseInt((model.curr.totalLiving / 105.4) * 100);
              model.num2 = parseInt((model.curr2.totalLiving / 105.4) * 100);
           }

           var myContent = $($event.currentTarget).hasClass("title4");
           //$scope.myTitle = myContent;
           if(myContent == true){
           	    model.pick = "שכר ריאלי";
           	    model.desc = "השכר הממוצע הריאלי הוא מדד שבודק מה קרה בשנה החולפת לשכר הממוצע של כל העובדים השכירים במשק, בקיזוז השינוי ביוקר המחיה";
           	    model.num1 = parseInt((model.curr.totalSalary / 34010140.3904886) * 100000000);
              model.num2 = parseInt((model.curr2.totalSalary / 34010140.3904886) * 100000000);
           }

           var myContent = $($event.currentTarget).hasClass("title5");
           //$scope.myTitle = myContent;
           if(myContent == true){
           	 
           	    model.pick = "מחירי דיור";
           	    model.desc = "מדד שבודק מה קרה בשנה החולפת למחירה של דירה ממוצעת (בגודל ממוצע, בכל היישובים בישראל, ישנות וחדשות כאחד)";
           	     model.num1 = parseInt((model.curr.totalDiur / 352.5) * 100);
              model.num2 = parseInt((model.curr2.totalDiur / 352.5) * 100);
           }
			//angular.forEach ($scope.presidents, function(item){
			    
			//	return item[0].name;
		    //});	
          console.log();
	}

	$scope.my = function() {
		
	}
	
	
	
});
