<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Linking Project(Compare PDF VS EPUB)</title>
<link rel="stylesheet" href="bootstrap/crop/css/font-awesome.min.css">
<link rel="stylesheet" href="bootstrap/crop/css/bootstrap.min.css" id="bootstrap.min.css">
<link rel="stylesheet" href="bootstrap/crop/css/cropper.css">
<link rel="stylesheet" href="bootstrap/crop/css/main.css">


<style>
.img-container {
	min-height: 800px;
	max-height:1000px;
	margin-bottom: 20px;
}    
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
</head>
<body>
<button title="Move" id="move" type="button" class="btn btn-primary" style="display:none"><span class="fa fa-arrows"></span></button>


<div class="w3-row w3-border" id="approvedataforadmin">
  <div style="font-size:20px;" >
  	<table width=100% >
  		<tr>
  			<td width=10% style="color: whitesmoke;background-color:#3b5998;">All&nbsp;&nbsp;<label id="divallpage"></label>&nbsp;&nbsp;Pages</td>
  			<td width=20% style="color: white;background-color:#8b9dc3;">Page of Content:&nbsp;&nbsp;<label id="divpagecontent">55</label></td>
  			<td width=20% style="background-color:#D7D7D7;">Page of Note/Appendix:&nbsp;&nbsp;<label id="divpagenote">55</label></td>
  			<td width=20% style="background-color:#B4B4B4;">Completed:&nbsp;&nbsp;<label id="divcompletedpage">55</label>&nbsp;Pages</td>
  			<td width=20% style="color: whitesmoke;background-color:#6A3805;">Incompleted:&nbsp;&nbsp;<label id="divincompletedpage">55</label>&nbsp;Pages</td>
  			<td id="submitbutton" width=10% style="background-color:#299086;border: none;color: white;text-align: center;text-decoration: none;margin: 4px 2px;cursor: pointer;">Submit</td>
  		</tr>
  	</table>
  </div>
  <div class="w3-half w3-container" id="pdfdiv"></div>
  <div class="w3-half w3-container" style="font-size:66px;">
    <iframe  id="epubdiv" frameborder="0" height="800px"  width=100%; ></iframe>
  </div>
</div>
<!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  
  <div class="modal-content">
    <div style="background-color:green;"><div id="docid" style="display:none;"></div><span class="close">&times;</span></div>
    <div id="popbody"></div>
    <div align="right">
    	<input type=button id="saveall" style="background-color: #31b0d5;color:white;" value="   Save All    "/>
    	<input type=button id="cancelpopup" value="Cancel"/>
    </div>
  </div>
</div>
<div id="templatepopup" class="modal">
	<div class="modal-content">
    <div style="background-color:green;"><div id="templatedocid" style="display:none;"></div><span class="close">&times;</span></div>
    <div id="templatebody"></div>
    <div align="right">
    	<input type=button id="templateokbutton" style="background-color: #31b0d5;color:white;" value=""/>
    	<input type=button id="templatecancelbutton" value="Cancel"/>
    </div>
  </div>
</div>
<script src="bootstrap/crop/js/jquery.min.js"></script>
<script src="bootstrap/crop/js/bootstrap.min.js"></script>
<script src="bootstrap/crop/js/cropper.js"></script>
<script language="javascript" src="js/pdfepub.js"></script>
<script>
var tmpstr='';//'<div id="username">'+sessionStorage.getItem('username')+'</div>';
tmpstr=tmpstr+'<div id="iduser" style="display:none;">'+sessionStorage.getItem('iduser')+'</div>';
document.getElementById("divuser").innerHTML=tmpstr;
tmpstr='';
setdivpdfepub();
</script>
</body>
</html>