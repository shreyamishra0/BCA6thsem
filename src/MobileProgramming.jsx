import { useState } from "react";

const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Mobile Devices & Programming",
    badge: "Chapter 1",
    color: "#1565C0",
    sections: [
      {
        qnum: "Q1",
        qtitle: "What is a Smart Mobile Device? Categories & Platforms",
        content: [
          { type: "definition", text: "Smart Mobile Device: A handheld, portable computing device that combines phone, internet, and computing capabilities. It has a touchscreen, runs apps, and connects to the internet. Examples: smartphones, tablets, smartwatches." },
          { type: "heading", text: "Categories of Mobile Devices" },
          { type: "table", headers: ["Category", "Description", "Examples"],
            rows: [
              ["Smartphones", "Most popular. Touchscreen, calls, apps, internet, camera.", "iPhone, Samsung Galaxy, Redmi"],
              ["Tablets", "Larger screen (7–12 inch), mostly Wi-Fi, used for media/work.", "iPad, Samsung Tab, Lenovo Tab"],
              ["Wearables", "Worn on body. Limited screen. Tracks health/notifications.", "Apple Watch, Fitbit, Galaxy Watch"],
              ["PDAs", "Personal Digital Assistants – old generation, organizer-type devices.", "Palm Pilot (historical)"],
              ["Phablets", "Between phone and tablet size (5.5–7 inch screen).", "iPhone Pro Max, Note series"],
              ["E-Readers", "Designed for reading. E-ink display, long battery life.", "Kindle, Kobo"],
            ]
          },
          { type: "heading", text: "Popular Mobile Platforms" },
          { type: "table", headers: ["Platform", "Developer", "Language", "Market Share"],
            rows: [
              ["Android", "Google", "Java / Kotlin", "~72% globally"],
              ["iOS", "Apple", "Swift / Objective-C", "~27% globally"],
              ["KaiOS", "KaiOS Technologies", "HTML5 / JS", "Feature phones"],
              ["HarmonyOS", "Huawei", "Java / Cangjie", "Huawei devices"],
            ]
          },
          { type: "analogy", text: "Think of a mobile platform as a game console (like PlayStation or Xbox). Just like PS5 games only run on PS5, Android apps run only on Android (unless ported). The platform is the 'rules of the game' for all apps built on it." },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Mobile Application Development Approaches",
        content: [
          { type: "explain", text: "There are 4 main approaches to developing mobile applications. Each has different tools, languages, and trade-offs between performance and development speed." },
          { type: "heading", text: "1. Native Development" },
          { type: "definition", text: "Native: Building a separate app for each platform using the platform's official language and tools. Android uses Java/Kotlin in Android Studio. iOS uses Swift/Objective-C in Xcode." },
          { type: "table", headers: ["Aspect", "Details"],
            rows: [
              ["Language", "Android: Java/Kotlin | iOS: Swift/Objective-C"],
              ["Tools", "Android Studio | Xcode"],
              ["Performance", "Best – direct access to hardware"],
              ["Code Reuse", "0% – separate codebases for each platform"],
              ["Examples", "Gmail app, Maps (original), Snapchat"],
            ]
          },
          { type: "heading", text: "2. Cross-Platform / Hybrid Development" },
          { type: "table", headers: ["Framework", "Language", "How it works"],
            rows: [
              ["React Native", "JavaScript", "Write JS, renders native UI components"],
              ["Flutter", "Dart", "Write once, renders its own UI engine (Skia/Impeller)"],
              ["Xamarin", "C#", "Compiles to native code using .NET"],
              ["Ionic", "HTML/CSS/JS", "Web view wrapped in native shell"],
            ]
          },
          { type: "heading", text: "3. Web / PWA (Progressive Web App)" },
          { type: "definition", text: "PWA: A website built with advanced web technologies (Service Workers, Manifest) that behaves like a native app. Can work offline, send notifications, and be installed on home screen." },
          { type: "tip", label: "EXAM TIP", text: "Questions often ask to compare approaches. Key: Native = best performance; Cross-platform = write once run anywhere; Hybrid = uses web technologies; PWA = runs in browser but acts like an app." },
          { type: "heading", text: "4. Mobile App Development Lifecycle" },
          { type: "bullets", items: [
            "**Planning** – Define goals, target users, platform choice",
            "**Design** – UI/UX design, wireframes, prototypes",
            "**Development** – Write code, implement features",
            "**Testing** – Unit test, device test, user testing",
            "**Deployment** – Publish to Play Store / App Store",
            "**Maintenance** – Updates, bug fixes, new features",
          ]},
        ]
      },
    ]
  },
  {
    id: "u2",
    title: "Unit 2 — Android Platform & Architecture",
    badge: "Chapter 2 + Architecture",
    color: "#2E7D32",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Android Architecture — All 5 Layers with Diagram",
        content: [
          { type: "explain", text: "Android architecture is organized in 5 layers, each sitting on top of the previous one. This is the most commonly asked diagram question — it came in 2023 and is very likely to appear again in 2026." },
          { type: "diagram", text: `
┌─────────────────────────────────────────────────────────────────┐
│                     ANDROID ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 5 (TOP)         APPLICATIONS                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
│  │  Home  │ │Contacts│ │ Phone  │ │Browser │ │ Your   │       │
│  │  App   │ │  App   │ │  App   │ │        │ │  App   │       │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘       │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 4          APPLICATION FRAMEWORK                         │
│  Activity Mgr | Window Mgr | Content Providers | View System   │
│  Package Mgr | Notification Mgr | Resource Mgr | Location Mgr  │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 3         ANDROID RUNTIME + CORE LIBRARIES               │
│  ┌─────────────────────────┐  ┌───────────────────────────┐    │
│  │  Core Libraries         │  │   Dalvik VM (DVM) / ART   │    │
│  │  (Java std libraries)   │  │   Runs .dex bytecode      │    │
│  └─────────────────────────┘  └───────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 2           PLATFORM LIBRARIES (C/C++)                   │
│  Media | Surface Manager | OpenGL/SGL | SQLite | WebKit | SSL  │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 1 (BOTTOM)       LINUX KERNEL                            │
│  Display Driver | Camera | Bluetooth | USB | Audio | Power Mgmt │
└─────────────────────────────────────────────────────────────────┘` },
          { type: "heading", text: "Layer 1: Linux Kernel" },
          { type: "definition", text: "The heart of Android. Manages all hardware drivers (display, camera, Bluetooth, audio, memory). Provides security, memory management, process management, and network stack. Acts as a bridge between hardware and software." },
          { type: "heading", text: "Layer 2: Platform Libraries (C/C++)" },
          { type: "table", headers: ["Library", "Purpose"],
            rows: [
              ["Media Library", "Play/record audio and video formats (MP3, AAC, H.264)"],
              ["Surface Manager", "Manages display subsystem – composites layers from different apps"],
              ["SGL & OpenGL", "2D (SGL) and 3D (OpenGL) graphics rendering"],
              ["SQLite", "Lightweight relational database for local storage"],
              ["WebKit", "Web browser engine – renders HTML/CSS inside apps"],
              ["SSL", "Secure Sockets Layer – encrypted connections (HTTPS)"],
              ["FreeType", "Font rendering library"],
            ]
          },
          { type: "heading", text: "Layer 3: Android Runtime (DVM/ART)" },
          { type: "definition", text: "DVM (Dalvik Virtual Machine): A register-based virtual machine specially designed for Android. Unlike Java's JVM (stack-based), DVM is optimized to run efficiently on mobile devices with limited RAM and battery. It runs .dex (Dalvik Executable) files." },
          { type: "heading", text: "DVM vs ART — Key Difference (Asked in 2020!)" },
          { type: "table", headers: ["Feature", "DVM (Dalvik VM)", "ART (Android Runtime)"],
            rows: [
              ["Full Form", "Dalvik Virtual Machine", "Android RunTime"],
              ["Compilation", "JIT – Just In Time (compiles at runtime)", "AOT – Ahead Of Time (compiles at install time)"],
              ["Speed", "Slower app startup", "Faster app execution"],
              ["Storage", "Less storage needed", "More storage needed (pre-compiled)"],
              ["Battery", "Uses more battery (recompiles often)", "Better battery (compiled once)"],
              ["Used in", "Android 4.4 (KitKat) and below", "Android 5.0 (Lollipop) and above"],
            ]
          },
          { type: "heading", text: "Layer 4: Application Framework" },
          { type: "bullets", items: [
            "**Activity Manager** – Controls activity lifecycle and back stack",
            "**Window Manager** – Manages windows/views on screen",
            "**Content Providers** – Share data between applications",
            "**View System** – UI building blocks (TextView, Button, etc.)",
            "**Package Manager** – Manages installed apps",
            "**Notification Manager** – System notifications",
            "**Resource Manager** – Handles non-code resources (strings, images)",
            "**Location Manager** – GPS and location services",
          ]},
          { type: "heading", text: "Layer 5: Applications (Top)" },
          { type: "explain", text: "The topmost layer. All installed apps live here — pre-installed apps (Phone, Contacts, Camera, Settings) and third-party apps downloaded from Play Store. These apps are built using the Application Framework services." },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Android Directory Structure of a Project",
        content: [
          { type: "diagram", text: `
MyApp/
├── app/
│   ├── manifests/
│   │   └── AndroidManifest.xml   ← App permissions, activities declared here
│   ├── java/
│   │   └── com.example.myapp/
│   │       └── MainActivity.java  ← Your Java source files
│   ├── res/
│   │   ├── layout/
│   │   │   └── activity_main.xml  ← UI layout files (XML)
│   │   ├── values/
│   │   │   ├── strings.xml        ← String resources
│   │   │   ├── colors.xml         ← Color resources
│   │   │   └── themes.xml         ← App theme/style
│   │   ├── drawable/              ← Images, icons, shape files
│   │   └── mipmap/                ← App launcher icons
│   └── build.gradle               ← Module-level build config
├── Gradle Scripts/
│   └── build.gradle               ← Project-level build config
└── .idea/                         ← Android Studio config` },
          { type: "heading", text: "Key Files Explained" },
          { type: "table", headers: ["File/Folder", "Purpose"],
            rows: [
              ["AndroidManifest.xml", "The 'ID card' of the app. Declares all activities, permissions, services, and app name/icon."],
              ["MainActivity.java", "The main Java file with your activity logic."],
              ["activity_main.xml", "The layout file — defines what the screen looks like."],
              ["strings.xml", "Store all text strings here instead of hardcoding in code."],
              ["R.java (auto-generated)", "Auto-generated file that maps resource names to IDs. Never edit manually."],
            ]
          },
          { type: "heading", text: "Using String Resources" },
          { type: "code", label: "strings.xml — Define string resources", lines: [`<!-- res/values/strings.xml -->
<resources>
    <string name="app_name">My App</string>
    <string name="greeting">Hello, Welcome!</string>
    <string-array name="languages">
        <item>Java</item>
        <item>Python</item>
        <item>Swift</item>
    </string-array>
</resources>`] },
          { type: "code", label: "Using string resources in Java", lines: [`// In Java code:
String appName = getString(R.string.app_name);
String[] langs = getResources().getStringArray(R.array.languages);

// In XML layout:
// android:text="@string/greeting"`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "AVD (Android Virtual Device) — How to Create an Emulator",
        content: [
          { type: "definition", text: "AVD (Android Virtual Device): A virtual Android phone/tablet that runs on your computer. It emulates the hardware and software of a real Android device. Used for testing apps without needing a physical phone." },
          { type: "heading", text: "Steps to Create an AVD" },
          { type: "bullets", items: [
            "Open Android Studio → Click **Tools** menu → Select **AVD Manager**",
            "Click **Create Virtual Device** button",
            "Choose a **hardware profile** (e.g., Pixel 6, Nexus 5X)",
            "Select a **System Image** — choose an Android version (e.g., API 33 / Android 13)",
            "Click **Download** to download the system image if not already downloaded",
            "Configure settings (RAM, storage, screen orientation) → Click **Finish**",
            "Your AVD appears in the list → Click **▶ Play** button to launch it",
          ]},
          { type: "tip", label: "EXAM TIP", text: "AVD Manager is found under Tools menu in Android Studio. You need to download a system image for the Android version you want to test on. Each AVD simulates a specific device model." },
        ]
      },
    ]
  },
  {
    id: "u3",
    title: "Unit 3 — UI Design: Layouts & Widgets",
    badge: "Chapter 3",
    color: "#6A1B9A",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Android Layouts — All Types with Attributes",
        content: [
          { type: "explain", text: "Layouts are containers that define how UI widgets are arranged on screen. Android provides 5 main layout types. Each has different rules for positioning child views." },
          { type: "heading", text: "1. LinearLayout" },
          { type: "definition", text: "LinearLayout: Arranges children in a single row (horizontal) or single column (vertical). The most simple layout." },
          { type: "table", headers: ["Important Attribute", "Values", "Description"],
            rows: [
              ["android:orientation", "horizontal | vertical", "Direction to arrange children"],
              ["android:layout_weight", "number (e.g., 1, 2)", "How much space each child gets proportionally"],
              ["android:gravity", "center, left, right, top, bottom", "Aligns content inside the layout"],
              ["android:layout_gravity", "center, left, right", "Aligns the view itself within parent"],
            ]
          },
          { type: "code", label: "LinearLayout example", lines: [`<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Name:" />

    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter name" />

</LinearLayout>`] },
          { type: "heading", text: "2. RelativeLayout" },
          { type: "definition", text: "RelativeLayout: Positions children RELATIVE to each other or to the parent. e.g., 'place Button below EditText', 'align Button to right of screen'." },
          { type: "table", headers: ["Attribute", "Description"],
            rows: [
              ["android:layout_below=\"@id/view1\"", "Place this view below view1"],
              ["android:layout_toRightOf=\"@id/view1\"", "Place this view to the right of view1"],
              ["android:layout_alignParentRight=\"true\"", "Align to right edge of parent"],
              ["android:layout_centerInParent=\"true\"", "Center inside parent both horizontally and vertically"],
              ["android:layout_alignParentBottom=\"true\"", "Stick to bottom of parent"],
            ]
          },
          { type: "heading", text: "3. AbsoluteLayout (Important for exams!)" },
          { type: "definition", text: "AbsoluteLayout: Places each child at EXACT X,Y coordinates. Deprecated but still asked in exams. Not recommended for real apps because it doesn't adapt to different screen sizes." },
          { type: "table", headers: ["Attribute", "Description"],
            rows: [
              ["android:layout_x", "Exact horizontal position from left edge (in dp/px)"],
              ["android:layout_y", "Exact vertical position from top edge (in dp/px)"],
              ["android:layout_width", "Width of the view"],
              ["android:layout_height", "Height of the view"],
            ]
          },
          { type: "code", label: "AbsoluteLayout Calculator (Asked in 2020!)", lines: [`<AbsoluteLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <EditText
        android:id="@+id/num1"
        android:layout_x="50dp"
        android:layout_y="50dp"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:hint="Number 1" />

    <EditText
        android:id="@+id/num2"
        android:layout_x="50dp"
        android:layout_y="120dp"
        android:layout_width="200dp"
        android:layout_height="wrap_content"
        android:hint="Number 2" />

    <Button
        android:id="@+id/btnMultiply"
        android:layout_x="50dp"
        android:layout_y="190dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Multiply" />

    <Button
        android:id="@+id/btnDivide"
        android:layout_x="180dp"
        android:layout_y="190dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Divide" />

    <TextView
        android:id="@+id/result"
        android:layout_x="50dp"
        android:layout_y="260dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Result: " />

</AbsoluteLayout>`] },
          { type: "code", label: "Calculator Java code (MainActivity.java)", lines: [`public class MainActivity extends AppCompatActivity {
    EditText num1, num2;
    Button btnMultiply, btnDivide;
    TextView result;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        num1 = findViewById(R.id.num1);
        num2 = findViewById(R.id.num2);
        btnMultiply = findViewById(R.id.btnMultiply);
        btnDivide = findViewById(R.id.btnDivide);
        result = findViewById(R.id.result);

        btnMultiply.setOnClickListener(v -> {
            double a = Double.parseDouble(num1.getText().toString());
            double b = Double.parseDouble(num2.getText().toString());
            result.setText("Result: " + (a * b));
        });

        btnDivide.setOnClickListener(v -> {
            double a = Double.parseDouble(num1.getText().toString());
            double b = Double.parseDouble(num2.getText().toString());
            if (b == 0) result.setText("Cannot divide by zero!");
            else result.setText("Result: " + (a / b));
        });
    }
}`] },
          { type: "heading", text: "4. TableLayout" },
          { type: "definition", text: "TableLayout: Arranges children in rows and columns, like an HTML table. Uses TableRow to define each row." },
          { type: "heading", text: "5. ConstraintLayout" },
          { type: "definition", text: "ConstraintLayout: The most powerful and modern layout. Each view is positioned relative to other views or the parent using constraints (connections). Recommended for complex UIs — flat hierarchy, no nesting needed." },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Widgets: TextView, EditText, Button, CheckBox, RadioButton, Spinner",
        content: [
          { type: "table", headers: ["Widget", "Purpose", "Key Attributes"],
            rows: [
              ["TextView", "Display text (read-only)", "android:text, android:textSize, android:textColor"],
              ["EditText", "User input text field", "android:hint, android:inputType (text/number/phone)"],
              ["Button", "Clickable button", "android:text, android:onClick"],
              ["CheckBox", "Toggle on/off (multiple can be selected)", "android:checked, android:text"],
              ["RadioButton", "Select one from a group (inside RadioGroup)", "android:checked, android:text"],
              ["Spinner", "Dropdown selection list", "android:entries, use Adapter in Java"],
              ["ImageView", "Display images", "android:src, android:scaleType"],
              ["Switch", "Modern on/off toggle", "android:checked, android:text"],
            ]
          },
          { type: "heading", text: "Spinner with ArrayAdapter (Asked in 2021!)" },
          { type: "code", label: "Spinner implementation", lines: [`// activity_main.xml
<Spinner
    android:id="@+id/spinner"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />`,
`// MainActivity.java
Spinner spinner = findViewById(R.id.spinner);

// Create list of items
String[] items = {"Java", "Python", "Swift", "Kotlin", "Dart"};

// ArrayAdapter connects data to the spinner
ArrayAdapter<String> adapter = new ArrayAdapter<>(
    this,
    android.R.layout.simple_spinner_item,  // built-in spinner item layout
    items
);
adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
spinner.setAdapter(adapter);

// Handle item selection
spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        String selected = items[position];
        Toast.makeText(MainActivity.this, "Selected: " + selected, Toast.LENGTH_SHORT).show();
    }
    @Override
    public void onNothingSelected(AdapterView<?> parent) { }
});`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Event Handling — 3 Ways (Asked in 2023!)",
        content: [
          { type: "definition", text: "Event: An action performed by the user (clicking a button, typing text, touching screen). Event Handling: Writing code that responds to these events." },
          { type: "heading", text: "Method 1: XML onClick Attribute" },
          { type: "code", label: "XML onClick method", lines: [`<!-- In layout XML -->
<Button
    android:id="@+id/btn"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Click Me"
    android:onClick="handleClick" />   <!-- method name -->`,
`// In MainActivity.java — method must be public, void, take View param
public void handleClick(View v) {
    Toast.makeText(this, "Button clicked!", Toast.LENGTH_SHORT).show();
}`] },
          { type: "heading", text: "Method 2: Anonymous Inner Class" },
          { type: "code", label: "Anonymous inner class listener", lines: [`Button btn = findViewById(R.id.btn);

btn.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Toast.makeText(MainActivity.this, "Clicked!", Toast.LENGTH_SHORT).show();
    }
});`] },
          { type: "heading", text: "Method 3: Lambda Expression (Modern Java)" },
          { type: "code", label: "Lambda expression listener", lines: [`Button btn = findViewById(R.id.btn);

// Cleaner modern way using lambda
btn.setOnClickListener(v -> {
    Toast.makeText(this, "Lambda clicked!", Toast.LENGTH_SHORT).show();
});`] },
          { type: "tip", label: "EXAM TIP", text: "There are 3 ways to handle events: (1) XML onClick attribute, (2) Anonymous inner class, (3) Implementing the Activity class with an interface (the activity itself becomes the listener). Lambda is a shorthand for #2." },
        ]
      },
    ]
  },
  {
    id: "u4",
    title: "Unit 4 — Android Activity",
    badge: "Chapter 4",
    color: "#B71C1C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Activity Lifecycle — All Callback Methods",
        content: [
          { type: "definition", text: "Activity: A single screen in an Android app. Every screen is one Activity. An Activity goes through a well-defined lifecycle — it's created, started, paused, stopped, and destroyed." },
          { type: "diagram", text: `
                    ┌──────────────┐
                    │  App Launched │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │  onCreate()  │  ← Create views, initialize variables
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │  onStart()   │  ← Activity becoming visible
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │  onResume()  │  ← User can now interact
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                 ┌─ │   RUNNING    │ ─┐
                 │  └──────────────┘  │
            Call comes              Home pressed
                 │                   │
                 ↓                   ↓
          ┌──────────────┐    ┌──────────────┐
          │  onPause()   │    │  onStop()    │ ← App not visible
          └──────┬───────┘    └──────┬───────┘
                 │                   │
           Returns focus         App reopened
                 │                   │
                 ↓                   ↓
          ┌──────────────┐    ┌──────────────┐
          │  onResume()  │    │  onRestart() │
          └──────────────┘    └──────────────┘
                                     ↓
                              ┌──────────────┐
                              │  onStart()   │
                              └──────────────┘

          When Android needs memory or back pressed:
                    ┌──────────────┐
                    │  onDestroy() │  ← Activity fully removed
                    └──────────────┘` },
          { type: "table", headers: ["Method", "When Called", "What to do here"],
            rows: [
              ["onCreate()", "Activity is first created", "Initialize UI (setContentView), find views, set up data"],
              ["onStart()", "Activity becomes visible", "Start animations, register receivers"],
              ["onResume()", "Activity is in foreground, user can interact", "Resume camera/sensors, start timers"],
              ["onPause()", "Another activity comes to foreground", "Save unsaved data, pause camera/audio"],
              ["onStop()", "Activity is no longer visible", "Release heavy resources"],
              ["onRestart()", "Activity coming back from stopped state", "Refresh data if needed"],
              ["onDestroy()", "Activity is finishing/being destroyed", "Clean up all resources, close DB connections"],
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Multiple Activities & Passing Data with Intent",
        content: [
          { type: "definition", text: "Intent: A message object that is used to request an action from another component. To start a new activity, create an Intent and call startActivity(). To pass data, use intent.putExtra(key, value)." },
          { type: "heading", text: "Starting a New Activity" },
          { type: "code", label: "Start SecondActivity from MainActivity", lines: [`// In MainActivity.java
Button btnNext = findViewById(R.id.btnNext);
btnNext.setOnClickListener(v -> {
    Intent intent = new Intent(MainActivity.this, SecondActivity.class);
    startActivity(intent);
});`] },
          { type: "heading", text: "Passing Data Between Activities (Asked in 2023!)" },
          { type: "code", label: "Send data using putExtra()", lines: [`// MainActivity.java — SENDING data
Intent intent = new Intent(MainActivity.this, SecondActivity.class);

// Put data with key-value pairs
intent.putExtra("name", "Hari Bahadur");
intent.putExtra("age", 22);
intent.putExtra("gender", "Male");

startActivity(intent);`] },
          { type: "code", label: "Receive data using getExtra() in SecondActivity", lines: [`// SecondActivity.java — RECEIVING data
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_second);

    // Get the Intent that started this activity
    Intent intent = getIntent();

    // Retrieve values with key name (must match what was put)
    String name   = intent.getStringExtra("name");
    int    age    = intent.getIntExtra("age", 0);     // 0 is default
    String gender = intent.getStringExtra("gender");

    // Display the received data
    TextView tv = findViewById(R.id.tvResult);
    tv.setText("Name: " + name + "\\nAge: " + age + "\\nGender: " + gender);
}`] },
          { type: "heading", text: "Volume Calculator with Two Activities (2020 Style Q)" },
          { type: "code", label: "First Activity — Input length, width, height", lines: [`// activity_first.xml — 3 EditTexts + Button
// FirstActivity.java
EditText etLength = findViewById(R.id.etLength);
EditText etWidth  = findViewById(R.id.etWidth);
EditText etHeight = findViewById(R.id.etHeight);
Button   btnCalc  = findViewById(R.id.btnCalc);

btnCalc.setOnClickListener(v -> {
    double l = Double.parseDouble(etLength.getText().toString());
    double w = Double.parseDouble(etWidth.getText().toString());
    double h = Double.parseDouble(etHeight.getText().toString());

    Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
    intent.putExtra("length", l);
    intent.putExtra("width", w);
    intent.putExtra("height", h);
    startActivity(intent);
});`] },
          { type: "code", label: "Second Activity — Calculate and show volume", lines: [`// SecondActivity.java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_second);

    Intent intent = getIntent();
    double l = intent.getDoubleExtra("length", 0);
    double w = intent.getDoubleExtra("width", 0);
    double h = intent.getDoubleExtra("height", 0);

    double volume = l * w * h;

    TextView tvResult = findViewById(R.id.tvResult);
    tvResult.setText("Volume = " + l + " × " + w + " × " + h + " = " + volume);
}`] },
          { type: "heading", text: "Getting/Setting View Data" },
          { type: "code", label: "Getting value from EditText and setting to TextView", lines: [`// Getting text from EditText
EditText etName = findViewById(R.id.etName);
String name = etName.getText().toString();

// Setting text to TextView
TextView tvHello = findViewById(R.id.tvHello);
tvHello.setText("Hello, " + name + "!");

// Getting and setting checkbox state
CheckBox cb = findViewById(R.id.checkBox);
boolean isChecked = cb.isChecked();  // get
cb.setChecked(true);                  // set`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Toast — Display and Types",
        content: [
          { type: "definition", text: "Toast: A small popup message that appears briefly on screen and then disappears automatically. Used to show short feedback messages to the user without requiring any interaction." },
          { type: "code", label: "Toast examples", lines: [`// Short toast (2 seconds)
Toast.makeText(this, "Hello World!", Toast.LENGTH_SHORT).show();

// Long toast (3.5 seconds)
Toast.makeText(this, "This is a long toast", Toast.LENGTH_LONG).show();

// Toast in event handler
btnCalc.setOnClickListener(v -> {
    int n = Integer.parseInt(etNum.getText().toString());
    int factorial = 1;
    for (int i = 1; i <= n; i++) factorial *= i;
    Toast.makeText(MainActivity.this, n + "! = " + factorial, Toast.LENGTH_LONG).show();
});`] },
        ]
      },
    ]
  },
  {
    id: "u5",
    title: "Unit 5 — Fragments, Menus & Dialogs",
    badge: "Chapter 5",
    color: "#E65100",
    sections: [
      {
        qnum: "Q1",
        qtitle: "What is a Fragment? Uses & Differences from Activity",
        content: [
          { type: "definition", text: "Fragment: A reusable portion of UI within an Activity. A Fragment has its own lifecycle, receives its own input events, and can be added or removed while the Activity is running. An Activity can contain multiple Fragments." },
          { type: "analogy", text: "If an Activity is a magazine, then Fragments are the articles inside it. You can have multiple articles (Fragments) visible at the same time on a tablet, or flip between them one at a time on a phone." },
          { type: "heading", text: "Why Use Fragments?" },
          { type: "bullets", items: [
            "**Responsive Design** – Show two panels side-by-side on tablet, single panel on phone",
            "**Reusability** – Same Fragment can be reused in multiple Activities",
            "**Modular Code** – Break complex screens into smaller manageable pieces",
            "**Better Navigation** – Navigate between fragments without creating new activities",
          ]},
          { type: "heading", text: "Activity vs Fragment — Key Differences (Asked in 2020 & 2021!)" },
          { type: "table", headers: ["Feature", "Activity", "Fragment"],
            rows: [
              ["Independence", "Completely independent", "Cannot exist without a host Activity"],
              ["Lifecycle", "Managed by Android OS directly", "Lifecycle is tied to the host Activity"],
              ["UI", "Has its own full screen layout", "Has its own partial UI (a portion of screen)"],
              ["Back Stack", "Back stack managed by system", "Fragment back stack managed by FragmentManager"],
              ["Declaration", "Must be declared in AndroidManifest.xml", "No need to declare in Manifest"],
              ["Reuse", "Hard to reuse across screens", "Easily reusable in multiple Activities"],
              ["Communication", "Via Intent", "Via Activity (shared ViewModel or interface)"],
            ]
          },
          { type: "heading", text: "Fragment Lifecycle" },
          { type: "diagram", text: `
onAttach() → onCreate() → onCreateView() → onViewCreated()
     → onStart() → onResume() → [RUNNING]
     → onPause() → onStop() → onDestroyView()
     → onDestroy() → onDetach()

Key method: onCreateView() — return your inflated layout here!` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Creating a Fragment & Adding to Activity",
        content: [
          { type: "heading", text: "Step 1: Create the Fragment class" },
          { type: "code", label: "InputFragment.java — First fragment (input)", lines: [`public class InputFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_input, container, false);

        EditText etLength = view.findViewById(R.id.etLength);
        EditText etWidth  = view.findViewById(R.id.etWidth);
        EditText etHeight = view.findViewById(R.id.etHeight);
        Button   btnCalc  = view.findViewById(R.id.btnCalc);

        btnCalc.setOnClickListener(v -> {
            double l = Double.parseDouble(etLength.getText().toString());
            double w = Double.parseDouble(etWidth.getText().toString());
            double h = Double.parseDouble(etHeight.getText().toString());

            // Pass data to ResultFragment using Bundle
            Bundle bundle = new Bundle();
            bundle.putDouble("volume", l * w * h);

            ResultFragment resultFrag = new ResultFragment();
            resultFrag.setArguments(bundle);

            // Replace the current fragment with ResultFragment
            requireActivity().getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragmentContainer, resultFrag)
                .addToBackStack(null)
                .commit();
        });

        return view;
    }
}`] },
          { type: "code", label: "ResultFragment.java — Second fragment (shows volume)", lines: [`public class ResultFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_result, container, false);

        // Get the data passed from InputFragment
        double volume = requireArguments().getDouble("volume");

        TextView tvResult = view.findViewById(R.id.tvResult);
        tvResult.setText("Volume = " + volume);

        return view;
    }
}`] },
          { type: "code", label: "MainActivity.java — Host activity with fragment container", lines: [`public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Add the initial fragment (InputFragment)
        getSupportFragmentManager()
            .beginTransaction()
            .replace(R.id.fragmentContainer, new InputFragment())
            .commit();
    }
}`] },
          { type: "code", label: "activity_main.xml — Fragment container", lines: [`<!-- Container where fragments will be placed -->
<FrameLayout
    android:id="@+id/fragmentContainer"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Alert Dialog — Create and Display",
        content: [
          { type: "definition", text: "AlertDialog: A small popup window that requires the user to make a decision or see important information. Has a title, message, and up to 3 buttons (Positive, Negative, Neutral)." },
          { type: "code", label: "Simple AlertDialog (Asked in 2021!)", lines: [`// Show a basic alert dialog
AlertDialog.Builder builder = new AlertDialog.Builder(this);

builder.setTitle("Confirm Action");
builder.setMessage("Are you sure you want to delete this item?");

builder.setPositiveButton("Yes", (dialog, which) -> {
    Toast.makeText(this, "Item deleted!", Toast.LENGTH_SHORT).show();
});

builder.setNegativeButton("No", (dialog, which) -> {
    dialog.dismiss();  // close the dialog
});

builder.setNeutralButton("Cancel", null);

AlertDialog dialog = builder.create();
dialog.show();`] },
          { type: "heading", text: "AlertDialog with Input for Factorial (Asked in 2020!)" },
          { type: "code", label: "AlertDialog with EditText input — factorial calculator", lines: [`// AlertDialog with an EditText inside
AlertDialog.Builder builder = new AlertDialog.Builder(this);
builder.setTitle("Factorial Calculator");

// Add an EditText to the dialog
final EditText input = new EditText(this);
input.setInputType(InputType.TYPE_CLASS_NUMBER);
input.setHint("Enter a number");
builder.setView(input);

builder.setPositiveButton("Calculate", (dialog, which) -> {
    int n = Integer.parseInt(input.getText().toString());

    // Calculate factorial
    long factorial = 1;
    for (int i = 1; i <= n; i++) factorial *= i;

    // Show result in Toast
    Toast.makeText(this, n + "! = " + factorial, Toast.LENGTH_LONG).show();
});

builder.setNegativeButton("Cancel", (dialog, which) -> dialog.dismiss());

builder.show();`] },
          { type: "heading", text: "Custom Dialog" },
          { type: "code", label: "Custom Dialog with custom layout", lines: [`// 1. Create dialog_custom.xml layout with your fields
// 2. In Java:
Dialog dialog = new Dialog(this);
dialog.setContentView(R.layout.dialog_custom);  // your custom layout

// Find views inside the dialog
EditText etPrincipal = dialog.findViewById(R.id.etPrincipal);
EditText etRate      = dialog.findViewById(R.id.etRate);
EditText etTime      = dialog.findViewById(R.id.etTime);
Button   btnCalc     = dialog.findViewById(R.id.btnCalc);
TextView tvResult    = dialog.findViewById(R.id.tvResult);

btnCalc.setOnClickListener(v -> {
    double p = Double.parseDouble(etPrincipal.getText().toString());
    double r = Double.parseDouble(etRate.getText().toString());
    double t = Double.parseDouble(etTime.getText().toString());

    double si = (p * r * t) / 100;
    tvResult.setText("Simple Interest = " + si);
});

dialog.show();  // display the dialog`] },
        ]
      },
      {
        qnum: "Q4",
        qtitle: "Menus — Options, Context & Popup",
        content: [
          { type: "table", headers: ["Menu Type", "How to Open", "Use Case"],
            rows: [
              ["Options Menu", "Three-dot (⋮) button or hardware menu key", "App-level actions: Settings, About, Search"],
              ["Context Menu", "Long press on a View", "Actions for a specific item: Copy, Delete, Share"],
              ["Popup Menu", "Triggered by button click", "Dropdown-style choices near a specific view"],
            ]
          },
          { type: "code", label: "Context Menu — Change background color (Asked in 2020!)", lines: [`// In MainActivity.java:

@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Register the layout for context menu
    View mainLayout = findViewById(R.id.mainLayout);
    registerForContextMenu(mainLayout);
}

// Step 2: Create the menu
@Override
public void onCreateContextMenu(ContextMenu menu, View v,
                                ContextMenu.ContextMenuInfo menuInfo) {
    super.onCreateContextMenu(menu, v, menuInfo);
    menu.setHeaderTitle("Choose Color");
    menu.add(0, 1, 0, "Red");
    menu.add(0, 2, 0, "Yellow");
    menu.add(0, 3, 0, "Green");
    menu.add(0, 4, 0, "Black");
    menu.add(0, 5, 0, "Blue");
}

// Step 3: Handle menu item click
@Override
public boolean onContextItemSelected(MenuItem item) {
    View mainLayout = findViewById(R.id.mainLayout);
    switch (item.getItemId()) {
        case 1: mainLayout.setBackgroundColor(Color.RED);    return true;
        case 2: mainLayout.setBackgroundColor(Color.YELLOW); return true;
        case 3: mainLayout.setBackgroundColor(Color.GREEN);  return true;
        case 4: mainLayout.setBackgroundColor(Color.BLACK);  return true;
        case 5: mainLayout.setBackgroundColor(Color.BLUE);   return true;
    }
    return super.onContextItemSelected(item);
}`] },
        ]
      },
    ]
  },
  {
    id: "u6",
    title: "Unit 6 — ListView, GridView & RecyclerView",
    badge: "Chapter 6",
    color: "#00695C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "ListView vs RecyclerView (Asked in 2023!)",
        content: [
          { type: "table", headers: ["Feature", "ListView", "RecyclerView"],
            rows: [
              ["Package", "android.widget.ListView", "androidx.recyclerview.widget.RecyclerView"],
              ["ViewHolder", "Optional (manual, leads to slow scrolling)", "Mandatory (built into design — always fast)"],
              ["Layout Managers", "Only vertical list", "LinearLayout (list), GridLayout, StaggeredGrid"],
              ["Animation", "No built-in item animations", "Built-in ItemAnimator for add/remove animations"],
              ["Performance", "Slower for large data (recycles inefficiently)", "Highly optimized recycling — smooth scrolling"],
              ["Dividers", "Built-in divider support", "Must add manually via ItemDecoration"],
              ["Click Listeners", "setOnItemClickListener()", "Add in ViewHolder or use onCreateViewHolder"],
            ]
          },
          { type: "analogy", text: "ListView is like a simple bus — it gets you there, but slowly when full. RecyclerView is like a high-speed train — more setup needed, but handles large crowds (data) much more efficiently." },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Simple ListView — Display 8 Programming Languages (Asked 2021!)",
        content: [
          { type: "code", label: "Simple ListView with array (activity_main.xml)", lines: [`<ListView
    android:id="@+id/listView"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`] },
          { type: "code", label: "MainActivity.java — Simple ListView", lines: [`public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ListView listView = findViewById(R.id.listView);

        // Data to display
        String[] languages = {
            "Java", "Python", "Swift", "Kotlin",
            "Dart", "C++", "JavaScript", "PHP"
        };

        // ArrayAdapter wraps the array data for the ListView
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
            this,
            android.R.layout.simple_list_item_1,  // built-in layout
            languages
        );

        listView.setAdapter(adapter);

        // Handle item click
        listView.setOnItemClickListener((parent, view, position, id) -> {
            Toast.makeText(this, "Selected: " + languages[position],
                Toast.LENGTH_SHORT).show();
        });
    }
}`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Custom ListView — Student List with Fragment Detail (Asked 2021!)",
        content: [
          { type: "explain", text: "For a custom ListView with student names and show details in a fragment when clicked — create a Model class, custom adapter, and fragment to display details." },
          { type: "code", label: "Student.java — Model class", lines: [`public class Student {
    int roll;
    String name, address;

    public Student(int roll, String name, String address) {
        this.roll = roll;
        this.name = name;
        this.address = address;
    }
}`] },
          { type: "code", label: "MainActivity.java — ListView with student names, click shows details in fragment", lines: [`public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Sample data
        List<Student> students = new ArrayList<>();
        students.add(new Student(1, "Hari Bahadur", "Kathmandu"));
        students.add(new Student(2, "Sita Kumari", "Pokhara"));
        students.add(new Student(3, "Ram Prasad", "Biratnagar"));

        // Get just the names for ListView
        String[] names = new String[students.size()];
        for (int i = 0; i < students.size(); i++) names[i] = students.get(i).name;

        ListView listView = findViewById(R.id.listView);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
            this, android.R.layout.simple_list_item_1, names);
        listView.setAdapter(adapter);

        // Load empty detail fragment initially
        getSupportFragmentManager().beginTransaction()
            .replace(R.id.detailContainer, new DetailFragment())
            .commit();

        listView.setOnItemClickListener((parent, view, position, id) -> {
            Student s = students.get(position);

            Bundle bundle = new Bundle();
            bundle.putInt("roll", s.roll);
            bundle.putString("name", s.name);
            bundle.putString("address", s.address);

            DetailFragment detail = new DetailFragment();
            detail.setArguments(bundle);

            getSupportFragmentManager().beginTransaction()
                .replace(R.id.detailContainer, detail)
                .commit();
        });
    }
}`] },
          { type: "code", label: "DetailFragment.java — Shows student info", lines: [`public class DetailFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_detail, container, false);
        TextView tvDetail = view.findViewById(R.id.tvDetail);

        if (getArguments() != null) {
            int roll      = getArguments().getInt("roll");
            String name   = getArguments().getString("name");
            String address = getArguments().getString("address");
            tvDetail.setText("Roll: " + roll + "\\nName: " + name + "\\nAddress: " + address);
        } else {
            tvDetail.setText("Select a student from the list");
        }
        return view;
    }
}`] },
        ]
      },
      {
        qnum: "Q4",
        qtitle: "RecyclerView — MVC Pattern with ViewHolder",
        content: [
          { type: "heading", text: "RecyclerView Setup (3 Things Needed)" },
          { type: "bullets", items: [
            "**Model class** – Your data object (e.g., Student, Product)",
            "**Adapter class** – Extends RecyclerView.Adapter, has ViewHolder",
            "**Layout Manager** – LinearLayoutManager (list) or GridLayoutManager (grid)",
          ]},
          { type: "code", label: "Full RecyclerView Example", lines: [`// 1. Model class
public class AppInfo {
    String name, website;
    int logoResId;
    public AppInfo(String name, String website, int logoResId) {
        this.name = name; this.website = website; this.logoResId = logoResId;
    }
}`,
`// 2. Adapter with ViewHolder
public class AppAdapter extends RecyclerView.Adapter<AppAdapter.ViewHolder> {

    List<AppInfo> appList;
    Context context;

    public AppAdapter(Context context, List<AppInfo> list) {
        this.context = context;
        this.appList = list;
    }

    // ViewHolder: holds references to views in each row
    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName;
        ImageView ivLogo;

        public ViewHolder(View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvName);
            ivLogo = itemView.findViewById(R.id.ivLogo);
        }
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        // Inflate your row layout
        View view = LayoutInflater.from(context)
                .inflate(R.layout.item_app, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        // Bind data to views for this position
        AppInfo app = appList.get(position);
        holder.tvName.setText(app.name);
        holder.ivLogo.setImageResource(app.logoResId);

        // Click listener
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, DetailActivity.class);
            intent.putExtra("website", app.website);
            context.startActivity(intent);
        });
    }

    @Override
    public int getItemCount() { return appList.size(); }
}`,
`// 3. MainActivity — set up RecyclerView
RecyclerView recyclerView = findViewById(R.id.recyclerView);
recyclerView.setLayoutManager(new LinearLayoutManager(this));

// For Grid (2 columns):
// recyclerView.setLayoutManager(new GridLayoutManager(this, 2));

List<AppInfo> apps = new ArrayList<>();
apps.add(new AppInfo("YouTube", "youtube.com", R.drawable.youtube));
apps.add(new AppInfo("Facebook", "facebook.com", R.drawable.facebook));
apps.add(new AppInfo("Twitter", "twitter.com", R.drawable.twitter));

AppAdapter adapter = new AppAdapter(this, apps);
recyclerView.setAdapter(adapter);`] },
        ]
      },
    ]
  },
  {
    id: "u7",
    title: "Unit 7 — SQLite, JSON, Volley & Maps",
    badge: "Chapter 7",
    color: "#4527A0",
    sections: [
      {
        qnum: "Q1",
        qtitle: "SQLite — Data Types & Full CRUD Operations (Asked 2023!)",
        content: [
          { type: "heading", text: "SQLite Data Types" },
          { type: "table", headers: ["SQLite Type", "Description", "Java Equivalent"],
            rows: [
              ["INTEGER", "Whole number (0, -5, 100)", "int / long"],
              ["TEXT", "String of characters", "String"],
              ["REAL", "Decimal number (3.14)", "double / float"],
              ["BLOB", "Binary data (images, files)", "byte[]"],
              ["NULL", "No value / unknown", "null"],
            ]
          },
          { type: "heading", text: "College-Student Database (Asked 2023!)" },
          { type: "code", label: "DatabaseHelper.java — SQLiteOpenHelper", lines: [`public class DatabaseHelper extends SQLiteOpenHelper {

    // Database constants
    static final String DB_NAME    = "College";
    static final int    DB_VERSION = 1;

    // Table constants
    static final String TABLE      = "Student";
    static final String COL_ROLL   = "Roll";
    static final String COL_NAME   = "Name";
    static final String COL_ADDR   = "Address";

    public DatabaseHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Create table when DB is first created
        String query = "CREATE TABLE " + TABLE + " (" +
                       COL_ROLL + " INTEGER PRIMARY KEY, " +
                       COL_NAME + " TEXT, " +
                       COL_ADDR + " TEXT)";
        db.execSQL(query);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + TABLE);
        onCreate(db);
    }

    // INSERT a student record
    public boolean insertStudent(int roll, String name, String address) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_ROLL, roll);
        values.put(COL_NAME, name);
        values.put(COL_ADDR, address);
        long result = db.insert(TABLE, null, values);
        return result != -1;  // -1 means insert failed
    }

    // READ all students
    public Cursor getAllStudents() {
        SQLiteDatabase db = this.getReadableDatabase();
        return db.rawQuery("SELECT * FROM " + TABLE, null);
    }

    // UPDATE a student
    public boolean updateStudent(int roll, String name, String address) {
        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put(COL_NAME, name);
        values.put(COL_ADDR, address);
        int rows = db.update(TABLE, values, COL_ROLL + "=?",
                             new String[]{String.valueOf(roll)});
        return rows > 0;
    }

    // DELETE a student
    public boolean deleteStudent(int roll) {
        SQLiteDatabase db = this.getWritableDatabase();
        int rows = db.delete(TABLE, COL_ROLL + "=?",
                             new String[]{String.valueOf(roll)});
        return rows > 0;
    }
}`] },
          { type: "code", label: "MainActivity.java — Insert 5 students and display all", lines: [`public class MainActivity extends AppCompatActivity {

    DatabaseHelper dbHelper;
    ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dbHelper = new DatabaseHelper(this);
        listView = findViewById(R.id.listView);

        // Insert 5 students
        dbHelper.insertStudent(1, "Hari Bahadur", "Kathmandu");
        dbHelper.insertStudent(2, "Sita Kumari", "Pokhara");
        dbHelper.insertStudent(3, "Ram Prasad", "Biratnagar");
        dbHelper.insertStudent(4, "Gita Shrestha", "Lalitpur");
        dbHelper.insertStudent(5, "Bikash Tamang", "Bhaktapur");

        // Display all students
        displayStudents();
    }

    void displayStudents() {
        Cursor cursor = dbHelper.getAllStudents();
        ArrayList<String> list = new ArrayList<>();

        while (cursor.moveToNext()) {
            int    roll    = cursor.getInt(0);
            String name    = cursor.getString(1);
            String address = cursor.getString(2);
            list.add("Roll: " + roll + "  Name: " + name + "  Addr: " + address);
        }
        cursor.close();

        ArrayAdapter<String> adapter = new ArrayAdapter<>(
            this, android.R.layout.simple_list_item_1, list);
        listView.setAdapter(adapter);
    }
}`] },
          { type: "heading", text: "Hospital DB — Doctor with experience < 5.5 years (2020 Group C)" },
          { type: "code", label: "Filter query for experience < 5.5", lines: [`// In DatabaseHelper.java, add this method:
public Cursor getDoctorsUnder5Point5Years() {
    SQLiteDatabase db = this.getReadableDatabase();
    // SQL WHERE clause to filter
    return db.rawQuery(
        "SELECT * FROM Doctor WHERE Experience < 5.5", null);
}

// In MainActivity, display filtered results:
Cursor cursor = dbHelper.getDoctorsUnder5Point5Years();
while (cursor.moveToNext()) {
    int    did  = cursor.getInt(0);
    String name = cursor.getString(1);
    String spec = cursor.getString(2);
    double exp  = cursor.getDouble(3);
    list.add(name + " | " + spec + " | " + exp + " yrs");
}`] },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "JSON — Encoding in PHP & Decoding in Android (Asked 2020!)",
        content: [
          { type: "definition", text: "JSON (JavaScript Object Notation): A lightweight data format used to exchange data between a server and Android app. It uses key-value pairs (objects) and arrays, and is easy for both humans and machines to read." },
          { type: "heading", text: "JSON Structure" },
          { type: "code", label: "JSON object and array examples", lines: [`// JSON Object (one item)
{
  "roll": 1,
  "name": "Hari Bahadur",
  "address": "Kathmandu"
}

// JSON Array (multiple items)
[
  {"roll": 1, "name": "Hari", "address": "Kathmandu"},
  {"roll": 2, "name": "Sita", "address": "Pokhara"},
  {"roll": 3, "name": "Ram",  "address": "Biratnagar"}
]`] },
          { type: "heading", text: "PHP Encoding (Server side — sends JSON to Android)" },
          { type: "code", label: "server.php — Fetch from MySQL and send as JSON", lines: [`<?php
// Connect to database
$conn = mysqli_connect("localhost", "root", "", "College");

// Fetch students
$query = "SELECT * FROM Student";
$result = mysqli_query($conn, $query);

$students = [];
while ($row = mysqli_fetch_assoc($result)) {
    $students[] = $row;  // add each row to array
}

// Encode as JSON and send
header('Content-Type: application/json');
echo json_encode($students);
?>`] },
          { type: "heading", text: "Java Decoding (Android side — reads JSON)" },
          { type: "code", label: "Decode JSON in Android Java", lines: [`// Assuming 'response' is the JSON string received from server
try {
    // If response is a JSON Array:
    JSONArray jsonArray = new JSONArray(response);

    for (int i = 0; i < jsonArray.length(); i++) {
        JSONObject obj = jsonArray.getJSONObject(i);

        int    roll    = obj.getInt("roll");
        String name    = obj.getString("name");
        String address = obj.getString("address");

        Log.d("JSON", roll + " - " + name + " - " + address);
    }

    // If response is a JSON Object:
    JSONObject obj = new JSONObject(response);
    String name = obj.getString("name");
    int age     = obj.getInt("age");

} catch (JSONException e) {
    e.printStackTrace();
}`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Volley Library — HTTP GET/POST Requests (Asked 2021!)",
        content: [
          { type: "definition", text: "Volley: An Android library by Google that makes HTTP networking easy. It handles threading automatically — network calls happen in background, response comes back on main thread. Add to build.gradle: implementation 'com.android.volley:volley:1.2.1'" },
          { type: "heading", text: "Volley GET Request — Retrieve from Server" },
          { type: "code", label: "Volley GET request (retrieving students from server)", lines: [`// In MainActivity.java

String url = "http://yourserver.com/api/students.php";

// Create request queue
RequestQueue queue = Volley.newRequestQueue(this);

// StringRequest for getting raw string response
StringRequest stringRequest = new StringRequest(
    Request.Method.GET,
    url,
    response -> {  // onResponse
        try {
            JSONArray arr = new JSONArray(response);
            ArrayList<String> list = new ArrayList<>();
            for (int i = 0; i < arr.length(); i++) {
                JSONObject obj = arr.getJSONObject(i);
                list.add(obj.getString("name") + " - " + obj.getString("address"));
            }
            ArrayAdapter<String> adapter = new ArrayAdapter<>(
                this, android.R.layout.simple_list_item_1, list);
            listView.setAdapter(adapter);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    },
    error -> {  // onErrorResponse
        Toast.makeText(this, "Error: " + error.getMessage(), Toast.LENGTH_SHORT).show();
    }
);

queue.add(stringRequest);  // add request to queue — it will be executed`] },
          { type: "heading", text: "Volley POST Request — Send data to server" },
          { type: "code", label: "Volley POST request", lines: [`String url = "http://yourserver.com/api/insert_student.php";

StringRequest postRequest = new StringRequest(
    Request.Method.POST,
    url,
    response -> Toast.makeText(this, "Inserted: " + response, Toast.LENGTH_SHORT).show(),
    error   -> Toast.makeText(this, "Error!", Toast.LENGTH_SHORT).show()
) {
    // Override getParams() to add POST parameters
    @Override
    protected Map<String, String> getParams() {
        Map<String, String> params = new HashMap<>();
        params.put("roll", "6");
        params.put("name", "New Student");
        params.put("address", "Chitwan");
        return params;
    }
};

Volley.newRequestQueue(this).add(postRequest);`] },
          { type: "warning", text: "Add INTERNET permission in AndroidManifest.xml: <uses-permission android:name='android.permission.INTERNET' /> and add Volley to build.gradle: implementation 'com.android.volley:volley:1.2.1'" },
        ]
      },
      {
        qnum: "Q4",
        qtitle: "Google Maps Integration (Asked 2021!)",
        content: [
          { type: "heading", text: "Steps to Add Google Maps" },
          { type: "bullets", items: [
            "Get **Google Maps API key** from Google Cloud Console",
            "Add API key in **AndroidManifest.xml** under `<application>` tag",
            "Add dependency: `implementation 'com.google.android.gms:play-services-maps:18.2.0'`",
            "Use **SupportMapFragment** or **MapView** in your layout",
            "Implement **OnMapReadyCallback** in your Activity",
          ]},
          { type: "code", label: "Location tracking (Java + Manifest)", lines: [`// activity_main.xml
<fragment
    android:id="@+id/map"
    android:name="com.google.android.gms.maps.SupportMapFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />`,
`// MainActivity.java — implement OnMapReadyCallback
public class MainActivity extends AppCompatActivity
        implements OnMapReadyCallback {

    private GoogleMap mMap;
    private FusedLocationProviderClient fusedLocationClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SupportMapFragment mapFragment = (SupportMapFragment)
            getSupportFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        // Get current location and add marker
        if (ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {

            fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
                if (location != null) {
                    LatLng current = new LatLng(
                        location.getLatitude(), location.getLongitude());
                    mMap.addMarker(new MarkerOptions()
                        .position(current).title("You are here"));
                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(current, 15));
                }
            });
        }
    }
}`,
`<!-- AndroidManifest.xml — add inside <application> tag -->
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY_HERE" />

<!-- Add permissions before <application> -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />`] },
        ]
      },
      {
        qnum: "Q5",
        qtitle: "Generating a Signed APK — Publishing to Play Store (Asked 2021!)",
        content: [
          { type: "definition", text: "Signed APK: An Android app package (APK file) signed with a private key certificate. Google Play Store requires all apps to be signed before publishing. The signature proves the APK came from the original developer." },
          { type: "heading", text: "Steps to Generate Signed APK" },
          { type: "bullets", items: [
            "Go to **Build** menu in Android Studio → **Generate Signed Bundle / APK**",
            "Choose **APK** option → Click **Next**",
            "Click **Create New** to create a keystore file (or choose existing one)",
            "Fill keystore details: **path**, **password**, **alias**, **key password**, **validity** (years)",
            "Fill certificate info: Name, Organization, City, Country code",
            "Click **Next** → Select **release** build variant",
            "Choose **V1** and/or **V2 Signature Version** → Click **Finish**",
            "APK is generated in `app/release/app-release.apk`",
          ]},
          { type: "heading", text: "APK File Contents" },
          { type: "table", headers: ["File/Folder in APK", "Contents"],
            rows: [
              ["classes.dex", "Compiled Dalvik bytecode (your Java/Kotlin code)"],
              ["AndroidManifest.xml", "Binary encoded manifest (permissions, components)"],
              ["res/", "Compiled resources (layouts, drawables, strings)"],
              ["resources.arsc", "Compiled resource table mapping IDs to values"],
              ["META-INF/", "Signing certificate and signature files"],
              ["assets/", "Raw files (not compiled) — fonts, databases, etc."],
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u8",
    title: "Unit 8 — iOS Programming & Swift",
    badge: "Chapter 8",
    color: "#880E4F",
    sections: [
      {
        qnum: "Q1",
        qtitle: "iOS View Hierarchy (Asked 2020, 2021!)",
        content: [
          { type: "definition", text: "View Hierarchy: In iOS, every screen element is a 'view' (UIView). Views are arranged in a parent-child tree structure. The topmost view is the UIWindow → UIViewController's view → subviews (buttons, labels, etc.)." },
          { type: "diagram", text: `
┌──────────────────────────────────────────────────────┐
│                    UIApplication                     │
│                         │                            │
│                    UIWindow                          │
│                         │                            │
│             UIViewController (root)                  │
│                         │                            │
│                    UIView (main view)                │
│            ┌────────────┼──────────────┐             │
│       UILabel      UITextField    UIButton            │
│    "Enter Name"   (input field)  [Submit]             │
│                         │                            │
│               UIStackView                            │
│          ┌──────────────┴──────────────┐             │
│       UILabel                    UIImageView          │
│    (result text)                 (logo)               │
└──────────────────────────────────────────────────────┘` },
          { type: "table", headers: ["Component", "Description"],
            rows: [
              ["UIApplication", "The app itself — manages the run loop and app lifecycle"],
              ["UIWindow", "Container for all visible content — usually one per app"],
              ["UIViewController", "Controls one screen's logic and manages its views"],
              ["UIView", "The base class for all UI elements — can contain other views"],
              ["UILabel", "Display read-only text"],
              ["UITextField", "Single-line text input"],
              ["UITextView", "Multi-line text input/display"],
              ["UIButton", "Tappable button"],
              ["UIImageView", "Display images"],
              ["UIStackView", "Automatic stack layout (horizontal or vertical)"],
              ["UITableView", "Scrollable list of rows (like Android ListView)"],
              ["UIScrollView", "Scrollable container for content larger than screen"],
            ]
          },
          { type: "heading", text: "IBOutlet & IBAction" },
          { type: "definition", text: "IBOutlet: A connection from a UI control in Storyboard to a property in your Swift code. Allows you to read/change the control in code. IBAction: A connection from a UI control event (like button tap) to a function in Swift code." },
          { type: "code", label: "ViewController.swift — IBOutlet and IBAction", lines: [`import UIKit

class ViewController: UIViewController {

    // IBOutlet — reference to a UI control (text field/label)
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var resultLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        resultLabel.text = "Welcome!"
    }

    // IBAction — called when button is tapped
    @IBAction func submitButtonTapped(_ sender: UIButton) {
        let name = nameTextField.text ?? "Unknown"
        resultLabel.text = "Hello, \\(name)!"
    }
}`] },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Swift Language Basics",
        content: [
          { type: "heading", text: "Variables, Constants & Data Types" },
          { type: "code", label: "Swift basics", lines: [`// var = variable (can change)
// let = constant (cannot change)
var name: String = "Hari"
let pi: Double = 3.14159
var age: Int = 22
var isStudent: Bool = true

// Type inference (Swift figures out the type)
var city = "Pokhara"   // inferred as String
let score = 95         // inferred as Int

// Optionals — may or may not have a value
var email: String? = nil    // optional string
email = "hari@email.com"

// Unwrapping optionals
if let unwrappedEmail = email {
    print("Email: \\(unwrappedEmail)")
}

// String interpolation
print("Name: \\(name), Age: \\(age)")`] },
          { type: "heading", text: "Control Flow" },
          { type: "code", label: "Swift if/switch/loops", lines: [`// If-else
var marks = 75
if marks >= 60 {
    print("Pass")
} else if marks >= 40 {
    print("Fail")
} else {
    print("Very low")
}

// Switch
let day = "Monday"
switch day {
    case "Monday", "Tuesday": print("Early week")
    case "Friday":            print("TGIF!")
    default:                  print("Mid week")
}

// For loop
for i in 1...5 {      // 1, 2, 3, 4, 5
    print("Count: \\(i)")
}

// While loop
var x = 1
while x <= 5 {
    print(x)
    x += 1
}`] },
          { type: "heading", text: "Arrays and Functions" },
          { type: "code", label: "Swift array operations", lines: [`// Array declaration
var numbers: [Int] = [10, 20, 30, 40, 50]
var fruits = ["Apple", "Banana", "Mango"]  // type inferred

// Access elements
print(fruits[0])       // Apple
print(fruits.count)    // 3

// Add and remove
fruits.append("Orange")
fruits.remove(at: 1)   // removes Banana

// Loop through array
for fruit in fruits {
    print(fruit)
}

// Functions
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}
print(greet(name: "Hari"))   // Hello, Hari!

func add(a: Int, b: Int) -> Int {
    return a + b
}
print(add(a: 5, b: 3))  // 8`] },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Swift Program — Sum of Array Elements (Asked 2020, 2023!)",
        content: [
          { type: "code", label: "Sum of all elements of a 1-D array", lines: [`// Swift program to find sum of all elements of a 1D array

import Foundation

func sumOfArray(_ arr: [Int]) -> Int {
    var sum = 0
    for element in arr {
        sum += element
    }
    return sum
}

// Test the function
let numbers = [10, 20, 30, 40, 50]
let total = sumOfArray(numbers)
print("Array: \\(numbers)")
print("Sum of all elements = \\(total)")

// Shorter version using reduce:
let sum2 = numbers.reduce(0, +)
print("Sum (using reduce) = \\(sum2)")

/* OUTPUT:
Array: [10, 20, 30, 40, 50]
Sum of all elements = 150
Sum (using reduce) = 150
*/`] },
          { type: "heading", text: "Swift Program — Factorial (Asked 2021!)" },
          { type: "code", label: "Factorial of a number using recursion", lines: [`// Swift function to calculate factorial
func factorial(_ n: Int) -> Int {
    if n == 0 || n == 1 {
        return 1      // base case
    }
    return n * factorial(n - 1)   // recursive call
}

// Test
for n in [0, 1, 5, 7, 10] {
    print("\\(n)! = \\(factorial(n))")
}

/* OUTPUT:
0! = 1
1! = 1
5! = 120
7! = 5040
10! = 3628800
*/`] },
          { type: "heading", text: "Swift Program — Simple Interest" },
          { type: "code", label: "Calculate simple interest", lines: [`// Simple Interest = (P × R × T) / 100
func simpleInterest(principal: Double, rate: Double, time: Double) -> Double {
    return (principal * rate * time) / 100.0
}

let p = 10000.0   // principal
let r = 8.5       // rate %
let t = 3.0       // time in years

let si = simpleInterest(principal: p, rate: r, time: t)
print("Principal = \\(p)")
print("Rate = \\(r)%")
print("Time = \\(t) years")
print("Simple Interest = \\(si)")
print("Total Amount = \\(p + si)")

/* OUTPUT:
Principal = 10000.0
Rate = 8.5%
Time = 3.0 years
Simple Interest = 2550.0
Total Amount = 12550.0
*/`] },
          { type: "heading", text: "iOS UI Controls (Asked 2023!)" },
          { type: "table", headers: ["UI Control", "Description"],
            rows: [
              ["UILabel", "Display static or dynamic text"],
              ["UITextField", "Single-line text input field"],
              ["UITextView", "Multi-line text input area"],
              ["UIButton", "Tappable button for triggering actions"],
              ["UIImageView", "Display images from assets or URL"],
              ["UISwitch", "On/Off toggle switch"],
              ["UISlider", "Select a value from a range by dragging"],
              ["UISegmentedControl", "Select one option from segmented bar"],
              ["UIStepper", "Increment/decrement a value with + / - buttons"],
              ["UIPickerView", "Scrollable wheel picker (like Spinner in Android)"],
              ["UIProgressView", "Show progress bar"],
              ["UITableView", "Scrollable list of rows with sections"],
              ["UICollectionView", "Grid/collection of cells (like RecyclerView)"],
              ["UIDatePicker", "Select date and time"],
              ["UIAlertController", "Alert dialog with message and buttons"],
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u9",
    title: "Unit 9 — 2026 Exam Predictions 🎯",
    badge: "High Probability Questions",
    color: "#C62828",
    sections: [
      {
        qnum: "PRED",
        qtitle: "2026 Predicted Questions — Group B (5 Marks Each)",
        content: [
          { type: "warning", text: "These are predictions based on 3 years of past papers (2020, 2021, 2023). Study every question listed here carefully!" },
          { type: "table", headers: ["Question", "Why It Will Come", "Unit"],
            rows: [
              ["Explain Android Architecture with diagram", "Asked in 2023 — architecture diagram is standard exam content", "Unit 2"],
              ["DVM vs ART — differences", "Asked 2020, skipped 2021 & 2023 — due again", "Unit 2"],
              ["Activity lifecycle — explain all methods with diagram", "Never directly asked but highly relevant — lifecycle diagrams are fundamental", "Unit 4"],
              ["3 ways to handle events in Android", "Asked 2023 — very likely to repeat as it's simple to test", "Unit 3"],
              ["Fragment vs Activity differences", "Asked 2020 & 2021 — popular topic", "Unit 5"],
              ["iOS UI controls + Swift array sum", "Asked EVERY year (2020, 2021, 2023) — will definitely appear!", "Unit 8"],
              ["How to find a view element + dialog types", "Asked 2023 — similar question highly probable", "Unit 5"],
              ["What is RecyclerView vs ListView?", "Asked 2023 — fundamental difference question", "Unit 6"],
              ["AbsoluteLayout — attributes + simple app", "Asked 2020 — layouts are common exam material", "Unit 3"],
              ["What is JSON? Decode JSON in Android", "Asked 2020 — API/JSON questions very popular", "Unit 7"],
            ]
          },
          { type: "heading", text: "2026 Predicted Questions — Group C (10 Marks Each)" },
          { type: "table", headers: ["Question", "Why It Will Come", "Unit"],
            rows: [
              ["SQLite CRUD — Hospital/Student/Doctor database with full code", "Asked 2020 & 2023 — largest 10-mark coding question", "Unit 7"],
              ["Custom ListView — display students, click to show details in Fragment", "Asked 2021 (10 marks) — combines multiple concepts", "Unit 5+6"],
              ["Pass personal info between activities (Name, Age, Gender)", "Asked 2023 — passing data with Intent is always tested", "Unit 4"],
              ["Retrieve content from remote server using Volley", "Asked 2021 — network/API question is always in Group C", "Unit 7"],
              ["Volume calculator using Fragments — input in one, result in another", "Asked 2020 — fragment communication is key concept", "Unit 5"],
              ["Calculator app using AbsoluteLayout", "Asked 2020 — layout + logic combination", "Unit 3"],
              ["Simple interest with custom dialog box", "Asked 2023 — custom dialog + calculation = common pattern", "Unit 5"],
              ["RecyclerView/GridView — show apps with logo, click to open website", "Asked 2020 (Group C) — RecyclerView is modern must-know", "Unit 6"],
            ]
          },
          { type: "heading", text: "Top 5 Must-Know Code Snippets" },
          { type: "bullets", items: [
            "**SQLite CRUD** — Create table, insert, select, update, delete (always comes!)",
            "**Intent + putExtra/getExtra** — Passing data between activities",
            "**Fragment + Bundle** — Passing data between fragments",
            "**Volley GET request** — Fetching JSON from server",
            "**Swift programs** — Array sum, factorial (asked every single year)",
          ]},
          { type: "tip", label: "STRATEGY", text: "For 2026: Master SQLite CRUD completely (10 marks guaranteed). Learn one Volley example perfectly. Know Fragment data passing with Bundle. For Swift — memorize the array sum and factorial programs. For Android Architecture — memorize the 5-layer diagram with names." },
        ]
      },
      {
        qnum: "CHEAT",
        qtitle: "Quick Reference — Important Concepts Summary",
        content: [
          { type: "heading", text: "Android Architecture Layers (memorize order!)" },
          { type: "bullets", items: [
            "Layer 5 (Top): **Applications** — Pre-installed + Play Store apps",
            "Layer 4: **Application Framework** — Activity Mgr, View System, Package Mgr",
            "Layer 3: **Android Runtime** — DVM/ART + Core Libraries",
            "Layer 2: **Platform Libraries** — SQLite, OpenGL, WebKit, Media, SSL",
            "Layer 1 (Bottom): **Linux Kernel** — Hardware drivers, memory, security",
          ]},
          { type: "heading", text: "Activity Lifecycle Order (memorize!)" },
          { type: "diagram", text: `
  Create:  onCreate → onStart → onResume → [User uses app]
  Pause:   onPause → [Another app in front]
  Return:  onResume
  Stop:    onStop → [App in background]
  Restart: onRestart → onStart → onResume
  Destroy: onDestroy → [App killed]` },
          { type: "heading", text: "Intent Data Types — putExtra / getExtra" },
          { type: "table", headers: ["Data Type", "put method", "get method"],
            rows: [
              ["String", "putExtra(\"key\", \"value\")", "getStringExtra(\"key\")"],
              ["int", "putExtra(\"key\", 42)", "getIntExtra(\"key\", 0)"],
              ["double", "putExtra(\"key\", 3.14)", "getDoubleExtra(\"key\", 0.0)"],
              ["boolean", "putExtra(\"key\", true)", "getBooleanExtra(\"key\", false)"],
            ]
          },
          { type: "heading", text: "Layout Quick Summary" },
          { type: "table", headers: ["Layout", "Key Attribute", "Use When"],
            rows: [
              ["LinearLayout", "android:orientation", "Simple row or column arrangement"],
              ["RelativeLayout", "layout_below, layout_toRightOf", "Relative to other views"],
              ["AbsoluteLayout", "layout_x, layout_y", "Exact pixel position (exam question)"],
              ["ConstraintLayout", "constraints to parent/views", "Complex, modern layouts"],
              ["TableLayout", "TableRow", "Grid-like table structure"],
            ]
          },
          { type: "heading", text: "Swift Cheat Sheet" },
          { type: "code", label: "Swift quick reference", lines: [`// Variables
var x = 5          // mutable
let y = 10         // constant (immutable)

// String interpolation
print("Sum = \\(x + y)")

// Array
var arr = [1, 2, 3, 4, 5]
var sum = 0
for n in arr { sum += n }   // sum = 15

// Function
func factorial(_ n: Int) -> Int {
    return n <= 1 ? 1 : n * factorial(n - 1)
}

// Optional
var name: String? = "Hari"
if let n = name { print(n) }

// IBOutlet — connects Storyboard control to code variable
// IBAction  — connects Storyboard event to code function`] },
        ]
      },
    ]
  },
];

// ─── COLORS ──────────────────────────────────────────────────────────
const COLORS = {
  bg: "#F0F4F8",
  surface: "#FFFFFF",
  border: "#DDE3EA",
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

// ─── CODE BLOCK ───────────────────────────────────────────────────────
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

// ─── CONTENT BLOCK ────────────────────────────────────────────────────
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

export default function MobileProgramming() {
  const [activeUnit, setActiveUnit] = useState("u1");
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#3B82F6", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📱</div>
          <div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.3px" }}>Mobile Programming — BCA 6th Semester</h1>
            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>Complete Exam Guide 2026 • 8 Units + Predictions</div>
          </div>
        </div>
      </div>

      {/* Unit Tabs — Scrollable */}
      <div style={{ background: "#fff", borderBottom: `2px solid ${COLORS.border}`, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: 0, minWidth: "max-content" }}>
          {UNITS.map(u => (
            <button key={u.id} onClick={() => setActiveUnit(u.id)}
              style={{
                padding: "13px 16px", border: "none", background: "none", cursor: "pointer",
                fontSize: 12.5, fontWeight: activeUnit === u.id ? 700 : 500,
                color: activeUnit === u.id ? u.color : COLORS.muted,
                borderBottom: activeUnit === u.id ? `3px solid ${u.color}` : "3px solid transparent",
                whiteSpace: "nowrap", transition: "all 0.15s"
              }}>
              {u.title.replace("Unit ", "U").split("—")[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* Unit Header */}
        <div style={{
          background: `linear-gradient(135deg, ${unit.color} 0%, ${unit.color}CC 100%)`,
          borderRadius: 14, padding: "22px 28px", marginBottom: 28,
          boxShadow: `0 4px 20px ${unit.color}40`
        }}>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 21, fontWeight: 700 }}>{unit.title}</h2>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4, display: "block" }}>{unit.badge}</span>
        </div>

        {/* Sections */}
        {unit.sections.map((sec, si) => {
          const key = `${unit.id}-${si}`;
          const open = openSections[key] !== false; // open by default
          return (
            <div key={key} style={{
              background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.border}`,
              marginBottom: 16, overflow: "hidden",
              boxShadow: open ? "0 2px 12px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)"
            }}>
              {/* Section Header */}
              <button onClick={() => toggleSection(key)}
                style={{
                  width: "100%", background: open ? "#F8FAFC" : "#fff", border: "none",
                  padding: "15px 20px", cursor: "pointer", display: "flex", alignItems: "center",
                  gap: 14, textAlign: "left", transition: "background 0.15s"
                }}>
                <span style={{
                  background: unit.color, color: "#fff", borderRadius: 6,
                  padding: "3px 10px", fontSize: 11, fontWeight: 700, minWidth: 60,
                  textAlign: "center", whiteSpace: "nowrap"
                }}>{sec.qnum}</span>
                <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, flex: 1 }}>{sec.qtitle}</span>
                <span style={{
                  color: COLORS.muted, fontSize: 18, transition: "transform 0.2s",
                  transform: open ? "rotate(0deg)" : "rotate(-90deg)", display: "inline-block"
                }}>▾</span>
              </button>

              {/* Section Content */}
              {open && (
                <div style={{ padding: "4px 24px 28px" }}>
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
