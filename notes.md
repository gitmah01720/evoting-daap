## Dapp:

We will be using next js and react to build this project.

....

## Setup:

- run npm install 
- run npx hardhat init // to init scripts.

After building contracts 
## Running:

- run `npm run dev`  to go live.

## Deploying the contract:

- npx hardhat node // to generate addressses.
- npx hardhat run --network localhost scripts/deploy.js // deploy
    ```
        this will give a address which will be used for admin address to read data from files.
    ```
    // npx hardhat run scripts/deploy.ts --network localhost
## Replacement of IPFS:
run `python3 -m http.server` in data folder and upload the files from it.