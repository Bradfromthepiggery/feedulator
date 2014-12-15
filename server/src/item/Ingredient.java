package item;

import java.util.ArrayList;
import java.util.HashMap;

public class Ingredient {
	private int ing_id;
	private String name;
	private String supplier;
	private float cost;
	private String gmoFree;
	private HashMap<String, ArrayList<String>> nutrient;
	private String description;
	private HashMap<String, String> constraints;
	public Ingredient(){
		
	}
	public int getid(){
		return ing_id;
	}
	public void setid(int id){
		ing_id=id;
	}
	public String getName(){
		return name;
	}
	public void setName(String name){
		this.name=name;
	}
	public String getSupplier(){
		return supplier;
	}
	public void setSupplier(String s){
		supplier=s;
	}
	public float getCost(){
		return cost;
	}
	public void setCost(float cost){
		this.cost=cost;
	}
	public String getGMO(){
		return this.gmoFree;
	}
	public void setGMO(String s){
		this.gmoFree=s;
	}
	public HashMap<String, ArrayList<String>> getNutrient(){
		return nutrient;
	}
	public void insertNutrient(String name, String value, String unit){
		if(nutrient==null){
			nutrient=new HashMap<String, ArrayList<String>>();
		}
		ArrayList<String> arr=new ArrayList<String>();
		arr.add(value);
		arr.add(unit);
		nutrient.put(name, arr);
	}
	public String getDescription(){
		return this.description;
	}
	public void setDescription(String s){
		this.description=s;
	}
	public HashMap<String, String> getConstraints(){
		return this.constraints;
	}
	public void insertConstraints(String type, String value){
		if(constraints==null){
			constraints=new HashMap<String, String>();
		}
		constraints.put(type, value);
	}
	

	/*
	public static String changeArrayDateToJson(ArrayList<Stone> stoneList){  
        try {  
            JSONArray array = new JSONArray();  
            JSONObject object = new JSONObject();  
            int length = stoneList.size();  
            for (int i = 0; i < length; i++) {  
                Stone stone = stoneList.get(i);  
                String name = stone.getName();  
                String size = stone.getSize();  
                JSONObject stoneObject = new JSONObject();  
                stoneObject.put("name", name);  
                stoneObject.put("size", size);  
                array.put(stoneObject);  
            }  
            object.put("stones", array);  
            return object.toString();  
        } catch (JSONException e) {  
            e.printStackTrace();  
        }  
        return null;  
    } 
    */ 
}
