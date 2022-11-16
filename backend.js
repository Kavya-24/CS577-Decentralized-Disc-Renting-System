        let account;

        /**
         * All the metamask notifications need to be registered
         */
        const metamask_create_buy_order = async () => {
            if(window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
                console.log("account used = " + account)
                const buyorder_volume = document.getElementById("buyorder_volume").value;
                const buyorder_price = document.getElementById("buyorder_volume").value;
                
                
                await window.contract.methods.createBuyOrder(buyorder_volume, buyorder_price, "").send({ from: account, value: 1000 });
                
                alert("BuyOrder created successfully by " + account);
                window.location.href = "./BuyOrders.html";
            }

        }   
        const create_buy_order = async() =>{
            connectContract();
            metamask_create_buy_order();
            
        }

        const metamask_create_sell_order = async () => {
            if(window.ethereum !== "undefined"){
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
                console.log("account used = " + account)
                const sellorder_volume = document.getElementById("sellorder_volume").value;
                const sellorder_price = document.getElementById("sellorder_volume").value;
                
                
                await window.contract.methods.createSellOrder(sellorder_volume, sellorder_price, "").send({ from: account });
                
                alert("SellOrder created successfully by " + account);
                window.location.href = "./SellOrders.html";
            }

        }
        
        const create_sell_order = async() =>{
            connectContract();
            metamask_create_sell_order();
        }








    const connectContract = async () => {
            const ABI =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "buyOrderIndex",
				"type": "uint256"
			},
			{
				"name": "buyOrderID",
				"type": "uint256"
			}
		],
		"name": "cancelBuyOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sellOrderIndex",
				"type": "uint256"
			},
			{
				"name": "sellOrderID",
				"type": "uint256"
			}
		],
		"name": "cancelSellOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "volumeGB",
				"type": "uint256"
			},
			{
				"name": "pricePerGB",
				"type": "uint256"
			},
			{
				"name": "DOConnectionInfo",
				"type": "string"
			}
		],
		"name": "createBuyOrder",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "volumeGB",
				"type": "uint256"
			},
			{
				"name": "pricePerGB",
				"type": "uint256"
			},
			{
				"name": "DSOConnectionInfo",
				"type": "string"
			}
		],
		"name": "createSellOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "orderIndex",
				"type": "uint256"
			},
			{
				"name": "orderID",
				"type": "uint256"
			},
			{
				"name": "orderType",
				"type": "uint256"
			},
			{
				"name": "connectionInfo",
				"type": "string"
			}
		],
		"name": "createStorageContract",
		"outputs": [
			{
				"name": "newStorageContractID",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "storageContractIndex",
				"type": "uint256"
			},
			{
				"name": "storageContractID",
				"type": "uint256"
			}
		],
		"name": "refillStorageContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "storageContractIndex",
				"type": "uint256"
			},
			{
				"name": "storageContractID",
				"type": "uint256"
			}
		],
		"name": "startStorageContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "storageContractIndex",
				"type": "uint256"
			},
			{
				"name": "storageContractID",
				"type": "uint256"
			}
		],
		"name": "stopStorageContract",
		"outputs": [
			{
				"name": "withdrawedWei",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "storageContractIndex",
				"type": "uint256"
			},
			{
				"name": "storageContractID",
				"type": "uint256"
			}
		],
		"name": "withdrawFromStorageContract",
		"outputs": [
			{
				"name": "withdrawedWei",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyOrdersLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "buyOrderIndex",
				"type": "uint256"
			}
		],
		"name": "getBuyOrder",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "DO",
				"type": "address"
			},
			{
				"name": "volume",
				"type": "uint256"
			},
			{
				"name": "pricePerGB",
				"type": "uint256"
			},
			{
				"name": "weiInitialAmount",
				"type": "uint256"
			},
			{
				"name": "DOConnectionInfo",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "sellOrderIndex",
				"type": "uint256"
			}
		],
		"name": "getSellOrder",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "DSO",
				"type": "address"
			},
			{
				"name": "volume",
				"type": "uint256"
			},
			{
				"name": "pricePerGB",
				"type": "uint256"
			},
			{
				"name": "DSOConnectionInfo",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "storageContractIndex",
				"type": "uint256"
			}
		],
		"name": "getStorageContract",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "DO",
				"type": "address"
			},
			{
				"name": "DSO",
				"type": "address"
			},
			{
				"name": "DOConnectionInfo",
				"type": "string"
			},
			{
				"name": "DSOConnectionInfo",
				"type": "string"
			},
			{
				"name": "volumeGB",
				"type": "uint256"
			},
			{
				"name": "startDate",
				"type": "uint256"
			},
			{
				"name": "stopDate",
				"type": "uint256"
			},
			{
				"name": "pricePerGB",
				"type": "uint256"
			},
			{
				"name": "weiLeftToWithdraw",
				"type": "uint256"
			},
			{
				"name": "withdrawedAtDate",
				"type": "uint256"
			},
			{
				"name": "weiAllowedToWithdraw_Output",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "sellOrdersLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "storageContractsLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
            const Address = "0x30AD57B0F875EcfAeED6e25d5afb0270c190EC7e";
            window.web3 = await new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            console.log("Connection Status: Success");
        }