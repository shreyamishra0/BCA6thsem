import { useState } from "react";

const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Client-Server Model & Java Network Features",
    badge: "Assignment 1 + Lab 1",
    color: "#1A237E",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Client-Server Application Model — Architecture & Block Diagram",
        content: [
          { type: "definition", text: "Client-Server Model: An architectural pattern where a Client machine sends a request over a network to a Server machine, which processes the request and sends back a response. The server passively waits (listens) for connections; the client actively initiates." },
          { type: "analogy", text: "Think of a restaurant. The CUSTOMER (Client) sits at a table and places an order. The WAITER carries it to the KITCHEN (Server). The kitchen prepares the food and the waiter delivers it back. The customer never knows how the food is made — they only interact through the waiter (the protocol)." },
          { type: "diagram", text: `
┌─────────────────────────────────────────────────────────────────┐
│                     NETWORK (Internet / LAN)                    │
│                                                                 │
│  ┌──────────────┐   REQUEST  ──────────────►  ┌─────────────┐  │
│  │              │                             │             │  │
│  │   CLIENT     │   ◄──────────  RESPONSE     │   SERVER    │  │
│  │              │                             │             │  │
│  │ - Browser    │        TCP/IP               │ - Listens   │  │
│  │ - Java App   │   (port 80, 443, 8080...)   │ - Accepts   │  │
│  │ - Mobile App │                             │ - Processes │  │
│  └──────────────┘                             └─────────────┘  │
│                                                                 │
│  CLIENT:                            SERVER:                     │
│  1. Initiates connection            1. Passively waits (listen) │
│  2. Uses random ephemeral port      2. Uses well-known port     │
│  3. Sends request                   3. Accepts connections      │
│  4. Waits for and processes reply   4. Serves multiple clients  │
└─────────────────────────────────────────────────────────────────┘

ARCHITECTURE TIERS:
  1-Tier: Client + Server on same machine (local desktop app)
  2-Tier: Client ──► Server              (Java app → MySQL)
  3-Tier: Client ──► App Server ──► DB   (Browser → Tomcat → MySQL)
  N-Tier: Multiple middleware layers     (Load Balancer, Cache, etc.)` },
          { type: "table", headers: ["Aspect", "Client", "Server"],
            rows: [
              ["Role", "Requests service", "Provides service"],
              ["Connection", "Initiates (active)", "Waits and accepts (passive)"],
              ["IP/Port", "Uses random ephemeral port", "Uses well-known fixed port (e.g., 80, 443)"],
              ["Java class", "Socket", "ServerSocket"],
              ["Count", "Many clients simultaneously", "Usually one (can be clustered)"],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Features of Java for Network Programming",
        content: [
          { type: "explain", text: "Java was designed from the ground up with networking in mind — 'The Network is the Computer' was a core philosophy. It provides rich built-in libraries that hide OS-level differences behind clean interfaces." },
          { type: "table", headers: ["Java Feature", "Package", "Description"],
            rows: [
              ["Socket & ServerSocket", "java.net", "Low-level TCP client/server socket communication"],
              ["DatagramSocket", "java.net", "UDP (connectionless) via DatagramPackets"],
              ["InetAddress", "java.net", "Represents IP addresses. DNS lookup, reverse lookup."],
              ["URL & URLConnection", "java.net", "High-level HTTP communication — read web pages, post forms"],
              ["HttpURLConnection", "java.net", "HTTP-specific — set methods (GET/POST), read status codes"],
              ["MulticastSocket", "java.net", "Send UDP datagrams to a GROUP of receivers"],
              ["SSL/TLS Sockets", "javax.net.ssl", "SSLSocket, SSLServerSocket — encrypted secure communication"],
              ["NIO (Non-Blocking I/O)", "java.nio", "High-performance I/O: Selectors, Channels, ByteBuffers"],
              ["Platform Independence", "JVM", "Same socket code runs on Windows, Linux, macOS unchanged"],
              ["Built-in Threading", "java.util.concurrent", "Thread pools to serve many clients simultaneously"],
              ["Serialization", "java.io", "Send Java objects over network via ObjectOutputStream"],
            ]
          },
          { type: "tip", label: "KEY POINT", text: "Java hides OS-level socket differences behind clean interfaces. On Windows, a socket is a HANDLE. On Linux, it's a file descriptor. Java's Socket class wraps both — your code stays identical on all platforms." },
          { type: "heading", text: "Scope of Network Programming" },
          { type: "bullets", items: [
            "**Web Applications** — every HTTP request from browser to server",
            "**Chat & Messaging** — WhatsApp, Slack use TCP sockets for real-time bidirectional communication",
            "**File Transfer** — FTP clients transfer files over TCP",
            "**Distributed Systems** — microservices communicate over the network",
            "**Online Gaming** — real-time multiplayer uses UDP for low-latency data",
            "**IoT** — sensors send data to servers using lightweight protocols over TCP/UDP",
            "**Email** — SMTP/POP3/IMAP clients/servers communicate via network protocols",
          ]},
        ]
      },
      {
        qnum: "Lab1",
        qtitle: "Programs: InetAddress — Resolve, Enumerate & Spam Check",
        content: [
          { type: "code", label: "InetAddressDemo.java — Resolve hostname, get all IPs, enumerate interfaces",
            lines: [`import java.net.*;
import java.util.*;

public class InetAddressDemo {
    public static void main(String[] args) throws Exception {

        // ── DNS Lookup ──────────────────────────────────────────────
        InetAddress addr = InetAddress.getByName("www.google.com");
        System.out.println("Host Name   : " + addr.getHostName());
        System.out.println("IP Address  : " + addr.getHostAddress());
        System.out.println("toString()  : " + addr.toString());

        // Multiple IPs (CDN sites have many):
        System.out.println("\\n-- All IPs for www.tiktok.com --");
        for (InetAddress a : InetAddress.getAllByName("www.tiktok.com"))
            System.out.println("  " + a.getHostAddress());

        // ── Local & Loopback ────────────────────────────────────────
        InetAddress local    = InetAddress.getLocalHost();
        InetAddress loopback = InetAddress.getLoopbackAddress();
        System.out.println("\\nLocal IP   : " + local.getHostAddress());
        System.out.println("Loopback   : " + loopback.getHostAddress());

        // ── Address type checks ─────────────────────────────────────
        System.out.println("isLoopback      : " + local.isLoopbackAddress());
        System.out.println("isSiteLocal     : " + local.isSiteLocalAddress()); // 192.168.x.x
        System.out.println("isMulticast     : " + local.isMulticastAddress());

        // ── Enumerate ALL Network Interfaces ────────────────────────
        System.out.println("\\n=== All Network Interfaces ===");
        Enumeration<NetworkInterface> ifaces = NetworkInterface.getNetworkInterfaces();
        while (ifaces != null && ifaces.hasMoreElements()) {
            NetworkInterface ni = ifaces.nextElement();
            if (!ni.isUp()) continue; // skip inactive
            System.out.println("Name: " + ni.getName() + " | " + ni.getDisplayName());
            System.out.println("  MTU: " + ni.getMTU() + " | Loopback: " + ni.isLoopback());
            // MAC address
            byte[] mac = ni.getHardwareAddress();
            if (mac != null) {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < mac.length; i++)
                    sb.append(String.format("%02X%s", mac[i], i < mac.length-1 ? "-" : ""));
                System.out.println("  MAC: " + sb);
            }
            // IP addresses on this interface
            Enumeration<InetAddress> addrs = ni.getInetAddresses();
            while (addrs.hasMoreElements()) {
                InetAddress a = addrs.nextElement();
                System.out.println("  IP (" + (a instanceof Inet4Address ? "v4" : "v6") + "): " + a.getHostAddress());
            }
        }
    }
}`]
          },
          { type: "code", label: "SpamChecker.java — DNSBL-based spam IP check",
            lines: [`import java.net.*;

public class SpamChecker {
    static final String[] BLACKLISTS = {"zen.spamhaus.org", "bl.spamcop.net"};

    // Method: Reverse IP octets and query DNSBL
    // "1.2.3.4" → query "4.3.2.1.zen.spamhaus.org"
    // If resolves → BLACKLISTED. If UnknownHostException → CLEAN.
    public static boolean isSpam(String ip) {
        String[] parts = ip.split("\\\\.");
        if (parts.length != 4) return false;
        String rev = parts[3]+"."+parts[2]+"."+parts[1]+"."+parts[0];

        for (String bl : BLACKLISTS) {
            try {
                InetAddress.getByName(rev + "." + bl);
                System.out.println("  BLACKLISTED in: " + bl);
                return true;
            } catch (UnknownHostException e) {
                System.out.println("  Clean in: " + bl);
            }
        }
        return false;
    }

    public static void main(String[] args) {
        for (String ip : new String[]{"127.0.0.2", "8.8.8.8", "192.168.1.1"}) {
            System.out.println("Checking: " + ip);
            System.out.println("Result: " + (isSpam(ip) ? "SPAM" : "CLEAN") + "\\n");
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
        qtitle: "InetAddress — Creation Methods, Getters & Address Types",
        content: [
          { type: "definition", text: "InetAddress: A Java class in java.net representing an IP address — either IPv4 (32-bit, Inet4Address) or IPv6 (128-bit, Inet6Address). It combines a hostname and its corresponding IP. Abstract — actual instances are Inet4Address or Inet6Address." },
          { type: "heading", text: "Factory Methods" },
          { type: "table", headers: ["Method", "Description"],
            rows: [
              ["InetAddress.getByName(host)", "DNS lookup — hostname → IP. Can also pass IP string directly."],
              ["InetAddress.getAllByName(host)", "Returns ALL IPs for a hostname (CDN sites have many)."],
              ["InetAddress.getLocalHost()", "IP of the local machine."],
              ["InetAddress.getLoopbackAddress()", "127.0.0.1 (IPv4) or ::1 (IPv6)"],
              ["InetAddress.getByAddress(byte[])", "Create from raw bytes (4 bytes for IPv4, 16 for IPv6)."],
            ]
          },
          { type: "heading", text: "Getter Methods" },
          { type: "table", headers: ["Method", "Returns", "Example"],
            rows: [
              ["getHostName()", "Hostname (reverse DNS if needed)", "\"www.google.com\""],
              ["getHostAddress()", "IP as String (no DNS lookup)", "\"142.250.195.36\""],
              ["getAddress()", "Raw IP as byte[]", "[142, -6, -61, 36] (4 bytes IPv4)"],
              ["getCanonicalHostName()", "Fully qualified domain name", "\"lga34s20-in-f4.1e100.net\""],
              ["toString()", "hostname/IP", "\"www.google.com/142.250.195.36\""],
            ]
          },
          { type: "heading", text: "Address Types — isXxx() Methods" },
          { type: "table", headers: ["Type", "Range", "Method"],
            rows: [
              ["Loopback", "127.0.0.0/8 (IPv4), ::1 (IPv6)", "isLoopbackAddress()"],
              ["Site-Local (Private LAN)", "10.x.x.x, 172.16.x.x, 192.168.x.x", "isSiteLocalAddress()"],
              ["Link-Local (APIPA)", "169.254.0.0/16 (auto-assigned when DHCP fails)", "isLinkLocalAddress()"],
              ["Multicast", "224.0.0.0 – 239.255.255.255", "isMulticastAddress()"],
              ["Wildcard/Any", "0.0.0.0 — 'all local addresses', used by servers", "isAnyLocalAddress()"],
            ]
          },
          { type: "heading", text: "Inet4Address vs Inet6Address" },
          { type: "table", headers: ["Aspect", "Inet4Address", "Inet6Address"],
            rows: [
              ["Version", "IPv4", "IPv6"],
              ["Bits", "32 bits (4 bytes)", "128 bits (16 bytes)"],
              ["Format", "Dotted decimal: 192.168.1.1", "Colon-hex: 2001:db8::1"],
              ["Addresses", "~4.3 billion", "340 undecillion"],
              ["Loopback", "127.0.0.1", "::1"],
              ["Check type", "addr instanceof Inet4Address", "addr instanceof Inet6Address"],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "NetworkInterface — Factory Methods & Getter Methods",
        content: [
          { type: "definition", text: "NetworkInterface: Represents a network interface card (NIC) installed in the machine. Lets you inspect hardware details (name, MAC, MTU) and software details (IPs assigned to it)." },
          { type: "table", headers: ["Factory Method", "Description"],
            rows: [
              ["NetworkInterface.getByName(\"eth0\")", "Get interface by system name (eth0, wlan0, lo on Linux)"],
              ["NetworkInterface.getByIndex(1)", "Get by numeric OS index"],
              ["NetworkInterface.getByInetAddress(ip)", "Get the interface that has this IP assigned"],
              ["NetworkInterface.getNetworkInterfaces()", "Enumeration of ALL interfaces on the machine"],
            ]
          },
          { type: "table", headers: ["Getter Method", "Returns"],
            rows: [
              ["getName()", "Short name: 'eth0', 'wlan0', 'lo'"],
              ["getDisplayName()", "Human-readable: 'Intel Wi-Fi 6'"],
              ["getInetAddresses()", "All IP addresses (IPv4 and IPv6) on this interface"],
              ["getHardwareAddress()", "MAC address as byte[] (null for loopback/virtual)"],
              ["getMTU()", "Max Transmission Unit — max bytes per packet (usually 1500)"],
              ["isUp()", "Is interface currently active/connected?"],
              ["isLoopback()", "Is it the loopback (127.0.0.1) interface?"],
              ["supportsMulticast()", "Can it send/receive multicast packets?"],
            ]
          },
        ]
      },
      {
        qnum: "Lab2",
        qtitle: "Lab: URL Parts, URI Parts & URLEncoder/Decoder",
        content: [
          { type: "diagram", text: `
URL ANATOMY:
  https://user:pass@www.example.com:8080/path/page.html?q=java#section2
  └─┬──┘  └───┬───┘ └──────┬──────┘└─┬┘└──────┬──────┘└──┬──┘└───┬───┘
 Protocol UserInfo    Host        Port     Path        Query  Fragment

URL METHODS:          URI METHODS (additional):
  getProtocol()         getScheme()
  getUserInfo()         getSchemeSpecificPart()
  getHost()             getRawQuery() ← encoded form
  getPort()             getQuery()    ← decoded form
  getPath()             uri.normalize() → removes . and ..
  getQuery()            uri.resolve(relative) → resolve relative URI
  getRef() (fragment)   uri.toURL() → convert to URL` },
          { type: "table", headers: ["Aspect", "URL", "URI"],
            rows: [
              ["Full form", "Uniform Resource LOCATOR", "Uniform Resource IDENTIFIER"],
              ["Purpose", "Specifies HOW to access a resource (includes protocol)", "Just IDENTIFIES a resource"],
              ["Scope", "Subset of URI — all URLs are URIs", "Broader — includes URLs and URNs"],
              ["Methods", "url.openStream(), url.openConnection()", "Cannot open connections directly"],
              ["Encoding", "Does NOT handle encoding/decoding", "Has getRawXxx() (encoded) and getXxx() (decoded)"],
            ]
          },
          { type: "code", label: "URLParts.java + URIParts.java + URLEncoder demo",
            lines: [`import java.net.*;

public class URLPartsDemo {
    public static void main(String[] args) throws Exception {
        // ── URL Parts ────────────────────────────────────────────────
        URL url = new URL("https://user:pass@www.example.com:8080/path/page?q=java#section");
        System.out.println("Protocol   : " + url.getProtocol());   // https
        System.out.println("UserInfo   : " + url.getUserInfo());   // user:pass
        System.out.println("Host       : " + url.getHost());       // www.example.com
        System.out.println("Port       : " + url.getPort());       // 8080
        System.out.println("Default Port: " + url.getDefaultPort()); // 443 for https
        System.out.println("Path       : " + url.getPath());       // /path/page
        System.out.println("Query      : " + url.getQuery());      // q=java
        System.out.println("Ref/Fragment: " + url.getRef());       // section

        // Relative URL (needs a base)
        URL base = new URL("https://www.example.com/docs/");
        URL rel  = new URL(base, "../images/logo.png");
        System.out.println("\\nRelative resolved: " + rel);
        // → https://www.example.com/images/logo.png

        // ── URI Parts ────────────────────────────────────────────────
        URI uri = new URI("https://user:pass@www.example.com:8080/path?q=hello+world#frag");
        System.out.println("\\nScheme     : " + uri.getScheme());
        System.out.println("Authority  : " + uri.getAuthority());
        System.out.println("Host       : " + uri.getHost());
        System.out.println("RawQuery   : " + uri.getRawQuery()); // encoded
        System.out.println("Query      : " + uri.getQuery());    // decoded
        System.out.println("Fragment   : " + uri.getFragment());
        System.out.println("Is Absolute: " + uri.isAbsolute());

        URI messy = new URI("https://example.com/a/b/../c/./d");
        System.out.println("Normalized : " + messy.normalize()); // /a/c/d

        // ── URLEncoder / URLDecoder ──────────────────────────────────
        String original = "Hello World! City=Kathmandu/Nepal";
        String encoded  = URLEncoder.encode(original, "UTF-8");
        String decoded  = URLDecoder.decode(encoded,  "UTF-8");
        System.out.println("\\nOriginal: " + original);
        System.out.println("Encoded : " + encoded); // Hello+World%21+City%3DKathmandu%2FNepal
        System.out.println("Decoded : " + decoded);
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u3",
    title: "Unit 3 — URL, URI, Proxy, Authenticator & Cookies",
    badge: "Assignment 3 + Lab 3",
    color: "#4A148C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Proxy Class, ProxySelector & Authenticator",
        content: [
          { type: "definition", text: "Proxy: A server acting as intermediary between client and internet. Requests go to proxy first, then proxy forwards to target. Used for caching, security, logging, and bypassing firewalls." },
          { type: "table", headers: ["Proxy Type", "Constant", "Description"],
            rows: [
              ["Direct (no proxy)", "Proxy.NO_PROXY", "Connect directly without any proxy"],
              ["HTTP Proxy", "Proxy.Type.HTTP", "For HTTP/HTTPS web traffic. Most common."],
              ["SOCKS Proxy", "Proxy.Type.SOCKS", "Lower-level. Handles any TCP/UDP stream."],
            ]
          },
          { type: "code", label: "ProxyDemo.java + AuthenticatorDemo.java",
            lines: [`import java.net.*; import java.io.*;

public class ProxyAuthDemo {
    // ── PROXY: Connect through HTTP proxy ───────────────────────────
    static void proxyDemo() throws Exception {
        Proxy proxy = new Proxy(Proxy.Type.HTTP,
            new InetSocketAddress("192.168.1.254", 3128));
        URL url = new URL("http://www.example.com");
        URLConnection conn = url.openConnection(proxy); // connect via proxy
        System.out.println("Connected via proxy!");

        // Bypass proxy explicitly:
        URLConnection direct = url.openConnection(Proxy.NO_PROXY);

        // ProxySelector — auto-selects proxy per URL
        ProxySelector.setDefault(new ProxySelector() {
            @Override
            public java.util.List<Proxy> select(URI uri) {
                java.util.List<Proxy> list = new java.util.ArrayList<>();
                if ("http".equals(uri.getScheme()) && !uri.getHost().equals("localhost"))
                    list.add(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxy.corp.com", 8080)));
                else
                    list.add(Proxy.NO_PROXY);
                return list;
            }
            @Override
            public void connectFailed(URI uri, java.net.SocketAddress sa, IOException e) {
                System.err.println("Proxy failed: " + uri);
            }
        });
    }

    // ── AUTHENTICATOR: Handle HTTP 401 challenges ────────────────────
    static class MyAuthenticator extends Authenticator {
        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            System.out.println("Auth requested by: " + getRequestingHost());
            System.out.println("Realm: " + getRequestingPrompt());
            System.out.println("Scheme: " + getRequestingScheme()); // Basic, Digest
            return new PasswordAuthentication("myuser", "mypassword".toCharArray());
        }
    }

    public static void main(String[] args) throws Exception {
        // Register globally — called automatically when server returns 401
        Authenticator.setDefault(new MyAuthenticator());
        proxyDemo();
    }
}`]
          },
          { type: "heading", text: "CookiePolicy — Block .gov Domains" },
          { type: "code", label: "CustomCookiePolicy.java",
            lines: [`import java.net.*;

public class CustomCookiePolicy {
    static class BlockGovPolicy implements CookiePolicy {
        @Override
        public boolean shouldAccept(URI uri, HttpCookie cookie) {
            if (uri.getHost().toLowerCase().endsWith(".gov")) {
                System.out.println("BLOCKED: " + cookie.getName() + " from " + uri.getHost());
                return false;
            }
            System.out.println("ACCEPTED: " + cookie.getName() + " from " + uri.getHost());
            return true;
        }
    }

    public static void main(String[] args) throws Exception {
        CookieManager cm = new CookieManager(null, new BlockGovPolicy());
        CookieHandler.setDefault(cm);

        // Built-in policies:
        // CookiePolicy.ACCEPT_ALL             — accept all cookies
        // CookiePolicy.ACCEPT_NONE            — reject all
        // CookiePolicy.ACCEPT_ORIGINAL_SERVER — no 3rd-party cookies

        // After connecting, view stored cookies:
        CookieStore store = cm.getCookieStore();
        for (HttpCookie c : store.getCookies())
            System.out.println(c.getName() + "=" + c.getValue() + " domain=" + c.getDomain());
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u4",
    title: "Unit 4 — HTTP, URLConnection & HttpURLConnection",
    badge: "Assignments 4–5 + Lab 4",
    color: "#B71C1C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "HTTP Protocol — Request/Response, Status Codes & Methods",
        content: [
          { type: "definition", text: "HTTP (HyperText Transfer Protocol): The application-layer protocol powering the Web. Defines how clients send requests and servers send responses. HTTP is STATELESS — each request is fully independent." },
          { type: "diagram", text: `
HTTP REQUEST STRUCTURE:
  GET /index.html HTTP/1.1         ← Request Line: Method + Path + Version
  Host: www.example.com            ← Required header
  User-Agent: Java/11              ← Optional headers
  Accept: text/html
                                   ← Blank line separates headers from body
  [request body — empty for GET, form data for POST]

HTTP RESPONSE STRUCTURE:
  HTTP/1.1 200 OK                  ← Status Line: Version + Code + Message
  Content-Type: text/html; charset=UTF-8
  Content-Length: 1234
                                   ← Blank line
  <html>...</html>                 ← Response Body` },
          { type: "table", headers: ["Status Code", "Name", "Meaning"],
            rows: [
              ["200", "OK", "Request succeeded"],
              ["201", "Created", "Resource created (after POST)"],
              ["301", "Moved Permanently", "Resource moved. Client should update bookmarks."],
              ["302", "Found (Redirect)", "Temporary redirect. Follow Location header."],
              ["304", "Not Modified", "Client's cache is fresh. No body returned."],
              ["400", "Bad Request", "Client sent malformed request"],
              ["401", "Unauthorized", "Authentication required (WWW-Authenticate header sent)"],
              ["403", "Forbidden", "Server refuses; auth won't help"],
              ["404", "Not Found", "Resource doesn't exist"],
              ["500", "Internal Server Error", "Unexpected server error"],
            ]
          },
          { type: "table", headers: ["HTTP Method", "Purpose", "Has Body?", "Idempotent?"],
            rows: [
              ["GET", "Retrieve resource. Never changes state.", "No", "Yes"],
              ["POST", "Submit data — create/update resource.", "Yes", "No"],
              ["PUT", "Replace entire resource.", "Yes", "Yes"],
              ["DELETE", "Delete resource.", "No", "Yes"],
              ["HEAD", "GET but only headers returned (no body). Check if resource exists.", "No", "Yes"],
              ["PATCH", "Partially update resource (only changed fields).", "Yes", "No"],
              ["OPTIONS", "Ask server what methods are allowed for a URL.", "No", "Yes"],
            ]
          },
          { type: "heading", text: "Cookie Attributes" },
          { type: "table", headers: ["Attribute", "Description"],
            rows: [
              ["Name=Value", "The actual data: sessionId=abc123"],
              ["Domain", "Which domains receive this cookie. .example.com includes subdomains."],
              ["Path", "URL path prefix that must match: Path=/app/"],
              ["Max-Age", "Seconds until cookie expires. 0 = delete immediately."],
              ["Secure", "Cookie ONLY sent over HTTPS — never over HTTP."],
              ["HttpOnly", "JS cannot read this cookie. Prevents XSS session theft."],
              ["SameSite", "Controls cross-site sending: Strict / Lax / None."],
            ]
          },
          { type: "warning", text: "ALWAYS use HttpOnly for session cookies. If JavaScript can read your session cookie, XSS attacks can steal it. ALWAYS use Secure for sensitive cookies — don't send tokens over plain HTTP." },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "URLConnection & HttpURLConnection — GET and POST",
        content: [
          { type: "definition", text: "URLConnection: Abstract class representing a connection to a URL. url.openConnection() returns one. For http:// URLs, cast to HttpURLConnection for HTTP-specific features: request methods, response codes, redirects." },
          { type: "table", headers: ["Step", "Code", "Description"],
            rows: [
              ["1. Create URL", "new URL(string)", "Parse the URL string"],
              ["2. Open Connection", "url.openConnection()", "Creates connection object (not yet connected)"],
              ["3. Configure", "conn.setRequestProperty(k, v)", "Set headers, timeouts BEFORE connecting"],
              ["4. Connect", "conn.connect()", "Establishes actual TCP connection"],
              ["5. Read headers", "conn.getContentType()", "Examine response headers"],
              ["6. Read body", "conn.getInputStream()", "Stream response body content"],
              ["7. Close", "stream.close()", "Always close to release resources"],
            ]
          },
          { type: "code", label: "HttpURLConnectionDemo.java — GET and POST",
            lines: [`import java.net.*; import java.io.*;

public class HttpURLConnectionDemo {

    // ── GET Request ──────────────────────────────────────────────────
    static void doGet(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("User-Agent", "Java/11");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(10000);
        conn.setInstanceFollowRedirects(true); // auto-follow 301/302

        int code = conn.getResponseCode();
        System.out.println("GET Status: " + code + " " + conn.getResponseMessage());
        System.out.println("Content-Type: " + conn.getContentType());
        System.out.println("Last-Modified: " + new java.util.Date(conn.getLastModified()));

        // Read all response headers
        conn.getHeaderFields().forEach((k, v) -> System.out.println(k + " : " + v));

        if (code == HttpURLConnection.HTTP_OK) {
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"))) {
                String line;
                while ((line = br.readLine()) != null) System.out.println(line);
            }
        }
        conn.disconnect();
    }

    // ── POST Request ─────────────────────────────────────────────────
    static void doPost(String urlStr, String jsonBody) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(urlStr).openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true); // REQUIRED to enable writing request body

        try (OutputStream os = conn.getOutputStream();
             OutputStreamWriter w = new OutputStreamWriter(os, "UTF-8")) {
            w.write(jsonBody);
        }

        int code = conn.getResponseCode();
        System.out.println("POST Status: " + code);

        // getErrorStream() returns body even for 4xx/5xx errors
        InputStream stream = (code < 400) ? conn.getInputStream() : conn.getErrorStream();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(stream, "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) System.out.println(line);
        }
        conn.disconnect();
    }

    public static void main(String[] args) throws Exception {
        doGet("https://httpbin.org/get");
        doPost("https://httpbin.org/post", "{\\"name\\":\\"Hari\\",\\"age\\":22}");
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
        qtitle: "ServerSocket Lifecycle, Constructors & Options",
        content: [
          { type: "definition", text: "ServerSocket: Listens on a specific port, waiting for client connections. When a client connects, accept() returns a regular Socket representing that client. The server reads/writes through that Socket." },
          { type: "diagram", text: `
SERVERSOCKET LIFECYCLE:

  new ServerSocket(port)        ← Step 1: Bind port, start listening
         │
         ▼
  server.accept()               ← Step 2: BLOCKS until client connects
         │                               Returns Socket for that client
         ▼
  client.getInputStream()       ← Step 3: Get streams
  client.getOutputStream()
         │
         ▼
  Read / Write on streams       ← Step 4: Communicate
         │
         ▼
  client.close()                ← Step 5: Close client socket
         │
         └──────────────────► Go back to accept() (Step 2) for next client

CONSTRUCTORS:
  new ServerSocket()                         → Unbound. Set options, then bind().
  new ServerSocket(port)                     → Bind to port on ALL local addresses
  new ServerSocket(port, backlog)            → Custom connection queue size
  new ServerSocket(port, backlog, bindAddr)  → Bind to specific local IP only

KEY OPTIONS:
  setSoTimeout(ms)    → accept() times out after ms (0 = block forever)
  setReuseAddress(true) → allow binding to port in TIME_WAIT (prevents restart errors)
  getLocalPort()      → which port is bound
  isBound() / isClosed() → state checks` },
          { type: "code", label: "SimpleServer.java + SimpleClient.java — TCP echo",
            lines: [`// ── SERVER ────────────────────────────────────────────────────────
import java.net.*; import java.io.*;
public class SimpleServer {
    public static void main(String[] args) throws IOException {
        int port = 5000;
        ServerSocket server = new ServerSocket(port, 10); // backlog=10
        System.out.println("Listening on port " + port);

        while (true) {
            Socket client = server.accept(); // BLOCKS here
            System.out.println("Connected: " + client.getInetAddress().getHostAddress());

            BufferedReader in  = new BufferedReader(new InputStreamReader(client.getInputStream()));
            PrintWriter    out = new PrintWriter(client.getOutputStream(), true);

            String msg;
            while ((msg = in.readLine()) != null) { // BLOCKS until line received
                System.out.println("Got: " + msg);
                out.println("ECHO: " + msg);         // send back
                if ("bye".equalsIgnoreCase(msg.trim())) break;
            }
            client.close();
        }
    }
}`,
`// ── CLIENT ────────────────────────────────────────────────────────
import java.net.*; import java.io.*; import java.util.Scanner;
public class SimpleClient {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 5000);
        System.out.println("Connected to server.");

        PrintWriter    out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader in  = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            String input = sc.nextLine();
            out.println(input);                  // send to server
            System.out.println("Server: " + in.readLine()); // receive
            if ("bye".equalsIgnoreCase(input.trim())) break;
        }
        socket.close();
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Multithreaded Server — Handle Multiple Clients Simultaneously",
        content: [
          { type: "explain", text: "A single-threaded server handles one client at a time — client B waits while A is being served. A multithreaded server spawns a new thread (or uses a thread pool) for each accepted connection, allowing true simultaneous handling." },
          { type: "code", label: "MultiThreadedServer.java — Thread pool server",
            lines: [`import java.net.*; import java.io.*; import java.util.concurrent.*;

public class MultiThreadedServer {

    static class ClientHandler implements Runnable {
        private final Socket socket;
        ClientHandler(Socket s) { this.socket = s; }

        @Override
        public void run() {
            String ip = socket.getInetAddress().getHostAddress();
            System.out.println("[" + Thread.currentThread().getName() + "] Connected: " + ip);
            try (
                // ── Reading from client socket ──────────────────────────
                BufferedReader in = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));
                // ── Writing to client socket ────────────────────────────
                PrintWriter out = new PrintWriter(socket.getOutputStream(), true)
            ) {
                out.println("Welcome! Type 'bye' to quit.");
                String msg;
                while ((msg = in.readLine()) != null) {
                    System.out.println("[" + ip + "] " + msg);
                    if ("bye".equalsIgnoreCase(msg.trim())) { out.println("Goodbye!"); break; }
                    out.println("Echo: " + msg.toUpperCase());
                }
            } catch (IOException e) {
                System.out.println(ip + " error: " + e.getMessage());
            } finally {
                try { socket.close(); } catch (IOException e) {}
                System.out.println("[" + ip + "] Disconnected.");
            }
        }
    }

    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(5000);
        System.out.println("Multithreaded server started.");

        // Thread pool — reuse up to 10 threads (prevents memory exhaustion)
        ExecutorService pool = Executors.newFixedThreadPool(10);

        while (true) {
            Socket client = server.accept();       // blocks for next client
            pool.submit(new ClientHandler(client)); // assign to thread pool
            // Main thread immediately goes back to accept() for next client!
        }
    }
}`]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Lab: GUI Chat Application (Swing + TCP Sockets)",
        content: [
          { type: "code", label: "ChatServer.java — Broadcast to all clients",
            lines: [`import java.net.*; import java.io.*; import java.util.*; import java.util.concurrent.*;

public class ChatServer {
    static List<PrintWriter> clients = new CopyOnWriteArrayList<>();

    static void broadcast(String msg) {
        System.out.println("[BROADCAST] " + msg);
        for (PrintWriter pw : clients) pw.println(msg);
    }

    static class ClientHandler implements Runnable {
        private Socket socket; private PrintWriter out; private String username;
        ClientHandler(Socket s) { this.socket = s; }
        public void run() {
            try {
                BufferedReader in  = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                out = new PrintWriter(socket.getOutputStream(), true);
                username = in.readLine();     // first message = username
                clients.add(out);
                broadcast("*** " + username + " joined ***");
                String msg;
                while ((msg = in.readLine()) != null) {
                    if ("/quit".equals(msg)) break;
                    broadcast(username + ": " + msg);
                }
            } catch (IOException e) { System.out.println(username + " error: " + e.getMessage()); }
            finally {
                if (out != null) clients.remove(out);
                broadcast("*** " + username + " left ***");
                try { socket.close(); } catch (IOException e) {}
            }
        }
    }
    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(6000);
        System.out.println("Chat server on port 6000");
        ExecutorService pool = Executors.newCachedThreadPool();
        while (true) pool.submit(new ClientHandler(server.accept()));
    }
}`]
          },
          { type: "code", label: "ChatClient.java — Swing GUI chat client",
            lines: [`import javax.swing.*; import java.awt.*; import java.awt.event.*;
import java.net.*; import java.io.*;

public class ChatClient extends JFrame {
    private JTextArea  chatArea   = new JTextArea(20, 45);
    private JTextField inputField = new JTextField(35);
    private JButton    sendBtn    = new JButton("Send");
    private PrintWriter out;

    ChatClient(String host, int port, String username) {
        setTitle("Chat — " + username);
        setLayout(new BorderLayout(5, 5));
        chatArea.setEditable(false);
        chatArea.setFont(new Font("Monospaced", Font.PLAIN, 13));
        chatArea.setBackground(new Color(30,30,30));
        chatArea.setForeground(new Color(200,220,200));
        JPanel bottom = new JPanel(new FlowLayout(FlowLayout.LEFT));
        bottom.add(inputField); bottom.add(sendBtn);
        add(new JScrollPane(chatArea), BorderLayout.CENTER);
        add(bottom, BorderLayout.SOUTH);

        ActionListener send = e -> {
            String msg = inputField.getText().trim();
            if (!msg.isEmpty() && out != null) { out.println(msg); inputField.setText(""); }
        };
        sendBtn.addActionListener(send);
        inputField.addActionListener(send); // Enter key also sends

        pack(); setDefaultCloseOperation(EXIT_ON_CLOSE); setVisible(true);

        // Connect in background thread
        new Thread(() -> {
            try {
                Socket socket = new Socket(host, port);
                out = new PrintWriter(socket.getOutputStream(), true);
                out.println(username); // register username
                BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                String line;
                while ((line = in.readLine()) != null) {
                    final String msg = line;
                    // UI updates MUST be on Event Dispatch Thread!
                    SwingUtilities.invokeLater(() -> {
                        chatArea.append(msg + "\\n");
                        chatArea.setCaretPosition(chatArea.getDocument().getLength());
                    });
                }
            } catch (IOException ex) {
                SwingUtilities.invokeLater(() -> chatArea.append("Disconnected: " + ex.getMessage()));
            }
        }).start();
    }

    public static void main(String[] args) {
        String name = JOptionPane.showInputDialog("Enter username:");
        if (name != null && !name.trim().isEmpty()) new ChatClient("localhost", 6000, name.trim());
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
    badge: "Assignments 7–10 + Lab 5",
    color: "#E65100",
    sections: [
      {
        qnum: "Q1",
        qtitle: "UDP — DatagramSocket, DatagramPacket & TCP vs UDP",
        content: [
          { type: "definition", text: "UDP (User Datagram Protocol): A connectionless transport protocol. No handshake, no guaranteed delivery, no order preservation. Packets (datagrams) are sent independently — faster and lighter than TCP but unreliable." },
          { type: "diagram", text: `
TCP vs UDP COMPARISON:

┌────────────────────────────┬────────────────────────────┐
│           TCP              │           UDP              │
├────────────────────────────┼────────────────────────────┤
│ Connection-oriented        │ Connectionless             │
│ 3-way handshake            │ No setup needed            │
│ Guaranteed delivery        │ No guarantee — may drop    │
│ In-order delivery          │ May arrive out of order    │
│ Flow & congestion control  │ No flow control            │
│ Slower (overhead)          │ Faster (minimal overhead)  │
│ HTTP, FTP, SMTP, SSH       │ DNS, VoIP, Gaming, Video   │
│ Socket / ServerSocket      │ DatagramSocket / Packet    │
└────────────────────────────┴────────────────────────────┘

UDP LIFECYCLE:
  SERVER                          CLIENT
  DatagramSocket(port)            DatagramSocket() [random port]
  receive(packet) ← BLOCKS        send(packet → server addr:port)
  Read data from packet           Optionally receive(packet) reply
  Send reply back                 Close socket` },
          { type: "code", label: "UDPServer.java + UDPClient.java",
            lines: [`// ── UDP SERVER ───────────────────────────────────────────────────
import java.net.*;
public class UDPServer {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(7000);
        System.out.println("UDP Server on port 7000");
        byte[] buf = new byte[256];
        while (true) {
            DatagramPacket recv = new DatagramPacket(buf, buf.length);
            socket.receive(recv); // BLOCKS until datagram arrives
            String msg  = new String(recv.getData(), 0, recv.getLength());
            System.out.println("Received: " + msg + " from " + recv.getAddress());
            String reply = "Echo: " + msg;
            byte[] data  = reply.getBytes("UTF-8");
            socket.send(new DatagramPacket(data, data.length, recv.getAddress(), recv.getPort()));
        }
    }
}`,
`// ── UDP CLIENT ───────────────────────────────────────────────────
import java.net.*;
public class UDPClient {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(); // random port
        socket.setSoTimeout(5000); // 5-sec timeout for reply
        InetAddress addr = InetAddress.getByName("localhost");
        byte[] data = "Hello, UDP Server!".getBytes("UTF-8");
        socket.send(new DatagramPacket(data, data.length, addr, 7000));
        System.out.println("Sent datagram.");
        byte[] buf = new byte[512];
        DatagramPacket reply = new DatagramPacket(buf, buf.length);
        try {
            socket.receive(reply);
            System.out.println("Reply: " + new String(reply.getData(), 0, reply.getLength()));
        } catch (java.net.SocketTimeoutException e) {
            System.out.println("No reply in 5 seconds.");
        }
        socket.close();
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "NIO — ByteBuffer, Channels & Selector (Non-Blocking I/O)",
        content: [
          { type: "definition", text: "NIO (New I/O): Introduced in Java 1.4. Provides Channels (bidirectional data pipes), Buffers (containers of byte data), and Selectors (one thread monitoring many channels). Key advantage: a SINGLE thread can serve thousands of non-blocking connections." },
          { type: "table", headers: ["Concept", "Traditional I/O", "NIO"],
            rows: [
              ["Abstraction", "Streams (InputStream/OutputStream)", "Channels (SocketChannel, FileChannel)"],
              ["Data unit", "Bytes/chars sequentially", "ByteBuffer (block of bytes)"],
              ["Blocking", "Blocking (thread waits)", "Can be non-blocking (thread continues)"],
              ["Multiplexing", "One thread per connection", "ONE thread handles many via Selector"],
              ["Scalability", "10k clients = 10k threads", "10k clients = 1-2 threads with Selector"],
            ]
          },
          { type: "diagram", text: `
BYTEBUFFER STATE MACHINE:

  [New Buffer]  →  allocate(n)  →  [WRITE MODE: position=0, limit=capacity]
                                          │
                                       put(data)  → writes data, position advances
                                          │
                                       flip()     → SWITCH to READ MODE
                                          │         limit=position, position=0
                                          ▼
                               [READ MODE: position=0, limit=data_end]
                                          │
                                       get()      → reads data, position advances
                                          │
                               remaining() = limit - position  ← unread bytes
                                          │
                               clear()    → back to WRITE MODE (position=0, limit=cap)
                               compact()  → move unread bytes to front, then write mode

SELECTIONKEY OPERATIONS:
  OP_ACCEPT  = 16  → ServerSocketChannel ready to accept new connection
  OP_READ    =  1  → SocketChannel has data to read
  OP_WRITE   =  4  → SocketChannel can accept write data
  OP_CONNECT =  8  → Client SocketChannel finished connecting` },
          { type: "code", label: "NIOServer.java — Non-blocking server with Selector",
            lines: [`import java.nio.*; import java.nio.channels.*; import java.net.*; import java.util.*;

public class NIOServer {
    public static void main(String[] args) throws Exception {
        ServerSocketChannel serverCh = ServerSocketChannel.open();
        serverCh.socket().bind(new InetSocketAddress(9000));
        serverCh.configureBlocking(false); // ← non-blocking mode

        Selector selector = Selector.open();
        serverCh.register(selector, SelectionKey.OP_ACCEPT); // watch for connections
        System.out.println("NIO Non-blocking Server on port 9000");

        while (true) {
            selector.select(); // BLOCKS until at least one channel is ready

            Set<SelectionKey> keys = selector.selectedKeys();
            Iterator<SelectionKey> iter = keys.iterator();

            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove(); // MUST remove processed key

                if (key.isAcceptable()) {
                    // New client connecting
                    SocketChannel client = ((ServerSocketChannel) key.channel()).accept();
                    client.configureBlocking(false);
                    client.register(selector, SelectionKey.OP_READ); // watch for data
                    System.out.println("Client connected: " + client.getRemoteAddress());

                } else if (key.isReadable()) {
                    // Client sent data
                    SocketChannel client = (SocketChannel) key.channel();
                    ByteBuffer buf = ByteBuffer.allocate(256);
                    int n = client.read(buf);
                    if (n == -1) {
                        client.close(); key.cancel(); // client disconnected
                    } else {
                        buf.flip();                    // switch to read mode
                        byte[] data = new byte[buf.remaining()];
                        buf.get(data);
                        System.out.println("Received: " + new String(data).trim());
                        // Echo back
                        ByteBuffer reply = ByteBuffer.wrap(("ECHO: " + new String(data)).getBytes());
                        client.write(reply);
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
          { type: "definition", text: "IP Multicasting: One-to-many communication. A sender sends ONE packet to a multicast group address (224.0.0.0–239.255.255.255). All machines that have JOINED that group receive the packet — more efficient than individual copies." },
          { type: "code", label: "MulticastSender.java + MulticastReceiver.java",
            lines: [`// ── SENDER ──────────────────────────────────────────────────────
import java.net.*;
public class MulticastSender {
    public static void main(String[] args) throws Exception {
        InetAddress group = InetAddress.getByName("230.0.0.1"); // multicast group address
        MulticastSocket socket = new MulticastSocket();
        socket.setTimeToLive(1); // TTL=1 → stay on local subnet only
        for (String msg : new String[]{"Hello Group!", "Message 2", "END"}) {
            byte[] data = msg.getBytes("UTF-8");
            socket.send(new DatagramPacket(data, data.length, group, 4446));
            System.out.println("Sent: " + msg);
            Thread.sleep(1000);
        }
        socket.close();
    }
}`,
`// ── RECEIVER ────────────────────────────────────────────────────
import java.net.*;
public class MulticastReceiver {
    public static void main(String[] args) throws Exception {
        InetAddress group = InetAddress.getByName("230.0.0.1");
        MulticastSocket socket = new MulticastSocket(4446);
        socket.joinGroup(group); // ← subscribe to this multicast group
        System.out.println("Joined multicast group. Waiting...");
        byte[] buf = new byte[256];
        while (true) {
            DatagramPacket pkt = new DatagramPacket(buf, buf.length);
            socket.receive(pkt);
            String msg = new String(pkt.getData(), 0, pkt.getLength());
            System.out.println("Received: " + msg);
            if ("END".equals(msg)) break;
        }
        socket.leaveGroup(group); // ← unsubscribe
        socket.close();
    }
}`]
          },
          { type: "heading", text: "Secure Sockets (SSL/TLS)" },
          { type: "table", headers: ["Aspect", "Regular Socket", "SSL Socket"],
            rows: [
              ["Data", "Plain text — readable if intercepted", "Encrypted — unreadable without key"],
              ["Authentication", "None — unknown who you're talking to", "Certificate-based identity verification"],
              ["Java class", "Socket / ServerSocket", "SSLSocket / SSLServerSocket"],
              ["Factory", "new Socket()", "SSLSocketFactory.getDefault().createSocket()"],
              ["Port", "Any", "HTTPS=443, SMTPS=465"],
            ]
          },
          { type: "code", label: "SSLClient.java + SSLServer.java",
            lines: [`// ── SSL CLIENT ──────────────────────────────────────────────────
import javax.net.ssl.*; import java.io.*;
public class SSLClient {
    public static void main(String[] args) throws Exception {
        SSLSocketFactory factory = (SSLSocketFactory) SSLSocketFactory.getDefault();
        try (SSLSocket socket = (SSLSocket) factory.createSocket("localhost", 8443)) {
            socket.setEnabledProtocols(new String[]{"TLSv1.2", "TLSv1.3"});
            socket.startHandshake(); // perform TLS handshake
            SSLSession session = socket.getSession();
            System.out.println("Protocol    : " + session.getProtocol());
            System.out.println("CipherSuite : " + session.getCipherSuite());
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            out.println("Hello over SSL!");
            System.out.println("Server: " + in.readLine());
        }
    }
}`,
`// ── SSL SERVER ──────────────────────────────────────────────────
// First generate keystore: keytool -genkey -alias myserver -keyalg RSA -keystore server.jks
import javax.net.ssl.*; import java.io.*;
public class SSLServer {
    public static void main(String[] args) throws Exception {
        System.setProperty("javax.net.ssl.keyStore", "server.jks");
        System.setProperty("javax.net.ssl.keyStorePassword", "password");
        SSLServerSocketFactory factory = (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();
        try (SSLServerSocket server = (SSLServerSocket) factory.createServerSocket(8443)) {
            System.out.println("SSL Server on port 8443");
            while (true) {
                SSLSocket client = (SSLSocket) server.accept(); // TLS handshake done here
                new Thread(() -> {
                    try {
                        BufferedReader in  = new BufferedReader(new InputStreamReader(client.getInputStream()));
                        PrintWriter    out = new PrintWriter(client.getOutputStream(), true);
                        String msg = in.readLine();
                        System.out.println("Received: " + msg);
                        out.println("SSL Echo: " + msg);
                        client.close();
                    } catch (IOException e) { e.printStackTrace(); }
                }).start();
            }
        }
    }
}
// Run client: java -Djavax.net.ssl.trustStore=server.jks -Djavax.net.ssl.trustStorePassword=password SSLClient`]
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
        qtitle: "RMI — Architecture, Block Diagram & Complete Example",
        content: [
          { type: "definition", text: "RMI (Remote Method Invocation): Allows an object in one JVM to call methods of an object in a DIFFERENT JVM (same machine or over the network). The network communication is completely hidden — it looks exactly like a local method call." },
          { type: "diagram", text: `
RMI ARCHITECTURE:

CLIENT JVM                              SERVER JVM
┌───────────────────┐                   ┌────────────────────────────────┐
│  Client App       │                   │  Remote Object (Impl)          │
│  service.add(5,3) │   Looks local!    │  add(a,b) { return a+b; }     │
└────────┬──────────┘                   └────────────────┬───────────────┘
         │                                               │
┌────────▼──────────┐   ═══Network═══  ┌────────────────▼───────────────┐
│   CLIENT STUB     │   args serialized │   SKELETON                     │
│ (local proxy)     │ ─────────────────► (unmarshal, call, marshal)     │
│ marshals params   │ ◄───────────────── result serialized               │
│ sends over TCP    │                   └────────────────────────────────┘
└───────────────────┘

         RMI REGISTRY (port 1099)
         Server: Naming.rebind("rmi://localhost/ServiceName", impl)
         Client: Naming.lookup("rmi://localhost/ServiceName") → gets Stub

TERMS:
  Marshaling   → Serializing parameters into byte stream for network
  Unmarshaling → Deserializing received bytes back to Java objects
  Stub         → Client-side proxy that looks like the remote object
  Skeleton     → Server-side receiver (auto-generated in modern Java)` },
          { type: "table", headers: ["Component", "Where", "Role"],
            rows: [
              ["Remote Interface", "Shared (both sides)", "Declares callable methods. extends java.rmi.Remote. ALL methods throw RemoteException."],
              ["Remote Impl (Server)", "Server only", "Actual logic. extends UnicastRemoteObject. implements the Interface."],
              ["Stub", "Client side (auto-generated)", "Marshals args, sends over TCP, unmarshals result."],
              ["RMI Registry", "Server (port 1099)", "Naming service. Server binds, Client looks up."],
            ]
          },
          { type: "code", label: "Complete RMI — Calculator (3 files)",
            lines: [
`// ── FILE 1: CalculatorService.java (Remote Interface — SHARED) ──
import java.rmi.*;
public interface CalculatorService extends Remote {
    // ALL methods MUST throw RemoteException — network can always fail!
    double add(double a, double b)       throws RemoteException;
    double subtract(double a, double b)  throws RemoteException;
    double multiply(double a, double b)  throws RemoteException;
    double divide(double a, double b)    throws RemoteException;
}`,
`// ── FILE 2: CalculatorServiceImpl.java (SERVER) ─────────────────
import java.rmi.*; import java.rmi.server.*; import java.rmi.registry.*;

public class CalculatorServiceImpl extends UnicastRemoteObject
                                   implements CalculatorService {

    protected CalculatorServiceImpl() throws RemoteException { super(); }

    public double add(double a, double b) throws RemoteException {
        System.out.println("[SERVER] add(" + a + ", " + b + ")");
        return a + b;
    }
    public double subtract(double a, double b) throws RemoteException { return a - b; }
    public double multiply(double a, double b) throws RemoteException { return a * b; }
    public double divide(double a, double b)   throws RemoteException {
        if (b == 0) throw new RemoteException("Division by zero!");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            // Step 1: Start RMI Registry on port 1099
            Registry registry = LocateRegistry.createRegistry(1099);
            System.out.println("RMI Registry started.");

            // Step 2: Create and bind the remote object
            CalculatorServiceImpl calc = new CalculatorServiceImpl();
            Naming.rebind("rmi://localhost/CalculatorService", calc);
            // rebind = replace if name exists (bind = error if exists)
            System.out.println("CalculatorService ready. Waiting for clients...");
        } catch (Exception e) { e.printStackTrace(); }
    }
}`,
`// ── FILE 3: CalculatorClient.java (CLIENT) ───────────────────────
import java.rmi.*;
public class CalculatorClient {
    public static void main(String[] args) {
        try {
            // Step 3: Look up service → receives CLIENT STUB
            CalculatorService calc = (CalculatorService)
                Naming.lookup("rmi://localhost/CalculatorService");

            // Step 4: Call methods — looks local, runs on server!
            System.out.println("15.5 + 24.5 = " + calc.add(15.5, 24.5));     // 40.0
            System.out.println("100 - 37.5 = "  + calc.subtract(100, 37.5));  // 62.5
            System.out.println("6 × 7 = "       + calc.multiply(6, 7));        // 42.0
            System.out.println("99 ÷ 3 = "      + calc.divide(99, 3));         // 33.0

        } catch (NotBoundException e) { System.err.println("Service not found: " + e.getMessage()); }
        catch (RemoteException e)     { System.err.println("Remote error: " + e.getMessage()); }
        catch (Exception e)           { e.printStackTrace(); }
    }
}
// HOW TO RUN:
// 1. javac CalculatorService.java CalculatorServiceImpl.java CalculatorClient.java
// 2. java CalculatorServiceImpl   (starts server + registry)
// 3. java CalculatorClient        (in another terminal)`
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u8",
    title: "Unit 8 — 2026 Exam Predictions 🎯",
    badge: "Past Paper Analysis (2020, 2021, 2023)",
    color: "#C62828",
    sections: [
      {
        qnum: "PRED",
        qtitle: "2026 Predicted Questions — Based on 3 Years of Past Papers",
        content: [
          { type: "warning", text: "Based on TU BCA Network Programming exam patterns from 2020, 2021, and 2023. The 2023 MCQ confirmed: socket port = 16 bits. Questions marked ★ appeared multiple times — very likely to repeat!" },
          { type: "heading", text: "Group B Predictions (5 Marks Each)" },
          { type: "table", headers: ["Predicted Question", "Probability", "Unit"],
            rows: [
              ["★ What is Client-Server model? Explain with block diagram", "Very High — appears every year as Q1", "Unit 1"],
              ["★ What is InetAddress? Explain its factory methods and getter methods", "Very High — core topic of Unit 2", "Unit 2"],
              ["★ Differentiate TCP and UDP. Explain DatagramSocket with example", "Very High — asked in 2021 & 2023", "Unit 6"],
              ["★ What is URL? Explain its parts with example. Differentiate URL vs URI", "High — URL/URI comparison classic Q", "Unit 2–3"],
              ["Explain HTTP request/response structure with all status codes", "High — HTTP asked every year", "Unit 4"],
              ["Explain features of Java for network programming", "High — introductory question", "Unit 1"],
              ["What is Proxy? Explain Proxy class and ProxySelector with example", "High", "Unit 3"],
              ["Explain URLConnection class — how to read a web page", "High", "Unit 4–5"],
              ["What is NIO? Compare NIO with traditional I/O", "High — NIO is unique to this course", "Unit 6"],
              ["Explain cookie attributes (HttpOnly, Secure, Domain, etc.)", "Medium-High", "Unit 3–4"],
              ["What is IP Multicasting? Explain MulticastSocket with example", "Medium-High — asked 2021", "Unit 6"],
              ["Explain ServerSocket lifecycle — constructors and options", "Medium", "Unit 5"],
              ["What is SSL/TLS? Explain secure sockets with difference from regular", "Medium", "Unit 6"],
              ["Explain Authenticator and PasswordAuthentication classes", "Medium", "Unit 3"],
              ["What is RMI? Explain its architecture and components", "High — every year includes RMI", "Unit 7"],
            ]
          },
          { type: "heading", text: "Group C Predictions (10–15 Marks)" },
          { type: "table", headers: ["Predicted Question", "Why Likely", "Unit"],
            rows: [
              ["★ Write multithreaded server (or GUI chat server + client)", "Long coding Q — appears almost every year", "Unit 5"],
              ["★ Write complete RMI example — interface + server + client", "Standard 3-file coding question", "Unit 7"],
              ["Write UDP client-server (daytime or echo) — include all packet steps", "UDP coding Q — appeared 2021 and 2023", "Unit 6"],
              ["Write NIO non-blocking server using Selector and ByteBuffer", "NIO is unique to this subject — high chance", "Unit 6"],
              ["Write program to read InetAddress details and enumerate all interfaces", "Lab 1 type question — foundational", "Unit 1–2"],
              ["Write HttpURLConnection GET + POST with headers and response code handling", "HTTP practical — asked in various forms", "Unit 4"],
              ["Explain RMI architecture with diagram AND write parameter marshaling example", "Theory + code combo — common in Group C", "Unit 7"],
            ]
          },
          { type: "heading", text: "MCQ High-Probability Topics (2023 confirmed!)" },
          { type: "table", headers: ["MCQ Topic", "Key Answer", "Source"],
            rows: [
              ["Valid size of a socket port address", "16 bits (0–65535)", "2023 MCQ confirmed!"],
              ["Exception when host cannot be resolved", "UnknownHostException", "Lab 1 programs"],
              ["UDP Java class for datagrams", "DatagramSocket and DatagramPacket", "Common"],
              ["TCP Java class for server", "ServerSocket (not Socket!)", "Common"],
              ["accept() return type", "Socket (regular Socket, not ServerSocket)", "Common"],
              ["Multicast address range", "224.0.0.0 – 239.255.255.255", "Unit 6"],
              ["NIO class for monitoring multiple channels", "Selector", "Unit 6"],
              ["NIO class for data containers", "ByteBuffer", "Unit 6"],
              ["flip() purpose in ByteBuffer", "Switch from write to read mode (limit=pos, pos=0)", "Unit 6"],
              ["RMI registry default port", "1099", "Unit 7"],
              ["RMI interface must extend", "java.rmi.Remote", "Unit 7"],
              ["HTTP method to get headers only (no body)", "HEAD", "Unit 4"],
              ["HTTP status code for 'Not Found'", "404", "Unit 4"],
              ["Loopback address IPv4", "127.0.0.1 (isLoopbackAddress() = true)", "Unit 2"],
              ["Which address type: 192.168.x.x", "Site-local / Private LAN (isSiteLocalAddress())", "Unit 2"],
            ]
          },
        ]
      },
      {
        qnum: "CHEAT",
        qtitle: "Quick Reference Cheat Sheet",
        content: [
          { type: "heading", text: "TCP Socket — Two Sides Quick Reference" },
          { type: "diagram", text: `
SERVER SIDE                         CLIENT SIDE
ServerSocket ss = new              Socket s = new
  ServerSocket(port)                 Socket("localhost", port)
Socket client = ss.accept()
                                   // No accept() needed — client connects directly!
BufferedReader in = new            BufferedReader in = new
  BufferedReader(new                 BufferedReader(new
  InputStreamReader(                 InputStreamReader(
  client.getInputStream()))          s.getInputStream()))
PrintWriter out = new              PrintWriter out = new
  PrintWriter(                       PrintWriter(
  client.getOutputStream(), true)    s.getOutputStream(), true)
String msg = in.readLine()         out.println("Hello");
out.println("Echo: " + msg)        String reply = in.readLine()
client.close()                     s.close()` },
          { type: "heading", text: "UDP — Two Sides Quick Reference" },
          { type: "diagram", text: `
SERVER SIDE                         CLIENT SIDE
DatagramSocket ds =                DatagramSocket ds =
  new DatagramSocket(port)           new DatagramSocket() // random port
byte[] buf = new byte[256]         byte[] data = msg.getBytes()
DatagramPacket p =                 DatagramPacket p = new DatagramPacket(
  new DatagramPacket(buf, buf.len)   data, data.len, serverAddr, serverPort)
ds.receive(p) // BLOCKS            ds.send(p) // fire-and-forget
String msg = new String(           // optionally receive reply
  p.getData(), 0, p.getLength())
// send reply back
ds.send(new DatagramPacket(reply, reply.len, p.getAddress(), p.getPort()))` },
          { type: "heading", text: "NIO ByteBuffer — All Methods" },
          { type: "diagram", text: `
ByteBuffer.allocate(n)         → Create heap buffer (n bytes capacity)
ByteBuffer.allocateDirect(n)   → Create direct buffer (faster for I/O)
buf.put(data)                  → Write data, advances position
buf.flip()                     → Switch WRITE→READ: limit=pos, pos=0  ← MOST IMPORTANT
buf.get(arr)                   → Read data, advances position
buf.remaining()                → limit - position (bytes left to read)
buf.clear()                    → Reset for fresh WRITE: pos=0, limit=cap
buf.compact()                  → Move unread bytes to front, ready for more writing
buf.rewind()                   → Reset position=0, keep limit (re-read from start)
buf.mark()                     → Save position
buf.reset()                    → Go back to marked position` },
          { type: "heading", text: "RMI — 5 Steps Always" },
          { type: "diagram", text: `
Step 1: interface MyService extends Remote { method() throws RemoteException; }
Step 2: class MyImpl extends UnicastRemoteObject implements MyService { ... }
Step 3: [Server] LocateRegistry.createRegistry(1099);
         Naming.rebind("rmi://localhost/MyService", new MyImpl());
Step 4: [Client] MyService s = (MyService) Naming.lookup("rmi://localhost/MyService");
Step 5: s.method()  ← looks local, runs on server!

KEY RULES:
  • Interface MUST extend java.rmi.Remote
  • ALL methods MUST declare throws RemoteException
  • Implementation MUST extend UnicastRemoteObject
  • Registry default port = 1099
  • Naming.bind() → error if name exists
  • Naming.rebind() → replaces if name exists (safer)` },
          { type: "tip", label: "TOP 4 MUST-PREPARE", text: "1) Multithreaded TCP Chat Server (ChatServer.java + ChatClient.java). 2) Complete RMI example (3 files: Interface + Server + Client). 3) UDP Server/Client (DatagramSocket + DatagramPacket). 4) NIO Server with Selector + ByteBuffer. These 4 coding templates cover ~65% of Group C marks." },
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
        <button onClick={handleCopy} style={{ background: copied ? "#22C55E" : "#475569", color: "#fff", border: "none", borderRadius: 5, padding: "4px 12px", fontSize: 11, cursor: "pointer", fontWeight: 600, transition: "background 0.2s" }}>
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
        <div style={{ background: COLORS.tip_bg, border: `1px solid ${COLORS.tip_border}`, borderLeft: `4px solid ${COLORS.tip_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0", display: "flex", gap: 10, alignItems: "flex-start" }}>
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
                <th key={i} style={{ background: "#1E293B", color: "#fff", padding: "9px 12px", textAlign: "left", fontWeight: 700, borderBottom: "2px solid #334155" }}>{h}</th>
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

export default function Networking() {
  const [activeUnit, setActiveUnit] = useState("u1");
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text, textAlign: "left" }}>
      <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#0EA5E9", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌐</div>
          <div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: 19, fontWeight: 700 }}>Network Programming — BCA 6th Semester</h1>
            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>Complete Exam Guide 2026 • CACS355 • 7 Units + Predictions</div>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderBottom: `2px solid ${COLORS.border}`, overflowX: "auto" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 0, minWidth: "max-content" }}>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => setActiveUnit(u.id)}
              style={{ padding: "13px 14px", border: "none", background: "none", cursor: "pointer", fontSize: 12, fontWeight: activeUnit === u.id ? 700 : 500, color: activeUnit === u.id ? u.color : COLORS.muted, borderBottom: activeUnit === u.id ? `3px solid ${u.color}` : "3px solid transparent", whiteSpace: "nowrap", transition: "all 0.15s" }}>
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
                style={{ width: "100%", background: open ? "#F8FAFC" : "#fff", border: "none", padding: "15px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "background 0.15s" }}>
                <span style={{ background: unit.color, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, minWidth: 60, textAlign: "center", whiteSpace: "nowrap" }}>{sec.qnum}</span>
                <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, flex: 1 }}>{sec.qtitle}</span>
                <span style={{ color: COLORS.muted, fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-block" }}>▾</span>
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
