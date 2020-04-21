<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Linking Project</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="css/layout/w3.css" rel="stylesheet">
<link href="css/layout/w3-theme-teal.css" rel="stylesheet">
<link href="css/fonts/font-awesome.min.css" rel="stylesheet">
<link href="css/treeview.css" rel="stylesheet">
</head>
<!-- Side Navigation -->
<nav class="w3-sidebar w3-bar-block w3-card w3-animate-left w3-center" style="display:none" id="mySidebar">
	<table width=100%>
		<tr>
			<td width=10% align="left"><h1 class="w3-xxxlarge w3-text-theme">Menu</h1></td>
			<td><button style="text-align:right;" class="w3-bar-item w3-button" onclick="w3_close()"><i class="fa fa-remove"></i></button></td>
		</tr>
	</table>
	<table width=100%>
		<tr>
			<td width=30%  style="font-size:20px;background-color:#607d8b;color:white;">
				<label  onclick="clkLinkAdminImportFileMenu(2);">Linking Admin </label>
			</td>
			<td width=70%><div id="detailmenu_importfile" align="left" style="color:#105313;"></div></td>
		</tr>
		<tr>
			<td width=30%  style="font-size:20px;background-color:#607d8b;color:white;">
				<label onclick="clkLinkAdminImportFileMenu(3);" >Approve Content</label>
			</td>
			<td width=70%><div id="detailmenu_checkcontent" style="text-align: left;"></div></td>
		</tr>
	</table>
</nav>

<!-- Header -->
<header class="w3-container w3-theme w3-padding" id="myHeader">
  	<table width=100%>
  	<tr>
  		<td width=5%><i onclick="w3_open()" class="fa fa-bars w3-xlarge w3-button w3-theme"></i> </td>
  		<td width=70% id="showheading"><h5><b>Linking Project</b></h5></td>
  		<td width=20%  align="left" id="divuser" style="font-size:18px;"></td>
  		<td width=0% ><div id="seriesdiv" style="display:none;"></div>
		<div id="basetextdiv" style="display:none;"></div>
		<div id="suttadiv" style="display:none;"></div></td>
  	</tr>
  	</table>
