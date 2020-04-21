<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Approve Linking</title>


</head>
<body>
<div class="w3-row w3-border" id="userapprove">
  <div class="w3-half w3-container" id="userapprovetable_left">
    
  </div>
  <div class="w3-half w3-container" id="userapprovetable_right">
    
  </div>
</div>

<!-- Script for Sidebar, Tabs, Accordions, Progress bars and slideshows -->
<script language="javascript" src="js/userapprove.js"></script>
<script>
var tmpstr='';//'<div id="username">'+sessionStorage.getItem('username')+'</div>';
tmpstr=tmpstr+'<div id="iduser" style="display:none;">'+sessionStorage.getItem('iduser')+'</div>';
document.getElementById("divuser").innerHTML=tmpstr;
tmpstr='';
showtable();
</script>
</body>
</html>