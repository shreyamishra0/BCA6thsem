import { useState } from "react";

const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Client-Server Model, Network Programming & Java Features",
    badge: "Assignment 1 + Lab 1",
    color: "#1A237E",
    sections: [
      {
        qnum: "A1-Q1",
        qtitle: "Client-Server Application Model — Architecture & Block Diagram",
        content: [
          {
            type: "explain",
            text: "The Client-Server model is the foundation of all network communication. It divides the application into two roles: a Client (who requests services) and a Server (who provides services). These roles communicate over a network using well-defined protocols."
          },
          {
            type: "definition",
            text: "Client-Server Model: An architectural pattern where a Client machine sends a request over a network to a Server machine, which processes the request and sends back a response. The server waits (listens) for incoming connections; the client initiates the connection."
          },
          {
            type: "analogy",
            text: "Think of a restaurant. The CUSTOMER (Client) sits at a table and places an order. The WAITER carries the order to the KITCHEN (Server). The kitchen prepares the food and the waiter delivers it back. The customer doesn't know how the food is made — they only interact through the waiter (the network protocol)."
          },
          {
            type: "heading",
            text: "Block Diagram"
          },
          {
            type: "diagram",
            text: `
┌─────────────────────────────────────────────────────────────────┐
│                     NETWORK (Internet / LAN)                    │
│                                                                 │
│  ┌──────────────┐   REQUEST  ──────────────►  ┌─────────────┐  │
│  │              │                             │             │  │
│  │   CLIENT     │   ◄──────────  RESPONSE     │   SERVER    │  │
│  │              │                             │             │  │
│  │ - Browser    │        TCP/IP               │ - Listens   │  │
│  │ - Java App   │    (port 80, 443, etc.)     │ - Accepts   │  │
│  │ - Mobile App │                             │ - Processes │  │
│  └──────────────┘                             └─────────────┘  │
│                                                                 │
│  CLIENT SIDE:                   SERVER SIDE:                    │
│  1. Initiates connection        1. Passively waits (binds port) │
│  2. Sends request               2. Accepts incoming connections │
│  3. Waits for response          3. Handles multiple clients     │
│  4. Processes response          4. Sends back response          │
└─────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "heading",
            text: "Key Characteristics"
          },
          {
            type: "table",
            headers: ["Aspect", "Client", "Server"],
            rows: [
              ["Role", "Requests service", "Provides service"],
              ["Connection", "Initiates (active)", "Waits and accepts (passive)"],
              ["IP/Port", "Uses random ephemeral port", "Uses well-known fixed port (e.g., 80, 443)"],
              ["Count", "Many clients simultaneously", "Usually one server (can be clustered)"],
              ["Examples", "Browser, Java Socket client", "Apache Tomcat, Java ServerSocket"],
            ]
          },
          {
            type: "heading",
            text: "Types of Client-Server Architecture"
          },
          {
            type: "table",
            headers: ["Type", "Description", "Example"],
            rows: [
              ["1-Tier", "Client and server on same machine", "Local desktop app with local DB"],
              ["2-Tier", "Client talks directly to server", "Java app → MySQL DB directly"],
              ["3-Tier", "Client → App Server → DB Server", "Browser → Tomcat → MySQL"],
              ["N-Tier", "Multiple middleware layers", "Browser → Load Balancer → App → Cache → DB"],
            ]
          }
        ]
      },
      {
        qnum: "A1-Q2",
        qtitle: "Features of Network Programming & Scope of Utilization",
        content: [
          {
            type: "definition",
            text: "Network Programming: The process of writing programs that communicate with other programs over a network. It involves using sockets, protocols (TCP/UDP), and APIs to send/receive data between processes running on different machines."
          },
          {
            type: "heading",
            text: "Key Features of Network Programming"
          },
          {
            type: "table",
            headers: ["Feature", "Description"],
            rows: [
              ["Socket Communication", "A socket is an endpoint for communication. Network programs use sockets to send/receive streams of bytes over TCP or individual packets over UDP."],
              ["Protocol Independence", "Programs can communicate using TCP (reliable, connection-oriented) or UDP (fast, connectionless) depending on needs."],
              ["Addressing", "Each machine has an IP address. Each process uses a port number. Together (IP:Port) they uniquely identify a communication endpoint."],
              ["Concurrency", "Servers handle many clients simultaneously using threads, thread pools, or non-blocking I/O (NIO)."],
              ["Portability", "Java programs written using java.net.* run on any OS — the JVM abstracts OS-level socket differences."],
              ["Security", "SSL/TLS (via javax.net.ssl.*) encrypts communication. Authentication, certificates, and secure channels are supported."],
              ["High-Level APIs", "Java provides URL, URLConnection, HttpURLConnection for HTTP communication without dealing with raw sockets."],
              ["Multicasting", "UDP supports multicast — one message sent to a group of receivers simultaneously."],
            ]
          },
          {
            type: "heading",
            text: "Scope of Utilization"
          },
          {
            type: "bullets",
            items: [
              "Web Applications: Every HTTP request from a browser to a web server is network programming at work.",
              "Chat & Messaging Systems: WhatsApp, Slack — real-time bidirectional communication using sockets.",
              "File Transfer: FTP clients, download managers transfer files over TCP sockets.",
              "Remote Procedure Call (RMI/gRPC): Call methods on remote objects as if they were local.",
              "Distributed Systems: Microservices talk to each other over the network.",
              "IoT (Internet of Things): Sensors send data to servers using lightweight protocols like MQTT over TCP.",
              "Online Gaming: Real-time multiplayer uses UDP for low-latency data.",
              "Email (SMTP/POP3/IMAP): Email clients/servers communicate via well-defined network protocols.",
            ]
          }
        ]
      },
      {
        qnum: "A1-Q3",
        qtitle: "Features of Java for Network Programming",
        content: [
          {
            type: "explain",
            text: "Java was designed from the ground up with networking in mind. The phrase 'The Network is the Computer' was a design philosophy baked into Java. It provides rich built-in libraries and features that make network programming straightforward."
          },
          {
            type: "table",
            headers: ["Java Feature", "Package", "Description"],
            rows: [
              ["Socket & ServerSocket", "java.net", "Low-level TCP client/server socket communication"],
              ["DatagramSocket", "java.net", "UDP (connectionless) communication via datagrams"],
              ["InetAddress", "java.net", "Represents IP addresses. Resolve hostnames to IPs and vice versa."],
              ["URL & URLConnection", "java.net", "High-level HTTP communication — read web pages, post forms"],
              ["HttpURLConnection", "java.net", "Specifically for HTTP — set methods (GET/POST), read headers"],
              ["NetworkInterface", "java.net", "Inspect network interfaces (Wi-Fi, Ethernet) of the local machine"],
              ["Multicasting (MulticastSocket)", "java.net", "Send UDP datagrams to multiple receivers at once"],
              ["SSL/TLS Sockets", "javax.net.ssl", "Secure encrypted sockets (SSLSocket, SSLServerSocket)"],
              ["NIO (Non-Blocking I/O)", "java.nio", "High-performance I/O using Selectors, Channels, ByteBuffers"],
              ["Platform Independence", "JVM", "Socket code runs unchanged on Windows, Linux, macOS"],
              ["Built-in Threading", "java.lang", "java.lang.Thread and java.util.concurrent enable concurrent servers"],
              ["Serialization", "java.io", "Objects can be serialized and sent over the network via ObjectStream"],
            ]
          },
          {
            type: "tip",
            label: "KEY POINT",
            text: "Java hides OS-level socket details behind clean interfaces. On Windows, a socket is a HANDLE. On Linux, it's a file descriptor. Java's Socket class wraps both — your code stays the same."
          }
        ]
      },
      {
        qnum: "Lab1-Q1",
        qtitle: "Program: Print the IP Address of www.tiktok.com",
        content: [
          {
            type: "explain",
            text: "InetAddress.getByName(hostname) performs a DNS lookup — it contacts a DNS server to translate the hostname into an IP address, just like your browser does before loading a website."
          },
          {
            type: "code",
            label: "InetAddressDemo.java — Resolve hostname to IP",
            lines: [`import java.net.*;

public class InetAddressDemo {
    public static void main(String[] args) {
        try {
            // DNS lookup: sends request to DNS server to get IP for hostname
            InetAddress address = InetAddress.getByName("www.tiktok.com");

            System.out.println("Host Name    : " + address.getHostName());
            System.out.println("IP Address   : " + address.getHostAddress());
            System.out.println("toString()   : " + address.toString());

            // getAllByName returns ALL IP addresses for the hostname (CDN sites have many)
            System.out.println("\\n--- All IPs for www.tiktok.com ---");
            InetAddress[] allAddresses = InetAddress.getAllByName("www.tiktok.com");
            for (InetAddress addr : allAddresses) {
                System.out.println(addr.getHostAddress());
            }

        } catch (UnknownHostException e) {
            // Thrown if hostname cannot be resolved (no internet, typo, etc.)
            System.out.println("Cannot resolve hostname: " + e.getMessage());
        }
    }
}

/*
SAMPLE OUTPUT:
Host Name    : www.tiktok.com
IP Address   : 23.200.6.21
toString()   : www.tiktok.com/23.200.6.21
--- All IPs for www.tiktok.com ---
23.200.6.21
23.200.6.13
...
*/`]
          }
        ]
      },
      {
        qnum: "Lab1-Q2",
        qtitle: "Program: Find the Network Interface Associated with an IP",
        content: [
          {
            type: "explain",
            text: "NetworkInterface.getByInetAddress(ip) lets you find which physical or virtual network interface card (NIC) on your machine is associated with a specific IP address."
          },
          {
            type: "code",
            label: "FindInterfaceByIP.java",
            lines: [`import java.net.*;

public class FindInterfaceByIP {
    public static void main(String[] args) throws Exception {
        // The IP address you want to find the interface for
        // Replace with your own machine's IP to test
        InetAddress targetIP = InetAddress.getByName("192.168.1.5");

        // Finds which NIC (network interface card) has this IP
        NetworkInterface ni = NetworkInterface.getByInetAddress(targetIP);

        if (ni == null) {
            System.out.println("No interface found for IP: " + targetIP.getHostAddress());
        } else {
            System.out.println("IP Address    : " + targetIP.getHostAddress());
            System.out.println("Interface Name: " + ni.getName());        // e.g., eth0, wlan0
            System.out.println("Display Name  : " + ni.getDisplayName()); // e.g., Intel Wi-Fi
            System.out.println("Is Up?        : " + ni.isUp());
            System.out.println("Is Loopback?  : " + ni.isLoopback());
            System.out.println("Is Virtual?   : " + ni.isVirtual());

            // Show all IPs on this interface
            System.out.println("\\nAll IPs on this interface:");
            for (InetAddress addr : java.util.Collections.list(ni.getInetAddresses())) {
                System.out.println("  " + addr.getHostAddress());
            }
        }
    }
}

/*
SAMPLE OUTPUT:
IP Address    : 192.168.1.5
Interface Name: wlan0
Display Name  : Wireless LAN adapter Wi-Fi
Is Up?        : true
Is Loopback?  : false
Is Virtual?   : false
*/`]
          }
        ]
      },
      {
        qnum: "Lab1-Q3",
        qtitle: "Program: Enumerate All Network Interfaces of the System",
        content: [
          {
            type: "explain",
            text: "NetworkInterface.getNetworkInterfaces() returns an Enumeration of ALL network interfaces on your machine — Ethernet, Wi-Fi, loopback (127.0.0.1), virtual adapters, VPNs, etc."
          },
          {
            type: "code",
            label: "EnumerateInterfaces.java",
            lines: [`import java.net.*;
import java.util.*;

public class EnumerateInterfaces {
    public static void main(String[] args) throws Exception {
        // Get all interfaces — returns Enumeration<NetworkInterface>
        Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();

        if (interfaces == null) {
            System.out.println("No network interfaces found.");
            return;
        }

        int count = 0;
        while (interfaces.hasMoreElements()) {
            NetworkInterface ni = interfaces.nextElement();
            count++;
            System.out.println("=== Interface " + count + " ===");
            System.out.println("  Name        : " + ni.getName());
            System.out.println("  Display Name: " + ni.getDisplayName());
            System.out.println("  Index       : " + ni.getIndex());
            System.out.println("  Is Up       : " + ni.isUp());
            System.out.println("  Is Loopback : " + ni.isLoopback());
            System.out.println("  Is Virtual  : " + ni.isVirtual());
            System.out.println("  Supports Multicast: " + ni.supportsMulticast());
            System.out.println("  MTU         : " + ni.getMTU()); // Max Transmission Unit (bytes)

            // MAC Address
            byte[] mac = ni.getHardwareAddress();
            if (mac != null) {
                StringBuilder macStr = new StringBuilder();
                for (int i = 0; i < mac.length; i++) {
                    macStr.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
                }
                System.out.println("  MAC Address : " + macStr);
            }

            // All IP addresses on this interface
            Enumeration<InetAddress> addrs = ni.getInetAddresses();
            while (addrs.hasMoreElements()) {
                InetAddress addr = addrs.nextElement();
                System.out.println("  IP Address  : " + addr.getHostAddress()
                    + (addr instanceof Inet4Address ? " (IPv4)" : " (IPv6)"));
            }

            // Sub-interfaces (virtual interfaces)
            Enumeration<NetworkInterface> subIfaces = ni.getSubInterfaces();
            while (subIfaces.hasMoreElements()) {
                System.out.println("  Sub-interface: " + subIfaces.nextElement().getName());
            }
            System.out.println();
        }

        System.out.println("Total interfaces found: " + count);
    }
}

/*
SAMPLE OUTPUT:
=== Interface 1 ===
  Name        : lo
  Display Name: Software Loopback Interface 1
  Is Loopback : true
  IP Address  : 127.0.0.1 (IPv4)
  IP Address  : ::1 (IPv6)

=== Interface 2 ===
  Name        : eth0
  Display Name: Intel(R) Ethernet Connection
  MAC Address : 1A-2B-3C-4D-5E-6F
  IP Address  : 192.168.1.5 (IPv4)
*/`]
          }
        ]
      },
      {
        qnum: "Lab1-Q4",
        qtitle: "Program: Spam Checking",
        content: [
          {
            type: "explain",
            text: "A basic spam checker verifies if an email's sending domain/IP is listed in a known spam blacklist (DNS Blackhole List / DNSBL). You reverse the IP and query a known DNSBL like 'zen.spamhaus.org'. If the DNS query resolves, the IP is spam-listed."
          },
          {
            type: "code",
            label: "SpamChecker.java — DNSBL-based spam IP check",
            lines: [`import java.net.*;
import java.util.*;

public class SpamChecker {

    // Known DNSBL (DNS Blackhole List) servers
    private static final String[] BLACKLISTS = {
        "zen.spamhaus.org",
        "bl.spamcop.net",
        "dnsbl.sorbs.net"
    };

    /**
     * Check if an IP is listed as spam in any DNSBL.
     * Method: Reverse the IP octets and append the DNSBL domain.
     * Example: IP 1.2.3.4 → query "4.3.2.1.zen.spamhaus.org"
     * If the query resolves → IP is BLACKLISTED
     * If it throws UnknownHostException → IP is CLEAN
     */
    public static boolean isSpam(String ipAddress) {
        // Reverse the IP: "192.168.1.1" → "1.1.168.192"
        String[] parts = ipAddress.split("\\.");
        if (parts.length != 4) {
            System.out.println("Invalid IPv4 address: " + ipAddress);
            return false;
        }
        String reversedIP = parts[3] + "." + parts[2] + "." + parts[1] + "." + parts[0];

        for (String blacklist : BLACKLISTS) {
            String queryHost = reversedIP + "." + blacklist;
            try {
                // If this resolves → the IP IS in the blacklist
                InetAddress.getByName(queryHost);
                System.out.println("  [BLACKLISTED] Found in: " + blacklist);
                return true;
            } catch (UnknownHostException e) {
                // Not found in this blacklist — that's good!
                System.out.println("  [CLEAN] Not in: " + blacklist);
            }
        }
        return false; // not in any blacklist
    }

    public static void main(String[] args) {
        String[] testIPs = {
            "127.0.0.2",       // Loopback — often used to test DNSBL tools
            "192.168.1.1",     // Private IP — unlikely to be listed
            "8.8.8.8",         // Google DNS — should be clean
        };

        for (String ip : testIPs) {
            System.out.println("\\nChecking IP: " + ip);
            boolean spam = isSpam(ip);
            System.out.println("  Result: " + (spam ? "🚫 SPAM" : "✅ CLEAN"));
        }

        // You can also check email domains by resolving domain to IP first
        System.out.println("\\n--- Checking email domain ---");
        try {
            String emailDomain = "suspicious-domain.com";
            InetAddress domainIP = InetAddress.getByName(emailDomain);
            System.out.println("Domain: " + emailDomain + " → IP: " + domainIP.getHostAddress());
            isSpam(domainIP.getHostAddress());
        } catch (UnknownHostException e) {
            System.out.println("Cannot resolve email domain.");
        }
    }
}`]
          }
        ]
      },
      {
        qnum: "Lab1-Q5",
        qtitle: "Program: Process Web Server Log File (Single-threaded & Multithreaded)",
        content: [
          {
            type: "explain",
            text: "A web server log file contains one line per HTTP request. Processing it means parsing each line to extract: IP, date, request method, URL, status code, and bytes sent. Multithreaded processing splits the file into chunks processed in parallel."
          },
          {
            type: "code",
            label: "LogProcessor.java — Single-threaded web log parser",
            lines: [`import java.io.*;
import java.util.*;
import java.util.regex.*;

public class LogProcessor {
    // Apache Combined Log Format regex:
    // IP - - [Date] "METHOD URL HTTP/1.x" STATUS BYTES
    static final Pattern LOG_PATTERN = Pattern.compile(
        "(\\\\S+) \\\\S+ \\\\S+ \\\\[([^\\\\]]+)\\\\] \\"(\\\\S+) (\\\\S+) \\\\S+\\" (\\\\d{3}) (\\\\d+|-)"
    );

    static Map<String, Integer> statusCount = new HashMap<>();
    static Map<String, Integer> ipCount = new HashMap<>();
    static long totalBytes = 0;
    static int totalRequests = 0;

    // Process a single log line
    static void processLine(String line) {
        Matcher m = LOG_PATTERN.matcher(line);
        if (!m.matches()) return; // skip malformed lines

        String ip      = m.group(1);
        String method  = m.group(3);
        String url     = m.group(4);
        String status  = m.group(5);
        String bytes   = m.group(6);

        // Count requests per status code
        statusCount.merge(status, 1, Integer::sum);

        // Count requests per IP
        ipCount.merge(ip, 1, Integer::sum);

        // Sum up bytes transferred
        if (!bytes.equals("-")) totalBytes += Long.parseLong(bytes);

        totalRequests++;

        // Print each request (comment this out for large files)
        System.out.printf("IP: %-16s Method: %-6s Status: %s URL: %s%n",
                          ip, method, status, url);
    }

    // Single-threaded version
    static void processSingleThreaded(String filename) throws IOException {
        System.out.println("\\n=== Single-Threaded Log Processing ===");
        long start = System.currentTimeMillis();

        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                processLine(line);
            }
        }

        long elapsed = System.currentTimeMillis() - start;
        printStats(elapsed);
    }

    static void printStats(long elapsed) {
        System.out.println("\\n===== STATISTICS =====");
        System.out.println("Total Requests : " + totalRequests);
        System.out.println("Total Bytes    : " + totalBytes + " bytes");
        System.out.println("Time Taken     : " + elapsed + " ms");
        System.out.println("Status Codes   : " + statusCount);
        // Top 5 IPs by request count
        System.out.println("Top IPs:");
        ipCount.entrySet().stream()
            .sorted(Map.Entry.<String,Integer>comparingByValue().reversed())
            .limit(5)
            .forEach(e -> System.out.println("  " + e.getKey() + " → " + e.getValue() + " requests"));
    }

    public static void main(String[] args) throws IOException {
        // Create a sample log file for testing
        String filename = "access.log";
        createSampleLog(filename);
        processSingleThreaded(filename);
    }

    // Creates a sample Apache log file for testing
    static void createSampleLog(String filename) throws IOException {
        String[] ips = {"192.168.1.1", "10.0.0.5", "172.16.0.2", "192.168.1.1"};
        String[] urls = {"/index.html", "/about.html", "/contact", "/api/data"};
        String[] statuses = {"200", "404", "200", "500"};
        try (PrintWriter pw = new PrintWriter(new FileWriter(filename))) {
            for (int i = 0; i < 100; i++) {
                int idx = i % ips.length;
                pw.printf("%s - - [01/Jan/2025:12:00:%02d +0000] \\"GET %s HTTP/1.1\\" %s %d%n",
                    ips[idx], (i % 60), urls[idx], statuses[idx], 1024 + i * 10);
            }
        }
        System.out.println("Sample log file created: " + filename);
    }
}`]
          },
          {
            type: "code",
            label: "MultiThreadedLogProcessor.java — Parallel log processing",
            lines: [`import java.io.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.util.regex.*;

public class MultiThreadedLogProcessor {
    static final Pattern LOG_PATTERN = Pattern.compile(
        "(\\\\S+) \\\\S+ \\\\S+ \\\\[([^\\\\]]+)\\\\] \\"(\\\\S+) (\\\\S+) \\\\S+\\" (\\\\d{3}) (\\\\d+|-)"
    );

    // Atomic counters — thread-safe increment without synchronized blocks
    static AtomicInteger totalRequests = new AtomicInteger(0);
    static AtomicLong    totalBytes    = new AtomicLong(0);

    // ConcurrentHashMap — thread-safe map, multiple threads can write simultaneously
    static ConcurrentHashMap<String, AtomicInteger> statusCount = new ConcurrentHashMap<>();
    static ConcurrentHashMap<String, AtomicInteger> ipCount     = new ConcurrentHashMap<>();

    // Each thread processes a chunk of lines
    static class LogWorker implements Runnable {
        private final List<String> lines;

        LogWorker(List<String> lines) { this.lines = lines; }

        @Override
        public void run() {
            for (String line : lines) {
                Matcher m = LOG_PATTERN.matcher(line);
                if (!m.matches()) continue;

                String ip     = m.group(1);
                String status = m.group(5);
                String bytes  = m.group(6);

                // Thread-safe updates
                statusCount.computeIfAbsent(status, k -> new AtomicInteger(0)).incrementAndGet();
                ipCount.computeIfAbsent(ip, k -> new AtomicInteger(0)).incrementAndGet();
                if (!bytes.equals("-")) totalBytes.addAndGet(Long.parseLong(bytes));
                totalRequests.incrementAndGet();
            }
        }
    }

    public static void processMultiThreaded(String filename) throws Exception {
        System.out.println("\\n=== Multi-Threaded Log Processing ===");
        long start = System.currentTimeMillis();

        // Read ALL lines into memory first
        List<String> allLines = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = br.readLine()) != null) allLines.add(line);
        }

        int numThreads = Runtime.getRuntime().availableProcessors(); // use all CPU cores
        int chunkSize  = allLines.size() / numThreads;
        ExecutorService pool = Executors.newFixedThreadPool(numThreads);

        System.out.println("Using " + numThreads + " threads for " + allLines.size() + " lines");

        // Split lines into chunks and assign one chunk per thread
        for (int i = 0; i < numThreads; i++) {
            int from = i * chunkSize;
            int to   = (i == numThreads - 1) ? allLines.size() : from + chunkSize;
            List<String> chunk = allLines.subList(from, to);
            pool.submit(new LogWorker(chunk)); // submit chunk to thread pool
        }

        pool.shutdown();
        pool.awaitTermination(30, TimeUnit.SECONDS); // wait for all threads to finish

        long elapsed = System.currentTimeMillis() - start;

        System.out.println("Total Requests : " + totalRequests.get());
        System.out.println("Total Bytes    : " + totalBytes.get());
        System.out.println("Time           : " + elapsed + " ms");
        System.out.println("Status Counts  : " + statusCount);
    }

    public static void main(String[] args) throws Exception {
        processMultiThreaded("access.log"); // assumes log file exists
    }
}`]
          }
        ]
      }
    ]
  },
  {
    id: "u2",
    title: "Unit 2 — InetAddress, NetworkInterface & URL/URI",
    badge: "Assignment 2 + Lab 2",
    color: "#1B5E20",
    sections: [
      {
        qnum: "A2-Q1",
        qtitle: "InetAddress Class — Creation & Getter Methods",
        content: [
          {
            type: "definition",
            text: "InetAddress: A Java class in java.net that represents an Internet Protocol (IP) address — either IPv4 (32-bit) or IPv6 (128-bit). It combines a hostname and its corresponding IP address. It is abstract; instances are actually Inet4Address or Inet6Address objects."
          },
          {
            type: "heading",
            text: "Factory Methods to Create InetAddress Objects"
          },
          {
            type: "table",
            headers: ["Method", "Description", "Example"],
            rows: [
              ["InetAddress.getByName(host)", "DNS lookup — resolve hostname to IP. Can also pass IP string directly.", "InetAddress.getByName(\"www.google.com\")"],
              ["InetAddress.getAllByName(host)", "Returns ALL IP addresses for a hostname (CDN sites have many).", "InetAddress.getAllByName(\"www.amazon.com\")"],
              ["InetAddress.getLocalHost()", "Returns the IP address of the local machine running the program.", "InetAddress.getLocalHost()"],
              ["InetAddress.getLoopbackAddress()", "Returns 127.0.0.1 (IPv4) or ::1 (IPv6) — the loopback address.", "InetAddress.getLoopbackAddress()"],
              ["InetAddress.getByAddress(byte[])", "Create InetAddress from a raw byte array (4 bytes for IPv4).", "InetAddress.getByAddress(new byte[]{8,8,8,8})"],
            ]
          },
          {
            type: "heading",
            text: "Getter Methods"
          },
          {
            type: "table",
            headers: ["Method", "Returns", "Example Output"],
            rows: [
              ["getHostName()", "The hostname (performs reverse DNS if needed)", "\"www.google.com\""],
              ["getHostAddress()", "The IP address as a String (no DNS lookup)", "\"142.250.195.36\""],
              ["getAddress()", "Raw IP as byte[] — 4 bytes (IPv4) or 16 bytes (IPv6)", "[142, -6, -61, 36]"],
              ["getCanonicalHostName()", "Fully qualified domain name (FQDN), triggers reverse DNS", "\"lga34s20-in-f4.1e100.net\""],
              ["toString()", "Returns hostname + \"/\" + IP", "\"www.google.com/142.250.195.36\""],
            ]
          },
          {
            type: "code",
            label: "InetAddressMethods.java — All creation & getter methods",
            lines: [`import java.net.*;

