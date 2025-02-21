# Gift Card Token

This is a simple Solidity smart contract that implements a gift card token system. The contract allows the owner to issue tokens to users, who can then redeem them for digital assets.

## Features

- **Token Issuance:** The contract owner can issue gift card tokens to specific addresses.
- **Token Redemption:** Users can redeem their tokens once they have received them.
- **Ownership Control:** Only the owner can issue new tokens.
- **Simple and Secure:** Minimal implementation with security checks.

## Deployment Details

- **Deployed Address:** `0x6442d604911c1C409dCda96168F0b79Ae66c43d7`
- **Blockchain Network:** Edu Chain

## How to Use

1. **Issue Tokens:** The contract owner can call `issue(address to, uint256 amount)` to distribute tokens.
2. **Redeem Tokens:** Users can call `redeem(uint256 amount)` to use their tokens.
3. **Check Balance:** Users can check their balance via `balances(address user)`.

## License

This project is licensed under the MIT License.

