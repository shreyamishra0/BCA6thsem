import { useState } from "react";

const UNITS = [
  {
    id:"u1", title:"Unit 1 — Introduction to Distributed Systems", badge:"Chapter 1 · 4 hrs", color:"#1565C0",
    sections:[
      {
        qnum:"Q1", qtitle:"What is a Distributed System? Definition & Characteristics",
        content:[
          {type:"definition", text:"Distributed System: A collection of autonomous computing elements (nodes/computers) linked by a computer network and equipped with distributed system software, that appears to its users as a single coherent system. These nodes work together, communicate over a network, and coordinate their activities to achieve a common goal by sharing resources, data, and tasks."},
          {type:"heading", text:"Characteristics of a Distributed System"},
          {type:"table", headers:["Characteristic","Description","Real-World Example"],
            rows:[
              ["Collection of Autonomous Elements","Multiple independent components that can be decomposed further","Web servers + DB servers + client machines"],
              ["Single Coherent System","Appears as one system regardless of where/when users interact","Google Search feels like one system despite thousands of servers"],
              ["Resource Sharing","Multiple users share hardware, software, and data resources","File servers, printers, shared databases"],
              ["Concurrency","Multiple processes run simultaneously","Multiple users hitting the same database at once"],
              ["Scalability","Handles increased workload by adding more resources","Amazon adding servers during peak sales events"],
              ["Fault Tolerance","Recovers from component failures without service interruption","Netflix continues streaming if one server crashes"],
              ["Transparency","Hides the complexity of distribution from users","Users never know which of 1000 servers handled their request"],
              ["Openness","Extended/modified via standard protocols","Adding new nodes without changing existing code"],
              ["Heterogeneity","Components differ in hardware, OS, or programming languages","Windows and Linux servers working seamlessly together"],
            ]
          },
          {type:"heading", text:"Types of Transparency"},
          {type:"table", headers:["Type","What it hides"],
            rows:[
              ["Access Transparency","How resources are accessed (same interface locally and remotely)"],
              ["Location Transparency","Physical location of resources"],
              ["Replication Transparency","Whether multiple copies exist"],
              ["Concurrency Transparency","That others are simultaneously using the resource"],
              ["Failure Transparency","That a failure occurred and was recovered from"],
            ]
          },
        ]
      },
      {
        qnum:"Q2", qtitle:"Types of DS, Advantages & Disadvantages | Centralized vs DS",
        content:[
          {type:"table", headers:["Type","Description","Examples"],
            rows:[
              ["Distributed Computing Systems","Parallel processing; cluster & grid computing","Beowulf clusters, Apache Hadoop, SETI@home"],
              ["Distributed Information Systems","Large-scale data storage & retrieval; OLTP","Banking systems, DBMS"],
              ["Distributed Pervasive Systems","IoT; small, battery-powered, mobile devices","Smart homes, wearables, sensor networks"],
              ["Real-Time DS","Strict time constraints; must respond instantly","Air traffic control, online games, live broadcasting"],
              ["Peer-to-Peer Systems","Decentralized; all nodes = client + server","BitTorrent, Blockchain"],
            ]
          },
          {type:"heading", text:"Centralized System vs Distributed System"},
          {type:"table", headers:["Centralized System","Distributed System"],
            rows:[
              ["One component with non-autonomous parts","Multiple autonomous components"],
              ["All resources always accessible","Resources may not always be accessible"],
              ["Software runs in a single process","Software runs in concurrent processes on different processors"],
              ["Single point of control","Multiple points of control"],
              ["Single point of failure","Multiple points of failure — partial failure only"],
            ]
          },
          {type:"heading", text:"Advantages vs Disadvantages"},
          {type:"table", headers:["Advantages","Disadvantages"],
            rows:[
              ["Unlimited scaling — add machines when required","Data integration & consistency is complex"],
              ["Low latency — machines closer to users","Network & communication failure is harder to handle"],
              ["Fault tolerance — one server down, others continue","Management overhead — monitoring, logging, load balancing"],
              ["Data sharing via common database","Processing overhead — coordination between nodes"],
              ["Better price/performance ratio","Difficult to implement due to all of the above"],
            ]
          },
        ]
      },
    ]
  },
  {
    id:"u2", title:"Unit 2 — Architecture", badge:"Chapter 2 · 5 hrs", color:"#2E7D32",
    sections:[
      {
        qnum:"Q1", qtitle:"Architectural Styles — Layered, Object, Data-Centered, Event-Based",
        content:[
          {type:"definition", text:"Architectural Style: A high-level design pattern for organizing components in a distributed system. It defines how components are arranged and how they interact. The choice depends on scalability, reliability, and the nature of the application."},
          {type:"heading", text:"1. Layered Architecture"},
          {type:"definition", text:"Components organized into layers. Each layer provides services to the layer above and consumes services from the layer below. Requests flow DOWN; responses flow UP. Each layer can be modified independently without affecting others."},
          {type:"diagram", text:`
  ┌─────────────────────────────────┐
  │  Presentation Layer (UI)        │  ← User interaction
  ├─────────────────────────────────┤
  │  Application / Business Layer   │  ← Business logic
  ├─────────────────────────────────┤
  │  Middleware / Persistence Layer │  ← Data exchange & coordination
  ├─────────────────────────────────┤
  │  Data Access / Database Layer   │  ← Storage & retrieval
  └─────────────────────────────────┘
  Example: OSI Network Model, MVC Web Apps`},
          {type:"heading", text:"2. Object-Based Architecture"},
          {type:"definition", text:"Each component is an object. Objects communicate through procedure calls. Same machine → method call; over network → Remote Procedure Call (RPC). No strict sequence like layers. Each object encapsulates data (state) and exposes interfaces."},
          {type:"bullets", items:["Examples: Java RMI, Web Services, REST API Calls","Objects interact through interfaces (connectors)"]},
          {type:"heading", text:"3. Data-Centered Architecture"},
          {type:"definition", text:"Works on a central data repository (active or passive). All communication happens THROUGH a central data store. Like producer-consumer: producers write to the store, consumers read from it."},
          {type:"bullets", items:["Example: Network File System (NFS), shared web-based data services","Ensures consistency — one central place for all data"]},
          {type:"heading", text:"4. Event-Based (Event-Driven) Architecture"},
          {type:"definition", text:"Flow of data and control is driven by events. Uses Publish/Subscribe model — event producers generate events; only subscribed processes receive them. Communication is asynchronous and loosely coupled. Components don't need to know each other."},
          {type:"bullets", items:["Example: IoT systems where sensors send data to processing nodes","Advantages: High responsiveness, scalability, flexibility"]},
          {type:"heading", text:"Quick Comparison"},
          {type:"table", headers:["Style","Communication","Coupling","Example"],
            rows:[
              ["Layered","Layer-to-layer","Tight within layers","OSI model, web apps (MVC)"],
              ["Object-Based","Method calls / RPC","Moderate","Java RMI, REST APIs"],
              ["Data-Centered","Through shared data store","Loose","NFS, distributed databases"],
              ["Event-Based","Publish/Subscribe events","Very loose (async)","Kafka, IoT sensors"],
            ]
          },
        ]
      },
      {
        qnum:"Q2", qtitle:"Middleware — Definition, Types & Role in DS",
        content:[
          {type:"definition", text:"Middleware: A software layer that sits between the operating system and distributed applications. It provides common services and communication functions that make the distributed system appear as a single, unified environment. Acts as a bridge between apps and underlying networks, hiding complexity."},
          {type:"diagram", text:`
  ┌───────────────────────────────────────┐
  │         Distributed Applications       │
  ├───────────────────────────────────────┤
  │              MIDDLEWARE                │  ← Lives here
  │  (Handles communication, naming,      │
  │   security, transactions, etc.)       │
  ├───────────────────────────────────────┤
  │  OS + Hardware (on each separate node)│
  └───────────────────────────────────────┘`},
          {type:"heading", text:"Types of Middleware"},
          {type:"table", headers:["Type","Purpose","Example"],
            rows:[
              ["Message-Oriented (MOM)","Communication via message queues — asynchronous","RabbitMQ, Apache Kafka"],
              ["Remote Procedure Call (RPC)","Invoke functions on remote machines as if local","gRPC, Java RMI"],
              ["Database Middleware","Unified interface for distributed databases","ODBC, JDBC"],
              ["Object Middleware","Manages interactions between distributed objects","CORBA, Java RMI"],
              ["Service Middleware","Service discovery, orchestration, containers","Docker Swarm, Kubernetes"],
            ]
          },
          {type:"heading", text:"Role / Purpose of Middleware"},
          {type:"bullets", items:[
            "**Transparency** — Makes DS appear as one unified system (location, replication, failure transparency)",
            "**Interoperability** — Enables communication between heterogeneous platforms",
            "**Scalability** — Supports growth without major redesign",
            "**Security & Reliability** — Centralized control for authentication and encryption",
            "**Simplified Development** — Developers focus on business logic, not low-level networking",
          ]},
          {type:"tip", label:"KEY POINT", text:"Middleware is the 'glue' of a distributed system. Without it, each application would have to implement its own communication, naming, and security from scratch. Middleware reuses these solutions across all apps."},
        ]
      },
      {
        qnum:"Q3", qtitle:"Client-Server vs P2P | Hybrid Architecture",
        content:[
          {type:"heading", text:"Client-Server Architecture (Centralized)"},
          {type:"definition", text:"A centralized model where clients request services and servers provide them. The server manages resources; clients access them through a network. A client sends a request and waits for the server's reply."},
          {type:"table", headers:["Advantages","Disadvantages"],
            rows:[
              ["Easy to secure due to central control","Server = single point of failure"],
              ["Centralized data management and backup","Performance depends on server capacity"],
              ["Clear separation of responsibilities","High cost for server setup and maintenance"],
              ["Easier administration","Limited scalability — server bottleneck as clients grow"],
            ]
          },
          {type:"heading", text:"Peer-to-Peer (P2P) Architecture (Decentralized)"},
          {type:"definition", text:"All nodes (peers) are equal — each acts as both client AND server. No central control. Every node makes its own decisions. The final behavior is the aggregate of all individual node decisions."},
          {type:"table", headers:["Advantages","Disadvantages"],
            rows:[
              ["No expensive dedicated server needed","Each computer accessed by others → can slow performance"],
              ["If one node fails, others continue","Files cannot be centrally backed up or organized"],
              ["Easier to set up than client-server","Hard to locate resources without logical filing"],
              ["Highly scalable as peers increase","Security is each individual's responsibility"],
            ]
          },
          {type:"heading", text:"Client-Server vs P2P — Full Comparison"},
          {type:"table", headers:["Feature","Client-Server","P2P"],
            rows:[
              ["Control","Centralized — server manages all","Decentralized — all nodes equal"],
              ["Resource Sharing","Only through server","Directly between any peers"],
              ["Scalability","Limited — server bottleneck","High — load distributed across all peers"],
              ["Reliability","Server failure = entire service down","Few peer failures; network continues"],
              ["Cost","High — dedicated servers needed","Low — no dedicated server required"],
              ["Security","Easier to secure (central control)","Harder (distributed trust issues)"],
              ["Examples","Web servers, email, FTP, databases","BitTorrent, blockchain, Skype (original)"],
            ]
          },
          {type:"heading", text:"Hybrid Architecture"},
          {type:"definition", text:"Combines centralized and decentralized approaches. Balances control with scalability. Example: BitTorrent uses a centralized tracker to initiate connections, then switches to P2P for data transfer. Cloud computing uses centralized management with decentralized execution."},
        ]
      },
    ]
  },
  {
    id:"u3", title:"Unit 3 — Processes", badge:"Chapter 3 · 4 hrs", color:"#6A1B9A",
    sections:[
      {
        qnum:"Q1", qtitle:"Process vs Thread — Differences & Multithreading in DS",
        content:[
          {type:"definition", text:"Process: An independent program in execution running in its own memory space. Each process has its own memory map, program counter, and resources. Failure of one process usually doesn't crash others."},
          {type:"definition", text:"Thread: The smallest execution unit within a process. Threads share the same memory space and resources of their parent process but execute different parts concurrently. Multiple threads can exist within one process."},
          {type:"table", headers:["Feature","Process","Thread"],
            rows:[
              ["Memory Space","Own separate memory space","Shares memory space of parent process"],
              ["Creation Cost","Heavy — more resources to allocate","Lightweight — minimal resource allocation"],
              ["Communication","Complex (IPC — Inter-Process Communication required)","Easy — through shared memory variables"],
              ["Crash Impact","One crash doesn't affect other processes","One crash can affect all threads in same process"],
              ["Switching Speed","Slower (expensive context switch with OS involvement)","Faster (minimal context switch, no OS interaction)"],
              ["OS Interaction","Switching requires OS interaction","Switching does NOT require OS interaction"],
              ["Use Case","Distributed components (web server, DB server)","Concurrent tasks (handling multiple client requests)"],
              ["Example","Apache web server process on one node","Each client request handled by a different thread"],
            ]
          },
          {type:"heading", text:"Architecture of Multi-Threaded Servers"},
          {type:"table", headers:["Server Model","Description","Use Case"],
            rows:[
              ["Iterative Server","Handles ONE request at a time","Simple but limited — small systems"],
              ["Concurrent (Thread-per-Request)","Spawns a new thread for each incoming client","Web servers, chat apps"],
              ["Thread Pool","Pre-creates fixed pool of threads; requests assigned from pool","High-performance servers (better than spawning each time)"],
              ["Event-Driven","Asynchronous I/O — one thread handles many requests via events","Node.js style servers — very high concurrency"],
            ]
          },
          {type:"tip", label:"EXAM TIP", text:"Key difference: Thread = lightweight (shares memory, faster). Process = heavyweight (separate memory, isolated). In DS, multithreading is essential — a web server creates a new thread per client request without creating a new process each time."},
        ]
      },
      {
        qnum:"Q2", qtitle:"Virtualization — Types, Role & Examples",
        content:[
          {type:"definition", text:"Virtualization: The process of creating a virtual (rather than physical) version of computing resources (servers, OS, storage, or networks) so that multiple VMs can run independently on a single physical system. It separates the logical view of resources from their physical implementation."},
          {type:"table", headers:["Type","Description","Example"],
            rows:[
              ["Hardware/Full Virtualization","Creates complete virtual machines with their own virtual hardware; guest OS runs unmodified","VMware, VirtualBox, Microsoft Hyper-V"],
              ["Para-Virtualization","Guest OS is modified to work with hypervisor; better performance","Xen Hypervisor"],
              ["OS-Level (Containers)","Multiple isolated user-space instances on same kernel — lightweight","Docker containers, LXC"],
              ["Network Virtualization","Abstracts physical network → creates virtual networks","Software-Defined Networking (SDN), VLAN, VPN"],
              ["Storage Virtualization","Pools physical storage → creates logical storage units","SAN, NAS, RAID"],
            ]
          },
          {type:"heading", text:"Role of Virtualization in DS"},
          {type:"bullets", items:[
            "**Resource Sharing** — Multiple VMs share one physical machine → maximizes hardware utilization",
            "**Isolation** — Each VM operates independently; failure in one doesn't affect others",
            "**Scalability** — New VMs can be created on-demand (foundation of cloud computing)",
            "**Fault Tolerance** — Faulty VMs migrated or restarted on another physical host automatically",
            "**Load Balancing** — Workloads distributed dynamically across VMs",
            "**Portability** — Virtual environments moved across physical machines",
          ]},
        ]
      },
      {
        qnum:"Q3", qtitle:"Stateful vs Stateless Servers",
        content:[
          {type:"table", headers:["Feature","Stateful Server","Stateless Server"],
            rows:[
              ["Definition","Maintains client session state between requests","Does NOT maintain any state between requests"],
              ["Memory of past","Remembers previous interactions with each client","Treats each request as completely independent"],
              ["Performance","Faster for repeated operations (data cached)","Must re-establish context every request"],
              ["Scalability","Harder — state must be shared or migrated across servers","Easy — any server can handle any request"],
              ["Fault Tolerance","Harder — if server crashes, session state is lost","Easy — no state to lose; client simply resends request"],
              ["Complexity","More complex (session management needed)","Simpler to implement"],
              ["Examples","FTP sessions, online gaming, shopping carts","HTTP/REST APIs, DNS, stateless web services"],
            ]
          },
          {type:"analogy", text:"A stateful server is like a waiter who remembers your order from last visit — efficient, but if that waiter is sick (fails), a new waiter knows nothing about you. A stateless server is like a vending machine — it treats every transaction as brand new, has no memory of you, but any vending machine in the building works exactly the same way."},
          {type:"tip", label:"EXAM TIP", text:"Key reason stateless is preferred in scalable systems: any server can handle any request without coordination. Stateful servers require session affinity (routing to the SAME server every time), which limits scalability."},
        ]
      },
      {
        qnum:"Q4", qtitle:"Code Migration — Models & Types",
        content:[
          {type:"definition", text:"Code Migration: Moving executable code (a running program or part of it) from one machine to another in a DS for execution. Enhances load balancing, flexibility, and resource utilization — moves computation to where data is (instead of moving data to computation)."},
          {type:"heading", text:"Main Goals"},
          {type:"bullets", items:[
            "**Load Balancing** — Redistribute tasks to avoid overloading a single machine",
            "**Data Locality** — Move computation close to data to reduce network latency",
            "**Fault Tolerance** — Restart or relocate computation if a node fails",
            "**Resource Utilization** — Use idle resources on remote nodes",
          ]},
          {type:"heading", text:"Code Migration Models (What is Moved)"},
          {type:"diagram", text:`
  A process = 3 segments:
  ┌──────────────────┐
  │   Code Segment   │ ← Program instructions (the logic)
  ├──────────────────┤
  │ Resource Segment │ ← Data, variables, input parameters
  ├──────────────────┤
  │Execution Segment │ ← Stack, program counter, current state
  └──────────────────┘

  Model 1: Code Only → Only instructions sent. Example: Java applet sent to browser.
  Model 2: Code + Resources → Code and data move together. Example: Mobile agent.
  Model 3: Code + Resources + State → Full process move; resumes from exact point.`},
          {type:"heading", text:"Weak vs Strong Mobility"},
          {type:"table", headers:["Type","What Moves","Execution","Example"],
            rows:[
              ["Weak Mobility","Code only (optional data)","Restarts from beginning on new machine","Java RMI, applets"],
              ["Strong Mobility","Code + execution state","Continues from last instruction — no restart","Process migration in Distributed OS"],
            ]
          },
        ]
      },
    ]
  },
  {
    id:"u4", title:"Unit 4 — Communication", badge:"Chapter 4 · 6 hrs", color:"#B71C1C",
    sections:[
      {
        qnum:"Q1", qtitle:"OSI Reference Model — All 7 Layers",
        content:[
          {type:"definition", text:"OSI (Open Systems Interconnection) Model: A 7-layer framework standardizing how computers communicate over a network. In distributed systems, all communication is based on message passing since there is no shared memory."},
          {type:"diagram", text:`
  ┌───────────────────────────────────────────────────────┐
  │ 7. Application Layer  │ FTP, HTTP, SSH, SMTP, DNS     │
  ├───────────────────────────────────────────────────────┤
  │ 6. Presentation Layer │ Encryption, Compression,      │
  │                       │ Data formatting (SSL, ASCII)  │
  ├───────────────────────────────────────────────────────┤
  │ 5. Session Layer      │ Session mgmt, Authentication  │
  ├───────────────────────────────────────────────────────┤
  │ 4. Transport Layer    │ TCP/UDP, Segmentation,        │
  │                       │ Multiplexing, Error Control   │
  ├───────────────────────────────────────────────────────┤
  │ 3. Network Layer      │ IP Routing, Packet forwarding │
  ├───────────────────────────────────────────────────────┤
  │ 2. Data Link Layer    │ Frames, MAC addresses, CRC    │
  ├───────────────────────────────────────────────────────┤
  │ 1. Physical Layer     │ Bits, cables, voltages, NIC   │
  └───────────────────────────────────────────────────────┘
  Mnemonic: "All People Seem To Need Data Processing"`},
        ]
      },
      {
        qnum:"Q2", qtitle:"Remote Procedure Call (RPC) — Process, Diagram, Adv/Disadv",
        content:[
          {type:"definition", text:"Remote Procedure Call (RPC): A communication mechanism that allows a program to execute a procedure (function) on a remote machine AS IF it were a local call. It completely hides the complexity of network communication. The client invokes a function — the RPC framework handles marshalling, transmission, and response transparently."},
          {type:"diagram", text:`
  CLIENT MACHINE                          SERVER MACHINE
  ────────────────────                    ────────────────────
  1. Client calls: add(5, 3)
         │
  2. Client Stub intercepts
     Marshals params → message
         │
  3. Sends message over network ────────→ 4. Server Stub receives
                                              Unmarshals message → params
                                                      │
                                          5. Actual function executes
                                             add(5, 3) → result = 8
                                                      │
  8. Client gets result = 8  ←──────────── 6. Result marshalled
                                          7. Sent back over network

  KEY TERMS:
  ► Marshalling   = Serialize parameters into network-transmittable format
  ► Unmarshalling = Deserialize received data back into usable parameters
  ► Client Stub   = Proxy on client side that hides all networking details
  ► Server Stub   = Proxy on server side that receives & dispatches calls`},
          {type:"heading", text:"Types of RPC"},
          {type:"table", headers:["Type","Behavior","When to Use"],
            rows:[
              ["Synchronous RPC","Client BLOCKS and waits for server response before continuing","When immediate response is required"],
              ["Asynchronous RPC","Client sends request and CONTINUES without waiting for reply","When concurrent tasks can proceed independently"],
            ]
          },
          {type:"heading", text:"Advantages & Disadvantages of RPC"},
          {type:"table", headers:["Advantages","Disadvantages"],
            rows:[
              ["Hides internal network communication from programmer","Network latency introduces delays not present in local calls"],
              ["Makes distributed programming look like single-node code","Server or network failures are hard to handle gracefully"],
              ["Can be used in both distributed and local environments","Different RPC implementations are incompatible (no standard)"],
              ["Omits many protocol layers → improves performance","Hard to maintain session consistency across calls"],
            ]
          },
        ]
      },
      {
        qnum:"Q3", qtitle:"Message-Oriented Communication — Transient & Persistent, MPI",
        content:[
          {type:"definition", text:"Message-Oriented Communication (MOC): Processes exchange discrete messages rather than direct procedure calls. Unlike RPC, MOC does not require both parties to be active simultaneously. Supports asynchronous communication through a store-and-forward mechanism."},
          {type:"heading", text:"Why MOC is Needed"},
          {type:"bullets", items:[
            "RPC assumes both sender and receiver are active and connected — not always true in DS",
            "Networks can be unreliable; need store-and-forward guarantees",
            "MOC supports asynchronous communication — sender continues without waiting",
          ]},
          {type:"heading", text:"6 Types of Message-Oriented Communication"},
          {type:"table", headers:["Type","Description","Example"],
            rows:[
              ["Persistent Asynchronous","Message stored by middleware; sender continues immediately; receiver retrieves later; NEITHER needs to be running at same time","Email — sender sends, receiver reads hours later"],
              ["Persistent Synchronous","Message stored; sender BLOCKS until middleware confirms receipt (not execution)","Chat app with 'delivered' receipt"],
              ["Transient Asynchronous","Message NOT stored; sender continues; message DISCARDED if receiver is down","UDP communication"],
              ["Receipt-based Transient Sync","Sender blocked until message received at other end; ACK = message arrived","Socket acknowledgement (TCP)"],
              ["Delivery-based Transient Sync","Sender unblocked when receiver TAKES the delivery (Asynchronous RPC)","Async RPC calls"],
              ["Response-based Transient Sync","Sender blocked until message PROCESSED and response returned (classic RPC)","Traditional RPC — client waits for full reply"],
            ]
          },
          {type:"analogy", text:"A message queue (persistent MOC) is like a post office. You drop off a letter (send message), it's stored safely. The recipient picks it up even if they weren't home when you sent it. Neither party needs to be present at the same time — this is exactly what makes persistent MOC powerful in unreliable networks."},
          {type:"heading", text:"Message Passing Interface (MPI) — MPI Functions Mapped to MOC Types"},
          {type:"table", headers:["MPI Function","MOC Type","Description"],
            rows:[
              ["MPI_bsend","Transient Asynchronous","Appends to local buffer and continues immediately"],
              ["MPI_send","Delivery-based Transient Sync","Waits until message is copied to remote buffer"],
              ["MPI_ssend","Receipt-based Transient Sync","Waits until receiver starts accepting message"],
              ["MPI_sendrecv","Response-based Transient Sync","Waits for reply — equivalent to synchronous RPC"],
              ["MPI_Bcast","Collective","Broadcasts to all group members simultaneously"],
            ]
          },
          {type:"heading", text:"Java RMI vs MPI"},
          {type:"table", headers:["Feature","Java RMI","MPI"],
            rows:[
              ["Abstraction","Method invocation (OOP style)","Message exchange (low-level)"],
              ["Ease of Use","High (Java objects)","Medium (explicit send/receive)"],
              ["Scalability","Moderate (enterprise apps)","High (HPC scientific systems)"],
              ["Use Case","Distributed enterprise apps","Scientific parallel computing, simulations"],
            ]
          },
        ]
      },
      {
        qnum:"Q4", qtitle:"Group Communication & Multicast",
        content:[
          {type:"definition", text:"Group Communication: When one source process communicates with multiple processes at once. Modes: Unicast (one-to-one), Broadcast (one-to-all), Multicast (one-to-many selected group)."},
          {type:"table", headers:["Mode","Description","Use Case"],
            rows:[
              ["Unicast","One sender → one specific receiver","Direct client-server communication"],
              ["Broadcast","One sender → ALL processes in system","ARP requests, network discovery"],
              ["Multicast","One sender → a GROUP of interested receivers","Video streaming, stock feeds, replica updates"],
            ]
          },
          {type:"bullets", items:[
            "**Multicast advantages**: Efficient (one message, many receivers), Scalable, Reduces server load",
            "**Multicast challenges**: Ordering, reliability, group management, network congestion",
            "**Application-Level Multicast**: Handled by application layer (P2P systems like BitTorrent)",
            "**Network-Level Multicast**: Handled by routers using IP Multicast",
          ]},
        ]
      },
    ]
  },
  {
    id:"u5", title:"Unit 5 — Naming", badge:"Chapter 5 · 4 hrs", color:"#00695C",
    sections:[
      {
        qnum:"Q1", qtitle:"Names, Identifiers & Addresses — Differences & Relationship",
        content:[
          {type:"table", headers:["Concept","Definition","Key Property","Example"],
            rows:[
              ["Name","Human-readable label to refer to an entity","May change; not necessarily unique; needs resolution","/usr/home/file.pdf, www.google.com"],
              ["Identifier","Unique, permanent bit-string reference to an entity","Unique, persistent, non-reusable after deletion","Student Roll No., MAC address, UUID, inode number"],
              ["Address","Physical or network location of the entity","Not stable — changes when entity moves or reconfigures","IP: 192.168.1.1, memory address, URL"],
            ]
          },
          {type:"diagram", text:`
  Relationship: Name → Identifier → Address

  User types:  www.google.com         (Human-readable NAME)
                     │
                     ↓  Name Resolution (DNS lookup)
  DNS Record:  Google's DNS record    (IDENTIFIER — maps to this domain)
                     │
                     ↓  Address Resolution
  IP Address:  142.250.64.14          (ADDRESS — where to connect)
                     │
                     ↓  TCP Connection
  Browser connects to Google's server`},
          {type:"tip", label:"KEY DIFFERENCE", text:"An IDENTIFIER is permanent and globally unique — it never changes even if the entity moves. An ADDRESS can change (your laptop's IP changes when you move networks). A NAME is human-readable but may not be unique (two files can have same name in different folders)."},
          {type:"heading", text:"Requirements of a Good Naming System"},
          {type:"bullets", items:[
            "**Resource Identification** — Unique way to identify each resource precisely",
            "**Scalability** — Efficiently manages growing number of resources",
            "**Fault Tolerance** — Provides backup/alternative paths for reliability",
            "**Security** — Verifies authenticity and integrity of resource identifiers",
            "**User-Friendly** — Intuitive names improve user interaction",
            "**Efficiency** — Reduces lookup latency for better performance",
          ]},
        ]
      },
      {
        qnum:"Q2", qtitle:"Structured Naming — DNS Architecture & How It Works",
        content:[
          {type:"definition", text:"Structured Naming (DNS): Names organized in a hierarchical tree. DNS (Domain Name System) translates domain names (www.google.com) to IP addresses (142.250.180.78). Called the 'phonebook of the internet.' A distributed database — no single server has all records."},
          {type:"diagram", text:`
  DNS Hierarchy:
                  ● (Root ".")
                 /  |  |  \\
              .com .org .edu .np     (Top-Level Domains)
               /           |
            google       ioe.edu.np   (Second-Level)
              |
          www.google.com              (Hostname)

  DNS Components:
  1. Root Servers (13 logical)  — know all TLD server locations
  2. TLD Servers (.com, .np)    — know authoritative servers
  3. Authoritative Servers      — hold actual DNS records for a domain
  4. Local DNS Resolver         — first contact point (provided by ISP)
  5. DNS Cache                  — stores recent lookups for speed`},
          {type:"heading", text:"How DNS Works — Step by Step"},
          {type:"bullets", items:[
            "**Step 1**: User types www.example.com → Browser checks LOCAL DNS cache",
            "**Step 2**: If not cached → query sent to ISP's DNS Resolver",
            "**Step 3**: Resolver asks Root Server → 'Where is .com TLD server?'",
            "**Step 4**: Resolver asks TLD Server → 'Where is example.com's authoritative server?'",
            "**Step 5**: Resolver asks Authoritative Server → returns actual IP address",
            "**Step 6**: Result cached locally → Browser connects using the IP address",
          ]},
          {type:"heading", text:"DNS vs GNS (Global Name Service)"},
          {type:"table", headers:["Feature","DNS","GNS"],
            rows:[
              ["Primary Purpose","Internet domain resolution","General distributed systems naming"],
              ["Dynamic Binding","Limited (static entries, TTL-based)","Supported — handles frequent entity moves"],
              ["Scalability","High","High"],
              ["Fault Tolerance","Replication supported","Replication supported"],
              ["Use Case","Web/internet addressing","Large distributed systems, mobile entities"],
            ]
          },
        ]
      },
      {
        qnum:"Q3", qtitle:"Flat Naming & Attribute-Based Naming",
        content:[
          {type:"heading", text:"Flat Naming"},
          {type:"definition", text:"Flat naming uses unique identifiers with NO hierarchical structure. Identifiers are typically long to ensure global uniqueness. Provides simplicity and flexibility; suitable for decentralized environments. Examples: UUIDs (128-bit Universally Unique Identifiers), content hashes in CDNs."},
          {type:"heading", text:"Attribute-Based Naming"},
          {type:"definition", text:"Instead of using a fixed name to locate a resource, resources are described by a collection of attribute (key-value) pairs. A lookup returns ALL entities matching the given attributes. Also called Directory Services or LDAP-style naming."},
          {type:"table", headers:["Aspect","Structured (DNS)","Attribute-Based (LDAP)"],
            rows:[
              ["How to locate","Know the exact name (www.server.com)","Describe what you want (type=printer, color=yes, floor=2)"],
              ["Result","Returns ONE specific entity","Returns ALL entities matching the attributes"],
              ["Example","DNS: google.com → IP","LDAP: find all employees with role=admin, dept=IT"],
              ["System","DNS, file systems","LDAP, X.500, Active Directory"],
            ]
          },
          {type:"analogy", text:"Attribute-based naming is like searching for a hotel on Booking.com — you specify: city=Paris, stars=4+, pool=yes, wifi=yes. The system returns all matching hotels. You don't need to know any hotel's exact name first. This is exactly attribute-based naming — search by what you want, not what it's called."},
        ]
      },
    ]
  },
  {
    id:"u6", title:"Unit 6 — Coordination", badge:"Chapter 6 · 7 hrs", color:"#E65100",
    sections:[
      {
        qnum:"Q1", qtitle:"Clock Synchronization — Cristian's, Berkeley & NTP",
        content:[
          {type:"definition", text:"Clock Synchronization: Techniques ensuring all machines in a DS maintain clocks that are either exactly identical (strong sync) or within an acceptable error bound (weak sync). Needed because physical clocks drift and don't stay consistent without correction."},
          {type:"heading", text:"Why Needed"},
          {type:"bullets", items:[
            "**Clock Drift** — Physical clocks run slightly faster/slower than real time",
            "**Causality of events** — Need to know 'which event happened first'",
            "**Distributed transactions** — Banking, reservations require correct time ordering",
            "**Debugging & logging** — System logs must reflect actual event times",
          ]},
          {type:"heading", text:"Cristian's Algorithm (Passive Server — Client Requests)"},
          {type:"definition", text:"One machine acts as a passive time server. Clients periodically request the current time. Client adjusts its clock using round-trip time to account for network delay."},
          {type:"diagram", text:`
  CLIENT                                TIME SERVER
    │                                        │
    │──── Request time ─────────────────────→│  (client records T₀)
    │                                        │
    │←─── Server time T_SERVER ──────────────│  (client records T₁)
    │
  Client sets its clock to:
  T_CLIENT = T_SERVER + (T₁ - T₀) / 2
  
  Where (T₁ - T₀) / 2 = estimated one-way network delay`},
          {type:"heading", text:"Berkeley Algorithm (Active Master — Master Polls Slaves)"},
          {type:"definition", text:"No external time source needed. A master node periodically POLLS all slave nodes, collects their clock times, calculates an AVERAGE, and sends adjustment commands to all nodes (not absolute time — adjustments)."},
          {type:"diagram", text:`
  MASTER (Time Daemon)
      │
      │──── Poll: "What's your time?" ──────→ Slave 1 (3:00:05)
      │                              ──────→ Slave 2 (3:00:02)
      │                              ──────→ Slave 3 (3:00:08)
      │ (Master's own time: 3:00:06)
      │
      │ Average = (3:00:05 + 3:00:02 + 3:00:08 + 3:00:06) / 4 = 3:00:05
      │
      │──── Send adjustments ────────────────→ Slave 1: +0s
      │                              ────────→ Slave 2: +3s
      │                              ────────→ Slave 3: -3s
      │  (Master itself adjusts by -1s)
  
  KEY: Sends ADJUSTMENTS, not absolute time → avoids large clock jumps`},
          {type:"heading", text:"Cristian's vs Berkeley — Quick Comparison"},
          {type:"table", headers:["Feature","Cristian's Algorithm","Berkeley Algorithm"],
            rows:[
              ["Server role","Passive — responds to requests only","Active — periodically POLLS all slaves"],
              ["External time source","YES — requires UTC/NTP reference","NO — no external reference needed"],
              ["Sync type","Client syncs to server time","ALL nodes sync to computed average"],
              ["Who initiates","Client sends request","Master/daemon initiates polling"],
              ["Best for","Small networks with known time server","Internal DS with no external time source"],
              ["Advantage","Simple, fast, low network traffic","No trusted external source needed; fault-tolerant"],
              ["Disadvantage","Requires trusted server; single point of failure","More complex; master becomes bottleneck"],
            ]
          },
        ]
      },
      {
        qnum:"Q2", qtitle:"Logical Clocks — Lamport's & Vector Clocks",
        content:[
          {type:"definition", text:"Logical Clocks: In DS, we often don't need the exact real time — we only need to know the ORDER in which events occurred. Logical clocks assign timestamps to events to establish consistent ordering, without requiring perfectly synchronized physical clocks."},
          {type:"heading", text:"Lamport's Logical Clock"},
          {type:"definition", text:"Assigns a single integer timestamp to each event. Based on the 'happens-before' relation (→): if event A causes event B (A → B), then timestamp(A) < timestamp(B). Synchronizes LOGICAL ordering, not real time."},
          {type:"diagram", text:`
  Happens-Before Rules (→):
  1. Within same process: if A before B → timestamp(A) < timestamp(B)
  2. Message passing: if A = send message, B = receive message → A → B
  3. Transitivity: if A → B and B → C, then A → C

  Clock Update Rules:
  • Local event: increment own clock by 1
  • Send message: attach current clock value to message
  • Receive message: set clock = max(local_clock, received_clock) + 1

  Process P1:  1    2    3              5
  Process P2:           2       3   4   5
                        │               ↑
                        └─── msg ───────┘
                  (P2 receives message at clock=2, P2 jumps to max(2,3)+1=4)`},
          {type:"heading", text:"Vector Clocks"},
          {type:"definition", text:"Extends Lamport's idea using a VECTOR of timestamps (one entry per process). Allows us to determine if two events are causally related OR truly concurrent — something Lamport clocks CANNOT do."},
          {type:"table", headers:["Feature","Lamport Clock","Vector Clock"],
            rows:[
              ["Timestamp","Single integer per event","Vector of integers — one counter per process"],
              ["Causality detection","Partial — if TS(a) < TS(b), maybe a→b, but not certain","Complete — can detect both causality AND concurrency"],
              ["Concurrent events?","Cannot detect true concurrency","YES — if neither V1 ≤ V2 nor V2 ≤ V1, they're concurrent"],
              ["Complexity","Simple","More complex but more powerful"],
            ]
          },
          {type:"tip", label:"KEY DIFFERENCE", text:"Lamport timestamps: if a → b then TS(a) < TS(b), but the converse is NOT guaranteed. Vector clocks: a → b if and only if V(a) < V(b). This means vector clocks give you COMPLETE causal information — Lamport clocks don't."},
        ]
      },
      {
        qnum:"Q3", qtitle:"Mutual Exclusion — 3 Algorithms with Comparison",
        content:[
          {type:"definition", text:"Mutual Exclusion: Ensures ONLY ONE process accesses a critical section (shared resource) at a time in a distributed system. Three distributed mutual exclusion algorithms are used."},
          {type:"heading", text:"1. Centralized Algorithm"},
          {type:"definition", text:"One process is elected as COORDINATOR. Any process wanting the critical section sends a REQUEST to the coordinator. If available, coordinator grants PERMISSION. Otherwise queues the request. When done, process sends RELEASE to coordinator."},
          {type:"table", headers:["Property","Value"],
            rows:[
              ["Messages per entry/exit","3 (request + grant + release)"],
              ["Delay before entry","2 message times"],
              ["Main Problem","Coordinator crash = single point of failure — entire system blocked"],
            ]
          },
          {type:"heading", text:"2. Distributed Algorithm (Ricart-Agrawala)"},
          {type:"definition", text:"No coordinator. A process wanting entry sends REQUEST(timestamp, process_ID) to ALL other processes. It may only enter AFTER receiving REPLY from ALL others. Uses timestamps to break ties."},
          {type:"bullets", items:[
            "Receiver sends **OK** immediately if it is NOT in CR and doesn't want to enter",
            "Receiver **QUEUES** request (no reply) if it is already IN the critical region",
            "If receiver ALSO wants to enter: **lowest timestamp WINS** (that one sends OK, other waits)",
          ]},
          {type:"table", headers:["Property","Value"],
            rows:[
              ["Messages per entry/exit","2(n-1) — (n-1) requests + (n-1) replies"],
              ["Delay before entry","2(n-1) message times"],
              ["Main Problem","Crash of ANY one process blocks ALL others — deadlock"],
            ]
          },
          {type:"heading", text:"3. Token Ring Algorithm"},
          {type:"definition", text:"Processes arranged in a LOGICAL RING. A unique TOKEN circulates continuously around the ring. Only the process HOLDING the token may enter the critical section. After exiting (or if not interested), passes token to successor."},
          {type:"table", headers:["Property","Value"],
            rows:[
              ["Messages per entry/exit","1 to ∞ (token continuously circulates)"],
              ["Delay before entry","0 to n-1 message times"],
              ["Main Problem","If token is lost (process with token crashes), must detect and regenerate token"],
            ]
          },
          {type:"heading", text:"Algorithm Comparison Table"},
          {type:"table", headers:["Algorithm","Messages per Entry/Exit","Delay","Main Problem"],
            rows:[
              ["Centralized","3","2 messages","Coordinator crash = total failure"],
              ["Distributed (Ricart-Agrawala)","2(n-1)","2(n-1) messages","Any process crash blocks all others"],
              ["Token Ring","1 to ∞","0 to n-1","Lost token or crashed ring member"],
            ]
          },
        ]
      },
      {
        qnum:"Q4", qtitle:"Election Algorithms — Bully & Ring",
        content:[
          {type:"definition", text:"Election Algorithm: Selects one process as coordinator/leader among distributed processes when no central authority exists. Triggered when the current coordinator FAILS. The process with the HIGHEST process ID wins."},
          {type:"heading", text:"1. Bully Algorithm"},
          {type:"diagram", text:`
  Processes: P1 P2 P3 P4 P5  (P5 = highest ID = coordinator, then CRASHES)
  
  Step 1: P2 detects P5 failure
  Step 2: P2 sends ELECTION message to ALL higher IDs (P3, P4, P5)
  Step 3: P3 and P4 respond "OK" to P2 → P2 drops out
  Step 4: P4 sends ELECTION to P5 → no response (crashed)
  Step 5: P4 wins → sends COORDINATOR message to ALL processes
  
  Rule: A higher-ID process can "bully" lower-ID processes into backing off.
  If NO higher process responds → you win.
  Message Complexity: O(n²) — can be high overhead`},
          {type:"heading", text:"2. Ring Algorithm"},
          {type:"diagram", text:`
  Ring: P1 → P2 → P3 → P4 → P5 → P1  (P5 crashes)
  
  Step 1: P2 detects P5 failure
  Step 2: P2 builds ELECTION(P2) message, sends to successor P3
  Step 3: Each process APPENDS its own ID and forwards:
          P3→P4: ELECTION(P2, P3)
          P4→P5: no response → P4 skips to P1: ELECTION(P2, P3, P4)
          P1→P2: ELECTION(P2, P3, P4, P1)
  Step 4: P2 receives message containing its OWN ID → election complete
          P2 selects HIGHEST ID in the list = P4 → new coordinator
  Step 5: P2 sends COORDINATOR(P4) around the ring once more to inform all`},
          {type:"table", headers:["Feature","Bully Algorithm","Ring Algorithm"],
            rows:[
              ["Structure","No specific topology needed","Processes in a logical ring"],
              ["Winner","Process with highest ID (bullies others)","Process with highest ID in collected list"],
              ["Complexity","O(n²) messages","O(n) messages — more efficient"],
              ["Problem","High message overhead; multiple simultaneous elections","Dead processes must be detected and skipped"],
            ]
          },
        ]
      },
      {
        qnum:"Q5", qtitle:"Gossip-Based Coordination & Distributed Event Matching",
        content:[
          {type:"heading", text:"Gossip-Based Coordination"},
          {type:"definition", text:"A decentralized coordination technique where nodes periodically exchange information with randomly selected peers, similar to how gossip spreads among people. No central coordinator is needed. Provides scalable, fault-tolerant coordination for large distributed systems."},
          {type:"table", headers:["Model","Description"],
            rows:[
              ["Push Model","Node sends its information to a randomly selected peer"],
              ["Pull Model","Node requests information from a randomly selected peer"],
              ["Push-Pull Model","Both nodes exchange information with each other simultaneously"],
            ]
          },
          {type:"table", headers:["Advantages","Limitations"],
            rows:[
              ["No single point of failure","Information propagation NOT instantaneous"],
              ["Scales to very large systems","Redundant messages — some nodes receive same info twice"],
              ["Simple to implement","No strong consistency guarantee"],
              ["Robust to node failures","Hard to predict exact convergence time"],
            ]
          },
          {type:"bullets", items:["Applications: Failure detection, Membership management, Data replication, Cloud/P2P systems (e.g., Cassandra, DynamoDB use gossip for membership)"]},
          {type:"heading", text:"Distributed Event Matching"},
          {type:"definition", text:"A mechanism where events generated by publishers are matched with subscriptions of interested subscribers — only MATCHING events are delivered. Follows the Publish-Subscribe communication model."},
          {type:"table", headers:["Component","Role"],
            rows:[
              ["Publisher","Generates events (state changes or actions)"],
              ["Subscriber","Registers interest through a subscription"],
              ["Event Broker/Matcher","Matches events with subscriptions; routes only relevant ones to subscribers"],
            ]
          },
          {type:"table", headers:["Matching Type","Description","Example"],
            rows:[
              ["Topic-based","Events grouped by topics; subscribers choose topics","Subscribe to 'sports' or 'weather' channel"],
              ["Content-based","Events matched based on content/attribute values","Notify only if temperature > 30°C"],
              ["Type-based","Matching based on event type or schema","Match all events of type 'OrderPlaced'"],
            ]
          },
          {type:"bullets", items:["Examples: RabbitMQ, Apache Kafka, IoT notification systems, stock market feeds, online chat alert systems"]},
        ]
      },
    ]
  },
  {
    id:"u7", title:"Unit 7 — Consistency & Replication", badge:"Chapter 7 · 5 hrs", color:"#4527A0",
    sections:[
      {
        qnum:"Q1", qtitle:"Replication — Why, Benefits, Challenges & CAP Theorem",
        content:[
          {type:"definition", text:"Replication: Maintaining multiple copies (replicas) of the same data on different machines. Used to improve reliability, availability, and performance. The challenge is keeping all replicas consistent when data changes."},
          {type:"table", headers:["Reason","Explanation"],
            rows:[
              ["Improved Reliability","If one replica crashes, others continue to serve correct data"],
              ["Better Performance","Replicas closer to users reduce latency; load distributed across replicas"],
              ["Scalability","Parallel access to data; handles growing number of users"],
              ["Fault Tolerance","If a replica fails, another takes over immediately"],
              ["Caching Support","Data cached locally (CDNs, browsers) for faster repeated access"],
            ]
          },
          {type:"heading", text:"Challenges in Replication"},
          {type:"bullets", items:[
            "**Consistency** — Keeping all replicas synchronized when concurrent updates occur",
            "**Update Propagation Delay** — Network latency causes temporary inconsistencies",
            "**Concurrent Update Conflicts** — Multiple replicas updated at same time → write conflicts",
            "**Network Partitions** — Failures prevent replicas from communicating",
            "**Stale Data** — Clients may read outdated data from un-updated replicas",
          ]},
          {type:"heading", text:"CAP Theorem (Brewer's Theorem)"},
          {type:"definition", text:"A distributed system can guarantee at most TWO of these three properties simultaneously: Consistency (all replicas show same data), Availability (every request gets a response), Partition Tolerance (system works despite network failures)."},
          {type:"diagram", text:`
                 Consistency (C)
                      △
                     /|\\
                    / | \\
               CP /  |  \\ CA
                 /   |   \\
                /  (CP)  \\
               ─────────────
              /     (AP)   \\
             ───────────────
  Availability (A)       Partition Tolerance (P)

  CP (Consistent + Partition Tolerant): may deny requests during partition
     Examples: HBase, MongoDB (strong mode), Zookeeper

  AP (Available + Partition Tolerant): may return stale data during partition
     Examples: Cassandra, DynamoDB, CouchDB

  CA (Consistent + Available): No partition tolerance — only single-node
     Examples: Traditional RDBMS (MySQL, PostgreSQL) on single machine`},
        ]
      },
      {
        qnum:"Q2", qtitle:"Data-Centric Consistency Models",
        content:[
          {type:"definition", text:"Data-Centric Consistency Models: System-wide rules governing how updates to replicated data are ordered and made visible to ALL processes. They define what values a read operation may return given concurrent reads and writes across the system."},
          {type:"heading", text:"1. Strict Consistency"},
          {type:"definition", text:"Any read on data item X ALWAYS returns the value of the MOST RECENT write on X. Requires a global clock and global synchronization. Practically impossible in distributed systems due to network latency."},
          {type:"tip", label:"NOTE", text:"Strict consistency is what happens on a single-processor machine. It's the gold standard — but completely unachievable across distributed nodes due to the speed of light limitation on communication."},
          {type:"heading", text:"2. Linearizability"},
          {type:"definition", text:"Linearizability = Sequential Consistency + Real-Time Order. Each operation appears to occur instantaneously at some point between its start and completion. If operation A completes BEFORE operation B starts, all processes must see A before B. The strongest PRACTICAL consistency model."},
          {type:"heading", text:"3. Sequential Consistency"},
          {type:"definition", text:"The result of any execution is the same as if all operations were executed in SOME sequential order, AND the operations of each individual process appear in the order specified by its program. All processes see the SAME interleaving of operations — but this doesn't need to match real-world time."},
          {type:"diagram", text:`
  SEQUENTIALLY CONSISTENT (all processes agree on same interleaving):
  P1: W(x)a  ─────────────────────────────────
  P2: ─────────────── W(x)b  ──────────────────
  P3: ──────── R(x)a ─────── R(x)b  ─────────  ✓ consistent ordering
  P4: ──────── R(x)a ─────── R(x)b  ─────────  ✓ same as P3

  NOT SEQUENTIALLY CONSISTENT:
  P3: ──────── R(x)b ─────── R(x)a  ─────────  ✗ P3 sees b before a
  P4: ──────── R(x)a ─────── R(x)b  ─────────    P4 sees a before b → DIFFERENT orders!`},
          {type:"heading", text:"4. Causal Consistency"},
          {type:"definition", text:"Weaker than sequential consistency. Operations that are CAUSALLY RELATED must be seen by all processes in the same causal order. Concurrent (unrelated) operations may be seen in different orders on different replicas."},
          {type:"analogy", text:"If Alice posts 'How are you?' and Bob replies 'I'm fine!', everyone must see Alice's post BEFORE Bob's reply (causal order). But if Carol simultaneously posts 'Hello World!' — Carol's post and Alice's post are concurrent, so they can appear in any order on different replicas without violating causal consistency."},
          {type:"heading", text:"5. Eventual Consistency"},
          {type:"definition", text:"Very weak but highly scalable. In the ABSENCE of updates for long enough, all replicas will eventually converge to the same value. Temporary inconsistencies are allowed. Used in DNS, web caches, CDNs, Amazon DynamoDB, Cassandra."},
          {type:"heading", text:"Strength Order — From Strongest to Weakest"},
          {type:"diagram", text:`
  STRONGEST (hardest to achieve, lowest performance)
      │
      ▼
  Strict Consistency     → Real-time global ordering; impractical
  Linearizability        → Real-time + sequential; strongest practical
  Sequential Consistency → Program order + global agreement (no real-time)
  Causal Consistency     → Only causally related events ordered globally
  Eventual Consistency   → Replicas converge "eventually"; widely used
      │
      ▼
  WEAKEST (easiest to achieve, highest performance)`},
        ]
      },
      {
        qnum:"Q3", qtitle:"Client-Centric Consistency Models",
        content:[
          {type:"definition", text:"Client-Centric Consistency Models: Provide guarantees for a SINGLE CLIENT's operations — ensuring the client sees a consistent view regardless of which replica it accesses. They are weaker than data-centric models but sufficient for many practical applications."},
          {type:"table", headers:["Model","Guarantee","Real-World Example"],
            rows:[
              ["Monotonic Read Consistency","If a client reads value X, all subsequent reads return the same or a NEWER value (never older)","Email inbox — you never see an older version after seeing a newer one"],
              ["Monotonic Write Consistency","A write by a client must COMPLETE before any subsequent write by the same client is executed","Shopping cart — adding item 2 only after item 1 was successfully added"],
              ["Read-Your-Writes Consistency","A client ALWAYS sees the effects of its OWN writes in subsequent reads","After updating profile pic, you always see YOUR new photo immediately"],
              ["Writes-Follow-Reads Consistency","A write following a read always comes AFTER the write that produced the read value","Reply to message: your reply is stored after the original message was acknowledged as seen"],
            ]
          },
          {type:"tip", label:"EXAM TIP", text:"Client-centric models are from ONE user's perspective. Data-centric models are system-wide rules for ALL users. Think: 'What does THIS user see consistently?' vs 'What does the WHOLE SYSTEM guarantee?'"},
        ]
      },
      {
        qnum:"Q4", qtitle:"Replica Management & Consistency Protocols",
        content:[
          {type:"heading", text:"Replica Management"},
          {type:"table", headers:["Aspect","Description"],
            rows:[
              ["Replica Placement","WHERE to place replicas: Permanent (static, always maintained), Server-initiated (dynamic by servers on demand), Client-initiated (caches)"],
              ["Replica Creation","Triggered by high demand, load distribution, or fault tolerance requirements"],
              ["Replica Deletion","Removed when demand drops or storage constraints arise"],
              ["Key Factors","Access patterns, latency needs, consistency cost, network topology, failure probability"],
            ]
          },
          {type:"heading", text:"Consistency Protocols"},
          {type:"table", headers:["Protocol","Description","Trade-off"],
            rows:[
              ["Primary-Backup (Primary Copy)","One primary handles all WRITES; propagates to backups","Simple but primary = potential bottleneck"],
              ["Quorum-Based","Read quorum (R) + Write quorum (W) > N replicas. Ensures reads and writes overlap.","Flexible consistency vs performance trade-off"],
              ["Active Replication","ALL replicas execute every operation","Highest availability; expensive synchronization"],
              ["Passive Replication","Only primary executes; result propagated to backups","Lower overhead; backup may have stale state briefly"],
              ["Chain Replication","Replicas in a chain; writes from HEAD→TAIL; reads from TAIL","Good write throughput and read consistency"],
            ]
          },
        ]
      },
    ]
  },
  {
    id:"u8", title:"Unit 8 — Fault Tolerance", badge:"Chapter 8 · 5 hrs", color:"#37474F",
    sections:[
      {
        qnum:"Q1", qtitle:"Fault Tolerance — Types of Faults & Requirements",
        content:[
          {type:"definition", text:"Fault Tolerance: The ability of a distributed system to continue providing correct services even in the presence of faults or failures. Key distinguishing feature of DS: PARTIAL FAILURE — one component can fail while others continue working normally. Unlike centralized systems where a failure stops everything."},
          {type:"heading", text:"Requirements of a Fault-Tolerant System"},
          {type:"table", headers:["Requirement","Description","Example"],
            rows:[
              ["Availability","System remains accessible even when some components fail","Online banking continues even if one server crashes"],
              ["Reliability","Correct results provided over time despite failures","Email ensures delivery even if a mail server temporarily fails"],
              ["Safety","Failures don't cause data loss or dangerous states","Railway reservation prevents double-booking during faults"],
              ["Maintainability","Easy to repair/update without stopping entire system","AWS replaces faulty servers without shutting down apps"],
              ["Graceful Degradation","Continue with reduced performance instead of stopping","Netflix lowers video quality when servers are overloaded"],
            ]
          },
          {type:"heading", text:"Types of Faults"},
          {type:"table", headers:["Fault Type","Description","Handling Method"],
            rows:[
              ["Transient","Occurs temporarily, disappears on its own. Short-lived.","Retries and timeouts"],
              ["Intermittent","Appears, disappears, and reappears unpredictably. Hard to diagnose.","Redundancy; logging; may become permanent"],
              ["Permanent","Persists until repaired/replaced. Most serious type.","Replication, reboot, component replacement"],
            ]
          },
          {type:"heading", text:"Types of Failures (Based on Behavior)"},
          {type:"table", headers:["Failure Type","Description"],
            rows:[
              ["Crash Failure","Server halts and stops responding — simplest to handle"],
              ["Omission Failure","Server fails to respond to SOME incoming requests (not all)"],
              ["Timing Failure","Server responds, but OUTSIDE the specified time interval"],
              ["Response Failure","Server responds with INCORRECT value (wrong result)"],
              ["Byzantine Failure","Arbitrary behavior — sends different/random responses to different clients — hardest to handle"],
            ]
          },
        ]
      },
      {
        qnum:"Q2", qtitle:"Distributed Commit — 2PC & 3PC",
        content:[
          {type:"definition", text:"Distributed Commit: Ensures that when a transaction spans multiple nodes, ALL participating processes either COMMIT (apply permanently) or ABORT (rollback) — never a partial update. This guarantees ATOMICITY across distributed nodes."},
          {type:"heading", text:"Why Distributed Commit is Needed"},
          {type:"bullets", items:[
            "Bank transfer: debit one bank + credit another — both must succeed or both fail",
            "If one server commits but another crashes before committing → data becomes inconsistent",
            "Need 'all or nothing' atomicity guarantee across all participating nodes",
          ]},
          {type:"heading", text:"Two-Phase Commit (2PC) Protocol"},
          {type:"diagram", text:`
  PHASE 1: VOTING PHASE
  ────────────────────────────────────────────────────────
  Coordinator ──── VOTE_REQUEST ──────────────→ All Participants
  
  Each Participant:
    • If READY to commit → reply VOTE_COMMIT
    • If CANNOT commit   → reply VOTE_ABORT
  
  Participants ──── VOTE_COMMIT / VOTE_ABORT ──→ Coordinator

  PHASE 2: DECISION PHASE
  ────────────────────────────────────────────────────────
  If ALL voted COMMIT → Coordinator sends GLOBAL_COMMIT to all
  If ANY voted ABORT  → Coordinator sends GLOBAL_ABORT to all
  
  Each Participant:
    • On GLOBAL_COMMIT → commit transaction permanently
    • On GLOBAL_ABORT  → rollback (undo) transaction
  
  Summary: "Are you ready?" → "Yes/No" → "Commit!" or "Abort!"`},
          {type:"heading", text:"Problems with 2PC"},
          {type:"bullets", items:[
            "**Blocking Problem** — If coordinator crashes AFTER sending VOTE_REQUEST but BEFORE sending GLOBAL_COMMIT → participants block indefinitely (don't know what to do)",
            "**High Latency** — Multiple message rounds required before any work is committed",
            "2PC is called a **blocking-commit protocol** — participants cannot make progress without coordinator decision",
          ]},
          {type:"heading", text:"Three-Phase Commit (3PC) — Solution to Blocking"},
          {type:"definition", text:"3PC adds a PRE-COMMIT phase to reduce blocking. Phases: (1) CanCommit? — ask if participants can commit, (2) PreCommit — tell participants to prepare/pre-commit (safe state), (3) DoCommit — final commit. If coordinator fails during phase 2 or 3, participants can proceed because they know others are also ready."},
          {type:"tip", label:"EXAM NOTE", text:"Although 3PC is better theoretically, it is rarely used in practice because 2PC blocking conditions rarely occur in real systems and 3PC adds complexity and message overhead. 2PC is the industry standard (used in most databases and distributed transaction systems)."},
          {type:"heading", text:"Recovery Mechanisms"},
          {type:"table", headers:["Technique","Description"],
            rows:[
              ["Checkpointing","Periodically save the full state of a process to stable storage. On failure, restart from last checkpoint."],
              ["Message Logging","Log all messages sent/received. Replay messages after recovery to restore state."],
              ["Backward Recovery (Rollback)","Roll back to last consistent checkpoint. Classic approach."],
              ["Forward Recovery","Use redundancy to continue from failure point. Harder to implement."],
            ]
          },
        ]
      },
      {
        qnum:"Q3", qtitle:"Process Resilience & Reliable Communication",
        content:[
          {type:"heading", text:"Process Resilience"},
          {type:"definition", text:"Process resilience is achieved by REPLICATING processes (process groups). If one replica fails, others take over. A group of identical processes masks failures through redundancy."},
          {type:"table", headers:["Group Type","Description"],
            rows:[
              ["Flat Group","All processes equal — any process can make decisions; no single coordinator"],
              ["Hierarchical Group","One coordinator handles external requests; workers execute computation"],
            ]
          },
          {type:"bullets", items:[
            "**k-fault tolerant group**: Can mask k faulty processes",
            "For crash failures: need k+1 replicas to tolerate k crashes",
            "For Byzantine failures: need 2k+1 replicas to tolerate k Byzantine failures",
          ]},
          {type:"heading", text:"RPC Semantics Under Failure"},
          {type:"table", headers:["Semantic","Guarantee","Problem"],
            rows:[
              ["At-least-once","Call executed one or more times","Possible duplicate execution — not safe for non-idempotent operations"],
              ["At-most-once","Call executed zero or one times","May miss execution if server crashes before completing"],
              ["Exactly-once","Call executed exactly one time","Ideal but very hard to guarantee in practice"],
            ]
          },
        ]
      },
    ]
  },
  {
    id:"u9", title:"Unit 9 — Security", badge:"Chapter 9 · 4 hrs", color:"#880E4F",
    sections:[
      {
        qnum:"Q1", qtitle:"Security Principles — CIA Triad, Threats & Attacks",
        content:[
          {type:"definition", text:"Security in DS: Protecting system resources and information against unauthorized access, misuse, modification, tampering, or destruction, while ensuring reliable and correct operation. More complex in DS because data is shared across multiple machines, communication occurs over open networks, and components may not fully trust each other."},
          {type:"heading", text:"Four Core Security Principles"},
          {type:"table", headers:["Principle","Meaning","Mechanisms","Example"],
            rows:[
              ["Confidentiality","Information disclosed ONLY to authorized parties","Encryption, access control, authentication","Only authorized engineers can view alarm data"],
              ["Integrity","Data altered ONLY in authorized ways — prevents tampering","Hashing, checksums, digital signatures","Alarm logs must not be tampered with during transmission"],
              ["Availability","Systems and data accessible when needed by authorized users","Redundancy, load balancing, fault tolerance, backups","Monitoring continues via backup nodes if one fails"],
              ["Accountability","Actions traceable to responsible individuals (non-repudiation)","Logging, auditing, authentication","Every change recorded with user ID and timestamp"],
            ]
          },
          {type:"heading", text:"Types of Threats and Attacks"},
          {type:"table", headers:["Attack","Description"],
            rows:[
              ["Eavesdropping (Passive)","Listening to network traffic to read private data — violates confidentiality"],
              ["Man-in-the-Middle (MITM)","Attacker intercepts and potentially alters communication between two parties"],
              ["Replay Attack","Captures a valid message and re-sends it later to impersonate the original sender"],
              ["Denial of Service (DoS)","Flooding a server with requests to make it unavailable to legitimate users"],
              ["Masquerading/Spoofing","Attacker pretends to be a legitimate user or system"],
              ["Message Tampering","Unauthorized modification of messages in transit"],
              ["Trojan Horses/Viruses","Malicious software embedded in legitimate programs"],
            ]
          },
        ]
      },
      {
        qnum:"Q2", qtitle:"Access Control — Models, Matrix & Mechanisms",
        content:[
          {type:"definition", text:"Access Control: Regulates who can access system resources and what actions they are allowed to perform. Involves: Authentication (verifying identity — 'who are you?'), Authorization (defining what they can do — 'what are you allowed to do?'), and Auditing (recording actions for accountability)."},
          {type:"heading", text:"Access Control Models"},
          {type:"table", headers:["Model","Description","Example"],
            rows:[
              ["DAC (Discretionary AC)","Resource OWNERS define who can access their objects. Uses ACLs. Flexible but less secure.","File owner grants read/write permissions in UNIX"],
              ["MAC (Mandatory AC)","Access determined by CENTRAL AUTHORITY based on security classifications. Highly secure but rigid.","Military: confidential, secret, top-secret levels"],
              ["RBAC (Role-Based AC)","Access based on USER ROLES assigned. Widely used in organizations.","Admin, manager, employee roles in enterprise systems"],
              ["ABAC (Attribute-Based AC)","Access based on user attributes: location, time, device type.","Geo-restricted or time-based access policies"],
            ]
          },
          {type:"heading", text:"Access Control Matrix"},
          {type:"diagram", text:`
  The theoretical foundation of access control — lists all subjects (users)
  and all objects (resources) with what permissions each subject has:

               File1        File2       Printer1
  ┌──────────┬────────────┬────────────┬───────────┐
  │  Alice   │ read,write │ read       │ print     │
  ├──────────┼────────────┼────────────┼───────────┤
  │  Bob     │ read       │ read,write │ print     │
  ├──────────┼────────────┼────────────┼───────────┤
  │  Root    │ read,write,│ read,write,│ print,    │
  │          │ execute    │ execute    │ admin     │
  └──────────┴────────────┴────────────┴───────────┘

  ACL (column view): "File1 is accessible by Alice(rw), Bob(r), Root(rwx)"
  Capability (row):  "Alice has [File1:rw, File2:r, Printer1:print]"
  
  In practice: matrix too large → use ACLs (per resource) or capabilities (per user)`},
          {type:"heading", text:"Access Control Mechanisms"},
          {type:"table", headers:["Mechanism","Description"],
            rows:[
              ["Access Control Lists (ACLs)","List attached to EACH RESOURCE specifying users and their permissions"],
              ["Capability Lists","List held by EACH USER/PROCESS specifying which resources they can access"],
              ["Tokens","Temporary digital credentials representing authenticated identity and permissions"],
              ["Firewall","Filters network traffic based on rules — barrier between trusted & untrusted networks"],
              ["IDS","Intrusion Detection System — DETECTS suspicious activity but does NOT block automatically"],
              ["IPS","Intrusion Prevention System — DETECTS + ACTIVELY BLOCKS malicious packets"],
            ]
          },
        ]
      },
      {
        qnum:"Q3", qtitle:"Secure Channels, Secure Naming & Security Management",
        content:[
          {type:"heading", text:"Secure Channels"},
          {type:"table", headers:["Technique","Purpose","Example"],
            rows:[
              ["Symmetric Encryption","Fast encryption using SAME key for both parties","AES, DES — used for bulk data encryption"],
              ["Asymmetric Encryption","Public/private key pair — public key encrypts, private key decrypts","RSA — key exchange, digital signatures"],
              ["Digital Signatures","Verify authenticity and integrity of messages; non-repudiation","Signing software releases, email verification"],
              ["TLS/SSL","Secure transport layer for network communication","HTTPS — browser to web server"],
              ["Authentication","Verifying identity of communicating parties","Kerberos, certificates, passwords"],
            ]
          },
          {type:"heading", text:"Secure Naming"},
          {type:"definition", text:"Secure Naming: Ensuring that names of resources correctly and securely map to the intended objects without being tampered with or forged. Naming systems are vulnerable to spoofing and redirection attacks."},
          {type:"bullets", items:[
            "**DNS Spoofing** — Attacker poisons DNS cache to redirect users to malicious servers",
            "**DNSSEC** — DNS Security Extensions: cryptographically signs DNS records to prevent spoofing",
            "**DNS-over-HTTPS (DoH)** — Encrypts DNS queries to prevent eavesdropping",
            "**PKI (Public Key Infrastructure)** — Certificates bind public keys to entity identities",
            "**Certificate Authorities (CA)** — Trusted third parties that issue and sign digital certificates",
          ]},
          {type:"heading", text:"Security Management Tools"},
          {type:"table", headers:["Tool","Function"],
            rows:[
              ["Firewall","Filters network traffic — barrier between trusted and untrusted networks"],
              ["IDS (Intrusion Detection)","Detects suspicious activity or attacks — does NOT block automatically"],
              ["IPS (Intrusion Prevention)","Detects + ACTIVELY BLOCKS attacks by dropping malicious packets"],
              ["SIEM","Collects & correlates security logs in real-time for threat detection (e.g., Splunk)"],
              ["IAM Tools","Identity & Access Management — user provisioning, RBAC, MFA"],
              ["Antivirus/Anti-malware","Detects, prevents, removes malicious software"],
            ]
          },
        ]
      },
    ]
  },
  {
    id:"u10", title:"🎯 Exam Predictions 2026", badge:"Based on 2021, 2023 & 2024 Papers", color:"#C62828",
    sections:[
      {
        qnum:"PRED", qtitle:"Predicted Questions — Group B & C (Based on Past Paper Patterns)",
        content:[
          {type:"warning", text:"These predictions cross-reference questions from 2021, 2023 (written), and September 2024 (MCQ). Questions appearing in BOTH 2021 AND 2023 are near-certain to appear again. Study every row below!"},
          {type:"heading", text:"Group B Predictions (5–6 Marks Each)"},
          {type:"table", headers:["Predicted Question","Appeared In","Why It Will Come"],
            rows:[
              ["Explain Berkeley algorithm with diagram","2023","Directly asked — very high repeat probability"],
              ["Stateful vs Stateless server — differences","2023","Simple comparison; assigned question; likely repeat"],
              ["Data-centric consistency models — all types","BOTH 2021 & 2023","Asked BOTH years — near certainty to appear again"],
              ["Types of faults + recovery methods","2021","Fault types are foundational DS content"],
              ["Types of threats and attacks in DS","2021","Security section always represented"],
              ["Access control — types and matrix","2021 (short note), 2023 (matrix)","Two different forms asked in two years"],
              ["Architectural styles of DS","2021","Middleware/architecture asked 2023 — styles due"],
              ["Attribute-based naming with example","2021","Unique topic; simple to test; likely repeat"],
              ["Sequential consistency explanation","2023 (short note)","Consistency models are heavily tested"],
              ["MPI — Message Passing Interface","2023 (short note)","Communication is always in exam"],
              ["Cristian's algorithm","2023 (MCQ)","Physical clock sync is core coordination topic"],
              ["DS characteristics definition","2021 & 2023","Most fundamental question — always present"],
            ]
          },
          {type:"heading", text:"Group C Predictions (10 Marks Each)"},
          {type:"table", headers:["Predicted Question","Appeared In","Why It Will Come"],
            rows:[
              ["RPC process with diagram + MOC types [5+5]","BOTH 2021 & 2023 Group C","HIGHEST probability — appeared both years"],
              ["Election algorithms — Bully + Ring with diagrams","2023 Group C","Classic 10-mark question with diagrams"],
              ["DS definition + characteristics + types [2+4+4]","2023 Group C","Identical format — likely exact repeat or very similar"],
              ["Virtualization types + role + examples","2021 Group C","Virtualization is a major testable topic"],
              ["Two-Phase Commit (2PC) protocol with diagram","2023","Distributed commit = 10-mark worthy topic"],
              ["Physical clock sync + Lamport + Berkeley [full 10]","2021 Group C","Clock sync is the most important coordination topic"],
              ["Replication — why + challenges + consistency models","Unit 7 weight","Replication and consistency are deeply linked; high value"],
            ]
          },
        ]
      },
      {
        qnum:"MCQ", qtitle:"MCQ Topics That Repeat — From 2023 & Sept 2024 Papers",
        content:[
          {type:"table", headers:["MCQ Topic","Correct Answer","From Year"],
            rows:[
              ["Every processor in DS processes its own…","Both local memory AND clock","2023"],
              ["What aids communication between apps in DS?","Middleware","2023"],
              ["Which attack is a passive attack?","Traffic analysis","2023"],
              ["If two events have same timestamp, they are…","Concurrent","2023"],
              ["New coordinator selected by…","Both Bully AND Ring algorithm","2023"],
              ["Exceptions handled in RMI client?","ClassNotFoundException","2024"],
              ["Machine placing request to access data = ?","Client machine","2024"],
              ["Object acting as gateway for client side = ?","Stub","2024"],
              ["All related objects moved on first RPC = ?","Call by move","2024"],
              ["Full form of NTP?","Network Time Protocol","2024"],
              ["All writes perceptible to all processes = ?","Strict consistency model","2024"],
              ["File system grows without affecting performance = ?","Scalability","2024"],
            ]
          },
        ]
      },
      {
        qnum:"CHEAT", qtitle:"Quick Revision Cheat Sheet — Key Concepts in One Page",
        content:[
          {type:"heading", text:"Must-Know Definitions (5-mark questions)"},
          {type:"table", headers:["Term","One-Line Definition"],
            rows:[
              ["Distributed System","Collection of autonomous nodes appearing as single coherent system to users"],
              ["Middleware","Software between OS and apps that provides communication/coordination services"],
              ["RPC","Mechanism to call a function on a remote machine as if it were a local call"],
              ["Mutual Exclusion","Ensuring only one process enters a critical section (shared resource) at a time"],
              ["Logical Clock","Assigns order to events without real-time synchronization — ordering only"],
              ["Eventual Consistency","Replicas converge to same value eventually when no updates occur"],
              ["Replication","Maintaining multiple copies of data on different machines for reliability"],
              ["Distributed Commit","Protocol ensuring all nodes either commit or abort a transaction (all-or-nothing)"],
              ["Election Algorithm","Algorithm to select one process as coordinator in a distributed system"],
              ["Access Control","Regulating who can access resources and what they can do with them"],
            ]
          },
          {type:"heading", text:"Clock Sync Comparison — Cristian vs Berkeley"},
          {type:"diagram", text:`
  Cristian's Algorithm:               Berkeley Algorithm:
  Client → Server: "What time?"      Master → Slaves: "What's your time?"
  Server → Client: T_server          Slaves → Master: their current times
  Client sets: T_server + delay/2    Master: calculates AVERAGE of all
                                     Master → Slaves: "Adjust by +X or -Y"

  KEY: Cristian = PASSIVE server      Berkeley = ACTIVE master
       Cristian = external sync       Berkeley = internal sync (no UTC needed)
       Cristian = client initiates    Berkeley = master/daemon initiates`},
          {type:"heading", text:"Mutual Exclusion Quick Reference"},
          {type:"table", headers:["Algorithm","Messages per Entry","Delay","Main Failure"],
            rows:[
              ["Centralized","3","2 msg times","Coordinator crash = total block"],
              ["Distributed (Ricart)","2(n-1)","2(n-1) msg times","Any crash = deadlock"],
              ["Token Ring","1 to ∞","0 to n-1","Lost token breaks ring"],
            ]
          },
          {type:"heading", text:"Consistency Models — 5-Word Summary Each"},
          {type:"bullets", items:[
            "**Strict** — Most recent write, always returned",
            "**Linearizable** — Strict + real-time completion order",
            "**Sequential** — Same ordering seen by everyone",
            "**Causal** — Causally-related writes ordered globally",
            "**Eventual** — Replicas converge eventually (DNS, CDN)",
          ]},
          {type:"heading", text:"2PC Algorithm — In 4 Lines"},
          {type:"diagram", text:`
  Phase 1: Coordinator → VOTE_REQUEST → all participants
           Participants → VOTE_COMMIT or VOTE_ABORT → Coordinator
  Phase 2: ALL voted COMMIT → GLOBAL_COMMIT to all
           ANY voted ABORT  → GLOBAL_ABORT to all
  
  PROBLEM: Coordinator crashes between Phase 1 and Phase 2
           → participants BLOCK waiting for decision forever`},
          {type:"tip", label:"FINAL STRATEGY 2026", text:"The RPC + Message-Oriented Communication 10-mark question has appeared BOTH exam years — it's your safest bet. Election algorithms (Bully + Ring) with diagrams was Group C in 2023. Data-centric consistency types appear every year. Berkeley algorithm and stateful vs stateless are likely Group B. Review access control matrix carefully — it has been asked as both a short note and a full question."},
        ]
      },
    ]
  },
];

