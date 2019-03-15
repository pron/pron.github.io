package tla2html;

import java.io.StringReader;
import java.io.StringWriter;

import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.xml.Element;
import org.teavm.jso.dom.xml.Node;
import org.teavm.jso.dom.xml.NodeList;

import tla2html.TLAHTML;
import tla2sany.st.SyntaxTreeConstants;

public class Client {
    public static void main(String[] args) throws Exception {
        HTMLDocument document = HTMLDocument.current();
        NodeList<Element> tags = document.getElementsByTagName("tlaplus");
        for (int i=0; i<tags.getLength(); i++) {
            Element node = tags.get(i);
            Node pre = node.getFirstChild();
            Node text = pre.getFirstChild();
            String content = text.getNodeValue();


            // Without this, the array isn't initialized in TeaVM
            System.out.println("SyntaxNodeImage: " + SyntaxTreeConstants.SyntaxNodeImage);
            System.out.println("length:" + SyntaxTreeConstants.SyntaxNodeImage.length);
            
            System.out.println("content:");
            System.out.println(content);

            String result = TLAHTML.foo(content, System.err);

            pre.delete();

            Node pre1 = document.createElement("pre");
            pre1.appendChild(document.createTextNode(result));
            node.appendChild(pre1);

            // HTMLElement wrapper = document.createElement("div");
            // wrapper.setInnerHTML("<i>" + result + "</i>");
            // node.appendChild(wrapper);
        }
    }
}