public class InetAddressMethods {
    public static void main(String[] args) throws Exception {

        // ── Creation Methods ──────────────────────────────────────────
        InetAddress byName    = InetAddress.getByName("www.google.com");
        InetAddress localhost  = InetAddress.getLocalHost();
        InetAddress loopback  = InetAddress.getLoopbackAddress();
        InetAddress byBytes   = InetAddress.getByAddress(new byte[]{8, 8, 8, 8});

        // ── Getter Methods ────────────────────────────────────────────
        System.out.println("=== By Name: www.google.com ===");
        System.out.println("getHostName()         : " + byName.getHostName());
        System.out.println("getHostAddress()      : " + byName.getHostAddress());
        System.out.println("getCanonicalHostName(): " + byName.getCanonicalHostName());
        System.out.println("toString()            : " + byName.toString());

        // Raw byte array representation
        byte[] rawBytes = byName.getAddress();
        System.out.print("getAddress() bytes    : ");
        for (byte b : rawBytes) System.out.print((b & 0xFF) + " "); // & 0xFF → unsigned
        System.out.println();

        // ── Type checks ────────────────────────────────────────────
        System.out.println("\\n=== Local Host ===");
        System.out.println("Local IP: " + localhost.getHostAddress());
        System.out.println("isLoopbackAddress(): " + localhost.isLoopbackAddress());
        System.out.println("isSiteLocalAddress(): " + localhost.isSiteLocalAddress()); // 192.168.x.x

        System.out.println("\\n=== Loopback ===");
        System.out.println("Loopback: " + loopback.getHostAddress()); // 127.0.0.1

        System.out.println("\\n=== From Bytes (8.8.8.8) ===");
        System.out.println("Google DNS: " + byBytes.getHostAddress());

        // getAllByName — multiple IPs for one host
        System.out.println("\\n=== All IPs for www.amazon.com ===");
        InetAddress[] all = InetAddress.getAllByName("www.amazon.com");
        for (InetAddress addr : all)
            System.out.println("  " + addr.getHostAddress());
    }
}`]
          }
        ]
      },
      {
        qnum: "A2-Q2",
        qtitle: "Address Types — Characteristics of IP Addresses",
        content: [
          {
            type: "explain",
            text: "Not all IP addresses are created equal. Some are reserved for special purposes — loopback (self), private (local network), multicast (group communication), etc. InetAddress provides isXxx() methods to identify each type."
          },
          {
            type: "table",
            headers: ["Address Type", "Range", "Purpose", "InetAddress Method"],
            rows: [
              ["Loopback", "127.0.0.0/8 (IPv4), ::1 (IPv6)", "Points back to the same machine. Used for testing.", "isLoopbackAddress()"],
              ["Site-Local (Private)", "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", "Used within private networks (homes, offices). Not routable on internet.", "isSiteLocalAddress()"],
              ["Link-Local", "169.254.0.0/16 (IPv4), fe80::/10 (IPv6)", "Auto-assigned when DHCP fails. Only valid on local segment.", "isLinkLocalAddress()"],
              ["Multicast", "224.0.0.0 – 239.255.255.255 (IPv4)", "One packet received by a GROUP of hosts.", "isMulticastAddress()"],
              ["Wildcard / Any", "0.0.0.0", "Means 'all local addresses'. Used by servers to listen on all NICs.", "isAnyLocalAddress()"],
              ["Global (Public)", "Everything else", "Routable on the public internet.", "(none — check if not any of above)"],
            ]
          },
          {
            type: "code",
            label: "AddressTypes.java — Identify address characteristics",
            lines: [`import java.net.*;

public class AddressTypes {
    static void checkAddress(String host) throws Exception {
        InetAddress addr = InetAddress.getByName(host);
        System.out.println("\\n=== " + addr.getHostAddress() + " (" + host + ") ===");
        System.out.println("  isLoopbackAddress()    : " + addr.isLoopbackAddress());
        System.out.println("  isSiteLocalAddress()   : " + addr.isSiteLocalAddress()); // private LAN
        System.out.println("  isLinkLocalAddress()   : " + addr.isLinkLocalAddress());
        System.out.println("  isMulticastAddress()   : " + addr.isMulticastAddress());
        System.out.println("  isAnyLocalAddress()    : " + addr.isAnyLocalAddress());
        System.out.println("  instanceof Inet4Address: " + (addr instanceof Inet4Address));
        System.out.println("  instanceof Inet6Address: " + (addr instanceof Inet6Address));
    }

