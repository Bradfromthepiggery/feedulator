import java.util.Hashtable;
import java.util.Stack;


public class Cache {
	public static boolean hasCache=false;
	private String content;
	private Hashtable<String, String> map;
	private static Cache instance = null;
    private Cache() { }
 
    public static Cache getInstance() {
        if (instance == null) {
            synchronized (Cache.class) {
                if (instance == null) {
                    instance = new Cache();
                }
            }
        }
        return instance;
    }
    
    public void ini(){
    	Connector c=new Connector();
    	content="";
    	content = c.get_all_ingredient();
    	
    	makeMap(content);
    	//System.out.println(content);
    	content=update_content();
 
    	hasCache=true;
    }
    
    public String getContent(){
    	
    	return content;
    }
    public static void remove(){
    	hasCache = false;
    	instance = null;
    }
    
    public boolean hasMap(){
    	return map==null;
    }
    
    public String getValue(String name){
    	if(!map.containsKey(name)) return null;
    	return map.get(name);
    }
    
    public void insert(String name, String value){
    	map.put(name, value);
    	content=update_content();
    }
    
    private String update_content() {
		String tmp="";
		for(String value: map.values()){
			tmp="\n" + tmp + value + ",";
		}
		
		tmp=tmp.substring(0, tmp.length()-1);
		return tmp;
	}

	public void update(String name, String value){
    	if(!map.containsKey(name)) return;
    	map.put(name, value);
    	content=update_content();
    }
    
    public void delete(String name){
    	if(!map.containsKey(name)) return;
    	map.remove(name);
    	content=update_content();
    }
    
    private String removeother(String input){
    	int first=-1;
    	for(int i=0;i<input.length();i++){
    		if(input.charAt(i)=='"'){
    				first=i;
    				break;
    		}
    	}
    	return input.substring(first);
    }
    
    private String makename(String name){
    	int first=0;
		int second=0;
		first=name.indexOf("\"");
		second=name.substring(first+1).indexOf("\"")+first+1;
		return name.substring(first+1, second);
    }
    
    private void makeMap(String input){
    	map = new Hashtable<>();
    	Stack<Integer> st = new Stack<>();
    	boolean first = true;
    	String tmp="";
    	int i=0;
    	while(i<input.length()){
    		tmp="";
    		while(input.charAt(i)!='{'){
    			
    			tmp+=input.charAt(i);
    			i++;
    			if(i==input.length()) return;
    		}
    		String name=tmp;
    		name=makename(name);
    		//System.out.println(name);
    		tmp+=input.charAt(i);
    		i++;
    		st.push(1);
    		while(!st.isEmpty()){
    			tmp+=input.charAt(i);
    			char c=input.charAt(i);
    			if(c=='{') st.push(1);
    			if(c=='}') st.pop();
    			i++;
    		}
    		tmp=removeother(tmp);
    		//System.out.println(name);
    		map.put(name, tmp);
    	}
    	return;
    }
}