const COLORS = {
  bg:"#F0F4F8", surface:"#FFFFFF", border:"#DDE3EA", code_bg:"#F1F5F9",
  code_border:"#CBD5E1", text:"#1E293B", muted:"#64748B",
  definition_bg:"#EFF6FF", definition_border:"#3B82F6",
  analogy_bg:"#FFF7ED", analogy_border:"#F97316",
  tip_bg:"#F0FDF4", tip_border:"#22C55E",
  warning_bg:"#FFF1F2", warning_border:"#F43F5E",
  diagram_bg:"#1E293B",
};

function CodeBlock({ label, lines }) {
  const [copied, setCopied] = useState(false);
  const allCode = lines.join("\n\n");
  return (
    <div style={{ margin:"12px 0", borderRadius:8, overflow:"hidden", border:`1px solid ${COLORS.code_border}` }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"#334155", padding:"8px 14px" }}>
        <span style={{ color:"#94A3B8", fontSize:12, fontFamily:"monospace", fontWeight:600 }}>{label}</span>
        <button onClick={() => { navigator.clipboard?.writeText(allCode).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
          style={{ background:copied?"#22C55E":"#475569", color:"#fff", border:"none", borderRadius:5, padding:"4px 12px", fontSize:11, cursor:"pointer", fontWeight:600 }}>
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <div style={{ background:COLORS.code_bg, padding:"14px 16px", overflowX:"auto" }}>
        {lines.map((block, i) => (
          <pre key={i} style={{ margin:i>0?"14px 0 0":0, padding:0, fontFamily:"'Courier New', monospace", fontSize:13, color:COLORS.text, lineHeight:1.65, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{block}</pre>
        ))}
      </div>
    </div>
  );
}

function ContentBlock({ item }) {
  switch (item.type) {
    case "explain": return <p style={{ color:COLORS.text, fontSize:14.5, lineHeight:1.8, margin:"8px 0" }}>{item.text}</p>;
    case "heading": return <h4 style={{ color:COLORS.text, fontSize:15, fontWeight:700, margin:"18px 0 8px", paddingBottom:5, borderBottom:`2px solid ${COLORS.border}` }}>{item.text}</h4>;
    case "definition": return (
      <div style={{ background:COLORS.definition_bg, border:`1px solid ${COLORS.definition_border}`, borderLeft:`4px solid ${COLORS.definition_border}`, borderRadius:7, padding:"12px 16px", margin:"10px 0" }}>
        <p style={{ margin:0, color:"#1D4ED8", fontSize:14.5, lineHeight:1.7 }}>{item.text}</p>
      </div>
    );
    case "analogy": return (
      <div style={{ background:COLORS.analogy_bg, border:`1px solid ${COLORS.analogy_border}`, borderLeft:`4px solid ${COLORS.analogy_border}`, borderRadius:7, padding:"10px 16px", margin:"10px 0" }}>
        <div style={{ color:COLORS.analogy_border, fontWeight:700, fontSize:12, marginBottom:4 }}>🔍 ANALOGY</div>
        <span style={{ color:"#92400E", fontSize:14.5, lineHeight:1.7, fontStyle:"italic" }}>{item.text}</span>
      </div>
    );
    case "tip": return (
      <div style={{ background:COLORS.tip_bg, border:`1px solid ${COLORS.tip_border}`, borderLeft:`4px solid ${COLORS.tip_border}`, borderRadius:7, padding:"10px 16px", margin:"10px 0", display:"flex", gap:10, alignItems:"flex-start" }}>
        <span style={{ color:"#16A34A", fontWeight:800, fontSize:12, minWidth:110, paddingTop:2 }}>💡 {item.label}</span>
        <span style={{ color:"#14532D", fontSize:14.5, lineHeight:1.7 }}>{item.text}</span>
      </div>
    );
    case "warning": return (
      <div style={{ background:COLORS.warning_bg, border:`1px solid ${COLORS.warning_border}`, borderLeft:`4px solid ${COLORS.warning_border}`, borderRadius:7, padding:"10px 16px", margin:"10px 0" }}>
        <div style={{ color:COLORS.warning_border, fontWeight:700, fontSize:12, marginBottom:4 }}>⚠ IMPORTANT</div>
        <span style={{ color:"#9F1239", fontSize:14.5, lineHeight:1.7 }}>{item.text}</span>
      </div>
    );
    case "diagram": return (
      <div style={{ background:COLORS.diagram_bg, borderRadius:8, padding:"14px 18px", margin:"12px 0", overflowX:"auto" }}>
        <pre style={{ margin:0, fontFamily:"'Courier New', monospace", fontSize:12.5, color:"#E2E8F0", lineHeight:1.6, whiteSpace:"pre" }}>{item.text}</pre>
      </div>
    );
    case "bullets": return (
      <ul style={{ margin:"8px 0", paddingLeft:22 }}>
        {item.items.map((it, i) => (
          <li key={i} style={{ color:COLORS.text, fontSize:14.5, lineHeight:1.8, marginBottom:6 }}
            dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        ))}
      </ul>
    );
    case "table": return (
      <div style={{ overflowX:"auto", margin:"12px 0" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13.5 }}>
          <thead>
            <tr>{item.headers.map((h, i) => (
              <th key={i} style={{ background:"#1E293B", color:"#fff", padding:"9px 12px", textAlign:"left", fontWeight:700, borderBottom:"2px solid #334155" }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>{item.rows.map((row, ri) => (
            <tr key={ri} style={{ background:ri%2===0?"#fff":"#F8FAFC" }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding:"8px 12px", borderBottom:`1px solid ${COLORS.border}`, color:COLORS.text, verticalAlign:"top", lineHeight:1.6 }}>{cell}</td>
              ))}
            </tr>
          ))}</tbody>
        </table>
      </div>
    );
    case "code": return <CodeBlock label={item.label} lines={item.lines} />;
    default: return null;
  }
}

export default function DS() {
  const [activeUnit, setActiveUnit] = useState("u1");
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ fontFamily:"'Segoe UI','Helvetica Neue',Arial,sans-serif", background:COLORS.bg, minHeight:"100vh", color:COLORS.text }}>
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E293B 100%)", padding:"18px 24px", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth:1050, margin:"0 auto", display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ background:"#6366F1", borderRadius:10, width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🖧</div>
          <div>
            <h1 style={{ color:"#fff", margin:0, fontSize:19, fontWeight:700 }}>Distributed Systems — BCA 6th Semester</h1>
            <div style={{ color:"#94A3B8", fontSize:12, marginTop:2 }}>Ultimate Exam Guide 2026 · CACS352 · All 9 Units + MCQ Patterns + Predictions</div>
          </div>
        </div>
      </div>

      <div style={{ background:"#fff", borderBottom:`2px solid ${COLORS.border}`, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
        <div style={{ maxWidth:1050, margin:"0 auto", display:"flex", minWidth:"max-content" }}>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => setActiveUnit(u.id)}
              style={{ padding:"13px 13px", border:"none", background:"none", cursor:"pointer", fontSize:11.5, fontWeight:activeUnit===u.id?700:500, color:activeUnit===u.id?u.color:COLORS.muted, borderBottom:activeUnit===u.id?`3px solid ${u.color}`:"3px solid transparent", whiteSpace:"nowrap", transition:"all 0.15s" }}>
              {u.id==="u10" ? "🎯 Predictions" : `U${u.id.slice(1)}: ${u.title.split("—")[1]?.trim().split(" ").slice(0,2).join(" ")}`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1050, margin:"0 auto", padding:"28px 20px 80px" }}>
        <div style={{ background:`linear-gradient(135deg,${unit.color} 0%,${unit.color}CC 100%)`, borderRadius:14, padding:"22px 28px", marginBottom:28, boxShadow:`0 4px 20px ${unit.color}40` }}>
          <h2 style={{ color:"#fff", margin:0, fontSize:21, fontWeight:700 }}>{unit.title}</h2>
          <span style={{ color:"rgba(255,255,255,0.8)", fontSize:13, marginTop:4, display:"block" }}>{unit.badge}</span>
        </div>

        {unit.sections.map((sec, si) => {
          const key = `${unit.id}-${si}`;
          const open = openSections[key] !== false;
          return (
            <div key={key} style={{ background:COLORS.surface, borderRadius:12, border:`1px solid ${COLORS.border}`, marginBottom:16, overflow:"hidden", boxShadow:open?"0 2px 12px rgba(0,0,0,0.08)":"0 1px 4px rgba(0,0,0,0.04)" }}>
              <button onClick={() => toggleSection(key)} style={{ width:"100%", background:open?"#F8FAFC":"#fff", border:"none", padding:"15px 20px", cursor:"pointer", display:"flex", alignItems:"center", gap:14, textAlign:"left" }}>
                <span style={{ background:unit.color, color:"#fff", borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:700, minWidth:60, textAlign:"center", whiteSpace:"nowrap" }}>{sec.qnum}</span>
                <span style={{ color:COLORS.text, fontSize:15, fontWeight:700, flex:1 }}>{sec.qtitle}</span>
                <span style={{ color:COLORS.muted, fontSize:18, transform:open?"rotate(0deg)":"rotate(-90deg)", display:"inline-block", transition:"transform 0.2s" }}>▾</span>
              </button>
              {open && (
                <div style={{ padding:"4px 24px 28px" }}>
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