    public static void main(String[] args) throws Exception {
        checkAddress("127.0.0.1");      // loopback
        checkAddress("192.168.1.100");  // private / site-local
        checkAddress("169.254.1.1");    // link-local
        checkAddress("224.0.0.1");      // multicast
        checkAddress("8.8.8.8");        // public/global
        checkAddress("0.0.0.0");        // wildcard
        checkAddress("::1");            // IPv6 loopback
        checkAddress("fe80::1");        // IPv6 link-local
    }
}

/*
SAMPLE OUTPUT:
=== 127.0.0.1 (127.0.0.1) ===
  isLoopbackAddress()    : true
  isSiteLocalAddress()   : false
  isMulticastAddress()   : false

=== 192.168.1.100 (192.168.1.100) ===
  isSiteLocalAddress()   : true   ← private network
  isMulticastAddress()   : false

=== 224.0.0.1 (224.0.0.1) ===
  isMulticastAddress()   : true   ← multicast group
*/`]
          }
        ]
      },
      {
        qnum: "A2-Q3",
        qtitle: "Testing Reachability of a Node",
        content: [
          {
            type: "explain",
            text: "InetAddress.isReachable(timeout) tests if a remote host is reachable — like the 'ping' command. Java tries ICMP echo (ping) first; if that fails (due to firewall), it tries TCP on port 7."
          },
          {
            type: "code",
            label: "ReachabilityTest.java — Test if hosts are reachable",
            lines: [`import java.net.*;
import java.io.*;

public class ReachabilityTest {
    /**
     * isReachable(timeout): Returns true if host responds within 'timeout' ms.
     * Uses ICMP echo (ping) or TCP port 7 (echo port).
     * May return false for firewalled hosts even if they're up.
     */
    static void testHost(String host, int timeoutMs) {
        try {
            InetAddress addr = InetAddress.getByName(host);
            long start = System.currentTimeMillis();

            boolean reachable = addr.isReachable(timeoutMs);

            long elapsed = System.currentTimeMillis() - start;
            System.out.printf("Host: %-20s IP: %-16s Reachable: %-5s Time: %dms%n",
                host, addr.getHostAddress(), reachable, elapsed);

        } catch (UnknownHostException e) {
            System.out.println("Cannot resolve: " + host);
        } catch (IOException e) {
            System.out.println("Error testing " + host + ": " + e.getMessage());
        }
    }

    // Advanced: test using a specific network interface
    static void testViaInterface(String host, String interfaceName) throws Exception {
        InetAddress addr = InetAddress.getByName(host);
        NetworkInterface ni = NetworkInterface.getByName(interfaceName); // e.g., "eth0"
        if (ni == null) { System.out.println("Interface not found: " + interfaceName); return; }

        // isReachable(NetworkInterface, TTL, timeout)
        boolean reachable = addr.isReachable(ni, 64, 3000);
        System.out.println("Via " + interfaceName + ": " + host + " reachable = " + reachable);
    }

    public static void main(String[] args) throws Exception {
        int timeout = 3000; // 3 seconds
        System.out.println("Testing reachability (timeout=" + timeout + "ms):");
        System.out.println("─".repeat(70));

        testHost("127.0.0.1",    timeout); // loopback — always reachable
        testHost("8.8.8.8",      timeout); // Google DNS
        testHost("www.google.com", timeout);
        testHost("192.168.1.1",  timeout); // Your router (may or may not be up)
        testHost("999.999.999.999", timeout); // Invalid — UnknownHostException
    }
}

/*
SAMPLE OUTPUT:
Host: 127.0.0.1              IP: 127.0.0.1        Reachable: true  Time: 1ms
Host: 8.8.8.8                IP: 8.8.8.8          Reachable: true  Time: 45ms
Host: www.google.com         IP: 142.250.195.36   Reachable: true  Time: 80ms
*/`]
          }
        ]
      },
      {
        qnum: "A2-Q4",
        qtitle: "Inet4Address vs Inet6Address",
        content: [
          {
            type: "table",
            headers: ["Aspect", "Inet4Address", "Inet6Address"],
            rows: [
              ["IP version", "IPv4", "IPv6"],
              ["Address length", "32 bits (4 bytes)", "128 bits (16 bytes)"],
              ["Format", "Dotted decimal: 192.168.1.1", "Colon-hex: 2001:db8::1"],
              ["Total addresses", "~4.3 billion", "340 undecillion (3.4 × 10³⁸)"],
              ["Example", "192.168.0.1", "2001:0db8:85a3:0000:0000:8a2e:0370:7334"],
              ["Loopback", "127.0.0.1", "::1"],
              ["Scope methods", "isSiteLocalAddress() etc.", "Additional: isMCGlobal(), isMCNodeLocal(), etc."],
              ["Java class", "java.net.Inet4Address extends InetAddress", "java.net.Inet6Address extends InetAddress"],
            ]
          },
          {
            type: "code",
            label: "Inet4vsInet6.java — Compare both types",
            lines: [`import java.net.*;

public class Inet4vsInet6 {
    public static void main(String[] args) throws Exception {
        // Inet4Address example
        Inet4Address ipv4 = (Inet4Address) InetAddress.getByName("192.168.1.1");
        System.out.println("=== IPv4 ===");
        System.out.println("Address   : " + ipv4.getHostAddress());
        System.out.println("Byte count: " + ipv4.getAddress().length); // 4
        System.out.println("Is IPv4?  : " + (ipv4 instanceof Inet4Address)); // true

        // Inet6Address example
        Inet6Address ipv6 = (Inet6Address) InetAddress.getByName("::1"); // IPv6 loopback
        System.out.println("\\n=== IPv6 ===");
        System.out.println("Address   : " + ipv6.getHostAddress());
        System.out.println("Byte count: " + ipv6.getAddress().length); // 16
        System.out.println("Is IPv6?  : " + (ipv6 instanceof Inet6Address)); // true
        System.out.println("Is Loopback?: " + ipv6.isLoopbackAddress()); // true

        // Check all interfaces for both IPv4 and IPv6
        System.out.println("\\n=== IPs on this machine ===");
        java.util.Enumeration<NetworkInterface> ifaces = NetworkInterface.getNetworkInterfaces();
        while (ifaces != null && ifaces.hasMoreElements()) {
            NetworkInterface ni = ifaces.nextElement();
            java.util.Enumeration<InetAddress> addrs = ni.getInetAddresses();
            while (addrs.hasMoreElements()) {
                InetAddress addr = addrs.nextElement();
                String version = (addr instanceof Inet4Address) ? "IPv4" : "IPv6";
                System.out.printf("  %-8s %-15s [%s]%n", ni.getName(), addr.getHostAddress(), version);
            }
        }
    }
}`]
          }
        ]
      },
      {
        qnum: "A2-Q5&Q6",
        qtitle: "NetworkInterface Class — Factory Methods & Getter Methods",
        content: [
          {
            type: "definition",
            text: "NetworkInterface: A Java class representing a network interface card (NIC) installed in the machine. It allows you to inspect hardware details (name, MAC address, MTU) and software details (IP addresses assigned) of each network interface."
          },
          {
            type: "heading",
            text: "Factory Methods (how to get NetworkInterface objects)"
          },
          {
            type: "table",
            headers: ["Factory Method", "Description"],
            rows: [
              ["NetworkInterface.getByName(\"eth0\")", "Get interface by system name (eth0, wlan0, lo on Linux; Wi-Fi, Ethernet on Windows)"],
              ["NetworkInterface.getByIndex(1)", "Get interface by its numeric system index"],
              ["NetworkInterface.getByInetAddress(ip)", "Get the interface that has this IP assigned to it"],
              ["NetworkInterface.getNetworkInterfaces()", "Get an Enumeration of ALL interfaces on the machine"],
            ]
          },
          {
            type: "heading",
            text: "Important Getter Methods"
          },
          {
            type: "table",
            headers: ["Method", "Returns"],
            rows: [
              ["getName()", "Short system name: 'eth0', 'wlan0', 'lo'"],
              ["getDisplayName()", "Human-readable name: 'Intel Wi-Fi 6'"],
              ["getIndex()", "Numeric index assigned by the OS"],
              ["getInetAddresses()", "Enumeration of all IP addresses on this interface"],
              ["getHardwareAddress()", "MAC address as byte[] (null for loopback/virtual)"],
              ["getMTU()", "Maximum Transmission Unit — max bytes per packet"],
              ["isUp()", "Is the interface currently active/connected?"],
              ["isLoopback()", "Is it the loopback interface (127.0.0.1)?"],
              ["isVirtual()", "Is it a virtual sub-interface?"],
              ["supportsMulticast()", "Can it send/receive multicast packets?"],
              ["getSubInterfaces()", "Virtual interfaces nested under this interface"],
            ]
          },
          {
            type: "code",
            label: "NetworkInterfaceDetails.java — Display IP, Name, Display Name, MAC",
            lines: [`import java.net.*;
import java.util.*;

public class NetworkInterfaceDetails {
    public static void main(String[] args) throws Exception {
        Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();

        while (interfaces != null && interfaces.hasMoreElements()) {
            NetworkInterface ni = interfaces.nextElement();

            // Skip interfaces that are down (inactive)
            if (!ni.isUp()) continue;

            System.out.println("====================================");
            System.out.println("Name         : " + ni.getName());
            System.out.println("Display Name : " + ni.getDisplayName());
            System.out.println("Index        : " + ni.getIndex());
            System.out.println("MTU          : " + ni.getMTU() + " bytes");
            System.out.println("Is Loopback  : " + ni.isLoopback());
            System.out.println("Is Virtual   : " + ni.isVirtual());
            System.out.println("Multicast    : " + ni.supportsMulticast());

            // MAC Address — format as XX-XX-XX-XX-XX-XX
            byte[] mac = ni.getHardwareAddress();
            if (mac != null && mac.length > 0) {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < mac.length; i++) {
                    sb.append(String.format("%02X", mac[i]));
                    if (i < mac.length - 1) sb.append("-");
                }
                System.out.println("MAC Address  : " + sb.toString());
            } else {
                System.out.println("MAC Address  : N/A (loopback or virtual)");
            }

            // All IP addresses (IPv4 and IPv6) on this interface
            Enumeration<InetAddress> addrs = ni.getInetAddresses();
            while (addrs.hasMoreElements()) {
                InetAddress addr = addrs.nextElement();
                String type = (addr instanceof Inet4Address) ? "IPv4" : "IPv6";
                System.out.println("IP (" + type + ")    : " + addr.getHostAddress());
            }
        }
    }
}

/*
SAMPLE OUTPUT:
====================================
Name         : lo
Display Name : Software Loopback Interface 1
Is Loopback  : true
MAC Address  : N/A (loopback or virtual)
IP (IPv4)    : 127.0.0.1

====================================
Name         : eth0
Display Name : Intel(R) Ethernet Connection I219-V
MAC Address  : 1A-2B-3C-4D-5E-6F
MTU          : 1500 bytes
IP (IPv4)    : 192.168.1.100
IP (IPv6)    : fe80::1a2b:3c4d:5e6f%eth0
*/`]
          }
        ]
      },
      {
        qnum: "Lab2-Q2&Q3",
        qtitle: "Lab: View Source of a Web Page & Check Parts of a URL",
        content: [
          {
            type: "code",
            label: "ViewWebSource.java — Read raw HTML of a web page",
            lines: [`import java.net.*;
import java.io.*;

public class ViewWebSource {
    public static void main(String[] args) throws Exception {
        String urlStr = "http://www.example.com";
        URL url = new URL(urlStr);

        // openStream() opens a connection and returns an InputStream of the response body
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(url.openStream()))) {
            String line;
            int lineNum = 0;
            while ((line = reader.readLine()) != null && lineNum < 30) {
                System.out.println(line);
                lineNum++;
            }
        }
    }
}

/*
OUTPUT: The first 30 lines of the HTML source of example.com
*/`]
          },
          {
            type: "code",
            label: "URLParts.java — Examine all parts of a URL",
            lines: [`import java.net.*;

public class URLParts {
    public static void main(String[] args) throws Exception {
        // A full URL for testing:
        // https://user:pass@www.example.com:8080/path/to/page?key=value&a=b#section1
        URL url = new URL("https://user:pass@www.example.com:8080/path/to/page?key=value&a=b#section1");

        System.out.println("Full URL      : " + url.toString());
        System.out.println("----------------------------");
        System.out.println("Protocol      : " + url.getProtocol());   // https
        System.out.println("Authority     : " + url.getAuthority());  // user:pass@www.example.com:8080
        System.out.println("User Info     : " + url.getUserInfo());   // user:pass
        System.out.println("Host          : " + url.getHost());       // www.example.com
        System.out.println("Port          : " + url.getPort());       // 8080
        System.out.println("Default Port  : " + url.getDefaultPort()); // 443 for https
        System.out.println("Path          : " + url.getPath());       // /path/to/page
        System.out.println("File          : " + url.getFile());       // /path/to/page?key=value&a=b
        System.out.println("Query String  : " + url.getQuery());      // key=value&a=b
        System.out.println("Ref (Fragment): " + url.getRef());        // section1

        // Relative URL creation
        URL base     = new URL("https://www.example.com/docs/");
        URL relative = new URL(base, "intro.html");
        System.out.println("\\nBase URL      : " + base);
        System.out.println("Relative URL  : " + relative); // https://www.example.com/docs/intro.html
    }
}

/*
OUTPUT:
Protocol      : https
Host          : www.example.com
Port          : 8080
Path          : /path/to/page
Query String  : key=value&a=b
Ref (Fragment): section1
*/`]
          }
        ]
      },
      {
        qnum: "Lab2-Q4&Q5",
        qtitle: "Lab: Check Parts of a URI & URLEncoder / URLDecoder",
        content: [
          {
            type: "code",
            label: "URIParts.java — Examine all parts of a URI",
            lines: [`import java.net.*;

public class URIParts {
    public static void main(String[] args) throws Exception {
        URI uri = new URI("https://user:pass@www.example.com:8080/path?q=hello+world#frag");

        System.out.println("Full URI         : " + uri);
        System.out.println("Scheme           : " + uri.getScheme());          // https
        System.out.println("Scheme-Specific  : " + uri.getSchemeSpecificPart());
        System.out.println("Authority        : " + uri.getAuthority());        // user:pass@host:8080
        System.out.println("User Info        : " + uri.getUserInfo());         // user:pass
        System.out.println("Host             : " + uri.getHost());             // www.example.com
        System.out.println("Port             : " + uri.getPort());             // 8080
        System.out.println("Path             : " + uri.getPath());             // /path
        System.out.println("Query            : " + uri.getQuery());            // q=hello+world
        System.out.println("Raw Query        : " + uri.getRawQuery());         // q=hello+world (encoded)
        System.out.println("Fragment         : " + uri.getFragment());         // frag

        System.out.println("Is Absolute?     : " + uri.isAbsolute()); // true (has scheme)
        System.out.println("Is Opaque?       : " + uri.isOpaque());   // false (hierarchical)

        // Resolve a relative URI against a base URI
        URI base     = new URI("https://www.example.com/docs/");
        URI relative = new URI("../images/logo.png");
        URI resolved = base.resolve(relative);
        System.out.println("\\nResolved URI: " + resolved);
        // → https://www.example.com/images/logo.png

        // Normalize: removes . and .. from path
        URI messy = new URI("https://example.com/a/b/../c/./d");
        System.out.println("Normalized: " + messy.normalize());
        // → https://example.com/a/c/d

        // Convert URI to URL (only for absolute, non-opaque URIs)
        URL url = uri.toURL();
        System.out.println("\\nConverted to URL: " + url);
    }
}
`]
          },
          {
            type: "code",
            label: "URLEncoderDecoderDemo.java — Encode and decode URL strings",
            lines: [`import java.net.*;
