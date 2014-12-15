
public class HttpRequest extends HttpMessage
{
	
	HttpMethod method;
	String requestUri;

	public HttpMethod getHttpMethod()
	{
		return method;
	}

	public String getRequestUri()
	{
		return requestUri;
	}

	public HttpMethod getMethod()
	{
		return method;
	}

	public void setMethod(HttpMethod method)
	{
		this.method = method;
	}

	public void setRequestUri(String requestUri)
	{
		this.requestUri = requestUri;
	}
}
