var userapprovecontent_idseries='';
var userapprovecontent_idbasetext='';
var userapprovecontent_idsutta='';
var userapprovecontent_sname='';
var userapprovecontent_btname='';
var userapprovecontent_suttaname='';
var userapprovecontent_seq='';
var userapprovecontent_unit='';
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
	var datapost=new Object();
	var url = linkprojecthostname+"/LinkingService/searchLinkgDB";
	datapost.flag=7;
	datapost.h3fcrid= userapprovecontent_idsutta;
	datapost.unit = userapprovecontent_unit;
	url = linkprojecthostname+"/LinkingService/searchLinkgDB";
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk1){
		if(sk1.success){
			var detailunit = sk1.rows;
			console.log(detailunit);
			if(detailunit.length>0){
				var header =["","","",""]; //h4,h5,h6,h7
				var headername =["","","",""]; //h4,h5,h6,h7
				header[0] = detailunit[0]["h4"];
				header[1] = detailunit[0]["h5"];
				header[2] = detailunit[0]["h6"];
				header[3] = detailunit[0]["h7"];
				datapost.flag=6;
				getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk2){
					if(sk2.success){
						var detailheader = sk2.rows;
						console.log(detailheader);
						for(var u=0; u<detailheader.length;u++){
							if(detailheader[u]["level"]==4 && header[0].length!=0){
								if(detailheader[u]["h4"]==header[0]){
									headername[0] = detailheader[u]["content"];
								}
							}
							if(detailheader[u]["level"]==5 && header[1].length!=0){
								if(detailheader[u]["h5"]==header[1]){
									headername[1] = detailheader[u]["content"];
								}
							}
							if(detailheader[u]["level"]==6 && header[2].length!=0){
								if(detailheader[u]["h6"]==header[2]){
									headername[2] = detailheader[u]["content"];
								}
							}
							if(detailheader[u]["level"]==7 && header[3].length!=0){
								if(detailheader[u]["h7"]==header[3]){
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
						btnUserapprovePredeunit(header,function(pdeunit){
							document.getElementById("btnUserapprovePredeunit").innerHTML= pdeunit;
						});
						
						document.getElementById('btnpdfde').addEventListener('click', function() {
							popPreDeUnit();
						});
						document.getElementById('btnpdfde').click();
					}
				});
			}			
		}else{
			console.log(sk1);
		}
	});
	function btnUserapprovePredeunit(header,cb){
		var pdeunit="Pre De Unit:&nbsp;";
		var level = '';
		var key = '';
		for(var s=0;s<header.length;s++){
			if(header[0].length!=0){
				level=4; key=header[0];
				break;
			}
			if(header[1].length!=0){
				level=5; key=header[1];
				break;
			}
			if(header[2].length!=0){
				level=6; key=header[2];
				break;
			}
			if(header[3].length!=0){
				level=7; key=header[3];
				break;
			}
		}
		datapost.flag=8;
		datapost.level= level;
		datapost.key=key;
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(sk3){
			if(sk3.success){
				var sk3row=sk3.rows;
				pdeunit = pdeunit+sk3row[0].unit+(sk3row.length>1?"-"+sk3row[sk3row.length-1].unit:"");
			}
		});
		cb(pdeunit);
	}
}
function popPreDeUnit(){
	var datapost=new Object();
	var url = linkprojecthostname+"/LinkingService/searchLinkgDB";
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
							console.log(obj)
							objImg=obj.rows;
							nextprevoius('first');
						}
					});
				}
			});
		}
	});
}

document.getElementById("nextpage").addEventListener('click', function(){
	nextprevoius('next');
});
document.getElementById("previous").addEventListener('click', function(){
	nextprevoius('previous');
});

function nextprevoius(event){
	let imgElem=document.getElementById('displayimg');
	if(event=='next'){
		if(objImg.length>currentPage){
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
	}else{
		document.getElementById('lblpage').innerHTML=(currentPage+1);
		imgElem.setAttribute('src', "data:image/jpg;base64," + objImg[currentPage].pic);
	}
}