import java.io.*;

public class URLEncoderDecoderDemo {
    public static void main(String[] args) throws Exception {
        // WHY ENCODE? URLs can only contain certain safe characters.
        // Spaces, &, =, special chars must be percent-encoded.
        // Example: "hello world" → "hello+world" or "hello%20world"

        String original = "Hello World! Name=Ravi & City=Kathmandu/Nepal";
        System.out.println("Original  : " + original);

        // URLEncoder.encode(string, charset) — replaces unsafe chars
        // Spaces become '+', special chars become %XX
        String encoded = URLEncoder.encode(original, "UTF-8");
        System.out.println("Encoded   : " + encoded);
        // → Hello+World%21+Name%3DRavi+%26+City%3DKathmandu%2FNepal

        // URLDecoder.decode(string, charset) — reverses the encoding
        String decoded = URLDecoder.decode(encoded, "UTF-8");
        System.out.println("Decoded   : " + decoded);
        // → Hello World! Name=Ravi & City=Kathmandu/Nepal

        System.out.println("\\n--- Practical Example: Building a safe query string ---");
        String name  = URLEncoder.encode("Hari Bahadur", "UTF-8");
        String city  = URLEncoder.encode("Pokhara, Nepal", "UTF-8");
        String query = "https://example.com/search?name=" + name + "&city=" + city;
        System.out.println("Safe URL: " + query);
        // → https://example.com/search?name=Hari+Bahadur&city=Pokhara%2C+Nepal

        // Decode it back
        System.out.println("\\n--- Decoding Query Parameters ---");
        String[] params = "name=Hari+Bahadur&city=Pokhara%2C+Nepal".split("&");
        for (String param : params) {
            String[] kv = param.split("=", 2);
            System.out.println(kv[0] + " = " + URLDecoder.decode(kv[1], "UTF-8"));
        }
    }
}

/*
OUTPUT:
Original  : Hello World! Name=Ravi & City=Kathmandu/Nepal
Encoded   : Hello+World%21+Name%3DRavi+%26+City%3DKathmandu%2FNepal
Decoded   : Hello World! Name=Ravi & City=Kathmandu/Nepal

Safe URL: https://example.com/search?name=Hari+Bahadur&city=Pokhara%2C+Nepal
*/`]
          }
        ]
      }
    ]
  },
  {
    id: "u3",
    title: "Unit 3 — URL, URI, Proxy, Authenticator & Cookies",
    badge: "Assignment 3 + Lab 3",
    color: "#4A148C",
    sections: [
      {
        qnum: "A3-Q1&Q2",
        qtitle: "URL Class — Absolute/Relative URLs & Parts",
        content: [
          {
            type: "definition",
            text: "URL (Uniform Resource Locator): A reference that identifies a specific resource on the internet and specifies HOW to access it. It includes the protocol, host, port, path, query, and fragment."
          },
          {
            type: "heading",
            text: "Anatomy of a URL"
          },
          {
            type: "diagram",
            text: `
  https://user:pass@www.example.com:8080/path/page.html?q=java#section2
  └─┬──┘  └───┬───┘ └──────┬──────┘└─┬┘└──────┬──────┘└──┬──┘└───┬───┘
 Protocol UserInfo    Host         Port     Path        Query  Fragment`
          },
          {
            type: "table",
            headers: ["Part", "Method", "Example Value"],
            rows: [
              ["Protocol/Scheme", "getProtocol()", "\"https\""],
              ["User Info", "getUserInfo()", "\"user:pass\""],
              ["Host", "getHost()", "\"www.example.com\""],
              ["Port", "getPort()", "8080 (-1 if not specified)"],
              ["Default Port", "getDefaultPort()", "443 for https, 80 for http"],
              ["Path", "getPath()", "\"/path/page.html\""],
              ["File (path+query)", "getFile()", "\"/path/page.html?q=java\""],
              ["Query", "getQuery()", "\"q=java\""],
              ["Fragment/Ref", "getRef()", "\"section2\""],
              ["Authority", "getAuthority()", "\"user:pass@www.example.com:8080\""],
            ]
          },
          {
            type: "heading",
            text: "Absolute vs Relative URLs"
          },
          {
            type: "table",
            headers: ["Type", "Description", "Example"],
            rows: [
              ["Absolute URL", "Contains all parts — protocol, host, path. Self-contained.", "https://www.example.com/docs/intro.html"],
              ["Relative URL", "Only contains path relative to a base URL. No protocol/host.", "../images/logo.png OR /about.html OR page2.html"],
            ]
          },
          {
            type: "code",
            label: "URLCreation.java — Absolute and relative URL creation",
            lines: [`import java.net.*;

public class URLCreation {
    public static void main(String[] args) throws Exception {
        // Absolute URL — complete, self-contained
        URL abs1 = new URL("https://www.example.com:8080/docs/index.html?tab=2#intro");

        // Construct from parts: new URL(protocol, host, port, file)
        URL abs2 = new URL("https", "www.example.com", 443, "/api/data");

        // Construct from parts: new URL(protocol, host, file) — uses default port
        URL abs3 = new URL("http", "www.example.com", "/search?q=java");

        System.out.println("abs1: " + abs1);
        System.out.println("abs2: " + abs2);
        System.out.println("abs3: " + abs3);

        // Relative URL — needs a base to be meaningful
        URL base = new URL("https://www.example.com/docs/chapter1/");

        URL rel1 = new URL(base, "page2.html");        // same directory
        URL rel2 = new URL(base, "../chapter2/p1.html"); // parent directory
        URL rel3 = new URL(base, "/index.html");       // root of same host
        URL rel4 = new URL(base, "https://other.com"); // absolute overrides base

        System.out.println("\\nRelative resolutions:");
        System.out.println("rel1: " + rel1); // https://www.example.com/docs/chapter1/page2.html
        System.out.println("rel2: " + rel2); // https://www.example.com/docs/chapter2/p1.html
        System.out.println("rel3: " + rel3); // https://www.example.com/index.html
        System.out.println("rel4: " + rel4); // https://other.com
    }
}`]
          }
        ]
      },
      {
        qnum: "A3-Q3&Q4",
        qtitle: "URI Class — Differences from URL & Parts",
        content: [
          {
            type: "table",
            headers: ["Aspect", "URL", "URI"],
            rows: [
              ["Full form", "Uniform Resource LOCATOR", "Uniform Resource IDENTIFIER"],
              ["Purpose", "How to ACCESS a resource (includes protocol)", "Just IDENTIFIES a resource (may not be locatable)"],
              ["Scope", "Subset of URI — all URLs are URIs", "Broader — URIs include URLs and URNs"],
              ["Methods", "Can open connections: url.openStream()", "Cannot directly open connections"],
              ["Encoding", "Does NOT handle encoding/decoding", "Has getRawXxx() (encoded) AND getXxx() (decoded)"],
              ["Parsing", "Less strict — may accept some invalid URIs", "Strictly RFC 2396 compliant"],
              ["Conversion", "uri.toURL() — convert URI to URL", "url.toURI() — convert URL to URI"],
              ["Use case", "Network access (HTTP, FTP)", "Canonical resource identification (e.g., XML namespaces, RDF)"],
            ]
          },
          {
            type: "tip",
            label: "RULE",
            text: "All URLs are URIs, but not all URIs are URLs. A URN like 'urn:isbn:0-486-27557-4' is a URI but NOT a URL — it identifies a book but doesn't tell you how to get it."
          }
        ]
      },
      {
        qnum: "A3-Q7",
        qtitle: "Proxy Class & ProxySelector Class",
        content: [
          {
            type: "definition",
            text: "Proxy: A server that acts as an intermediary between a client and the internet. When you connect through a proxy, your request goes to the proxy first, then the proxy forwards it to the target server. Proxies are used for caching, security, logging, and bypassing firewalls."
          },
          {
            type: "table",
            headers: ["Proxy Type", "Constant", "Description"],
            rows: [
              ["Direct (no proxy)", "Proxy.NO_PROXY", "Connect directly without any proxy"],
              ["HTTP Proxy", "Proxy.Type.HTTP", "For HTTP/HTTPS web traffic. Most common."],
              ["SOCKS Proxy", "Proxy.Type.SOCKS", "Lower-level. Handles TCP/UDP streams. Used for all protocols."],
            ]
          },
          {
            type: "code",
            label: "ProxyDemo.java — Connect through an HTTP proxy",
            lines: [`import java.net.*;
import java.io.*;

public class ProxyDemo {
    public static void main(String[] args) throws Exception {

        // ── PROXY CLASS ───────────────────────────────────────────────
        // Create a proxy object pointing to proxy server at 192.168.1.254:3128
        Proxy proxy = new Proxy(Proxy.Type.HTTP,
            new InetSocketAddress("192.168.1.254", 3128));

        URL url = new URL("http://www.example.com");

        // Open connection THROUGH the proxy
        // Without proxy: url.openConnection()
        // With proxy:    url.openConnection(proxy)
        URLConnection conn = url.openConnection(proxy);
        conn.connect();
        System.out.println("Connected via proxy!");

        // ── DIRECT CONNECTION (no proxy) ─────────────────────────────
        // Use Proxy.NO_PROXY to explicitly bypass any system proxy settings
        URLConnection direct = url.openConnection(Proxy.NO_PROXY);
        System.out.println("Connected directly!");

        // ── PROXY SELECTOR ───────────────────────────────────────────
        // ProxySelector automatically selects the right proxy for each URL
        // Useful when different URLs need different proxies

        ProxySelector.setDefault(new ProxySelector() {
            @Override
            public java.util.List<Proxy> select(URI uri) {
                java.util.List<Proxy> proxies = new java.util.ArrayList<>();
                // Use proxy only for HTTP, not for localhost
                if ("http".equals(uri.getScheme()) && !uri.getHost().equals("localhost")) {
                    proxies.add(new Proxy(Proxy.Type.HTTP,
                        new InetSocketAddress("proxy.company.com", 8080)));
                } else {
                    proxies.add(Proxy.NO_PROXY); // direct for all others
                }
                return proxies;
            }

            @Override
            public void connectFailed(URI uri, java.net.SocketAddress sa, IOException e) {
                System.err.println("Proxy failed for: " + uri + " via " + sa);
            }
        });

        // Now ALL URL connections automatically use your custom ProxySelector
        URL testURL = new URL("http://www.google.com");
        URLConnection autoConn = testURL.openConnection(); // ProxySelector selects automatically
    }
}`]
          }
        ]
      },
      {
        qnum: "A3-Q9",
        qtitle: "Authenticator & PasswordAuthentication Classes",
        content: [
          {
            type: "definition",
            text: "Authenticator: An abstract class that handles authentication challenges from servers. When a server returns HTTP 401 (Unauthorized) or 407 (Proxy Auth Required), Java calls your Authenticator subclass to get credentials. PasswordAuthentication is a simple container for username + password."
          },
          {
            type: "code",
            label: "AuthenticatorDemo.java — Handle HTTP authentication",
            lines: [`import java.net.*;
import java.io.*;

public class AuthenticatorDemo {

    // Step 1: Subclass Authenticator and override getPasswordAuthentication()
    static class MyAuthenticator extends Authenticator {
        private String username;
        private char[] password;

        MyAuthenticator(String username, String password) {
            this.username = username;
            this.password = password.toCharArray();
        }

        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            // Java calls this automatically when server sends 401 Unauthorized
            System.out.println("Authentication requested by: " + getRequestingHost());
            System.out.println("Realm (security zone)      : " + getRequestingPrompt());
            System.out.println("Request type               : " + getRequestorType()); // SERVER or PROXY
            System.out.println("Auth scheme                : " + getRequestingScheme()); // Basic, Digest

            // Return credentials — Java sends these to the server
            return new PasswordAuthentication(username, password);
        }
    }

    public static void main(String[] args) throws Exception {
        // Step 2: Register your authenticator globally
        // All future URL connections will use this automatically
        Authenticator.setDefault(new MyAuthenticator("myuser", "mypassword"));

        // Step 3: Connect to a password-protected URL
        // Java automatically calls getPasswordAuthentication() when server asks
        try {
            URL url = new URL("http://httpbin.org/basic-auth/myuser/mypassword");
            URLConnection conn = url.openConnection();
            BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null)
                System.out.println(line);
            reader.close();
        } catch (IOException e) {
            System.out.println("Auth error: " + e.getMessage());
        }
    }
}

/*
When the server sends:
  HTTP/1.1 401 Unauthorized
  WWW-Authenticate: Basic realm="My Secure Area"

Java calls getPasswordAuthentication() → you return credentials →
Java retries with:
  Authorization: Basic bXl1c2VyOm15cGFzc3dvcmQ=  (Base64 encoded)
*/`]
          }
        ]
      },
      {
        qnum: "Lab3-Q1",
        qtitle: "Lab: CookiePolicy that Blocks .gov Domains",
        content: [
          {
            type: "explain",
            text: "Java's CookieManager + CookiePolicy allows you to programmatically control which cookies your Java HTTP client accepts. This is useful in automated tools, scrapers, and security-aware clients."
          },
          {
            type: "code",
            label: "CustomCookiePolicy.java — Block .gov cookies, allow others",
            lines: [`import java.net.*;
import java.io.*;

public class CustomCookiePolicy {

    // Custom CookiePolicy: blocks .gov domains, allows everything else
    static class BlockGovCookiePolicy implements CookiePolicy {
        @Override
        public boolean shouldAccept(URI uri, HttpCookie cookie) {
            String host = uri.getHost().toLowerCase();

            // Block cookies from any .gov domain
            if (host.endsWith(".gov")) {
                System.out.println("  [BLOCKED] Cookie from gov domain: " + host
                                 + " | Cookie: " + cookie.getName() + "=" + cookie.getValue());
                return false;
            }

            // Accept cookies from all other domains
            System.out.println("  [ACCEPTED] Cookie from: " + host
                             + " | Cookie: " + cookie.getName() + "=" + cookie.getValue());
            return true;
        }
    }

