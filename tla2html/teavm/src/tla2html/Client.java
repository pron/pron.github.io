package tla2html;

import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.dom.html.HTMLElement;
import org.teavm.jso.dom.xml.Element;
import org.teavm.jso.dom.xml.Node;
import org.teavm.jso.dom.xml.NodeList;

import tla2unicode.TLAUnicode;
import tla2unicode.Unicode;

public class Client {
    public static void main(String[] args) {
//        String result = TLAUnicode.convert(false, "A /\\ B => C");
        HTMLDocument document = HTMLDocument.current();
        NodeList<Element> tags = document.getElementsByTagName("tlaplus");
        for (int i=0; i<tags.getLength(); i++) {
            Node node = tags.get(i).getFirstChild().getFirstChild();
            String content = node.getNodeValue();

            System.out.println("TLAPLUS " + i);
            System.out.println(content);

            String result = TLAUnicode.convert(true, content);

            node.setNodeValue(result);
        }
        // HTMLElement div = document.createElement("div");
        // div.appendChild(document.createTextNode("TeaVM generated element: " + result));
        // document.getBody().appendChild(div);
    }
}
