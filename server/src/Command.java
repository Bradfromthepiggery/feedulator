
public class Command {
		
	public static final String INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
	public static final String INPUT_ERROR = "INPUT_ERROR";
	public static final String NOT_FOUND = "NOT_FOUND";
	public static final String NO_CONTENT = "NO_CONTENT";
	public static final String SUCCESS = "SUCCESS";
	
	public static final String INGREDIENT = "component";
	public static final String FEEDULATOR = "feedulator";
	public static final String ANIMAL = "animal";
	public static final String MIXTURE = "mixture";
	public static final String ALL = "all";
	public static final String CREATE = "new";

	String s;
	String entity;
	HttpMethod method;
	Connector c;
	
	public Command(HttpMethod m, String command, String entity) {
		s = command;
		method = m;
		this.entity = trim(entity);
		c = new Connector();
	}
	
	

	public String[] getOutput(){
		
		String [] temp;
		String[] return_result=new String[2];
		return_result[1] = "";
		System.out.println("command: "+s);
		temp = s.split("/");
		if(temp.length==1 && temp[0].equals(FEEDULATOR)){
			get_api(return_result);
			return return_result;
		}else if(temp.length==3 && temp[0].equals(FEEDULATOR)){
			temp[0]=temp[1];
			temp[1]=temp[2];
		}else{
			input_error(return_result);
			return return_result;
		}
		
		//////////////////////User/////////////////////////

		
		if(method==HttpMethod.OPTIONS){
				options_return(return_result);
			
		}else if(method==HttpMethod.POST)
		{
			synchronized (Server.lock) {
				
				if(temp[0].equals(ANIMAL))
				{
					post_animal(temp[1], entity, return_result);
				}
				else if(temp[0].equals(INGREDIENT))
				{
	
					post_ingredient(temp[1], entity, return_result);
				}
				else if(temp[0].equals(MIXTURE))
				{
	
					post_mixture(temp[1], entity, return_result);
				}
				else
				{
					input_error(return_result);
				}
			}
		}
		else if(method==HttpMethod.DELETE)
		{
			synchronized (Server.lock) {
				
				if(temp[0].equals(ANIMAL))
				{
					delete_animal(temp[1], return_result);
				}
				else if(temp[0].equals(INGREDIENT))
				{
	
					delete_ingredient(temp[1], return_result);
				}
				else if(temp[0].equals(MIXTURE))
				{
	
					delete_mixture(temp[1], return_result);
				}
				else
				{
					input_error(return_result);
				}
			}
		}
		else if(method==HttpMethod.HEAD)
		{
			
		}
		else if(method==HttpMethod.GET)
		{
			if(temp[0].equals(ANIMAL))
			{
				get_animal(temp[1], return_result);
			}
			else if(temp[0].equals(INGREDIENT))
			{
				get_ingredient(temp[1], return_result);
			}
			else if(temp[0].equals(MIXTURE))
			{
				get_mixture(temp[1], return_result);
			}
			else
			{
				input_error(return_result);
			}
		}
		else if(method==HttpMethod.PUT)
		{
			
		}
		//////////////////////Default/////////////////////////
		else {
			return_result[1] = "Nothing is being requested.";
		}
		
		wrap_output(return_result);
		
		return return_result;
		
	}

	private void options_return(String[] return_result) {
		return_result[0]=SUCCESS;
		//return_result[1]="Access-Control-Allow-Methods: GET, POST, DELETE \n Content-Type: text/html; charset=utf-8";

	}



	private void get_api(String[] return_result) {
		// TODO Auto-generated method stub
		return_result[1] = c.get_api();
		if(return_result[1]==null || return_result[1].length()==0)
		{
			return_result[0]=NOT_FOUND;
		}
		else
		{
			return_result[0]=SUCCESS;
		}
	}



	private void wrap_output(String[] return_result) {
		if(return_result[1]==null || return_result[1].length()==0) return;
			
		return_result[1]="{\n"+return_result[1].trim()+"\n}";
	}
	
	private String trim(String entity) {
		if(entity==null) return null;
		String s=entity.trim();
		return s.substring(1, s.length()-1);
	}

	//=======================delete=============================
	
	private void delete_ingredient(String name, String[] return_result) {
		
		boolean operate=false;
		if(Cache.hasCache)
		{
			Cache.getInstance().delete(name);
		}
		operate = c.delete_ingredient(name);
		if(operate)
		{
			return_result[0] = SUCCESS;
		}
		else
		{
			return_result[0] = INTERNAL_SERVER_ERROR;
		}
	}