    public static void main(String[] args) throws Exception {
        // Create a CookieManager with our custom policy
        CookieManager cookieManager = new CookieManager(null, new BlockGovCookiePolicy());

        // Install it as the system-wide cookie handler
        // All subsequent URLConnection requests use this
        CookieHandler.setDefault(cookieManager);

        // Test with some URLs — cookies from these would be filtered
        String[] urls = {
            "http://www.example.com",
            "http://www.google.com"
            // If you had access, "http://www.irs.gov" cookies would be blocked
        };

        for (String urlStr : urls) {
            try {
                System.out.println("\\nConnecting to: " + urlStr);
                URL url = new URL(urlStr);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.connect();
                System.out.println("Status: " + conn.getResponseCode());
                conn.disconnect();
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }

        // Show all accepted cookies in the cookie store
        System.out.println("\\n=== Stored Cookies ===");
        CookieStore store = cookieManager.getCookieStore();
        for (HttpCookie cookie : store.getCookies()) {
            System.out.println("  " + cookie.getName() + " = " + cookie.getValue()
                + " | Domain: " + cookie.getDomain()
                + " | Expires: " + (cookie.getMaxAge() == -1 ? "session" : cookie.getMaxAge() + "s"));
        }

        // CookiePolicy constants you can also use:
        // CookiePolicy.ACCEPT_ALL    — accept all cookies
        // CookiePolicy.ACCEPT_NONE   — reject all cookies
        // CookiePolicy.ACCEPT_ORIGINAL_SERVER — only accept from same server (no 3rd party)
        CookieManager strict = new CookieManager(null, CookiePolicy.ACCEPT_ORIGINAL_SERVER);
        System.out.println("\\nStrict manager created (no 3rd party cookies).");
    }
}`]
          }
        ]
      }
    ]
  },
  {
    id: "u4",
    title: "Unit 4 — HTTP, URLConnection & Headers",
    badge: "Assignment 4 & 5 + Lab 4",
    color: "#B71C1C",
    sections: [
      {
        qnum: "A4-Q1",
        qtitle: "HTTP Protocol Explained",
        content: [
          {
            type: "definition",
            text: "HTTP (HyperText Transfer Protocol): The application-layer protocol that powers the World Wide Web. It defines how clients (browsers, Java apps) send requests to servers and how servers send back responses. HTTP is stateless — each request is independent."
          },
          {
            type: "heading",
            text: "HTTP Request Structure"
          },
          {
            type: "diagram",
            text: `
GET /index.html HTTP/1.1          ← Request Line (Method + Path + Version)
Host: www.example.com             ← Required Header
Accept: text/html                 ← Optional Headers
User-Agent: Java/11.0
Connection: keep-alive
                                  ← Blank line separates headers from body
[request body — empty for GET, form data for POST]`
          },
          {
            type: "heading",
            text: "HTTP Response Structure"
          },
          {
            type: "diagram",
            text: `
HTTP/1.1 200 OK                   ← Status Line (Version + Code + Message)
Content-Type: text/html; charset=UTF-8  ← Response Headers
Content-Length: 1234
Date: Mon, 01 Jan 2025 12:00:00 GMT
                                  ← Blank line
<html>...</html>                  ← Response Body`
          },
          {
            type: "heading",
            text: "Common HTTP Status Codes"
          },
          {
            type: "table",
            headers: ["Code", "Name", "Meaning"],
            rows: [
              ["200", "OK", "Request succeeded. Body contains the requested resource."],
              ["201", "Created", "Resource was successfully created (after POST)."],
              ["301", "Moved Permanently", "Resource moved to a new URL. Client should update bookmarks."],
              ["302", "Found (Redirect)", "Temporary redirect. Client should follow Location header."],
              ["304", "Not Modified", "Client's cached version is still fresh. No body returned."],
              ["400", "Bad Request", "Client sent malformed or invalid request."],
              ["401", "Unauthorized", "Authentication required. Will send WWW-Authenticate header."],
              ["403", "Forbidden", "Server understood but refuses. Authentication won't help."],
              ["404", "Not Found", "Requested resource does not exist on the server."],
              ["500", "Internal Server Error", "Server encountered an unexpected error."],
              ["503", "Service Unavailable", "Server overloaded or down for maintenance."],
            ]
          },
          {
            type: "heading",
            text: "HTTP Methods (Verbs)"
          },
          {
            type: "table",
            headers: ["Method", "Purpose", "Has Body?", "Idempotent?"],
            rows: [
              ["GET", "Retrieve a resource. Never changes server state.", "No", "Yes"],
              ["POST", "Submit data to create/update a resource.", "Yes", "No"],
              ["PUT", "Replace an entire resource.", "Yes", "Yes"],
              ["DELETE", "Delete a resource.", "No", "Yes"],
              ["HEAD", "Like GET but returns only headers (no body). Used to check if resource exists.", "No", "Yes"],
              ["OPTIONS", "Ask server what methods are allowed for a URL.", "No", "Yes"],
              ["PATCH", "Partially update a resource (only changed fields).", "Yes", "No"],
            ]
          }
        ]
      },
      {
        qnum: "A4-Q4",
        qtitle: "Cookies — Attributes & Control",
        content: [
          {
            type: "definition",
            text: "Cookie: A small piece of data (name=value pair) that a server sends to the browser/client. The client stores it and sends it back with every subsequent request to the same domain. Used to maintain state (sessions, preferences, tracking) in stateless HTTP."
          },
          {
            type: "table",
            headers: ["Cookie Attribute", "Description", "Example"],
            rows: [
              ["Name=Value", "The actual data stored in the cookie", "sessionId=abc123"],
              ["Domain", "Which domains receive this cookie. Subdomains included if starts with dot.", "Domain=.example.com"],
              ["Path", "URL path prefix that must match for cookie to be sent.", "Path=/app/"],
              ["Max-Age", "Seconds until cookie expires. Negative = session cookie. 0 = delete.", "Max-Age=3600 (1 hour)"],
              ["Expires", "Absolute expiry date (older format, Max-Age preferred)", "Expires=Mon, 01 Jan 2026..."],
              ["Secure", "Cookie ONLY sent over HTTPS connections. Never over HTTP.", "Secure"],
              ["HttpOnly", "JavaScript cannot read this cookie. Prevents XSS theft of session cookies.", "HttpOnly"],
              ["SameSite", "Controls cross-site cookie sending. Strict/Lax/None.", "SameSite=Strict"],
            ]
          },
          {
            type: "warning",
            text: "ALWAYS use HttpOnly for session cookies — if JavaScript can read your session cookie, an XSS attack can steal it. ALWAYS use Secure for sensitive cookies — don't send session tokens over plain HTTP."
          }
        ]
      },
      {
        qnum: "A5-Q1&Q2",
        qtitle: "URLConnection Class — Usage & Reading Data",
        content: [
          {
            type: "definition",
            text: "URLConnection: An abstract class representing a connection to a URL. url.openConnection() returns a URLConnection (or HttpURLConnection for http:// URLs). It lets you configure the request (headers, timeouts), then read the response (headers, body stream)."
          },
          {
            type: "heading",
            text: "Basic Steps to Use URLConnection"
          },
          {
            type: "table",
            headers: ["Step", "Code", "Description"],
            rows: [
              ["1. Create URL", "URL url = new URL(urlString)", "Parse the URL string"],
              ["2. Open Connection", "URLConnection conn = url.openConnection()", "Creates connection object (not yet connected)"],
              ["3. Configure", "conn.setRequestProperty(key, value)", "Set headers, timeouts BEFORE connecting"],
              ["4. Connect", "conn.connect()", "Establishes actual TCP connection"],
              ["5. Read headers", "conn.getContentType(), conn.getHeaderField(name)", "Examine response headers"],
              ["6. Read body", "conn.getInputStream()", "Stream response body content"],
              ["7. Close", "stream.close()", "Always close streams to release resources"],
            ]
          },
          {
            type: "code",
            label: "URLConnectionDemo.java — Read a URL with URLConnection",
            lines: [`import java.net.*;
import java.io.*;
import java.nio.charset.*;

public class URLConnectionDemo {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://www.example.com");

        // openConnection() creates the URLConnection but doesn't connect yet
        URLConnection conn = url.openConnection();

        // ── Configure BEFORE connect() ─────────────────────────────
        conn.setConnectTimeout(5000);  // 5 sec timeout to establish TCP connection
        conn.setReadTimeout(10000);    // 10 sec timeout waiting for data
        conn.setRequestProperty("User-Agent", "MyJavaApp/1.0");
        conn.setRequestProperty("Accept", "text/html,application/xhtml+xml");
        conn.setRequestProperty("Accept-Language", "en-US");

        // ── Connect ────────────────────────────────────────────────
        conn.connect();

        // ── Read Response Headers ──────────────────────────────────
        System.out.println("Content-Type   : " + conn.getContentType());
        System.out.println("Content-Length : " + conn.getContentLength() + " bytes");
        System.out.println("Last-Modified  : " + new java.util.Date(conn.getLastModified()));

        // Read the correct charset from Content-Type header
        String contentType = conn.getContentType();
        String charset = "UTF-8"; // default
        if (contentType != null && contentType.contains("charset=")) {
            charset = contentType.substring(contentType.indexOf("charset=") + 8).trim();
        }
        System.out.println("Charset        : " + charset);

        // ── Read Response Body ─────────────────────────────────────
        System.out.println("\\n--- Page Content (first 500 chars) ---");
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), charset))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\\n");
                if (sb.length() > 500) break;
            }
            System.out.println(sb.substring(0, Math.min(500, sb.length())));
        }
    }
}`]
          }
        ]
      },
      {
        qnum: "A5-Q7",
        qtitle: "HttpURLConnection — Instantiation & Request Methods",
        content: [
          {
            type: "explain",
            text: "HttpURLConnection extends URLConnection with HTTP-specific features: request methods (GET, POST, etc.), response codes, redirects, and chunked transfer. You get it by casting url.openConnection() when the URL is http:// or https://."
          },
          {
            type: "code",
            label: "HttpURLConnectionDemo.java — GET and POST examples",
            lines: [`import java.net.*;
import java.io.*;

public class HttpURLConnectionDemo {

    // ── GET Request ──────────────────────────────────────────────────
    static void doGet(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        // Cast to HttpURLConnection for HTTP-specific features
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("GET");  // default is GET, but explicit is clearer
        conn.setRequestProperty("User-Agent", "Java/11");
        conn.setConnectTimeout(5000);
        conn.setReadTimeout(10000);
        conn.setInstanceFollowRedirects(true); // auto-follow 301/302 redirects

        int responseCode = conn.getResponseCode(); // triggers the actual HTTP request
        System.out.println("[GET] Status: " + responseCode + " " + conn.getResponseMessage());

        if (responseCode == HttpURLConnection.HTTP_OK) { // 200
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"))) {
                String line;
                while ((line = br.readLine()) != null) System.out.println(line);
            }
        }
        conn.disconnect(); // release the underlying TCP connection
    }

    // ── POST Request ─────────────────────────────────────────────────
    static void doPost(String urlStr, String jsonBody) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        conn.setRequestProperty("Accept", "application/json");

        // setDoOutput(true) enables writing to the request body
        // Required for POST, PUT, PATCH
        conn.setDoOutput(true);

        // Write request body
        try (OutputStream os = conn.getOutputStream();
             OutputStreamWriter writer = new OutputStreamWriter(os, "UTF-8")) {
            writer.write(jsonBody);
            writer.flush();
        }

        int responseCode = conn.getResponseCode();
        System.out.println("[POST] Status: " + responseCode + " " + conn.getResponseMessage());

        // getErrorStream() returns response body even for 4xx/5xx errors
        InputStream stream = (responseCode >= 200 && responseCode < 300)
            ? conn.getInputStream()
            : conn.getErrorStream();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(stream, "UTF-8"))) {
            String line;
            while ((line = br.readLine()) != null) System.out.println(line);
        }
        conn.disconnect();
    }

    public static void main(String[] args) throws Exception {
        // Test GET
        doGet("https://httpbin.org/get");

        // Test POST with JSON body
        String json = "{\"name\":\"Hari\",\"age\":22}";
        doPost("https://httpbin.org/post", json);
    }
}`]
          }
        ]
      },
      {
        qnum: "Lab4-Q1&Q2&Q3",
        qtitle: "Lab: Download Page with Correct Charset, Read Headers & Last Modified",
        content: [
          {
            type: "code",
            label: "DownloadWithCharset.java — Download page using correct charset from headers",
            lines: [`import java.net.*;
import java.io.*;

public class DownloadWithCharset {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://www.example.com");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Java)");
        conn.connect();

        // Extract charset from "Content-Type: text/html; charset=UTF-8"
        String contentType = conn.getContentType();
        String charset = "UTF-8"; // safe default
        if (contentType != null) {
            for (String part : contentType.split(";")) {
                part = part.trim();
                if (part.startsWith("charset=")) {
                    charset = part.substring(8).trim().replaceAll("\"", "");
                    break;
                }
            }
        }
        System.out.println("Detected charset: " + charset);

        // Read with the detected charset — handles accented chars, etc.
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), charset))) {
            String line;
            while ((line = br.readLine()) != null)
                System.out.println(line);
        }
        conn.disconnect();
    }
}
`]
          },
          {
            type: "code",
            label: "ReadHeaders.java — Read all HTTP response headers",
            lines: [`import java.net.*;
import java.util.*;

public class ReadHeaders {
    public static void main(String[] args) throws Exception {
        URL url = new URL("https://www.example.com");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.connect();

        System.out.println("Status: " + conn.getResponseCode() + " " + conn.getResponseMessage());
        System.out.println("\\n=== All Response Headers ===");

        // getHeaderFields() returns Map<String, List<String>>
        // Key null → the status line, other keys → header names
        Map<String, List<String>> headers = conn.getHeaderFields();
        for (Map.Entry<String, List<String>> entry : headers.entrySet()) {
            System.out.println(entry.getKey() + " : " + entry.getValue());
        }

        System.out.println("\\n=== Specific Headers ===");
        System.out.println("Content-Type  : " + conn.getContentType());
        System.out.println("Content-Length: " + conn.getContentLength());
        System.out.println("Server        : " + conn.getHeaderField("Server"));
        System.out.println("Date          : " + new Date(conn.getDate()));

        conn.disconnect();
    }
}
`]
          },
          {
            type: "code",
            label: "LastModified.java — Get when a URL was last changed",
            lines: [`import java.net.*;
import java.util.Date;
import java.text.SimpleDateFormat;

public class LastModified {
    public static void main(String[] args) throws Exception {
        String[] testURLs = {
            "https://www.example.com",
            "https://httpbin.org/get"
        };

        SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss z");

        for (String urlStr : testURLs) {
            URL url = new URL(urlStr);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("HEAD"); // HEAD = get only headers, no body (faster!)
            conn.connect();

            long lastModified = conn.getLastModified(); // 0 if not provided by server
            System.out.println("URL           : " + urlStr);
            System.out.println("Response Code : " + conn.getResponseCode());

            if (lastModified != 0) {
                System.out.println("Last-Modified : " + sdf.format(new Date(lastModified)));
            } else {
                System.out.println("Last-Modified : Not provided by server");
            }

            // Server date (when the response was generated)
            long serverDate = conn.getDate();
            if (serverDate != 0)
                System.out.println("Server Date   : " + sdf.format(new Date(serverDate)));

            // Expiry (from Expires header)
            long expiry = conn.getExpiration();
            if (expiry != 0)
                System.out.println("Expires       : " + sdf.format(new Date(expiry)));

            System.out.println();
            conn.disconnect();
        }
    }
}

