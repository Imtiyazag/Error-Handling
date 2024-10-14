async function fetchUserDetails() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "John Doe" });
        }, 1000);
    });
}

async function fetchOrderHistory() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Failed to fetch order history");
        }, 1500);
    });
}

async function fetchOrderHistoryWithRetry(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const orders = await fetchOrderHistory();
            return orders;
        } catch (error) {
            if (i < retries - 1) {
                console.log(`Retrying... Attempt ${i + 1}`);
            } else {
                throw new Error("Failed to fetch order history after 3 retries");
            }
        }
    }
}

async function fetchUserData() {
    clearResults();
    try {
        const userDetails = await fetchUserDetails();
        displayResult(`User Details: ${JSON.stringify(userDetails)}`);
        const orderHistory = await fetchOrderHistoryWithRetry();
        displayResult(`Order History: ${JSON.stringify(orderHistory)}`);
    } catch (error) {
        displayResult(`Error: ${error.message}`);
    }
}

function displayResult(result) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `<p>${result}</p>`;
}

function clearResults() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '<strong>Results will be displayed here...</strong>';
}

