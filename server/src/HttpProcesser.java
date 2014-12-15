

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.json.JsonReader;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;


public class HttpProcesser extends Processor
{
	public HttpProcesser(Socket socket, Server server)
	{
		super(socket, server);
	}
	
	@Override
	protected HttpRequest parseRequest(InputStream inputStream) throws IOException
	{
		
		String firstLine = readLine(inputStream);
		
		HttpRequest request = new HttpRequest();
		request.setVersion(HttpVersion.extractVersion(firstLine));
		request.setRequestUri(firstLine.split(" ", 3)[1]);
		request.setMethod(HttpMethod.extractMethod(firstLine));

		Map<String, String> headers = new HashMap<String, String>();

		String nextLine = "";
		while (!(nextLine = readLine(inputStream)).equals(""))
		{
			String values[] = nextLine.split(":", 2);
			headers.put(values[0], values[1].trim());
		}
		request.setHeaders(headers);
		
		if (headers.containsKey(Http.CONTENT_LENGTH))
		{
			
			int size = Integer.parseInt(headers.get(Http.CONTENT_LENGTH));
			byte[] data = new byte[size];
			int n;
			for (int i = 0; i < size && (n = inputStream.read()) != -1; i++)
			{
				data[i] = (byte) n;
			}
			request.setEntity(data);
		}
		else
		{
			request.setEntity(null);
		}
		return request;
	}

	@Override
	protected HttpResponse handleRequest(HttpRequest request)
	{
		HttpResponse response = new HttpResponse();
		response.setHeaders(new HashMap<String, String>());
		response.getHeaders().put(Http.SERVER, server.getServerSignature());
		
		response.getHeaders().put(Http.ACCESS_CONTROL_ALLOW_ORIGIN, "*");
		response.setVersion(request.getHttpVersion());
		response.setMethod(request.getHttpMethod());
		
		String requestUri = request.getRequestUri();
		HttpMethod method = request.getHttpMethod();
		if(method==HttpMethod.OPTIONS){
			response.getHeaders().put(Http.ACCESS_CONTROL_REQUEST_HEADER, request.getHeaders().get(Http.ACCESS_CONTROL_REQUEST_HEADER));
		}
		String requestEntity = null;
		
		if(request.containEntity()){
			requestEntity = request.getEntity_toString();
			System.out.println("entities:"+ request.getEntity_toString());
		}
		System.out.println("Method: "+method.toString());
		System.out.println("Url: "+ requestUri);
		

		Command command = new Command(method, requestUri.substring(1), requestEntity);
		String[] output = command.getOutput();
		System.out.println(output[0]);
		
		if(output[0]==Command.INTERNAL_SERVER_ERROR)
		{
			response.setStatusCode(HttpStatusCode.INTERNAL_SERVER_ERROR);
		}
		else if(output[0]==Command.NOT_FOUND)
		{
			response.setStatusCode(HttpStatusCode.NOT_FOUND);

		}
		else if(output[0]==Command.SUCCESS)
		{
			response.setStatusCode(HttpStatusCode.OK);
			response.setContent(output[1]);
		}
		else if(output[0]==Command.INPUT_ERROR)
		{
			response.setStatusCode(HttpStatusCode.BAD_REQUEST);
		}
		else
		{
			response.setStatusCode(HttpStatusCode.NO_CONTENT);
		}
		return response;
	}

	@Override
	protected void sendResponse(HttpResponse response, OutputStream outputStream) throws IOException
	{
		
		//BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(System.out));
		BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream));

		writer.write(response.getVersion().toString());
		writer.write(' ');
		writer.write("" + response.getStatusCode().getCode());
		writer.write(' ');
		writer.write(response.getStatusCode().getReasonPhrase());
		
		writer.write(Http.CRLF);

		if(response.getMethod()==HttpMethod.OPTIONS){
			writer.write("Access-Control-Allow-Origin: "+ response.getHeaders().get("Access-Control-Allow-Origin")+ Http.CRLF);
			writer.write("Access-Control-Allow-Methods: GET, POST, DELETE"+ Http.CRLF);
			writer.write("Access-Control-Allow-Headers: "+ response.getHeaders().get("Access-Control-Request-Headers")+ Http.CRLF);
			writer.write("Content-Type: text/html; charset=utf-8"+ Http.CRLF);
		}
		else{
		
			if (response.getContent() != null && response.getContent().length() > 0)
			{
				response.getHeaders().put(Http.CONTENT_LENGTH, "" + response.getContent().length());
			}
			else
			{
				response.getHeaders().put(Http.CONTENT_LENGTH, "" + 0);
			}
	
			if (response.getHeaders() != null)
			{
				for (String key : response.getHeaders().keySet())
				{
					writer.write(key + ": " + response.getHeaders().get(key) + Http.CRLF);
				}
			}
			writer.write(Http.CRLF);
			
			if (response.getContent() != null && response.getContent().length() > 0)
			{
				writer.write(response.getContent());
			}
		}
		
		writer.flush();
		
		
	}

	
	@Override
	protected boolean keepAlive(HttpRequest request, HttpResponse response)
	{
		return false;
	}

}
