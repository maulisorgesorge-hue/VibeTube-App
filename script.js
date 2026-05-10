<script>
  const display = document.getElementById('display');

  // स्क्रीन पर नंबर डालने के लिए
  function appendToDisplay(input) {
    display.value += input;
  }

  // स्क्रीन साफ़ करने के लिए (C)
  function clearDisplay() {
    display.value = "";
  }

  // एक नंबर मिटाने के लिए (DEL)
  function deleteLast() {
    display.value = display.value.slice(0, -1);
  }

  // कैलकुलेशन करने के लिए (=)
  function calculate() {
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = "Error";
    }
  }
</script>
