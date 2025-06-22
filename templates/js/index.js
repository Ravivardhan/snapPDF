var boilerplate = `<!DOCTYPE html>
<html>
<head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <link rel="stylesheet" href="templates/css/sheet.css">
  <title>My HTML Page</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
  </style>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a basic HTML boilerplate.</p>
  <div class="container mt-5">
    <h1 class="text-center text-primary">Welcome to My Page</h1>
    <button class="btn btn-success">Click Me</button>
  </div>
</body>
</html>`;

var btn=document.getElementById("render")
var content=document.querySelector("textarea");

var iframe=document.querySelector("iframe");
content.value=boilerplate;
render();
function render()
{
    var c=content.value;
    iframe.srcdoc=c;
}

async function exportToPDF() {
    const iframe = document.querySelector("iframe");
    const iframeBody = iframe.contentDocument.body;

    const canvas = await html2canvas(iframeBody);
    const imgData = canvas.toDataURL('image/png');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height);
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('iframe-content.pdf'); 
  }

  window.onload = function () {
    const textarea = document.getElementById("codeEditor");
      const editor = CodeMirror.fromTextArea(textarea, {
      mode: "htmlmixed",
      theme: "material",
      lineNumbers: true,
      lineWrapping: true
    });
  
    // Render content live into iframe
    editor.on("change", () => {
      const iframe = document.querySelector("iframe");
      iframe.srcdoc = editor.getValue();
    });
  
 
  };
  