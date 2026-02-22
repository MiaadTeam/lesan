// Lesan Test Script
// JavaScript fixture for HTTP server testing

console.log("Lesan HTTP Server Test Script Loaded");

// Test API endpoint
async function testApi() {
  console.log("Testing API...");

  try {
    const response = await fetch("/api/test");
    const data = await response.json();
    console.log("API Response:", data);
    alert("API Test Successful!");
  } catch (error) {
    console.error("API Test Failed:", error);
    alert("API Test Failed: " + error.message);
  }
}

// Test data endpoint
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

// Simple greeting function
function greet(name = "World") {
  return `Hello, ${name}!`;
}

// Export for testing (if in module context)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { testApi, fetchData, greet };
}

// Log when script is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  console.log("Test utilities ready");
});

// Add some test utilities to window object
window.lesanTest = {
  testApi,
  fetchData,
  greet,
  version: "1.0.0",
};
