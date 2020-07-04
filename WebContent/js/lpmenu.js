function showsuttatable_linkadmin(){
	var urlParams = new URLSearchParams(location.search);
	var idseries=urlParams.get('idseries');
	var idbasetext=urlParams.get('idbasetext');
	var sname =urlParams.get('sname'); 
	var btname =urlParams.get('btname');
	document.getElementById("showheading").innerHTML = '<h5><b>'+sname+"&gt;"+btname+"</b></h5>";
	console.log(idseries+" | "+idbasetext);
	let url=linkprojectapi+"/ImportFile/getSutta/"+idbasetext;
	let method='GET';
	let async=false;
	let contentType='application/json';
	//alert(url);
	getData(url, method, async, contentType,'', function(jsondata){
		var tmpstr="";
		if(jsondata["value"]){
			tmpstr='<table class="w3-table w3-striped w3-bordered">';
			tmpstr=tmpstr+'<thead><tr class="w3-theme"><th>Pre-De Sutta</th><th>Status</th></tr></thead>';
			for(var i=0;i < jsondata["data"]["elements"].length;i++){
				tmpstr=tmpstr+'<tr id="'+jsondata["data"]["elements"][i].fcrid.trim()+'" onclick="checkSuttaStatus(this);">';
				tmpstr=tmpstr+'<td>'+jsondata["data"]["elements"][i].fcname.trim()+'</td><td align="center">'+jsondata["data"]["elements"][i].status+'</td>';
				tmpstr=tmpstr+'<td style="display:none;">'+idseries+'</td>';
				tmpstr=tmpstr+'<td style="display:none;">'+sname+'</td>';
				tmpstr=tmpstr+'<td style="display:none;">'+idbasetext+'</td>';
				tmpstr=tmpstr+'<td style="display:none;">'+btname+'</td>';
				tmpstr=tmpstr+'</tr>';
			}
			tmpstr=tmpstr+'</table>';
		}else{
			tmpstr ="<label style='color:red;'>Cannot find in this basetext!</label>";
		}
		console.log(tmpstr);
		document.getElementById("linkadminsuttatable_left").innerHTML=tmpstr;
		w3_close();
	});
}
function cleardiv(){
	document.getElementById("linkadminsuttatable_left").innerHTML='';
	document.getElementById("linkadminsuttatable_right").innerHTML='';
}
function checkSuttaStatus(ele){
	var idrow = ele.id;
	var fcname = ele.cells[0].innerHTML;
	var status = ele.cells[1].innerHTML;
	var idseries = ele.cells[2].innerHTML;
	var sname = ele.cells[3].innerHTML;
	var idbasetext = ele.cells[4].innerHTML;
	var bname = ele.cells[5].innerHTML;
	console.log(idrow +" | "+fcname+" | "+status);
	var tmpstr='';
	if (status=="Editing"){
		var v ='Every unit of this sutta is not edited, so you cannont import file!';
		tmpstr='<label style="color:red;">'+v+'</label>';
	}else if(status=='Edited'){	//|| status=='Linking' || status=='Linked'
		getImportFileUI(fcname,idrow,status,function(tmpstrui){
			tmpstr = tmpstrui;
		});
	}else if(status=='Linking'){// || status=='Linked'){
		window.location.href='comparePdfEpub.jsp?idseries='+idseries+'&idbasetext='+idbasetext+
		'&sname='+sname+'&btname='+bname+'&idsutta='+idrow+'&suttaname='+fcname;	
	}else if(status=='Linked'){
		tmpstr ="<table>"+
		"<tr><td><b>De Unit</b></td><td><b>Description</b></td><td><b>Header</b></td></tr>"+
		"</table>";
		tmpstr = tmpstr+'<label style="color:blue;">Appendix File</label><br>';
		tmpstr = tmpstr+'<button style="background-color:#a30e0edb;color:white;" onclick="confirmLinkAgain(\''+
		idseries+'\',\''+idbasetext+'\',\''+idrow+'\',\''+sname+'\',\''+bname+'\',\''+fcname+'\');">Link Again</button><br>';
		getImportFileUI(fcname,idrow,status,function(tmpstrui){
			tmpstr =tmpstr+ ' <div style="background-color:#8080804f;"><b>Add Appendix/Note</b></div> '+
			tmpstrui+'</div>';
		});
	}else if(status=='Publish'){
		
//		tmpstr='<iframe name="hiddenFrame" width="0" height="0" border="0" style="display: none;"></iframe>'+
//		'<form  id="formimportfile" target="hiddenFrame" action="FileUploadServlet" method="post" enctype="multipart/form-data">'+
//		'<fieldset>'+
//			'<table>'+
//				'<tr><td colspan=2><h3>'+fcname+'</h3></td></tr>'+
//				'<tr>'+
//					'<td><b>Select File to Upload PDF:</b><input id="pdffile" type="file" class="btn btn-default btn-choose" accept=".pdf"  name="fileName"></td>'+
//					'<td><b>Select File to Upload EPUB:</b><input id="idmlfile" type="file" class="btn btn-default btn-choose" accept=".epub" name="fileName"></td>'+
//				'</tr>'+
//				'<tr>'+
//					'<td><b>Start Page:</b><br><input id="startpage" type="text"></td>'+
//					'<td><b>End Page:</b><br><input id="endpage" type="text"></td>'+
//				'</tr>'+
//				'<tr>'+								
//					'<td colspan="2" align="right">'+
//						'<input id="btnsubmit" type="button" onclick="clkImportFile(this.form,'+idrow+',\''+status+'\');"  value="Import" class="btn btn-primary pull-right">'+
//					'</td>'+
//				'</tr>'+
//			'</table>'+
//		'</fieldset>'+
//		'</form>'+
//		'<div id="idwarningimportfile" style="color:red;"></div>';
	}

	
	document.getElementById("linkadminsuttatable_right").innerHTML=tmpstr;
	tmpstr='';
}
function getImportFileUI(fcname,idrow,status,cb){
	var tmpui='<iframe name="hiddenFrame" width="0" height="0" border="0" style="display: none;"></iframe>'+
	'<form  id="formimportfile" target="hiddenFrame" action="FileUploadServlet" method="post" enctype="multipart/form-data">'+
	'<fieldset>'+
		'<table>'+
			'<tr><td colspan=2><h3>'+fcname+'</h3></td></tr>'+
			'<tr>'+
				'<td><b>Select File to Upload PDF:</b><input id="pdffile" type="file" class="btn btn-default btn-choose" accept=".pdf"  name="fileName"></td>'+
				'<td><b>Select File to Upload EPUB:</b><input id="idmlfile" type="file" class="btn btn-default btn-choose" accept=".epub" name="fileName"></td>'+
			'</tr>'+
			'<tr>'+
				'<td><b>Start Page:</b><br><input id="startpage" type="text"></td>'+
				'<td><b>End Page:</b><br><input id="endpage" type="text"></td>'+
			'</tr>'+
			'<tr>'+								
				'<td colspan="2" align="right">'+
					'<input id="btnsubmit" type="button" onclick="clkImportFile(this.form,'+idrow+',\''+status+'\');"  value="Import" class="btn btn-primary pull-right">'+
				'</td>'+
			'</tr>'+
		'</table>'+
	'</fieldset>'+
	'</form>'+
	'<div id="idwarningimportfile" style="color:red;"></div>';
	cb(tmpui);
}
function confirmLinkAgain(idseries, idbasetext, idsutta,sname, bname,suttaname){
	var modal = document.getElementById("templatepopup_importfile");
	var span = document.getElementsByClassName("close")[0];
	var url = linkprojecthostname+"/LinkingService/searchEPDB";
	var epdata = '', lpdta='';
	var datapost=new Object();
	var tmpstr ='<div style="background-color:grey;"><h3>'+sname+'>'+bname+'>'+suttaname+'</h3></div>';
	var indentlevel = new Map();
	indentlevel.set(4,"-");
	indentlevel.set(5,"&nbsp;&nbsp;&nbsp;");
	indentlevel.set(6,"&nbsp;&nbsp;&nbsp;"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	indentlevel.set(7,"&nbsp;&nbsp;&nbsp;"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	modal.style.display = "block";
	span.addEventListener("click", function(){
		  modal.style.display = "none";
	});
	tmpstr =tmpstr+"<table width=100%>";
	tmpstr = tmpstr + "<tr style=\"background-color: lightblue;\"><td width=50% style=\'text-align:center;' ><b>Pre-De Header</b></td><td style=\'text-align:center;'  width=50%><b>De Header</b></td></tr>";
	tmpstr = tmpstr + "<tr><td >{predeunit}</td><td><h4>{deunit}</h4></td></tr>";
	tmpstr = tmpstr + "<tr><td >{predeheader}</td><td >{deheader}</td></tr>";
	tmpstr = tmpstr +"</table>";
	datapost.suttafcrid=idsutta;
	datapost.flag = 1;
	datapost.iduser = sessionStorage.getItem('iduser');
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s1){
		if(s1.success){
			epdata = '<label ><b>Unit:&nbsp;</b>'+s1.min+"-"+s1.max+'</label>';
			tmpstr = tmpstr.replace("{predeunit}",epdata);
			epdata='';
			var arrh4 = s1.h4;
			for(var s=0;s<arrh4.length;s++){
				epdata = epdata + '<br><label>'+arrh4[s]+'</label>';
			}
			tmpstr = tmpstr.replace("{predeheader}",epdata);
			datapost.flag = 2;
			url = linkprojecthostname+"/LinkingService/searchLinkgDB";
			getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s2){
				if(s2.success){
					var rows = s2.arrheader;
					console.log(rows.length);
					epdata='';
					for(var sk=0;sk<rows.length;sk++){
						if(epdata.length!=0)epdata= epdata+"<br>";
						epdata=epdata+'<label>'+indentlevel.get(rows[sk].level)+rows[sk].content+"</label>";
					}
					tmpstr = tmpstr.replace("{deheader}",epdata);
					datapost.flag = 3;
					epdata='';
					getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s3){
						if(s3.success){
							rows = s3.arrheader;
							if(rows.length>0){
								epdata = '<label ><b>Unit:&nbsp;</b>'+rows[0].unit+"-"+rows[rows.length-1].unit+'</label>';
							}
							tmpstr = tmpstr.replace("{deunit}",epdata);
						}	
					});
				}
			});
		}
	});
	
	document.getElementById("templatemessage").innerHTML='<label style="color:red"><h5>Do you want to link file again? This is <u>deleting all of data!</u></h5></label>';
	document.getElementById("templatedocid_importfile").innerHTML='<label style="color:red"><h2>Link Again!</h2></label>';
	document.getElementById("templatebody_importfile").innerHTML=tmpstr;
	document.getElementById("templatecancelbutton_importfile").addEventListener("click", function(){
		modal.style.display = "none";
	});
	document.getElementById("templateokbutton_importfile").setAttribute("value","Yes");
	document.getElementById("templateokbutton_importfile").addEventListener("click", function(){
		url = linkprojecthostname+"/LinkingService/deleteLinking";
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s4){
			alert(s4.success);
			if(s4.success){
				modal.style.display = "none";
				document.getElementById("linkadminsuttatable_right").innerHTML='';
				showsuttatable_linkadmin();
			}
		});
	});
}
function gotoComparePDFEpub(ele){
	var idseries = ele.getAttribute("sfcrid");
	var sname = ele.getAttribute("sname");
	var idbasetext=ele.getAttribute("bfcrid");
	var btname=ele.getAttribute("btname");
	document.getElementById("seriesdiv").innerHTML=idseries;
	document.getElementById("basetextdiv").innerHTML=idbasetext;
	window.location.href='lpadminimportfile.jsp?idseries='+idseries+'&idbasetext='+idbasetext+
	'&sname='+sname+'&btname='+btname;
}
function clkImportFile(form,idsutta,status){
	document.getElementById("suttadiv").innerHTML=idsutta.id;
	var stpage =document.getElementById("startpage").value;
	var endpage=document.getElementById("endpage").value;
	var check =true;
	if(stpage.length==0 || endpage.length==0){
		check=false;
	}else{
		stpage=parseInt(stpage);
		endpage=parseInt(endpage);
	}
	if(typeof stpage !="number" || typeof endpage !="number"){
		check=false;
	}
	if(isNaN(stpage) || isNaN(endpage)){
		check=false;
	}
	if(check==false){
		document.getElementById("idwarningimportfile").innerText="Please key number of start and end page.";
		return;
	}
	console.log("start page ->"+stpage+" | endpage:"+endpage);
	var x1 = document.querySelector("#pdffile");
	var x2 = document.querySelector("#idmlfile");
	if ('files' in x1 && 'files' in x2) {
		if (x1.files.length == 0 || x2.files.length == 0) {
			document.getElementById("idwarningimportfile").innerText="Please select 2 file to import file!";
		}else{
			document.getElementById("idwarningimportfile").innerText="Importing.....";
			uploadFile(form,stpage, endpage,status); // call the function to upload the file
		}
	}

}
function clkApproveContent(){
	
}
function uploadFile(form,stpage, endpage, status){
    var url = '../LP/FileUploadServlet';//production
    var url = '/LP/FileUploadServlet';//test
    var xhr = new XMLHttpRequest();
    var fd = new FormData(form);
    var statusImportCompleted="Linking";
    alert(url);
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
    	var xx ='';
        if (xhr.readyState === 4 && xhr.status === 200) {
            xx= xhr.responseText;
            xx = JSON.parse(xx);
            console.log(xx);
            var tmpstr='';
            //console.log(xx["success"]);
            if(xx["success"]){
            	tmpstr = "<label style='color:blue;'><b>Import file success.";
            	var idsutta = document.getElementById("suttadiv").innerHTML;
            	var pdffile = btoa(xx["pdffile"]);
            	var idmlfile = btoa(xx["idmlfile"]);
            	var path = btoa(xx["pathfile"]);
            	var iduser = document.getElementById("iduser").innerHTML;
            	var url = linkprojectapi+"/ImportFile/linkforadmin/"+idsutta+"/"+iduser+"/"+
            		pdffile+"/"+idmlfile+"/"+stpage+"/"+endpage+"/"+path+"/"+status
            	//alert(url);
            	getData(url, "GET", false, 'application/json','', function(jsondata){
            		console.log(jsondata);
            		var idlink = jsondata.data;
            		if(idlink.length==0){
            			tmpstr = "<label style='color:red;'><b>Import file is not completed please recheck your files!";
            		}else{
            			document.getElementById(idsutta).getElementsByTagName("td")[1].innerHTML=statusImportCompleted;
            		}
            	});
            }else{
            	tmpstr = "<label style='color:red;'><b>Import file is not completed please recheck your files!";
            }
        } else if(xhr.readyState == 4){
            xx= xhr.responseText;
        }
        
        tmpstr = tmpstr+"</b></label>";
        document.getElementById("linkadminsuttatable_right").innerHTML=tmpstr;
    };
    xhr.send(fd);
    return false; 
}