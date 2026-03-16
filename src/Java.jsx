import { useState } from "react";
const UNITS = [
  {
    id: "u1",
    title: "Unit 1 — Swing, AWT, Design Patterns, Layouts & Events",
    badge: "Assignment 1 + Lab 1",
    color: "#1A237E",
    sections: [
      {
        qnum: "Q1",
        qtitle: "Why is Swing called Lightweight & AWT called Heavyweight?",
        content: [
          {
            type: "explain",
            text: "To understand this, you need to know how Java draws UI components on screen. When you create a button, something has to actually paint it on your monitor. The question is: who does the painting — Java or the Operating System?"
          },
          {
            type: "heading", text: "AWT — Heavyweight Components"
          },
          {
            type: "explain",
            text: "AWT (Abstract Window Toolkit) was Java's original UI library. When you create an AWT component like a Button or TextField, Java secretly asks the Operating System to create a real, native OS widget. This native widget is called a \"peer\"."
          },
          {
            type: "analogy",
            text: "Imagine building a house and instead of drawing windows yourself, you call a construction company to install real glass windows. Each window is a real, heavy physical object managed by the construction company (the OS). That's AWT."
          },
          {
            type: "bullets",
            items: [
              "Each AWT component has a native OS peer — a real OS button, real OS text box, etc.",
              "The OS paints it, so the button looks like a Windows button on Windows, Mac button on Mac — appearance changes across platforms.",
              "Called heavyweight because they consume OS-level resources (memory, handles) for every component.",
              "Package: java.awt.*"
            ]
          },
          { type: "heading", text: "Swing — Lightweight Components" },
          {
            type: "explain",
            text: "Swing was introduced later and took a completely different approach. Instead of asking the OS for native widgets, Swing draws everything itself using Java's 2D graphics engine. There are NO native peers for Swing components."
          },
          {
            type: "analogy",
            text: "Now imagine you draw windows on the wall yourself with paint and a brush. They look exactly the same on every house because YOU draw them, not the construction company. They're lightweight because they're just paint — no heavy physical components. That's Swing."
          },
          {
            type: "bullets",
            items: [
              "Swing components have NO native OS peers — they draw themselves using Java2D graphics.",
              "Consistent look on ALL platforms (Write Once, Look Same Anywhere).",
              "Supports Pluggable Look-and-Feel (PLAF) — make Swing look like Windows, Mac, Metal, or Nimbus by changing one line.",
              "Supports extra features: HTML in labels, tool tips, borders, icons, custom renderers.",
              "Package: javax.swing.*"
            ]
          },
          {
            type: "tip",
            label: "KEY RULE",
            text: "Lightweight = drawn by Java (no OS peer). Heavyweight = drawn by OS (has native peer). Swing = lightweight. AWT = heavyweight."
          },
          { type: "heading", text: "Component & Container Relationship + Class Hierarchy" },
          {
            type: "explain",
            text: "In Swing/AWT, every visual element is a Component. Some components are special — they can hold other components inside them. Those are called Containers. A Container is also a Component (it can be placed inside another container). This forms a tree structure."
          },
          {
            type: "explain",
            text: "Think of it like Russian nesting dolls: A JFrame (window) contains a JPanel (container), which contains JButtons and JLabels (components)."
          },
          {
            type: "table",
            headers: ["Class", "Type", "Key Role"],
            rows: [
              ["java.lang.Object", "Root", "Base of all Java classes"],
              ["java.awt.Component", "Abstract", "Base for ALL visual elements. Handles painting, events, size, visibility."],
              ["java.awt.Container", "Abstract", "A Component that can HOLD children. Has add(), remove(), setLayout()."],
              ["java.awt.Frame", "AWT", "Top-level window WITH border and title bar (heavyweight)"],
              ["java.awt.Panel", "AWT", "Simple AWT container for grouping components"],
              ["javax.swing.JComponent", "Swing", "Base for ALL Swing components. Adds border, tooltip, accessibility."],
              ["javax.swing.JPanel", "Swing", "Most common Swing container. Groups and lays out components."],
              ["javax.swing.JFrame", "Swing", "Main application window (top-level Swing window)"],
              ["javax.swing.JButton", "Swing", "Clickable button"],
              ["javax.swing.JLabel", "Swing", "Displays text or image (non-editable)"],
              ["javax.swing.JTextField", "Swing", "Single-line text input field"],
              ["javax.swing.JTextArea", "Swing", "Multi-line text input/display"],
            ]
          }
        ]
      },
      {
        qnum: "Q2",
        qtitle: "What is a Design Pattern? Types & MVC with Example",
        content: [
          {
            type: "definition",
            text: "Design Pattern: A design pattern is a reusable, proven solution template for a problem that occurs repeatedly in software development. It is NOT actual code — it is a blueprint or recipe that you adapt to your specific situation."
          },
          {
            type: "analogy",
            text: "Think of design patterns like recipes in a cookbook. A recipe for 'chocolate cake' doesn't give you an exact cake, but tells you the steps and ingredients. You adapt it but follow the same structure."
          },
          { type: "heading", text: "Three Categories of Design Patterns (Gang of Four)" },
          {
            type: "table",
            headers: ["Category", "What it solves", "Key Patterns"],
            rows: [
              ["Creational", "How objects are CREATED. Controls object creation to avoid tight coupling.", "Singleton, Factory, Builder, Prototype"],
              ["Structural", "How objects are COMPOSED/structured. Organizes classes into larger structures.", "Adapter, Decorator, Facade, Proxy"],
              ["Behavioral", "How objects COMMUNICATE. Defines how objects interact and share responsibilities.", "MVC, Observer, Strategy, Command"],
            ]
          },
          { type: "heading", text: "MVC — Model View Controller (Deep Explanation)" },
          {
            type: "explain",
            text: "MVC divides your application into exactly 3 separate parts, each with a clear job:"
          },
          {
            type: "table",
            headers: ["Part", "Job", "What it contains", "Example (Calculator)"],
            rows: [
              ["Model", "Stores DATA and BUSINESS LOGIC. Does NOT know anything about the UI.", "Variables, calculations, DB calls, validation rules", "Stores numbers, performs add/subtract, holds result"],
              ["View", "Displays the Model's data to the user. The UI. Does NOT contain logic.", "JFrame, JButton, JLabel, JTextField — purely visual", "Shows text fields for input, labels for result"],
              ["Controller", "CONNECTS Model and View. Responds to user actions, updates Model, refreshes View.", "ActionListeners, event handlers, coordination logic", "When + button clicked: reads View, calls Model.add(), updates View"],
            ]
          },
          {
            type: "analogy",
            text: "Think of a restaurant: The MENU (View) shows what you can order. The KITCHEN (Model) prepares food. The WAITER (Controller) takes your order to the kitchen and brings back food. The menu doesn't cook. The kitchen doesn't talk to customers."
          },
          { type: "heading", text: "Advantages of MVC" },
          {
            type: "bullets",
            items: [
              "Separation of concerns: Change the UI (View) without touching any logic (Model).",
              "Testability: Unit-test the Model in isolation — no need to click buttons to test calculations.",
              "Reusability: Same Model can power a desktop View, web View, and mobile View.",
              "Parallel work: One developer works on UI (View), another on logic (Model) — no conflicts."
            ]
          },
          {
            type: "code",
            label: "MVC Calculator — Complete Working Example",
            lines: [
`// ═══════════════════════════════════════════════════════════
// MODEL: Holds data and all arithmetic logic.
// Rule: NO import javax.swing.* here — Model knows NOTHING about UI
// ═══════════════════════════════════════════════════════════
public class CalcModel {
    private double result = 0;  // stores last computed result

    public void add(double a, double b)      { result = a + b; }
    public void subtract(double a, double b) { result = a - b; }
    public void multiply(double a, double b) { result = a * b; }
    public void divide(double a, double b) {
        if (b == 0) throw new ArithmeticException("Cannot divide by zero!");
        result = a / b;
    }
    public void modulo(double a, double b)   { result = a % b; }

    // Controller reads result through this getter
    public double getResult() { return result; }
}`,
`// ═══════════════════════════════════════════════════════════
// VIEW: The user interface. Has input fields and output label.
// Rule: View only has UI code — no arithmetic, no business logic.
// ═══════════════════════════════════════════════════════════
import javax.swing.*; import java.awt.*;
public class CalcView extends JFrame {
    JTextField num1Field   = new JTextField("0", 8);
    JTextField num2Field   = new JTextField("0", 8);
    JLabel     resultLabel = new JLabel("Result: ---");
    JButton    btnAdd = new JButton("+"),  btnSub = new JButton("-");
    JButton    btnMul = new JButton("*"),  btnDiv = new JButton("/");
    JButton    btnMod = new JButton("%");

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

    // Helper methods for Controller to read View inputs
    public double getNum1() { return Double.parseDouble(num1Field.getText()); }
    public double getNum2() { return Double.parseDouble(num2Field.getText()); }

    // Controller calls this to update displayed result
    public void showResult(double result) {
        resultLabel.setText("Result: " + result);
    }
    public void showError(String msg) {
        JOptionPane.showMessageDialog(this, msg, "Error", JOptionPane.ERROR_MESSAGE);
    }
}`,
`// ═══════════════════════════════════════════════════════════
// CONTROLLER: Wires View events to Model actions.
// Listens to button clicks, reads from View, calls Model, updates View.
// ═══════════════════════════════════════════════════════════
public class CalcController {
    private CalcModel model;
    private CalcView  view;

    public CalcController(CalcModel m, CalcView v) {
        this.model = m;
        this.view  = v;
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
            double a = view.getNum1();  // Step 1: read from View
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
            view.showError("Please enter valid numbers!");
        } catch (ArithmeticException e) {
            view.showError(e.getMessage());
        }
    }

    // Entry point: creates all three parts and wires them
    public static void main(String[] args) {
        CalcModel      model = new CalcModel();
        CalcView       view  = new CalcView();
        new CalcController(model, view); // wiring happens here
    }
}`
            ]
          }
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Layout Managers — CardLayout, GridLayout, GridBagLayout",
        content: [
          {
            type: "definition",
            text: "Layout Manager: An object that automatically controls the size and position of components inside a Container. Without one, you would manually set pixel coordinates — which breaks on different screen sizes."
          },
          {
            type: "analogy",
            text: "A layout manager is like an interior designer for your window. Instead of measuring every piece of furniture yourself, the designer arranges everything automatically according to a set of rules."
          },
          {
            type: "table",
            headers: ["Layout", "Rule it follows", "Best used for"],
            rows: [
              ["FlowLayout", "Left-to-right in a row. Wraps when full.", "Simple row of buttons or labels"],
              ["BorderLayout", "5 regions: NORTH, SOUTH, EAST, WEST, CENTER.", "Main application window layout"],
              ["GridLayout", "Uniform grid cells — all same size.", "Calculator keypad, game boards"],
              ["GridBagLayout", "Flexible grid — each cell can span/resize differently.", "Complex forms with mixed field sizes"],
              ["CardLayout", "Stack of panels — only one visible at a time.", "Tabs, wizard pages, menu navigation"],
              ["BoxLayout", "Single row (X_AXIS) or column (Y_AXIS).", "Toolbars, vertical menus"],
            ]
          },
          { type: "heading", text: "GridBagConstraints — Key Properties" },
          {
            type: "table",
            headers: ["Constraint", "What it controls", "Example"],
            rows: [
              ["gridx, gridy", "Column and row position", "gridx=0, gridy=1 → col 0, row 1"],
              ["gridwidth, gridheight", "How many cols/rows the component spans", "gridwidth=2 → spans 2 columns"],
              ["weightx, weighty", "How much extra space this col/row gets on resize", "weightx=1.0 → field expands horizontally"],
              ["fill", "Whether component stretches to fill its cell", "HORIZONTAL, VERTICAL, BOTH, NONE"],
              ["anchor", "Where inside the cell the component sits", "EAST, WEST, CENTER, NORTH"],
              ["insets", "Padding/margins around the component", "new Insets(5,5,5,5) → 5px all sides"],
            ]
          },
          {
            type: "code",
            label: "CardLayout + GridLayout + GridBagLayout Demo",
            lines: [`import javax.swing.*;
import java.awt.*;

public class LayoutDemo extends JFrame {
    CardLayout cardLayout = new CardLayout();
    JPanel     cardPanel  = new JPanel(cardLayout);

    public LayoutDemo() {
        setTitle("Layout Demo"); setSize(520, 400);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        // ── CARD 1: GridLayout ─────────────────────────────────────
        // GridLayout(rows, cols, hgap, vgap) — all cells equal size
        JPanel gridPanel = new JPanel(new GridLayout(3, 2, 8, 8));
        gridPanel.setBorder(BorderFactory.createTitledBorder("GridLayout"));
        String[] labels = {"Name", "Email", "Phone", "City", "State", "ZIP"};
        for (String label : labels) {
            gridPanel.add(new JLabel(label + ":"));
            gridPanel.add(new JTextField(12));
        }

        // ── CARD 2: GridBagLayout ──────────────────────────────────
        JPanel gbPanel = new JPanel(new GridBagLayout());
        gbPanel.setBorder(BorderFactory.createTitledBorder("GridBagLayout"));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(6, 6, 6, 6);

        // Row 0: Username label (col 0)
        gbc.gridx=0; gbc.gridy=0;
        gbc.anchor=GridBagConstraints.EAST;
        gbc.fill=GridBagConstraints.NONE; gbc.weightx=0;
        gbPanel.add(new JLabel("Username:"), gbc);

        // Row 0: Username field (col 1) — expands horizontally
        gbc.gridx=1; gbc.gridy=0;
        gbc.fill=GridBagConstraints.HORIZONTAL;
        gbc.weightx=1.0; // give all extra space to this field
        gbPanel.add(new JTextField(15), gbc);

        // Row 1: Password
        gbc.gridx=0; gbc.gridy=1;
        gbc.fill=GridBagConstraints.NONE; gbc.weightx=0;
        gbc.anchor=GridBagConstraints.EAST;
        gbPanel.add(new JLabel("Password:"), gbc);

        gbc.gridx=1; gbc.gridy=1;
        gbc.fill=GridBagConstraints.HORIZONTAL; gbc.weightx=1.0;
        gbPanel.add(new JPasswordField(15), gbc);

        // Add both cards — each with a unique string KEY
        cardPanel.add(gridPanel, "GRID");
        cardPanel.add(gbPanel,   "GRIDBAG");

        // Navigation buttons
        JButton btnGrid = new JButton("Show GridLayout");
        JButton btnGB   = new JButton("Show GridBagLayout");
        // cardLayout.show(container, key) switches visible card
        btnGrid.addActionListener(e -> cardLayout.show(cardPanel, "GRID"));
        btnGB.addActionListener(e   -> cardLayout.show(cardPanel, "GRIDBAG"));

        JPanel nav = new JPanel();
        nav.add(btnGrid); nav.add(btnGB);
        add(cardPanel, BorderLayout.CENTER);
        add(nav,       BorderLayout.SOUTH);
        setVisible(true);
    }
    public static void main(String[] args) { new LayoutDemo(); }
}`]
          }
        ]
      },
      {
        qnum: "Q4",
        qtitle: "Creating 2D Shapes in Swing — Graphics2D",
        content: [
          {
            type: "explain",
            text: "Swing lets you draw custom graphics inside any component by overriding the paintComponent(Graphics g) method. The Graphics object is like a virtual paintbrush — you tell it the color, shape, and position to draw."
          },
          { type: "heading", text: "Graphics2D — Key Methods" },
          {
            type: "table",
            headers: ["Method", "What it does"],
            rows: [
              ["setColor(Color c)", "Set the current drawing/fill color"],
              ["setStroke(new BasicStroke(n))", "Set line thickness to n pixels"],
              ["drawRect(x, y, w, h)", "Draw rectangle outline only"],
              ["fillRect(x, y, w, h)", "Fill a solid rectangle"],
              ["drawString(text, x, y)", "Draw text at position (x, y)"],
              ["setFont(new Font(name, style, size))", "Set font. Styles: Font.PLAIN, Font.BOLD, Font.ITALIC"],
              ["setRenderingHint(...ANTIALIAS...)", "Enable smooth edges on curves"],
              ["getFontMetrics()", "Get font width/height info for centering text"],
            ]
          },
          {
            type: "tip",
            label: "IMPORTANT",
            text: "Always call super.paintComponent(g) as the FIRST LINE inside paintComponent(). This clears the background and prevents ghosting of old graphics."
          },
          {
            type: "code",
            label: "Red rectangle, black fill, white italic Arial 16 text 'BCA 6th'",
            lines: [`import javax.swing.*;
import java.awt.*;

public class ShapeDemo extends JFrame {
    public ShapeDemo() {
        setTitle("2D Shape Demo");
        setSize(420, 300);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        JPanel canvas = new JPanel() {
            @Override
            protected void paintComponent(Graphics g) {
                // ALWAYS call super first to clear background!
                super.paintComponent(g);

                // Cast to Graphics2D for advanced features
                Graphics2D g2 = (Graphics2D) g;

                // Enable anti-aliasing for smooth edges
                g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                                    RenderingHints.VALUE_ANTIALIAS_ON);

                // Step 1: Draw RED border (4px thick outline)
                g2.setStroke(new BasicStroke(4));
                g2.setColor(Color.RED);
                g2.drawRect(60, 70, 280, 130);  // x, y, width, height

                // Step 2: Fill inside with BLACK
                // Go 2px inside so red border is fully visible around fill
                g2.setColor(Color.BLACK);
                g2.fillRect(62, 72, 276, 126);

                // Step 3: Draw WHITE ITALIC text "BCA 6th"
                g2.setColor(Color.WHITE);
                g2.setFont(new Font("Arial", Font.ITALIC, 16));

                // Use FontMetrics to center the text inside the rectangle
                String text = "BCA 6th";
                FontMetrics fm = g2.getFontMetrics();
                int textX = 60 + (280 - fm.stringWidth(text)) / 2;
                int textY = 70 + (130 + fm.getAscent() - fm.getDescent()) / 2;
                g2.drawString(text, textX, textY);
            }
        };

        canvas.setBackground(Color.LIGHT_GRAY);
        add(canvas);
        setVisible(true);
    }
    public static void main(String[] args) { new ShapeDemo(); }
}`]
          }
        ]
      },
      {
        qnum: "Q5",
        qtitle: "Events & Java Event Delegation Model",
        content: [
          {
            type: "definition",
            text: "Event: An object that represents something that happened — a user clicked a button, pressed a key, moved the mouse, or closed a window. Java wraps all information about what happened into an Event Object."
          },
          {
            type: "explain",
            text: "Java uses the Event Delegation Model — instead of the component handling its own events, it delegates (passes) the job to a separate listener object."
          },
          { type: "heading", text: "3 Key Participants in the Delegation Model" },
          {
            type: "bullets",
            items: [
              "Event Source: The component that generates the event. A JButton generates an ActionEvent when clicked. The source knows WHO is listening (because you registered listeners with it).",
              "Event Object: The object Java creates containing information about the event. For a click: which button, when, which modifier keys were held. For a key press: which key, the key code.",
              "Event Listener: The object that HANDLES the event. It implements a listener interface and contains your handler method. The handler is called automatically when the event fires."
            ]
          },
          { type: "heading", text: "How Delegation Works — Step by Step" },
          {
            type: "table",
            headers: ["Step", "What happens"],
            rows: [
              ["1. Register", "You call source.addActionListener(listenerObject) — source now knows who to call"],
              ["2. User acts", "User clicks the button (the Event Source)"],
              ["3. Event created", "Java creates an ActionEvent object with details about the click"],
              ["4. Source notifies", "Source calls listenerObject.actionPerformed(event) automatically"],
              ["5. Handler runs", "Your code inside actionPerformed() executes"],
            ]
          },
          { type: "heading", text: "Common Events and Listeners" },
          {
            type: "table",
            headers: ["Event Type", "Listener Interface", "Main Method", "Triggered by"],
            rows: [
              ["ActionEvent", "ActionListener", "actionPerformed(e)", "Button click, Enter in TextField, Menu select"],
              ["MouseEvent", "MouseListener", "mouseClicked/Pressed/Released/Entered/Exited", "Mouse actions on component"],
              ["KeyEvent", "KeyListener", "keyPressed/Released/Typed", "Keyboard input"],
              ["WindowEvent", "WindowListener", "windowClosing/Opened/Closed", "Window operations"],
              ["ItemEvent", "ItemListener", "itemStateChanged(e)", "Checkbox/radio button toggle"],
            ]
          },
          {
            type: "code",
            label: "Event Delegation — 3 Listener Styles (Named, Anonymous, Lambda)",
            lines: [`import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class EventDemo extends JFrame {
    public EventDemo() {
        setTitle("Event Delegation Demo");
        setLayout(new FlowLayout(FlowLayout.CENTER, 15, 15));

        JButton btn1 = new JButton("Style 1: Named Class");
        JButton btn2 = new JButton("Style 2: Anonymous Class");
        JButton btn3 = new JButton("Style 3: Lambda");
        JLabel  output = new JLabel("Click any button...");
        output.setFont(new Font("Arial", Font.BOLD, 14));

        // Style 1: Separate named class (most explicit)
        // Good for complex handlers that need their own fields/methods
        class MyListener implements ActionListener {
            @Override
            public void actionPerformed(ActionEvent e) {
                // e.getActionCommand() returns the button's text label
                output.setText("Named class: " + e.getActionCommand());
            }
        }
        btn1.addActionListener(new MyListener());

        // Style 2: Anonymous inner class (traditional Java 7-)
        // Good when handler is simple and used only once
        btn2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                output.setText("Anonymous class clicked!");
            }
        });

        // Style 3: Lambda expression (modern Java 8+)
        // Shortest syntax. Works because ActionListener has only ONE method.
        btn3.addActionListener(e -> output.setText("Lambda: " + e.getActionCommand()));

        add(btn1); add(btn2); add(btn3); add(output);
        pack();
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setVisible(true);
    }
    public static void main(String[] args) { new EventDemo(); }
}`]
          }
        ]
      },
      {
        qnum: "Q6",
        qtitle: "Listeners vs Adaptors",
        content: [
          {
            type: "explain",
            text: "Some event listener interfaces have multiple methods. For example, MouseListener forces you to implement ALL 5 methods even if you only care about one. This creates 'empty stub' code clutter."
          },
          {
            type: "definition",
            text: "Adaptor Class: An adaptor is an abstract class that ALREADY implements all methods of a listener interface with empty (do-nothing) bodies. You extend the adaptor and ONLY override the methods you care about."
          },
          {
            type: "table",
            headers: ["Aspect", "Listener Interface", "Adaptor Class"],
            rows: [
              ["Type", "Interface", "Abstract class (pre-implements all methods as empty)"],
              ["You must implement", "ALL methods — or compile error", "Only the methods you actually need"],
              ["Flexibility", "Can extend another class freely", "Locks up your one inheritance slot"],
              ["Code cleanliness", "Messy — many empty stub methods", "Clean — only relevant methods"],
              ["Example", "MouseListener (5 methods)", "MouseAdapter, KeyAdapter, WindowAdapter"],
            ]
          },
          {
            type: "code",
            label: "Listener vs Adaptor Comparison",
            lines: [`// Using Listener — must write all 5 methods even if only 1 needed
class UsingListener implements MouseListener {
    public void mouseClicked(MouseEvent e)  {
        System.out.println("Clicked at: " + e.getX() + ", " + e.getY());
    }
    public void mousePressed(MouseEvent e)  { }  // empty — forced
    public void mouseReleased(MouseEvent e) { }  // empty — forced
    public void mouseEntered(MouseEvent e)  { }  // empty — forced
    public void mouseExited(MouseEvent e)   { }  // empty — forced
}

// Using Adaptor — only override what you need. Clean!
class UsingAdaptor extends MouseAdapter {
    @Override
    public void mouseClicked(MouseEvent e) {
        System.out.println("Clicked at: " + e.getX() + ", " + e.getY());
    }
    // No need to write the other 4 empty methods!
}

// Most common: anonymous adaptor inline
panel.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseClicked(MouseEvent e) {
        System.out.println("Mouse clicked at " + e.getX());
    }
    @Override
    public void mouseEntered(MouseEvent e) {
        panel.setBackground(Color.YELLOW); // highlight on hover
    }
});`]
          },
          {
            type: "warning",
            text: "Disadvantage of Adaptor: Java has single inheritance. If your class already extends another class, it CANNOT also extend MouseAdapter. Solution: use anonymous inner class or lambda."
          }
        ]
      }
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
        qtitle: "What is JDBC? Architecture & 6 Steps",
        content: [
          {
            type: "definition",
            text: "JDBC (Java Database Connectivity): A Java API (set of interfaces in java.sql.*) that provides a standard way for Java programs to connect to and communicate with any relational database — MySQL, Oracle, PostgreSQL, SQLite — using the same Java code regardless of which database is used."
          },
          {
            type: "analogy",
            text: "Think of JDBC like a universal TV remote. Instead of learning a separate remote for every TV brand, you use one standard remote and a small translator box (the JDBC driver) converts the commands to that specific TV's signals."
          },
          { type: "heading", text: "JDBC Architecture — 4 Layers" },
          {
            type: "bullets",
            items: [
              "Layer 1 — Java Application: Your Java code. Uses only JDBC API interfaces. Never directly calls the database.",
              "Layer 2 — JDBC API: Standard interfaces in java.sql.*. Defines what operations are possible.",
              "Layer 3 — DriverManager + JDBC Driver: DriverManager finds the right driver. The Driver translates JDBC calls into the database's own protocol.",
              "Layer 4 — Database: The actual RDBMS (MySQL, Oracle, etc.) receives queries and returns results."
            ]
          },
          { type: "heading", text: "6 Steps to Use JDBC" },
          {
            type: "table",
            headers: ["Step", "Code", "What it does"],
            rows: [
              ["1. Connect", "DriverManager.getConnection(url, user, pass)", "Opens TCP connection to DB, authenticates"],
              ["2. Create Statement", "con.createStatement()", "Creates object to send SQL queries"],
              ["3. Execute", "st.executeQuery(\"SELECT ...\")", "Sends SQL to DB, gets ResultSet back"],
              ["4. Process", "while(rs.next()) { rs.getString(\"col\"); }", "Iterate through each row of returned data"],
              ["5. Close", "rs.close(); st.close(); con.close()", "Release DB connections (expensive resource!)"],
            ]
          }
        ]
      },
      {
        qnum: "Q2",
        qtitle: "JDBC Driver Types — All 4 Types",
        content: [
          {
            type: "explain",
            text: "A JDBC driver is a translator between your Java JDBC calls and the specific database's native communication protocol. There are 4 types:"
          },
          {
            type: "table",
            headers: ["Type", "Name", "Mechanism", "Use today?"],
            rows: [
              ["Type 1", "JDBC-ODBC Bridge", "JDBC → ODBC (Windows middleware) → DB", "Deprecated in Java 8+. Avoid."],
              ["Type 2", "Native-API Driver", "JDBC → Native C/C++ DB library → DB", "Rare. Needs native lib installed."],
              ["Type 3", "Network Protocol", "JDBC → Middleware server → DB", "Rare. Extra middleware needed."],
              ["Type 4", "Thin Driver (Pure Java)", "JDBC → Directly to DB via socket", "ALWAYS USE THIS. Best performance."],
            ]
          },
          {
            type: "tip",
            label: "ALWAYS",
            text: "Use Type 4 in modern applications. Example: MySQL Connector/J driver class = com.mysql.cj.jdbc.Driver. Just add the JAR to your classpath."
          }
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Statement vs PreparedStatement",
        content: [
          {
            type: "explain",
            text: "Both are used to send SQL to the database, but they work differently in terms of security, performance, and use cases."
          },
          {
            type: "table",
            headers: ["Aspect", "Statement", "PreparedStatement"],
            rows: [
              ["SQL Compilation", "Compiled fresh every single execution", "Compiled ONCE, reused many times"],
              ["Parameters", "Values hardcoded in SQL string — dangerous", "Uses ? placeholders — safe"],
              ["SQL Injection", "VULNERABLE — attacker can manipulate SQL", "PROTECTED — parameters are always escaped"],
              ["Performance", "Slow for repeated queries", "Fast for repeated queries (reuses compiled query)"],
              ["Use case", "DDL only (CREATE TABLE, DROP TABLE)", "All DML with user input (INSERT, SELECT, UPDATE, DELETE)"],
            ]
          },
          {
            type: "warning",
            text: "NEVER use Statement for user input. If user types ' OR 1=1 -- as username, your SQL becomes WHERE user='' OR 1=1 -- which returns ALL rows — a security breach!"
          },
          {
            type: "code",
            label: "Statement vs PreparedStatement — SQL Injection Demo",
            lines: [`import java.sql.*;

public class StmtDemo {
    public static void main(String[] args) throws Exception {
        Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb", "root", "password");

        // ════════════════════════════════════════
        // STATEMENT — DANGEROUS for user input!
        // ════════════════════════════════════════
        Statement st = con.createStatement();

        String userInput = "Alice";
        // Direct string concatenation — SQL injection risk!
        String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
        // Safe if userInput="Alice" → WHERE name='Alice'
        // ATTACK: if userInput = "' OR '1'='1"
        //   → WHERE name='' OR '1'='1'  → returns ALL rows!

        ResultSet rs1 = st.executeQuery(sql);
        while (rs1.next()) System.out.println(rs1.getString("name"));

        // ════════════════════════════════════════
        // PREPAREDSTATEMENT — SAFE! Always use.
        // ════════════════════════════════════════
        // SQL template sent to DB once — DB compiles it
        PreparedStatement ps = con.prepareStatement(
            "SELECT * FROM users WHERE name = ?");

        // Fill the ? with actual value — it is ESCAPED, never becomes SQL
        ps.setString(1, "Alice");  // 1 = position of first ?
        ResultSet rs2 = ps.executeQuery();
        while (rs2.next()) System.out.println(rs2.getString("name"));

        // Reuse with different value — DB reuses compiled query (fast!)
        ps.setString(1, "Bob");
        rs2 = ps.executeQuery();

        // INSERT example
        PreparedStatement ins = con.prepareStatement(
            "INSERT INTO users(name, age) VALUES(?, ?)");
        ins.setString(1, "Carol");
        ins.setInt(2, 25);
        int rows = ins.executeUpdate(); // returns number of rows affected
        System.out.println(rows + " row inserted.");

        rs1.close(); rs2.close(); st.close(); ps.close(); ins.close(); con.close();
    }
}`]
          }
        ]
      },
      {
        qnum: "Q4",
        qtitle: "Scrollable & Non-Scrollable ResultSets + Updatable ResultSet",
        content: [
          {
            type: "explain",
            text: "By default, a ResultSet cursor can only move FORWARD one row at a time with rs.next(). A Scrollable ResultSet lets the cursor move in any direction — forward, backward, or jump to any row."
          },
          {
            type: "table",
            headers: ["Type", "Constant", "What it means"],
            rows: [
              ["Non-scrollable (default)", "TYPE_FORWARD_ONLY", "Cursor moves forward only. Fast and memory-efficient."],
              ["Scrollable (not live)", "TYPE_SCROLL_INSENSITIVE", "Cursor moves any direction. DB changes after RS creation NOT reflected."],
              ["Scrollable (live)", "TYPE_SCROLL_SENSITIVE", "Cursor moves any direction. DB changes ARE reflected. Slower."],
              ["Read-only (default)", "CONCUR_READ_ONLY", "Cannot modify data through ResultSet."],
              ["Updatable", "CONCUR_UPDATABLE", "Can call updateString(), updateRow() to modify DB through RS."],
            ]
          },
          {
            type: "code",
            label: "Scrollable and Updatable ResultSet — Full Navigation Demo",
            lines: [`import java.sql.*;

public class ScrollableRS {
    public static void main(String[] args) throws Exception {
        Connection con = DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/testdb", "root", "password");

        // Create statement with scrollable + updatable options
        Statement st = con.createStatement(
            ResultSet.TYPE_SCROLL_INSENSITIVE,  // can scroll any direction
            ResultSet.CONCUR_UPDATABLE           // can update rows through RS
        );

        ResultSet rs = st.executeQuery("SELECT id, name, score FROM students");

        // ── Navigation methods ──────────────────────────────────────
        rs.last();                     // jump to last row
        int totalRows = rs.getRow();   // getRow() = current row number
        System.out.println("Total rows: " + totalRows);

        rs.first();                    // go back to first row
        System.out.println("First: " + rs.getString("name"));

        rs.absolute(3);               // jump directly to row 3
        System.out.println("Row 3: " + rs.getString("name"));

        rs.relative(2);               // move 2 rows forward from current
        rs.relative(-1);              // move 1 row backward

        // ── Update a row through ResultSet ──────────────────────────
        rs.absolute(2);                        // position at row 2
        rs.updateString("name", "UpdatedName"); // modify column in RS
        rs.updateDouble("score", 95.5);
        rs.updateRow();                        // push changes to database!

        // ── Insert a new row through ResultSet ─────────────────────
        rs.moveToInsertRow();         // move to special insert buffer
        rs.updateInt("id", 999);
        rs.updateString("name", "New Student");
        rs.updateDouble("score", 88.0);
        rs.insertRow();               // send new row to database
        rs.moveToCurrentRow();        // return from insert buffer

        rs.close(); st.close(); con.close();
    }
}`]
          }
        ]
      },
      {
        qnum: "Q5",
        qtitle: "RowSet — Types & Difference from ResultSet",
        content: [
          {
            type: "definition",
            text: "RowSet: An enhanced version of ResultSet that implements the JavaBeans component model. It adds: automatic connection management, event listeners, scrollable/updatable by default, and the ability to work DISCONNECTED from the database."
          },
          {
            type: "table",
            headers: ["Feature", "ResultSet", "RowSet"],
            rows: [
              ["Connection", "Must stay connected during use", "CachedRowSet can disconnect after loading"],
              ["JavaBeans", "Not a JavaBean", "Full JavaBean — fires PropertyChangeEvents"],
              ["Scrollable", "Depends on Statement settings", "Always scrollable"],
              ["Updatable", "Depends on Statement settings", "Always updatable"],
              ["Serializable", "No — cannot send over network", "Yes — can be sent between JVMs"],
            ]
          },
          { type: "heading", text: "RowSet Types" },
          {
            type: "table",
            headers: ["RowSet Type", "Connected?", "Description"],
            rows: [
              ["JdbcRowSet", "Connected", "Thin wrapper around ResultSet. Always connected. Scrollable & updatable."],
              ["CachedRowSet", "Disconnected", "Loads all data into memory. Disconnects. Reconnects to sync changes."],
              ["WebRowSet", "Disconnected", "Extends CachedRowSet. Can read/write data as XML."],
              ["FilteredRowSet", "Disconnected", "Extends WebRowSet. Apply filter in memory without new SQL query."],
              ["JoinRowSet", "Disconnected", "Combine multiple RowSets like SQL JOIN — without database connection."],
            ]
          }
        ]
      }
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
        qtitle: "JavaBean — Definition, Rules & Advantages",
        content: [
          {
            type: "definition",
            text: "JavaBean: A reusable Java class that follows a specific set of coding conventions (design patterns) so that tools (IDEs, frameworks, visual builders) can automatically discover, configure, and connect its properties, events, and methods — without reading your source code."
          },
          {
            type: "analogy",
            text: "Think of a JavaBean like a USB device. The USB standard defines the connector shape (conventions). Any computer can plug in any USB device without knowing how the device works inside. Similarly, any framework can use any JavaBean because it follows the conventions."
          },
          { type: "heading", text: "The 3 Rules Every JavaBean Must Follow" },
          {
            type: "bullets",
            items: [
              "Rule 1 — Public No-Argument Constructor: Must have public ClassName() {}. Frameworks need to create your bean without knowing what constructor arguments to pass.",
              "Rule 2 — Private Fields with Public Getters/Setters: Properties accessed via getPropertyName() and setPropertyName(value). Boolean properties use isPropertyName().",
              "Rule 3 — Implements java.io.Serializable: Bean must be serializable so it can be saved to disk, sent over network, or stored in HTTP sessions."
            ]
          },
          {
            type: "table",
            headers: ["Advantage", "Why it matters"],
            rows: [
              ["Reusability", "Write once, use in any framework — Spring, JSP, JSF, EJB, IDEs."],
              ["Introspection", "IDEs and frameworks discover properties/methods automatically at runtime via reflection."],
              ["Persistence", "Serializable means bean state can be saved and restored — sessions, databases, files."],
              ["Events", "Beans can fire PropertyChangeEvents and VetoableChangeEvents to communicate changes."],
              ["Customization", "Visual IDEs show bean properties in a GUI panel for configuration."],
              ["Loose Coupling", "JSP uses <jsp:setProperty> without knowing how the bean works inside."],
            ]
          },
          {
            type: "code",
            label: "StudentBean — Proper JavaBean with all conventions",
            lines: [`import java.io.Serializable;  // Rule 3: must be serializable

public class StudentBean implements Serializable {
    private static final long serialVersionUID = 1L;

    // Private fields — never accessed directly from outside
    private int    id;
    private String name;
    private double gpa;
    private boolean active;

    // Rule 1: Public No-Argument Constructor
    // Frameworks need this to create beans: new StudentBean()
    public StudentBean() {
        this.active = true; // optional default value
    }

    // Rule 2: Getter and Setter for each property
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) {
        if (name == null || name.trim().isEmpty())
            throw new IllegalArgumentException("Name cannot be empty!");
        this.name = name;
    }

    public double getGpa() { return gpa; }
    public void setGpa(double gpa) {
        if (gpa < 0 || gpa > 4.0)
            throw new IllegalArgumentException("GPA must be 0–4.0");
        this.gpa = gpa;
    }

    // Boolean property — getter uses "is" prefix (Bean convention!)
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    @Override
    public String toString() {
        return "StudentBean{id=" + id + ", name='" + name + "', gpa=" + gpa + "}";
    }
}`]
          }
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Introspection — Mechanism & Program",
        content: [
          {
            type: "definition",
            text: "Introspection: The ability of a program to examine a JavaBean at RUNTIME to automatically discover its properties, events, and methods — without knowing the bean's class at compile time. Java provides java.beans.Introspector for this."
          },
          { type: "heading", text: "How Introspection Works" },
          {
            type: "bullets",
            items: [
              "Looking for getXxx() / isXxx() methods → identifies a readable property named 'xxx'",
              "Looking for setXxx(value) methods → identifies a writable property",
              "Looking for addXxxListener() methods → identifies events the bean fires",
              "This is how JSP's <jsp:setProperty name='s' property='name' value='Hari'/> works — it introspects to find setName() and calls it!"
            ]
          },
          {
            type: "code",
            label: "Introspection — Inspect StudentBean at Runtime",
            lines: [`import java.beans.*;
import java.lang.reflect.Method;

public class IntrospectionDemo {
    public static void main(String[] args) throws Exception {
        // getBeanInfo(class, stopClass) analyzes the bean
        // Passing Object.class excludes inherited Object methods
        BeanInfo info = Introspector.getBeanInfo(StudentBean.class, Object.class);

        System.out.println("=== PROPERTIES DISCOVERED ===");
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            System.out.println("Property : " + pd.getName());
            System.out.println("  Type   : " + pd.getPropertyType().getSimpleName());
            System.out.println("  Getter : " + pd.getReadMethod().getName());
            System.out.println("  Setter : " + pd.getWriteMethod().getName());
        }

        System.out.println("\n=== METHODS DISCOVERED ===");
        for (MethodDescriptor md : info.getMethodDescriptors())
            System.out.println("Method: " + md.getName());

        // Dynamic property setting via introspection
        // This is exactly how Spring and JSP frameworks inject values!
        StudentBean bean = new StudentBean();
        for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
            if ("name".equals(pd.getName()) && pd.getWriteMethod() != null) {
                pd.getWriteMethod().invoke(bean, "Sita Kumari");
                System.out.println("Set name via introspection: " + bean.getName());
            }
        }
    }
}`]
          }
        ]
      },
      {
        qnum: "Q4",
        qtitle: "Bound & Constrained Bean Properties",
        content: [
          {
            type: "bullets",
            items: [
              "Simple Property: Plain getter/setter. No notification to anyone when value changes.",
              "Bound Property: Fires a PropertyChangeEvent to registered listeners AFTER the value changes. Listeners implement PropertyChangeListener.",
              "Constrained Property: Fires a VetoableChangeEvent BEFORE changing. Listeners can throw PropertyVetoException to REJECT the change. Only changes if no veto."
            ]
          },
          {
            type: "code",
            label: "Bound & Constrained Properties — EmployeeBean",
            lines: [`import java.beans.*;

public class EmployeeBean implements java.io.Serializable {
    private String name;
    private double salary;

    // Support objects for Bound and Constrained properties
    private PropertyChangeSupport pcs = new PropertyChangeSupport(this);
    private VetoableChangeSupport vcs = new VetoableChangeSupport(this);

    // ── BOUND PROPERTY: name ──────────────────────────────────────────
    // Fires PropertyChangeEvent AFTER the value changes
    public String getName() { return name; }
    public void setName(String newName) {
        String oldName = this.name;
        this.name = newName;
        // Notify all registered PropertyChangeListeners
        pcs.firePropertyChange("name", oldName, newName);
    }

    // ── CONSTRAINED PROPERTY: salary ─────────────────────────────────
    // Listeners can VETO (reject) the change before it happens
    public double getSalary() { return salary; }
    public void setSalary(double newSalary) throws PropertyVetoException {
        double oldSalary = this.salary;
        // Ask all VetoableChangeListeners — any can throw to veto
        vcs.fireVetoableChange("salary", oldSalary, newSalary);
        this.salary = newSalary; // only reached if no veto was thrown
        pcs.firePropertyChange("salary", oldSalary, newSalary);
    }

    // Register/unregister listeners
    public void addPropertyChangeListener(PropertyChangeListener l) {
        pcs.addPropertyChangeListener(l);
    }
    public void addVetoableChangeListener(VetoableChangeListener l) {
        vcs.addVetoableChangeListener(l);
    }

    public static void main(String[] args) throws Exception {
        EmployeeBean emp = new EmployeeBean();

        // Bound property listener — notified AFTER name changes
        emp.addPropertyChangeListener(evt ->
            System.out.println("Name changed: " + evt.getOldValue() +
                               " → " + evt.getNewValue()));

        // Constrained property listener — can REJECT negative salary
        emp.addVetoableChangeListener(evt -> {
            if ((double) evt.getNewValue() < 0)
                throw new PropertyVetoException("Salary cannot be negative!", evt);
        });

        emp.setName("Ram");      // triggers PropertyChangeEvent
        emp.setSalary(50000);    // OK — no veto
        // emp.setSalary(-1000); // throws PropertyVetoException!
    }
}`]
          }
        ]
      }
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
        qtitle: "Servlet — What it is & Complete Lifecycle",
        content: [
          {
            type: "definition",
            text: "Servlet: A Java class that runs inside a web server (Servlet Container, e.g., Apache Tomcat). It handles HTTP requests from browsers/clients and generates HTTP responses (usually HTML). It is the server-side of a Java web application."
          },
          {
            type: "analogy",
            text: "A Servlet is like a chef at a restaurant. The waiter (Tomcat) receives the customer's order (HTTP request) and hands it to the chef (Servlet). The chef prepares the food (processes the request) and gives it back to deliver to the customer (HTTP response)."
          },
          { type: "heading", text: "Servlet Lifecycle — 3 Phases" },
          {
            type: "table",
            headers: ["Phase", "Method", "When called", "What to do here"],
            rows: [
              ["Initialization", "init(ServletConfig)", "ONCE when servlet first loads", "Open DB connections, read config, load properties"],
              ["Service", "service() → doGet()/doPost()", "EVERY request", "Handle user requests. doGet for fetching, doPost for form submit"],
              ["Destruction", "destroy()", "ONCE on server shutdown", "Close DB connections, save state, cleanup resources"],
            ]
          },
          {
            type: "tip",
            label: "IMPORTANT",
            text: "The Container creates only ONE instance of each Servlet and reuses it for ALL requests. Multiple threads call service() simultaneously! Never use instance variables for request-specific data — use local variables instead."
          },
          {
            type: "code",
            label: "Complete Servlet with all lifecycle methods",
            lines: [`import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

// @WebServlet maps URL "/hello" to this Servlet
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    private String appName; // instance variable — shared across requests

    // ── PHASE 1: INITIALIZATION ──────────────────────────────────────
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config); // ALWAYS call super.init() first!
        appName = config.getInitParameter("appName");
        if (appName == null) appName = "DefaultApp";
        System.out.println("Servlet initialized. App: " + appName);
    }

    // ── PHASE 2a: HANDLE GET REQUESTS ───────────────────────────────
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        String name = request.getParameter("name"); // read URL param ?name=Hari
        if (name == null) name = "Guest";

        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE html>");
        out.println("<html><body>");
        out.println("<h1>Hello, " + name + "!</h1>");
        out.println("<p>Welcome to " + appName + "</p>");
        out.println("</body></html>");
    }

    // ── PHASE 2b: HANDLE POST REQUESTS ──────────────────────────────
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8"); // handle UTF-8 form data
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<h2>Received: " + username + "</h2>");
    }

    // ── PHASE 3: DESTRUCTION ─────────────────────────────────────────
    @Override
    public void destroy() {
        System.out.println("Servlet destroying. Releasing resources...");
    }
}`]
          }
        ]
      },
      {
        qnum: "Q3",
        qtitle: "Sessions & Cookies — State Management",
        content: [
          {
            type: "explain",
            text: "HTTP is stateless — each request is completely independent. The server has NO memory of previous requests. Sessions and cookies solve this by carrying state information between requests."
          },
          {
            type: "table",
            headers: ["Aspect", "Session (HttpSession)", "Cookie"],
            rows: [
              ["Storage", "Server-side (server memory or DB)", "Client-side (browser storage)"],
              ["What stored", "Any Java object (Map, List, UserObject)", "Only small strings (name=value)"],
              ["Size limit", "No limit (server memory)", "4 KB per cookie; ~20 per domain"],
              ["Security", "More secure — data on server", "Less secure — visible in browser"],
              ["Lifetime", "Ends when browser closes or timeout", "Persists until Max-Age expires"],
              ["Use case", "Login sessions, shopping cart", "Remember me, theme, language preference"],
            ]
          },
          {
            type: "code",
            label: "Sessions and Cookies — Complete Examples",
            lines: [`// ════════════════════════════════════════
// SESSIONS
// ════════════════════════════════════════

// Create/get session (creates new if none exists)
HttpSession session = request.getSession();
// request.getSession(false) → return null if no session (don't create)

session.setAttribute("loggedUser", "Hari");   // store any Java object
session.setAttribute("role", "admin");
session.setMaxInactiveInterval(30 * 60);       // expire after 30 min inactivity

// Reading session data (in another servlet or JSP)
String user = (String) session.getAttribute("loggedUser");
if (user == null) {
    response.sendRedirect("login.jsp"); // not logged in
    return; // IMPORTANT: stop processing after redirect
}

// Logout — destroy session completely
session.invalidate();

// ════════════════════════════════════════
// COOKIES
// ════════════════════════════════════════

// CREATING and sending cookie to browser
Cookie themeCookie = new Cookie("theme", "dark");
themeCookie.setMaxAge(7 * 24 * 60 * 60); // persist 7 days (in seconds)
themeCookie.setPath("/");                 // send for ALL pages on this server
themeCookie.setHttpOnly(true);            // JS cannot access (XSS protection)
response.addCookie(themeCookie);          // send to browser in HTTP response

// READING cookies from incoming request
Cookie[] cookies = request.getCookies();
if (cookies != null) {
    for (Cookie c : cookies) {
        if ("theme".equals(c.getName())) {
            String theme = c.getValue(); // "dark" or "light"
        }
    }
}

// DELETING a cookie — set Max-Age to 0
Cookie deleteCookie = new Cookie("theme", "");
deleteCookie.setMaxAge(0); // browser deletes it immediately
response.addCookie(deleteCookie);`]
          }
        ]
      },
      {
        qnum: "Q4-13",
        qtitle: "JSP — Scripting, Directives, Implicit Objects, Actions, Lifecycle",
        content: [
          {
            type: "definition",
            text: "JSP (JavaServer Pages): Allows you to embed Java code directly inside HTML pages using special tags. When a user requests a JSP page, the server converts it to a Servlet, compiles it, and runs it. The output (HTML) is sent to the browser."
          },
          { type: "heading", text: "JSP Scripting Elements — 3 Types" },
          {
            type: "table",
            headers: ["Element", "Syntax", "Where in Servlet", "When to use"],
            rows: [
              ["Declaration", "<%! int count = 0; %>", "Class level (outside _jspService)", "Declare class-level variables/methods"],
              ["Scriptlet", "<% out.println(\"hi\"); %>", "Inside _jspService() method", "Write Java logic — conditionals, loops"],
              ["Expression", "<%= user.getName() %>", "Inside _jspService(), outputs directly", "Print a value to HTML (no semicolon!)"],
            ]
          },
          { type: "heading", text: "JSP Directives" },
          {
            type: "table",
            headers: ["Directive", "Syntax", "Purpose"],
            rows: [
              ["page", "<%@ page language='java' contentType='text/html; charset=UTF-8' %>", "Set page-level attributes: charset, imports, error page, session"],
              ["include", "<%@ include file='header.jsp' %>", "STATIC include — merged at compile time. Fast. Both pages recompile if header changes."],
              ["taglib", "<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %>", "Import a tag library (like JSTL) for use in this page"],
            ]
          },
          { type: "heading", text: "JSP Implicit Objects — 9 Always Available" },
          {
            type: "table",
            headers: ["Object", "Type", "Use it to…"],
            rows: [
              ["request", "HttpServletRequest", "Read parameters, attributes, headers, session"],
              ["response", "HttpServletResponse", "Set headers, redirect, set content type"],
              ["out", "JspWriter", "Write HTML output to browser"],
              ["session", "HttpSession", "Store/retrieve user session data"],
              ["application", "ServletContext", "Application-wide data shared by all users"],
              ["pageContext", "PageContext", "Access all scopes (page, request, session, app)"],
              ["config", "ServletConfig", "Read servlet config parameters"],
              ["page", "Object (this)", "Reference to this JSP's Servlet instance"],
              ["exception", "Throwable", "Only in error pages. Holds the exception."],
            ]
          },
          { type: "heading", text: "JSP Standard Action Tags" },
          {
            type: "table",
            headers: ["Tag", "What it does"],
            rows: [
              ["<jsp:include page='header.jsp'/>", "DYNAMIC include — includes another JSP at request time. Each compiled separately."],
              ["<jsp:forward page='result.jsp'/>", "Forward request to another page. URL in browser does NOT change."],
              ["<jsp:useBean id='s' class='StudentBean' scope='session'/>", "Find existing bean in scope, or create new one if not found."],
              ["<jsp:setProperty name='s' property='name' value='Hari'/>", "Call setName('Hari') on bean 's' using introspection."],
              ["<jsp:getProperty name='s' property='name'/>", "Call getName() and output the result to HTML."],
            ]
          },
          { type: "heading", text: "JSP Lifecycle" },
          {
            type: "table",
            headers: ["Phase", "What happens"],
            rows: [
              ["1. Translation", "Container reads .jsp file → generates page_jsp.java Servlet file"],
              ["2. Compilation", "The .java file is compiled to a .class file"],
              ["3. Loading", "Compiled class loaded into JVM memory"],
              ["4. Instantiation", "Object of the Servlet class is created"],
              ["5. jspInit()", "Called ONCE for initialization (override if needed)"],
              ["6. _jspService()", "Called for EVERY request. Handles req/res. Do NOT override this!"],
              ["7. jspDestroy()", "Called ONCE before the page is unloaded"],
            ]
          },
          { type: "heading", text: "JSP vs Servlet Comparison" },
          {
            type: "table",
            headers: ["Aspect", "JSP", "Servlet"],
            rows: [
              ["File type", ".jsp (HTML with Java tags)", ".java (pure Java class)"],
              ["Best for", "Presentation (View layer)", "Business logic (Controller layer)"],
              ["Translation", "Converted to Servlet by container", "Compiled directly by developer"],
              ["HTML ease", "Easy — write HTML naturally", "Tedious — out.println() for each line"],
              ["MVC role", "View", "Controller"],
            ]
          }
        ]
      }
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
        qtitle: "RMI — Architecture & Complete Example",
        content: [
          {
            type: "definition",
            text: "RMI (Remote Method Invocation): A Java mechanism that allows an object running in one JVM (on one computer) to call methods of an object running in a DIFFERENT JVM. The network communication is completely hidden from the programmer — it looks like a local method call."
          },
          {
            type: "analogy",
            text: "Imagine you can call a friend in another city and ask them to do math for you. You say 'add 10 and 20'. They calculate and say '30'. You don't know or care about the phone network — you just called a 'method' on a 'remote object'. That's RMI."
          },
          { type: "heading", text: "RMI Architecture Components" },
          {
            type: "table",
            headers: ["Component", "Where", "Role"],
            rows: [
              ["Remote Interface", "Shared by both", "Defines methods callable remotely. Extends java.rmi.Remote. ALL methods declare throws RemoteException."],
              ["Remote Object (Impl)", "Server", "Implements the interface. Extends UnicastRemoteObject. Contains the real logic."],
              ["Stub", "Client side", "Client-side proxy. When client calls a method, Stub serializes params and sends over network."],
              ["RMI Registry", "Server (port 1099)", "Naming service. Server registers object with a name. Client looks up name to get Stub."],
              ["Transport Layer", "Java handles", "Java automatically handles TCP, serialization, and error handling."],
            ]
          },
          { type: "heading", text: "Steps to Create RMI Application" },
          {
            type: "bullets",
            items: [
              "Step 1: Define the Remote Interface (shared by client and server)",
              "Step 2: Implement the Remote Interface on the server side",
              "Step 3: Server: start RMI Registry and register (bind) the remote object",
              "Step 4: Client: look up the remote object in the Registry → gets a Stub",
              "Step 5: Client calls methods on the Stub exactly like a local object"
            ]
          },
          {
            type: "code",
            label: "Complete RMI Example — Add Two Numbers (Lab 7.1)",
            lines: [`// ─────────────────────────────────────────────────────────────
// FILE 1: AddService.java (Remote Interface)
// Shared by BOTH client and server
// ─────────────────────────────────────────────────────────────
import java.rmi.*;

public interface AddService extends Remote {
    // ALL methods MUST declare throws RemoteException
    // Network calls can fail — this forces callers to handle it
    int add(int a, int b)      throws RemoteException;
    int subtract(int a, int b) throws RemoteException;
}`,
`// ─────────────────────────────────────────────────────────────
// FILE 2: AddServiceImpl.java (Server — Remote Object)
// ─────────────────────────────────────────────────────────────
import java.rmi.*;
import java.rmi.server.*;
import java.rmi.registry.*;

public class AddServiceImpl extends UnicastRemoteObject implements AddService {
    // Constructor must declare throws RemoteException
    public AddServiceImpl() throws RemoteException { super(); }

    @Override
    public int add(int a, int b) throws RemoteException {
        System.out.println("Server: computing " + a + " + " + b);
        return a + b; // result marshaled and sent back to client
    }

    @Override
    public int subtract(int a, int b) throws RemoteException {
        return a - b;
    }

    public static void main(String[] args) throws Exception {
        // Step 1: Start RMI Registry on port 1099
        Registry registry = LocateRegistry.createRegistry(1099);
        System.out.println("RMI Registry started on port 1099");

        // Step 2: Create and register the remote object
        AddServiceImpl service = new AddServiceImpl();
        // rebind = replace if name exists. bind = error if name exists.
        Naming.rebind("rmi://localhost/AddService", service);
        System.out.println("AddService registered. Waiting for clients...");
    }
}`,
`// ─────────────────────────────────────────────────────────────
// FILE 3: AddClient.java (Client)
// ─────────────────────────────────────────────────────────────
import java.rmi.*;

public class AddClient {
    public static void main(String[] args) throws Exception {
        // Naming.lookup returns a STUB — local proxy for remote object
        AddService service = (AddService) Naming.lookup("rmi://localhost/AddService");

        // Call methods — looks like local call, actually goes over network!
        int result1 = service.add(15, 25);
        System.out.println("15 + 25 = " + result1);   // Output: 40

        int result2 = service.subtract(100, 35);
        System.out.println("100 - 35 = " + result2);  // Output: 65
    }
}

// HOW TO RUN:
// 1. javac AddService.java AddServiceImpl.java AddClient.java
// 2. java AddServiceImpl   (start server)
// 3. java AddClient        (run client in another terminal)`
            ]
          }
        ]
      },
      {
        qnum: "Q2",
        qtitle: "Parameter Marshaling in RMI",
        content: [
          {
            type: "definition",
            text: "Parameter Marshaling: When a client calls a remote method, the parameters are converted (marshaled) into a byte stream, sent over the network, and reconstructed (unmarshaled) on the server side. Results are sent back the same way."
          },
          {
            type: "table",
            headers: ["Parameter Type", "How passed", "Serializable needed?", "Example"],
            rows: [
              ["int, double, boolean", "By value (copy)", "No", "add(int a, int b)"],
              ["String", "By value (copy)", "Yes (String is Serializable)", "greet(String name)"],
              ["Custom class (e.g., Student)", "By value (copy)", "YES — must implement Serializable", "processStudent(Student s)"],
              ["Remote object", "By reference (Stub)", "No — passed as reference", "setCallback(CallbackRemote cb)"],
            ]
          }
        ]
      },
      {
        qnum: "Q3",
        qtitle: "CORBA vs RMI",
        content: [
          {
            type: "table",
            headers: ["Aspect", "RMI", "CORBA"],
            rows: [
              ["Language support", "Java ONLY", "Language-neutral (C++, Java, Python, etc.)"],
              ["Interface definition", "Java interface extending Remote", "IDL (Interface Definition Language) — language-neutral file"],
              ["Protocol", "JRMP — Java-specific", "IIOP — language-neutral, interoperable"],
              ["Complexity", "Simple — just Java. Quick to learn.", "Complex — need to learn IDL, ORB setup, naming service."],
              ["Performance", "Fast for Java-to-Java", "Slight overhead from language translation"],
              ["Use case", "Java-only distributed systems", "Enterprise with multiple languages"],
              ["Today's usage", "Being replaced by REST, gRPC", "Legacy enterprise systems"],
            ]
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

export default function Java() {
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
            Advanced Java
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
          const open = openSections[key] !== false; // default open
          return (
            <div key={key} style={{ background: COLORS.surface, borderRadius: 10, border: `1px solid ${COLORS.border}`, marginBottom: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              {/* Section Header */}
              <button onClick={() => toggleSection(key)}
                style={{ width: "100%", background: open ? "#F8FAFC" : "#fff", border: "none", padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left", transition: "background 0.15s" }}>
                <span style={{ background: unit.color, color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, minWidth: 42, textAlign: "center" }}>{sec.qnum}</span>
                <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 700, flex: 1, fontFamily: "sans-serif" }}>{sec.qtitle}</span>
                <span style={{ color: COLORS.muted, fontSize: 20, transition: "transform 0.2s", transform: open ? "rotate(0)" : "rotate(-90deg)" }}>▾</span>
              </button>

              {/* Section Content */}
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
