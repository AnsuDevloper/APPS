document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const authSection = document.getElementById("auth-section");
  const connectionSection = document.getElementById("connection");
  const controlSection = document.getElementById("controls");
  const logSection = document.getElementById("logs");

  const authButton = document.getElementById("authenticate");
  const authStatus = document.getElementById("auth-status");

  const connectBluetoothButton = document.getElementById("connectBluetooth");
  const connectOnlineButton = document.getElementById("connectOnline");
  const connectionStatus = document.getElementById("connection-status");

  const turnOnButton = document.getElementById("turnOn");
  const turnOffButton = document.getElementById("turnOff");
  const lightStatus = document.getElementById("light-status");

  const viewLogsButton = document.getElementById("viewLogs");
  const logOutput = document.getElementById("log-output");

  let esp32BluetoothDevice;

  // Authenticate using Biometric
  authButton.addEventListener("click", async () => {
    try {
      const authResult = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          timeout: 60000,
          allowCredentials: [],
        },
      });

      authStatus.textContent = "Authentication successful!";
      connectionSection.classList.remove("hidden");
      controlSection.classList.remove("hidden");
      logSection.classList.remove("hidden");
    } catch (error) {
      authStatus.textContent = "Authentication failed. Please try again.";
    }
  });

  // Connect via Bluetooth
  connectBluetoothButton.addEventListener("click", async () => {
    try {
      esp32BluetoothDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["battery_service"],
      });
      connectionStatus.textContent = `Connected to ${esp32BluetoothDevice.name}`;
    } catch (error) {
      connectionStatus.textContent = `Bluetooth connection failed: ${error.message}`;
    }
  });

  // Connect Online
  connectOnlineButton.addEventListener("click", () => {
    connectionStatus.textContent = "Online connection established.";
  });

  // Turn On Light
  turnOnButton.addEventListener("click", () => {
    lightStatus.textContent = "Light turned ON!";
    // Add further functionality here
  });

  // Turn Off Light
  turnOffButton.addEventListener("click", () => {
    lightStatus.textContent = "Light turned OFF!";
    // Add further functionality here
  });

  // View Logs
  viewLogsButton.addEventListener("click", () => {
    logOutput.textContent = `
    03/12/24 - Light ON via Web App
    03/12/24 - Light OFF via Bixby
    03/12/24 - Light ON via Ultrasonic
    `;
  });
});
