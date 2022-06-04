const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function(){
let deployer, addr1, addr2, nft, marketplace
let feePercent = 1
let URI="Sample URI"
beforeEach(async function(){
// Get Contract Factories
  const NFT = await ethers.getContractFactory("NFT");
  
  const Marketplace = await ethers.getContractFactory("Marketplace");
  
//   [] = await ethers.getSigners() Get Signers
  [deployer,addr1,addr2] = await ethers.getSigners()

//   Deploy Contracts
   nft = await NFT.deploy();
   marketplace = await Marketplace.deploy(feePercent);
   });
   describe("Deployment", function(){
       it("Should track name and symbol of nft collection",async function(){
           expect(await nft.name()).to.equal("DApp NFT")
           expect(await nft.symbol()).to.equal("DAPP")
       })
       it("Should track feeAccount and feePercent of marketplace",async function(){
        expect(await marketplace.feeAccount()).to.equal(deployer.address)
        expect(await marketplace.feePercent()).to.equal(feePercent)
    })
   })
   describe("Minting NFTs", function(){
       it("should track each minted NFT",async function(){
        //   addr1 mints a NFt
        await nft.connect(addr1).mint(URI)
        expect(await nft.tokenCount()).to.equal(1);
        expect(await nft.balanceOf(addr1.address)).to.equal(1);
        expect(await nft.tokenURI(1)).to.equal(URI);

        // addr2 mints a NFT
        await nft.connect(addr2).mint(URI)
        expect(await nft.tokenCount()).to.equal(2);
        expect(await nft.balanceOf(addr2.address)).to.equal(1);
        expect(await nft.tokenURI(2)).to.equal(URI);
       })
   })
})