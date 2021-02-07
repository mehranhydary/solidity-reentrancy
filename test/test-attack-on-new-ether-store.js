const { expect } = require('chai');

describe('Attack', function () {
    let Attack, attack, EtherStoreReentrancyProof, etherStoreReentrancyProof, accounts;
    
    beforeEach(async() => {
        
        accounts = await ethers.getSigners();
        EtherStoreReentrancyProof = await ethers.getContractFactory("EtherStoreReentrancyProof");
        etherStoreReentrancyProof = await EtherStoreReentrancyProof.deploy();
        Attack = await ethers.getContractFactory("Attack");
        attack = await Attack.deploy(etherStoreReentrancyProof.address);
    })
    describe('Upon Deployment', () => {
        it('Attack should be initialized with EtherStore\'s smart contract address', async () => {
            expect(await attack.etherStore()).to.equal(etherStoreReentrancyProof.address);
        });
    });
    describe('Testing the Attack Function', () => {
        it('Should not steal ether from the smart contract', async () => {
            etherStoreReentrancyProof.connect(accounts[1]);
            await etherStoreReentrancyProof.deposit({value: ethers.utils.parseEther("1.0")});
            attack.connect(accounts[0]);
            try {
                await attack.attack({value: ethers.utils.parseEther('1.0')})
            } catch {
                expect(await etherStoreReentrancyProof.getBalance()).to.equal(ethers.utils.parseEther("1.0"));
            }
        })
    })
});