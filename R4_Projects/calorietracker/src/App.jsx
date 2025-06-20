import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// In a real project, you would import your CSS file like this:
import './App.css';

const defaultFirebaseConfig = {
  apiKey: "AIzaSyBh2iVFRVeiHAtCpvvxxwv2xIRfUAKIEz0",
  authDomain: "calorietracker-61bbe.firebaseapp.com",
  projectId: "calorietracker-61bbe",
  storageBucket: "calorietracker-61bbe.firebasestorage.app",
  messagingSenderId: "389005266088",
  appId: "1:389005266088:web:05809369ed78013794069d",
  measurementId: "G-4GJQDCYYTB"
};

// Global variables provided by the Canvas environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : defaultFirebaseConfig;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Main App Component
const App = () => {
    // Firebase states
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Food entry states
    const [foodEntries, setFoodEntries] = useState([]);
    const [mealName, setMealName] = useState('');
    const [calorieCount, setCalorieCount] = useState('');
    const [totalCalories, setTotalCalories] = useState(0);

    // UI states
    const [message, setMessage] = useState('');
    const [showMessageBox, setShowMessageBox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [llmResponse, setLlmResponse] = useState('');
    const [llmPrompt, setLlmPrompt] = useState('');
    const [isLlmLoading, setIsLlmLoading] = useState(false);


    // Initialize Firebase and set up authentication
    useEffect(() => {
        try {
            const app = initializeApp(firebaseConfig);
            const firestore = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestore);
            setAuth(firebaseAuth);

            onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Sign in anonymously if no user or initial token
                    try {
                        if (initialAuthToken) {
                            await signInWithCustomToken(firebaseAuth, initialAuthToken);
                        } else {
                            await signInAnonymously(firebaseAuth);
                        }
                        setUserId(firebaseAuth.currentUser?.uid || crypto.randomUUID()); // Ensure userId is set
                    } catch (error) {
                        console.error("Firebase authentication error:", error);
                        setMessage(`Authentication Error: ${error.message}`);
                        setShowMessageBox(true);
                    }
                }
                setIsAuthReady(true);
            });
        } catch (error) {
            console.error("Firebase initialization error:", error);
            setMessage(`Firebase Init Error: ${error.message}`);
            setShowMessageBox(true);
        }
    }, []);

    // Fetch food entries when db and userId are ready
    useEffect(() => {
        if (db && userId && isAuthReady) {
            const foodCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/foodEntries`);
            // Note: orderBy is commented out to avoid potential index issues as per instructions.
            // If you need sorting, you'll need to sort in JavaScript after fetching.
            const q = query(foodCollectionRef); // , orderBy('timestamp', 'desc'));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const entries = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setFoodEntries(entries);
                const total = entries.reduce((sum, entry) => sum + (parseInt(entry.calories) || 0), 0);
                setTotalCalories(total);
            }, (error) => {
                console.error("Error fetching food entries:", error);
                setMessage(`Error fetching entries: ${error.message}`);
                setShowMessageBox(true);
            });

            return () => unsubscribe(); // Cleanup listener on unmount
        }
    }, [db, userId, isAuthReady]);

    // Function to show messages
    const showMessage = useCallback((text) => {
        setMessage(text);
        setShowMessageBox(true);
        setTimeout(() => {
            setShowMessageBox(false);
            setMessage('');
        }, 3000); // Message disappears after 3 seconds
    }, []);

    // Add a new food entry
    const addFoodEntry = async () => {
        if (!mealName || !calorieCount || isNaN(calorieCount) || parseInt(calorieCount) < 0) {
            showMessage('Please enter a valid meal name and positive calorie count.');
            return;
        }

        if (!db || !userId) {
            showMessage('Database not ready. Please wait or refresh.');
            return;
        }

        setIsLoading(true);
        try {
            await addDoc(collection(db, `artifacts/${appId}/users/${userId}/foodEntries`), {
                mealName,
                calories: parseInt(calorieCount),
                timestamp: Date.now()
            });
            setMealName('');
            setCalorieCount('');
            showMessage('Food entry added!');
        } catch (e) {
            console.error("Error adding document: ", e);
            showMessage(`Error adding entry: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete a food entry
    const deleteFoodEntry = async (id) => {
        if (!db || !userId) {
            showMessage('Database not ready. Please wait or refresh.');
            return;
        }

        setIsLoading(true);
        try {
            await deleteDoc(doc(db, `artifacts/${appId}/users/${userId}/foodEntries`, id));
            showMessage('Food entry deleted!');
        } catch (e) {
            console.error("Error deleting document: ", e);
            showMessage(`Error deleting entry: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Call Gemini API for dietary advice
    const callGeminiAPI = async () => {
        if (!llmPrompt.trim()) {
            showMessage('Please enter a question for the AI.');
            return;
        }

        setIsLlmLoading(true);
        setLlmResponse('');

        try {
            let chatHistory = [];
            const prompt = `Considering my total calorie intake for today is ${totalCalories} calories, and my current food entries are: ${foodEntries.map(e => `${e.mealName} (${e.calories} calories)`).join(', ')}. ${llmPrompt}`;
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });

            const payload = {
                contents: chatHistory,
                generationConfig: {
                    // You can adjust temperature for creativity or restrict it for factual responses
                    temperature: 0.7,
                }
            };
            const apiKey = ""; // Canvas will provide this in runtime.

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                setLlmResponse(result.candidates[0].content.parts[0].text);
            } else {
                setLlmResponse('No response from AI or unexpected format.');
                console.error("AI response structure unexpected:", result);
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            setLlmResponse(`Error: Unable to get AI response. ${error.message}`);
            showMessage(`AI Error: ${error.message}`);
        } finally {
            setIsLlmLoading(false);
        }
    };

    return (
        <div className="app-container">
            <div className="main-card">
                <h1 className="app-title">
                    Calorie Tracker
                </h1>

                {/* User ID Display */}
                {isAuthReady && userId && (
                    <div className="user-id-display">
                        Your User ID: <span className="user-id-mono">{userId}</span>
                        <p className="user-id-hint">
                            (This ID identifies your data for this app. Share it for collaboration if needed.)
                        </p>
                    </div>
                )}
                {!isAuthReady && (
                     <div className="initializing-message">
                        Initializing app...
                    </div>
                )}

                {/* Message Box */}
                {showMessageBox && (
                    <div className={`message-box ${message.includes('Error') ? 'error' : 'success'}`}>
                        {message}
                    </div>
                )}

                <div className="content-grid">
                    {/* Food Logging Section */}
                    <div className="section-card">
                        <h2 className="section-title">Log Your Meal</h2>
                        <div className="form-group">
                            <label htmlFor="mealName">Meal Name</label>
                            <input
                                type="text"
                                id="mealName"
                                className="form-input"
                                value={mealName}
                                onChange={(e) => setMealName(e.target.value)}
                                placeholder="e.g., Chicken Salad"
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="calorieCount">Calories (kcal)</label>
                            <input
                                type="number"
                                id="calorieCount"
                                className="form-input"
                                value={calorieCount}
                                onChange={(e) => setCalorieCount(e.target.value)}
                                placeholder="e.g., 350"
                                min="0"
                            />
                        </div>
                        <button
                            onClick={addFoodEntry}
                            className="add-button"
                            disabled={isLoading || !isAuthReady}
                        >
                            {isLoading ? 'Adding...' : 'Add Meal'}
                        </button>

                        <div className="entries-list-container">
                            <h3>Your Entries</h3>
                            {foodEntries.length === 0 ? (
                                <p className="no-entries-message">No food entries yet. Start logging!</p>
                            ) : (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {foodEntries.map((entry) => (
                                        <li key={entry.id} className="food-entry-item">
                                            <div>
                                                <p>{entry.mealName}</p>
                                                <p>{entry.calories} kcal</p>
                                            </div>
                                            <button
                                                onClick={() => deleteFoodEntry(entry.id)}
                                                className="delete-button"
                                                aria-label={`Delete ${entry.mealName}`}
                                                disabled={isLoading}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ height: '1.25rem', width: '1.25rem' }}>
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 3a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm0 3a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* AI Assistant Section */}
                    <div className="section-card">
                        <h2 className="section-title">AI Dietary Assistant</h2>
                        <div className="total-calories-display">
                            Total Calories Today: {totalCalories} kcal
                        </div>

                        <div className="form-group">
                            <label htmlFor="llmPrompt">Ask the AI:</label>
                            <textarea
                                id="llmPrompt"
                                className="form-input form-textarea"
                                value={llmPrompt}
                                onChange={(e) => setLlmPrompt(e.target.value)}
                                placeholder={`e.g., "Suggest a healthy dinner recipe for 500 calories." or "Based on my entries, what nutrients might I be missing?"`}
                            ></textarea>
                        </div>
                        <div className="quick-prompt-buttons">
                            <button
                                onClick={() => setLlmPrompt(`Suggest a healthy meal for ${2000 - totalCalories > 0 ? 2000 - totalCalories : 500} calories.`)}
                                className="quick-prompt-button"
                            >
                                Healthy Meal Idea
                            </button>
                            <button
                                onClick={() => setLlmPrompt(`What are some low-calorie snack options?`)}
                                className="quick-prompt-button"
                            >
                                Snack Ideas
                            </button>
                            <button
                                onClick={() => setLlmPrompt(`Analyze my current food entries for today and give me some general dietary tips.`)}
                                className="quick-prompt-button"
                            >
                                Dietary Tips
                            </button>
                        </div>
                        <button
                            onClick={callGeminiAPI}
                            className="ai-button"
                            disabled={isLlmLoading || !isAuthReady}
                        >
                            {isLlmLoading ? 'Asking AI...' : 'Get AI Advice'}
                        </button>

                        {llmResponse && (
                            <div className="ai-response-container">
                                <h3>AI Response:</h3>
                                <p className="ai-response-text">{llmResponse}</p>
                            </div>
                        )}
                         {isLlmLoading && (
                            <div className="ai-loading-spinner">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p>Thinking...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
