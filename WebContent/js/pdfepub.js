var _allpage=0;
var _idlink=0;
var _h3fcrid='';
var interest='background-color: darkred;';
/*2 style same in node js*/
var _stylecomplete='color: #333;background-color: #f5f5f5;border-color: #ddd;';
var _styleincomplete='background-color: darkred; color:snow;';
var firstOpen=false; var closePage=0;
var _submitstatus = 4;
var _submit_disablestyle="background-color:grey;border: none;color: white;text-align: center;text-decoration: none;margin: 4px 2px;cursor: pointer;";
var _submit_enablestyle="background-color:#299086;border: none;color: white;text-align: center;text-decoration: none;margin: 4px 2px;cursor: pointer;";
function setEnableSubmit(flag){
	if(flag==0){
		document.getElementById("submitbutton").style=_submit_disablestyle;
		document.getElementById("submitbutton").setAttribute("onclick",'');
	}else{
		document.getElementById("submitbutton").style=_submit_enablestyle;
		document.getElementById("submitbutton").setAttribute("onclick",submit());
	}
}
function setdivpdfepub(){
	document.getElementById("submitbutton").addEventListener("click", function(){
		submit();
	});
	var urlParams = new URLSearchParams(location.search);
	var idseries=urlParams.get('idseries');
	var idbasetext=urlParams.get('idbasetext');
	var idsutta=urlParams.get('idsutta');
	var sname =urlParams.get('sname'); 
	var btname =urlParams.get('btname');
	var suttaname =urlParams.get('suttaname');
	document.getElementById("showheading").innerHTML = '<h5><b>'+sname+"&gt;"+btname+"&gt;"+suttaname+"</b></h5>";
	//console.log(idseries+" | "+idbasetext+" | "+idsutta);
	var url = linkprojecthostname+"/setdivpdfepub/"+idsutta
	getData(url, "GET", false, 'application/json','', function(jsonpdfepub){
		console.log(jsonpdfepub);
		_idlink=jsonpdfepub.idlink;
		_allpage=jsonpdfepub.allpage;
		_h3fcrid=jsonpdfepub.h3fcrid;
		document.getElementById("divallpage").innerText=jsonpdfepub.allpage;
		document.getElementById("divpagecontent").innerText=jsonpdfepub.pagecontent;
		document.getElementById("divpagenote").innerText=jsonpdfepub.pagenote;
		document.getElementById("divcompletedpage").innerText=jsonpdfepub.completedpage;
		document.getElementById("divincompletedpage").innerText=jsonpdfepub.incompletedpage;
		document.getElementById("pdfdiv").innerHTML=jsonpdfepub.divleft;
		addResetEvent(function(c){
			console.log(c);
		});
		url = linkprojecthostname+"/LinkingService/searchLinkgDB/";
		var datapost=new Object();
		datapost.idseries=idseries;
		datapost.idsutta = idsutta;
		datapost.flag = 1;
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s1){
			if(s1.success){
				// if(s1.status>=_submitstatus){
				// 	setEnableSubmit(0);
				// }
			}
		});
	});
}
function addResetEvent(cb){
	for(var sk=0;sk<_allpage;sk++){
		document.getElementById("pageheading"+(sk+1)).addEventListener("click", function(){
			//alert(this.id);
			setResetPopup(this);
		});
	}
	cb(true);
}
function resetPage(obj){
	var id = obj.id;
	var page = obj.id;
	page = page.replace('pageheading','');
	var strcannotreset='<label style="color:red;">Cannot reset this page! Please contract your admin.</label>';
	var url= linkprojecthostname+"/LinkingService/manageGeneratedpdfepub/";
	var datapost=new Object();
	datapost.page=page;
	datapost.idlink = _idlink;
	datapost.flag = 1;
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s1){
		if(s1.success){
			var rightdata = s1.records.rows;
			var pagestr=rightdata[0].page;
			var pagejson = JSON.parse(pagestr);
			var lpidarr = pagejson.lpidarr;
			var otheridstr = lpidarr[0];
			console.log(otheridstr);
			//alert(otheridstr);
			if(otheridstr.length==0){
				popupstr = '<label style="color:red;">This page is not information about incompleted point before!</label>'
				document.getElementById("popbody").innerHTML=popupstr;
				popupTemplate_Event('noapprovedata',popupstr,obj);
			}else{
				var arrotherid= otheridstr.split(",");
				var incompletenumber = arrotherid.length*-1;
				datapost.flag = 2;
				datapost.otherid = otheridstr;
				getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(s2){
					if(s2.success){
						popupstr = '<label>Reset completed.</label>'
						document.getElementById("popbody").innerHTML=popupstr;
						popupTemplate_Event('noapprovedata',popupstr,obj);
						document.getElementById("panelpage"+page).style=_styleincomplete;		
						document.getElementById("lblincomplete"+page).innerHTML=arrotherid.length;
						document.getElementById("divincompletedpage").innerText=parseInt(document.getElementById("divincompletedpage").innerText)+1;
						document.getElementById("templateokbutton").setAttribute("style","display:none;");
						document.getElementById("templatecancelbutton").setAttribute("value","OK");
						url = linkprojecthostname+"/updateIncompletedJsonPdfEpub/"+_idlink+"/"+page+"/"+incompletenumber;
						getData(url, "GET", false, 'application/json','', function(s3){
							if(s3.success){
								console.log("update json success");
							}
						});
					}else{
						popupstr = strcannotreset;
						document.getElementById("popbody").innerHTML=popupstr;
						popupTemplate_Event('noapprovedata',popupstr,obj);
					}
				});
			}
		}else{
			popupstr =strcannotreset;
			document.getElementById("popbody").innerHTML=popupstr;
			popupTemplate_Event('noapprovedata',popupstr,obj);
		}
	});
}
function showbody(namepagebody,idlink){
	showbodys(namepagebody,idlink,0);
}
function showbodys(namepagebody,idlink,flag){
	for(var i=0; i<_allpage; i++){
		document.getElementById('view_'+(i+1)).innerHTML='';
	}
	var page=namepagebody.split('page').join('').split('body').join('');
	var url = linkprojecthostname+"/searchPdfPicture/"+idlink+"/"+page;
	var popupstr='';
	getData(url, "GET", false, 'application/json','', function(datapicture){
		var src ='';
		if(datapicture.rows.length!=0){
			src = datapicture.rows[0].pic;
		}
		var tmpstr='<div id="viewpicture" class="img-container" style="width: 100%"><img id="{img}" src="{img_seq}"></div>';
		tmpstr = tmpstr.split("{img}").join("{imgview"+page).split("{img_seq}").join("data:image/jpeg;base64,"+src);
		document.getElementById('view_'+page).innerHTML=tmpstr;
		tmpstr="";
	    $("#move").click(function() {
	    	$('.img-container > img').cropper("clear");
	    	$(".img-container > img").cropper("setDragMode","move");
	    });
	    if(document.getElementById(namepagebody).style.display=='none'){
	    	document.getElementById(namepagebody).setAttribute("style","border: none;");
	    }else{
	        document.getElementById(namepagebody).setAttribute("style","border: none; display: none;");
	    }
	    if(firstOpen==false){ //เปิด ปิด Panel
	         closePage=namepagebody;
	         firstOpen=true;
	    }else{
	         if(closePage!=namepagebody){
	              document.getElementById(closePage).setAttribute("style","border: none; display: none;"); 
	           closePage=namepagebody; 
	         }
	    }
	    url = linkprojecthostname+"/searchGenerated/"+idlink+"/"+page;
		getData(url, "GET", false, 'application/json','', function(dataxhtml){
			var rightdata = dataxhtml.rows;
			var otheridstr='';
			if(rightdata.length>0){
				rightdata =rightdata[0];
				otheridstr=rightdata.otherid;
				console.log(otheridstr);
				if(rightdata.admin.length==0){
					rightdata = rightdata.page;
				}else{
					rightdata = rightdata.admin;
				}
				rightdata = JSON.parse(rightdata);
				var tmpstr='';
				url = linkprojecthostname+"/searchOebps_image/"+idlink;
				var picturearr='';
				var tmpxhtml =rightdata.xhtml;
				tmpxhtml=tmpxhtml.split("image/").join('');
				rightdata.xhtml=tmpxhtml;
				getData(url, "GET", false, 'application/json','', function(datapic){
					var picturearr = datapic.rows;
					for(var i=0;i<picturearr.length;i++){
						var pname = picturearr[i].name.trim();
						if(rightdata.mastercss.includes(pname)){
							rightdata.mastercss = rightdata.mastercss.split(pname).join('data:image/png;base64,'+picturearr[i].detail);
						}
						if(rightdata.css.includes(pname)){
							rightdata.css = rightdata.css.split(pname).join('data:image/png;base64,'+picturearr[i].detail);
						}
						if(rightdata.xhtml.includes(pname)){
							rightdata.xhtml = rightdata.xhtml.split(pname).join('data:image/png;base64,'+picturearr[i].detail);
						}
					}
				});
				tmpstr ='<style>';
				tmpstr = tmpstr+rightdata.mastercss;
				tmpstr = tmpstr+rightdata.css;
				tmpstr = tmpstr+"</style>";
				//tmpstr =tmpstr+"<script src=\"js/pdfepub.js\"></script>";
				tmpstr =tmpstr+"<div style='font-size:56px;'>";
				tmpstr = tmpstr+rightdata.xhtml;
				tmpstr = tmpstr+"</div>";
				//console.log(tmpstr);
				var x = document.getElementById("epubdiv");
				var y = (x.contentWindow || x.contentDocument);
				if (y.document) y = y.document;
				y.body.innerHTML = tmpstr;
				if(flag==0){
					if(otheridstr.length>0){
						popupRearrange(otheridstr);
						document.getElementById("docid").innerHTML=otheridstr;
						var otheridarr = otheridstr.split(",");
						for(var i=0;i<otheridarr.length;i++){
							setDetailOtherid(1,otheridarr[i],y,function(ret){
								popupstr=popupstr+ret;
							});
						}
						document.getElementById("popbody").innerHTML=popupstr;
					}
				}
			}
		});
		if(popupstr.length>0){
			popupCheckAdmin_Event();
		}
	});
}
function setDetailOtherid(flag,id,y,cb){
	var ret='';
	id=id.replace(/"/g, '');
	var idarr = id.split("_");
	var page = idarr[1];var line = idarr[3];var spantype = idarr[4];var seq = idarr[5];
	var content;
	if(y==''){
		var x = document.getElementById("epubdiv");
		y =  (x.contentDocument) ? x.contentDocument : x.contentWindow.document;
	}
	content = y.getElementById(id).innerHTML;
	if(idarr.length>0){
		ret =ret+ '<table id="idtable" class="w3-table-all" idlp="'+id.id+'" >'+
		'<thead>'+
		  '<tr class="w3-light-grey">'+
			'<th>{page}</th>'+
			'<th>{line}</th>'+
			'<th>{position}</th>'+
			'<th>{content}</th>'+
			'<th>{seq}</th>'+
			'<th >{savebutton}</th>'+
		  '</tr>'
		'</thead>'+
	  '</table>';
	  var pagestr = 'Page:<input disabled id="idpage" type="textbox" value="'+page+'" oldpage="'+page+'" />';
	  var linestr = 'Line:<input id="idline'+id.trim()+'" type="textbox" value="'+line+'" oldline="'+line+'" />';
	  var positionstr='Position:'+
	  '<select id="position'+id.trim()+'">'+
		  '<option value="left" '+(spantype=='leftseq'?'selected':'')+'>Left</option>'+
		  '<option value="span" '+(spantype=='spanseq'?'selected':'')+'>Center</option>'+
		  '<option value="right" '+(spantype=='rightseq'?'selected':'')+'>Right</option>'+
	  '</select>';
		var contentstr='Content:<input id="idcontent'+id.trim()+'" type="textbox" value="'+content+'" oldcontent="'+content+'" />';
		var seqstr = 'Sequence:<input id="idseq'+id.trim()+'" type="textbox" value="'+(parseInt(seq)+1)+'" oldseq="'+seq+'"/>';
		var savebutton="<input type='button' value='save' onclick='saveIncompletedContent(\""+id.trim()+"\");'>";
		ret=ret.split("{page}").join(pagestr);
		ret=ret.split("{line}").join(linestr);
		ret=ret.split("{position}").join(positionstr);
		ret=ret.split("{content}").join(contentstr);
		ret=ret.split("{seq}").join(seqstr);
		ret=ret.split("{savebutton}").join(savebutton);
	}
	if(flag==0){
		document.getElementById("saveall").setAttribute("style","background-color: #31b0d5;color:white;visibility: hidden;");
	}else{
		document.getElementById("saveall").setAttribute("style","background-color: #31b0d5;color:white;");
	}
	cb(ret);
}
function saveIncompletedContent(id){
	saveOther(id);
}
function saveOther_SetArray(newseqarr, oldseqarr,chkpagehead,content,idarr,idlinearr,positionarr,idcontentarr,
		oldcontentarr,pagearr,newlpidarr,completedsave,cb){
	var idline ='';var position='';var idcontent=''; var oldcontent='';var newlpid=''; var page='';
	var newseq=''; var oldseq='';
	var returnvalue=true;
	var iframe = document.getElementById("epubdiv");
	var contents = iframe.contentDocument || iframe.contentWindow.document;
	for(var i=0;i<idarr.length;i++){
		idline = document.getElementById("idline"+idarr[i]).value;
		if(chkpagehead){
			idline = parseInt(idline)+1;
		}
		position=document.getElementById("position"+idarr[i]).value;
		idcontent = document.getElementById("idcontent"+idarr[i]).value;
		oldcontent = document.getElementById("idcontent"+idarr[i]).getAttribute("oldcontent");
		newseq = document.getElementById("idseq"+idarr[i]).value;
		oldseq = document.getElementById("idseq"+idarr[i]).getAttribute("oldseq");
		page=document.getElementById('idpage').value;
		idlinearr.push(idline);
		positionarr.push(position);
		idcontentarr.push(idcontent);
		oldcontentarr.push(oldcontent);
		newseqarr.push(newseq);
		oldseqarr.push(oldseq);
		pagearr.push(page);
		
		if(idline=='X'){
			popupstr = '<label style="color:red">'+alertline+'</label>'
			document.getElementById("popbody").innerHTML=popupstr;
			popupTemplate_Event('checksubmit',popupstr,null);
			returnvalue=false;
			break;
		}
//		var seqarr = idarr[i].split("_");
//		var seq=seqarr[5];
		var strbeforeseq='page_'+pagearr[i]+"_line_"+idlinearr[i]+"_"+positionarr[i]+'seq_';
		if(parseInt(newseq)-1==parseInt(oldseq)){
			newlpid =strbeforeseq+oldseq;
		}else{
			newlpid =strbeforeseq+(parseInt(newseq)-1);
		}
		
		newlpidarr.push(newlpid);
		if(content.indexOf(newlpid)!=-1){
			var splitseqarr = content.split(strbeforeseq);
			var spliseqstr="Please change sequence of word because it has some repeated sequence!<br><table border=1>";
			var splittrseq="<tr>";
			var splittrcontent="<tr>";
			var splitseqnumber =[]; var splitstrcontent='';
			for(var sk=0;sk<splitseqarr.length;sk++){
				if(sk==0) continue;
				splitseqnumber = splitseqarr[sk].split("epubid=");
				console.log(splitseqnumber);
				splitseqnumber[0]=splitseqnumber[0].trim().replace('"','');
				var skue=strbeforeseq+splitseqnumber[0];
				
				splitstrcontent = document.getElementById('epubdiv').contentWindow.document.getElementById(skue);
				console.log(splitstrcontent);
				
				var skstr= splitstrcontent.textContent;
				splittrseq=splittrseq+"<td>"+(parseInt(splitseqnumber[0].trim())+1)+"</td>";
				
				splittrcontent=splittrcontent+"<td>"+skstr+"</td>";
			}
			splittrseq=splittrseq+"</tr>";
			splittrcontent = splittrcontent+"</tr>";
			spliseqstr = spliseqstr+splittrseq+splittrcontent+"</table>";
			document.getElementById("popbody").innerHTML= spliseqstr;
			document.getElementById("saveall").setAttribute("style","display:none;");
			document.getElementById("cancelpopup").setAttribute("value","OK");
			
			returnvalue=false;
			break;
		}
		completedsave.push(idarr[i]);
		completedsave.push(newlpid);
		completedsave.push(oldcontent);
		completedsave.push(oldcontent);
	}
	cb(returnvalue);
}
function saveOther_CheckHeader(jsonpageheader,allline,page,cb){
	var chkpagehead =false;
	for(var sk=0;sk<allline;sk++){
		if(jsonpageheader["page_"+page]["line_"+(sk+1)]["pagehead"]){
			chkpagehead =true;
			break;
		}else{
			chkpagehead =false;
		}
	}
	cb(chkpagehead);
}
function saveOther(id){
	var stylehilight='style="background-color:orange;"';
	var stylenohilight='style="background-color:white;"';
	var alertline = "Please key number of line!";
	var alerthaveid ='Plase check your position'
	var idarr=id.split(",");
	var datapost=new Object();
	var iframe = document.getElementById("epubdiv");
    var content = iframe.contentDocument || iframe.contentWindow.document;
	var contentall,popupstr ;
	content = iframe.contentDocument || iframe.contentWindow.document;
	content= content.body.innerHTML;
	contentall = content;
	console.log(idarr);
	var idlinearr =[],positionarr=[],idcontentarr=[],oldcontentarr=[],pagearr=[],newlpidarr=[],completedsave =[];
	var newseqarr=[], oldseqarr=[];
	var url= linkprojecthostname+"/LinkingService/searchLinkgDB/";
	datapost.idlink=_idlink;
	datapost.flag=4;
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(pgh){
		if(pgh.success){
			var jsonpageheader = pgh.rows[0]["pdfepub"];
			jsonpageheader = JSON.parse(jsonpageheader);
			var p_page=document.getElementById('idpage').value;
			var allline = jsonpageheader["page_"+p_page]["xyallline"];
			saveOther_CheckHeader(jsonpageheader,allline,p_page,function(chkpagehead){
				saveOther_SetArray(newseqarr, oldseqarr,chkpagehead,content,idarr,idlinearr,positionarr,idcontentarr,
						oldcontentarr,pagearr,newlpidarr,completedsave,function(ss){
					if(ss){
						url= linkprojecthostname+"/LinkingService/saveGeneratepdfepub/";
						datapost.page=pagearr;
						datapost.position=positionarr;
						datapost.line=idlinearr;
						datapost.spanid=idarr;//id;
						datapost.newspanid=newlpidarr;
						datapost.oldcontent=oldcontentarr;
						console.log(oldcontentarr[0]);
						datapost.newcontent=idcontentarr;
						datapost.stylehilight=stylehilight;
						console.log(datapost);
						getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(success){
							if(success.success){
								for(var sk=0;sk<completedsave.length;sk=sk+3){
									var arrcontent = contentall.split(completedsave[sk]);// 2 slot
									var arrsplitcontent = arrcontent[arrcontent.length-1].split(">");
									var strxhtml=arrcontent[0]+completedsave[sk+1];
									for(var k=0;k<arrsplitcontent.length;k++){
										if(k==0){
											arrsplitcontent[0]=arrsplitcontent[0].split(stylehilight).join('');
											strxhtml = strxhtml+arrsplitcontent[0]+">"+completedsave[k+3];
											arrsplitcontent[1] = arrsplitcontent[1].substring(completedsave[k+2].length);
										}else{
											strxhtml = strxhtml+arrsplitcontent[k]+">";
										}
									}
									contentall=strxhtml;
								}
								console.log(contentall);
								//update jsonpdfepub
								var completednumber = completedsave.length/4;
								url = linkprojecthostname+"/updateIncompletedJsonPdfEpub/"+_idlink+"/"+pagearr[0]+"/"+completednumber;
								//alert(url);
								getData(url, "GET", false, 'application/json','', function(success){
									if(success.success){
										//alert(success.incomplete);
										var modal = document.getElementById("myModal"); 
										modal.style.display = "none";
										if(success.incomplete==0){
											document.getElementById("panelpage"+pagearr[0]).style=_stylecomplete;
											document.getElementById("divincompletedpage").innerText=parseInt(document.getElementById("divincompletedpage").innerText)-1;
										}
										document.getElementById("lblincomplete"+pagearr[0]).innerText = success.incomplete;
										iframe = document.getElementById("epubdiv");
										content = iframe.contentDocument || iframe.contentWindow.document;
										var mycontent= content.body.innerHTML;
										for(var i=0;i<idarr.length;i++){
											content.getElementById(idarr[i]).style=stylenohilight;
											mycontent = mycontent.replace(idarr[i],newlpidarr[i]);
										}
										content.body.innerHTML=mycontent;
										showbodys('page'+pagearr[0]+'body',_idlink,1);
									}else{
										alert(success.success+success.reason);
									}
								});
							}else{
								alert(success.success+success.reason);
							}
						});
					}
				});
				
			});
		}else{
			alert(pgh.success);
		}
	});
}
function saveOther_(id){
	var stylehilight='style="background-color:orange;"';
	var stylenohilight='style="background-color:white;"';
	var alertline = "Please key number of line!";
	var alerthaveid ='Plase check your position'
	var idarr=id.split(",");
	var idline ='';var position='';var idcontent=''; var oldcontent='';
	var page=null;
	var datapost=new Object();
	var iframe = document.getElementById("epubdiv");
    var content = iframe.contentDocument || iframe.contentWindow.document;
	var contentall,popupstr ;
	var completedsave =[];
	for(var i=0;i<idarr.length;i++){
		console.log(idarr[i]);
		content = iframe.contentDocument || iframe.contentWindow.document;
		content= content.body.innerHTML;
		contentall = content;
		completedsave =[];
		idline = document.getElementById("idline"+idarr[i]).value;
		position=document.getElementById("position"+idarr[i]).value;
		idcontent = document.getElementById("idcontent"+idarr[i]).value;
		oldcontent = document.getElementById("idcontent"+idarr[i]).getAttribute("oldcontent");
		page=document.getElementById('idpage').value;
		if(idline=='X'){
			popupstr = '<label style="color:red">'+alertline+'</label>'
			document.getElementById("popbody").innerHTML=popupstr;
			popupTemplate_Event('checksubmit',popupstr,null);
			return;
		}
		var url= linkprojecthostname+"/LinkingService/searchLinkgDB/";
		datapost.idlink=_idlink;
		datapost.flag=4;
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(pgh){
			if(pgh.success){
				var jsonpageheader = pgh.rows[0]["pdfepub"];
				jsonpageheader = JSON.parse(jsonpageheader);
				var allline = jsonpageheader["page_"+page]["xyallline"];
				var chkpagehead =false;
				for(var sk=0;sk<allline;sk++){
					if(jsonpageheader["page_"+page]["line_"+(sk+1)]["pagehead"]){
						chkpagehead =true;
						break;
					}else{
						chkpagehead =false;
					}
				}
				if(chkpagehead){
					idline = parseInt(idline)+1;
				}
				var seqarr = idarr[i].split("_");
				var seq=seqarr[5];
				var newlpid ='page_'+page+"_line_"+idline+"_"+position+'seq_'+seq;
				alert(newlpid);
				if(content.indexOf(newlpid)!=-1){
					//alert(alerthaveid);
					return;
				}
				console.log(document.getElementById("epubdiv").innerHTML.indexOf(newlpid));
				url= linkprojecthostname+"/LinkingService/saveGeneratepdfepub/";
				datapost.page=page;
				datapost.position=position;
				datapost.line=idline;
				datapost.spanid=id;
				datapost.newspanid=newlpid;
				datapost.oldcontent=oldcontent;
				datapost.newcontent=idcontent;
				datapost.stylehilight=stylehilight;
				console.log(datapost);
				getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(success){
					if(success.success){
						completedsave.push(datapost.spanid);
						completedsave.push(datapost.newspanid);
						completedsave.push(datapost.oldcontent);
						completedsave.push(datapost.newcontent);
						for(var sk=0;sk<completedsave.length;sk=sk+3){
							var arrcontent = contentall.split(completedsave[sk]);// 2 slot
							var arrsplitcontent = arrcontent[arrcontent.length-1].split(">");
							var strxhtml=arrcontent[0]+completedsave[sk+1];
							for(var k=0;k<arrsplitcontent.length;k++){
								if(k==0){
									arrsplitcontent[0]=arrsplitcontent[0].split(stylehilight).join('');
									strxhtml = strxhtml+arrsplitcontent[0]+">"+completedsave[k+3];
									arrsplitcontent[1] = arrsplitcontent[1].substring(completedsave[k+2].length);
								}else{
									strxhtml = strxhtml+arrsplitcontent[k]+">";
								}
							}
							contentall=strxhtml;
						}
						console.log(contentall);
						//alert(completedsave.length);
						//content.body.innerHTML=contentall;
						//update jsonpdfepub
						var completednumber = completedsave.length/4;
						url = linkprojecthostname+"/updateIncompletedJsonPdfEpub/"+_idlink+"/"+page+"/"+completednumber;
						//alert(url);
						getData(url, "GET", false, 'application/json','', function(success){
							if(success.success){
								//alert(success.incomplete);
								var modal = document.getElementById("myModal"); 
								modal.style.display = "none";
								if(success.incomplete==0){
									document.getElementById("panelpage"+page).style=_stylecomplete;
									document.getElementById("divincompletedpage").innerText=parseInt(document.getElementById("divincompletedpage").innerText)-1;
								}
								document.getElementById("lblincomplete"+page).innerText = success.incomplete;
								iframe = document.getElementById("epubdiv");
								content = iframe.contentDocument || iframe.contentWindow.document;
								content.getElementById(idarr[i]).style=stylenohilight;
								var mycontent= content.body.innerHTML;
								mycontent = mycontent.replace(idarr[i],newlpid);
								content.body.innerHTML=mycontent;
							}else{
								alert(success.success);
							}
						});
					}else{
						alert(success.success);
					}
				});
			}else{
				alert(pgh.success);
			}
		});
	}    
}
function popupRearrange(otheridstr){
	//alert(d.id);
	var otheridarr = otheridstr.split(",");
	console.log(otheridarr);
	for(var sk=0;sk<otheridarr.length;sk++){
		var iframe = document.getElementById("epubdiv");
		var content = iframe.contentDocument || iframe.contentWindow.document;
		var popid=otheridarr[sk];
		console.log(popid);
		content.getElementById(popid).addEventListener("click", function(){
			//alert(this.id);
			var popupstr='';
			setDetailOtherid(0,this.id,'',function(ret){
				popupstr=popupstr+ret;
			});
			document.getElementById("popbody").innerHTML=popupstr;
			setTimeout(() => {
				popupCheckAdmin_Event();
			}, 1000);
			
			
		});
	}
}

