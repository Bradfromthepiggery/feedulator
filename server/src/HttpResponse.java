import java.util.Map;

public class HttpResponse
{
	HttpStatusCode statusCode;
	String content;
	private HttpVersion version;
	private Map<String, String> headers;
	private HttpMethod method;

	public void setMethod(HttpMethod m){
		method=m;
	}
	
	
	public Map<String, String> getHeaders()
	{
		return headers;
	}
	
	public void setHeaders(Map<String, String> headers)
	{
		this.headers = headers;
	}


	public HttpStatusCode getStatusCode()
	{
		return statusCode;
	}

	public void setStatusCode(HttpStatusCode statusCode)
	{
		this.statusCode = statusCode;
	}

	public String getContent()
	{
		return content;
	}	

	public void setContent(String content)
	{
		this.content=new String(content);
	}

	public HttpVersion getVersion()
	{
		return version;
	}


	public void setVersion(HttpVersion version)
	{
		this.version = version;
	}
	public HttpMethod getMethod() {
		// TODO Auto-generated method stub
		return method;
	}
	

}
