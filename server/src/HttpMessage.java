import java.io.UnsupportedEncodingException;
import java.util.Map;


public abstract class HttpMessage
{
	private HttpVersion version;
	private byte[] entity = null;
	private Map<String, String> headers;
	
	
	public HttpVersion getHttpVersion()
	{
		return version;
	}

	public Map<String, String> getHeaders()
	{
		return headers;
	}

	public byte[] getEntity()
	{
		return entity;
	}

	public HttpVersion getVersion()
	{
		return version;
	}

	public void setVersion(HttpVersion version)
	{
		this.version = version;
	}

	public void setEntity(byte[] entity)
	{
		this.entity = entity;
	}

	public boolean containEntity(){
		return entity!=null;
	}
	
	public void setHeaders(Map<String, String> headers)
	{
		this.headers = headers;
	}
	
	public String getEntity_toString(){
		
		String result="";
		try {
			
			result=new String(entity, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			System.out.println("fail");
			result=null;
		}
		
		return result;
	}
	
}

