
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EntityFactory {
	int in=0;
	private static final String NUTRIENT_QUERY_STRING="SELECT IngreWhole.IngreName, IngreDescri.name, IngreDescri.cost, IngreDescri.gmoFree, IngreDescri.description, IngreNutri.NutriName , IngreNutri.value,IngreNutri.unit,IngreConstrains .type, IngreConstrains.value FROM IngreDescri INNER JOIN IngreWhole ON IngreWhole.IngreDescri_idIngreDescri = IngreDescri.idIngreDescri INNER JOIN IngreNutri ON IngreDescri.idIngreDescri = IngreNutri.IngreDescri_idIngreDescri INNER JOIN IngreConstrains ON IngreConstrains.IngreDescri_idIngreDescri = IngreDescri.idIngreDescri WHERE idIngreWhole =1";
	private final String queryString;
    protected Connection connection;
    public EntityFactory(Connection connection, String queryString) {
        this.queryString = queryString;
        this.connection = connection;
    }

    public Map<String, Object> findSingle(Object[] params) throws SQLException {
        List<Map<String, Object>> objects = this.findMultiple(params);

        if (objects.size() != 1) {
            throw new SQLException("Query did not produce one object it produced: " + objects.size() + " objects.");
        }

        Map<String, Object> object = objects.get(0);  //extract only the first item;

        return object;
    }

    public List<Map<String, Object>> findMultiple(Object[] params) throws SQLException {
        ResultSet rs = null;
        PreparedStatement ps = null;
        try {
            ps = this.connection.prepareStatement(this.queryString);
            for (int i = 0; i < params.length; ++i) {
                ps.setObject(1, params[i]);
            }

            rs = ps.executeQuery();
           
            return getEntitiesFromResultSet(rs);
        } catch (SQLException e) {
            throw (e);
        } finally {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
        }
    }

    protected List<Map<String, Object>> getEntitiesFromResultSet(ResultSet resultSet) throws SQLException {
        ArrayList<Map<String, Object>> entities = new ArrayList<>();
        System.out.println("++++++++++++++++++++++++++");
        while (resultSet.next()) {
            entities.add(getEntityFromResultSet(resultSet));
        }
        return entities;
    }

    protected Map<String, Object> getEntityFromResultSet(ResultSet resultSet) throws SQLException {
        ResultSetMetaData metaData = resultSet.getMetaData();
        int columnCount = metaData.getColumnCount();
        Map<String, Object> resultsMap = new HashMap<>();
        for (int i = 1; i <= columnCount; ++i) {
            String columnName = metaData.getColumnName(i).toLowerCase();
        
            Object object = resultSet.getObject(i);
            //System.out.println("col "+in+" : "+columnName+"  ob:"+ object.toString());
            //in++;
            
            resultsMap.put(columnName, object);
        }
        return resultsMap;
    }
    public static void main(String[] args){
    	Connection connection = null;
    	Connector c = new Connector();
        try {
            connection = c.getConnect();
            EntityFactory nutrientEntityFactory = new EntityFactory(connection, NUTRIENT_QUERY_STRING);
            List<Map<String, Object>> nutrients = nutrientEntityFactory.findMultiple(new Object[]{});
            
            ObjectMapper mapper = new ObjectMapper();

            String json = mapper.writeValueAsString(nutrients);
            System.out.println(json);
			//response.setContentType("application/json;charset=UTF-8");
            //response.getWriter().write(json);
        } catch (SQLException | JsonProcessingException e) {
            //throw new ServletException(e);
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    //throw new ServletException(e);
                }
            }
        }
    }
    
}
