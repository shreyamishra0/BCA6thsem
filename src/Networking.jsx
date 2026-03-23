import { useState } from "react";

const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Client-Server & Java Network Features",
    badge: "Assignment 1 + Lab 1",
    color: "#1A237E",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Client-Server Application Model — In-depth Architecture",
        content: [
          { type: "definition", text: "Client-Server Model: An architectural pattern where computing tasks are divided between two roles — a Client (the requester) and a Server (the provider). The server passively listens for incoming requests on a well-known port. The client actively initiates a connection, sends a request, waits for the response, and uses it. They communicate over a network using a shared protocol." },
          { type: "analogy", text: "Think of a restaurant. The CUSTOMER (Client) walks in, reads the menu, and places an order. The WAITER carries the order to the KITCHEN (Server). The kitchen prepares the food and the waiter delivers it back. The customer never knows how the food is prepared — they only interact through the defined protocol (the menu and waiter). The kitchen can serve many customers at once." },
          { type: "diagram", text: `
┌─────────────────────────────────────────────────────────────────────┐
│                     CLIENT-SERVER ARCHITECTURE                       │
│                                                                      │
│  CLIENT MACHINE                       SERVER MACHINE                 │
│  ┌──────────────────┐   Request  ──►  ┌──────────────────────────┐  │
│  │                  │   (TCP/IP)       │                          │  │
│  │  User Application│                 │  Server Application      │  │
│  │  (Browser, Java  │   ◄──  Response │  (Tomcat, Java Server)  │  │
│  │   App, Mobile)   │                 │                          │  │
│  └──────────────────┘                 └──────────────────────────┘  │
│         │                                        │                   │
│  Client Socket                         ServerSocket (binds port)     │
│  Uses random port                       Uses fixed well-known port   │
│  (e.g., 54321)                         (e.g., 80, 443, 8080)       │
│                                                                      │
│  CLIENT RESPONSIBILITIES:          SERVER RESPONSIBILITIES:          │
│  1. Initiate connection             1. Passively wait (listen)       │
│  2. Send request data               2. Accept incoming connections   │
│  3. Wait for response               3. Process request               │
│  4. Process and display result      4. Send back response            │
│  5. Close connection                5. Handle multiple clients       │
└─────────────────────────────────────────────────────────────────────┘

CONNECTION PROCESS (TCP 3-Way Handshake):
  Client                           Server
    │── SYN (I want to connect) ──►│
    │◄── SYN-ACK (OK, I accept) ──│
    │── ACK (acknowledged) ────────►│
    │       [Connection Established] │
    │── REQUEST DATA ───────────────►│
    │◄── RESPONSE DATA ─────────────│
    │── FIN (I am done) ────────────►│
    │◄── FIN-ACK ────────────────────│` },
          { type: "table", headers: ["Aspect", "Client", "Server"],
            rows: [
              ["Role", "Requests a service", "Provides a service"],
              ["Connection", "Initiates (ACTIVE) — calls connect()", "Waits and accepts (PASSIVE) — calls accept()"],
              ["Port", "Uses a random ephemeral port (assigned by OS)", "Uses a well-known FIXED port (e.g., 80 for HTTP)"],
              ["Java class", "java.net.Socket", "java.net.ServerSocket"],
              ["Count", "Many clients connect simultaneously", "Typically one server per service"],
              ["Knowledge", "Must know server's IP and port", "Must only know which port to listen on"],
              ["Examples", "Chrome browser, Java HTTP client, curl", "Apache Tomcat, Nginx, custom Java server"],
            ]
          },
          { type: "heading", text: "Types of Client-Server Architecture" },
          { type: "table", headers: ["Tier", "Description", "Example", "Pros/Cons"],
            rows: [
              ["1-Tier", "Client and server on the same machine", "Desktop app with embedded database", "+ Fast. – Not distributable"],
              ["2-Tier", "Client communicates directly with server", "Java Swing app → MySQL server", "+ Simple. – Server overloaded, poor scalability"],
              ["3-Tier", "Client → Application Server → Database Server", "Browser → Tomcat → MySQL", "+ Scalable, separation of concerns. – More complex"],
              ["N-Tier", "Multiple middleware layers between client and backend", "Browser → Load Balancer → App → Cache → DB", "+ Highly scalable, fault-tolerant. – Complex to deploy"],
            ]
          },
          { type: "heading", text: "Peer-to-Peer vs Client-Server" },
          { type: "table", headers: ["Feature", "Client-Server", "Peer-to-Peer (P2P)"],
            rows: [
              ["Control", "Centralized — server is in charge", "Decentralized — all nodes are equal"],
              ["Roles", "Fixed: client always requests, server always provides", "Dynamic: each node is both client AND server"],
              ["Scalability", "Limited by server capacity", "Scales naturally as nodes join"],
              ["Reliability", "Single point of failure (server goes down → all fail)", "Fault-tolerant — no single point of failure"],
              ["Examples", "HTTP, FTP, email", "BitTorrent, Blockchain, Skype (original)"],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Features of Network Programming & Scope of Utilization",
        content: [
          { type: "definition", text: "Network Programming: Writing programs that communicate with other programs over a network. It involves sockets (endpoints), protocols (TCP/UDP), and APIs (java.net.*) to send/receive streams of bytes between processes on different machines." },
          { type: "heading", text: "Key Features of Network Programming" },
          { type: "table", headers: ["Feature", "Description", "Java Support"],
            rows: [
              ["Socket Communication", "A socket is an endpoint for communication. It uniquely identifies a process on a machine via IP:Port pair. Programs read/write data through sockets just like files.", "java.net.Socket, ServerSocket"],
              ["Protocol Independence", "Programs can choose TCP (reliable, ordered) or UDP (fast, unordered) based on needs. Higher-level protocols (HTTP, FTP) run on top of TCP.", "Socket (TCP), DatagramSocket (UDP)"],
              ["IP Addressing", "Every machine has an IP address. Every running process uses a port (0-65535). Together, IP:Port uniquely identifies a communication endpoint.", "InetAddress, Inet4Address, Inet6Address"],
              ["Concurrency", "Servers handle many clients simultaneously using threads, thread pools, or non-blocking I/O so one slow client doesn't block others.", "Threads, ExecutorService, NIO Selector"],
              ["Platform Independence", "Java's JVM abstracts OS-level socket differences. Same code runs on Windows (HANDLE), Linux (fd), macOS without change.", "JVM — Write Once, Run Anywhere"],
              ["Security", "SSL/TLS encrypts communication. Certificates verify identity. Java supports secure sockets natively via javax.net.ssl.*.", "SSLSocket, SSLServerSocket, HTTPS"],
              ["High-Level APIs", "URL and URLConnection let you do HTTP without raw sockets — much simpler for web communication.", "URL, URLConnection, HttpURLConnection"],
              ["Multicasting", "Send ONE packet to a GROUP of receivers simultaneously. More efficient than individual copies.", "MulticastSocket, DatagramPacket"],
              ["Non-Blocking I/O", "Single thread can monitor and serve thousands of connections using event-driven model.", "Selector, Channel, ByteBuffer (NIO)"],
            ]
          },
          { type: "heading", text: "Scope of Utilization (Applications)" },
          { type: "bullets", items: [
            "**Web Applications**: Every HTTP request from a browser to a server is network programming. Java servlets, REST APIs, Spring Boot — all built on it.",
            "**Chat & Messaging Systems**: WhatsApp, Slack, Discord use persistent TCP socket connections for real-time bidirectional messaging.",
            "**File Transfer**: FTP, SFTP, BitTorrent — all transfer files over TCP sockets (or UDP for P2P).",
            "**Remote Procedure Call (RMI/gRPC)**: Call methods on objects on another machine as if they were local.",
            "**Email Systems**: SMTP (send), POP3/IMAP (receive) — email clients communicate with mail servers over TCP sockets.",
            "**Distributed Systems & Microservices**: Individual services communicate over the network using REST APIs, message queues, or RPC.",
            "**Online Gaming**: Real-time multiplayer games use UDP for low-latency game state updates, TCP for reliable events (chat, kills).",
            "**IoT (Internet of Things)**: Sensors send small data packets to cloud servers using lightweight protocols like MQTT over TCP/UDP.",
            "**Banking & Finance**: High-frequency trading, real-time stock feeds use ultra-low-latency TCP or UDP multicast.",
          ]},
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Features of Java for Network Programming",
        content: [
          { type: "explain", text: "Java was designed from the ground up with networking in mind. The phrase 'The Network is the Computer' was a core Java design philosophy from 1995. Java provides a rich set of built-in libraries that make network programming straightforward while hiding OS-level complexity." },
          { type: "heading", text: "Why Java is Ideal for Network Programming" },
          { type: "bullets", items: [
            "**Platform Independence**: Java's JVM abstracts OS socket differences. On Windows, a socket is a HANDLE. On Linux, it's a file descriptor. Java's Socket class wraps both — your code stays identical on all platforms.",
            "**Rich Built-in API**: java.net.* provides everything from low-level raw sockets (Socket, ServerSocket, DatagramSocket) to high-level HTTP clients (URLConnection, HttpURLConnection).",
            "**Built-in Threading**: java.lang.Thread and java.util.concurrent make concurrent servers (handle multiple clients) straightforward.",
            "**Serialization**: java.io.ObjectOutputStream/ObjectInputStream let you send entire Java objects over the network as byte streams.",
            "**Security**: javax.net.ssl.* provides SSLSocket and SSLServerSocket for encrypted TLS connections without external libraries.",
            "**NIO for Scalability**: java.nio.* provides non-blocking I/O with Selectors and Channels — one thread can handle thousands of connections.",
          ]},
          { type: "table", headers: ["Java Feature", "Package", "What it does"],
            rows: [
              ["Socket", "java.net", "TCP client socket — connects to a server, reads/writes data"],
              ["ServerSocket", "java.net", "TCP server socket — listens on a port, accepts client connections"],
              ["DatagramSocket", "java.net", "UDP socket — send/receive datagram packets (connectionless)"],
              ["MulticastSocket", "java.net", "UDP multicast — send one packet to a group of receivers"],
              ["InetAddress", "java.net", "Represents an IP address. DNS lookup, reverse lookup, type checking."],
              ["NetworkInterface", "java.net", "Represents a NIC — inspect name, MAC address, IPs, MTU"],
              ["URL", "java.net", "Uniform Resource Locator — parse and open connections to URLs"],
              ["URLConnection", "java.net", "Abstract connection to a URL — read headers and content"],
              ["HttpURLConnection", "java.net", "HTTP-specific — set method (GET/POST), read status codes"],
              ["SSLSocket / SSLServerSocket", "javax.net.ssl", "Encrypted TLS/SSL sockets for secure communication"],
              ["SocketChannel / ServerSocketChannel", "java.nio.channels", "Non-blocking TCP channel for NIO-based servers"],
              ["Selector", "java.nio.channels", "Monitor multiple channels with ONE thread (event-driven)"],
              ["ByteBuffer", "java.nio", "Data container for NIO — buffer for reading/writing channel data"],
            ]
          },
          { type: "code", label: "Lab 1 — InetAddress & NetworkInterface",
            lines: [`import java.net.*;
import java.util.*;

public class Lab1Demo {
    public static void main(String[] args) throws Exception {
        // DNS lookup
        InetAddress addr = InetAddress.getByName("www.tiktok.com");
        System.out.println("Host Name  : " + addr.getHostName());
        System.out.println("IP Address : " + addr.getHostAddress());
        System.out.println("Is IPv4?   : " + (addr instanceof Inet4Address));

        // All IPs for a CDN site
        InetAddress[] all = InetAddress.getAllByName("www.tiktok.com");
        for (InetAddress a : all) System.out.println("  " + a.getHostAddress());

        // Enumerate ALL Network Interfaces
        Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
        while (interfaces != null && interfaces.hasMoreElements()) {
            NetworkInterface ni = interfaces.nextElement();
            System.out.println("Interface: " + ni.getName() + " | " + ni.getDisplayName());
            System.out.println("  Is Up: " + ni.isUp() + " | MTU: " + ni.getMTU());
            byte[] mac = ni.getHardwareAddress();
            if (mac != null) {
                StringBuilder m = new StringBuilder("  MAC: ");
                for (int i = 0; i < mac.length; i++) {
                    m.append(String.format("%02X", mac[i]));
                    if (i < mac.length - 1) m.append("-");
                }
                System.out.println(m);
            }
            Enumeration<InetAddress> addrs = ni.getInetAddresses();
            while (addrs.hasMoreElements()) {
                InetAddress a = addrs.nextElement();
                System.out.println("  IP: " + a.getHostAddress() +
                    " (" + (a instanceof Inet4Address ? "IPv4" : "IPv6") + ")");
            }
        }
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u2",
    title: "Unit 2 — InetAddress, NetworkInterface & URL/URI",
    badge: "Assignment 2 + Lab 2",
    color: "#1B5E20",
    sections: [
      {
        qnum: "Q1",
        qtitle: "InetAddress Class — Deep Dive with All Methods",
        content: [
          { type: "definition", text: "InetAddress: A Java class (java.net.InetAddress) that represents an Internet Protocol (IP) address — either IPv4 (32-bit, 4 bytes) or IPv6 (128-bit, 16 bytes). It combines a hostname with its corresponding IP address. It is an abstract class — instances are actually Inet4Address or Inet6Address objects. DNS lookup is performed by its factory methods." },
          { type: "heading", text: "How DNS Lookup Works Inside InetAddress" },
          { type: "diagram", text: `
  Your Java Program                          DNS Server
       │                                          │
       │── InetAddress.getByName("google.com") ───►│
       │                                          │
       │   JVM checks local DNS cache             │
       │   JVM checks /etc/hosts file             │
       │   JVM sends DNS query to DNS server ─────►│
       │                                          │ Looks up "google.com"
       │◄─── Returns: 142.250.195.36 ─────────────│ in zone records
       │                                          │
       │ Creates Inet4Address object              │
       │ with hostname + IP stored                │
       ▼                                          │

  InetAddress stores TWO things:
    1. hostname  → "google.com"     (human-readable)
    2. IP address → 142.250.195.36  (machine-readable)` },
          { type: "heading", text: "Factory Methods — How to Create InetAddress Objects" },
          { type: "table", headers: ["Method", "Description", "Throws"],
            rows: [
              ["getByName(host)", "DNS lookup: hostname → IP. Also accepts IP string directly.", "UnknownHostException"],
              ["getAllByName(host)", "Returns ALL IP addresses for a hostname. CDN sites may have many.", "UnknownHostException"],
              ["getLocalHost()", "Returns the IP of the machine running this Java program.", "UnknownHostException"],
              ["getLoopbackAddress()", "Returns the loopback address — 127.0.0.1 (IPv4) or ::1 (IPv6). Never does DNS lookup.", "None"],
              ["getByAddress(byte[])", "Create InetAddress from raw byte array. 4 bytes for IPv4, 16 for IPv6.", "UnknownHostException"],
            ]
          },
          { type: "heading", text: "Address Type Identification — isXxx() Methods" },
          { type: "table", headers: ["Method", "Returns true for", "IP range"],
            rows: [
              ["isLoopbackAddress()", "Loopback interface — self-communication", "127.0.0.0/8 (IPv4), ::1 (IPv6)"],
              ["isSiteLocalAddress()", "Private LAN addresses — not routable on internet", "10.x.x.x, 172.16-31.x.x, 192.168.x.x"],
              ["isLinkLocalAddress()", "Auto-assigned when DHCP fails (APIPA)", "169.254.0.0/16 (IPv4), fe80::/10 (IPv6)"],
              ["isMulticastAddress()", "Multicast group addresses — for one-to-many", "224.0.0.0 – 239.255.255.255"],
              ["isAnyLocalAddress()", "Wildcard: 'all local addresses' — used by servers to listen on all NICs", "0.0.0.0 (IPv4), :: (IPv6)"],
              ["isReachable(timeout)", "Host responds within timeout ms (like ping)", "Any address"],
            ]
          },
          { type: "heading", text: "Inet4Address vs Inet6Address" },
          { type: "table", headers: ["Aspect", "Inet4Address", "Inet6Address"],
            rows: [
              ["Address length", "32 bits = 4 bytes", "128 bits = 16 bytes"],
              ["Address format", "Dotted decimal: 192.168.1.1", "Colon-hexadecimal: 2001:0db8:85a3::8a2e:0370:7334"],
              ["Total addresses", "~4.3 billion (exhausted since 2011)", "340 undecillion = 3.4 × 10³⁸"],
              ["Loopback", "127.0.0.1", "::1"],
              ["Check in Java", "addr instanceof Inet4Address", "addr instanceof Inet6Address"],
            ]
          },
          { type: "code", label: "InetAddressMethods.java — All creation, getter & type methods",
            lines: [`import java.net.*;

public class InetAddressMethods {
    public static void main(String[] args) throws Exception {
        // DNS lookup by hostname
        InetAddress byName   = InetAddress.getByName("www.google.com");
        InetAddress localhost = InetAddress.getLocalHost();
        InetAddress loopback = InetAddress.getLoopbackAddress();

        System.out.println("getHostName()          : " + byName.getHostName());
        System.out.println("getHostAddress()       : " + byName.getHostAddress());
        System.out.println("toString()             : " + byName.toString());

        // Raw bytes
        byte[] rawBytes = byName.getAddress();
        System.out.print("getAddress() raw       : [");
        for (int i = 0; i < rawBytes.length; i++)
            System.out.print((rawBytes[i] & 0xFF) + (i < rawBytes.length-1 ? ", " : ""));
        System.out.println("]");

        // Type checks
        String[] testAddresses = {"127.0.0.1","192.168.1.100","224.0.0.1","8.8.8.8"};
        for (String addrStr : testAddresses) {
            InetAddress a = InetAddress.getByName(addrStr);
            System.out.printf("%-20s loopback=%-5b sitLocal=%-5b multicast=%-5b IPv4=%-5b%n",
                addrStr, a.isLoopbackAddress(), a.isSiteLocalAddress(),
                a.isMulticastAddress(), a instanceof Inet4Address);
        }

        // Multiple IPs for CDN host
        System.out.println("\\nAll IPs for www.amazon.com:");
        for (InetAddress a : InetAddress.getAllByName("www.amazon.com"))
            System.out.println("  " + a.getHostAddress() +
                " (" + (a instanceof Inet4Address ? "IPv4" : "IPv6") + ")");
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "NetworkInterface Class — Complete Guide",
        content: [
          { type: "definition", text: "NetworkInterface: A Java class (java.net.NetworkInterface) representing a network interface card (NIC) installed in the machine. A NIC is the physical or virtual hardware that connects a computer to a network. Every NIC has: a system name (eth0, wlan0), a display name, one or more IP addresses, and optionally a MAC (hardware) address." },
          { type: "heading", text: "Factory Methods" },
          { type: "table", headers: ["Factory Method", "Description"],
            rows: [
              ["getByName(\"eth0\")", "Get interface by OS name. Linux: eth0, wlan0, lo. Windows: eth0 or GUID-style name."],
              ["getByIndex(1)", "Get interface by numeric OS-assigned index."],
              ["getByInetAddress(ip)", "Get the interface that has a specific IP address assigned to it."],
              ["getNetworkInterfaces()", "Get Enumeration of ALL interfaces on the machine."],
            ]
          },
          { type: "heading", text: "Instance Methods" },
          { type: "table", headers: ["Method", "Return Type", "Description"],
            rows: [
              ["getName()", "String", "Short OS name: 'eth0', 'wlan0', 'lo'"],
              ["getDisplayName()", "String", "Human-readable name: 'Intel Wi-Fi 6 AX200'"],
              ["getInetAddresses()", "Enumeration<InetAddress>", "All IP addresses (both IPv4 and IPv6) assigned to this NIC"],
              ["getHardwareAddress()", "byte[]", "MAC address as 6 bytes. NULL for loopback and virtual adapters."],
              ["getMTU()", "int", "Max Transmission Unit (typically 1500 bytes)"],
              ["isUp()", "boolean", "Is this interface currently active and connected?"],
              ["isLoopback()", "boolean", "Is this the loopback interface (127.0.0.1)?"],
              ["isVirtual()", "boolean", "Is this a virtual sub-interface?"],
              ["supportsMulticast()", "boolean", "Can this interface send/receive multicast packets?"],
            ]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "URL, URI & URLEncoder — Complete Guide",
        content: [
          { type: "definition", text: "URL (Uniform Resource Locator): A reference that identifies a specific resource on the internet and specifies HOW to access it. It includes the protocol (how), host (where), port, path, query, and fragment. Every valid URL is also a URI." },
          { type: "definition", text: "URI (Uniform Resource Identifier): A broader concept than URL. It just identifies a resource — not necessarily telling you how to access it. A URN like 'urn:isbn:0-486-27557-4' is a URI but NOT a URL." },
          { type: "diagram", text: `
URL ANATOMY:
  https://user:pass@www.example.com:8080/path/page.html?q=java&lang=en#section2
  │──────│ │───────│ │──────────────│ │──│ │──────────│ │─────────────│ │──────│
  protocol userinfo      host        port     path           query       fragment

  getProtocol()   → "https"
  getUserInfo()   → "user:pass"
  getHost()       → "www.example.com"
  getPort()       → 8080
  getPath()       → "/path/page.html"
  getQuery()      → "q=java&lang=en"
  getRef()        → "section2"
  getFile()       → "/path/page.html?q=java&lang=en"  (path + query combined)
  getAuthority()  → "user:pass@www.example.com:8080"` },
          { type: "table", headers: ["Aspect", "URL", "URI"],
            rows: [
              ["Full form", "Uniform Resource LOCATOR", "Uniform Resource IDENTIFIER"],
              ["Purpose", "Specifies PROTOCOL + LOCATION of a resource", "Just uniquely IDENTIFIES a resource"],
              ["Scope", "Subset of URI — all URLs are URIs", "Broader — includes URLs and URNs"],
              ["Network access", "url.openStream(), url.openConnection()", "Cannot open connections directly"],
              ["URI operations", "No resolve() or normalize()", "uri.resolve(relative), uri.normalize()"],
            ]
          },
          { type: "code", label: "URLPartsDemo.java — URL, URI, URLEncoder/Decoder",
            lines: [`import java.net.*;

public class URLPartsDemo {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://user:pass@www.example.com:8080/docs/page.html?q=java&lang=en#ch2");

        System.out.println("getProtocol()  : " + url.getProtocol());   // https
        System.out.println("getHost()      : " + url.getHost());       // www.example.com
        System.out.println("getPort()      : " + url.getPort());       // 8080
        System.out.println("getPath()      : " + url.getPath());       // /docs/page.html
        System.out.println("getQuery()     : " + url.getQuery());      // q=java&lang=en
        System.out.println("getRef()       : " + url.getRef());        // ch2

        // URLEncoder / URLDecoder
        String raw = "Hello World! Name=Hari & City=Kathmandu/Nepal";
        String enc = URLEncoder.encode(raw, "UTF-8");
        String dec = URLDecoder.decode(enc, "UTF-8");

        System.out.println("\\nOriginal : " + raw);
        System.out.println("Encoded  : " + enc);
        System.out.println("Decoded  : " + dec);
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u3",
    title: "Unit 3 — Proxy, Authenticator & Cookies",
    badge: "Assignment 3 + Lab 3",
    color: "#4A148C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Proxy Class & ProxySelector — Complete Theory",
        content: [
          { type: "definition", text: "Proxy Server: An intermediary server that sits between a client and the internet. When you connect through a proxy, your request goes to the proxy first, then the proxy forwards it to the target server on your behalf. The target server sees the proxy's IP, not yours. Used for: caching (speed), security (firewall), anonymity, logging, and content filtering." },
          { type: "diagram", text: `
WITHOUT PROXY:
  Java App ─────────── request ────────────────► Target Server
  Java App ◄────────── response ──────────────── Target Server

WITH HTTP PROXY:
  Java App ──► PROXY SERVER ──► Target Server
               (Proxy forwards the request and relays the response)
               (Target server sees PROXY's IP, not Java app's IP)

PROXY TYPES IN JAVA:
  Proxy.NO_PROXY           → Connect directly, bypass all proxies
  Proxy.Type.HTTP          → HTTP/HTTPS web traffic proxy (most common)
  Proxy.Type.SOCKS         → Lower-level TCP/UDP proxy (SOCKS4/SOCKS5)` },
          { type: "code", label: "ProxyDemo.java — Proxy, ProxySelector",
            lines: [`import java.net.*;
import java.io.*;
import java.util.*;

public class ProxyDemo {
    public static void main(String[] args) throws Exception {
        URL url = new URL("http://www.example.com");

        // Direct connection (no proxy)
        URLConnection direct = url.openConnection(Proxy.NO_PROXY);

        // HTTP Proxy
        Proxy httpProxy = new Proxy(
            Proxy.Type.HTTP,
            new InetSocketAddress("proxy.example.com", 3128)
        );
        URLConnection viaHTTPProxy = url.openConnection(httpProxy);
        System.out.println("HTTP proxy: " + httpProxy);

        // SOCKS Proxy
        Proxy socksProxy = new Proxy(
            Proxy.Type.SOCKS,
            new InetSocketAddress("socks.example.com", 1080)
        );

        // Custom ProxySelector
        ProxySelector.setDefault(new ProxySelector() {
            @Override
            public List<Proxy> select(URI uri) {
                List<Proxy> list = new ArrayList<>();
                String host = uri.getHost() != null ? uri.getHost() : "";
                if (host.equals("localhost") || host.equals("127.0.0.1")) {
                    list.add(Proxy.NO_PROXY);
                } else {
                    list.add(new Proxy(Proxy.Type.HTTP,
                        new InetSocketAddress("proxy.company.com", 3128)));
                }
                return list;
            }
            @Override
            public void connectFailed(URI uri, SocketAddress addr, IOException e) {
                System.err.println("Proxy failed for: " + uri + " - " + e.getMessage());
            }
        });
        System.out.println("Custom ProxySelector installed.");
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Authenticator & PasswordAuthentication — HTTP Auth",
        content: [
          { type: "definition", text: "Authenticator: An abstract class that handles authentication challenges from servers. When a server returns HTTP 401 Unauthorized or HTTP 407 Proxy Auth Required, Java's URL connection machinery automatically calls your registered Authenticator subclass to get the credentials to send." },
          { type: "diagram", text: `
HTTP AUTHENTICATION FLOW:

  Client                                    Server
    │── GET /protected-page ───────────────►│
    │◄── HTTP/1.1 401 Unauthorized ──────────│
    │    WWW-Authenticate: Basic realm="Admin"│
    │                                        │
    │ Java calls Authenticator.getPasswordAuthentication()
    │ You return: new PasswordAuthentication("user", "pass".toCharArray())
    │                                        │
    │── GET /protected-page ───────────────►│
    │   Authorization: Basic dXNlcjpwYXNz   │
    │◄── HTTP/1.1 200 OK ─────────────────── │

CONTEXT METHODS inside getPasswordAuthentication():
  getRequestingHost()    → server hostname requesting auth
  getRequestingPort()    → server port
  getRequestingPrompt()  → realm name from WWW-Authenticate header
  getRequestingScheme()  → "Basic", "Digest", "NTLM"
  getRequestorType()     → SERVER or PROXY` },
          { type: "code", label: "AuthenticatorDemo.java",
            lines: [`import java.net.*;
import java.io.*;

public class AuthenticatorDemo {
    static class MyAuthenticator extends Authenticator {
        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            System.out.println("Auth requested by: " + getRequestingHost());
            System.out.println("Realm           : " + getRequestingPrompt());
            System.out.println("Scheme          : " + getRequestingScheme());
            System.out.println("Type            : " + getRequestorType());
            return new PasswordAuthentication("admin", "secret123".toCharArray());
        }
    }

    public static void main(String[] args) {
        Authenticator.setDefault(new MyAuthenticator());
        try {
            URL url = new URL("http://httpbin.org/basic-auth/admin/secret123");
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(url.openConnection().getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) System.out.println(line);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        Authenticator.setDefault(null);
    }
}`]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Cookies — HttpCookie, CookieManager & Custom CookiePolicy",
        content: [
          { type: "definition", text: "Cookie: A small piece of data (name=value string) that a server sends to a client. The client stores it and automatically sends it back with every subsequent request to the same domain. Cookies are the primary mechanism to maintain STATE in the otherwise stateless HTTP protocol." },
          { type: "heading", text: "Cookie Attributes" },
          { type: "table", headers: ["Attribute", "Description", "Security Purpose"],
            rows: [
              ["Name=Value", "The actual data. E.g., 'sessionId=abc123'", "The content itself"],
              ["Domain", "Which domains receive this cookie.", "Restricts scope to intended domain"],
              ["Max-Age", "Cookie lifetime in seconds. 0=delete now, negative=session cookie.", "Controls persistence"],
              ["Secure", "Cookie ONLY sent over HTTPS.", "Prevents interception over HTTP"],
              ["HttpOnly", "JavaScript CANNOT access this cookie. Prevents XSS theft.", "Prevents XSS cookie theft"],
              ["SameSite=Strict", "Cookie ONLY sent with same-site requests.", "Prevents CSRF attacks"],
            ]
          },
          { type: "heading", text: "CookiePolicy Constants" },
          { type: "table", headers: ["Constant", "Behavior"],
            rows: [
              ["CookiePolicy.ACCEPT_ALL", "Accept cookies from every domain without restriction."],
              ["CookiePolicy.ACCEPT_NONE", "Reject ALL cookies — no state is maintained."],
              ["CookiePolicy.ACCEPT_ORIGINAL_SERVER", "Only accept cookies from the server that originally set them — no 3rd-party cookies."],
            ]
          },
          { type: "code", label: "CookieDemo.java",
            lines: [`import java.net.*;
import java.util.*;

public class CookieDemo {
    public static void main(String[] args) throws Exception {
        CookieManager cookieManager = new CookieManager(null, CookiePolicy.ACCEPT_ORIGINAL_SERVER);
        CookieHandler.setDefault(cookieManager);

        // Create a cookie manually
        HttpCookie sessionCookie = new HttpCookie("sessionId", "XYZ123ABC");
        sessionCookie.setDomain(".example.com");
        sessionCookie.setPath("/");
        sessionCookie.setMaxAge(3600);   // 1 hour
        sessionCookie.setSecure(true);   // HTTPS only
        sessionCookie.setHttpOnly(true); // no JS access

        System.out.println("Cookie: " + sessionCookie.getName() + "=" + sessionCookie.getValue());
        System.out.println("Domain  : " + sessionCookie.getDomain());
        System.out.println("Secure  : " + sessionCookie.getSecure());
        System.out.println("HttpOnly: " + sessionCookie.isHttpOnly());
        System.out.println("MaxAge  : " + sessionCookie.getMaxAge() + "s");
        System.out.println("Expired : " + sessionCookie.hasExpired());

        CookieStore store = cookieManager.getCookieStore();
        store.add(new URI("https://www.example.com"), sessionCookie);

        System.out.println("\\nAll cookies: " + store.getCookies().size());
        for (HttpCookie c : store.getCookies())
            System.out.println("  " + c.getName() + "=" + c.getValue());
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u4",
    title: "Unit 4 — HTTP, URLConnection & Headers",
    badge: "Assignments 4–5 + Lab 4",
    color: "#B71C1C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "HTTP Protocol — Request, Response, Methods & Status Codes",
        content: [
          { type: "definition", text: "HTTP (HyperText Transfer Protocol): The application-layer protocol that powers the World Wide Web. It defines how clients send requests to servers and how servers send back responses. HTTP runs on top of TCP. HTTP is STATELESS — each request is completely independent of previous requests." },
          { type: "diagram", text: `
HTTP REQUEST STRUCTURE:
  POST /api/users HTTP/1.1               ← REQUEST LINE
  Host: www.example.com                  ← MANDATORY header
  Content-Type: application/json         ← What format the body is in
  Content-Length: 45                     ← Size of body in bytes
  Authorization: Bearer eyJhb...         ← Authentication token
  Connection: keep-alive                 ← Reuse TCP connection
                                         ← BLANK LINE
  {"name": "Hari", "age": 22}           ← REQUEST BODY

HTTP RESPONSE STRUCTURE:
  HTTP/1.1 200 OK                        ← STATUS LINE
  Content-Type: text/html; charset=UTF-8
  Content-Length: 1234
  Set-Cookie: sessionId=abc123; HttpOnly
                                         ← BLANK LINE
  <html>...</html>                       ← RESPONSE BODY` },
          { type: "heading", text: "HTTP Methods" },
          { type: "table", headers: ["Method", "Purpose", "Has Body?", "Idempotent?", "Safe?"],
            rows: [
              ["GET", "Retrieve a resource. NEVER changes server state.", "No", "Yes", "Yes"],
              ["POST", "Submit data — create new resource or trigger action.", "Yes", "No", "No"],
              ["PUT", "Replace an entire resource at a specific URL.", "Yes", "Yes", "No"],
              ["DELETE", "Delete a specific resource.", "No", "Yes", "No"],
              ["PATCH", "Partially update a resource (only changed fields).", "Yes", "No", "No"],
              ["HEAD", "Same as GET but server returns ONLY headers, no body.", "No", "Yes", "Yes"],
              ["OPTIONS", "Ask server what HTTP methods are supported for a URL.", "No", "Yes", "Yes"],
            ]
          },
          { type: "heading", text: "HTTP Status Codes" },
          { type: "table", headers: ["Code", "Name", "Meaning"],
            rows: [
              ["200", "OK", "Standard success."],
              ["201", "Created", "Resource was successfully created."],
              ["204", "No Content", "Success but nothing to return. Common for DELETE."],
              ["301", "Moved Permanently", "Resource has moved forever to Location header URL."],
              ["304", "Not Modified", "Client's cached version is current — use cache."],
              ["400", "Bad Request", "Malformed request syntax or invalid parameters."],
              ["401", "Unauthorized", "Authentication required."],
              ["403", "Forbidden", "Server understands request but refuses access."],
              ["404", "Not Found", "Resource doesn't exist at this URL."],
              ["500", "Internal Server Error", "Generic server-side error."],
              ["503", "Service Unavailable", "Server temporarily overloaded or down for maintenance."],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "URLConnection & HttpURLConnection — Complete Guide",
        content: [
          { type: "definition", text: "HttpURLConnection: Extends URLConnection with HTTP-specific features: set request method (GET/POST/etc.), read HTTP status code, response message, follow/prevent redirects, manage connections. Created by casting url.openConnection() when URL is http/https." },
          { type: "diagram", text: `
CRITICAL ORDER: Configure BEFORE connect/getInputStream

  1. URL url = new URL(urlString);
  2. HttpURLConnection conn = (HttpURLConnection) url.openConnection();
  3. conn.setRequestMethod("POST");          ← SET BEFORE CONNECT
  4. conn.setConnectTimeout(5000);
  5. conn.setRequestProperty("Content-Type","application/json");
  6. conn.setDoOutput(true);                 ← REQUIRED for POST body
  7. // write body via conn.getOutputStream()
  8. int code = conn.getResponseCode();      ← TRIGGERS actual HTTP request
  9. conn.getInputStream()                   ← Read response body
  10. conn.disconnect();                     ← Always disconnect!` },
          { type: "code", label: "HttpURLConnectionDemo.java — GET & POST",
            lines: [`import java.net.*;
import java.io.*;

public class HttpURLConnectionDemo {

    static void doGet(String urlString) throws Exception {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(5000);
        conn.setRequestProperty("User-Agent", "Java/NetworkProgramming");
        conn.setRequestProperty("Accept", "application/json");

        int code = conn.getResponseCode();
        System.out.println("Status: " + code + " " + conn.getResponseMessage());
        System.out.println("Content-Type: " + conn.getContentType());

        if (code == HttpURLConnection.HTTP_OK) {
            BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = br.readLine()) != null) System.out.println(line);
            br.close();
        }
        conn.disconnect();
    }

    static void doPost(String urlString, String json) throws Exception {
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setDoOutput(true); // REQUIRED to write request body

        try (OutputStreamWriter w = new OutputStreamWriter(conn.getOutputStream(), "UTF-8")) {
            w.write(json);
        }

        int code = conn.getResponseCode();
        System.out.println("POST response: " + code);
        conn.disconnect();
    }

    public static void main(String[] args) throws Exception {
        doGet("https://httpbin.org/get");
        doPost("https://httpbin.org/post", "{\\"name\\":\\"Hari\\",\\"city\\":\\"Kathmandu\\"}");
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u5",
    title: "Unit 5 — TCP Sockets: Client, Server & Chat",
    badge: "Assignment 6 + Lab 5",
    color: "#004D40",
    sections: [
      {
        qnum: "Q1",
        qtitle: "ServerSocket — Deep Theory & Complete Lifecycle",
        content: [
          { type: "definition", text: "ServerSocket: A Java class that binds to a specific port on the machine and LISTENS for incoming TCP connection requests from clients. When a client connects, accept() creates a new Socket object for that specific client connection. The ServerSocket itself continues listening — it never directly communicates with clients." },
          { type: "diagram", text: `
  new ServerSocket(8080)  →  Asks OS to create a TCP socket
                              Binds it to port 8080 on all local IPs
                              Sets the socket to LISTEN state
                              Creates a CONNECTION QUEUE (backlog)

  KERNEL CONNECTION QUEUE (backlog):
  ┌─────────────────────────────────────────────────────────────┐
  │ Incomplete queue: SYN received, waiting for ACK             │
  │ Complete queue  : Fully connected, waiting for accept()     │
  └─────────────────────────────────────────────────────────────┘

  server.accept()  →  Removes ONE connection from complete queue
                       Returns a new Socket for that client
                       If queue is empty → BLOCKS until client connects

  AFTER accept() RETURNS:
    serverSocket (port 8080) ← still listening for NEW connections
    clientSocket             ← for THIS specific client's communication` },
          { type: "heading", text: "ServerSocket Constructors" },
          { type: "table", headers: ["Constructor", "Description"],
            rows: [
              ["new ServerSocket()", "Unbound — set options then call bind()."],
              ["new ServerSocket(port)", "Bind to port on ALL network interfaces. Backlog = 50 default."],
              ["new ServerSocket(port, backlog)", "Bind to port, custom connection queue size."],
              ["new ServerSocket(port, backlog, bindAddr)", "Bind to a SPECIFIC local IP address."],
            ]
          },
          { type: "code", label: "MultiThreadedServer.java — Thread pool server",
            lines: [`import java.net.*;
import java.io.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class MultiThreadedServer {
    static final int PORT = 5000;
    static volatile boolean running = true;
    static AtomicInteger totalConnections  = new AtomicInteger(0);
    static AtomicInteger activeConnections = new AtomicInteger(0);

    static class ClientHandler implements Runnable {
        private final Socket socket;
        private final int    clientId;

        ClientHandler(Socket s, int id) { this.socket = s; this.clientId = id; }

        @Override
        public void run() {
            activeConnections.incrementAndGet();
            try (
                BufferedReader in  = new BufferedReader(new InputStreamReader(socket.getInputStream(), "UTF-8"));
                PrintWriter    out = new PrintWriter(new OutputStreamWriter(socket.getOutputStream(),"UTF-8"), true)
            ) {
                socket.setSoTimeout(30000);
                out.println("Welcome! You are client " + clientId);
                String msg;
                while ((msg = in.readLine()) != null) {
                    if ("bye".equalsIgnoreCase(msg.trim())) { out.println("Goodbye!"); break; }
                    out.println("[Echo]: " + msg.toUpperCase());
                }
            } catch (SocketTimeoutException e) {
                System.out.println("[Client " + clientId + "] Idle timeout.");
            } catch (IOException e) {
                System.out.println("[Client " + clientId + "] Error: " + e.getMessage());
            } finally {
                try { socket.close(); } catch (IOException ignored) {}
                activeConnections.decrementAndGet();
            }
        }
    }

    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket();
        serverSocket.setReuseAddress(true);
        serverSocket.setSoTimeout(1000);
        serverSocket.bind(new InetSocketAddress(PORT, 50));

        ExecutorService pool = Executors.newFixedThreadPool(10);
        System.out.println("Server started on port " + PORT);

        int id = 0;
        while (running) {
            try {
                Socket client = serverSocket.accept();
                totalConnections.incrementAndGet();
                pool.submit(new ClientHandler(client, ++id));
            } catch (SocketTimeoutException ignored) {
            } catch (IOException e) {
                if (running) System.err.println("Accept error: " + e.getMessage());
            }
        }
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "TCP Client — Socket Class, Methods & Chat Application",
        content: [
          { type: "definition", text: "Socket: Represents one end of a TCP connection. To connect to a server, create a Socket with the server's hostname and port. Java automatically performs the TCP 3-way handshake. After that, you get InputStream and OutputStream to communicate — same as reading/writing a file." },
          { type: "heading", text: "TCP Server vs Client — Quick Reference" },
          { type: "diagram", text: `
SERVER SIDE                            CLIENT SIDE
──────────────────────────────────────────────────────────────────────
ServerSocket ss =                      Socket s =
  new ServerSocket(port)                 new Socket("serverhost", port)

Socket client = ss.accept()  // blocks

BufferedReader in = new BufferedReader(    BufferedReader in = new BufferedReader(
  new InputStreamReader(                     new InputStreamReader(
  client.getInputStream()))                  s.getInputStream()))

PrintWriter out = new PrintWriter(         PrintWriter out = new PrintWriter(
  client.getOutputStream(), true)            s.getOutputStream(), true)

String msg = in.readLine()  // blocks    out.println("Hello Server");
out.println("Echo: " + msg)              String reply = in.readLine()

client.close()                           s.close()` },
          { type: "code", label: "ChatServer.java — Multi-client broadcast chat",
            lines: [`import java.net.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;

public class ChatServer {
    static final int PORT = 6000;
    static final List<ClientConnection> clients = new java.util.concurrent.CopyOnWriteArrayList<>();

    static class ClientConnection {
        final Socket socket;
        final PrintWriter out;
        String username;
        ClientConnection(Socket s, PrintWriter o) { this.socket = s; this.out = o; }
        void send(String msg) { out.println(msg); }
    }

    static void broadcastAll(String message) {
        System.out.println("[BROADCAST] " + message);
        for (ClientConnection c : clients) c.send(message);
    }

    static class ClientHandler implements Runnable {
        private final Socket socket;
        ClientHandler(Socket s) { this.socket = s; }

        @Override
        public void run() {
            ClientConnection myConn = null;
            try {
                PrintWriter    out = new PrintWriter(socket.getOutputStream(), true);
                BufferedReader in  = new BufferedReader(new InputStreamReader(socket.getInputStream(),"UTF-8"));
                myConn = new ClientConnection(socket, out);

                String username = in.readLine();
                if (username == null || username.trim().isEmpty()) { socket.close(); return; }
                myConn.username = username.trim();
                clients.add(myConn);
                broadcastAll("*** " + myConn.username + " joined! (" + clients.size() + " online) ***");
                myConn.send("Welcome, " + myConn.username + "! Type /quit to leave.");

                String message;
                while ((message = in.readLine()) != null) {
                    if ("/quit".equalsIgnoreCase(message.trim())) break;
                    else if ("/users".equalsIgnoreCase(message.trim())) {
                        StringBuilder sb = new StringBuilder("Online: ");
                        clients.forEach(c -> sb.append(c.username).append(", "));
                        myConn.send(sb.toString());
                    } else {
                        for (ClientConnection c : clients)
                            if (c != myConn) c.send("[" + myConn.username + "]: " + message);
                        myConn.send("[You]: " + message);
                    }
                }
            } catch (IOException e) {
                if (myConn != null) System.out.println(myConn.username + " disconnected");
            } finally {
                if (myConn != null) {
                    clients.remove(myConn);
                    broadcastAll("*** " + myConn.username + " left. (" + clients.size() + " online) ***");
                }
                try { socket.close(); } catch (IOException ignored) {}
            }
        }
    }

    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket();
        server.setReuseAddress(true);
        server.bind(new InetSocketAddress(PORT, 50));
        ExecutorService pool = Executors.newCachedThreadPool();
        System.out.println("Chat Server on port " + PORT);
        while (true) pool.submit(new ClientHandler(server.accept()));
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u6",
    title: "Unit 6 — UDP, NIO, Multicast & Secure Sockets",
    badge: "Assignments 7–10",
    color: "#E65100",
    sections: [
      {
        qnum: "Q1",
        qtitle: "UDP — DatagramSocket & DatagramPacket",
        content: [
          { type: "definition", text: "UDP (User Datagram Protocol): A connectionless, lightweight transport protocol. Unlike TCP, UDP sends self-contained packets (datagrams) without establishing a connection first, without guaranteeing delivery, without ensuring order, and without any flow control." },
          { type: "heading", text: "TCP vs UDP — Comparison" },
          { type: "table", headers: ["Feature", "TCP", "UDP"],
            rows: [
              ["Connection", "Connection-oriented (3-way handshake)", "Connectionless — just send"],
              ["Reliability", "Guaranteed delivery (ACK + retransmit)", "No guarantee — lost = lost forever"],
              ["Order", "Ordered delivery (sequence numbers)", "No order guarantee"],
              ["Header size", "20 bytes", "8 bytes"],
              ["Speed", "Slower (overhead)", "Faster (minimal overhead)"],
              ["Data model", "Stream-based (no message boundaries)", "Message-based (packet = message)"],
              ["Use cases", "HTTP, FTP, SSH, Email", "DNS, VoIP, Video streaming, Online games"],
              ["Java class", "Socket / ServerSocket", "DatagramSocket"],
            ]
          },
          { type: "code", label: "UDPServer.java + UDPClient.java",
            lines: [
`// UDP SERVER
import java.net.*;
import java.util.Date;

public class UDPServer {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(7000);
        System.out.println("UDP Server on port 7000");
        byte[] buf = new byte[512];

        while (true) {
            DatagramPacket recv = new DatagramPacket(buf, buf.length);
            socket.receive(recv);  // BLOCKS until packet arrives

            String msg = new String(recv.getData(), 0, recv.getLength(), "UTF-8");
            System.out.println("From " + recv.getAddress() + ":" + recv.getPort() + " — " + msg);

            String reply = "Server time: " + new Date() + " | echo: " + msg;
            byte[] replyBytes = reply.getBytes("UTF-8");
            socket.send(new DatagramPacket(replyBytes, replyBytes.length,
                recv.getAddress(), recv.getPort()));
        }
    }
}`,
`// UDP CLIENT
import java.net.*;

public class UDPClient {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        socket.setSoTimeout(5000);
        InetAddress server = InetAddress.getByName("localhost");

        String msg = "Hello UDP Server!";
        byte[] data = msg.getBytes("UTF-8");
        socket.send(new DatagramPacket(data, data.length, server, 7000));
        System.out.println("Sent: " + msg);

        byte[] buf = new byte[512];
        DatagramPacket reply = new DatagramPacket(buf, buf.length);
        try {
            socket.receive(reply);
            System.out.println("Reply: " + new String(reply.getData(), 0, reply.getLength(), "UTF-8"));
        } catch (SocketTimeoutException e) {
            System.out.println("No reply (packet may have been lost!)");
        }
        socket.close();
    }
}`
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "NIO — Channels, ByteBuffer, Selector & Non-Blocking",
        content: [
          { type: "definition", text: "NIO (New Input/Output — java.nio): Introduced in Java 1.4. NIO introduces three core concepts: Channels (bidirectional data pipelines), Buffers (fixed-size containers for data), and Selectors (event-driven monitoring of multiple channels with a single thread). Key advantage: a single thread can efficiently serve thousands of simultaneous connections." },
          { type: "diagram", text: `
TRADITIONAL I/O — Thread-per-connection:
  Client 1 ──► Thread 1 (BLOCKED in read())
  Client 2 ──► Thread 2 (BLOCKED in read())
  Client 10,000 ──► Thread 10,000 → ~10GB RAM just for stacks!

NIO — Event-driven, non-blocking:
  Client 1 ──►┐
  Client 2 ──►├──► Selector ──► ONE Thread
  Client 10,000──►┘   (only processes clients that HAVE DATA)
  → 1-2 threads can serve 10,000 clients!

ByteBuffer STATE MACHINE:
  allocate(n) → [WRITE MODE: position=0, limit=capacity]
  put(data)   → writes data, position advances
  flip()      → SWITCH TO READ: limit=old_position, position=0
  get()       → reads data, position advances
  clear()     → BACK TO WRITE: position=0, limit=capacity

  channel.read(buf)  → channel writes INTO buf  (write mode)
  channel.write(buf) → channel reads FROM buf   (flip() first!)

SELECTOR OPERATIONS:
  OP_ACCEPT = 16  → new connection arriving at ServerSocketChannel
  OP_READ   =  1  → data available to read from SocketChannel
  OP_WRITE  =  4  → output buffer has space to write
  OP_CONNECT=  8  → non-blocking connect() completed` },
          { type: "code", label: "NIOServer.java — Non-blocking with Selector",
            lines: [`import java.nio.*;
import java.nio.channels.*;
import java.net.*;
import java.util.*;

public class NIOServer {
    public static void main(String[] args) throws Exception {
        ServerSocketChannel serverCh = ServerSocketChannel.open();
        serverCh.socket().bind(new InetSocketAddress(9000));
        serverCh.configureBlocking(false);  // KEY: non-blocking mode

        Selector selector = Selector.open();
        serverCh.register(selector, SelectionKey.OP_ACCEPT);
        System.out.println("NIO Server on port 9000 — one thread handles ALL clients");

        while (true) {
            selector.select();  // blocks until at least one channel is ready
            Iterator<SelectionKey> iter = selector.selectedKeys().iterator();

            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove(); // CRITICAL: must remove after processing

                if (key.isAcceptable()) {
                    SocketChannel client = serverCh.accept();
                    client.configureBlocking(false);
                    client.register(selector, SelectionKey.OP_READ);
                    client.write(ByteBuffer.wrap("Welcome to NIO Server!\\n".getBytes()));
                    System.out.println("Client connected: " + client.getRemoteAddress());

                } else if (key.isReadable()) {
                    SocketChannel client = (SocketChannel) key.channel();
                    ByteBuffer buf = ByteBuffer.allocate(1024);
                    int bytesRead = client.read(buf);

                    if (bytesRead == -1) {
                        System.out.println("Client disconnected.");
                        key.cancel(); client.close();
                    } else if (bytesRead > 0) {
                        buf.flip(); // switch to read mode
                        byte[] data = new byte[buf.remaining()];
                        buf.get(data);
                        String msg = new String(data, "UTF-8").trim();
                        System.out.println("Received: " + msg);
                        String resp = "[NIO Echo]: " + msg.toUpperCase() + "\\n";
                        client.write(ByteBuffer.wrap(resp.getBytes("UTF-8")));
                    }
                }
            }
        }
    }
}`]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "IP Multicasting & Secure Sockets (SSL/TLS)",
        content: [
          { type: "definition", text: "IP Multicasting: A network communication technique where a single datagram is sent to a multicast group address, and ALL machines that have JOINED that group receive a COPY. More efficient than unicast (separate copies) and less wasteful than broadcast (everyone gets it)." },
          { type: "diagram", text: `
UNICAST:  Sender ──►(copy1)──► Receiver 1
          Sender ──►(copy2)──► Receiver 2   ← n copies for n receivers

BROADCAST: Sender ──► 255.255.255.255 ──► ALL machines on LAN

MULTICAST: Sender ──► 230.0.0.1 ──► Receivers who JOINED the group
                       ONE copy sent — routers duplicate as needed

Multicast Range: 224.0.0.0 – 239.255.255.255 (Class D addresses)
TTL: 1 = local subnet only, 32 = organization, 255 = global

SSL/TLS adds to TCP:
  CONFIDENTIALITY  → Data encrypted (unreadable to wiretappers)
  INTEGRITY        → Data cannot be silently altered (HMAC)
  AUTHENTICATION   → Server identity verified via digital certificate` },
          { type: "code", label: "MulticastSender.java + MulticastReceiver.java",
            lines: [
`// MULTICAST SENDER
import java.net.*;

public class MulticastSender {
    public static void main(String[] args) throws Exception {
        InetAddress group = InetAddress.getByName("230.0.0.1");
        MulticastSocket socket = new MulticastSocket();
        socket.setTimeToLive(1); // stay on local subnet

        String[] msgs = {"Hello group!", "Stock: AAPL=$195", "Weather: Sunny 25C", "END"};
        for (String msg : msgs) {
            byte[] data = msg.getBytes("UTF-8");
            socket.send(new DatagramPacket(data, data.length, group, 4446));
            System.out.println("Sent: " + msg);
            Thread.sleep(1000);
        }
        socket.close();
    }
}`,
`// MULTICAST RECEIVER — run multiple to see all receive same packet!
import java.net.*;

public class MulticastReceiver {
    public static void main(String[] args) throws Exception {
        InetAddress group = InetAddress.getByName("230.0.0.1");
        MulticastSocket socket = new MulticastSocket(4446);
        socket.joinGroup(group);  // JOIN the group to receive packets
        System.out.println("Joined 230.0.0.1 — waiting for messages...");

        byte[] buf = new byte[512];
        while (true) {
            DatagramPacket pkt = new DatagramPacket(buf, buf.length);
            socket.receive(pkt);
            String msg = new String(pkt.getData(), 0, pkt.getLength(), "UTF-8");
            System.out.println("Received: " + msg);
            if ("END".equals(msg)) break;
        }
        socket.leaveGroup(group);  // LEAVE when done
        socket.close();
    }
}`
            ]
          },
          { type: "table", headers: ["Aspect", "Regular Socket", "SSLSocket"],
            rows: [
              ["Data on wire", "Plain text — Wireshark readable", "Encrypted ciphertext"],
              ["Identity", "No verification", "Server presents certificate, client verifies"],
              ["Integrity", "Data can be altered", "Any modification is detected"],
              ["Java class", "Socket / ServerSocket", "SSLSocket / SSLServerSocket"],
              ["Factory", "new Socket(host, port)", "SSLSocketFactory.getDefault().createSocket(host, port)"],
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u7",
    title: "Unit 7 — RMI (Remote Method Invocation)",
    badge: "Assignment 11",
    color: "#37474F",
    sections: [
      {
        qnum: "Q1",
        qtitle: "RMI — Architecture, Components & Parameter Marshaling",
        content: [
          { type: "definition", text: "RMI (Remote Method Invocation): A Java API that enables an object in one JVM to call methods on an object in a different JVM. The entire network communication — TCP connection, serialization, error handling — is completely hidden. It looks and feels exactly like a local method call." },
          { type: "diagram", text: `
┌─────────────────────────────────────────────────────────────────────┐
│                         RMI ARCHITECTURE                            │
│                                                                     │
│  CLIENT JVM                          SERVER JVM                     │
│  ┌────────────────────┐              ┌────────────────────────────┐ │
│  │ calc.add(15, 25);  │              │ add(a,b) { return a+b; }   │ │
│  │ "Looks local!"     │              │ "Actually runs here!"      │ │
│  └─────────┬──────────┘              └──────────────┬─────────────┘ │
│            │                                         │               │
│  ┌─────────▼──────────┐   TCP/JRMP   ┌──────────────▼─────────────┐ │
│  │    CLIENT STUB     │══════════════►│    SERVER SKELETON         │ │
│  │  Serialize args    │◄══════════════│ Deserialize → call → return│ │
│  │  Wait for result   │              │                            │ │
│  └────────────────────┘              └────────────────────────────┘ │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │   RMI REGISTRY (port 1099) — "Phone book" for remote objects │   │
│  │   Server: Naming.rebind("rmi://localhost/Calc", impl)        │   │
│  │   Client: Naming.lookup("rmi://localhost/Calc") → stub       │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘` },
          { type: "heading", text: "RMI Components" },
          { type: "table", headers: ["Component", "Location", "Role"],
            rows: [
              ["Remote Interface", "SHARED — both client & server", "Defines which methods can be called remotely. MUST extend java.rmi.Remote. ALL methods MUST declare throws RemoteException."],
              ["Remote Object (Impl)", "Server ONLY", "Actual implementation. MUST extend UnicastRemoteObject. MUST implement the Remote Interface."],
              ["Client Stub", "Client side (auto-generated)", "Proxy that serializes calls, sends over TCP, receives and returns results."],
              ["RMI Registry", "Server, port 1099", "Naming service. Server registers objects; client looks them up."],
            ]
          },
          { type: "heading", text: "Parameter Passing in RMI — Marshaling" },
          { type: "table", headers: ["Parameter Type", "Passed By", "Serializable Required?"],
            rows: [
              ["Primitives (int, double, boolean)", "VALUE (copy)", "No"],
              ["String", "VALUE (copy)", "Yes (built-in)"],
              ["Custom class (e.g., Student)", "VALUE (DEEP COPY)", "YES — must implement Serializable"],
              ["Remote object reference", "REFERENCE (Stub)", "No"],
            ]
          },
          { type: "heading", text: "CORBA vs RMI" },
          { type: "table", headers: ["Aspect", "RMI", "CORBA"],
            rows: [
              ["Language support", "Java ONLY", "Language-neutral: C++, Java, Python, C#, etc."],
              ["Interface definition", "Java interface extending Remote", "IDL (Interface Definition Language)"],
              ["Protocol", "JRMP (Java Remote Method Protocol)", "IIOP (Internet Inter-ORB Protocol)"],
              ["Complexity", "Simple — just Java", "Complex — IDL, ORB setup, multiple tools"],
              ["Interoperability", "Java JVMs only", "Any CORBA-compliant system in any language"],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Steps to Create RMI Application — Complete Example",
        content: [
          { type: "code", label: "Complete RMI Calculator — All 3 Files",
            lines: [
`// FILE 1: CalculatorService.java — Remote Interface (SHARED)
import java.rmi.*;

public interface CalculatorService extends Remote {
    // ALL methods MUST declare throws RemoteException
    double add(double a, double b)       throws RemoteException;
    double subtract(double a, double b)  throws RemoteException;
    double multiply(double a, double b)  throws RemoteException;
    double divide(double a, double b)    throws RemoteException;
    String getHistory()                  throws RemoteException;
}`,
`// FILE 2: CalculatorServiceImpl.java — Server
import java.rmi.*;
import java.rmi.server.*;
import java.rmi.registry.*;
import java.util.*;

public class CalculatorServiceImpl
        extends UnicastRemoteObject
        implements CalculatorService {

    private List<String> history = new ArrayList<>();

    public CalculatorServiceImpl() throws RemoteException { super(); }

    @Override public double add(double a, double b) throws RemoteException {
        double r = a + b;
        history.add(a + " + " + b + " = " + r);
        return r;
    }
    @Override public double subtract(double a, double b) throws RemoteException {
        double r = a - b; history.add(a + " - " + b + " = " + r); return r;
    }
    @Override public double multiply(double a, double b) throws RemoteException {
        double r = a * b; history.add(a + " * " + b + " = " + r); return r;
    }
    @Override public double divide(double a, double b) throws RemoteException {
        if (b == 0) throw new RemoteException("Division by zero!");
        double r = a / b; history.add(a + " / " + b + " = " + r); return r;
    }
    @Override public String getHistory() throws RemoteException {
        return String.join("\\n", history);
    }

    public static void main(String[] args) throws Exception {
        Registry registry = LocateRegistry.createRegistry(1099);
        Naming.rebind("rmi://localhost/CalculatorService", new CalculatorServiceImpl());
        System.out.println("Server ready on rmi://localhost/CalculatorService");
    }
}`,
`// FILE 3: CalculatorClient.java — Client
import java.rmi.*;

public class CalculatorClient {
    public static void main(String[] args) {
        try {
            // Look up the remote object by name
            CalculatorService calc = (CalculatorService)
                Naming.lookup("rmi://localhost/CalculatorService");

            System.out.println("15.5 + 24.5 = " + calc.add(15.5, 24.5));
            System.out.println("100 - 37.5  = " + calc.subtract(100.0, 37.5));
            System.out.println("6 × 7       = " + calc.multiply(6.0, 7.0));
            System.out.println("99 ÷ 3      = " + calc.divide(99.0, 3.0));

            try {
                calc.divide(10.0, 0.0);
            } catch (RemoteException e) {
                System.out.println("Remote error: " + e.getMessage());
            }
            System.out.println("\\nHistory:\\n" + calc.getHistory());

        } catch (NotBoundException e) {
            System.err.println("Service not found. Is server running?");
        } catch (RemoteException e) {
            System.err.println("Remote call failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
// HOW TO RUN:
// 1. javac CalculatorService.java CalculatorServiceImpl.java CalculatorClient.java
// 2. java CalculatorServiceImpl   (Terminal 1 — server)
// 3. java CalculatorClient        (Terminal 2 — client)`
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u8",
    title: "Unit 8 — 2026 Exam Predictions 🎯",
    badge: "Past Paper Analysis",
    color: "#C62828",
    sections: [
      {
        qnum: "PRED",
        qtitle: "2026 Predicted Questions & MCQ Answers",
        content: [
          { type: "warning", text: "Based on TU BCA Network Programming (CACS355) exam patterns from 2020, 2021, and 2023. Questions marked ★ appeared multiple years — highest chance of repeating!" },
          { type: "heading", text: "Group B Predictions (5 Marks Each)" },
          { type: "table", headers: ["Predicted Question", "Probability", "Key Points"],
            rows: [
              ["★ Client-Server model with block diagram", "Very High", "Diagram + Table (client vs server). 1-tier/2-tier/3-tier. TCP handshake."],
              ["★ InetAddress class — creation and getter methods", "Very High", "6 factory methods. 5 getter methods. isXxx() methods. Inet4 vs Inet6."],
              ["★ Differentiate TCP and UDP with diagram", "Very High", "Comparison table (8 rows). Lifecycle diagram. When to use each."],
              ["URL class — parts with anatomy diagram", "High", "URL anatomy diagram. All getXxx() methods. URL vs URI comparison."],
              ["HTTP protocol — request/response & status codes", "High", "Request/response format diagrams. Methods table. Status code categories."],
              ["NIO — ByteBuffer modes and methods", "High", "Traditional IO vs NIO. ByteBuffer write/flip/read/clear diagram."],
              ["NetworkInterface class — factory and getter methods", "High", "4 factory methods. 10+ getter methods. MAC address formatting."],
              ["Proxy class and ProxySelector", "High", "3 proxy types. Proxy vs ProxySelector. Code showing custom selector."],
              ["IP Multicasting with MulticastSocket example", "Medium-High", "Unicast vs broadcast vs multicast. Group address range. joinGroup/leaveGroup."],
            ]
          },
          { type: "heading", text: "Group C Predictions (10–15 Marks)" },
          { type: "table", headers: ["Predicted Question", "Why Likely", "What to Code"],
            rows: [
              ["★ Multithreaded chat server + Swing client", "Long coding Q — almost every year", "ChatServer with broadcast. ChatClient with JTextArea + background receiver thread."],
              ["★ Complete RMI application — interface + server + client", "Classic 3-file coding question", "CalculatorService (interface), CalculatorServiceImpl (server + registry), Client (lookup + calls)."],
              ["UDP server and client", "UDP coding Q — appeared 2021 & 2023", "UDPServer (DatagramSocket + receive + send). UDPClient (send packet + receive reply)."],
              ["NIO non-blocking server using Selector", "NIO is unique to this subject", "ServerSocketChannel + configureBlocking(false) + Selector + OP_ACCEPT + OP_READ + flip()."],
              ["InetAddress + NetworkInterface enumeration", "Lab 1 programs — foundational", "getByName, getAllByName. Loop NetworkInterface.getNetworkInterfaces(). MAC formatting."],
            ]
          },
          { type: "heading", text: "MCQ High-Probability Topics" },
          { type: "table", headers: ["MCQ Topic", "Correct Answer", "Common Wrong Answers"],
            rows: [
              ["Valid size of a socket port address", "16 bits (0–65535)", "8 bits, 32 bits, 64 bits"],
              ["Exception when hostname cannot be resolved", "UnknownHostException", "IOException, DNSException"],
              ["TCP Java class for SERVER", "ServerSocket", "Socket, DatagramSocket"],
              ["UDP Java class for sending packets", "DatagramSocket", "Socket, PacketSocket"],
              ["Return type of ServerSocket.accept()", "Socket", "ServerSocket, ClientSocket"],
              ["Multicast address range", "224.0.0.0 – 239.255.255.255", "192.168.x.x, 10.x.x.x"],
              ["NIO class for monitoring multiple channels", "Selector", "Monitor, Watcher, EventLoop"],
              ["ByteBuffer method to switch write→read mode", "flip()", "switch(), read(), reset()"],
              ["ByteBuffer.flip() sets position to", "0", "Previous limit, capacity, -1"],
              ["NIO OP_ACCEPT value", "16", "1, 4, 8"],
              ["NIO OP_READ value", "1", "16, 4, 8"],
              ["RMI registry default port", "1099", "8080, 80, 1000"],
              ["RMI remote interface must extend", "java.rmi.Remote", "java.io.Serializable, Runnable"],
              ["HTTP method: get only headers, no body", "HEAD", "GET, OPTIONS"],
              ["HTTP status code: resource not found", "404", "400, 403, 500"],
              ["Private LAN address method", "isSiteLocalAddress()", "isPrivateAddress(), isLocalAddress()"],
            ]
          },
        ]
      },
      {
        qnum: "CHEAT",
        qtitle: "Quick Reference Cheat Sheet — Exam Day",
        content: [
          { type: "heading", text: "TCP Sockets — Two Sides at a Glance" },
          { type: "diagram", text: `
SERVER SIDE                            CLIENT SIDE
──────────────────────────────────────────────────────────────────────
ServerSocket ss =                      Socket s =
  new ServerSocket(port)                 new Socket("serverhost", port)

Socket client = ss.accept()  // blocks

BufferedReader in = new BufferedReader(    same as server
  new InputStreamReader(
  client.getInputStream()))

PrintWriter out = new PrintWriter(
  client.getOutputStream(), true)       // true = auto-flush

String msg = in.readLine()  // blocks  out.println("Hello!");
out.println("Echo: " + msg)            String reply = in.readLine()
client.close()                         s.close()` },
          { type: "heading", text: "UDP Sockets — Two Sides at a Glance" },
          { type: "diagram", text: `
SERVER SIDE                            CLIENT SIDE
──────────────────────────────────────────────────────────────────────
DatagramSocket ds =                    DatagramSocket ds =
  new DatagramSocket(port)               new DatagramSocket()

byte[] buf = new byte[512]             byte[] data = msg.getBytes()
DatagramPacket recv =                  InetAddress server =
  new DatagramPacket(buf, buf.len)       InetAddress.getByName("host")
                                       ds.send(new DatagramPacket(
ds.receive(recv)  // BLOCKS              data, data.length, server, port))

String msg = new String(               // receive reply
  recv.getData(),0,recv.getLength())   ds.setSoTimeout(5000)
                                       DatagramPacket r = new DatagramPacket(buf, buf.len)
// Send reply                          ds.receive(r)
ds.send(new DatagramPacket(reply,
  reply.length, recv.getAddress(),
  recv.getPort()))` },
          { type: "heading", text: "RMI — 5 Steps Summary" },
          { type: "diagram", text: `
Step 1: Define Remote Interface
  interface MyService extends Remote {
      ReturnType method(ParamType p) throws RemoteException;
  }

Step 2: Implement on Server
  class MyImpl extends UnicastRemoteObject implements MyService {
      MyImpl() throws RemoteException { super(); }
  }

Step 3: Start Registry + Register (Server main)
  Registry r = LocateRegistry.createRegistry(1099);
  Naming.rebind("rmi://localhost/MyService", new MyImpl());

Step 4: Look Up Object (Client)
  MyService obj = (MyService) Naming.lookup("rmi://localhost/MyService");

Step 5: Call Methods — looks local, runs REMOTELY!
  ReturnType result = obj.method(param);

KEY RULES:
  • Interface MUST extend java.rmi.Remote
  • ALL methods MUST declare throws RemoteException
  • Impl MUST extend UnicastRemoteObject
  • Custom param types MUST implement Serializable
  • Registry default port = 1099` },
          { type: "tip", label: "TOP 5 EXAM PREPARATIONS", text: "1) Multithreaded TCP Chat Server + Swing Client. 2) Complete RMI 3-file example. 3) UDP Server + Client (DatagramPacket with server address on send). 4) NIO non-blocking server (Selector + OP_ACCEPT + OP_READ + ByteBuffer flip). 5) InetAddress + NetworkInterface enumeration. Memorize: port = 16 bits, OP_ACCEPT=16, OP_READ=1, RMI port=1099." },
        ]
      },
    ]
  },
];

const COLORS = {
  bg: "#F0F4F8", surface: "#FFFFFF", border: "#DDE3EA",
  code_bg: "#F1F5F9", code_border: "#CBD5E1", text: "#1E293B",
  muted: "#64748B", definition_bg: "#EFF6FF", definition_border: "#3B82F6",
  analogy_bg: "#FFF7ED", analogy_border: "#F97316", tip_bg: "#F0FDF4",
  tip_border: "#22C55E", warning_bg: "#FFF1F2", warning_border: "#F43F5E",
  diagram_bg: "#1E293B", heading: "#1E293B",
};

function CodeBlock({ label, lines }) {
  const [copied, setCopied] = useState(false);
  const allCode = lines.join("\n\n");
  const handleCopy = () => {
    navigator.clipboard?.writeText(allCode).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ margin: "12px 0", borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.code_border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#334155", padding: "8px 14px" }}>
        <span style={{ color: "#94A3B8", fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{label}</span>
        <button onClick={handleCopy} style={{ background: copied ? "#22C55E" : "#475569", color: "#fff", border: "none", borderRadius: 5, padding: "4px 12px", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <div style={{ background: COLORS.code_bg, padding: "14px 16px", overflowX: "auto" }}>
        {lines.map((block, i) => (
          <pre key={i} style={{ margin: i > 0 ? "14px 0 0" : 0, padding: 0, fontFamily: "'Courier New', monospace", fontSize: 13, color: COLORS.text, lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{block}</pre>
        ))}
      </div>
    </div>
  );
}

function ContentBlock({ item }) {
  switch (item.type) {
    case "explain":
      return <p style={{ color: COLORS.text, fontSize: 14.5, lineHeight: 1.8, margin: "8px 0" }}>{item.text}</p>;
    case "heading":
      return <h4 style={{ color: COLORS.heading, fontSize: 15, fontWeight: 700, margin: "18px 0 8px", paddingBottom: 5, borderBottom: `2px solid ${COLORS.border}` }}>{item.text}</h4>;
    case "definition":
      return (
        <div style={{ background: COLORS.definition_bg, border: `1px solid ${COLORS.definition_border}`, borderLeft: `4px solid ${COLORS.definition_border}`, borderRadius: 7, padding: "12px 16px", margin: "10px 0" }}>
          <p style={{ margin: 0, color: "#1D4ED8", fontSize: 14.5, lineHeight: 1.7 }}>{item.text}</p>
        </div>
      );
    case "analogy":
      return (
        <div style={{ background: COLORS.analogy_bg, border: `1px solid ${COLORS.analogy_border}`, borderLeft: `4px solid ${COLORS.analogy_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0" }}>
          <div style={{ color: COLORS.analogy_border, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>🔍 ANALOGY</div>
          <span style={{ color: "#92400E", fontSize: 14.5, lineHeight: 1.7, fontStyle: "italic" }}>{item.text}</span>
        </div>
      );
    case "tip":
      return (
        <div style={{ background: COLORS.tip_bg, border: `1px solid ${COLORS.tip_border}`, borderLeft: `4px solid ${COLORS.tip_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0", display: "flex", gap: 10 }}>
          <span style={{ color: "#16A34A", fontWeight: 800, fontSize: 12, minWidth: 100, paddingTop: 2 }}>💡 {item.label}</span>
          <span style={{ color: "#14532D", fontSize: 14.5, lineHeight: 1.7 }}>{item.text}</span>
        </div>
      );
    case "warning":
      return (
        <div style={{ background: COLORS.warning_bg, border: `1px solid ${COLORS.warning_border}`, borderLeft: `4px solid ${COLORS.warning_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0" }}>
          <div style={{ color: COLORS.warning_border, fontWeight: 700, fontSize: 12, marginBottom: 4 }}>⚠ WARNING</div>
          <span style={{ color: "#9F1239", fontSize: 14.5, lineHeight: 1.7 }}>{item.text}</span>
        </div>
      );
    case "diagram":
      return (
        <div style={{ background: COLORS.diagram_bg, borderRadius: 8, padding: "14px 18px", margin: "12px 0", overflowX: "auto" }}>
          <pre style={{ margin: 0, fontFamily: "'Courier New', monospace", fontSize: 12.5, color: "#E2E8F0", lineHeight: 1.6, whiteSpace: "pre" }}>{item.text}</pre>
        </div>
      );
    case "bullets":
      return (
        <ul style={{ margin: "8px 0", paddingLeft: 22 }}>
          {item.items.map((it, i) => (
            <li key={i} style={{ color: COLORS.text, fontSize: 14.5, lineHeight: 1.8, marginBottom: 6 }}
                dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "12px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr>{item.headers.map((h, i) => (
                <th key={i} style={{ background: "#1E293B", color: "#fff", padding: "9px 12px", textAlign: "left", fontWeight: 700 }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {item.rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? "#fff" : "#F8FAFC" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: "8px 12px", borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text, verticalAlign: "top", lineHeight: 1.6 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return <CodeBlock label={item.label} lines={item.lines} />;
    default:
      return null;
  }
}

export default function NetworkProgramming() {
  const [activeUnit, setActiveUnit] = useState("u1");
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#0EA5E9", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌐</div>
          <div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: 19, fontWeight: 700 }}>Network Programming — BCA 6th Semester</h1>
            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>Complete Exam Guide 2026 • CACS355 • 8 Units + Predictions</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderBottom: `2px solid ${COLORS.border}`, overflowX: "auto" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 0, minWidth: "max-content" }}>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => setActiveUnit(u.id)}
              style={{ padding: "13px 14px", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: activeUnit === u.id ? 700 : 500, color: activeUnit === u.id ? u.color : COLORS.muted, borderBottom: activeUnit === u.id ? `3px solid ${u.color}` : "3px solid transparent", whiteSpace: "nowrap" }}>
              {u.title.split("—")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ background: `linear-gradient(135deg, ${unit.color} 0%, ${unit.color}CC 100%)`, borderRadius: 14, padding: "22px 28px", marginBottom: 28, boxShadow: `0 4px 20px ${unit.color}40` }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 21, fontWeight: 700 }}>{unit.title}</h2>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4, display: "block" }}>{unit.badge}</span>
        </div>

        {unit.sections.map((sec, si) => {
          const key = `${unit.id}-${si}`;
          const open = openSections[key] !== false;
          return (
            <div key={key} style={{ background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.border}`, marginBottom: 16, overflow: "hidden", boxShadow: open ? "0 2px 12px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
              <button onClick={() => toggleSection(key)}
                style={{ width: "100%", background: open ? "#F8FAFC" : "#fff", border: "none", padding: "15px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
                <span style={{ background: unit.color, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, minWidth: 60, textAlign: "center" }}>{sec.qnum}</span>
                <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, flex: 1 }}>{sec.qtitle}</span>
                <span style={{ color: COLORS.muted, fontSize: 18, transform: open ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-block", transition: "transform 0.2s" }}>▾</span>
              </button>
              {open && (
                <div style={{ padding: "4px 24px 28px" }}>
                  {sec.content.map((item, ci) => <ContentBlock key={ci} item={item} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
