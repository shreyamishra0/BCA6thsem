import { useState } from "react";

const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Swing, AWT, MVC, Layouts & Events",
    badge: "Assignment 1 + Lab 1",
    color: "#1A237E",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Why is Swing Lightweight & AWT Heavyweight?",
        content: [
          { type: "explain", text: "When you create a UI button in Java, something has to physically paint it on your screen. The critical question is: who does the painting — Java itself, or the Operating System?" },
          { type: "heading", text: "AWT — Heavyweight (OS does the painting)" },
          { type: "explain", text: "AWT (Abstract Window Toolkit) was Java's first UI library. Every AWT component secretly asks the OS to create a real native widget. That native OS widget is called a peer." },
          { type: "analogy", text: "Imagine building a house and instead of drawing windows yourself, you call the OS construction crew to install real glass windows. Each is a heavy physical object managed by the OS. That's AWT." },
          { type: "table", headers: ["AWT Feature", "Detail"],
            rows: [
              ["Peer", "Each component creates a real OS-level native widget"],
              ["Appearance", "Looks like the OS — Windows button on Windows, Mac button on Mac"],
              ["Weight", "Heavyweight — consumes OS resources (handles, memory) per component"],
              ["Package", "java.awt.*"],
              ["Problem", "Appearance is platform-dependent; limited features"],
            ]
          },
          { type: "heading", text: "Swing — Lightweight (Java does the painting)" },
          { type: "explain", text: "Swing took a completely different approach: instead of asking the OS for native widgets, Swing draws every component itself using Java's 2D graphics engine. There are NO native peers." },
          { type: "analogy", text: "Now imagine you draw the windows on the wall yourself with paint and brush. They look exactly the same on every house because YOU draw them. They're lightweight — just paint, no heavy physical components. That's Swing." },
          { type: "table", headers: ["Swing Feature", "Detail"],
            rows: [
              ["Peer", "None — Swing paints itself using Java2D graphics"],
              ["Appearance", "Consistent on ALL platforms (Write Once, Look Same Anywhere)"],
              ["Weight", "Lightweight — no OS resources per component"],
              ["Package", "javax.swing.*"],
              ["PLAF", "Pluggable Look-and-Feel — swap appearance theme with one line"],
              ["Extra features", "HTML in labels, tooltips, borders, icons, custom renderers"],
            ]
          },
          { type: "tip", label: "KEY RULE", text: "Lightweight = drawn by Java (NO OS peer). Heavyweight = drawn by OS (HAS native peer). Swing = lightweight. AWT = heavyweight. The only heavyweight part of Swing is the top-level containers: JFrame, JDialog, JApplet." },
          { type: "heading", text: "Swing Class Hierarchy" },
          { type: "diagram", text: `
java.lang.Object
  └── java.awt.Component          ← Base of ALL visual elements
        ├── java.awt.Container    ← Component that CAN hold children
        │     ├── java.awt.Panel  ← AWT panel (heavyweight)
        │     ├── java.awt.Frame  ← AWT top-level window (heavyweight)
        │     └── javax.swing.JComponent  ← Base of ALL Swing components
        │           ├── JButton, JLabel, JTextField, JTextArea
        │           ├── JCheckBox, JRadioButton, JComboBox
        │           └── JPanel  ← Most common Swing container
        └── Top-level Swing (extend java.awt.Frame directly):
              JFrame   ← Main app window
              JDialog  ← Popup dialog
              JApplet  ← Browser applet (deprecated)

KEY: JComponent is the base of all Swing components (not top-level)
     JFrame extends Frame (AWT) → JFrame itself is heavyweight
     BUT all components INSIDE JFrame are lightweight Swing components` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Design Patterns — Types & MVC with Complete Calculator",
        content: [
          { type: "definition", text: "Design Pattern: A reusable, proven solution template for a problem that occurs repeatedly in software development. NOT actual code — a blueprint or recipe. Introduced by the 'Gang of Four' (GoF) in 1994." },
          { type: "analogy", text: "Design patterns are like recipes in a cookbook. A 'chocolate cake' recipe doesn't give you an exact cake, but tells you the steps and ingredients to adapt to your situation." },
          { type: "heading", text: "Three Categories of GoF Patterns" },
          { type: "table", headers: ["Category", "What it solves", "Key Patterns"],
            rows: [
              ["Creational", "HOW objects are created. Controls instantiation to avoid tight coupling.", "Singleton, Factory Method, Abstract Factory, Builder, Prototype"],
              ["Structural", "HOW objects are COMPOSED. Organizes classes into larger structures.", "Adapter, Decorator, Facade, Proxy, Composite, Bridge"],
              ["Behavioral", "HOW objects COMMUNICATE and share responsibilities.", "MVC, Observer, Strategy, Command, Iterator, Template Method"],
            ]
          },
          { type: "heading", text: "Singleton Pattern (Creational) — MCQ Favourite!" },
          { type: "definition", text: "Singleton: Ensures a class has ONLY ONE instance throughout the application and provides a global access point to that instance. Private constructor prevents external instantiation." },
          { type: "diagram", text: `
Singleton Pattern:

   Client A ──┐
   Client B ──┤──► DatabaseConnection.getInstance() ──► [ One shared instance ]
   Client C ──┘

class DatabaseConnection {
    private static DatabaseConnection instance = null; // single instance
    private DatabaseConnection() {}  // private constructor — blocks new keyword

    public static DatabaseConnection getInstance() {
        if (instance == null)           // create only if not yet created
            instance = new DatabaseConnection();
        return instance;                // always return same object
    }
}
// Usage: DatabaseConnection conn = DatabaseConnection.getInstance();` },
          { type: "heading", text: "MVC — Model View Controller (Deep Dive)" },
          { type: "diagram", text: `
MVC Flow:

  ┌─────────────────────────────────────────────────────┐
  │                    User Action                       │
  │               (clicks + button)                      │
  └─────────────────────┬───────────────────────────────┘
                        │
                        ▼
  ┌──────────────── CONTROLLER ─────────────────────────┐
  │  • Receives user action from View                    │
  │  • Reads data from View (num1, num2)                 │
  │  • Calls appropriate Model method (model.add())      │
  │  • Gets result from Model                            │
  │  • Updates View with result (view.showResult())      │
  └───────────┬─────────────────────────┬───────────────┘
              │                         │
              ▼                         ▼
  ┌─────── MODEL ───────┐    ┌──────── VIEW ──────────┐
  │ • Data & business   │    │ • User Interface only  │
  │   logic ONLY        │    │ • JFrame, JButton,     │
  │ • No UI code        │    │   JTextField, JLabel   │
  │ • add(), subtract() │    │ • Displays results     │
  │ • getResult()       │    │ • No calculations      │
  └─────────────────────┘    └────────────────────────┘

Restaurant Analogy:
  Menu (View) = Shows what you can order
  Waiter (Controller) = Takes order, delivers food
  Kitchen (Model) = Prepares food
  → Menu doesn't cook. Kitchen doesn't talk to customers.` },
          { type: "table", headers: ["Part", "Responsibility", "Rule"],
            rows: [
              ["Model", "Stores data + all business logic (calculations, validation)", "NO import javax.swing.* — knows nothing about UI"],
              ["View", "The user interface — all Swing/AWT components", "No arithmetic or business logic — purely visual"],
              ["Controller", "Connects Model and View — handles events, reads View, calls Model, updates View", "Glue code only — no business logic, no UI rendering"],
            ]
          },
          { type: "code", label: "MVC Calculator — Complete 3-File Example",
            lines: [
`// ═══ FILE 1: CalcModel.java — DATA + LOGIC ═════════════════════
// Rule: NO import javax.swing.* here — Model knows NOTHING about UI
public class CalcModel {
    private double result = 0;

    public void add(double a, double b)      { result = a + b; }
    public void subtract(double a, double b) { result = a - b; }
    public void multiply(double a, double b) { result = a * b; }
    public void divide(double a, double b) {
        if (b == 0) throw new ArithmeticException("Cannot divide by zero!");
        result = a / b;
    }
    public void modulo(double a, double b) { result = a % b; }
    public double getResult() { return result; }
}`,
`// ═══ FILE 2: CalcView.java — UI ONLY ════════════════════════════
import javax.swing.*; import java.awt.*;
public class CalcView extends JFrame {
    // Package-level access so Controller can add listeners
    JTextField num1Field   = new JTextField("0", 8);
    JTextField num2Field   = new JTextField("0", 8);
    JLabel     resultLabel = new JLabel("Result: ---");
    JButton btnAdd = new JButton("+"),  btnSub = new JButton("-");
    JButton btnMul = new JButton("×"),  btnDiv = new JButton("÷");
    JButton btnMod = new JButton("%");

    public CalcView() {
        setTitle("MVC Calculator");
        setLayout(new FlowLayout(FlowLayout.CENTER, 10, 10));
        add(new JLabel("Number 1:")); add(num1Field);
        add(new JLabel("Number 2:")); add(num2Field);
        add(btnAdd); add(btnSub); add(btnMul); add(btnDiv); add(btnMod);
        resultLabel.setFont(new Font("Arial", Font.BOLD, 16));
        add(resultLabel);
        pack();
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }
    // Helper methods for Controller to read inputs
    public double getNum1() { return Double.parseDouble(num1Field.getText()); }
    public double getNum2() { return Double.parseDouble(num2Field.getText()); }
    // Controller calls these to update display
    public void showResult(double r) { resultLabel.setText("Result: " + r); }
    public void showError(String msg) {
        JOptionPane.showMessageDialog(this, msg, "Error", JOptionPane.ERROR_MESSAGE);
    }
}`,
`// ═══ FILE 3: CalcController.java — WIRES MODEL & VIEW ══════════
public class CalcController {
    private CalcModel model;
    private CalcView  view;

    public CalcController(CalcModel m, CalcView v) {
        this.model = m; this.view = v;
        attachListeners();
    }
    private void attachListeners() {
        view.btnAdd.addActionListener(e -> perform("add"));
        view.btnSub.addActionListener(e -> perform("subtract"));
        view.btnMul.addActionListener(e -> perform("multiply"));
        view.btnDiv.addActionListener(e -> perform("divide"));
        view.btnMod.addActionListener(e -> perform("modulo"));
    }
    private void perform(String op) {
        try {
            double a = view.getNum1();  // Step 1: read View
            double b = view.getNum2();
            switch (op) {              // Step 2: call Model
                case "add":      model.add(a, b);      break;
                case "subtract": model.subtract(a, b); break;
                case "multiply": model.multiply(a, b); break;
                case "divide":   model.divide(a, b);   break;
                case "modulo":   model.modulo(a, b);   break;
            }
            view.showResult(model.getResult()); // Step 3: update View
        } catch (NumberFormatException e) {
            view.showError("Enter valid numbers!");
        } catch (ArithmeticException e) {
            view.showError(e.getMessage());
        }
    }
    public static void main(String[] args) {
        CalcModel m = new CalcModel();
        CalcView  v = new CalcView();
        new CalcController(m, v); // wiring!
    }
}`
            ]
          },
          { type: "tip", label: "EXAM TRICK", text: "Advantages of MVC: (1) Separation of concerns, (2) Testability — unit test Model without clicking buttons, (3) Reusability — same Model for desktop/web/mobile, (4) Parallel development — UI team & logic team work independently." },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Layout Managers — GridLayout, CardLayout, GridBagLayout",
        content: [
          { type: "definition", text: "Layout Manager: An object that automatically controls the size and position of components inside a Container. Without one, you set pixel coordinates manually — which breaks on different screen sizes." },
          { type: "table", headers: ["Layout", "Rule", "Best for"],
            rows: [
              ["FlowLayout", "Left-to-right in a row, wraps when full", "Row of buttons or labels"],
              ["BorderLayout", "5 regions: NORTH, SOUTH, EAST, WEST, CENTER", "Main application window structure"],
              ["GridLayout(r,c)", "Uniform grid — ALL cells same exact size", "Calculator keypads, game boards"],
              ["GridBagLayout", "Flexible grid — each cell can span rows/cols and resize differently", "Complex forms with mixed field sizes"],
              ["CardLayout", "Stack of panels — only ONE panel visible at a time", "Tabs, wizards, multi-screen navigation"],
              ["BoxLayout", "Single row (X_AXIS) or column (Y_AXIS)", "Toolbars, vertical menus"],
            ]
          },
          { type: "heading", text: "GridBagConstraints — Key Properties" },
          { type: "table", headers: ["Constraint", "Controls", "Example value"],
            rows: [
              ["gridx, gridy", "Column and row position", "gridx=0, gridy=1 → column 0, row 1"],
              ["gridwidth, gridheight", "Columns/rows component spans", "gridwidth=2 → span 2 columns"],
              ["weightx, weighty", "How much extra space this col/row gets on resize", "weightx=1.0 → expand horizontally"],
              ["fill", "Whether component stretches to fill its cell", "HORIZONTAL, VERTICAL, BOTH, NONE"],
              ["anchor", "Where inside cell the component sits", "EAST, WEST, CENTER, NORTH, SOUTH"],
              ["insets", "Outer padding/margins around the component", "new Insets(5,5,5,5) = 5px all sides"],
            ]
          },
          { type: "code", label: "CardLayout + GridLayout + GridBagLayout in one demo",
            lines: [`import javax.swing.*; import java.awt.*;
public class LayoutDemo extends JFrame {
    CardLayout cardLayout = new CardLayout();
    JPanel     cardPanel  = new JPanel(cardLayout);
    public LayoutDemo() {
        setTitle("Layout Manager Demo"); setSize(540, 380);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        // ── CARD 1: GridLayout ──────────────────────────────────────
        // rows=3, cols=2, hgap=8, vgap=8 — all cells EQUAL size
        JPanel gridCard = new JPanel(new GridLayout(3, 2, 8, 8));
        gridCard.setBorder(BorderFactory.createTitledBorder("GridLayout (equal cells)"));
        for (String s : new String[]{"Name","Email","Phone","City","State","ZIP"}) {
            gridCard.add(new JLabel(s + ":")); gridCard.add(new JTextField(12));
        }

        // ── CARD 2: GridBagLayout ──────────────────────────────────
        JPanel gbCard = new JPanel(new GridBagLayout());
        gbCard.setBorder(BorderFactory.createTitledBorder("GridBagLayout (flexible)"));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(6,6,6,6);

        // Label (row 0, col 0) — anchored to EAST (right-aligned)
        gbc.gridx=0; gbc.gridy=0;
        gbc.anchor=GridBagConstraints.EAST;
        gbc.fill=GridBagConstraints.NONE; gbc.weightx=0;
        gbCard.add(new JLabel("Username:"), gbc);

        // TextField (row 0, col 1) — fills remaining horizontal space
        gbc.gridx=1; gbc.gridy=0;
        gbc.fill=GridBagConstraints.HORIZONTAL;
        gbc.weightx=1.0; // gets all extra horizontal space
        gbCard.add(new JTextField(15), gbc);

        // Row 1: Password
        gbc.gridx=0; gbc.gridy=1;
        gbc.fill=GridBagConstraints.NONE; gbc.weightx=0;
        gbc.anchor=GridBagConstraints.EAST;
        gbCard.add(new JLabel("Password:"), gbc);
        gbc.gridx=1; gbc.gridy=1;
        gbc.fill=GridBagConstraints.HORIZONTAL; gbc.weightx=1.0;
        gbCard.add(new JPasswordField(15), gbc);

        // Row 2: Comment area spanning 2 columns
        gbc.gridx=0; gbc.gridy=2;
        gbc.gridwidth=2; // span both columns
        gbc.fill=GridBagConstraints.BOTH; gbc.weighty=1.0;
        gbCard.add(new JScrollPane(new JTextArea(3,20)), gbc);

        // Add cards with string KEYS
        cardPanel.add(gridCard, "GRID");
        cardPanel.add(gbCard,   "GRIDBAG");

        // Navigation — cardLayout.show(container, key) switches visible card
        JButton btnGrid = new JButton("GridLayout");
        JButton btnGB   = new JButton("GridBagLayout");
        JButton btnNext = new JButton("Next Card"); // alternate method
        btnGrid.addActionListener(e -> cardLayout.show(cardPanel, "GRID"));
        btnGB.addActionListener(e   -> cardLayout.show(cardPanel, "GRIDBAG"));
        btnNext.addActionListener(e -> cardLayout.next(cardPanel)); // cycle

        JPanel nav = new JPanel();
        nav.add(btnGrid); nav.add(btnGB); nav.add(btnNext);
        add(cardPanel, BorderLayout.CENTER);
        add(nav,       BorderLayout.SOUTH);
        setVisible(true);
    }
    public static void main(String[] args) { new LayoutDemo(); }
}`]
          },
        ]
      },
      {
        qnum: "Q4",
        qtitle: "2D Graphics — Drawing Shapes, Text & Colors",
        content: [
          { type: "explain", text: "Swing lets you draw custom graphics by overriding paintComponent(Graphics g) inside any JComponent. The Graphics object is Java's virtual paintbrush — you give it colors, shapes, and positions." },
          { type: "diagram", text: `
HOW CUSTOM PAINTING WORKS:

  JFrame
    └── ContentPane
          └── YourJPanel (extends JPanel)
                └── paintComponent(Graphics g)  ← You override this
                      • Called automatically when window appears or resizes
                      • ALWAYS call super.paintComponent(g) first (clear background)
                      • Cast Graphics to Graphics2D for advanced features

  Graphics2D methods:
  ┌──────────────────────────────────────────────────────────────┐
  │ setColor(Color.RED)           → set current drawing color    │
  │ setStroke(new BasicStroke(4)) → set line thickness           │
  │ drawRect(x, y, w, h)         → outline rectangle only       │
  │ fillRect(x, y, w, h)         → solid filled rectangle       │
  │ drawOval(x, y, w, h)         → ellipse/circle outline       │
  │ fillOval(x, y, w, h)         → solid ellipse/circle         │
  │ drawLine(x1, y1, x2, y2)     → straight line                │
  │ drawString(text, x, y)       → draw text                    │
  │ setFont(new Font(n, style, s))→ set font style/size         │
  │ getFontMetrics()              → measure text for centering   │
  └──────────────────────────────────────────────────────────────┘` },
          { type: "tip", label: "CRITICAL", text: "ALWAYS call super.paintComponent(g) as the FIRST LINE inside paintComponent(). This clears the background and prevents 'ghosting' of old graphics on repaint." },
          { type: "code", label: "Red border + Black fill + White italic 'BCA 6th' centered inside",
            lines: [`import javax.swing.*; import java.awt.*;
public class ShapeDemo extends JFrame {
    public ShapeDemo() {
        setTitle("2D Shape Demo"); setSize(420, 300);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JPanel canvas = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                super.paintComponent(g); // MANDATORY — clears background

                Graphics2D g2 = (Graphics2D) g;
                // Enable anti-aliasing for smooth curved edges
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                                    RenderingHints.VALUE_ANTIALIAS_ON);

                int x=60, y=70, w=280, h=130;

                // Step 1: Draw RED 4px thick border rectangle
                g2.setStroke(new BasicStroke(4));
                g2.setColor(Color.RED);
                g2.drawRect(x, y, w, h);

                // Step 2: Fill inside with BLACK (inset 2px so red border shows)
                g2.setColor(Color.BLACK);
                g2.fillRect(x+2, y+2, w-4, h-4);

                // Step 3: Draw WHITE ITALIC "BCA 6th" centered in rectangle
                g2.setColor(Color.WHITE);
                g2.setFont(new Font("Arial", Font.ITALIC, 16));

                // FontMetrics centers text precisely
                String text = "BCA 6th";
                FontMetrics fm = g2.getFontMetrics();
                int textX = x + (w - fm.stringWidth(text)) / 2;
                int textY = y + (h + fm.getAscent() - fm.getDescent()) / 2;
                g2.drawString(text, textX, textY);
            }
        };
        canvas.setBackground(Color.LIGHT_GRAY);
        add(canvas); setVisible(true);
    }
    public static void main(String[] args) { new ShapeDemo(); }
}`]
          },
        ]
      },
      {
        qnum: "Q5",
        qtitle: "Java Event Delegation Model — Listeners vs Adaptors",
        content: [
          { type: "definition", text: "Event: An object representing something that happened — button clicked, key pressed, mouse moved. Java wraps all details into an Event Object and uses the Delegation Model to notify listener objects." },
          { type: "diagram", text: `
EVENT DELEGATION MODEL — 3 Participants:

  SOURCE           EVENT OBJECT          LISTENER
  ┌──────────┐     ┌────────────────┐    ┌──────────────────────┐
  │ JButton  │────►│ ActionEvent    │───►│ ActionListener impl   │
  │ (source) │     │ • source ref   │    │ actionPerformed(e) {} │
  │          │     │ • time         │    │ (your handler code)  │
  └──────────┘     │ • actionCmd    │    └──────────────────────┘
       │           └────────────────┘
       │ 1. btn.addActionListener(listener) — register
       │ 2. User clicks button — event fires
       │ 3. Java creates ActionEvent object
       │ 4. Source calls listener.actionPerformed(event) automatically
       └──────────────────────────────────────────────────────────────

Common Events:
  ActionEvent   → ActionListener  → actionPerformed(e)   ← button click, Enter
  MouseEvent    → MouseListener   → mouseClicked/Pressed/Released/Entered/Exited
  KeyEvent      → KeyListener     → keyPressed/Released/Typed
  WindowEvent   → WindowListener  → windowClosing/Opened/Closed
  ItemEvent     → ItemListener    → itemStateChanged(e)  ← checkbox, radio` },
          { type: "heading", text: "3 Ways to Add a Listener" },
          { type: "code", label: "Named Class, Anonymous Class & Lambda — all 3 styles",
            lines: [`import javax.swing.*; import java.awt.*; import java.awt.event.*;
public class EventDemo extends JFrame {
    public EventDemo() {
        setLayout(new FlowLayout());
        JButton btn1 = new JButton("Named Class");
        JButton btn2 = new JButton("Anonymous");
        JButton btn3 = new JButton("Lambda");
        JLabel output = new JLabel("Click any button...");
        output.setFont(new Font("Arial", Font.BOLD, 14));

        // STYLE 1: Named inner class — best for complex, reusable handlers
        class MyListener implements ActionListener {
            @Override
            public void actionPerformed(ActionEvent e) {
                output.setText("Named: " + e.getActionCommand());
            }
        }
        btn1.addActionListener(new MyListener());

        // STYLE 2: Anonymous inner class — traditional Java 7- style
        btn2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                output.setText("Anonymous clicked!");
            }
        });

        // STYLE 3: Lambda expression — modern Java 8+ (most concise)
        // Works because ActionListener has only ONE abstract method
        btn3.addActionListener(e -> output.setText("Lambda: " + e.getActionCommand()));

        add(btn1); add(btn2); add(btn3); add(output);
        pack(); setDefaultCloseOperation(EXIT_ON_CLOSE); setVisible(true);
    }
    public static void main(String[] args) { new EventDemo(); }
}`]
          },
          { type: "heading", text: "Listener vs Adaptor" },
          { type: "explain", text: "MouseListener has 5 methods. If you only want mouseClicked(), you must still write 4 empty stubs. Adaptor classes pre-implement all methods as empty — you only override what you need." },
          { type: "table", headers: ["Aspect", "Listener Interface", "Adaptor Class"],
            rows: [
              ["Type", "interface", "abstract class (pre-implements all methods empty)"],
              ["Must implement", "ALL methods — or compiler error", "Only the methods you actually need"],
              ["Inheritance", "Free — no slot used", "Uses your ONE inheritance slot"],
              ["Code cleanliness", "Messy — many empty stubs", "Clean — only relevant methods"],
              ["Examples", "MouseListener, KeyListener, WindowListener", "MouseAdapter, KeyAdapter, WindowAdapter"],
            ]
          },
          { type: "code", label: "MouseListener (messy) vs MouseAdapter (clean)",
            lines: [`// ❌ LISTENER — must write all 5, even 4 empty stubs
class UsingListener implements MouseListener {
    public void mouseClicked(MouseEvent e)  { System.out.println("clicked!"); }
    public void mousePressed(MouseEvent e)  { } // empty — forced to write
    public void mouseReleased(MouseEvent e) { } // empty — forced to write
    public void mouseEntered(MouseEvent e)  { } // empty — forced to write
    public void mouseExited(MouseEvent e)   { } // empty — forced to write
}

// ✅ ADAPTOR — clean, only override what you need
class UsingAdaptor extends MouseAdapter {
    @Override
    public void mouseClicked(MouseEvent e) { System.out.println("clicked!"); }
    // Other 4 methods inherited as empty from MouseAdapter
}

// Most common — anonymous adaptor inline:
panel.addMouseListener(new MouseAdapter() {
    @Override public void mouseClicked(MouseEvent e) {
        System.out.println("Click at " + e.getX() + ", " + e.getY());
    }
    @Override public void mouseEntered(MouseEvent e) {
        panel.setBackground(Color.YELLOW); // highlight on hover
    }
});`]
          },
          { type: "warning", text: "Adaptor disadvantage: Java has SINGLE inheritance. If your class already extends another class, it CANNOT also extend MouseAdapter. Solution: use anonymous inner class or lambda, or implement the interface (accepting the empty stubs)." },
        ]
      },
    ]
  },
  {
    id: "u2",
    title: "Unit 2 — JDBC (Java Database Connectivity)",
    badge: "Assignment 2 + Lab 2",
    color: "#1B5E20",
    sections: [
      {
        qnum: "Q1",
        qtitle: "JDBC — Architecture, 4 Driver Types & 6 Steps",
        content: [
          { type: "definition", text: "JDBC (Java Database Connectivity): A Java API (java.sql.*) that provides a standard way for Java programs to connect to ANY relational database using the same Java code — regardless of whether the database is MySQL, Oracle, PostgreSQL, or SQLite." },
          { type: "analogy", text: "JDBC is like a universal TV remote. Instead of learning a separate remote for every TV brand, you use one standard remote and a small translator box (the JDBC driver) converts commands to that specific TV's signals." },
          { type: "diagram", text: `
JDBC ARCHITECTURE — 4 Layers:

  ┌──────────────────────────────────────────────────────────────┐
  │  Layer 1: Java Application                                    │
  │           Your Java code — uses ONLY JDBC API interfaces      │
  └─────────────────────────┬────────────────────────────────────┘
                            │ (JDBC API calls)
  ┌─────────────────────────▼────────────────────────────────────┐
  │  Layer 2: JDBC API (java.sql.*)                               │
  │           Connection, Statement, PreparedStatement, ResultSet  │
  │           These are INTERFACES — not implementations!          │
  └─────────────────────────┬────────────────────────────────────┘
                            │
  ┌─────────────────────────▼────────────────────────────────────┐
  │  Layer 3: JDBC Driver Manager + JDBC Driver                   │
  │           DriverManager finds the right driver                │
  │           Driver TRANSLATES JDBC calls to database protocol   │
  └─────────────────────────┬────────────────────────────────────┘
                            │ (DB-specific protocol: TCP)
  ┌─────────────────────────▼────────────────────────────────────┐
  │  Layer 4: Database (MySQL, Oracle, PostgreSQL, SQLite...)     │
  │           Receives SQL, executes, returns results             │
  └──────────────────────────────────────────────────────────────┘` },
          { type: "heading", text: "4 JDBC Driver Types (MCQ Favourite!)" },
          { type: "table", headers: ["Type", "Name", "How it works", "Use today?"],
            rows: [
              ["Type 1", "JDBC-ODBC Bridge", "JDBC → ODBC middleware → DB. Needs ODBC installed.", "Deprecated in Java 8. NEVER use."],
              ["Type 2", "Native-API Driver", "JDBC → Native C/C++ DB library → DB. Needs native lib.", "Rare. Platform-specific."],
              ["Type 3", "Network Protocol Driver", "JDBC → Middleware server (middle tier) → DB.", "Rare. Extra server needed."],
              ["Type 4", "Thin Driver (Pure Java) ⭐", "JDBC → Directly to DB via TCP/IP socket. Pure Java.", "ALWAYS USE THIS. Best!"],
            ]
          },
          { type: "tip", label: "MCQ ANSWER", text: "Type 4 (Thin/Pure Java Driver) is most flexible — requires NO code installed on client machine. MySQL: 'com.mysql.cj.jdbc.Driver'. Just add the JAR. This was asked in 2023 MCQ!" },
          { type: "heading", text: "6 Steps to Use JDBC" },
          { type: "diagram", text: `
JDBC 6-STEP PROCESS:

Step 1: REGISTER DRIVER (Modern Java auto-loads with SPI — may skip)
  Class.forName("com.mysql.cj.jdbc.Driver");

Step 2: CREATE CONNECTION
  Connection con = DriverManager.getConnection(
      "jdbc:mysql://localhost:3306/mydb", "root", "password");
  URL format: jdbc:<subprotocol>://<host>:<port>/<database>

Step 3: CREATE STATEMENT
  Statement st = con.createStatement();
  // OR for parameterized queries (safer):
  PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE id=?");

Step 4: EXECUTE SQL
  ResultSet rs = st.executeQuery("SELECT * FROM users");  // for SELECT
  int rows    = st.executeUpdate("INSERT INTO ...");       // for INSERT/UPDATE/DELETE

Step 5: PROCESS RESULTS
  while (rs.next()) {                   // move to next row
      int id    = rs.getInt("id");      // get column by name
      String nm = rs.getString(2);      // get column by index (1-based!)
  }

Step 6: CLOSE RESOURCES (important! use try-with-resources)
  rs.close(); st.close(); con.close();
  // Better: try-with-resources auto-closes everything` },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Statement vs PreparedStatement — SQL Injection Explained",
        content: [
          { type: "table", headers: ["Aspect", "Statement", "PreparedStatement"],
            rows: [
              ["SQL compilation", "Compiled FRESH every single execution", "Compiled ONCE by DB, reused many times"],
              ["Parameters", "Values hardcoded/concatenated in SQL string — dangerous", "Uses ? placeholders — safe"],
              ["SQL Injection", "VULNERABLE — attacker can manipulate SQL", "PROTECTED — parameters always escaped"],
              ["Performance", "Slow for repeated queries", "Fast for repeated queries (reuses plan)"],
              ["Use case", "DDL only (CREATE TABLE, DROP TABLE — no user input)", "ALL DML with any user input"],
            ]
          },
          { type: "warning", text: "NEVER use Statement with user input! If user types ' OR '1'='1 as a username, your SQL becomes: WHERE user='' OR '1'='1' — which returns ALL rows. This is SQL Injection — a critical security breach!" },
          { type: "diagram", text: `
SQL INJECTION ATTACK DEMO:

// ❌ VULNERABLE (Statement with concatenation):
String userInput = "' OR '1'='1";
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
// Executed SQL: SELECT * FROM users WHERE name = '' OR '1'='1'
// '1'='1' is always TRUE → returns ALL users in database!

// ✅ SAFE (PreparedStatement with placeholder):
PreparedStatement ps = con.prepareStatement(
    "SELECT * FROM users WHERE name = ?");
ps.setString(1, "' OR '1'='1");
// DB treats it as literal string, not SQL code
// Executed: WHERE name = "' OR '1'='1'" → returns 0 rows. Safe!` },
          { type: "code", label: "PreparedStatement — Full CRUD operations",
            lines: [`import java.sql.*;
public class PreparedDemo {
    public static void main(String[] args) throws Exception {
        Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb", "root", "password");

        // ── INSERT with PreparedStatement ───────────────────────────
        PreparedStatement ins = con.prepareStatement(
            "INSERT INTO students(name, age, gpa) VALUES(?, ?, ?)");
        ins.setString(1, "Hari Bahadur");   // 1 = position of first ?
        ins.setInt(2, 22);
        ins.setDouble(3, 3.85);
        int rows = ins.executeUpdate();      // returns rows affected
        System.out.println(rows + " row inserted.");

        // Reuse same statement for another row (DB plan reused — fast!)
        ins.setString(1, "Sita Kumari");
        ins.setInt(2, 20);
        ins.setDouble(3, 3.92);
        ins.executeUpdate();

        // ── SELECT with PreparedStatement ───────────────────────────
        PreparedStatement sel = con.prepareStatement(
            "SELECT id, name, gpa FROM students WHERE gpa > ?");
        sel.setDouble(1, 3.0);              // find students with GPA > 3.0
        ResultSet rs = sel.executeQuery();

        System.out.println("\\n=== Students with GPA > 3.0 ===");
        while (rs.next()) {                  // rs.next() moves to next row
            System.out.println(
                rs.getInt("id") + " | " +   // get by column name
                rs.getString("name") + " | GPA: " +
                rs.getDouble(3));            // get by column index (1-based)
        }

        // ── UPDATE ──────────────────────────────────────────────────
        PreparedStatement upd = con.prepareStatement(
            "UPDATE students SET gpa = ? WHERE name = ?");
        upd.setDouble(1, 3.95);
        upd.setString(2, "Hari Bahadur");
        System.out.println(upd.executeUpdate() + " rows updated.");

        // ── DELETE ──────────────────────────────────────────────────
        PreparedStatement del = con.prepareStatement(
            "DELETE FROM students WHERE gpa < ?");
        del.setDouble(1, 2.0);  // delete students with very low GPA
        System.out.println(del.executeUpdate() + " rows deleted.");

        rs.close(); ins.close(); sel.close(); upd.close(); del.close(); con.close();
    }
}`]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Scrollable & Updatable ResultSet + Batch Updates + Transactions",
        content: [
          { type: "definition", text: "By default, a ResultSet cursor can only move FORWARD one row at a time. A Scrollable ResultSet lets the cursor move in any direction — forward, backward, or jump to any specific row number." },
          { type: "table", headers: ["Constant", "Meaning"],
            rows: [
              ["TYPE_FORWARD_ONLY (default)", "Cursor moves FORWARD only. Fast, memory-efficient."],
              ["TYPE_SCROLL_INSENSITIVE", "Scrollable. DB changes after RS created NOT reflected."],
              ["TYPE_SCROLL_SENSITIVE", "Scrollable. DB changes ARE reflected. Slower."],
              ["CONCUR_READ_ONLY (default)", "Cannot modify DB through ResultSet."],
              ["CONCUR_UPDATABLE", "Can call updateString(), updateRow() to modify DB through RS."],
            ]
          },
          { type: "code", label: "Scrollable + Updatable RS and Batch Updates + Transactions",
            lines: [`import java.sql.*;
public class AdvancedJDBC {
    public static void main(String[] args) throws Exception {
        Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb", "root", "password");

        // ── SCROLLABLE + UPDATABLE RESULTSET ───────────────────────
        Statement st = con.createStatement(
            ResultSet.TYPE_SCROLL_INSENSITIVE,
            ResultSet.CONCUR_UPDATABLE);
        ResultSet rs = st.executeQuery("SELECT id, name, score FROM students");

        rs.last();                           // jump to LAST row
        System.out.println("Total rows: " + rs.getRow());
        rs.first();                          // back to FIRST row
        rs.absolute(3);                      // jump to row 3 directly
        rs.relative(-1);                     // move 1 row backward
        rs.relative(2);                      // move 2 rows forward

        // Update row 2 through ResultSet (no UPDATE statement needed!)
        rs.absolute(2);
        rs.updateString("name", "Updated Name");
        rs.updateDouble("score", 99.5);
        rs.updateRow();                      // push changes to DB!

        // Insert a new row through ResultSet
        rs.moveToInsertRow();                // special insert buffer
        rs.updateInt("id", 999);
        rs.updateString("name", "New Student");
        rs.updateDouble("score", 88.0);
        rs.insertRow();                      // send new row to DB
        rs.moveToCurrentRow();               // return from insert buffer

        // ── BATCH UPDATES (execute multiple SQL at once — faster) ──
        Statement batchSt = con.createStatement();
        batchSt.addBatch("INSERT INTO logs VALUES(1, 'Login')");
        batchSt.addBatch("INSERT INTO logs VALUES(2, 'Search')");
        batchSt.addBatch("UPDATE users SET last_active = NOW()");
        int[] results = batchSt.executeBatch(); // sends ALL at once

        // ── TRANSACTIONS (commit/rollback together) ─────────────────
        con.setAutoCommit(false); // disable auto-commit (start transaction)
        try {
            PreparedStatement debit = con.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE id = ?");
            PreparedStatement credit = con.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE id = ?");
            debit.setDouble(1, 5000); debit.setInt(2, 1);
            credit.setDouble(1, 5000); credit.setInt(2, 2);
            debit.executeUpdate();
            credit.executeUpdate();
            con.commit();             // both succeed → commit permanently
            System.out.println("Transfer successful!");
        } catch (SQLException e) {
            con.rollback();           // any failure → undo everything
            System.out.println("Transfer failed! Rolled back.");
        } finally {
            con.setAutoCommit(true);  // restore auto-commit
            con.close();
        }
    }
}`]
          },
        ]
      },
      {
        qnum: "Q4",
        qtitle: "RowSet — Types & Differences from ResultSet",
        content: [
          { type: "definition", text: "RowSet: An enhanced version of ResultSet that implements the JavaBeans model. It adds: automatic connection management, scrollable/updatable by default, event listeners, and the ability to work DISCONNECTED from the database." },
          { type: "table", headers: ["Feature", "ResultSet", "RowSet"],
            rows: [
              ["Connection", "Must stay connected during use", "CachedRowSet can disconnect after loading"],
              ["JavaBeans", "Not a JavaBean", "Full JavaBean — fires PropertyChangeEvents"],
              ["Scrollable/Updatable", "Depends on Statement settings", "Always scrollable and updatable"],
              ["Serializable", "No — cannot send over network", "Yes — can be serialized/sent between JVMs"],
              ["Standalone use", "Must be created from Connection", "JdbcRowSet can use connection string internally"],
            ]
          },
          { type: "table", headers: ["RowSet Type", "Connected?", "Description"],
            rows: [
              ["JdbcRowSet", "Connected (always)", "Thin wrapper around ResultSet. Always connected. Scrollable & updatable."],
              ["CachedRowSet ★", "Disconnected", "Loads ALL data into memory, disconnects. Reconnects later to sync changes. Most useful."],
              ["WebRowSet", "Disconnected", "Extends CachedRowSet. Can read/write data as XML."],
              ["FilteredRowSet", "Disconnected", "Extends WebRowSet. Apply in-memory filter without new DB query."],
              ["JoinRowSet", "Disconnected", "Combine multiple RowSets like SQL JOIN — no DB connection needed."],
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u3",
    title: "Unit 3 — JavaBeans",
    badge: "Assignment 3 + Lab 3",
    color: "#4A148C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "JavaBean — Definition, 3 Rules & Advantages",
        content: [
          { type: "definition", text: "JavaBean: A reusable Java class following a specific set of coding conventions so that tools (IDEs, Spring, JSP, EJB, visual builders) can automatically discover, configure, and connect its properties, events, and methods — without reading your source code." },
          { type: "analogy", text: "A JavaBean is like a USB device. The USB standard defines the connector shape (conventions). Any computer can use any USB device without knowing how it works inside. Similarly, any framework can use any JavaBean because it follows the conventions." },
          { type: "diagram", text: `
THREE MANDATORY RULES FOR A JAVABEANS:

Rule 1: PUBLIC NO-ARG CONSTRUCTOR
  public MyBean() {}   ← frameworks call this to create the bean
  No-arg because frameworks don't know what arguments to pass

Rule 2: PRIVATE FIELDS WITH PUBLIC GETTERS/SETTERS
  private String name;
  public String getName()          { return name; }
  public void setName(String n)    { this.name = n; }
  public boolean isActive()        { return active; }  ← boolean uses 'is'

  Naming rule: getXxx / setXxx for non-boolean
               isXxx  / setXxx for boolean

Rule 3: IMPLEMENTS java.io.Serializable
  public class MyBean implements Serializable { }
  Required for: saving to disk, HTTP sessions, network transfer

OPTIONAL BUT COMMON:
  • Fire PropertyChangeEvents (Bound properties)
  • Support VetoableChangeEvents (Constrained properties)` },
          { type: "table", headers: ["Advantage", "Why it matters"],
            rows: [
              ["Reusability", "Write once, use in Spring, JSP, JSF, EJB, IDEs — no code changes."],
              ["Introspection", "IDEs and frameworks discover properties/methods at runtime via reflection."],
              ["Persistence", "Serializable means bean state can be saved/restored — HTTP sessions, files."],
              ["Events", "Beans fire PropertyChangeEvents and VetoableChangeEvents to communicate."],
              ["Loose Coupling", "JSP uses <jsp:setProperty> without knowing the bean's internals."],
            ]
          },
          { type: "code", label: "StudentBean — Proper JavaBean with all conventions",
            lines: [`import java.io.Serializable;   // Rule 3

public class StudentBean implements Serializable {
    private static final long serialVersionUID = 1L;

    // Rule 2: Private fields
    private int    id;
    private String name;
    private double gpa;
    private boolean active;

    // Rule 1: Public no-argument constructor
    public StudentBean() {
        this.active = true;  // default values set here
    }

    // Rule 2: Getters and setters for each property
    public int getId()    { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) {
        if (name == null || name.trim().isEmpty())
            throw new IllegalArgumentException("Name cannot be empty!");
        this.name = name;
    }

    public double getGpa() { return gpa; }
    public void setGpa(double gpa) {
        if (gpa < 0.0 || gpa > 4.0)
            throw new IllegalArgumentException("GPA must be 0.0 – 4.0");
        this.gpa = gpa;
    }

    // Boolean property — MUST use 'is' prefix for getter (Bean spec!)
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    @Override
    public String toString() {
        return "StudentBean{id=" + id + ", name='" + name + "', gpa=" + gpa + "}";
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Introspection — How Frameworks Discover Bean Properties",
        content: [
          { type: "definition", text: "Introspection: The ability to examine a JavaBean at RUNTIME to automatically discover its properties, events, and methods — without knowing the bean's class at compile time. Uses java.beans.Introspector and BeanInfo." },
          { type: "diagram", text: `
HOW INTROSPECTION WORKS:

  Framework receives bean class at runtime
         │
         ▼
  Introspector.getBeanInfo(MyBean.class)
         │
         ▼
  Scans all methods for naming patterns:
  ┌────────────────────────────────────────────────────────────┐
  │ Found getXxx()     → "xxx" is a READABLE property         │
  │ Found setXxx(val)  → "xxx" is a WRITABLE property         │
  │ Found isXxx()      → "xxx" is a boolean readable property  │
  │ Found addXxxListener()→ bean fires event of type "Xxx"    │
  └────────────────────────────────────────────────────────────┘
         │
         ▼
  Returns PropertyDescriptor[], MethodDescriptor[], EventSetDescriptor[]

REAL-WORLD USE: JSP's <jsp:setProperty name='s' property='name' value='Hari'/>
  → Framework introspects → finds setName() → calls setName("Hari") automatically!` },
          { type: "code", label: "Introspection — Inspect StudentBean at Runtime",
            lines: [`import java.beans.*;
import java.lang.reflect.Method;

public class IntrospectionDemo {
    public static void main(String[] args) throws Exception {
        // getBeanInfo(beanClass, stopClass) — exclude inherited Object methods
        BeanInfo info = Introspector.getBeanInfo(StudentBean.class, Object.class);

        System.out.println("=== PROPERTIES DISCOVERED ===");
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            System.out.println("Property: " + pd.getName());
            System.out.println("  Type  : " + pd.getPropertyType().getSimpleName());
            Method getter = pd.getReadMethod();
            Method setter = pd.getWriteMethod();
            if (getter != null) System.out.println("  Getter: " + getter.getName());
            if (setter != null) System.out.println("  Setter: " + setter.getName());
        }

        System.out.println("\\n=== METHODS DISCOVERED ===");
        for (MethodDescriptor md : info.getMethodDescriptors())
            System.out.println("Method: " + md.getName());

        // DYNAMIC property injection via introspection
        // This is exactly how Spring and JSP frameworks set bean values!
        StudentBean bean = new StudentBean();
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            if ("name".equals(pd.getName()) && pd.getWriteMethod() != null) {
                pd.getWriteMethod().invoke(bean, "Sita Kumari");
            }
            if ("gpa".equals(pd.getName()) && pd.getWriteMethod() != null) {
                pd.getWriteMethod().invoke(bean, 3.85);
            }
        }
        System.out.println("\\nBean set via introspection: " + bean);
    }
}`]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Bound & Constrained Bean Properties",
        content: [
          { type: "table", headers: ["Property Type", "When listener notified", "Can reject?", "Support class"],
            rows: [
              ["Simple", "Never — no notification", "N/A", "None"],
              ["Bound", "AFTER value changes (post-change notification)", "No — just informed", "PropertyChangeSupport"],
              ["Constrained", "BEFORE value changes — can veto!", "Yes — throws PropertyVetoException", "VetoableChangeSupport"],
            ]
          },
          { type: "diagram", text: `
BOUND vs CONSTRAINED PROPERTY FLOW:

BOUND (name property):
  1. setName("Alice") called
  2. Change is made immediately: this.name = "Alice"
  3. pcs.firePropertyChange("name", "old", "Alice") notifies listeners
  4. Listeners are informed AFTER the fact — cannot stop it
  → Used for: keeping UI in sync with data model

CONSTRAINED (salary property):
  1. setSalary(newValue) called
  2. vcs.fireVetoableChange("salary", old, new) — asks permission
  3. Any listener can throw PropertyVetoException to BLOCK the change
  4. If no veto → change is made: this.salary = newValue
  5. Bound notification fires after
  → Used for: validation that external parties must agree to` },
          { type: "code", label: "EmployeeBean — Bound & Constrained Properties",
            lines: [`import java.beans.*;

public class EmployeeBean implements java.io.Serializable {
    private String name;
    private double salary;

    // Support objects manage listener lists and fire events
    private PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private VetoableChangeSupport vcs = new VetoableChangeSupport(this);

    // ── BOUND PROPERTY: name ──────────────────────────────────────
    // Listeners notified AFTER change — cannot block it
    public String getName() { return name; }
    public void setName(String newName) {
        String oldName = this.name;
        this.name = newName;                          // change first
        pcs.firePropertyChange("name", oldName, newName); // then notify
    }

    // ── CONSTRAINED PROPERTY: salary ─────────────────────────────
    // Listeners can VETO (reject) before change happens
    public double getSalary() { return salary; }
    public void setSalary(double newSalary) throws PropertyVetoException {
        double oldSalary = this.salary;
        vcs.fireVetoableChange("salary", oldSalary, newSalary); // ask permission first
        this.salary = newSalary;  // only reached if NO veto was thrown
        pcs.firePropertyChange("salary", oldSalary, newSalary); // post-change notify
    }

    // Registration methods (required by JavaBean spec)
    public void addPropertyChangeListener(PropertyChangeListener l)  { pcs.addPropertyChangeListener(l); }
    public void addVetoableChangeListener(VetoableChangeListener l)  { vcs.addVetoableChangeListener(l); }

    public static void main(String[] args) throws Exception {
        EmployeeBean emp = new EmployeeBean();

        // Bound listener — informed AFTER name changes (cannot block)
        emp.addPropertyChangeListener(evt ->
            System.out.println("Name changed: " + evt.getOldValue() + " → " + evt.getNewValue()));

        // Constrained listener — can REJECT salary change
        emp.addVetoableChangeListener(evt -> {
            double newSal = (double) evt.getNewValue();
            if (newSal < 0)
                throw new PropertyVetoException("Salary cannot be negative!", evt);
            if (newSal > 1_000_000)
                throw new PropertyVetoException("Salary too high for approval!", evt);
        });

        emp.setName("Ram");        // triggers bound notification
        emp.setSalary(50000);      // OK — passes both checks
        // emp.setSalary(-1000);   // ← PropertyVetoException! Change REJECTED.
        System.out.println("Final salary: " + emp.getSalary()); // 50000
    }
}`]
          },
        ]
      },
    ]
  },
  {
    id: "u4",
    title: "Unit 4 — Servlets & JSP",
    badge: "Assignment 4 + Labs 4–6",
    color: "#B71C1C",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Servlet — Lifecycle & Complete Example",
        content: [
          { type: "definition", text: "Servlet: A Java class running inside a web server (Servlet Container — Apache Tomcat). It handles HTTP requests from browsers and generates HTTP responses (usually HTML). It is the server-side of a Java web application." },
          { type: "analogy", text: "A Servlet is like a chef at a restaurant. The waiter (Tomcat) receives the customer's order (HTTP request) and hands it to the chef (Servlet). The chef prepares food (processes request) and the waiter delivers it (HTTP response)." },
          { type: "diagram", text: `
SERVLET LIFECYCLE — 3 PHASES:

  Server starts or first request
         │
         ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Phase 1: INITIALIZATION (called ONCE)                       │
  │  init(ServletConfig config)                                  │
  │  • Open DB connections, read config, load resources          │
  │  • Container calls this after creating ONE Servlet instance  │
  └─────────────────────────────┬───────────────────────────────┘
                                │
         Each HTTP request      │
                │               ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Phase 2: SERVICE (called for EVERY request)                 │
  │  service(req, res) → routes to doGet() or doPost()          │
  │  • Container reuses same instance, creates NEW THREAD each   │
  │  • doGet()  — handle GET requests (URL params, fetch data)  │
  │  • doPost() — handle POST requests (form submissions)        │
  │  ⚠ Never use instance variables for request-specific data!  │
  └─────────────────────────────┬───────────────────────────────┘
                                │
  Server shutdown               │
         │                      ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Phase 3: DESTRUCTION (called ONCE)                          │
  │  destroy()                                                   │
  │  • Close DB connections, save state, release resources       │
  └─────────────────────────────────────────────────────────────┘

IMPORTANT: Container creates ONE Servlet instance, multiple threads call
           service() simultaneously. Never store request data in fields!` },
          { type: "code", label: "Complete Servlet with all lifecycle methods",
            lines: [`import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

@WebServlet("/hello")  // maps URL /hello to this Servlet
public class HelloServlet extends HttpServlet {
    private String appName; // class-level (shared across requests — OK for config)

    // ── PHASE 1: init — called ONCE ────────────────────────────────
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);           // ALWAYS call super.init()!
        appName = config.getInitParameter("appName");
        if (appName == null) appName = "MyApp";
        System.out.println("Servlet initialized. App: " + appName);
    }

    // ── PHASE 2a: doGet — handles GET requests ──────────────────────
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String name = req.getParameter("name"); // read ?name=Hari from URL
        if (name == null) name = "Guest";

        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println("<!DOCTYPE html><html><body>");
        out.println("<h1>Hello, " + name + "!</h1>");
        out.println("<p>Welcome to " + appName + "</p>");
        out.println("</body></html>");
    }

    // ── PHASE 2b: doPost — handles POST requests (form submissions) ─
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        // Authenticate...
        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        out.println("<h2>Logged in as: " + username + "</h2>");
    }

    // ── PHASE 3: destroy — called ONCE on shutdown ──────────────────
    @Override
    public void destroy() {
        System.out.println("Servlet destroying. Closing connections...");
    }
}`]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Servlet API — Request, Response, Sessions & Cookies",
        content: [
          { type: "heading", text: "HttpServletRequest — Key Methods" },
          { type: "table", headers: ["Method", "Returns", "Use"],
            rows: [
              ["getParameter(\"name\")", "String", "Read form field or URL query param ?name=value"],
              ["getParameterValues(\"name\")", "String[]", "Read multi-valued param (e.g., checkboxes)"],
              ["getAttribute(\"key\")", "Object", "Read request-scoped object (set by forward)"],
              ["setAttribute(\"key\", obj)", "void", "Store object in request scope (share with JSP)"],
              ["getSession()", "HttpSession", "Get/create session"],
              ["getRequestDispatcher(\"path\")", "RequestDispatcher", "Get dispatcher to forward/include"],
            ]
          },
          { type: "heading", text: "Sessions vs Cookies" },
          { type: "table", headers: ["Aspect", "Session (HttpSession)", "Cookie"],
            rows: [
              ["Storage", "Server-side (server memory)", "Client-side (browser storage)"],
              ["Stores", "Any Java object (Map, List, custom class)", "Strings only (name=value, max 4KB)"],
              ["Security", "More secure — data on server", "Less secure — visible in browser tools"],
              ["Lifetime", "Ends on browser close or timeout", "Until Max-Age expires (can outlive session)"],
              ["Use case", "Login sessions, shopping cart", "Remember me, preferences, language"],
            ]
          },
          { type: "code", label: "Sessions and Cookies — Complete implementation",
            lines: [`// ════════════════ SESSIONS ════════════════════════════════════
HttpSession session = request.getSession();         // create/get session
session.setAttribute("loggedUser", "Hari");         // store any object
session.setAttribute("role", "admin");
session.setMaxInactiveInterval(30 * 60);            // 30-min inactivity timeout

// Read from session (in another servlet or JSP)
String user = (String) session.getAttribute("loggedUser");
if (user == null) {
    response.sendRedirect("login.jsp");             // not logged in → redirect
    return;                                         // STOP processing!
}
// Logout
session.invalidate();                               // destroy session

// ════════════════ COOKIES ══════════════════════════════════════
// CREATE and send cookie to browser
Cookie themeCookie = new Cookie("theme", "dark");
themeCookie.setMaxAge(7 * 24 * 60 * 60);           // persist 7 days (in seconds)
themeCookie.setPath("/");                           // send for ALL paths on server
themeCookie.setHttpOnly(true);                      // JS cannot access (XSS protection)
response.addCookie(themeCookie);                    // add to HTTP response

// READ cookies from request
Cookie[] cookies = request.getCookies();
if (cookies != null) {
    for (Cookie c : cookies) {
        if ("theme".equals(c.getName())) {
            String theme = c.getValue();            // "dark" or "light"
            System.out.println("Theme: " + theme);
        }
    }
}
// DELETE a cookie (set Max-Age to 0)
Cookie delete = new Cookie("theme", "");
delete.setMaxAge(0);                                // browser deletes immediately
response.addCookie(delete);`]
          },
        ]
      },
      {
        qnum: "Q3",
        qtitle: "JSP — Scripting, Directives, Implicit Objects, Lifecycle & vs Servlet",
        content: [
          { type: "definition", text: "JSP (JavaServer Pages): Allows embedding Java directly inside HTML pages using special tags. When a JSP is requested, the Servlet Container converts it to a Servlet class, compiles it, and executes it — the HTML output goes to the browser." },
          { type: "diagram", text: `
JSP LIFECYCLE (Translate → Compile → Init → Service → Destroy):

  Client browser requests index.jsp
         │
         ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Step 1: TRANSLATION                                         │
  │  Container reads index.jsp → generates index_jsp.java       │
  │  Your JSP elements → Java code in _jspService() method      │
  └─────────────────────────────┬───────────────────────────────┘
                                ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Step 2: COMPILATION                                         │
  │  index_jsp.java → compiled to index_jsp.class               │
  │  (Only happens FIRST TIME or when JSP file changes)          │
  └─────────────────────────────┬───────────────────────────────┘
                                ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Step 3-4: LOADING + INSTANTIATION                           │
  │  Class loaded into JVM, object created                       │
  └─────────────────────────────┬───────────────────────────────┘
                                ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  Step 5: jspInit()   ← ONCE on first load                   │
  │  Step 6: _jspService() ← EVERY request (DON'T override!)    │
  │  Step 7: jspDestroy() ← ONCE on unload                      │
  └─────────────────────────────────────────────────────────────┘` },
          { type: "heading", text: "JSP Scripting Elements — 3 Types" },
          { type: "table", headers: ["Element", "Syntax", "Placed in Servlet", "When to use"],
            rows: [
              ["Declaration", "<%! int count=0; %>", "CLASS level (outside _jspService)", "Class-level variables or methods"],
              ["Scriptlet", "<% out.println(\"hi\"); %>", "INSIDE _jspService() method", "Java logic — loops, conditionals"],
              ["Expression", "<%= user.getName() %>", "INSIDE _jspService(), prints directly", "Print a value (no semicolon!)"],
            ]
          },
          { type: "heading", text: "JSP Directives" },
          { type: "table", headers: ["Directive", "Example", "Purpose"],
            rows: [
              ["page", "<%@ page contentType='text/html' import='java.util.*' %>", "Set page attributes: imports, content type, session, error page"],
              ["include", "<%@ include file='header.jsp' %>", "STATIC include — merged at COMPILE time. Fast."],
              ["taglib", "<%@ taglib prefix='c' uri='...' %>", "Import tag library (JSTL, custom tags)"],
            ]
          },
          { type: "heading", text: "9 JSP Implicit Objects" },
          { type: "table", headers: ["Object", "Type", "Use it for"],
            rows: [
              ["request", "HttpServletRequest", "Read parameters, attributes, headers, session"],
              ["response", "HttpServletResponse", "Set headers, redirect, set content type"],
              ["out", "JspWriter", "Write HTML output (like PrintWriter)"],
              ["session", "HttpSession", "Store/read session data"],
              ["application", "ServletContext", "App-wide shared data across all users"],
              ["pageContext", "PageContext", "Access all 4 scopes: page, request, session, application"],
              ["config", "ServletConfig", "Read servlet init parameters"],
              ["page", "Object (this)", "Reference to this JSP's Servlet instance"],
              ["exception", "Throwable", "Only in error pages (<%@ page isErrorPage='true' %>)"],
            ]
          },
          { type: "heading", text: "JSP Standard Action Tags" },
          { type: "table", headers: ["Tag", "What it does"],
            rows: [
              ["<jsp:include page='header.jsp'/>", "DYNAMIC include — includes at REQUEST time. Compiled separately."],
              ["<jsp:forward page='result.jsp'/>", "Forward to another page. URL in browser does NOT change."],
              ["<jsp:useBean id='s' class='StudentBean' scope='session'/>", "Find bean in scope or create new one."],
              ["<jsp:setProperty name='s' property='name' value='Hari'/>", "Call setName('Hari') via introspection."],
              ["<jsp:getProperty name='s' property='name'/>", "Call getName() and output result to HTML."],
            ]
          },
          { type: "heading", text: "JSP vs Servlet Comparison" },
          { type: "table", headers: ["Aspect", "JSP", "Servlet"],
            rows: [
              ["File type", ".jsp — HTML with embedded Java tags", ".java — pure Java class"],
              ["Best for", "VIEW — presentation layer (display data)", "CONTROLLER — handle requests, business logic"],
              ["HTML", "Easy — write HTML naturally", "Tedious — out.println() for every line"],
              ["Java logic", "Can add but messy (scriptlets bad practice)", "Clean — pure Java"],
              ["Translation", "Auto-converted to Servlet by container", "Developer writes and compiles directly"],
              ["MVC role", "View", "Controller"],
            ]
          },
          { type: "tip", label: "EXAM TIP", text: "static include (<%@ include file%>) merges at COMPILE time — fast, but both pages must recompile when header changes. Dynamic include (<jsp:include page>) includes at REQUEST time — flexible, each page compiled separately. JSP declaration (<%! %>) creates class-level variable; scriptlet (<% %>) creates local variable inside _jspService()." },
        ]
      },
    ]
  },
  {
    id: "u5",
    title: "Unit 5 — RMI (Remote Method Invocation)",
    badge: "Assignment 5 + Labs 7",
    color: "#004D40",
    sections: [
      {
        qnum: "Q1",
        qtitle: "RMI — Architecture, Steps & Complete Working Example",
        content: [
          { type: "definition", text: "RMI (Remote Method Invocation): A Java mechanism allowing an object in one JVM (computer) to call methods on an object in a DIFFERENT JVM. The network communication is completely hidden — it looks like a local method call." },
          { type: "analogy", text: "Imagine calling a friend in another city and asking them to compute math for you. You say 'add 10 and 20', they say '30'. You don't care about the phone network — you just called a 'method' on a 'remote object'. That's RMI." },
          { type: "diagram", text: `
RMI ARCHITECTURE:

CLIENT MACHINE                              SERVER MACHINE
┌──────────────────────────┐                ┌───────────────────────────┐
│  Client Code             │                │  Remote Object (Impl)     │
│  service.add(5, 3)       │   TCP/IP       │  Extends UnicastRemoteObj │
│         │                │◄──────────────►│  Actual logic runs here   │
│         ▼                │                └───────────────────────────┘
│  CLIENT STUB (proxy)     │                        ▲
│  • Looks like the real   │                ┌───────┴───────────────────┐
│    remote object         │                │  SKELETON (server side)   │
│  • Serializes params     │                │  Receives call from stub  │
│  • Sends over network    │                │  Deserializes params      │
│  • Waits for result      │                │  Calls actual method      │
└──────────────────────────┘                └───────────────────────────┘
         │                                          │
         └──────────┬──────────────────────────────┘
                    ▼
           RMI REGISTRY (port 1099)
           Server binds: "rmi://localhost/AddService" → object reference
           Client looks up: Naming.lookup("rmi://localhost/AddService") → stub

STEPS:
  1. Define Remote Interface (shared by client and server)
  2. Implement it on server (extends UnicastRemoteObject)
  3. Server: start Registry, bind (register) the remote object
  4. Client: look up the object in Registry → receives Stub
  5. Client calls methods on Stub → appears local, runs remotely` },
          { type: "code", label: "Complete RMI — Add Two Numbers (Lab 7.1 style)",
            lines: [
`// ── FILE 1: AddService.java (Remote Interface — shared) ──────────
import java.rmi.*;
public interface AddService extends Remote {
    // ALL methods MUST declare throws RemoteException (network can fail!)
    int add(int a, int b)       throws RemoteException;
    int subtract(int a, int b)  throws RemoteException;
    double multiply(double a, double b) throws RemoteException;
}`,
`// ── FILE 2: AddServiceImpl.java (Server) ─────────────────────────
import java.rmi.*;
import java.rmi.server.*;
import java.rmi.registry.*;

public class AddServiceImpl extends UnicastRemoteObject implements AddService {
    // Constructor MUST declare throws RemoteException
    public AddServiceImpl() throws RemoteException { super(); }

    @Override
    public int add(int a, int b) throws RemoteException {
        System.out.println("Server computing: " + a + " + " + b);
        return a + b;  // result serialized and sent back to client
    }
    @Override
    public int subtract(int a, int b) throws RemoteException { return a - b; }
    @Override
    public double multiply(double a, double b) throws RemoteException { return a * b; }

    public static void main(String[] args) throws Exception {
        // Step 1: Start RMI Registry on port 1099 (default port)
        Registry registry = LocateRegistry.createRegistry(1099);
        System.out.println("RMI Registry started on port 1099");

        // Step 2: Create remote object and register with a name
        AddServiceImpl service = new AddServiceImpl();
        Naming.rebind("rmi://localhost/AddService", service);
        // rebind = replace if name exists. bind = error if exists.
        System.out.println("AddService registered. Waiting for clients...");
        // Server stays running waiting for connections
    }
}`,
`// ── FILE 3: AddClient.java (Client) ──────────────────────────────
import java.rmi.*;
public class AddClient {
    public static void main(String[] args) throws Exception {
        // Look up remote object → receives CLIENT STUB (local proxy)
        AddService service = (AddService) Naming.lookup("rmi://localhost/AddService");

        // Call methods — looks like local, actually goes over network!
        int result1 = service.add(15, 25);
        System.out.println("15 + 25 = " + result1);     // 40

        int result2 = service.subtract(100, 35);
        System.out.println("100 - 35 = " + result2);    // 65

        double result3 = service.multiply(7.5, 4.0);
        System.out.println("7.5 × 4.0 = " + result3);  // 30.0
    }
}
// ── HOW TO RUN ────────────────────────────────────────────────────
// 1. javac AddService.java AddServiceImpl.java AddClient.java
// 2. java AddServiceImpl    (start server — keep this running)
// 3. java AddClient         (run client in another terminal)`
            ]
          },
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Parameter Marshaling & CORBA vs RMI",
        content: [
          { type: "definition", text: "Parameter Marshaling: When client calls a remote method, parameters are serialized (marshaled) into a byte stream, sent over the network, and reconstructed (unmarshaled) on the server. Results travel back the same way." },
          { type: "table", headers: ["Parameter Type", "How passed", "Serializable needed?"],
            rows: [
              ["Primitives (int, double, boolean)", "By value (copy)", "No"],
              ["String", "By value (copy)", "Yes (String is Serializable)"],
              ["Custom class (e.g., Student)", "By value (DEEP COPY)", "YES — must implement Serializable"],
              ["Remote object", "By REFERENCE (Stub sent)", "No — passed as remote reference"],
            ]
          },
          { type: "heading", text: "CORBA vs RMI" },
          { type: "table", headers: ["Aspect", "RMI", "CORBA"],
            rows: [
              ["Language", "Java ONLY", "Language-neutral (Java, C++, Python, etc.)"],
              ["Interface", "Java interface extending Remote", "IDL (Interface Definition Language)"],
              ["Protocol", "JRMP (Java-specific)", "IIOP (interoperable, language-neutral)"],
              ["Complexity", "Simple — just Java. Easy to learn.", "Complex — IDL, ORB, naming service."],
              ["Performance", "Fast for Java-to-Java", "Overhead from language translation"],
              ["Use case", "Java-only distributed systems", "Enterprise multi-language systems"],
              ["Today", "Being replaced by REST APIs, gRPC", "Legacy enterprise systems"],
            ]
          },
        ]
      },
    ]
  },
  {
    id: "u6",
    title: "Unit 6 — 2026 Exam Predictions 🎯",
    badge: "Past Paper Analysis",
    color: "#C62828",
    sections: [
      {
        qnum: "PRED",
        qtitle: "2026 Predicted Questions — Based on 2020, 2021, 2023 Papers",
        content: [
          { type: "warning", text: "These predictions are based on 3 years of past TU BCA Advanced Java exam patterns. Questions marked ★ appear multiple times — very likely to reappear!" },
          { type: "heading", text: "Group B Predictions (5 Marks Each)" },
          { type: "table", headers: ["Predicted Question", "Probability", "Unit"],
            rows: [
              ["★ Differentiate between Swing (lightweight) and AWT (heavyweight) with class hierarchy", "Very High — appears every year", "Unit 1"],
              ["★ Explain MVC design pattern with example (or implement Calculator using MVC)", "Very High — core topic", "Unit 1"],
              ["★ What is JDBC? Explain its architecture and 4 types of drivers", "Very High — Type 4 asked in 2023 MCQ", "Unit 2"],
              ["★ Differentiate Statement vs PreparedStatement. Why use PreparedStatement?", "Very High — SQL injection angle", "Unit 2"],
              ["★ What is JavaBean? Explain its rules/conventions and advantages", "Very High — definitional question", "Unit 3"],
              ["★ Explain Servlet lifecycle with diagram", "Very High — appears every year", "Unit 4"],
              ["★ Differentiate JSP vs Servlet", "High — classic comparison", "Unit 4"],
              ["Explain bound and constrained properties with example", "High", "Unit 3"],
              ["Explain introspection in JavaBeans with program", "High", "Unit 3"],
              ["What is RMI? Explain its architecture with diagram", "High", "Unit 5"],
              ["Explain JSP directives with examples", "High — page, include, taglib", "Unit 4"],
              ["Explain JSP implicit objects (any 5 with purpose)", "Medium-High", "Unit 4"],
              ["Explain scrollable and updatable ResultSet with example", "Medium", "Unit 2"],
              ["Explain Listener vs Adaptor with example", "Medium", "Unit 1"],
              ["What is RowSet? Explain types and difference from ResultSet", "Medium", "Unit 2"],
            ]
          },
          { type: "heading", text: "Group C Predictions (10–15 Marks)" },
          { type: "table", headers: ["Predicted Question", "Why Likely", "Unit"],
            rows: [
              ["★ Write complete MVC Calculator (Model+View+Controller code)", "Appears almost every year in Group C — 3 files", "Unit 1"],
              ["★ Write complete RMI example — server, client, interface (add/subtract or bank)", "Long coding question — well-defined structure", "Unit 5"],
              ["Explain JSP complete lifecycle + all scripting elements + directives + implicit objects", "Combined JSP theory question", "Unit 4"],
              ["Write Servlet for login form — doGet shows form, doPost validates with JDBC", "Combines Servlet + JDBC — comprehensive", "Unit 2+4"],
              ["Write JavaBean with bound + constrained properties — complete program", "Tests full bean knowledge", "Unit 3"],
              ["Explain Swing layouts — CardLayout+GridLayout+GridBagLayout with code example", "Layout question — high exam frequency", "Unit 1"],
              ["Write JDBC program using PreparedStatement with complete CRUD and transactions", "Database comprehensive question", "Unit 2"],
            ]
          },
          { type: "heading", text: "MCQ High-Probability Topics" },
          { type: "table", headers: ["MCQ Topic", "Key Answer", "Asked in"],
            rows: [
              ["Which JDBC driver requires NO code on client machine?", "Type 4 (Pure Java / Thin Driver)", "2023"],
              ["Which Swing component is actually heavyweight?", "JFrame, JDialog, JApplet (top-level containers)", "Common"],
              ["What happens if prepareStatement fails?", "Returns false or throws SQLException", "Common"],
              ["Boolean property getter prefix in JavaBean", "is (not get) — e.g., isActive()", "Common"],
              ["JSP element that generates class-level variable", "Declaration (<%! %>)", "Common"],
              ["Servlet method called ONCE when first loaded", "init(ServletConfig)", "Common"],
              ["RMI method to register remote object", "Naming.bind() or Naming.rebind()", "Common"],
              ["Which RowSet works disconnected from DB?", "CachedRowSet", "Common"],
              ["JSP implicit object for application-wide data", "application (ServletContext)", "Common"],
              ["Design pattern with only ONE instance", "Singleton (Creational pattern)", "Common"],
            ]
          },
        ]
      },
      {
        qnum: "CHEAT",
        qtitle: "Quick Reference — All Key Concepts at a Glance",
        content: [
          { type: "heading", text: "Design Patterns — Quick Memory Aid" },
          { type: "diagram", text: `
GoF PATTERN CATEGORIES:
  CREATIONAL  → HOW objects created  → Singleton, Factory, Builder
  STRUCTURAL  → HOW objects composed → Adapter, Decorator, Facade
  BEHAVIORAL  → HOW objects communicate → MVC, Observer, Strategy

SINGLETON (exam common):
  private static Singleton instance = null;
  private Singleton() {}  // private constructor
  public static Singleton getInstance() {
      if (instance == null) instance = new Singleton();
      return instance;
  }

MVC QUICK RULE:
  Model = DATA + LOGIC (no Swing imports!)
  View  = UI only (no arithmetic!)
  Controller = Reads View → calls Model → updates View` },
          { type: "heading", text: "JDBC — Connection URL Formats" },
          { type: "diagram", text: `
MySQL:      jdbc:mysql://localhost:3306/dbname
Oracle:     jdbc:oracle:thin:@localhost:1521:orcl
PostgreSQL: jdbc:postgresql://localhost:5432/dbname
SQLite:     jdbc:sqlite:path/to/database.db

DRIVER CLASS NAMES:
  MySQL:      com.mysql.cj.jdbc.Driver   (modern) / com.mysql.jdbc.Driver (old)
  Oracle:     oracle.jdbc.driver.OracleDriver
  PostgreSQL: org.postgresql.Driver

executeQuery()  → for SELECT → returns ResultSet
executeUpdate() → for INSERT/UPDATE/DELETE → returns int (rows affected)
execute()       → for any SQL → returns boolean (true if ResultSet)` },
          { type: "heading", text: "Servlet vs JSP — Critical Differences" },
          { type: "diagram", text: `
Servlet:                          JSP:
  .java file                        .jsp file
  Pure Java code                    HTML + embedded Java tags
  out.println("<html>...")          Write HTML directly
  Controller in MVC                 View in MVC
  Faster (no translation)           Translated to Servlet first
  Better for logic                  Better for display

JSP SCRIPTING MEMORY AID:
  <%! int x; %>        Declaration  → Class level var (1 per class)
  <% out.print(x); %>  Scriptlet    → Inside _jspService() method
  <%= x + 1 %>         Expression   → Prints value directly (no semicolon!)
  <%-- comment --%>    JSP comment  → NOT sent to client (unlike <!-- -->)

JSP DIRECTIVE SUMMARY:
  <%@ page contentType="text/html" %>           → page settings
  <%@ include file="header.jsp" %>              → static include (compile time)
  <%@ taglib prefix="c" uri="jstl/core" %>     → import tag library` },
          { type: "heading", text: "RMI — 5 Steps Always" },
          { type: "diagram", text: `
RMI MUST-KNOW STEPS:

1. Remote Interface extends java.rmi.Remote
   ALL methods throws RemoteException

2. Implementation extends UnicastRemoteObject
   implements the Remote Interface

3. Server:
   Registry r = LocateRegistry.createRegistry(1099);
   Naming.rebind("rmi://localhost/ServiceName", impl);

4. Client:
   ServiceInterface obj = (ServiceInterface) Naming.lookup("rmi://localhost/ServiceName");

5. Client calls methods on obj — looks local, runs remotely!

KEY RMI TERMS:
  Stub     → Client-side proxy (serializes params, sends to server)
  Skeleton → Server-side (receives, deserializes, calls actual method)
  Marshaling   → Serializing params into byte stream for network
  Unmarshaling → Deserializing received bytes back to Java objects
  Registry → Naming service on port 1099` },
          { type: "heading", text: "JavaBean — 3 Rules to Always State" },
          { type: "diagram", text: `
THREE MANDATORY RULES (write these in every JavaBean answer!):

Rule 1: public NoArgConstructor() {}
  → Framework creates bean without knowing constructor args

Rule 2: private fields + getXxx()/setXxx() / isXxx() for boolean
  → Convention for property naming — enables introspection

Rule 3: implements java.io.Serializable
  → For persistence, HTTP sessions, network transfer

BOUND property  → fires PropertyChangeEvent AFTER change (uses PropertyChangeSupport)
CONSTRAINED     → fires VetoableChangeEvent BEFORE change — can be rejected (VetoableChangeSupport)` },
          { type: "tip", label: "TOP 5 MUST-PREPARE", text: "1) MVC Calculator (3 complete Java files with all 5 operations). 2) RMI example (interface + server + client). 3) PreparedStatement CRUD + transactions. 4) Servlet doGet/doPost + lifecycle (init/service/destroy). 5) JavaBean with bound+constrained properties. These 5 code examples cover ~60% of Group C marks." },
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

export default function Java() {
  const [activeUnit, setActiveUnit] = useState("u1");
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (key) => setOpenSections(p => ({ ...p, [key]: !p[key] }));
  const unit = UNITS.find(u => u.id === activeUnit);

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text, textAlign: "left" }}>
      <div style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#6366F1", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>☕</div>
          <div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: 19, fontWeight: 700 }}>Advanced Java Programming — BCA 6th Semester</h1>
            <div style={{ color: "#94A3B8", fontSize: 12, marginTop: 2 }}>Complete Exam Guide 2026 • CACS354 • 5 Units + Predictions</div>
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
