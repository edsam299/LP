var userapprove_idseries='';
var userapprove_idbasetext='';
var userapprove_idsutta='';
var userapprove_sname='';
var userapprove_btname='';
var userapprove_suttaname='';
var userapprove_status=["Linked","Publish"];

function showtable(){
	var urlParams = new URLSearchParams(location.search);
	
	userapprove_idseries=urlParams.get('idseries');
	userapprove_idbasetext=urlParams.get('idbasetext');
	userapprove_idsutta=urlParams.get('idsutta');
	userapprove_sname =urlParams.get('sname'); 
	userapprove_btname =urlParams.get('btname');
	userapprove_suttaname =urlParams.get('suttaname');
	var unitarray=[]; 
	var mapheader = new Map();
	var datapost=new Object();
	var url = linkprojecthostname+"/LinkingService/searchLinkgDB";
	var detailicon = '<i id="detailicon" onclick="showAllSuttaDetail();" class="fa fa-toggle-down" style="font-size:25px;color:grey"></i>';
	document.getElementById("showheading").innerHTML = '<table><tr><td>'+
		'<h5><b>'+userapprove_sname+"&gt;"+userapprove_btname+"&gt;"+userapprove_suttaname+"</b></h5></td><td>&nbsp;"+detailicon+'</td></tr></table>';
	var unitpattern="unit_tr_{seq}_{j}";
	var headerpattern = "h{level}-tr-{key}-{j}";
	var pic = "<td valign='center'><img src='./image/approve.png' width='25px' onclick=\"{event}\"></td>";
	datapost.flag = 5;
	datapost.h3fcrid =userapprove_idsutta;
	getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(rsunit){
//	getData(url, "GET", false, 'application/json','', function(rsunit){
		unitarray=rsunit.rows;
		alert(rsunit.rows.length);
		datapost.flag = 6;
		url = linkprojecthostname+"/LinkingService/searchLinkgDB";
		getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(rsheader){
			var headerarray = rsheader.rows;
			setmapheader(headerarray,function(mapheader0){
				mapheader = mapheader0;
				var maxlevel = mapheader.get("maxlevel");
				var startlevel=4; var tmpstr='';
				var tmphtml = '<table border=1 id="maintable" class="w3-table w3-striped w3-bordered" width=100%>';
				tmphtml=tmphtml+'<thead>'+
				'<tr class="w3-theme">'+
				  '<th width=10%>Unit</th><th width=5%>&nbsp;</th>'+
				  '<th width=20%>Status</th>'+
				  '<th width=65%>Description</th>';
				for(var j=startlevel;j<=maxlevel;j++){
					if(maxlevel-j==0){
						tmphtml=tmphtml+'<th>Section</th>';
					}
					if(maxlevel-j==1){
						tmphtml=tmphtml+'<th>H5</th>';
					}
					if(maxlevel-j==2){
						tmphtml=tmphtml+'<th>H6</th>';
					}
					if(maxlevel-j==3){
						tmphtml=tmphtml+'<th>H7</th>';
					}
				}
				tmphtml=tmphtml+'</tr>'+
				'</thead>'+
				'<tbody>';
				for(var j=0;j<unitarray.length;j++){
					tmphtml=tmphtml+'<tr>';
					tmpstr=unitpattern.replace("{seq}",unitarray[j].seq);
					tmpstr=tmpstr.replace("{j}",j);
					tmphtml=tmphtml+'<td contenteditable="true" lpvalue="'+unitarray[j].unit+'" id="'+tmpstr+'">'+unitarray[j].unit+"</td>";
					tmphtml=tmphtml+pic.replace("{event}","gotoUnit('"+unitarray[j].unit+"','"+userapprove_idsutta+"',"+unitarray[j].seq+");");
					tmphtml=tmphtml+'<td>'+userapprove_status[unitarray[j].status]+"</td>";
					tmphtml=tmphtml+'<td>'+unitarray[j].content+"</td>";
					for(var k=startlevel;k<=maxlevel;k++){
						tmpstr = headerpattern.replace("{level}",k);
						tmpstr = tmpstr.replace("{key}",(unitarray[j]["h"+k].length==0?'':unitarray[j]["h"+k]));
						tmpstr = tmpstr.replace("{j}",j);
						tmpstr1=(unitarray[j]["h"+k].length==0?'':mapheader.get(unitarray[j]["h"+k]));
						tmphtml=tmphtml+'<td contenteditable="true" id="'+tmpstr+'" lpvalue="'+tmpstr1+'">'+tmpstr1+"</td>";
					}
					tmphtml=tmphtml+'</tr>';
				}
				tmphtml=tmphtml+'<tr>';
				tmphtml=tmphtml+"</tbody>";
				tmphtml=tmphtml+"</table>";
				document.getElementById("userapprovetable_left").innerHTML=tmphtml;
				for(var j=0;j<unitarray.length;j++){
					tmpstr=unitpattern.replace("{seq}",unitarray[j].seq);
					tmpstr=tmpstr.replace("{j}",j);
					console.log(tmpstr);
					document.getElementById(tmpstr).addEventListener('mouseout', function() {
						editUnit(this.id,this.innerHTML, this.getAttribute("lpvalue"));
					});
					for(var k=startlevel;k<=maxlevel;k++){
						tmpstr = headerpattern.replace("{level}",k);
						tmpstr = tmpstr.replace("{key}",(unitarray[j]["h"+k].length==0?'':unitarray[j]["h"+k]));
						tmpstr = tmpstr.replace("{j}",j);
						document.getElementById(tmpstr).addEventListener('mouseout', function() {
							editHeader(this.id,this.innerHTML, this.getAttribute("lpvalue"));

						},true);
					}
				}
			});
		});
	});
	function setmapheader(headerarray,cb){
		var tmpkey='';
		var maxlevel=0;
		for(var i=0;i<headerarray.length;i++){
			if(maxlevel<parseInt(headerarray[i].level)){
				maxlevel = parseInt(headerarray[i].level);
			}
			tmpkey=headerarray[i]["h"+headerarray[i].level];
			console.log(tmpkey);
			if(mapheader.has(tmpkey)==false){
				mapheader.set(tmpkey,headerarray[i].content);
			}
		}
		mapheader.set("maxlevel",maxlevel );
		cb(mapheader);
	}
	function editUnit(id,now,old){
		if(now!=old){
			var tmparr = id.split("_");//["unit","tr","seq","j"]
			var seq = tmparr[2];
			var index= parseInt(tmparr[3]);
			datapost.flag = 1;
			datapost.unit=now;
			datapost.seq = seq;
			datapost.h3fcrid= userapprove_idsutta;
			url = linkprojecthostname+"/LinkingService/manageLP";
			alert(url);
			getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(answerunit){
				tmpstr='';
				if(answerunit){
					alert(true);
					unitarray[index].unit=now;
					tmpstr=now;
				}else{
					tmpstr=old;
				}
				document.getElementById(id).innerHTML=tmpstr;
				document.getElementById(id).setAttribute("lpvalue",tmpstr);
			});
		}
	}
	function editHeader(id,now,old){
		console.log(id);
		if(now!=old){
			var tmparr = id.split("-");//["hx","tr","key","j"]
			//url= linkprojecthostname+"/manageLPHeader/"+idsutta+"/1/"+now+"/"+tmparr[0].replace("h","")+"/"+tmparr[2];
		    datapost.flag = 2;
		    datapost.h3fcrid= userapprove_idsutta;
		    datapost.content=now;
	        datapost.level=tmparr[0].replace("h","");
	        datapost.hlevel=tmparr[2];	
			url = linkprojecthostname+"/LinkingService/manageLP";
			alert(url);
			getData(url, "POST", false, 'application/json',JSON.stringify(datapost), function(answerunit){	
				tmpstr='';
				if(answerunit){
					mapheader.set(tmparr[2],now);
					tmpstr=now;

				}else{
					tmpstr=old;
				}
				var tdlist = document.getElementById("maintable").getElementsByTagName("td");
				var tmpstr=''; 
				var tmparr1=[];
				for(var i=0;i<tdlist.length;i++){
					if(tdlist[i].hasAttribute("id")){
						tmpstr = tdlist[i].getAttribute("id");
						console.log(tmpstr);
						if(tmpstr.indexOf("unit")==-1){
							tmparr1 = tmpstr.split("-");
							if(tmparr1[2]==tmparr[2]){
								document.getElementById(tmpstr).innerHTML=now;
								document.getElementById(tmpstr).setAttribute("lpvalue",now);
							}
						}
					}
				}

			});
		}
	}
}
function showAllSuttaDetail(){
	alert("showwwww");
}
function gotoUnit(unitnumber,h3,seq){
	alert(seq);
	window.location.href='userapprovecontent.jsp?idseries='+userapprove_idseries+'&idbasetext='+userapprove_idbasetext+
	'&idsutta='+userapprove_idsutta+
	'&sname='+userapprove_sname+'&btname='+userapprove_btname+'&suttaname='+userapprove_suttaname+
	'&seq='+seq+'&unit='+unitnumber;
}
function referenceFootnote(ftn){
    var trlist = document.getElementsByTagName("tr");
    var tdlist, strhtml, strid, rownumber=-1, columnnumber=-1, arrfcrid;
    alert(ftn+" | "+trlist.length);
    strid = 'id="ft'+ftn+'"';
    for(var sk=0; sk<trlist.length;sk++){
        tdlist = trlist[sk].getElementsByTagName("td");
        for(var ks=0;ks<tdlist.length;ks++){
            strhtml = tdlist[ks].innerHTML;
            if(strhtml.indexOf(strid)!=-1){
                rownumber=sk; columnnumber=ks;
                break;
            }
        }
    }
    if(rownumber!=0 && columnnumber!=0){
        tdlist = trlist[rownumber-1].getElementsByTagName("td");
        strid =tdlist[columnnumber].getAttribute("fcrid");
        arrfcrid = strid.split(",");
        console.log(arrfrcrid.toString);
    }
}