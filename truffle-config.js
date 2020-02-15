/**
 * remove comments for public chain migration
 */
//const HDWalletProvider = require('truffle-hdwallet-provider')
//const fs = require('fs');
//const mnemonic = fs.readFileSync(".mnemonic").toString().trim();
//const infuraKey = "816cc7a6308448dbbaf46ac5488507cf";

require('ts-node/register')
// OPTIONAL: Allows the use of tsconfig path mappings with ts-node
// require('tsconfig-paths/register')


module.exports = {
  contracts_build_directory: './build',
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    coverage: {
      host: "127.0.0.1",
      port: 7546,
      network_id: "*",
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${infuraKey}`),
      network_id: 42,
      skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    },
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`),
      network_id: 1,
      skipDryRun: false // Skip dry run before migrations? (default: false for public nets )
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  plugins: ["solidity-coverage"],

  compilers: {
    solc: {
      version: "0.5.16", // Fetch exact version from solc-bin (default: truffle's version)
      settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}