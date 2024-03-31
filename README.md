# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
Running hardhat node:
```shell
npx hardhat node # in terminal 1 // to generate addressses.

npx hardhat run --network localhost scripts/deploy.js   # deploy this will give a address which will be used for admin address to read data from files.


```