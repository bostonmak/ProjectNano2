package web;

import org.apache.http.*;
import org.apache.http.config.SocketConfig;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.bootstrap.HttpServer;
import org.apache.http.impl.bootstrap.ServerBootstrap;
import org.apache.http.protocol.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class WebServer {
    private static Logger logger = LoggerFactory.getLogger(WebServer.class);

    private boolean active = true;
    private HttpService httpService;
    private HttpContext context;
    private HttpServerConnection conn;
    private HttpProcessor httpproc;
    private HttpRequestHandler myRequestHandler;
    private UriHttpRequestHandlerMapper handlerMapper;

    public WebServer() {
        httpproc = HttpProcessorBuilder.create()
                .add(new ResponseDate())
                .add(new ResponseServer("MyServer-HTTP/1.1"))
                .add(new RequestContent())
                .add(new RequestConnControl())
                .build();

        myRequestHandler = new HttpRequestHandler() {
            public void handle(HttpRequest request, HttpResponse response, HttpContext context) throws HttpException, IOException {
                response.setStatusCode(HttpStatus.SC_OK);
                response.setEntity(new StringEntity("Server Status: ONLINE", ContentType.APPLICATION_JSON));
            }
        };
    }

    public void start() {
        SocketConfig socketConfig = SocketConfig.custom()
                .setSoTimeout(15000)
                .setTcpNoDelay(true)
                .build();

        final HttpServer server = ServerBootstrap.bootstrap()
                .setListenerPort(8000)
                .setHttpProcessor(httpproc)
                .setSocketConfig(socketConfig)
                .registerHandler("/health", myRequestHandler)
                .create();

        try {
            server.start();
            logger.info("WebServer started on port 8000.");
            server.awaitTermination(Long.MAX_VALUE, TimeUnit.DAYS);

            Runtime.getRuntime().addShutdownHook(new Thread() {
                @Override
                public void run() {
                    server.shutdown(5, TimeUnit.SECONDS);
                }
            });
        } catch (Exception e) {

        }
    }
}
