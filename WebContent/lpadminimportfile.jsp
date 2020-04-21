<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Linking Project</title>
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
<div class="w3-row w3-border" id="linkadminsuttatable">
  <div class="w3-half w3-container" id="linkadminsuttatable_left">
    
  </div>
  <div class="w3-half w3-container" id="linkadminsuttatable_right">
    
  </div>
</div>
<div id="templatepopup_importfile" class="modal">
	<div class="modal-content">
    <div ><div id="templatedocid_importfile" ></div><span class="close">&times;</span></div>
    <div id="templatebody_importfile"></div>
    <div align="right">
    			<label id="templatemessage"></label>&nbsp;&nbsp;&nbsp;
    			<input type=button id="templateokbutton_importfile" style="background-color:#8c0517;color:white;" value=""/>
    			<input type=button id="templatecancelbutton_importfile" value="Cancel"/>
    </div>
  </div>
</div>
<!-- Script for Sidebar, Tabs, Accordions, Progress bars and slideshows -->
<script language="javascript" src="js/lpmenu.js"></script>
<script>
var tmpstr='';//'<div id="username">'+sessionStorage.getItem('username')+'</div>';
tmpstr=tmpstr+'<div id="iduser" style="display:none;">'+sessionStorage.getItem('iduser')+'</div>';
document.getElementById("divuser").innerHTML=tmpstr;
tmpstr='';
showsuttatable_linkadmin();
</script>
</body>
</html>