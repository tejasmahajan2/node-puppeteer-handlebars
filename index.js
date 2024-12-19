const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Dynamic data to inject into the template
const data = {
    name: "John Doe",
    amount: "100.00"
};

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Read the HTML template
    const templateContent = fs.readFileSync(path.resolve(__dirname, './templates/invoice.html'), 'utf-8');

    // Compile the template using Handlebars
    const template = handlebars.compile(templateContent);

    // Generate the HTML by injecting the data
    const htmlContent = template(data);

    // Set the rendered HTML content
    await page.setContent(htmlContent);

    // // Generate PDF as a buffer
    // const pdfBuffer = await page.pdf({ format: 'A4' });
    // console.log(pdfBuffer)
    
    // Generate the PDF
    await page.pdf({ path: 'example_dynamic_handlebars.pdf', format: 'A4' });

    // Close the browser
    await browser.close();
})();
