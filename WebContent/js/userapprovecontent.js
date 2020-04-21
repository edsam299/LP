var userapprovecontent_idseries='';
var userapprovecontent_idbasetext='';
var userapprovecontent_idsutta='';
var userapprovecontent_sname='';
var userapprovecontent_btname='';
var userapprovecontent_suttaname='';
var userapprovecontent_seq='';
var userapprovecontent_unit='';
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
					}
				});
			}			
		}else{
			console.log(sk1);
		}
	});
	
}