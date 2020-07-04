var userapprovecontent_idseries='';
var userapprovecontent_idbasetext='';
var userapprovecontent_idsutta='';
var userapprovecontent_sname='';
var userapprovecontent_btname='';
var userapprovecontent_suttaname='';
var userapprovecontent_seq='';
var userapprovecontent_idlink=0;
var userapprovecontent_allpage=0;
var userapprovecontent_startpage=0;
var userapprovecontent_endpage=0;
var userapprovecontent_unit='';
//from db
var userapprovecontent_spage='',userapprovecontent_epage='';
var userapprovecontent_sline='',userapprovecontent_eline='';
var userapprovecontent_arrepunit=[];
//public var.
var url ='',datapost=new Object();
//about pre de unit เพื่อไม่ต้องโหลดหลายรอบ ถ้ามันมีข้อมูลแล้ว ก็ แสดงเลยอะ
var userapprovecontent_popup_predeunit_sutta='';
//map between unit and page
var mapunitpage = new Map();
var mappagetable = new Map();
var tmparrvalue_mapunitpage;
var arr_unit=[];
var mapheader = new Map();
var mapunit_pageline=new Map();
var tmpheader =["","","",""]; //h4,h5,h6,h7 | spage,epage,sline,eline

var objImg=null;
var currentPage=0;
function show(){
	var urlParams = new URLSearchParams(location.search);
	userapprovecontent_idseries=urlParams.get('idseries');
	userapprovecontent_idbasetext=urlParams.get('idbasetext');
	userapprovecontent_idsutta=urlParams.get('idsutta');
	userapprovecontent_sname =urlParams.get('sname'); 
	userapprovecontent_btname =urlParams.get('btname');
	userapprovecontent_suttaname =urlParams.get('suttaname');
	userapprovecontent_seq=urlParams.get('seq');
	userapprovecontent_unit = urlParams.get('unit');	
	setUI();
}
function setUI(){	
	document.getElementById("nextpage").style.cursor="pointer";
	document.getElementById("previouspage").style.cursor="pointer";
	document.getElementById("nextunit").style.cursor="pointer";
	document.getElementById("previousunit").style.cursor="pointer";
	datapost=new Object();
	url = linkprojecthostname+"/LinkingService/searchLinkgDB";
	datapost.h3fcrid= userapprovecontent_idsutta;
	datapost.unit = userapprovecontent_unit;
	document.getElementById('lblunit').innerHTML=userapprovecontent_unit;
	url = linkprojecthostname+"/LinkingService/searchLinkgDB";
	datapost.flag=9;//find link table
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk1link){
		if(sk1link.success){
			var linkrow = sk1link.rows;
			userapprovecontent_idlink = linkrow[0]["id"];
			userapprovecontent_allpage= linkrow[0]["allpage"];
			userapprovecontent_startpage= linkrow[0]["startpage"];
			userapprovecontent_endpage= linkrow[0]["endpage"];
			datapost.flag=7;// lpunit table
			getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk1){
				if(sk1.success){
					var detailunit = sk1.rows;
					for(var ss=0;ss<detailunit.length;ss++){
						tmpheader =[detailunit[ss]["h4"],detailunit[ss]["h5"],detailunit[ss]["h6"],detailunit[ss]["h7"]];
						mapheader.set(detailunit[ss]["unit"], tmpheader);
						tmpheader =[detailunit[ss]["spage"], detailunit[ss]["epage"],detailunit[ss]["sline"],detailunit[ss]["eline"]];
						mapunit_pageline.set(detailunit[ss]["unit"],tmpheader);
						arr_unit.push(detailunit[ss]["unit"]);
					}
					setHeaderDetail(function(retheader){
						if(retheader){
							datapost.flag=8;//lpepcontentperpage
							datapost.spage=userapprovecontent_spage;
							datapost.epage=userapprovecontent_epage;
							getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk3){
								if(sk3.success){
									var sk3rows = sk3.rows;
									var pdeunit="Pre De Unit:&nbsp;";
									var tmpuserapprovecontent_arrepunit = sk3rows[0].epunit.split(",");
									for(var ue=0;ue<tmpuserapprovecontent_arrepunit.length;ue++){
										userapprovecontent_arrepunit.push(tmpuserapprovecontent_arrepunit[ue]);
									}
									userapprovecontent_arrepunit.push(tmpuserapprovecontent_arrepunit[0]);
									if(sk3rows.length==1){
										pdeunit = pdeunit+tmpuserapprovecontent_arrepunit[0]+(tmpuserapprovecontent_arrepunit.length>1?"-"+tmpuserapprovecontent_arrepunit[tmpuserapprovecontent_arrepunit.length-1]:"");
									}else{
										pdeunit = pdeunit+userapprovecontent_arrepunit[0]+"-";
										tmpuserapprovecontent_arrepunit = sk3rows[sk3rows.length-1].epunit.split(",");
										pdeunit = pdeunit+tmpuserapprovecontent_arrepunit[tmpuserapprovecontent_arrepunit.length-1];
									}
									for(var ue=0;ue<tmpuserapprovecontent_arrepunit.length;ue++){
										userapprovecontent_arrepunit.push(tmpuserapprovecontent_arrepunit[ue]);
									}
									document.getElementById("btnUserapprovePredeunit").innerHTML= pdeunit;
									document.getElementById('btnUserapprovePredeunit').addEventListener('click', function() {
										popPreDeUnit();
									});
									document.getElementById('btnloadallsutta').addEventListener('click', function() {
										popAllSutta();
									});
									
									document.getElementById('btnpdfde').addEventListener('click', function() {
										popPDFDe();
									});
									datapost.flag=11;//lpepcontentperpage
									getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk4){
										if(sk4.success){
											sk3rows = sk4.rows
											for(var ss=0;ss<sk3rows.length;ss++){
												if(ss==0){
													document.getElementById("compareeplptable").innerHTML=sk3rows[ss]["table_submitadmin"];
													document.getElementById("lblpage").innerHTML=sk3rows[ss]["number"];
												}
												mappagetable.set(sk3rows[ss]["number"],sk3rows[ss]["table_submitadmin"]);
											}
										}else{
											console.log(sk4);
										}
										document.getElementById("nextpage").addEventListener('click', function(){
											nextprevoiusPage('next');
										});
										document.getElementById("previouspage").addEventListener('click', function(){
											nextprevoiusPage('previous');
										});
										document.getElementById("nextunit").addEventListener('click', function(){
											nextprevoiusUnit('next');
										});
										document.getElementById("previousunit").addEventListener('click', function(){
											nextprevoiusUnit('previous');
										});
									});
									
								}else{
									console.log(sk3);
								}	
							});
						}
					});
				}else{
					console.log(sk1);
				}
			});
		}else{
			console.log(sk1link);
		}
	});
}
function popupTemplate(title,body,flag){
	var modal = document.getElementById("templatepopup_approveusercontent");
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	span.addEventListener("click", function(){
		modal.style.display = "none";
	});
	document.getElementById("templatepopup_approveusercontent_cancelbutton").addEventListener('click', function(){
		modal.style.display = "none";
	});
	document.getElementById("templatepopup_approveusercontent_header").innerHTML=title;
	document.getElementById("templatepopup_approveusercontent_body").innerHTML=body;
	switch(flag){
		case 1:
			document.getElementById("templatepopup_approveusercontent_okbutton").addEventListener('click', function(){
				modal.style.display = "none";
			});
			document.getElementById("templatepopup_approveusercontent_cancelbutton").setAttribute("style","display:none");
			break;
		default:
			break;
	}
}
function nextprevoiusPage(flag){
	var nowpage = document.getElementById("lblpage").innerText;
	var getpage = parseInt(nowpage)+(flag=='next'?1:-1);
	var tmparr=[];
	if(getpage<userapprovecontent_startpage){
		popupTemplate("<b>Warning!</b>","Cannot Previous Page!",1);
		return;
	}else if(getpage>userapprovecontent_endpage){
		popupTemplate("<b>Warning!</b>","Cannot Next Page!",1);
		return;
	}
	console.log('get page : '+getpage+'  spage: '+userapprovecontent_spage+"   endpage"+userapprovecontent_epage);
	datapost.flag=11;//lpepcontentperpage
	datapost.spage=getpage;
	datapost.epage=getpage;
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk4){
		if(sk4.success){
			var sk4rows = sk4.rows;
			if(sk4rows.length>0){
				var tmparr=[];var getunit =0;
				//sk4rows[0]["lpunit"] อาจจะมีการว่าง จะต้อง switch ไปหา ในแต่ unit ที่แสดง อันสุดท้าย spage อันสุดท้าย เป็นหน้านั้น
				if(sk4rows[0]["lpunit"].length==0){
					for(sk=getpage-1;sk>-1;sk--){
						console.log("sk "+sk);
						datapost.spage=sk;
						datapost.epage=sk;
						getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk5){
							if(sk5.success){
								var sk5rows = sk5.rows;
								if(sk5rows.length>0){
									if(sk5rows[0]["lpunit"].length!=0){
										tmparr= sk5rows[0]["lpunit"].split(',');
										getunit = tmparr[tmparr.length-1];
									}
								}
							}else{
								console.log(sk5);
							}
						});
						if(getunit!=0) break;
					}
					datapost.spage=getpage;
					datapost.epage=getpage;
				}else{
					tmparr= sk4rows[0]["lpunit"].split(',');
					if(flag=='next'){
						getunit= tmparr[0];
					}else{
						getunit = tmparr[tmparr.length-1];
					}
				}
				console.log(getunit); 
				var nowposition = -1;
				for(var sk=0;sk<arr_unit.length;sk++){
					if(arr_unit[sk]==getunit){
						nowposition=sk;
						break;
					}
				}
				if(nowposition!=-1){
					nowunit = arr_unit[nowposition];
					tmparr = mapunit_pageline.get(nowunit);
					//console.log(tmparr);
					userapprovecontent_spage= tmparr[0];
					userapprovecontent_epage= tmparr[1];
					userapprovecontent_sline= tmparr[2];
					userapprovecontent_eline= tmparr[3];
					datapost.flag=11;//lpepcontentperpage
					//console.log(nowunit+' page : '+getpage);
					datapost.spage=getpage;
					datapost.epage=getpage;
					mappagetable = new Map();
					getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk3){
						if(sk3.success){
							var sk3rows = sk3.rows;
							document.getElementById("lblpage").innerText=userapprovecontent_spage;
							for(var ss=0;ss<sk3rows.length;ss++){
								mappagetable.set(sk3rows[ss]["number"],sk3rows[ss]["table_submitadmin"]);
							}
							var ss = 0;
							if(flag!='next'){
								ss = sk3rows.length-1;
							}
							document.getElementById("lblunit").innerText =getunit;
							document.getElementById("compareeplptable").innerHTML=sk3rows[ss]["table_submitadmin"];
							document.getElementById("lblpage").innerHTML=sk3rows[ss]["number"];
						}else{
							console.log(sk3);
						}
					});
				}
			}
		}else{
			console.log(sk4);
		}
	});
}