	private void delete_animal(String name, String[] return_result) {
		boolean operate=false;
		
		operate = c.delete_animal(name);
		if(operate)
		{
			return_result[0] = SUCCESS;
		}
		else
		{
			return_result[0] = INTERNAL_SERVER_ERROR;
		}
		
	}
	
	private void delete_mixture(String name, String[] return_result) {
		boolean operate=false;
		
		operate = c.delete_mixture(name);
		if(operate)
		{
			return_result[0] = SUCCESS;
		}
		else
		{
			return_result[0] = INTERNAL_SERVER_ERROR;
		}
		
	}
	
	//=======================post=============================

	private void post_animal(String com, String entity2,
			String[] return_result) {
		boolean operate=false;
		if(com.equals(CREATE))
		{
			String name = getName(entity);
			
			operate = c.post_create_animal(name, entity);
			
		}
		else
		{
			operate = c.post_update_animal(com, entity);
		}
		
		if(operate)
		{
			return_result[0] = SUCCESS;
		}
		else
		{
			return_result[0] = INTERNAL_SERVER_ERROR;
		}
		
	}

	private void post_ingredient(String com, String entity,
			String[] return_result) {
		boolean operate=false;
		if(com.equals(CREATE))
		{
			String name = getName(entity);
			//System.out.println(name + "\n"+entity);
			if(Cache.hasCache)
			{
				Cache.getInstance().insert(name, entity);
			}
			operate = c.post_create_ingredient(name, entity);
		}
		else
		{
			if(Cache.hasCache)
			{
				Cache.getInstance().update(com, entity);
			}
			operate = c.post_update_ingredient(com, entity);
		}
		
		if(operate)
		{
			return_result[0] = SUCCESS;
		}
		else
		{
			return_result[0] = INTERNAL_SERVER_ERROR;
		}
		
	}
	
	private void post_mixture(String com, String entity2,
			String[] return_result) {
		boolean operate=false;
		if(com.equals(CREATE))
		{
			String name = getName(entity);
			
			operate = c.post_create_mixture(name, entity);
		}
		else
		{
			operate = c.post_update_mixture(com, entity);
		}
		
		if(operate)
		{
			return_result[0] = SUCCESS;
		}
		else
		{
			return_result[0] = INTERNAL_SERVER_ERROR;
		}
		
	}
	

	//=======================get=============================

	

	private void get_animal(String com, String[] return_result) {
		if(com.equals(ALL))
		{
			
			return_result[1] = c.get_all_animal();
			
		}
		else
		{
			
			return_result[1] = c.get_some_animal(com);
			
		}
		if(return_result[1]==null || return_result[1].length()==0)
		{
			return_result[0]=NOT_FOUND;
		}
		else
		{
			return_result[0]=SUCCESS;
		}
	}

	private void get_ingredient(String com, String[] return_result) {
		
		if(com.equals(ALL))
		{
			if(Cache.hasCache){
				return_result[1] = Cache.getInstance().getContent();
			}
			else
			{
				return_result[1] = c.get_all_ingredient();
			}
		}
		else
		{
			if(Cache.hasCache)
			{
				return_result[1]= Cache.getInstance().getValue(com);
				
			}
			else
			{
				return_result[1] = c.get_some_ingredient(com);
			}
		}
		if(return_result[1]==null || return_result[1].length()==0)
		{
			return_result[0]=NOT_FOUND;
		}
		else
		{
			return_result[0]=SUCCESS;
		}
	}
	
	private void get_mixture(String com, String[] return_result) {
		if(com.equals(ALL))
		{
			return_result[1] = c.get_all_mixture();
		}
		else
		{	
			return_result[1] = c.get_some_mixture(com);
		}
		if(return_result[1]==null || return_result[1].length()==0)
		{
			return_result[0]=NOT_FOUND;
		}
		else
		{
			return_result[0]=SUCCESS;
		}
	}
	
	private void input_error(String[] return_result) {
		return_result[0]=INPUT_ERROR;
		return_result[1]=null;
	}
	
	
	private String getName(String entity) {
		int first=0;
		int second=0;
		first=entity.indexOf("\"");
		second=entity.substring(first+1).indexOf("\"")+first+1;
		return entity.substring(first+1, second);
	}
}
