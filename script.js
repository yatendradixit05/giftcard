const contractAddress = "0x6442d604911c1C409dCda96168F0b79Ae66c43d7"; // Your deployed contract on Edu Chain
const contractABI = [
    "function issue(address to, uint256 amount) external",
    "function redeem(uint256 amount) external",
    "function balances(address owner) view returns (uint256)"
];

let signer;
let contract;

// 🦊 Connect to MetaMask
document.getElementById("connectWallet").addEventListener("click", async () => {
    if (window.ethereum) {
        try {
            // Request account access
            const provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // Display connected account
            document.getElementById("account").innerText = `Connected: ${accounts[0]}`;

            // Load the contract
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Fetch and display token balance
            const balance = await contract.balances(accounts[0]);
            document.getElementById("balance").innerText = balance.toString();
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("MetaMask is not installed! Please install MetaMask.");
    }
});

// 🔄 Redeem Tokens
document.getElementById("redeemToken").addEventListener("click", async () => {
    if (!contract) {
        alert("Please connect your wallet first!");
        return;
    }

    const amount = document.getElementById("amount").value;
    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount!");
        return;
    }

    try {
        const tx = await contract.redeem(ethers.parseUnits(amount, 18));
        await tx.wait();
        document.getElementById("status").innerText = "Tokens Redeemed Successfully!";

        // Update balance after redemption
        const balance = await contract.balances(await signer.getAddress());
        document.getElementById("balance").innerText = balance.toString();
    } catch (error) {
        console.error("Transaction Error:", error);
        document.getElementById("status").innerText = "Error: Transaction Failed";
    }
});
