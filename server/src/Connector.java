import java.sql.*;
import java.io.*;
import java.util.*;

import item.Ingredient;

public class Connector {
	public static final String SUCCESSFUL = "1";
	public static final String FAILED = "0";
	public static final String SIGN_UP_USERNAME_CRASHED = "2";
	public static final String ADD_NEW_USERNAME_NOT_FOUND = "2";
	public static final String USER_APPROVED = "1";
	// Connection to the database. Kept open between calls.
/*
	private static final String host="sql5.freemysqlhosting.net";
	private static final String user_name="sql554902";
	private static final String port="3306";
	private static final String password="zX7%sW9!";
	private static final String database_name="sql554902";
*/

	private static final String host="localhost";
	private static final String user_name="thepigge";
	private static final String port="3306";
	private static final String password="d0ngleCherr!";
	private static final String database_name="thepigge_feedulator";

	
	public boolean isConnected;
	private String dburl;
	private Connection con;

	// Constructors
	public Connector(String url) {
		dburl = url;
		isConnected = false;
	}

	public Connector() {
		this("jdbc:mysql://"+host+":"+port+"/"+database_name);
	}

	public boolean Connect() {
		if (isConnected)
			return true;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection(dburl, user_name, password);
			isConnected = true;
		} catch (Exception e) {	
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Connection getConnect() {
		if (isConnected)
			return con;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			con = DriverManager.getConnection(dburl, user_name, password);
			isConnected = true;
		} catch (Exception e) {	
			e.printStackTrace();
			return null;
		}
		return con;
	}
	
	
	public void Disconnect() {
		if (!isConnected)
			return;
		try {
			con.close();
			isConnected = false;
		} catch (Exception e) {
		}
	}

	private synchronized ResultSet executeQuery(String query) {
		Connect();
		ResultSet output = null;
		if (!isConnected)
			return null;
		try {
			Statement stmt = con.createStatement();
			output = stmt.executeQuery(query);
		} catch (SQLException e) {
			output = null;
		}
		return output;
	}

	private synchronized boolean execute(String query) {
		Connect();
		boolean output = true;
		if (!isConnected)
			return false;
		try {
			Statement stmt = con.createStatement();
			stmt.execute(query);
		} catch (SQLException e) {
			e.printStackTrace();
			output = false;
		}
		Disconnect();
		return output;
	}

	private String EscapeString(String input) {
		String output = "";
		for (int i = 0; i < input.length(); i++) {
			int charvalue = (int) input.charAt(i);
			if ((charvalue >= 48 && charvalue <= 57)
					|| (charvalue >= 65 && charvalue <= 90)
					|| (charvalue >= 97 && charvalue <= 122)) {
				output += input.charAt(i);
			} else {
				output += "#" + String.valueOf(charvalue) + "#";
			}
		}
		return output;
	}

	private String UnescapeString(String input) {
		if (input == null)
			return "";
		String output = "";
		boolean converting = false;
		int charvalue = 0;
		for (int i = 0; i < input.length(); i++) {
			char curchar = input.charAt(i);
			if (!converting) {
				// looking at normal
				if (curchar == '#') {
					converting = true;
					continue;
				}
				output += curchar;
			} else {
				if (curchar == '#') {
					output += (char) charvalue;
					charvalue = 0;
					converting = false;
					continue;
				}
				charvalue *= 10;
				charvalue += Character.getNumericValue(curchar);
			}
		}
		return output;
	}

	private String ResultSetToString(ResultSet rs) {
		String output = "";
		if (rs == null) {
			// TODO
			Disconnect();
			return "";
		}
		try {
			boolean first = true;
			while (rs.next()) {
				if (!first) {
					//output = output + ":;:";
					output = output + ",\n";
				}
				int cols = rs.getMetaData().getColumnCount();
				for (int i = 1; i <= cols; i++) {
					if (i != 1)
						//output = output + ":;:";
						output = output + ":;:";
					output = output + UnescapeString(rs.getString(i));
				}
				first = false;
			}
			//output="{\n"+output+"\n}";
		} catch (SQLException e) {
			output = "";
			e.printStackTrace();
		}
		// TODO
		Disconnect();
		return output;
	}
	