function nextprevoiusUnit(flag){
	var nowunit = document.getElementById("lblunit").innerText;
	var getunit = parseInt(nowunit)+(flag=='next'?1:-1);
	var nowposition = -1;
	for(var sk=0;sk<arr_unit.length;sk++){
		if(arr_unit[sk]==nowunit){
			nowposition=sk;
			break;
		}
	}
	if(nowposition!=-1){
		var getunitposition = nowposition+(flag=='next'?1:-1);
		//next prv unit
		if(flag=='next'){
			if(getunitposition>=arr_unit.length){//ไม่มีอะไรจะ next แล้วน้า
				popupTemplate("<b>Warning!</b>","Cannot Next Unit!",1);
				return;
			}
		}else{//previous
			if(getunitposition<0){//ไม่มีอะไรจะ prv แล้วน้า
				popupTemplate("<b>Warning!</b>","Cannot Previous Unit!",1);
				return;
			}
		}

		nowunit = arr_unit[getunitposition];
		console.log("unit "+nowunit);
		var tmparr = mapunit_pageline.get(nowunit);
		userapprovecontent_spage= tmparr[0];
		userapprovecontent_epage= tmparr[1];
		userapprovecontent_sline= tmparr[2];
		userapprovecontent_eline= tmparr[3];
		document.getElementById("lblunit").innerText = nowunit;
		datapost.flag=11;//lpepcontentperpage
		datapost.spage=userapprovecontent_spage;
		datapost.epage=userapprovecontent_epage;
		mappagetable = new Map();
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk3){
			if(sk3.success){
				var sk3rows = sk3.rows;
				document.getElementById("lblpage").innerText=userapprovecontent_spage;
				for(var ss=0;ss<sk3rows.length;ss++){
					if(ss==0){
						document.getElementById("compareeplptable").innerHTML=sk3rows[ss]["table_submitadmin"];
						document.getElementById("lblpage").innerHTML=sk3rows[ss]["number"];
					}
					mappagetable.set(sk3rows[ss]["number"],sk3rows[ss]["table_submitadmin"]);
				}
			}else{
				console.log(sk3);
			}
		});
		

	}
}
function setHeaderDetail(cbheader){
	var headername =["","","",""];
	// console.log(userapprovecontent_unit);
	// console.log(mapunit_pageline);
	tmpheader = mapunit_pageline.get(userapprovecontent_unit);
	// console.log(tmpheader);
	userapprovecontent_spage=tmpheader[0];
	userapprovecontent_epage=tmpheader[1];
	userapprovecontent_sline=tmpheader[2];
	userapprovecontent_eline=tmpheader[3];
	datapost.flag=6;//lpheader
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk2){
		if(sk2.success){
			var detailheader = sk2.rows;
			tmpheader = mapheader.get(userapprovecontent_unit);
			for(var u=0; u<detailheader.length;u++){
				if(detailheader[u]["level"]==4 && tmpheader[0].length!=0){
					if(detailheader[u]["h4"]==tmpheader[0]){
						headername[0] = detailheader[u]["content"];
					}
				}
				if(detailheader[u]["level"]==5 && tmpheader[1].length!=0){
					if(detailheader[u]["h5"]==tmpheader[1]){
						headername[1] = detailheader[u]["content"];
					}
				}
				if(detailheader[u]["level"]==6 && tmpheader[2].length!=0){
					if(detailheader[u]["h6"]==tmpheader[2]){
						headername[2] = detailheader[u]["content"];
					}
				}
				if(detailheader[u]["level"]==7 && tmpheader[3].length!=0){
					if(detailheader[u]["h7"]==tmpheader[3]){
						headername[3] = detailheader[u]["content"];
					}
				}
			}
			document.getElementById("showheading").innerHTML = '<table><tr><td>'+
								'<h5><b>'+userapprovecontent_sname+"&gt;"+userapprovecontent_btname+"&gt;"+
								userapprovecontent_suttaname+"&gt;"+
								(headername[0].length==0?'':headername[0]+"&gt;")+
								(headername[1].length==0?'':headername[1]+"&gt;")+
								(headername[2].length==0?'':headername[2]+"&gt;")+
								(headername[3].length==0?'':headername[3]+"&gt;")+
								userapprovecontent_unit+
								"</b></h5></td><td>&nbsp;</td></tr></table>";
			cbheader(true);
		}else{
			console.log(sk2);
			cbheader(false);
		}
	}); 
}
function setPopupWindow(purl,pname,pspecs,pcontent,ptitle){
	var myWindow =window.open(purl, pname,pspecs);
	myWindow.document.write('<html>');
	myWindow.document.write('<head>');
	myWindow.document.write('<title>'+ptitle+'</title>');
	myWindow.document.write('</head>');
	myWindow.document.write('<body>');
	myWindow.document.write(pcontent);
	myWindow.document.write('</body>');
	myWindow.document.write('</html>');
}
function setPopupWindowImage(purl,pname,pspecs,pcontent,ptitle){
	var myWindow =window.open(purl, pname,pspecs);
	myWindow.document.write('<html>');
	myWindow.document.write('<head>');
	myWindow.document.write('<title>'+ptitle+'</title>');
	//about picture
	myWindow.document.write('<link rel="stylesheet" href="bootstrap/crop/css/font-awesome.min.css">');
	myWindow.document.write('<link rel="stylesheet" href="bootstrap/crop/css/bootstrap.min.css" id="bootstrap.min.css">');
	myWindow.document.write('<link rel="stylesheet" href="bootstrap/crop/css/cropper.css">');
	myWindow.document.write('<link rel="stylesheet" href="bootstrap/crop/css/main.css">"');
	myWindow.document.write("<style> ");
	myWindow.document.write(".img-container { ");
	myWindow.document.write("	min-height: 800px; ");
	myWindow.document.write("	max-height:1000px; ");
	myWindow.document.write("	margin-bottom: 20px; ");
	myWindow.document.write("}     ");
	myWindow.document.write(".modal { ");
	myWindow.document.write(	"  display: none; /* Hidden by default */ ");
	myWindow.document.write(	"position: fixed; /* Stay in place */ ");
	myWindow.document.write(	"z-index: 1; /* Sit on top */ ");
	myWindow.document.write(	"left: 0; ");
	myWindow.document.write(	"top: 0; ");
	myWindow.document.write(	"width: 100%; /* Full width */ ");
	myWindow.document.write(	"height: 100%; /* Full height */ ");
	myWindow.document.write(	"overflow: auto; /* Enable scroll if needed */ ");
	myWindow.document.write(	"background-color: rgb(0,0,0); /* Fallback color */ ");
	myWindow.document.write(	"background-color: rgba(0,0,0,0.4); /* Black w/ opacity */ ");
	myWindow.document.write(	"} ");
	myWindow.document.write("/* Modal Content/Box */ ");
	myWindow.document.write(	".modal-content { ");
	myWindow.document.write(	"  background-color: #fefefe; ");
	myWindow.document.write(	"  margin: 15% auto; /* 15% from the top and centered */ ");
	myWindow.document.write(	"  padding: 20px; ");
	myWindow.document.write(	"  border: 1px solid #888; ");
	myWindow.document.write(	" width: 80%; /* Could be more or less, depending on screen size */ ");
	myWindow.document.write(	"} ");
	myWindow.document.write("</style>");
	myWindow.document.write('</head>');
	myWindow.document.write('<body>');
	for(var sk=0; sk<pcontent.length;sk++){
		myWindow.document.write('<div width=56% class="img-container">');
		myWindow.document.write('<img src="data:image/png;base64,'+pcontent[sk].pic+'"/>');
		myWindow.document.write('</div>');
	}
	myWindow.document.write('</body>');
	myWindow.document.write('</html>');
}
function popAllSutta(){
	var windowpopup_spec="width=900,height=570,scrollbars=yes";
	if(userapprovecontent_popup_predeunit_sutta.length==0){
		datapost.flag=3;
		datapost.suttafcrid= userapprovecontent_idsutta;
		url = linkprojecthostname+"/LinkingService/searchEPDB";
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk1){
			if(sk1.success){
				userapprovecontent_popup_predeunit_sutta=sk1.content;
				setPopupWindow("","",windowpopup_spec,userapprovecontent_popup_predeunit_sutta,userapprovecontent_suttaname);
			}v
		});
	}else{
		setPopupWindow("","",windowpopup_spec,userapprovecontent_popup_predeunit_sutta,userapprovecontent_suttaname);
	}
}
function popPreDeUnit(){
	var windowpopup_spec="width=900,height=870,scroll=yes";
	for(var sk=0;sk<userapprovecontent_arrepunit.length;sk++){
		tmpstr=tmpstr+(sk==0?'':',')+userapprovecontent_arrepunit[sk];
	}
	datapost.flag=2;
	datapost.suttafcrid= userapprovecontent_idsutta;
	datapost.sunit = userapprovecontent_arrepunit[0];
	datapost.eunit = userapprovecontent_arrepunit[userapprovecontent_arrepunit.length-1];
	url = linkprojecthostname+"/LinkingService/searchEPDB";
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk1){
		console.log(sk1);
		if(sk1.success){
			setPopupWindow("","",windowpopup_spec,sk1.content,document.getElementById("btnUserapprovePredeunit").innerHTML);
		}
	});
}
function popPDFDe(){
	url = linkprojecthostname+"/LinkingService/searchLinkgDB";
	var windowpopup_spec="width=900,height=870";
	datapost.h3fcrid= userapprovecontent_idsutta;
	datapost.idlink=userapprovecontent_idlink;
	datapost.flag=10;
	datapost.spage = userapprovecontent_spage;
	datapost.epage = userapprovecontent_epage;
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(obj){
		if(obj.success){
			setPopupWindowImage("","",windowpopup_spec,obj.rows,
			"PDF ("+userapprovecontent_spage+(userapprovecontent_spage==userapprovecontent_epage?"":"-"+userapprovecontent_epage)+")");
		}
	});
}
function popPreDeUnit_(){
	
	datapost.flag=7;
	datapost.h3fcrid= userapprovecontent_idsutta;
	datapost.unit = userapprovecontent_unit;
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(obj){ //find lpunit
		if(obj.success){
			datapost.flag=9;
			getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(obj){ //find idlink
				if(obj.success){
					datapost.flag=10;
					datapost.idlink=obj.rows[0].id;
					getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(obj){ //find picture
						if(obj.success){
//							console.log(obj)
							objImg=obj.rows;
							nextprevoius('first');
						}
					});
				}
			});
		}
	});
}




function nextprevoius(event){
	let imgElem=document.getElementById('displayimg');
	if(event=='next'){
		if(objImg.length>(currentPage+1)){
			currentPage++;	
			document.getElementById('lblpage').innerHTML=(currentPage+1);
			imgElem.setAttribute('src', "data:image/jpg;base64," + objImg[currentPage].pic);				
		}		
	}else if(event=='previous'){
		if(currentPage>0){
			console.log(currentPage);
			currentPage--;	
			console.log(currentPage);
			document.getElementById('lblpage').innerHTML=(currentPage+1);
			imgElem.setAttribute('src', "data:image/jpg;base64," + objImg[currentPage].pic);			
		}
	}else{// first initial display image from unit
		document.getElementById('lblpage').innerHTML=(currentPage+1);
		imgElem.setAttribute('src', "data:image/jpg;base64," + objImg[currentPage].pic);
	}
}