// Define the custom element MathOperations
class MathOperations extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    // Create input boxes for each operation
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => this.clearAll());

    const inputAdd = this.createInput("operand1Add", "operand2Add");
    const inputSubtract = this.createInput(
      "operand1Subtract",
      "operand2Subtract"
    );
    const inputMultiply = this.createInput(
      "operand1Multiply",
      "operand2Multiply"
    );

    // Create iframes for addition, subtraction, and multiplication
    const iframeAdd = this.createIframe("add", inputAdd);
    const iframeSubtract = this.createIframe("subtract", inputSubtract);
    const iframeMultiply = this.createIframe("multiply", inputMultiply);

    // Append input boxes and iframes to the shadow DOM
    this.shadowRoot.appendChild(inputAdd);
    this.shadowRoot.appendChild(inputSubtract);
    this.shadowRoot.appendChild(inputMultiply);
    this.shadowRoot.appendChild(iframeAdd);
    this.shadowRoot.appendChild(iframeSubtract);
    this.shadowRoot.appendChild(iframeMultiply);
    this.shadowRoot.appendChild(clearButton);

    // Add event listeners to input elements for dynamic updates
    inputAdd.addEventListener("input", () =>
      this.updateIframeContent("add", inputAdd, iframeAdd)
    );
    inputSubtract.addEventListener("input", () =>
      this.updateIframeContent("subtract", inputSubtract, iframeSubtract)
    );
    inputMultiply.addEventListener("input", () =>
      this.updateIframeContent("multiply", inputMultiply, iframeMultiply)
    );
  }

  createInput(operand1Attribute, operand2Attribute) {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter value";
    input.setAttribute("min", "0"); // Adjust the minimum value as needed
    input.setAttribute("step", "any"); // Allow decimal values

    // Bind input values to the corresponding attributes
    input.addEventListener("input", (event) => {
      this.setAttribute(operand1Attribute, event.target.value);
    });

    const input2 = document.createElement("input");
    input2.type = "number";
    input2.placeholder = "Enter value";
    input2.setAttribute("min", "0");
    input2.setAttribute("step", "any");

    input2.addEventListener("input", (event) => {
      this.setAttribute(operand2Attribute, event.target.value);
    });

    // Create a div to contain both input boxes
    const inputContainer = document.createElement("div");
    inputContainer.appendChild(input);
    inputContainer.appendChild(input2);

    return inputContainer;
  }

  createIframe(operation, inputElement) {
    const iframe = document.createElement("iframe");
    iframe.srcdoc = this.generateOperationHTML(operation, inputElement);
    return iframe;
  }

  generateOperationHTML(operation, inputElement) {
    // Get values from the input elements
    const operand1 = inputElement.children[0].value;
    const operand2 = inputElement.children[1].value;

    let result;
    switch (operation) {
      case "add":
        result = parseFloat(operand1) + parseFloat(operand2);
        break;
      case "subtract":
        result = parseFloat(operand1) - parseFloat(operand2);
        break;
      case "multiply":
        result = parseFloat(operand1) * parseFloat(operand2);
        break;
      default:
        result = "Invalid operation";
    }

    // Return HTML content for the iframe
    return `<html>
                    <body>
                    <p>${operation}: ${operand1} ${operation} ${operand2} = ${result}</p>
                    </body>
                </html>`;
  }

  clearAll() {
    // Clear all input values
    const inputElements = this.shadowRoot.querySelectorAll("input");
    inputElements.forEach((input) => (input.value = ""));

    // Clear iframe content
    const iframeElements = this.shadowRoot.querySelectorAll("iframe");
    iframeElements.forEach((iframe) => (iframe.srcdoc = ""));
  }

  updateIframeContent(operation, inputElement, iframe) {
    const operand1 = inputElement.children[0].value;
    const operand2 = inputElement.children[1].value;

    let result;
    switch (operation) {
      case "add":
        result = parseFloat(operand1) + parseFloat(operand2);
        break;
      case "subtract":
        result = parseFloat(operand1) - parseFloat(operand2);
        break;
      case "multiply":
        result = parseFloat(operand1) * parseFloat(operand2);
        break;
      default:
        result = "Invalid operation";
    }

    // Update the iframe content dynamically
    iframe.srcdoc = `<html>
                            <body>
                                <p>${operation}: ${operand1} ${operation} ${operand2} = ${result}</p>
                            </body>
                            </html>`;
  }
}

// Define the custom element 'math-operations'
customElements.define("math-operations", MathOperations);