</header>
<body>
</body>
<script language="javascript" src="js/commonukit.js"></script>
<script>
var tmpstr='';
if(location.pathname.includes("index.jsp")){
	var urlParams = new URLSearchParams(location.search);
	//tmpstr='<div id="username"><h4><b>'+urlParams.get('username')+'</b></h4></div>';
	tmpstr=tmpstr+'<div id="iduser" style="display:none;">'+urlParams.get('iduser')+'</div>';
	//sessionStorage.setItem('username',urlParams.get('username'));
	sessionStorage.setItem('iduser',urlParams.get('iduser'));
	urlParams=null;
}else{
	//tmpstr='<div id="username"><h4><b>'+sessionStorage.getItem("username")+'</b></h4></div>';
	tmpstr=tmpstr+'<div id="iduser" style="display:none;">'+sessionStorage.getItem("iduser")+'</div>';
}
document.getElementById("divuser").innerHTML=tmpstr;
console.log(sessionStorage);
function w3_open() {
  var x = document.getElementById("mySidebar");
  x.style.width = "100%";
  x.style.fontSize = "40px";
  x.style.paddingTop = "10%";
  x.style.display = "block";
}
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("detailmenu_importfile").innerHTML='';
}
function clkLinkAdminImportFileMenu(level){
	if(document.getElementById("bootstrap.min.css")!=null){
		document.getElementById("bootstrap.min.css").disabled = true;
	}
	
	document.getElementById("detailmenu_importfile").innerHTML='';
	document.getElementById("detailmenu_checkcontent").innerHTML='';
	var url=linkprojecthostname+"/getmenu/"+level;
	var method='GET';
	var async=false;
	var contentType='application/json';
	getData(url, method, async, contentType,'', function(jsondata){
		var tmpstr='<ul id="myUL">';
		if(jsondata!=null){
			var seriesarr = jsondata.series;
			var basetextarr = jsondata.basetext;
			var suttaarr = jsondata.sutta;
			 for(var i=0;i<seriesarr.length;i++){
			 	tmpstr = tmpstr+'<li><span class="caret" fcrid="'+seriesarr[i].fcrid.trim()+'">'+seriesarr[i].fcname.trim()+'</span>';
			 	var seriesfcrid= seriesarr[i].fcrid.trim();
			 	var flag=''; var flagbt = '';
			 	for(var j=0;j<basetextarr.length;j++){
			 		if(basetextarr[j].fch1.trim()==seriesfcrid){
			 			flagbt='';
			 			if(flag==''){
			 				flag='set';
			 				tmpstr=tmpstr+'<ul class="nested">';
			 			}
			 			if(level==2){
			 				tmpstr=tmpstr+'<li sname="'+seriesarr[i].fcname.trim()+'" sfcrid="'+seriesfcrid+'"  bfcrid="'+basetextarr[j].fcrid.trim()+'" btname="'+basetextarr[j].fcname.trim()+'" onclick="gotoLinkingAdmin(this);">'+basetextarr[j].fcname.trim()+'</li>';	
			 			}else{
			 				var hassutta=0;
			 				for(var k=0;k<suttaarr.length;k++){
			 					if(suttaarr[k].fch2.trim()==basetextarr[j].fcrid.trim()){
			 						hassutta=hassutta+1;
			 						break;
			 					}
			 				}
			 				if(hassutta==0){
			 					tmpstr=tmpstr+'<li sname="'+seriesarr[i].fcname.trim()+'" sfcrid="'+seriesfcrid+'"  bfcrid="'+basetextarr[j].fcrid.trim()+'" btname="'+basetextarr[j].fcname.trim()+'" >'+basetextarr[j].fcname.trim();	
			 				}else{
			 					tmpstr=tmpstr+'<li><span class="caret" sname="'+seriesarr[i].fcname.trim()+'" sfcrid="'+seriesfcrid+'"  bfcrid="'+basetextarr[j].fcrid.trim()+'" btname="'+basetextarr[j].fcname.trim()+'" >'+basetextarr[j].fcname.trim()+'</span>';	
			 				}
			 				for(var k=0;k<suttaarr.length;k++){
				 				if(suttaarr[k].fch2.trim()==basetextarr[j].fcrid.trim()){
				 					if(flagbt==''){
						 				flagbt='set';
						 				tmpstr=tmpstr+'<ul class="nested">';
						 			}
				 					tmpstr=tmpstr+'<li sname="'+seriesarr[i].fcname.trim()+'" sfcrid="'+seriesfcrid+'"  bfcrid="'+basetextarr[j].fcrid.trim()+'" btname="'+basetextarr[j].fcname.trim()+
				 					'" suttafcrid="'+suttaarr[k].fcrid.trim()+'" suttaname="'+suttaarr[k].fcname.trim()+
				 					'" onclick="gotoApproveContent(this);">'+suttaarr[k].fcname.trim()+'</li>';	
				 				}
				 			}	
			 				tmpstr=tmpstr+'</ul>'+'</li>';
			 			}
			 			
			 		}
			 	}
			 	//basetext
			 	if(flag=='set'){
			 		tmpstr=tmpstr+'</ul>';
			 	}
			 	
			 	tmpstr=tmpstr+'</li>';//series
			 }
			tmpstr=tmpstr+"</ul>";
			console.log(tmpstr);
			if(level==2){
				document.getElementById("detailmenu_importfile").innerHTML=tmpstr;
			}else{
				document.getElementById("detailmenu_checkcontent").innerHTML=tmpstr;
			}
			
			tmpstr='';
			settree();
		}
	});
}
function settree(){
	var toggler = document.getElementsByClassName("caret");
	var i;

	for (i = 0; i < toggler.length; i++) {
	  toggler[i].addEventListener("click", function() {
	    this.parentElement.querySelector(".nested").classList.toggle("active");
	    this.classList.toggle("caret-down");
	  });
	}
}
function gotoLinkingAdmin(ele){
	var idseries = ele.getAttribute("sfcrid");
	var sname = ele.getAttribute("sname");
	var idbasetext=ele.getAttribute("bfcrid");
	var btname=ele.getAttribute("btname");
	document.getElementById("seriesdiv").innerHTML=idseries;
	document.getElementById("basetextdiv").innerHTML=idbasetext;
	window.location.href='lpadminimportfile.jsp?idseries='+idseries+'&idbasetext='+idbasetext+
	'&sname='+sname+'&btname='+btname;
}
function gotoApproveContent(ele){
	var idseries = ele.getAttribute("sfcrid");
	var sname = ele.getAttribute("sname");
	var idbasetext=ele.getAttribute("bfcrid");
	var btname=ele.getAttribute("btname");
	var idsutta=ele.getAttribute("suttafcrid");
	var suttaname=ele.getAttribute("suttaname");
	document.getElementById("seriesdiv").innerHTML=idseries;
	document.getElementById("basetextdiv").innerHTML=idbasetext;
	window.location.href='userapprovetable.jsp?idseries='+idseries+'&idbasetext='+idbasetext+
	'&sname='+sname+'&btname='+btname+'&idsutta='+idsutta+'&suttaname='+suttaname;
}
</script>
</html>