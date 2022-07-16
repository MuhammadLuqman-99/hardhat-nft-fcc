// We are going to skimp a bit on these tests...

const { assert } = require("chai")
const { ethers, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic Nft unit test", function () {
        let basicNft, deployer

        beforeEach(async function () {
            accounts = await ethers.getSigners()
            deployer = accounts[0]
            await deployments.fixture(["basicnft"])
            basicNft = await ethers.getContract("BasicNft") 
        })

        it("Allow user to mint nft, and updates apporiately", async function() {
            const txResponses = await basicNft.mintNft()
            txResponses.wait(1)
            const tokenUri = await basicNft.tokenURI(0)
            const tokenCounter = await basicNft.getTokenCounter()

            assert.equal(tokenCounter.toString(), "1")
            assert.equal(tokenUri, await basicNft.TOKEN_URI())
        })
    })
