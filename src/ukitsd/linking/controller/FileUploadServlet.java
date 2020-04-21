package ukitsd.linking.controller;
 
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.tomcat.util.json.JSONParser;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
 
@WebServlet("/FileUploadServlet")
@MultipartConfig(fileSizeThreshold=1024*1024*10, 	// 10 MB 
                 maxFileSize=1024*1024*50,      	// 50 MB
                 maxRequestSize=1024*1024*100)   	// 100 MB
public class FileUploadServlet extends HttpServlet {
	
    private static final long serialVersionUID = 205242440643911308L;
	
    /**
     * Directory where uploaded files will be saved, its relative to
     * the web application directory.
     */
    private static final String UPLOAD_DIR = "uploads";
     
    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
    	PrintWriter out=null;
    	 // gets absolute path of the web application
        String applicationPath=null;
        // constructs path of the directory to save uploaded file
        String uploadFilePath=null;
     // creates the save directory if it does not exists
        File fileSaveDir =null;String fileName = null;
        JsonObject json = new JsonObject();
        Common common = null;
    	try {
    		out = response.getWriter();
    		common = new Common();
    		applicationPath = request.getServletContext().getRealPath("");
    		//uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;
    		uploadFilePath = common.searchConfigLinking("importfile");
    		fileSaveDir = new File(uploadFilePath);
    		if (!fileSaveDir.exists()) {
                fileSaveDir.mkdirs();
            }
    		System.out.println("Upload File Directory="+fileSaveDir.getAbsolutePath());
    		for(Part part:request.getParts()) {
            	fileName = getFileName(part);
                System.out.println("line 61 "+fileName);
                if(fileName.indexOf(".pdf")==-1) {
                	json.addProperty("idmlfile", fileName);
                }else {
                	json.addProperty("pdffile", fileName);
                }
                part.write(uploadFilePath + File.separator + fileName);
            }
    		json.addProperty("success", true);
    		json.addProperty("pathfile", uploadFilePath);
            out.print(json);
    	}catch(Exception ex) {
    		ex.printStackTrace();
    		json.addProperty("success", false);
            out.print(json);
    	}finally {
    		applicationPath=null;uploadFilePath=null;fileSaveDir =null;fileName = null;
    		common=null;
    	}
    }
    
    
    /**
     * Utility method to get file name from HTTP header content-disposition
     */
    private String getFileName(Part part) {
        String contentDisp = null;       
        String[] tokens = null;
        try {
        	System.out.println("content-disposition header= "+contentDisp);
            contentDisp = part.getHeader("content-disposition");
            System.out.println("content-disposition header= "+contentDisp);
            tokens = contentDisp.split(";");
            for (String token : tokens) {
                if (token.trim().startsWith("filename")) {
                    return token.substring(token.indexOf("=") + 2, token.length()-1);
                }
            }
            return "";
        }catch(Exception e) {
        	return null;
        }finally {
            contentDisp = null;       
            tokens = null;
        }
    }
}