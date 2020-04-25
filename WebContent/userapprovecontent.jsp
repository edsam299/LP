<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Approve Unit</title>
<link rel="stylesheet" href="bootstrap/crop/css/font-awesome.min.css">
<link rel="stylesheet" href="bootstrap/crop/css/bootstrap.min.css" id="bootstrap.min.css">
<link rel="stylesheet" href="bootstrap/crop/css/cropper.css">
<link rel="stylesheet" href="bootstrap/crop/css/main.css">
<style>
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
<div class="container" style="width:1700px;">
  <div class="row">
    <div class="col-lg-2" >
    	<button type="button" class="btn btn-info " id="btnUserapprovePredeunit">&nbsp;</button>
    	<button type="button" class="btn" id="btnpdfde">PDF(De)</button>
    </div>
    <div class="col-lg-4" style="padding-top: 5px;font-size: medium;">
    	<span style="background-color: #2196f3;">&nbsp;&nbsp;&nbsp;</span>
    	&nbsp;is line number (De Content) 
    	&nbsp;&nbsp;&nbsp;
    	<span style="background-color: green">&nbsp;&nbsp;&nbsp;</span>
    	&nbsp;is reference of ฉบับพิมพ์และฉบับพม่า
    </div>
    <div class="col-lg-2" align="right"  style="padding-top: 5px;font-size: medium;color: #3d8c8c;font-size: medium;
    color: #87a8b8;">
  		<b>Unit no:</b>&nbsp;
		<span class="glyphicon glyphicon-backward"></span>
		<span id="lblunit" class="label label-default">2</span>
		<span class="glyphicon glyphicon-forward"></span>	
    </div>
    <div class="col-lg-1"  style="padding-top: 5px;font-size: medium; color: #87a8b8;">
  		<b>Page:</b>&nbsp;
		<span class="glyphicon glyphicon-fast-backward"></span>
		<span id="lblunit" class="label label-default" style="background-color: #607D8B;">25</span>
		<span class="glyphicon glyphicon-fast-forward"></span>	
    </div>
    <div class="col-lg-3" >
    	<button type="button" class="btn" style="color: chocolate;" id="btnchange">Change</button>
    	<button type="button" class="btn" style="color: forestgreen;" id="btnsubmit">Submit</button>
    </div>
  </div>
</div>
<div class="w3-row w3-border" id="userapprovecontent" style="backgroundcolor:red;">
 
</div>
<div id="templatepopup_approveusercontent" class="modal">
	<div class="modal-content">
		<div ><div id="templatepopup_approveusercontent_header" ></div><span class="close">&times;</span></div>
    	<div id="templatepopup_approveusercontent_body"></div>
	</div>
</div>
<!-- Script for Sidebar, Tabs, Accordions, Progress bars and slideshows -->
<script language="javascript" src="js/userapprovecontent.js"></script>
<script>
var tmpstr='';//'<div id="username">'+sessionStorage.getItem('username')+'</div>';
tmpstr=tmpstr+'<div id="iduser" style="display:none;">'+sessionStorage.getItem('iduser')+'</div>';
document.getElementById("divuser").innerHTML=tmpstr;
tmpstr='';
show();
</script>
</body>
</html>