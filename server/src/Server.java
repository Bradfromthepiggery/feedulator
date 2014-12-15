
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/* Server - Server
 * Multithreaded server that listens to port 80
 * waiting connection of client
 *  
 */
public class Server {
	public static final String SERVER_NAME = "Feedulator_Server";
	public static final String SERVER_VERSION = "1.1";
	public static final int DEFAULT_PORT = 8011;
	public static final String SERVER_SIGNATURE = SERVER_NAME + "/" + SERVER_VERSION;

	private volatile boolean running = false;
	public static Object lock = new Object();

	private final ExecutorService workerPool;
	private final ExecutorService dispatcherService;
	private final ServerSocket serverSocket;
	private static final boolean CACHE=true;
	
	int i=0;

	public Server()
	{
		this(Server.DEFAULT_PORT);
	}
	
	/**
	 * Creates a new HTTP server bound to the given port.
	 * 
	 * @param port
	 *            listening port
	 * @throws IOException
	 */
	public Server(int port)
	{
		try
		{
			serverSocket = new ServerSocket(port);
			workerPool = Executors.newFixedThreadPool(1000);
			dispatcherService = Executors.newSingleThreadExecutor();
			if(CACHE) Cache.getInstance().ini();
		}
		catch (IOException e)
		{
			throw new RuntimeException("Error while starting server", e);
		}

	}

	public void dispatchRequest(Socket socket)
	{
		workerPool.submit(new HttpProcesser(socket, this));
	}


	public void start()
	{
		
		running = true;
		// Initiate the main server loop accepting incoming connections.
		dispatcherService.submit(new Runnable()
		{
			@Override
			public void run()
			{
				while (running)
				{
					try
					{
						System.out.println("======"+i+++"=======");
						Socket socket = serverSocket.accept();
						dispatchRequest(socket);
						
					}
					catch (SocketException e)
					{
						// ignore due to close signaling
					}
					catch (IOException e)
					{
						e.printStackTrace();
					}
				}
			}
		});
	}

	public void stop()
	{
		try
		{
			running = false;
			dispatcherService.shutdown();
			workerPool.shutdown();
			serverSocket.close();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
		finally
		{
			System.err.println("Webserver stopped.");
		}
	}

	public String getServerSignature()
	{
		return Server.SERVER_SIGNATURE;
	}

	public static void main(String[] agrs) {
		
		Server p;
		if(agrs.length<1){
			System.out.println("connect to default port");
			p=new Server();
		}else{
			System.out.println("connect to port "+agrs[0]);
			p=new Server(Integer.parseInt(agrs[0]));
		}
		p.start();
	}
}