function submit(){
	var doc = document.getElementById("pdfdiv").innerHTML;
	var index = doc.indexOf(interest);
	var incomplete = "Please check incompleted point in each page!";
	var popupstr='';
	if(index!=-1){
		popupstr = '<label style="color:red">'+incomplete+'</label>'
		document.getElementById("popbody").innerHTML=popupstr;
		popupTemplate_Event('checksubmit',popupstr,null);
		return;
	}
	var css = document.getElementById("submitbutton").getAttribute("style");
	if(css.indexOf('grey')!=-1){
		return;
	}
	var url= linkprojecthostname+"/submitApproveForAdmin/"+_idlink+"/"+_h3fcrid+"/"+sessionStorage.getItem('iduser');
	console.log(url);
	getData(url, "GET", false, 'application/json','', function(datapic){
		alert(datapic.success);
		if(datapic.success){
			setEnableSubmit(0);
		}
	});
}
function popupCheckAdmin_Event (){
	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	span.addEventListener("click", function(){
		modal.style.display = "none";
	});	
	document.getElementById("cancelpopup").addEventListener("click", function(){
		modal.style.display = "none";
		document.getElementById("cancelpopup").setAttribute("value","Cancel");
	});
	document.getElementById("saveall").addEventListener("click", function(){
		saveOther(document.getElementById("docid").innerHTML);
	});
}
function popupTemplate_Event (topic,contentbody,obj){
	var modal = document.getElementById("templatepopup");
	var span = document.getElementsByClassName("close")[1];
	modal.style.display = "block";
	span.addEventListener("click", function(){
		  modal.style.display = "none";
	});
	if(topic=='reset'){
		document.getElementById("templatedocid").innerHTML="Warning!";
		document.getElementById("templatebody").innerHTML=contentbody;
		document.getElementById("templatecancelbutton").setAttribute("value","Cancel");
		document.getElementById("templatecancelbutton").addEventListener("click", function(){
			modal.style.display = "none";
		});
		document.getElementById("templateokbutton").setAttribute("style","background-color: #31b0d5;color:white;");
		document.getElementById("templateokbutton").setAttribute("value","Reset");
		document.getElementById("templateokbutton").addEventListener("click", function(){
			resetPage(obj);
		});
	}else if(topic=='noapprovedata'){
		document.getElementById("templatedocid").innerHTML="Cannot Reset!";
		document.getElementById("templatebody").innerHTML=contentbody;
		document.getElementById("templatecancelbutton").addEventListener("click", function(){
			modal.style.display = "none";
		});
		document.getElementById("templateokbutton").setAttribute("value","OK");
		document.getElementById("templateokbutton").addEventListener("click", function(){
			modal.style.display = "none";
		});
	}else if(topic=='checksubmit'){
		document.getElementById("templatedocid").innerHTML="Cannot Submit!";
		document.getElementById("templatebody").innerHTML=contentbody;
		document.getElementById("templatecancelbutton").setAttribute("value","Cancel");
		document.getElementById("templatecancelbutton").addEventListener("click", function(){
			modal.style.display = "none";
		});
		document.getElementById("templateokbutton").setAttribute("value","OK");
		document.getElementById("templateokbutton").addEventListener("click", function(){
			modal.style.display = "none";
		});
	}
}
function setResetPopup(obj){
	var popupstr='';
	var page = obj.id;
	page = page.replace('pageheading','');
	popupstr = '<label style="color:red;">Do you want to reset appove content(Page:'+page+') for admin?</label>'
	document.getElementById("popbody").innerHTML=popupstr;
	popupTemplate_Event('reset',popupstr,obj);
}
document.getElementById('move').click();
setInterval(function(){
	document.getElementById('move').click();
}, 100);