
public enum HttpMethod
{
	OPTIONS,
	HEAD,
	GET,
	POST,
	PUT,
	DELETE;

	@Override
	public String toString()
	{
		return this.name();
	}

	/**
	 * Extracts the HTTP method from the header line.
	 * 
	 * @param headerLine HTTP request header line
	 * @return the HTTP method 
	 * @throws IllegalArgumentException
	 */
	public static HttpMethod extractMethod(String headerLine) throws IllegalArgumentException
	{
		String method = headerLine.split(" ")[0];
		if (method != null)
		{
			return HttpMethod.valueOf(method);
		}
		else
		{
			throw new IllegalArgumentException();
		}
	}
}
