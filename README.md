# Evoting Daap Project

This project aims to develop a distributed secure e-voting system where people can cast their vote securely from their personal devices.  By using Blockchain based system it will increase the voting percentage while saving the time as well as it will be accessible to all.

Running the Project:

## Install and Test HardHat:
```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
```

## Run the Server HardHat and Dev code:
```shell
npm run dev
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Deploy the code:
```shell
npx hardhat run --network localhost scripts/deploy.js   # deploy this will give a address which will be used for admin address to read data from files. Add this address in context/constant.js file.
```

Launch the site at : [EVoting Daap-HOME](http://localhost:3000/)