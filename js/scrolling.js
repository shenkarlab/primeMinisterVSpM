$(document).ready(function() {
  

    $("div.x").on("click", function(){
        $(".myPickSection").css({'display':'none'});
         $(".x").css({'display':'none'});
         $(".cont").css({'display':'none'});
         $(".category-title").css({'display':'block'});
         $(".my-btn").css({'display':'block'});
          $(".category1").css({'display':'block'});
    });


 $("i.icon").on("click", function(){
	$("audio.got").each(function(){
		   if(this.paused == false){
				 this.pause(); // Stop playing
	   			 $("i.icon").removeClass("up");
	   			 $("i.icon").removeClass("icon");
	   			 $("i").addClass("off");
	   			 $("i").addClass("icon");
	   		}
	   		else{
	   			this.play();
	   			$("i.icon").removeClass("off");
	   			$("i.icon").removeClass("icon");
	   			$("i").addClass("up");
	   			$("i").addClass("icon");
	   		}
    });
 });
	
 $("div.graph1").on("click", function(){
    $("div.graph1").css({'display':'none'});
    $("div.graph2").css({'display':'none'});
     $("div.graph3").css({'display':'block'});
    $("div.graph4").css({'display':'block'});
    $("div.two-half").css({'backgroundImage':'url("./images/graph20.png")'});
 });

 $("div.graph2").on("click", function(){
    $("div.graph1").css({'display':'none'});
    $("div.graph2").css({'display':'none'});
     $("div.graph3").css({'display':'block'});
    $("div.graph4").css({'display':'block'});
    $("div.two-half").css({'backgroundImage':'url("./images/graph20.png")'});
 });

 $("div.graph3").on("click", function(){
    $("div.graph3").css({'display':'none'});
    $("div.graph4").css({'display':'none'});
     $("div.graph1").css({'display':'block'});
    $("div.graph2").css({'display':'block'});
    $("div.two-half").css({'backgroundImage':'none'});
 });

 $("div.graph4").on("click", function(){
    $("div.graph3").css({'display':'none'});
    $("div.graph4").css({'display':'none'});
     $("div.graph1").css({'display':'block'});
    $("div.graph2").css({'display':'block'});
    $("div.two-half").css({'backgroundImage':'none'});
 });


	//start page to start from the last to the first
	$(window).load(function() {
	 	$("div.ms-left").css({ 'marginTop': '-400vh'});
	    $("div.ms-right").css({ 'marginTop': '400vh'});
	    $("div.ms-left").animate({ 'marginTop': '0vh'}, 3000);
	    $("div.ms-right").animate({ 'marginTop': '0vh'}, 3000);
	});
	//////////////////////////////////////////////////////
	//var isHovered = $("div.ms-left").is(":hover"); // returns true or false
	
	

});