
const hre = require("hardhat");
const fs = require('fs')
const config = require("../config.js")

async function main() {
    console.log(config.samuraiaddress)
    const samuraiContract = await ethers.getContractAt("Samurai", config.samuraiaddress);
    await samuraiContract.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.moralis.io:2053/ipfs/QmP9w9b5EtfwyE6XJrKULufhpD5EwBnui3iMaNn2gmuKVT/nftimage.png");
    await samuraiContract.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.moralis.io:2053/ipfs/QmbLELBzbfSrkJBmGh8ifEndcwCsws2BsBveoscN9cYpco/nftimage.png");
    await samuraiContract.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.moralis.io:2053/ipfs/QmSJVSGEhqthFkotL6SFr7xBZZa1XfM2oiDm4affJmSTtL/nftimage.png");
    await samuraiContract.safeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "https://ipfs.moralis.io:2053/ipfs/QmZz2MKhVArkGFhq1UF16ht33AToFFh21FkRBar9gb4Hjw/nftimage.png");
    await samuraiContract.safeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "https://ipfs.moralis.io:2053/ipfs/QmP9w9b5EtfwyE6XJrKULufhpD5EwBnui3iMaNn2gmuKVT/nftimage.png");
    await samuraiContract.safeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "https://ipfs.moralis.io:2053/ipfs/QmbLELBzbfSrkJBmGh8ifEndcwCsws2BsBveoscN9cYpco/nftimage.png");
    await samuraiContract.safeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "https://ipfs.moralis.io:2053/ipfs/QmSJVSGEhqthFkotL6SFr7xBZZa1XfM2oiDm4affJmSTtL/nftimage.png");
    await samuraiContract.safeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "https://ipfs.moralis.io:2053/ipfs/QmZz2MKhVArkGFhq1UF16ht33AToFFh21FkRBar9gb4Hjw/nftimage.png");
    await samuraiContract.safeMint("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "https://ipfs.moralis.io:2053/ipfs/QmP9w9b5EtfwyE6XJrKULufhpD5EwBnui3iMaNn2gmuKVT/nftimage.png");
    await samuraiContract.safeMint("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "https://ipfs.moralis.io:2053/ipfs/QmbLELBzbfSrkJBmGh8ifEndcwCsws2BsBveoscN9cYpco/nftimage.png");
    await samuraiContract.safeMint("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "https://ipfs.moralis.io:2053/ipfs/QmSJVSGEhqthFkotL6SFr7xBZZa1XfM2oiDm4affJmSTtL/nftimage.png");
    await samuraiContract.safeMint("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "https://ipfs.moralis.io:2053/ipfs/QmZz2MKhVArkGFhq1UF16ht33AToFFh21FkRBar9gb4Hjw/nftimage.png");
    console.log("nft has been minted");

}



main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