	/* get */
	public String get_all_animal() {
		String query = "SELECT `value` FROM `Animal`;";
		//System.out.println("query: "+query);
		return ResultSetToString(executeQuery(query));
	}
	
	public String get_some_animal(String name) {
		String query = "SELECT `value` FROM `Animal` WHERE `name`= '"+name+"';";
		//System.out.println("query: "+query);
		return ResultSetToString(executeQuery(query));
	}
	
	public String get_all_ingredient() {
		String query = "SELECT `value` FROM `Ingredients`;";
		//System.out.println("query: "+query);
		return ResultSetToString(executeQuery(query));
	}

	public String get_some_ingredient(String name) {
		String query = "SELECT `value` FROM `Ingredients` WHERE `name`= '"+name+"';";
		//System.out.println("query: "+query);
		return ResultSetToString(executeQuery(query));
	}
	
	public String get_all_mixture() {
		String query = "SELECT `value` FROM `Mixture`;";
		//System.out.println("query: "+query);
		return ResultSetToString(executeQuery(query));
	}

	public String get_some_mixture(String name) {
		String query = "SELECT `value` FROM `Mixture` WHERE `name`= '"+name+"';";
		//System.out.println("query: "+query);
		return ResultSetToString(executeQuery(query));
	}
	
	/* post */
	
	public boolean post_create_animal(String name, String entity) {
		String query = "INSERT INTO `Animal` (`key`, `name`, `value`) VALUES (NULL, '"+name+"', '"+entity+"');";
		//System.out.println("query:"+query);

		return execute(query);
	}

	public boolean post_update_animal(String name, String entity) {
		String query = "UPDATE  `Animal` SET  `value` =  '" + entity+ "' WHERE  `Animal`.`name` = '"+ name+"';";
		System.out.println("query:"+query);
		return execute(query);
	}
	
	
	public boolean post_create_ingredient(String name, String entity) {
		String query = "INSERT INTO `Ingredients` (`key`, `name`, `value`) VALUES (NULL, '"+name+"', '"+entity+"');";
		//System.out.println("query:"+query);

		return execute(query);
	}

	public boolean post_update_ingredient(String name, String entity) {
		String query = "UPDATE  `Ingredients` SET  `value` =  '" + entity+ "' WHERE  `Ingredients`.`name` = '"+ name+"';";
		System.out.println("query:"+query);
		return execute(query);
	}
	
	public boolean post_create_mixture(String name, String entity) {
		String query = "INSERT INTO `Mixture` (`key`, `name`, `value`) VALUES (NULL, '"+name+"', '"+entity+"');";
		//System.out.println("query:"+query);

		return execute(query);
	}

	public boolean post_update_mixture(String name, String entity) {
		String query = "UPDATE  `Mixture` SET  `value` =  '" + entity+ "' WHERE  `Mixture`.`name` = '"+ name+"';";
		System.out.println("query:"+query);
		return execute(query);
	}

	/* delete */
	
	public boolean delete_animal(String name) {
		String query = "DELETE FROM  `Animal` WHERE  `Animal`.`name` ='"+ name+"';";
		//System.out.println("query:"+query);
		return execute(query);
	}
	
	public boolean delete_ingredient(String name) {
		String query = "DELETE FROM  `Ingredients` WHERE  `Ingredients`.`name` ='"+ name+"';";
		//System.out.println("query:"+query);
		return execute(query);
	}
	
	public boolean delete_mixture(String name) {
		String query = "DELETE FROM  `Mixture` WHERE  `Mixture`.`name` ='"+ name+"';";
		//System.out.println("query:"+query);
		return execute(query);
	}
	
	public String get_api() {
		String query = "SELECT value FROM  `API_List` WHERE  `name` =  'feedulator'";
		return ResultSetToString(executeQuery(query));
	}
	
	public static void main(String[] args){
		Connector c = new Connector();
		//System.out.println(c.get_all_ingredient());
		//c.insert_ingredient("test", "dddd");
	}

	
	
}
