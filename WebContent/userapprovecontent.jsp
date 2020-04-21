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

</head>
<body>
<div class="container" style="width:1700px;">
  <div class="row">
    <div class="col-lg-3" >
    	<button type="button" class="btn btn-info " id="btnpredeunit">Pre De Unit : 2-5</button>
    	<button type="button" class="btn" id="btnpdfde">PDF(De)</button>
    </div>
    <div class="col-lg-4" valign=center>
    	<button type="button" class="btn btn-default" style="background-color: #2196f3;">&nbsp;&nbsp;</button>
    	&nbsp;is line number (De Content) 
    	&nbsp;&nbsp;&nbsp;
    	<button type="button" class="btn btn-default" style="background-color: green;">&nbsp;&nbsp;</button>
    	&nbsp;is reference of ฉบับพิมพ์และฉบับพม่า
    </div>
    <div class="col-lg-5" valign=center>
    	<span><b>Unit no:</b>&nbsp;</span> 
    	<span class="glyphicon glyphicon-backward"></span>
    	<span id="lblunit" class="label label-default">2</span>
    	<span class="glyphicon glyphicon-forward"></span>
    </div>
  </div>
</div>
<div class="w3-row w3-border" id="userapprovecontent" style="backgroundcolor:red;">
 
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