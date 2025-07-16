import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";

// Code for List Group component
import ListGroup from "./components/ListGroup";
import CreateMeetingForm from "./components/CreateMeetingForm";

function App() {
  const allItems = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const [filteredItems, setFilteredItems] = useState(allItems);

  // Function for checking if the item is in the list from the navbar

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    setFilteredItems(
      allItems.filter((item) => item.toLowerCase().includes(lower))
    );
  };

  const [alertVisible, setAlertVisibility] = useState(false);
  // --- API fetch demo ---
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch((err) => setApiMessage("Error: " + err));
  }, []);
  // ----------------------

  return (
    <div>
      {/* 
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div>
        <ListGroup items={filteredItems} onSelectItem={handleSelectItem} />
      </div>

      <br />
      <br />
      <div>
        {alertVisible && (
          <Alert onClose={() => setAlertVisibility(false)}>
            Safe Travels :D{" "}
          </Alert>
        )}
        <Button color="danger" onClick={() => setAlertVisibility(true)}>
          Click me!
        </Button>
      </div>
      */}
      {/* Show API response */}
      <div style={{ marginBottom: "2rem" }}>
        <h3>Backend API Test</h3>
        <pre>{apiMessage ? apiMessage : "Loading..."}</pre>
      </div>
      <div>
        <CreateMeetingForm />
      </div>
    </div>
  );
}

export default App;
