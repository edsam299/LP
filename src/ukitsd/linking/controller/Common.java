package ukitsd.linking.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Common {
	String hostrestful="http://localhost:8082";
//	String hostrestful="http://10.190.0.57:8082";
	public String searchConfigLinking(String value) throws IOException {
		URL url =null; HttpURLConnection conn =null; BufferedReader br=null; StringBuilder sb=null;
		String returnValue =""; String output=null;
		JsonObject jsonObject=null;
		System.out.println(" url -> "+hostrestful+"/searchconfig/"+value);
		try{
			url = new URL(hostrestful+"/searchconfig/"+value);
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");
			
			if (conn.getResponseCode() != 200) {
				returnValue= "";
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}else {
				br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF8"));
				sb=new StringBuilder();
				while((output = br.readLine())!=null) {
					sb.append(output);
				}
				System.out.println(sb.toString());
				jsonObject = new JsonParser().parse(sb.toString()).getAsJsonObject();
				System.out.println(jsonObject.get("rows").getAsJsonArray().get(0).getAsJsonObject().get("detail").getAsJsonObject().get("originalfilepath"));
				returnValue = jsonObject.get("rows").getAsJsonArray().get(0).getAsJsonObject().get("detail").getAsJsonObject().get("originalfilepath").getAsString();
				//returnValue=new JsonParser().parse(sb.toString()).getAsJsonObject().get("detail").
			}
			System.out.println("ttttt ->"+returnValue);
			return returnValue;
		}catch(Exception e) {
			e.printStackTrace();
			return returnValue;
		}finally {
			url =null; 
			if(conn!=null) {
				conn.disconnect(); conn=null;
			}
			if(br!=null) {
				br.close(); br=null;
			}
			sb=null; output=null;
			returnValue = null; jsonObject=null;
		}
	}
}
