function generateClassTree(titleatt,superatt,classOrProp){
	classTree={"plugins": ["search", "types","sort","state","wholerow"],"search": {"case_sensitive": false,"show_only_matches": true}, "core": { "data" :[]}}
    if(classOrProp){
	    classTree["core"]["data"].push({ "id" : "http://www.w3.org/2002/07/owl#Thing", "icon" : "https://raw.githubusercontent.com/protegeproject/protege/master/protege-editor-owl/src/main/resources/Classes.gif", "parent":"#", "text" : "owl:Thing" })
    }else{
		classTree["core"]["data"].push({ "id" : "http://www.w3.org/2002/07/owl#Thing", "icon" : "https://raw.githubusercontent.com/protegeproject/protege/master/protege-editor-owl/src/main/resources/OWLObjectProperty.gif", "parent":"#", "text" : "owl:Thing" })
    }
	var counter=0;
	//console.log($('#ontview').contents())
	//console.log($('#ontview').contents().find('.type-c'))
	//console.log($('#ontview').contents().find(' h3 > sup[title="class"]'))
	$('#ontview').contents().find(' h3 > sup[title="'+titleatt+'"]').each(function() {
		////console.log($(this))
		if(counter>0){
		var id=$(this).parent().parent().attr("id");
		////console.log(id)
		var parentcls="";
		////console.log("Superclasses")
		if(!(id.startsWith("4")) 
			&& $(this).parent().length>0 
		    && $(this).parent().parent().length>0 
		    && $(this).parent().parent().children('dl').length>0 
            && $(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').length>0
            && $(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').next().length>0
            && $(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').next().children("a").length>0
        ){
			sup=$(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').next().children("a")
			if(sup.length!=0){
			$(this).parent().parent().children('dl').children('dt:contains("'+superatt+'")').next().children("a").each(function(){
			console.log($(this))
			if(!($(this).attr("href").startsWith("4"))){
				parentcls=$(this).attr("href").substring($(this).attr("href").indexOf('#')+1)
				//console.log($(this).attr("href"));
			}
		});
			}else if(
			    $(this).parent().length>0 
			    && $(this).parent().parent().length>0 
			    && $(this).parent().parent().children('div').length>0 
			    && $(this).parent().parent().children('div').children('dl').length>0 
                && $(this).parent().parent().children('div').children('dl').children('dt:contains("'+superatt+'")').length>0
                && $(this).parent().parent().children('div').children('dl').children('dt:contains("'+superatt+'")').next().length>0
                && $(this).parent().parent().children('div').children('dl').children('dt:contains("'+superatt+'")').next().children("a").length>0
                ){
					$(this).parent().parent().children('div').children('dl').children('dt:contains("'+superatt+'")').next().children("a").each(function(){
                            console.log($(this))
                    if(!($(this).attr("href").startsWith("4"))){
                        parentcls=$(this).attr("href").substring($(this).attr("href").indexOf('#')+1)
                        //console.log($(this).attr("href"));
			}
		});
			}
        if(typeof id !== 'undefined' && typeof parentcls !== 'undefined'){
		if(parentcls==""){
			parentcls="#"
		}
		
		////console.log(superclasslist[0])
		//var topush={ "id" : id,parent:
		if(id.includes('#')){
			var textt=id.substring(id.lastIndexOf('#')+1)
		}else{
			var textt=id.substring(id.lastIndexOf('/')+1)
		}
		
		if(classOrProp){
	        classTree["core"]["data"].push({ "id" : id, "parent":parentcls,"icon" : "https://raw.githubusercontent.com/protegeproject/protege/master/protege-editor-owl/src/main/resources/Classes.gif", "text" : textt })
        }else{
            classTree["core"]["data"].push({ "id" : id, "parent":parentcls,"icon" : "https://raw.githubusercontent.com/protegeproject/protege/master/protege-editor-owl/src/main/resources/OWLObjectProperty.gif", "text" : textt })
        }
		
		//console.log(classTree["core"]["data"])
		}
		}
		}
		counter++;
		
	});
	//console.log(classTree)
	return classTree;
}