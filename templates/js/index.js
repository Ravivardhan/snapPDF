var boilerplate = `<!DOCTYPE html>
<html>
<head>
  <title>My HTML Page</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
  </style>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>This is a basic HTML boilerplate.</p>
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
    pdf.save('iframe-content.pdf'); // 🚀 Auto-downloads in browser
  }