/*
URL           : https://www.example.com
Response Code : 200
Last-Modified : 11-Aug-2024 05:44:00 UTC
Server Date   : 01-Jan-2025 10:30:00 UTC
*/`]
          }
        ]
      }
    ]
  },
  {
    id: "u5",
    title: "Unit 5 — TCP Sockets: Client-Server & Chat",
    badge: "Assignment 6 + Lab 5",
    color: "#004D40",
    sections: [
      {
        qnum: "A6-Q1",
        qtitle: "ServerSocket — Lifecycle of a Server Program",
        content: [
          {
            type: "definition",
            text: "ServerSocket: A Java class that listens on a specific port, waiting for client connections. When a client connects, ServerSocket.accept() returns a regular Socket object representing that connection. The server reads/writes data through that Socket."
          },
          {
            type: "heading",
            text: "Server Lifecycle — Step by Step"
          },
          {
            type: "table",
            headers: ["Step", "Code", "Description"],
            rows: [
              ["1. Bind & Listen", "new ServerSocket(port)", "Creates server socket, binds to port, starts listening. OS queues incoming connections."],
              ["2. Accept", "Socket client = server.accept()", "BLOCKS until a client connects. Returns a Socket for that client."],
              ["3. Get streams", "client.getInputStream() / getOutputStream()", "Get streams to read from / write to the client."],
              ["4. Communicate", "read/write on streams", "Exchange data with the client."],
              ["5. Close client", "client.close()", "Close this client's connection (not the server)."],
              ["6. Repeat", "Go back to accept()", "Server loops back to accept the next client."],
              ["7. Close server", "server.close()", "Shutdown the server."],
            ]
          },
          {
            type: "code",
            label: "SimpleServer.java — Basic TCP echo server",
            lines: [`import java.net.*;
import java.io.*;

public class SimpleServer {
    public static void main(String[] args) throws IOException {
        int port = 5000;

        // Step 1: Bind to port and start listening
        // backlog=10 means up to 10 connections can queue while we're busy
        ServerSocket serverSocket = new ServerSocket(port, 10);
        System.out.println("Server started. Listening on port " + port + "...");

        // Step 6: Loop — handle multiple clients one at a time
        while (true) {
            // Step 2: BLOCKS here until a client connects
            // accept() returns a Socket representing the new client
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected from: " +
                               clientSocket.getInetAddress().getHostAddress());

            // Step 3: Get I/O streams
            BufferedReader  in  = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream()));
            PrintWriter     out = new PrintWriter(clientSocket.getOutputStream(), true);
            // true = auto-flush: println() flushes immediately

            // Step 4: Communicate — echo back what client sends
            String message;
            while ((message = in.readLine()) != null) {
                System.out.println("Received: " + message);
                out.println("ECHO: " + message); // send back to client

                if ("bye".equalsIgnoreCase(message.trim())) break;
            }

            // Step 5: Close this client's socket
            System.out.println("Client disconnected.");
            clientSocket.close();
            // Loop continues → serverSocket.accept() waits for next client
        }
        // serverSocket.close(); // would go here to shutdown server gracefully
    }
}`]
          },
          {
            type: "code",
            label: "SimpleClient.java — TCP client that connects to the server",
            lines: [`import java.net.*;
import java.io.*;
import java.util.Scanner;

public class SimpleClient {
    public static void main(String[] args) throws IOException {
        String serverHost = "localhost";
        int    serverPort = 5000;

        // Connect to server: opens TCP connection to serverHost:serverPort
        Socket socket = new Socket(serverHost, serverPort);
        System.out.println("Connected to " + serverHost + ":" + serverPort);

        // Get I/O streams
        PrintWriter  out = new PrintWriter(socket.getOutputStream(), true);
        BufferedReader in = new BufferedReader(
            new InputStreamReader(socket.getInputStream()));

        Scanner scanner = new Scanner(System.in);
        System.out.println("Type messages (type 'bye' to quit):");

        String input;
        while (scanner.hasNextLine()) {
            input = scanner.nextLine();
            out.println(input);              // send to server

            String response = in.readLine(); // wait for server response
            System.out.println("Server: " + response);

            if ("bye".equalsIgnoreCase(input.trim())) break;
        }

        socket.close();
        System.out.println("Disconnected.");
    }
}`]
          }
        ]
      },
      {
        qnum: "A6-Q2&Q3",
        qtitle: "Multithreaded Server — Create & Read/Write Client Sockets",
        content: [
          {
            type: "explain",
            text: "A single-threaded server handles one client at a time — while it's talking to client A, client B must wait. A multithreaded server spawns a new thread for each accepted connection, allowing simultaneous client handling."
          },
          {
            type: "code",
            label: "MultiThreadedServer.java — Handle multiple clients simultaneously",
            lines: [`import java.net.*;
import java.io.*;
import java.util.concurrent.*;

public class MultiThreadedServer {

    // Handler for one client — runs in its own thread
    static class ClientHandler implements Runnable {
        private final Socket clientSocket;

        ClientHandler(Socket socket) {
            this.clientSocket = socket;
        }

        @Override
        public void run() {
            String clientIP = clientSocket.getInetAddress().getHostAddress();
            System.out.println("[" + Thread.currentThread().getName() + "] Connected: " + clientIP);

            try (
                // ── Reading from client socket ───────────────────────
                BufferedReader  in  = new BufferedReader(
                    new InputStreamReader(clientSocket.getInputStream()));
                // ── Writing to client socket ─────────────────────────
                PrintWriter     out = new PrintWriter(
                    clientSocket.getOutputStream(), true) // true = auto-flush
            ) {
                // Send welcome message
                out.println("Welcome! You are connected. Type 'bye' to quit.");

                String message;
                // in.readLine() BLOCKS until client sends a line (or disconnects)
                while ((message = in.readLine()) != null) {
                    System.out.println("[" + clientIP + "] Received: " + message);

                    if ("bye".equalsIgnoreCase(message.trim())) {
                        out.println("Goodbye!");
                        break;
                    }

                    // Write response back to the client
                    out.println("Server echoes: " + message.toUpperCase());
                }

            } catch (IOException e) {
                System.out.println("Client " + clientIP + " error: " + e.getMessage());
            } finally {
                try { clientSocket.close(); } catch (IOException e) {}
                System.out.println("[" + clientIP + "] Disconnected.");
            }
        }
    }

    public static void main(String[] args) throws IOException {
        int port = 5000;
        ServerSocket server = new ServerSocket(port);
        System.out.println("Multithreaded server on port " + port);

        // Thread pool — reuse up to 10 threads instead of creating new ones endlessly
        // Prevents memory exhaustion when thousands of clients connect
        ExecutorService pool = Executors.newFixedThreadPool(10);

        while (true) {
            Socket client = server.accept(); // blocks until next client
            // Submit to thread pool — runs ClientHandler.run() in a pool thread
            pool.submit(new ClientHandler(client));
            // Main thread immediately loops back to accept() for next client
        }
    }
}`]
          }
        ]
      },
      {
        qnum: "Lab5-Q2",
        qtitle: "Lab: GUI Chat Application using Swing",
        content: [
          {
            type: "code",
            label: "ChatServer.java — Multithreaded chat server broadcasting to all clients",
            lines: [`import java.net.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;

public class ChatServer {
    // Thread-safe list of all connected clients
    static List<PrintWriter> clients = new CopyOnWriteArrayList<>();

    // Broadcast a message to ALL connected clients
    static void broadcast(String message) {
        System.out.println("[BROADCAST] " + message);
        for (PrintWriter writer : clients) {
            writer.println(message);
        }
    }

    static class ClientHandler implements Runnable {
        private Socket socket;
        private PrintWriter out;
        private String username;

        ClientHandler(Socket socket) { this.socket = socket; }

        public void run() {
            try {
                BufferedReader in  = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));
                out = new PrintWriter(socket.getOutputStream(), true);

                // First message from client is the username
                username = in.readLine();
                clients.add(out); // register this client
                broadcast("*** " + username + " joined the chat ***");

                String msg;
                while ((msg = in.readLine()) != null) {
                    if ("/quit".equals(msg)) break;
                    broadcast(username + ": " + msg);
                }

            } catch (IOException e) {
                System.out.println(username + " disconnected: " + e.getMessage());
            } finally {
                if (out != null) clients.remove(out);
                broadcast("*** " + username + " left the chat ***");
                try { socket.close(); } catch (IOException e) {}
            }
        }
    }

    public static void main(String[] args) throws IOException {
        ServerSocket server = new ServerSocket(6000);
        System.out.println("Chat server started on port 6000");
        ExecutorService pool = Executors.newCachedThreadPool();
        while (true) pool.submit(new ClientHandler(server.accept()));
    }
}`]
          },
          {
            type: "code",
            label: "ChatClient.java — Swing GUI chat client",
            lines: [`import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.net.*;
import java.io.*;

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
        chatArea.setBackground(new Color(30, 30, 30));
        chatArea.setForeground(new Color(200, 220, 200));
        JScrollPane scroll = new JScrollPane(chatArea);

        JPanel bottom = new JPanel(new FlowLayout(FlowLayout.LEFT));
        bottom.add(inputField);
        bottom.add(sendBtn);

        add(scroll, BorderLayout.CENTER);
        add(bottom,  BorderLayout.SOUTH);

        // Send message action
        ActionListener sendAction = e -> {
            String msg = inputField.getText().trim();
            if (!msg.isEmpty() && out != null) {
                out.println(msg);
                inputField.setText("");
            }
        };
        sendBtn.addActionListener(sendAction);
        inputField.addActionListener(sendAction); // Enter key also sends

        pack();
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);

        // Connect to server in a background thread
        new Thread(() -> {
            try {
                Socket socket = new Socket(host, port);
                out = new PrintWriter(socket.getOutputStream(), true);
                out.println(username); // send username first

                // Read incoming messages on background thread
                BufferedReader in = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));
                String line;
                while ((line = in.readLine()) != null) {
                    final String msg = line;
                    // UI updates must happen on Event Dispatch Thread!
                    SwingUtilities.invokeLater(() -> {
                        chatArea.append(msg + "\\n");
                        chatArea.setCaretPosition(chatArea.getDocument().getLength());
                    });
                }
            } catch (IOException ex) {
                SwingUtilities.invokeLater(() ->
                    chatArea.append("Disconnected: " + ex.getMessage() + "\\n"));
            }
        }).start();
    }

    public static void main(String[] args) {
        String name = JOptionPane.showInputDialog(null, "Enter your username:");
        if (name != null && !name.trim().isEmpty())
            new ChatClient("localhost", 6000, name.trim());
    }
}`]
          }
        ]
      },
      {
        qnum: "A6-Q4&Q5",
        qtitle: "ServerSocket Constructors & Options",
        content: [
          {
            type: "heading",
            text: "ServerSocket Constructors"
          },
          {
            type: "table",
            headers: ["Constructor", "Description"],
            rows: [
              ["new ServerSocket()", "Creates unbound socket. Must call bind() later. Useful to set options before binding."],
              ["new ServerSocket(port)", "Bind to port on all local addresses. Backlog = 50 (default)."],
              ["new ServerSocket(port, backlog)", "Bind to port with custom backlog queue size."],
              ["new ServerSocket(port, backlog, bindAddr)", "Bind to a specific local IP. Useful on multi-homed servers."],
            ]
          },
          {
            type: "heading",
            text: "Server Socket Options"
          },
          {
            type: "table",
            headers: ["Option", "Method", "Description"],
            rows: [
              ["SO_TIMEOUT", "setSoTimeout(ms)", "How long accept() blocks before throwing SocketTimeoutException. 0 = block forever."],
              ["SO_REUSEADDR", "setReuseAddress(true)", "Allow binding to a port that's still in TIME_WAIT. Prevents 'Address already in use' on restart."],
              ["Receive Buffer", "setReceiveBufferSize(n)", "Hint for TCP receive buffer size for all accepted connections."],
              ["Backlog", "new ServerSocket(port, backlog)", "Max number of connections that can queue while server is busy in accept()."],
            ]
          },
          {
            type: "code",
            label: "ServerSocketOptions.java — Constructors and options demo",
            lines: [`import java.net.*;
import java.io.*;

public class ServerSocketOptions {
    public static void main(String[] args) throws Exception {
        // Unbound — set options before binding
        ServerSocket ss = new ServerSocket();
        ss.setReuseAddress(true);        // don't fail if port in TIME_WAIT
        ss.setSoTimeout(30000);          // accept() times out after 30 seconds
        ss.setReceiveBufferSize(65536);  // 64KB receive buffer hint

        // Bind manually — port 5001, backlog 20, on all interfaces
        ss.bind(new InetSocketAddress(5001, 20));

        System.out.println("Listening on: " + ss.getLocalSocketAddress());
        System.out.println("SO_TIMEOUT   : " + ss.getSoTimeout() + " ms");
        System.out.println("SO_REUSEADDR : " + ss.getReuseAddress());
        System.out.println("Recv Buffer  : " + ss.getReceiveBufferSize());
        System.out.println("isClosed()   : " + ss.isClosed());
        System.out.println("isBound()    : " + ss.isBound());
        System.out.println("Local Port   : " + ss.getLocalPort());

        // Bind on specific interface only (e.g., only accept local connections)
        ServerSocket local = new ServerSocket(5002, 50,
            InetAddress.getByName("127.0.0.1")); // only loopback connections
        System.out.println("\\nLocal-only server on: " + local.getLocalSocketAddress());

        ss.close();
        local.close();
    }
}`]
          }
        ]
      }
    ]
  },
  {
    id: "u6",
    title: "Unit 6 — UDP, NIO, Multicast & Secure Sockets",
    badge: "Assignments 7–10 + Lab 5",
    color: "#E65100",
    sections: [
      {
        qnum: "A9-Q1&Q2&Q3",
        qtitle: "UDP — DatagramSocket & DatagramPacket",
        content: [
          {
            type: "definition",
            text: "UDP (User Datagram Protocol): A connectionless transport protocol. Unlike TCP, there is no handshake, no guaranteed delivery, and no order preservation. Packets (datagrams) are sent independently. Faster and lower overhead than TCP, but unreliable."
          },
          {
            type: "table",
            headers: ["Feature", "TCP", "UDP"],
            rows: [
              ["Connection", "Connection-oriented (3-way handshake)", "Connectionless — no setup needed"],
              ["Reliability", "Guaranteed delivery, retransmission", "No guarantees — packets may drop"],
              ["Order", "In-order delivery", "Packets may arrive out of order"],
              ["Speed", "Slower due to overhead", "Faster — minimal overhead"],
              ["Use case", "File transfer, HTTP, email", "Video streaming, gaming, DNS, VoIP"],
              ["Java class", "Socket / ServerSocket", "DatagramSocket / DatagramPacket"],
            ]
          },
          {
            type: "heading",
            text: "UDP Lifecycle"
          },
          {
            type: "table",
            headers: ["Server Side", "Client Side"],
            rows: [
              ["new DatagramSocket(port) — bind to port", "new DatagramSocket() — random port"],
              ["Create empty packet for receiving", "Create packet with data + destination address+port"],
              ["socket.receive(packet) — BLOCKS", "socket.send(packet) — fire and forget"],
              ["Read data from packet", "Optionally receive(packet) for response"],
              ["Loop back to receive()", "Close socket"],
            ]
          },
          {
            type: "code",
            label: "UDPServer.java — UDP Daytime server",
            lines: [`import java.net.*;
import java.io.*;
import java.util.Date;

