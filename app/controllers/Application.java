package controllers;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

import models.Record;
import play.*;
import play.mvc.*;
import views.html.type1;
import views.html.type2;
import views.html.test;


public class Application extends Controller {
	

    public static Result type1(String folder, String step1) {
    	
    	String graph_type = "line";
    	if(Integer.parseInt(folder) == 3)
    		graph_type = "scatter";
    	String generation_str = "generateGraphs_"+graph_type+"(\""+folder+"\")";
    	 
        return ok(type1.render(generation_str,step1, Integer.parseInt(folder)+1) );
    }
    
    public static Result type2(String folder, String step1, String step2){
    	return ok(type2.render(folder, step1, step2, Integer.parseInt(folder)+1, "line" ));
    
    }
    
    public static Result saveRecord(String collectionID, String query_s1, String query_s2) throws IOException{
    	
    	int nextCollectionId = Integer.parseInt(collectionID) + 1;
    	
    	Record curr = new Record(URLDecoder.decode(query_s1, "UTF-8"), URLDecoder.decode(query_s2, "UTF-8"), Integer.parseInt(session("id")),Integer.parseInt(collectionID));
    	curr.saveTofile();
    	
    	return ok();
    }
    
    public static Result start() throws IOException{
    	String id_str = Integer.toString(models.Record.getID());
    	session("id",id_str);
    	return redirect("/0");
    }
    
    public static Result seeID(){
    	return ok(test.render(session("id")));
    }
    
    public static Result test(String str){
    	return ok(test.render(str));
    }
    
    public static Result javascriptRoutes() {
        response().setContentType("text/javascript");
        return ok(
            Routes.javascriptRouter("myJsRoutes",
                routes.javascript.Application.saveRecord()
            
            )
        );
    }

}
