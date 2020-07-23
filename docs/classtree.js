
function generateClassTree(titleatt,superatt){
	classTree={"plugins": ["search", "types","sort","state","wholerow"],"search": {"case_sensitive": false,"show_only_matches": true}, "core": { "data" :[]}}
	classTree["core"]["data"].push({ "id" : "http://www.opengis.net/ont/geosparql#Feature", "parent":"#", "text" : "Feature" })
	classTree["core"]["data"].push({ "id" : "Enumeration", "parent":"http://www.opengis.net/ont/geosparql#Feature", "text" : "Enumeration" })
	var counter=0;
	console.log($('#ontview').contents())
	console.log($('#ontview').contents().find('.type-c'))
	console.log($('#ontview').contents().find(' h3 > sup[title="class"]'))
	$('#ontview').contents().find(' h3 > sup[title="'+titleatt+'"]').each(function() {
		//console.log($(this))
		if(counter>0){
		var id=$(this).parent().parent().attr("id");
		//console.log(id)
		var parentcls="";
		//console.log("Superclasses")
		if(!(id.startsWith("4"))){
			sup=$(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').next().children("a")
			if(sup.length!=0){
			$(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').next().children("a").each(function(){
			console.log($(this))
			if(!($(this).attr("href").startsWith("4"))){
				parentcls=$(this).attr("href").substring($(this).attr("href").indexOf('#')+1)
				//console.log($(this).attr("href"));
			}
		});
			}else{
					$(this).parent().parent().children('div').children('dl').children('dt:contains("'+superatt+'")').next().children("a").each(function(){
			console.log($(this))
			if(!($(this).attr("href").startsWith("4"))){
				parentcls=$(this).attr("href").substring($(this).attr("href").indexOf('#')+1)
				//console.log($(this).attr("href"));
			}
		});
			}

		if(parentcls==""){
			parentcls="#"
		}
		
		//console.log(superclasslist[0])
		//var topush={ "id" : id,parent:
		classTree["core"]["data"].push({ "id" : id, "parent":parentcls, "text" : id.substring(id.lastIndexOf('#')+1) })
		console.log(classTree["core"]["data"])
		}
		}
		counter++;
		
	});
	console.log(classTree)
	return classTree;
}