public class UDPServer {
    public static void main(String[] args) throws Exception {
        int port = 7000;
        // DatagramSocket bound to port — ready to receive UDP packets
        DatagramSocket socket = new DatagramSocket(port);
        System.out.println("UDP Server listening on port " + port);

        byte[] buffer = new byte[256]; // buffer to hold incoming data

        while (true) {
            // DatagramPacket to receive into — wraps the byte buffer
            DatagramPacket receivePacket = new DatagramPacket(buffer, buffer.length);

            // BLOCKS until a UDP packet arrives
            socket.receive(receivePacket);

            // Extract sender's address and port (needed to reply)
            InetAddress clientAddr = receivePacket.getAddress();
            int         clientPort = receivePacket.getPort();

            // Extract the message data
            String received = new String(receivePacket.getData(), 0, receivePacket.getLength());
            System.out.println("Received from " + clientAddr + ":" + clientPort + " → " + received);

            // Prepare reply
            String reply = "Server time: " + new Date().toString();
            byte[] replyData = reply.getBytes("UTF-8");

            // DatagramPacket with data + destination address + port
            DatagramPacket sendPacket = new DatagramPacket(
                replyData, replyData.length, clientAddr, clientPort);

            socket.send(sendPacket); // send — no connection, just fire packet
            System.out.println("Replied to " + clientAddr + ":" + clientPort);
        }
    }
}
`]
          },
          {
            type: "code",
            label: "UDPClient.java — Send and receive UDP datagram",
            lines: [`import java.net.*;

public class UDPClient {
    public static void main(String[] args) throws Exception {
        String serverHost = "localhost";
        int    serverPort = 7000;

        DatagramSocket socket = new DatagramSocket(); // no port = OS assigns random port
        socket.setSoTimeout(5000); // timeout if no reply in 5 sec

        // Prepare request
        String  message     = "Hello, UDP Server!";
        byte[]  data        = message.getBytes("UTF-8");
        InetAddress address = InetAddress.getByName(serverHost);

        // Send packet: data + server address + server port
        DatagramPacket sendPacket = new DatagramPacket(data, data.length, address, serverPort);
        socket.send(sendPacket);
        System.out.println("Sent: " + message);

        // Receive reply
        byte[] replyBuffer = new byte[512];
        DatagramPacket replyPacket = new DatagramPacket(replyBuffer, replyBuffer.length);

        try {
            socket.receive(replyPacket); // blocks until reply arrives or timeout
            String reply = new String(replyPacket.getData(), 0, replyPacket.getLength());
            System.out.println("Reply from server: " + reply);
        } catch (java.net.SocketTimeoutException e) {
            System.out.println("No reply received within timeout.");
        }

        socket.close();
    }
}`]
          }
        ]
      },
      {
        qnum: "Lab5-Q3",
        qtitle: "Lab: Datagram Socket Console Chat",
        content: [
          {
            type: "code",
            label: "DatagramChatServer.java + DatagramChatClient.java — UDP console chat",
            lines: [`// ── DatagramChatServer.java ──────────────────────────────────────────
import java.net.*;

public class DatagramChatServer {
    static final int PORT = 7500;

    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket(PORT);
        byte[] buf = new byte[512];
        System.out.println("UDP Chat Server ready on port " + PORT);
        System.out.println("Waiting for messages...");

        while (true) {
            DatagramPacket recv = new DatagramPacket(buf, buf.length);
            socket.receive(recv);

            String msg = new String(recv.getData(), 0, recv.getLength(), "UTF-8");
            System.out.println("Client: " + msg);

            // Read server response from console and send back
            System.out.print("Server> ");
            String reply = new java.util.Scanner(System.in).nextLine();
            byte[] replyBytes = reply.getBytes("UTF-8");
            socket.send(new DatagramPacket(replyBytes, replyBytes.length,
                recv.getAddress(), recv.getPort()));
        }
    }
}`,
`// ── DatagramChatClient.java ──────────────────────────────────────────
import java.net.*;
import java.util.Scanner;

public class DatagramChatClient {
    static final int SERVER_PORT = 7500;

    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        socket.setSoTimeout(10000);
        InetAddress serverAddr = InetAddress.getByName("localhost");

        Scanner scanner = new Scanner(System.in);
        System.out.println("UDP Chat Client. Type messages (Ctrl+C to quit):");

        while (true) {
            System.out.print("You> ");
            String msg = scanner.nextLine();
            byte[] data = msg.getBytes("UTF-8");
            socket.send(new DatagramPacket(data, data.length, serverAddr, SERVER_PORT));

            // Wait for reply
            byte[] buf = new byte[512];
            DatagramPacket reply = new DatagramPacket(buf, buf.length);
            try {
                socket.receive(reply);
                System.out.println("Server: " + new String(reply.getData(), 0, reply.getLength(), "UTF-8"));
            } catch (java.net.SocketTimeoutException e) {
                System.out.println("(No reply from server)");
            }
        }
    }
}`]
          }
        ]
      },
      {
        qnum: "A8-Q1&Q2",
        qtitle: "NIO — Non-Blocking I/O, ByteBuffer & Channel",
        content: [
          {
            type: "definition",
            text: "NIO (New I/O): Introduced in Java 1.4, it provides an alternative I/O approach using Channels (bidirectional data pipes), Buffers (containers of data), and Selectors (monitoring multiple channels with one thread). Key advantage: non-blocking mode — a single thread can serve thousands of connections."
          },
          {
            type: "table",
            headers: ["Concept", "Traditional I/O", "NIO"],
            rows: [
              ["Abstraction", "Streams (InputStream/OutputStream)", "Channels (SocketChannel, FileChannel)"],
              ["Data unit", "Bytes/chars sequentially", "ByteBuffer (block of bytes)"],
              ["Blocking", "Blocking (thread waits)", "Can be non-blocking (thread continues)"],
              ["Multiplexing", "One thread per connection", "One thread handles many connections via Selector"],
              ["Scalability", "10k clients = 10k threads = memory exhaustion", "10k clients = 1 thread with Selector"],
            ]
          },
          {
            type: "heading",
            text: "ByteBuffer — Key Methods & States"
          },
          {
            type: "table",
            headers: ["Method", "Description"],
            rows: [
              ["ByteBuffer.allocate(n)", "Create a buffer with n bytes capacity on heap"],
              ["ByteBuffer.allocateDirect(n)", "Create a buffer outside heap — faster for I/O"],
              ["put(bytes)", "Write data INTO buffer. Advances position."],
              ["flip()", "Switch from writing to reading mode: limit=position, position=0"],
              ["get()", "Read data FROM buffer. Advances position."],
              ["clear()", "Reset for fresh writing: position=0, limit=capacity"],
              ["compact()", "Keep unread bytes, move to front, ready for more writing"],
              ["remaining()", "How many bytes can still be read: limit - position"],
            ]
          },
          {
            type: "code",
            label: "NIOServer.java — Non-blocking server with Selector",
            lines: [`import java.nio.*;
import java.nio.channels.*;
import java.net.*;
import java.util.*;

public class NIOServer {
    public static void main(String[] args) throws Exception {
        int port = 9000;

        // Open a server channel (non-blocking equivalent of ServerSocket)
        ServerSocketChannel serverChannel = ServerSocketChannel.open();
        serverChannel.socket().bind(new InetSocketAddress(port));

        // Set NON-BLOCKING mode — accept() no longer blocks
        serverChannel.configureBlocking(false);

        // Create Selector — monitors multiple channels with ONE thread
        Selector selector = Selector.open();

        // Register serverChannel with selector for ACCEPT events
        serverChannel.register(selector, SelectionKey.OP_ACCEPT);

        System.out.println("NIO Non-blocking Server on port " + port);

        while (true) {
            // BLOCKS until at least one channel is ready
            int readyCount = selector.select();
            if (readyCount == 0) continue;

            Set<SelectionKey> selectedKeys = selector.selectedKeys();
            Iterator<SelectionKey> iter = selectedKeys.iterator();

            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove(); // IMPORTANT: remove processed key

                if (key.isAcceptable()) {
                    // A new client is connecting
                    ServerSocketChannel ssc = (ServerSocketChannel) key.channel();
                    SocketChannel client = ssc.accept(); // non-blocking — won't block
                    client.configureBlocking(false);
                    // Register new client for READ events
                    client.register(selector, SelectionKey.OP_READ);
                    System.out.println("Client connected: " + client.getRemoteAddress());

                } else if (key.isReadable()) {
                    // A client sent data
                    SocketChannel client = (SocketChannel) key.channel();
                    ByteBuffer buffer = ByteBuffer.allocate(256);

                    int bytesRead = client.read(buffer); // non-blocking read
                    if (bytesRead == -1) {
                        // Client disconnected
                        System.out.println("Client disconnected.");
                        client.close();
                        key.cancel();
                    } else if (bytesRead > 0) {
                        buffer.flip(); // switch from writing to reading mode
                        byte[] data = new byte[buffer.remaining()];
                        buffer.get(data);
                        String msg = new String(data).trim();
                        System.out.println("Received: " + msg);

                        // Echo back
                        ByteBuffer response = ByteBuffer.wrap(("ECHO: " + msg + "\\n").getBytes());
                        client.write(response);
                    }
                }
            }
        }
    }
}
`]
          }
        ]
      },
      {
        qnum: "A8-Q3",
        qtitle: "Readiness Selection — Selector & SelectionKey Classes",
        content: [
          {
            type: "definition",
            text: "Readiness Selection: The ability to ask 'which of these channels are ready for I/O right now?' without blocking on any single one. The Selector checks all registered channels and returns only the ones that have pending data or can be written to."
          },
          {
            type: "table",
            headers: ["SelectionKey Constant", "Value", "Meaning"],
            rows: [
              ["SelectionKey.OP_ACCEPT", "16", "ServerSocketChannel ready to accept a new connection"],
              ["SelectionKey.OP_CONNECT", "8", "SocketChannel finished connecting (for clients)"],
              ["SelectionKey.OP_READ", "1", "SocketChannel has data available to read"],
              ["SelectionKey.OP_WRITE", "4", "SocketChannel can accept data to be written"],
            ]
          },
          {
            type: "table",
            headers: ["Selector Method", "Description"],
            rows: [
              ["Selector.open()", "Create a new selector"],
              ["channel.register(selector, ops)", "Register channel with selector for specified ops"],
              ["selector.select()", "Block until at least one channel is ready. Returns count."],
              ["selector.select(timeout)", "Block up to timeout ms"],
              ["selector.selectNow()", "Non-blocking — returns immediately with current ready count"],
              ["selector.selectedKeys()", "Set of keys for channels that are ready"],
              ["selector.keys()", "All registered keys (ready or not)"],
            ]
          }
        ]
      },
      {
        qnum: "A10-Q1&Q2",
        qtitle: "IP Multicasting — MulticastSocket",
        content: [
          {
            type: "definition",
            text: "IP Multicasting: A one-to-many network communication. A sender sends ONE packet to a multicast group address (224.0.0.0 – 239.255.255.255). All machines that have JOINED that group receive the packet. More efficient than sending individual copies to each receiver."
          },
          {
            type: "table",
            headers: ["Concept", "Description"],
            rows: [
              ["Multicast Address", "A special IP in 224.0.0.0–239.255.255.255. Not a machine — it's a 'channel'"],
              ["Multicast Group", "All sockets that have joined a particular multicast address"],
              ["Join Group", "socket.joinGroup(address) — subscribe to receive packets for this group"],
              ["Leave Group", "socket.leaveGroup(address) — stop receiving packets"],
              ["TTL", "Time-To-Live: how many routers the packet passes through. 1 = local subnet only"],
            ]
          },
          {
            type: "code",
            label: "MulticastSender.java + MulticastReceiver.java — Group communication",
            lines: [`// ── MulticastSender.java ─────────────────────────────────────────────
import java.net.*;

public class MulticastSender {
    public static void main(String[] args) throws Exception {
        InetAddress group = InetAddress.getByName("230.0.0.1"); // multicast group address
        int port = 4446;

        MulticastSocket socket = new MulticastSocket();
        socket.setTimeToLive(1); // TTL=1: stay on local subnet (don't cross routers)

        String[] messages = {"Hello Group!", "Message 2", "Message 3", "END"};

        for (String msg : messages) {
            byte[] data = msg.getBytes("UTF-8");
            // Send to the multicast group address — ALL members receive it
            DatagramPacket packet = new DatagramPacket(data, data.length, group, port);
            socket.send(packet);
            System.out.println("Sent to group: " + msg);
            Thread.sleep(1000); // 1 second between messages
        }

        socket.close();
    }
}`,
`// ── MulticastReceiver.java ───────────────────────────────────────────
import java.net.*;

public class MulticastReceiver {
    public static void main(String[] args) throws Exception {
        InetAddress group = InetAddress.getByName("230.0.0.1");
        int port = 4446;

        // MulticastSocket bound to the port
        MulticastSocket socket = new MulticastSocket(port);

        // JOIN the multicast group — now we receive packets sent to 230.0.0.1:4446
        socket.joinGroup(group);
        System.out.println("Joined multicast group: " + group.getHostAddress());
        System.out.println("Waiting for messages...");

        byte[] buf = new byte[256];
        while (true) {
            DatagramPacket packet = new DatagramPacket(buf, buf.length);
            socket.receive(packet); // blocks until a packet arrives

            String msg = new String(packet.getData(), 0, packet.getLength(), "UTF-8");
            System.out.println("Received: " + msg + " [from " + packet.getAddress() + "]");

            if ("END".equals(msg)) {
                System.out.println("Received END signal. Leaving group.");
                break;
            }
        }

        socket.leaveGroup(group); // unsubscribe from the group
        socket.close();
    }
}`]
          }
        ]
      },
      {
        qnum: "A7-Q1&Q2&Q3",
        qtitle: "Secure Sockets — SSL/TLS Client & Server",
        content: [
          {
            type: "definition",
            text: "Secure Socket (SSL/TLS): An encrypted socket connection. SSL (Secure Sockets Layer) and TLS (Transport Layer Security — its successor) add encryption, authentication, and integrity on top of regular TCP sockets. Used by HTTPS, SMTPS, etc."
          },
          {
            type: "table",
            headers: ["Aspect", "Regular Socket", "SSL Socket"],
            rows: [
              ["Data", "Plain text — anyone can read if intercepted", "Encrypted — unreadable without the key"],
              ["Authentication", "None — you don't know who you're talking to", "Certificate-based — verify server identity"],
              ["Integrity", "Data can be tampered", "MAC ensures data hasn't been altered"],
              ["Java class", "Socket / ServerSocket", "SSLSocket / SSLServerSocket"],
              ["Factory", "new Socket()", "SSLSocketFactory.getDefault().createSocket()"],
              ["Port", "Any port", "HTTPS = 443, SMTPS = 465"],
            ]
          },
          {
            type: "code",
            label: "SSLClient.java + SSLServer.java — Secure socket communication",
            lines: [`// ── SSLClient.java ────────────────────────────────────────────────────
import javax.net.ssl.*;
import java.io.*;

public class SSLClient {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        int    port = 8443;

        // Get the SSLSocketFactory — creates SSL-wrapped sockets
        SSLSocketFactory factory = (SSLSocketFactory) SSLSocketFactory.getDefault();

        // Create SSL socket — performs TLS handshake automatically on connect
        try (SSLSocket socket = (SSLSocket) factory.createSocket(host, port)) {

            // Optionally restrict to specific TLS versions and cipher suites
            socket.setEnabledProtocols(new String[]{"TLSv1.2", "TLSv1.3"});

            // Start TLS handshake explicitly (also done automatically on first I/O)
            socket.startHandshake();
            System.out.println("TLS Handshake complete!");

            // Get session info
            SSLSession session = socket.getSession();
            System.out.println("Protocol      : " + session.getProtocol());       // TLSv1.3
            System.out.println("Cipher Suite  : " + session.getCipherSuite());
            System.out.println("Session ID    : " + javax.xml.bind.DatatypeConverter
                .printHexBinary(session.getId()));

            // Communicate exactly like a regular socket
            PrintWriter  out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in  = new BufferedReader(
                new InputStreamReader(socket.getInputStream()));

            out.println("Hello over SSL!");
            System.out.println("Server: " + in.readLine());
        }
    }
}`,
`// ── SSLServer.java ────────────────────────────────────────────────────
import javax.net.ssl.*;
import java.io.*;

