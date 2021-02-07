const { expect } = require("chai");

describe("EtherStore", function() {
  let EtherStore, etherStore, accounts;

  beforeEach(async() => {
    EtherStore = await ethers.getContractFactory("EtherStore");
    etherStore = await EtherStore.deploy();
    accounts = await ethers.getSigners();
  })
  
  describe('Upon Deployment', () => {
    it('Should return a zero balance upon deployment', async () => {
      expect(await etherStore.getBalance()).to.equal(0)
    })
  })
  describe('Testing the Deposit Function', () => {
    it('Should return an updated balance after a deposit', async () => {
      await etherStore.deposit({ value: 100});
      expect(await etherStore.getBalance()).to.equal(100);
    })
  })
  describe('Testing the Withdraw Function', () => {
    it('Should return an updated balance after a withdraw', async() => {
      await etherStore.deposit({ value: 100});
      await etherStore.withdraw(100);
      expect(await etherStore.getBalance()).to.equal(0);
    })
  })
  describe('Testing the Balances Mapping', () => {
    it('Should return the correct balance after a deposit', async () => {
      await etherStore.deposit({ value: 100});
      expect(await etherStore.balances(accounts[0].address)).to.equal(100);
    })
    it('Should return 0 for the other accounts in Hardhat', async () => {
      expect(await etherStore.balances(accounts[1].address)).to.equal(0);
    })
  })
});
