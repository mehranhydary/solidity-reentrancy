const { expect } = require('chai');

describe('Attack', function () {
    let Attack, attack, EtherStore, etherStore, accounts;
    
    beforeEach(async() => {
        
        accounts = await ethers.getSigners();
        EtherStore = await ethers.getContractFactory("EtherStore");
        etherStore = await EtherStore.deploy();
        Attack = await ethers.getContractFactory("Attack");
        attack = await Attack.deploy(etherStore.address);
    })
    describe('Upon Deployment', () => {
        it('Attack should be initialized with EtherStore\'s smart contract address', async () => {
            expect(await attack.etherStore()).to.equal(etherStore.address);
        });
    });
    describe('Testing the Attack Function', () => {
        it('Should steal ether from the smart contract', async () => {
            etherStore.connect(accounts[1]);
            await etherStore.deposit({value: ethers.utils.parseEther("1.0")});
            etherStore.connect(accounts[2]);
            await etherStore.deposit({value: ethers.utils.parseEther("1.0")});
            attack.connect(accounts[0]);
            await attack.attack({value: ethers.utils.parseEther('1.0')});
            expect(await attack.getBalance()).to.equal(ethers.BigNumber.from('0x29a2241af62c0000'.toLowerCase()))
        })
    })
});