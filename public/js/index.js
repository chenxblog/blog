var arrImg = ["images/index/11.png","images/index/22.png","images/index/33.png","images/index/44.png"];
var lunbo = document.getElementById("lunbo");
var banner = document.getElementById("news_right");
var imgWidth = 910; 
var str = "";
for(var i = 0;i < arrImg.length; i++){
			str += "<li><img src='" + arrImg[i] + "'></li>"

}

lunbo.innerHTML ="<li><img src='" + arrImg[arrImg.length - 1] + "'></li>" + str + "<li><img src='" + arrImg[0] + "'></li>";
lunbo.style.width = imgWidth * (arrImg.length + 2) + "px";
lunbo.style.left = -imgWidth + "px";
		
var palayer;
var anLeft ;
var falg = true;
function animation(animtn){

	anLeft = parseInt(lunbo.style.left)
	falg = false;
	palayer = setInterval(function(){
		lunbo.style.left = parseInt(lunbo.style.left) + animtn/5 + "px";

		if(parseInt(lunbo.style.left) - anLeft == animtn){
			clearInterval(palayer)
			falg = true;
		}
		if(parseInt(lunbo.style.left) <= -910 * (arrImg.length + 1)){
			lunbo.style.left = -imgWidth + "px";
		}
		if(parseInt(lunbo.style.left) >= 0){
			lunbo.style.left = -910 * (arrImg.length) + "px";
		}	
	},80)
			
			
}

var prev = document.getElementById("prev");
var next = document.getElementById("next");
 
prev.onclick = function(){
	if(falg == true){
		animation(-imgWidth)
	}
	else{

	}
			
}
next.onclick = function(){
	if(falg == true){
		animation(imgWidth)
	}
	else{

	}
}
var to 
function asd(){
	to = setInterval(function(){
		prev.onclick();
	},3000)
}
asd();
function asdsadf(){
	clearInterval(to)
}
banner.onmousemove = asdsadf;
banner.onmouseleave = asd;
