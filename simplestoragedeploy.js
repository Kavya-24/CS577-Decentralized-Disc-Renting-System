
   /* Configuration variables */
    let accountWeb3;
    let contractObject;
    let sendDataObject;
    
    var ipfsHost    = '127.0.0.1';
    var ipfsAPIPort = '5001';
    var ipfsWebPort = '8080';
    
    var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort)
    ipfs.swarm.peers(function (err, res) {
        if (err) {
            console.error(err);
        } else {
            var numPeers = res.Peers === null ? 0 : res.Peers.length;
            console.log("IPFS - connected to " + numPeers + " peers");
        }
    });


  
    var contractInterface = [{
        "constant": false,
        "inputs": [{
            "name": "x",
            "type": "string"
        }],
        "name": "set",
        "outputs": [],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "get",
        "outputs": [{
            "name": "x",
            "type": "string"
        }],
        "type": "function"
    }];

    async function initialize(){
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            accountWeb3 = accounts[0];
            
            contractObject = {
                from: accountWeb3,
                gas: 300000,
                data: '0x6060604052610282806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480634ed3885e146100445780636d4ce63c1461009a57610042565b005b6100986004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610115565b005b6100a760048050506101c6565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b8060006000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061016457805160ff1916838001178555610195565b82800160010185558215610195579182015b82811115610194578251826000505591602001919060010190610176565b5b5090506101c091906101a2565b808211156101bc57600081815060009055506001016101a2565b5090565b50505b50565b602060405190810160405280600081526020015060006000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102735780601f1061024857610100808354040283529160200191610273565b820191906000526020600020905b81548152906001019060200180831161025657829003601f168201915b5050505050905061027f565b9056'
            };

            sendDataObject = {
                from: accountWeb3,
                gas: 300000,
            };

            window.ipfs = ipfs;
            window.web3 = web3;
            window.account = accountWeb3;
            window.contractObject = contractObject;
            window.contract = web3.eth.contract(contractInterface);
    window.ipfsAddress = "http://" + ipfsHost + ':' + ipfsWebPort + "/ipfs";


        }
    }

    function deployStorage() {
        window.IPFSHash = null;
        window.currentData = null;

        if (window.contractInstance) {
            console.error('Contract already been deployed at: ', window.contractAddress);
            return;
        }

        window.contract.new(window.contractObject, function (err, contract) {
            if (err) {
                console.error("Contract deployment error: ", err);
            } else if (contract.address) {
                window.contractAddress = contract.address;
                window.contractInstance = window.contract.at(contract.address);
                console.log("Contract successfully deployed at: ", contract.address);
            } else if (contract.transactionHash) {
                console.log("Awaiting contract deployment with transaction hash: ", contract.transactionHash);
            } else {
                console.error("Unresolved contract deployment error");
            }
        });
    }

    function storeContent(url) {
        window.ipfs.add(url, function(err, result) {
            if (err) {
                console.error("Content submission error:", err);
                return false;
            } else if (result && result[0] && result[0].Hash) {
                console.log("Content successfully stored. IPFS address:", result[0].Hash);
            } else {
                console.error("Unresolved content submission error");
                return null;
            }
        });
    }

    function storeAddress(data) {
        if (!window.contractInstance) {
            console.error('Ensure the storage contract has been deployed');
            return;
        }

        if (window.currentData == data) {
            console.error("Overriding existing data with same data");
            return;
        }

        window.contractInstance.set.sendTransaction(data, window.sendDataObject, function (err, result) {
            if (err) {
                console.error("Transaction submission error:", err);
            } else {
                window.currentData = data;
                console.log("Address successfully stored. Transaction hash:", result);
            }
        });
    }

    function fetchContent() {
        if (!window.contractInstance) {
            console.error("Storage contract has not been deployed");
            return;
        }

        window.contractInstance.get.call(function (err, result) {
            if (err) {
                console.error("Content fetch error:", err);
            } else if (result && window.IPFSHash == result) {
                console.log("New data is not mined yet. Current data: ", result);
                return;
            } else if (result) {
                window.IPFSHash = result;
                var URL = window.ipfsAddress + "/" + result;
                console.log("Content successfully retrieved. IPFS address", result);
                console.log("Content URL:", URL);
            } else {
                console.error('No data, verify the transaction has been mined');
            }
        });
    }