public class SSLServer {
    public static void main(String[] args) throws Exception {
        // System properties tell Java where the keystore (certificate) is
        // keytool -genkey -alias myserver -keyalg RSA -keystore server.jks
        System.setProperty("javax.net.ssl.keyStore", "server.jks");
        System.setProperty("javax.net.ssl.keyStorePassword", "password");

        int port = 8443;
        SSLServerSocketFactory factory =
            (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();

        try (SSLServerSocket serverSocket =
                (SSLServerSocket) factory.createServerSocket(port)) {

            System.out.println("SSL Server listening on port " + port);

            while (true) {
                // accept() waits for SSL client — TLS handshake is done automatically
                SSLSocket client = (SSLSocket) serverSocket.accept();
                System.out.println("SSL Client connected: " +
                    client.getInetAddress().getHostAddress());

                // Handle in thread for multiple clients
                new Thread(() -> {
                    try {
                        BufferedReader in  = new BufferedReader(
                            new InputStreamReader(client.getInputStream()));
                        PrintWriter    out = new PrintWriter(
                            client.getOutputStream(), true);

                        String msg = in.readLine();
                        System.out.println("Received (encrypted): " + msg);
                        out.println("Secure echo: " + msg);

                        client.close();
                    } catch (IOException e) { e.printStackTrace(); }
                }).start();
            }
        }
    }
}

/* 
SETUP COMMANDS (run before starting server):
# Generate self-signed certificate/keystore
keytool -genkey -alias myserver -keyalg RSA -keystore server.jks -storepass password

# When running client, trust the self-signed cert:
java -Djavax.net.ssl.trustStore=server.jks -Djavax.net.ssl.trustStorePassword=password SSLClient
*/`]
          }
        ]
      }
    ]
  },
  {
    id: "u7",
    title: "Unit 7 — RMI (Remote Method Invocation)",
    badge: "Assignment 11",
    color: "#37474F",
    sections: [
      {
        qnum: "A11-Q1",
        qtitle: "RMI — Architecture & Block Diagram",
        content: [
          {
            type: "definition",
            text: "RMI (Remote Method Invocation): A Java API that allows an object in one JVM to call methods of an object in another JVM (on the same machine or over a network). The entire network communication is hidden — it looks and feels like a local method call."
          },
          {
            type: "diagram",
            text: `
┌─────────────────────────────────────────────────────────────────────────┐
│                         RMI ARCHITECTURE                                │
│                                                                         │
│  CLIENT JVM                          SERVER JVM                         │
│  ┌───────────────┐                   ┌───────────────────────────────┐  │
│  │               │                   │                               │  │
│  │  Client App   │                   │   Remote Object (Impl)        │  │
│  │  service.add()│                   │   add(a,b) { return a+b; }   │  │
│  │               │                   │                               │  │
│  └──────┬────────┘                   └───────────────┬───────────────┘  │
│         │ "looks local"                              │ actually runs here│
│  ┌──────▼────────┐  ═══Network════  ┌───────────────▼───────────────┐  │
│  │               │  serialized args  │                               │  │
│  │     STUB      │ ────────────────► │     SKELETON (auto in JDK5+)  │  │
│  │ (local proxy) │ ◄──────────────── │     (unmarshal, call, return) │  │
│  │               │  serialized result│                               │  │
│  └───────────────┘                   └───────────────────────────────┘  │
│                                                                         │
│               ┌─────────────────────────────────────┐                  │
│               │     RMI REGISTRY (port 1099)         │                  │
│               │  "AddService" → stub reference        │                 │
│               │  Server: Naming.rebind("AddService")  │                 │
│               │  Client: Naming.lookup("AddService")  │                 │
│               └─────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────┘`
          },
          {
            type: "table",
            headers: ["Component", "Location", "Role"],
            rows: [
              ["Remote Interface", "Shared (both sides)", "Declares which methods are callable remotely. Extends java.rmi.Remote. All methods throw RemoteException."],
              ["Remote Implementation", "Server", "The actual class with the logic. Extends UnicastRemoteObject. Implements the Remote Interface."],
              ["Stub", "Client-side (generated)", "Client-side proxy. Marshals (serializes) arguments, sends over network, unmarshals result."],
              ["RMI Registry", "Server (port 1099)", "Naming service. Server binds objects by name. Client looks up name to get Stub."],
              ["Marshaling/Unmarshaling", "Automatic", "Java serializes parameters and return values automatically."],
            ]
          }
        ]
      },
      {
        qnum: "A11-Q2&Q3",
        qtitle: "Steps to Create RMI Client & Server — Complete Example",
        content: [
          {
            type: "heading",
            text: "Steps to Build an RMI Application"
          },
          {
            type: "bullets",
            items: [
              "Step 1: Define the Remote Interface — extends Remote, all methods declare throws RemoteException",
              "Step 2: Implement the interface on server — extends UnicastRemoteObject",
              "Step 3: Server creates RMI Registry and binds the remote object with a name",
              "Step 4: Client looks up the name in the registry — gets a Stub",
              "Step 5: Client calls methods on the Stub — calls travel to server, results come back"
            ]
          },
          {
            type: "code",
            label: "Complete RMI Example — Calculator Service",
            lines: [`// ────────────────────────────────────────────────────────────────────
// FILE 1: CalculatorService.java  — Remote Interface (SHARED)
// Both client and server must have this file (or the .class)
// ────────────────────────────────────────────────────────────────────
import java.rmi.*;

public interface CalculatorService extends Remote {
    // ALL methods MUST declare throws RemoteException
    // This is mandatory — network calls can always fail
    double add(double a, double b)      throws RemoteException;
    double subtract(double a, double b) throws RemoteException;
    double multiply(double a, double b) throws RemoteException;
    double divide(double a, double b)   throws RemoteException;
}`,
`// ────────────────────────────────────────────────────────────────────
// FILE 2: CalculatorServiceImpl.java  — Server Implementation
// ────────────────────────────────────────────────────────────────────
import java.rmi.*;
import java.rmi.server.*;
import java.rmi.registry.*;

public class CalculatorServiceImpl
        extends UnicastRemoteObject   // handles network infrastructure
        implements CalculatorService {

    // Constructor MUST declare throws RemoteException (required by UnicastRemoteObject)
    protected CalculatorServiceImpl() throws RemoteException {
        super(); // calls UnicastRemoteObject constructor — exports this object
    }

    @Override
    public double add(double a, double b) throws RemoteException {
        System.out.println("[SERVER] add(" + a + ", " + b + ") called");
        return a + b;
    }

    @Override
    public double subtract(double a, double b) throws RemoteException {
        return a - b;
    }

    @Override
    public double multiply(double a, double b) throws RemoteException {
        return a * b;
    }

    @Override
    public double divide(double a, double b) throws RemoteException {
        if (b == 0) throw new RemoteException("Division by zero!");
        return a / b;
    }

    public static void main(String[] args) {
        try {
            // STEP 3a: Start RMI Registry on port 1099 (default RMI port)
            // This is the naming service — maps names to remote objects
            Registry registry = LocateRegistry.createRegistry(1099);
            System.out.println("RMI Registry started on port 1099.");

            // STEP 3b: Create the remote object
            CalculatorServiceImpl calc = new CalculatorServiceImpl();

            // STEP 3c: Bind the object to a name in the registry
            // Naming.rebind replaces existing binding (won't throw if already exists)
            Naming.rebind("rmi://localhost/CalculatorService", calc);
            System.out.println("CalculatorService bound. Server ready, waiting for clients...");

            // Server keeps running... ctrl+C to stop
        } catch (Exception e) {
            System.err.println("Server error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}`,
`// ────────────────────────────────────────────────────────────────────
// FILE 3: CalculatorClient.java  — Client
// ────────────────────────────────────────────────────────────────────
import java.rmi.*;

public class CalculatorClient {
    public static void main(String[] args) {
        try {
            // STEP 4: Look up the remote object by name in the registry
            // Returns a STUB — a local proxy object for the remote calculator
            // The stub implements CalculatorService, so we can call its methods
            CalculatorService calc = (CalculatorService)
                Naming.lookup("rmi://localhost/CalculatorService");

            System.out.println("Connected to CalculatorService on server.");

            // STEP 5: Call methods — looks exactly like local method calls!
            // But underneath: args are serialized → sent over TCP → executed on server
            //                  result serialized → sent back → deserialized here
            double result1 = calc.add(15.5, 24.5);
            System.out.println("15.5 + 24.5 = " + result1);        // 40.0

            double result2 = calc.subtract(100, 37.5);
            System.out.println("100 - 37.5 = " + result2);         // 62.5

            double result3 = calc.multiply(6, 7);
            System.out.println("6 × 7 = " + result3);              // 42.0

            double result4 = calc.divide(99, 3);
            System.out.println("99 ÷ 3 = " + result4);             // 33.0

        } catch (NotBoundException e) {
            System.err.println("Service not found: " + e.getMessage());
        } catch (RemoteException e) {
            System.err.println("Remote error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

/*
HOW TO RUN:
1. javac CalculatorService.java CalculatorServiceImpl.java CalculatorClient.java
2. In terminal 1: java CalculatorServiceImpl    (starts server + registry)
3. In terminal 2: java CalculatorClient         (runs client)

SAMPLE OUTPUT (Client):
Connected to CalculatorService on server.
15.5 + 24.5 = 40.0
100 - 37.5 = 62.5
6 × 7 = 42.0
99 ÷ 3 = 33.0
*/`]
          }
        ]
      }
    ]
  }
];

const COLORS = {
  bg: "#F8F9FA",
  surface: "#FFFFFF",
  border: "#E2E8F0",
  code_bg: "#F1F5F9",
  code_border: "#CBD5E1",
  text: "#1E293B",
  muted: "#64748B",
  definition_bg: "#EFF6FF",
  definition_border: "#3B82F6",
  analogy_bg: "#FFF7ED",
  analogy_border: "#F97316",
  tip_bg: "#F0FDF4",
  tip_border: "#22C55E",
  warning_bg: "#FFF1F2",
  warning_border: "#F43F5E",
  diagram_bg: "#1E293B",
  heading: "#1E293B",
};

function CodeBlock({ label, lines }) {
  const [copied, setCopied] = useState(false);
  const allCode = lines.join("\n\n");

  const handleCopy = () => {
    navigator.clipboard?.writeText(allCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
      return <p style={{ color: COLORS.text, fontSize: 14.5, lineHeight: 1.75, margin: "8px 0" }}>{item.text}</p>;
    case "heading":
      return <h4 style={{ color: COLORS.heading, fontSize: 15, fontWeight: 700, margin: "18px 0 8px", paddingBottom: 5, borderBottom: `2px solid ${COLORS.border}` }}>{item.text}</h4>;
    case "definition":
      return (
        <div style={{ background: COLORS.definition_bg, border: `1px solid ${COLORS.definition_border}`, borderLeft: `4px solid ${COLORS.definition_border}`, borderRadius: 7, padding: "12px 16px", margin: "10px 0" }}>
          <p style={{ margin: 0, color: "#1D4ED8", fontSize: 14, lineHeight: 1.7 }}>{item.text}</p>
        </div>
      );
    case "analogy":
      return (
        <div style={{ background: COLORS.analogy_bg, border: `1px solid ${COLORS.analogy_border}`, borderLeft: `4px solid ${COLORS.analogy_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0" }}>
          <span style={{ color: COLORS.analogy_border, fontWeight: 700, fontSize: 12 }}>🔍 ANALOGY &nbsp;</span>
          <span style={{ color: "#92400E", fontSize: 14, lineHeight: 1.7, fontStyle: "italic" }}>{item.text}</span>
        </div>
      );
    case "tip":
      return (
        <div style={{ background: COLORS.tip_bg, border: `1px solid ${COLORS.tip_border}`, borderLeft: `4px solid ${COLORS.tip_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0", display: "flex", gap: 10 }}>
          <span style={{ color: "#16A34A", fontWeight: 800, fontSize: 12, minWidth: 90 }}>💡 {item.label}</span>
          <span style={{ color: "#14532D", fontSize: 14, lineHeight: 1.7 }}>{item.text}</span>
        </div>
      );
    case "warning":
      return (
        <div style={{ background: COLORS.warning_bg, border: `1px solid ${COLORS.warning_border}`, borderLeft: `4px solid ${COLORS.warning_border}`, borderRadius: 7, padding: "10px 16px", margin: "10px 0" }}>
          <span style={{ color: COLORS.warning_border, fontWeight: 700, fontSize: 12 }}>⚠ WARNING &nbsp;</span>
          <span style={{ color: "#9F1239", fontSize: 14, lineHeight: 1.7 }}>{item.text}</span>
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
            <li key={i} style={{ color: COLORS.text, fontSize: 14.5, lineHeight: 1.75, marginBottom: 5 }} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          ))}
        </ul>
      );
    case "table":
      return (
        <div style={{ overflowX: "auto", margin: "12px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr>
                {item.headers.map((h, i) => (
                  <th key={i} style={{ background: "#1E293B", color: "#fff", padding: "9px 12px", textAlign: "left", fontWeight: 700, borderBottom: "2px solid #334155" }}>{h}</th>
                ))}
              </tr>
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
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      {/* Header */}
      <div style={{ background: "#1E293B", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>
            Network Programming
          </h1>
        </div>
      </div>

      {/* Unit Tabs */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${COLORS.border}`, overflowX: "auto" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 0 }}>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => setActiveUnit(u.id)}
              style={{
                padding: "14px 18px", border: "none", background: "none", cursor: "pointer",
                fontSize: 13, fontFamily: "sans-serif", fontWeight: activeUnit === u.id ? 700 : 500,
                color: activeUnit === u.id ? u.color : COLORS.muted,
                borderBottom: activeUnit === u.id ? `3px solid ${u.color}` : "3px solid transparent",
                whiteSpace: "nowrap", transition: "all 0.15s"
              }}>
              {u.title.split("—")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px 60px" }}>
        {/* Unit Header */}
        <div style={{ background: unit.color, borderRadius: 12, padding: "20px 28px", marginBottom: 28 }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 22, fontWeight: 700 }}>{unit.title}</h2>
          <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontFamily: "sans-serif" }}>{unit.badge}</span>
        </div>

        {/* Sections */}
        {unit.sections.map((sec, si) => {
          const key = `${unit.id}-${si}`;
          const open = openSections[key] !== false;
          return (
            <div key={key} style={{ background: COLORS.surface, borderRadius: 10, border: `1px solid ${COLORS.border}`, marginBottom: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <button onClick={() => toggleSection(key)}
                style={{ width: "100%", background: open ? "#F8FAFC" : "#fff", border: "none", padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "background 0.15s" }}>
                <span style={{ background: unit.color, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, minWidth: 70, textAlign: "center" }}>{sec.qnum}</span>
                <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, flex: 1, fontFamily: "sans-serif" }}>{sec.qtitle}</span>
                <span style={{ color: COLORS.muted, fontSize: 20, transition: "transform 0.2s", transform: open ? "rotate(0)" : "rotate(-90deg)" }}>▾</span>
              </button>

              {open && (
                <div style={{ padding: "4px 24px 24px" }}>
                  {sec.content.map((item, ci) => (
                    <ContentBlock key={ci} item={item} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
